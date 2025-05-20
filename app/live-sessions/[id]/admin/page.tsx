"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import GlobalHeader from "@/components/global-header"
import LiveSessionProviders from "@/components/live-session-providers"
import LiveSessionAdminPanel from "@/components/live-session-admin-panel"
import LiveStream from "@/components/live-stream"
import LiveChat from "@/components/live-chat"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user data for the host - in a real app, this would come from authentication
const hostUser = {
  id: "host-1",
  username: "Chef Suwanee",
  avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=32&h=32&auto=format&fit=facearea&facepad=2",
}

// Mock session data - in a real app, this would come from an API
const mockSessionData = {
  id: "session-123",
  title: "Authentic Thai Green Curry",
  chef: "Chef Suwanee",
  cuisine: "Thai",
  description: "Join Chef Suwanee as she guides you through creating an authentic Thai Green Curry from scratch. Learn the secrets to balancing the perfect flavors of spicy, sweet, salty, and sour that make Thai cuisine so distinctive.",
  viewers: 0,
  thumbnail: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=800&h=450&auto=format&fit=crop",
}

export default function LiveSessionAdminPage() {
  const params = useParams()
  const sessionId = params.id as string
  const [sessionData, setSessionData] = useState(mockSessionData)
  const [activeTab, setActiveTab] = useState("stream")

  // In a real app, you would fetch the session data from an API
  useEffect(() => {
    // Simulate loading session data
    setSessionData({
      ...mockSessionData,
      id: sessionId || mockSessionData.id,
    })
  }, [sessionId])

  return (
    <LiveSessionProviders
      sessionId={sessionId}
      userId={hostUser.id}
      username={hostUser.username}
      avatar={hostUser.avatar}
      isHost={true}
    >
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <main className="container px-4 pt-24 pb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard: {sessionData.title}</h1>
            <p className="text-muted-foreground">Manage your live cooking session</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mb-6">
              <TabsTrigger value="stream" className="flex-1">
                Live Stream
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1">
                Chat
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex-1">
                Admin Panel
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`${activeTab !== "admin" ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}>
                <TabsContent value="stream" className="mt-0">
                  <LiveStream isHost={true} sessionId={sessionId} />
                </TabsContent>
                
                <TabsContent value="chat" className="mt-0">
                  <Card className="h-[600px]">
                    <LiveChat />
                  </Card>
                </TabsContent>
                
                <TabsContent value="admin" className="mt-0">
                  <LiveSessionAdminPanel sessionId={sessionId} title={sessionData.title} />
                </TabsContent>
              </div>
              
              {activeTab !== "admin" && (
                <div className="lg:col-span-1">
                  <LiveSessionAdminPanel sessionId={sessionId} title={sessionData.title} />
                </div>
              )}
            </div>
          </Tabs>
        </main>
      </div>
    </LiveSessionProviders>
  )
}
