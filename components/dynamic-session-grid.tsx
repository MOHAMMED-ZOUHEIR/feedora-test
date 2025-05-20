"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/animated-button"
import { Play, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { generateRandomContent } from "@/components/dynamic-content-generator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Types
interface Session {
  id: string
  title: string
  chef: string
  chefAvatar?: string
  cuisine: string
  isLive?: boolean
  viewers?: number
  thumbnail?: string
  upcoming?: boolean
  date?: string
  time?: string
  description?: string
}

export const DynamicSessionGrid = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("live")
  const [liveSessions, setLiveSessions] = useState<Session[]>([])
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([])
  const [pastSessions, setPastSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [featuredSession, setFeaturedSession] = useState<Session | null>(null)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Generate random sessions on mount
  useEffect(() => {
    const generateSessions = () => {
      // Generate live sessions
      const live = Array.from({ length: 6 }, () => {
        const content = generateRandomContent("session")
        const session = content.data
        session.isLive = true
        session.upcoming = false
        return session
      })

      // Generate upcoming sessions
      const upcoming = Array.from({ length: 6 }, () => {
        const content = generateRandomContent("session")
        const session = content.data
        session.isLive = false
        session.upcoming = true
        session.date = new Date(Date.now() + Math.random() * 604800000).toLocaleDateString() // Random date within next week
        session.time = `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? "30" : "00"} ${
          Math.random() > 0.5 ? "AM" : "PM"
        }`
        return session
      })

      // Generate past sessions
      const past = Array.from({ length: 6 }, () => {
        const content = generateRandomContent("session")
        const session = content.data
        session.isLive = false
        session.upcoming = false
        session.viewers = Math.floor(Math.random() * 5000) + 500 // Past viewer count
        return session
      })

      // Set featured session (random from live sessions)
      const featured = live[Math.floor(Math.random() * live.length)]
      featured.viewers = Math.floor(Math.random() * 3000) + 1000 // More viewers for featured
      featured.description =
        "Join this exciting live cooking session where you'll learn professional techniques and insider tips to create this delicious dish from scratch."

      setLiveSessions(live)
      setUpcomingSessions(upcoming)
      setPastSessions(past)
      setFeaturedSession(featured)
      setIsLoading(false)
    }

    // Simulate network delay
    setTimeout(generateSessions, 1000)
  }, [])

  // Handle session click
  const handleSessionClick = (session: Session) => {
    if (session.isLive) {
      setSelectedSession(session)
      setIsDialogOpen(true)
    } else {
      router.push(`/live-sessions/${session.id}`)
    }
  }

  // Render session card
  const renderSessionCard = (session: Session) => (
    <Card
      key={session.id}
      className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group"
      onClick={() => handleSessionClick(session)}
    >
      <div className="relative aspect-video">
        <Image
          src={session.thumbnail || "/placeholder.svg?height=180&width=320"}
          alt={session.title}
          width={320}
          height={180}
          className="object-cover w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {session.isLive && (
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>
        )}

        {session.upcoming && (
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#F4A261] text-white">
            UPCOMING
          </div>
        )}

        {session.viewers && session.viewers > 0 && (
          <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
            {session.viewers.toLocaleString()} {session.isLive ? "watching" : "views"}
          </div>
        )}

        <Button className="absolute bottom-2 left-2 bg-[#E63946] hover:bg-[#c62b38] text-xs h-8 transition-all duration-300 opacity-0 group-hover:opacity-100">
          {session.isLive ? "Join Now" : session.upcoming ? "Remind Me" : "Watch"}
        </Button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{session.title}</h3>
          <Badge className="bg-[#2A9D8F] hover:bg-[#2A9D8F]">{session.cuisine}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={session.chefAvatar || "/placeholder.svg?height=24&width=24"} alt={session.chef} />
            <AvatarFallback>{session.chef.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{session.chef}</span>
        </div>

        {session.upcoming && session.date && session.time && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{session.time}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="live" className="relative overflow-hidden">
            Live Now
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#E63946] animate-pulse"></span>
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-video bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveSessions.map((session) => renderSessionCard(session))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-video bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSessions.map((session) => renderSessionCard(session))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-video bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastSessions.map((session) => renderSessionCard(session))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Featured Live Session */}
      {!isLoading && featuredSession && (
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            Featured Live Session
            <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-[#E63946] animate-pulse"></span>
          </h2>

          <div
            className="relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => {
              setSelectedSession(featuredSession)
              setIsDialogOpen(true)
            }}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black group">
              <Image
                src={featuredSession.thumbnail || "/placeholder.svg?height=480&width=854"}
                alt="Live session"
                width={854}
                height={480}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </div>
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
                {featuredSession.viewers?.toLocaleString()} watching
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-[#E63946]/80 text-white hover:bg-[#E63946] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Play className="h-8 w-8 fill-current" />
              </Button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{featuredSession.title}</h2>
                    <div className="flex items-center gap-2 text-white/80">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={featuredSession.chefAvatar || "/placeholder.svg?height=24&width=24"}
                          alt={featuredSession.chef}
                        />
                        <AvatarFallback>{featuredSession.chef.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{featuredSession.chef}</span>
                    </div>
                  </div>
                  <AnimatedButton animation="scale" className="bg-[#E63946] hover:bg-[#c62b38]">
                    Join Now
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4">
            <DialogTitle>{selectedSession?.title}</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="p-4">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Live Session Preview</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedSession.chef} is cooking {selectedSession.title}
                  </p>
                  <Button className="bg-[#E63946] hover:bg-[#c62b38]">
                    <Play className="h-4 w-4 mr-2" />
                    Join Live Session
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Also keep the default export for backward compatibility
export default DynamicSessionGrid
