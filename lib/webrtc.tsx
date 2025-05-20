"use client"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import type { Socket } from "socket.io-client"
import { useSocket } from "./socket"

interface PeerConnection {
  id: string
  connection: RTCPeerConnection
}

interface WebRTCContextType {
  localStream: MediaStream | null
  remoteStreams: Map<string, MediaStream>
  startBroadcast: () => Promise<void>
  stopBroadcast: () => void
  isStreaming: boolean
  viewerCount: number
  error: string | null
}

export const WebRTCContext = createContext<WebRTCContextType>({
  localStream: null,
  remoteStreams: new Map(),
  startBroadcast: async () => {},
  stopBroadcast: () => {},
  isStreaming: false,
  viewerCount: 0,
  error: null,
})

export const useWebRTC = () => useContext(WebRTCContext)

// ICE servers for WebRTC (STUN/TURN)
const iceServers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
}

export const WebRTCProvider = ({ children, sessionId, isHost = false }) => {
  const { socket } = useSocket()
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map())
  const [isStreaming, setIsStreaming] = useState(false)
  const [viewerCount, setViewerCount] = useState(Math.floor(Math.random() * 1000) + 500) // Random initial count for demo
  const [error, setError] = useState<string | null>(null)

  const peerConnections = useRef<PeerConnection[]>([])

  useEffect(() => {
    if (!socket) return

    // Set up WebRTC signaling events
    socket.on("viewer-joined", async (viewerId: string) => {
      console.log(`Viewer joined: ${viewerId}`)
      if (isHost && localStream) {
        await createPeerConnection(viewerId, socket, localStream)
      }
      setViewerCount((prev) => prev + 1)
    })

    socket.on("viewer-left", (viewerId: string) => {
      console.log(`Viewer left: ${viewerId}`)
      removePeerConnection(viewerId)
      setViewerCount((prev) => Math.max(0, prev - 1))
    })

    socket.on("offer", async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      console.log(`Received offer from: ${data.from}`)
      if (!isHost && socket) {
        await handleOffer(data.from, data.offer, socket)
      }
    })

    socket.on("answer", (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      console.log(`Received answer from: ${data.from}`)
      handleAnswer(data.from, data.answer)
    })

    socket.on("ice-candidate", (data: { from: string; candidate: RTCIceCandidateInit }) => {
      console.log(`Received ICE candidate from: ${data.from}`)
      handleIceCandidate(data.from, data.candidate)
    })

    socket.on("stream-ended", () => {
      console.log("Stream ended by host")
      cleanupPeerConnections()
      setIsStreaming(false)
    })

    socket.on("viewer-count", (count: number) => {
      setViewerCount(count)
    })

    // Clean up on unmount
    return () => {
      socket.off("viewer-joined")
      socket.off("viewer-left")
      socket.off("offer")
      socket.off("answer")
      socket.off("ice-candidate")
      socket.off("stream-ended")
      socket.off("viewer-count")
      cleanupPeerConnections()
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [socket, isHost, localStream])

  // Create a new peer connection for a viewer
  const createPeerConnection = async (peerId: string, socket: Socket, stream: MediaStream) => {
    try {
      const peerConnection = new RTCPeerConnection(iceServers)

      // Add local stream tracks to the connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream)
      })

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            to: peerId,
            candidate: event.candidate,
          })
        }
      }

      // Create and send offer if host
      if (isHost) {
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        socket.emit("offer", {
          to: peerId,
          offer,
        })
      }

      // Store the peer connection
      peerConnections.current.push({
        id: peerId,
        connection: peerConnection,
      })

      return peerConnection
    } catch (err) {
      console.error("Error creating peer connection:", err)
      setError("Failed to create peer connection")
      return null
    }
  }

  // Handle an offer from a peer
  const handleOffer = async (peerId: string, offer: RTCSessionDescriptionInit, socket: Socket) => {
    try {
      // Create a new peer connection if we don't have one for this peer
      let peerConnection = peerConnections.current.find((p) => p.id === peerId)?.connection

      if (!peerConnection) {
        // For viewers, we need to create a connection when we receive an offer
        peerConnection = new RTCPeerConnection(iceServers)

        // Handle incoming streams
        peerConnection.ontrack = (event) => {
          console.log("Received remote track")
          if (event.streams && event.streams[0]) {
            setRemoteStreams((prev) => {
              const newMap = new Map(prev)
              newMap.set(peerId, event.streams[0])
              return newMap
            })
          }
        }

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              to: peerId,
              candidate: event.candidate,
            })
          }
        }

        peerConnections.current.push({
          id: peerId,
          connection: peerConnection,
        })
      }

      // Set the remote description (the offer)
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))

      // Create and send an answer
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)

      socket.emit("answer", {
        to: peerId,
        answer,
      })
    } catch (err) {
      console.error("Error handling offer:", err)
      setError("Failed to handle connection offer")
    }
  }

  // Handle an answer from a peer
  const handleAnswer = (peerId: string, answer: RTCSessionDescriptionInit) => {
    try {
      const peerConnection = peerConnections.current.find((p) => p.id === peerId)?.connection
      if (peerConnection) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
      }
    } catch (err) {
      console.error("Error handling answer:", err)
      setError("Failed to handle connection answer")
    }
  }

  // Handle an ICE candidate from a peer
  const handleIceCandidate = (peerId: string, candidate: RTCIceCandidateInit) => {
    try {
      const peerConnection = peerConnections.current.find((p) => p.id === peerId)?.connection
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      }
    } catch (err) {
      console.error("Error handling ICE candidate:", err)
      setError("Failed to handle connection candidate")
    }
  }

  // Remove a peer connection
  const removePeerConnection = (peerId: string) => {
    const peerConnection = peerConnections.current.find((p) => p.id === peerId)
    if (peerConnection) {
      peerConnection.connection.close()
      peerConnections.current = peerConnections.current.filter((p) => p.id !== peerId)
    }

    setRemoteStreams((prev) => {
      const newMap = new Map(prev)
      newMap.delete(peerId)
      return newMap
    })
  }

  // Clean up all peer connections
  const cleanupPeerConnections = () => {
    peerConnections.current.forEach((peer) => {
      peer.connection.close()
    })
    peerConnections.current = []
    setRemoteStreams(new Map())
  }

  // Start broadcasting (for hosts)
  const startBroadcast = async () => {
    try {
      if (!socket) {
        setError("Socket connection not established")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      setLocalStream(stream)
      setIsStreaming(true)
      socket.emit("start-stream", { sessionId })

      return stream
    } catch (err) {
      console.error("Error starting broadcast:", err)
      setError("Failed to access camera and microphone")
    }
  }

  // Stop broadcasting (for hosts)
  const stopBroadcast = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop())
      setLocalStream(null)
    }

    cleanupPeerConnections()
    setIsStreaming(false)

    if (socket) {
      socket.emit("end-stream", { sessionId })
    }
  }

  return (
    <WebRTCContext.Provider
      value={{
        localStream,
        remoteStreams,
        startBroadcast,
        stopBroadcast,
        isStreaming,
        viewerCount,
        error,
      }}
    >
      {children}
    </WebRTCContext.Provider>
  )
} 