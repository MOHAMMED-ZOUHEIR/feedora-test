"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { notFound } from "next/navigation"
import LiveSessionDetail from "@/live-session-detail"
import { Skeleton } from "@/components/ui/skeleton"

export default function LiveSessionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [sessionData, setSessionData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const isHost = searchParams.get("host") === "true"
  const id = params.id as string

  useEffect(() => {
    // Simulate fetching session data
    const fetchSession = async () => {
      setIsLoading(true)

      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a network delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock session data
        const mockSessions = {
          "1": {
            id: "1",
            title: "Perfect Pasta Carbonara",
            chef: "Chef Antonio",
            cuisine: "Italian",
            description: "Learn the secrets to making authentic pasta carbonara with a creamy sauce.",
            viewers: 1243,
            thumbnail: "/placeholder.svg?height=480&width=854",
          },
          "2": {
            id: "2",
            title: "Authentic Thai Green Curry",
            chef: "Chef Suwanee",
            cuisine: "Thai",
            description: "Master the art of balancing flavors in this classic Thai dish.",
            viewers: 987,
            thumbnail: "/placeholder.svg?height=480&width=854",
          },
          "3": {
            id: "3",
            title: "French Pastry Basics",
            chef: "Chef Marie",
            cuisine: "French",
            description: "Learn the fundamental techniques of French pastry making.",
            viewers: 756,
            thumbnail: "/placeholder.svg?height=480&width=854",
          },
          featured: {
            id: "featured",
            title: "Authentic Thai Green Curry",
            chef: "Chef Suwanee",
            cuisine: "Thai",
            description: "Master the art of balancing flavors in this classic Thai dish.",
            viewers: 2543,
            thumbnail: "/placeholder.svg?height=480&width=854",
          },
        }

        // If it's a new session (from host controls)
        if (id.startsWith("new-")) {
          const newSession = {
            id,
            title: "My Live Cooking Session",
            chef: "You",
            cuisine: "Home Cooking",
            description: "Join me as I cook my favorite recipe!",
            viewers: Math.floor(Math.random() * 100) + 10,
            thumbnail: "/placeholder.svg?height=480&width=854",
          }
          setSessionData(newSession)
        } else {
          // Get existing session or 404
          const session = mockSessions[id]
          if (!session) {
            notFound()
          }
          setSessionData(session)
        }
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [id])

  if (isLoading) {
    return (
      <div className="container px-4 py-6">
        <Skeleton className="h-12 w-2/3 mb-2" />
        <Skeleton className="h-6 w-1/3 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  return <LiveSessionDetail sessionData={sessionData} isHost={isHost} />
}
