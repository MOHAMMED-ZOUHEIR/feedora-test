"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useWebRTC } from "@/lib/webrtc"
import { Mic, MicOff, Video, VideoOff, Users, Settings } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

interface LiveStreamProps {
  isHost: boolean
  sessionId: string
}

export default function LiveStream({ isHost, sessionId }: LiveStreamProps) {
  const { localStream, remoteStreams, startBroadcast, stopBroadcast, isStreaming, viewerCount, error } = useWebRTC()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [fallbackActive, setFallbackActive] = useState(true)
  const [streamStarted, setStreamStarted] = useState(false)
  const [demoActive, setDemoActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const [availableDevices, setAvailableDevices] = useState<{
    videoDevices: MediaDeviceInfo[]
    audioDevices: MediaDeviceInfo[]
  }>({
    videoDevices: [],
    audioDevices: [],
  })

  // Get available media devices - only if host
  useEffect(() => {
    if (!isHost) return;
    
    async function getDevices() {
      try {
        // Request permission first by getting a stream
        await navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            // Stop the stream immediately, we just needed it for permissions
            stream.getTracks().forEach((track) => track.stop())
          })
          .catch((err) => console.error("Error getting permission:", err))

        // Now get the devices
        const devices = await navigator.mediaDevices.enumerateDevices()

        setAvailableDevices({
          videoDevices: devices.filter((device) => device.kind === "videoinput"),
          audioDevices: devices.filter((device) => device.kind === "audioinput"),
        })
      } catch (err) {
        console.error("Error enumerating devices:", err)
      }
    }

    getDevices()
  }, [isHost])

  // Set up local stream for host
  useEffect(() => {
    if (isHost && localStream && videoRef.current) {
      videoRef.current.srcObject = localStream
      setFallbackActive(false)
      setStreamStarted(true)
    }
  }, [isHost, localStream])

  // Set up remote stream for viewers
  useEffect(() => {
    if (!isHost && remoteStreams.size > 0 && videoRef.current) {
      // Just use the first remote stream for now
      const stream = remoteStreams.values().next().value
      if (stream) {
        videoRef.current.srcObject = stream
        setFallbackActive(false)
        setStreamStarted(true)
      }
    }
  }, [isHost, remoteStreams])

  // Demo animation effect
  useEffect(() => {
    if (demoActive) {
      // Create canvas if it doesn't exist
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
        canvasRef.current.width = 640;
        canvasRef.current.height = 480;
      }

      // Start animation
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Create a stream from the canvas
      let canvasStream;
      try {
        canvasStream = canvas.captureStream(30);
        
        // Create silent audio context for browsers that require audio
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const destination = audioContext.createMediaStreamDestination();
          
          const gainNode = audioContext.createGain();
          gainNode.gain.value = 0.001; // Nearly silent
          
          oscillator.connect(gainNode);
          gainNode.connect(destination);
          oscillator.start();
          
          const audioTrack = destination.stream.getAudioTracks()[0];
          if (audioTrack) {
            canvasStream.addTrack(audioTrack);
          }
        } catch (e) {
          console.warn('Could not add audio track:', e);
        }

        // Connect to video element
        if (videoRef.current) {
          videoRef.current.srcObject = canvasStream;
          videoRef.current.play().catch(e => console.error('Error playing video:', e));
          setFallbackActive(false);
          setStreamStarted(true);
        }
      } catch (e) {
        console.error('Failed to create stream:', e);
        // Show error message
        return;
      }
      
      // Simple animation function
      const drawDemo = () => {
        if (!ctx) return;
        
        // Clear canvas with gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#0a0a0a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Current time for animation
        const time = Date.now() / 1000;
        
        // Draw cooking pot
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 85, 0, Math.PI * 2);
        ctx.fillStyle = '#E63946';
        ctx.fill();
        
        // Draw bubbling effect
        for (let i = 0; i < 12; i++) {
          const offset = i * Math.PI / 6;
          const size = 10 + Math.sin(time * 2 + offset) * 6;
          const x = canvas.width / 2 + Math.cos(offset) * (40 + Math.sin(time + i) * 10);
          const y = canvas.height / 2 + Math.sin(offset) * (20 + Math.sin(time * 1.5 + i) * 5);
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fill();
        }
        
        // Draw stream info
        ctx.fillStyle = "white";
        ctx.font = "16px sans-serif";
        ctx.fillText("Feedora Live Cooking Demo", 20, 30);
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("Thai Green Curry", canvas.width / 2 - 80, canvas.height - 40);
        ctx.font = "14px sans-serif";
        ctx.fillText(new Date().toLocaleTimeString(), canvas.width - 100, 30);
        
        // Continue animation
        animationRef.current = requestAnimationFrame(drawDemo);
      };
      
      // Start animation loop
      animationRef.current = requestAnimationFrame(drawDemo);
      
      // Cleanup on unmount
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [demoActive]);

  // Prevent auto-scrolling when starting the stream
  useEffect(() => {
    if (streamStarted) {
      // Disable any scrolling behavior when the stream starts
      const saveScrollPosition = () => {
        const scrollPosition = window.scrollY
        window.scrollTo(0, scrollPosition)
      }
      
      window.addEventListener('scroll', saveScrollPosition, { once: true })
      
      return () => {
        window.removeEventListener('scroll', saveScrollPosition)
      }
    }
  }, [streamStarted])

  // Handle ready state to avoid blank video
  useEffect(() => {
    if (videoRef.current) {
      const handleCanPlay = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => {
            console.error('Error playing video:', e);
            setDemoActive(true);
          });
        }
      };

      videoRef.current.addEventListener('canplay', handleCanPlay);
      
      return () => {
      if (videoRef.current) {
          videoRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [videoRef]);

  // Start streaming for demo purposes
  const handleStartDemo = async () => {
    // If host with WebRTC, try to start broadcast first
    if (isHost && !error) {
      try {
        await startBroadcast();
        // If broadcast starts successfully, exit demo mode
        setDemoActive(false);
        setStreamStarted(true);
        setFallbackActive(false); // Ensure fallback is off when stream starts
        return; // Exit if broadcast started
      } catch (err) {
        console.error('Failed to start broadcast:', err);
        // Fallback to demo if broadcast fails
        setError('Failed to start broadcast. Falling back to demo.');
      }
    }

    // Activate demo mode if not a host or broadcast failed
    setFallbackActive(false); // Hide connecting screen
    setDemoActive(true);
    setStreamStarted(true);
  }

  // Toggle audio mute
  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMuted(!isMuted)
    }
  }

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsVideoOff(!isVideoOff)
    }
  }

  // Change device
  const changeDevice = async (deviceId: string, kind: "audio" | "video") => {
    if (!localStream) return

    try {
      const constraints: MediaStreamConstraints = {}

      if (kind === "audio") {
        constraints.audio = { deviceId: { exact: deviceId } }
      } else {
        constraints.video = { deviceId: { exact: deviceId } }
      }

      // Get a new stream with the selected device
      const newStream = await navigator.mediaDevices.getUserMedia(constraints)

      // Replace the track in the local stream
      if (kind === "audio") {
        const [audioTrack] = newStream.getAudioTracks()
        const senders = localStream.getAudioTracks()
        senders.forEach((sender) => {
          localStream.removeTrack(sender)
          sender.stop()
        })
        localStream.addTrack(audioTrack)
      } else {
        const [videoTrack] = newStream.getVideoTracks()
        const senders = localStream.getVideoTracks()
        senders.forEach((sender) => {
          localStream.removeTrack(sender)
          sender.stop()
        })
        localStream.addTrack(videoTrack)
      }

      // Update the video element
      if (videoRef.current) {
        videoRef.current.srcObject = localStream
      }
    } catch (err) {
      console.error(`Error changing ${kind} device:`, err)
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
      {error && !demoActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
          <div className="text-center p-4">
            <p className="text-red-500 mb-2">Error: {error}</p>
            <Button
              variant="outline"
              onClick={() => setDemoActive(true)}
              className="border-white text-white hover:bg-white/20"
            >
              Use Demo Mode
            </Button>
          </div>
        </div>
      )}

      {/* Fallback screen while video is loading */}
      {fallbackActive ? (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
            <Users className="h-3 w-3" />
            {viewerCount || Math.floor(Math.random() * 1000) + 500} watching
          </div>

          {/* Loading indicator */}
          <div className="flex flex-col items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946] mb-4"></div>
            <p className="text-white text-lg font-medium mb-6">Connecting to live stream...</p>

            {/* Demo button for immediate feedback - super prominent */}
            <Button 
              onClick={handleStartDemo} 
              className="mt-4 bg-[#E63946] hover:bg-[#c62b38] px-10 py-6 text-xl relative shadow-lg shadow-[#E63946]/30 min-w-[250px] scale-110 hover:scale-105 transition-transform"
            >
              <span className="flex items-center gap-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              Start Demo Stream
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isHost} // Mute local video to prevent feedback
        className="w-full h-full object-cover"
      />

          {/* Status indicators - only show when video is active */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white z-10">
            <Users className="h-3 w-3" />
            {viewerCount || Math.floor(Math.random() * 1000) + 500} watching
          </div>

          <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white z-10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>
        </>
      )}

      {!isStreaming && !localStream && isHost && !fallbackActive && !demoActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Button onClick={() => startBroadcast()} className="bg-[#E63946] hover:bg-[#c62b38] text-white">
            Start Streaming
          </Button>
        </div>
      )}

      {isHost && (isStreaming || !fallbackActive) && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full p-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="rounded-full bg-white/10 text-white hover:bg-white/20 h-10 w-10"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVideo}
            className="rounded-full bg-white/10 text-white hover:bg-white/20 h-10 w-10"
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 text-white hover:bg-white/20 h-10 w-10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Stream Settings</h4>

                <div className="space-y-2">
                  <Label htmlFor="camera">Camera</Label>
                  <Select onValueChange={(value) => changeDevice(value, "video")}>
                    <SelectTrigger id="camera">
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDevices.videoDevices.map((device) => (
                        <SelectItem key={device.deviceId} value={device.deviceId}>
                          {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="microphone">Microphone</Label>
                  <Select onValueChange={(value) => changeDevice(value, "audio")}>
                    <SelectTrigger id="microphone">
                      <SelectValue placeholder="Select microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDevices.audioDevices.map((device) => (
                        <SelectItem key={device.deviceId} value={device.deviceId}>
                          {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hd-toggle">Stream in HD</Label>
                  <Switch id="hd-toggle" />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="destructive" onClick={() => stopBroadcast()} className="rounded-full">
            End Stream
          </Button>
        </div>
      )}
    </div>
  )
}
