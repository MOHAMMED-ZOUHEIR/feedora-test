import type React from "react"
import { SocketProvider } from "@/lib/socket"
import { WebRTCProvider } from "@/lib/webrtc"

interface LiveSessionProvidersProps {
  children: React.ReactNode
  sessionId: string
  userId: string
  username: string
  avatar: string
  isHost: boolean
}

export default function LiveSessionProviders({
  children,
  sessionId,
  userId,
  username,
  avatar,
  isHost,
}: LiveSessionProvidersProps) {
  return (
    <SocketProvider sessionId={sessionId} userId={userId} username={username} avatar={avatar} isHost={isHost}>
      <WebRTCProvider sessionId={sessionId} isHost={isHost}>
        {children}
      </WebRTCProvider>
    </SocketProvider>
  )
}
