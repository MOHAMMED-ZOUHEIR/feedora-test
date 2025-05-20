import { NextResponse } from "next/server"

// Mock database of live sessions
const liveSessions = [
  {
    id: "1",
    title: "Perfect Pasta Carbonara",
    chef: "Chef Antonio",
    chefId: "chef-123",
    cuisine: "Italian",
    description: "Learn the secrets to making authentic pasta carbonara with a creamy sauce.",
    viewers: 1243,
    thumbnail: "/placeholder.svg?height=480&width=854",
    isLive: true,
    startedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Authentic Thai Green Curry",
    chef: "Chef Suwanee",
    chefId: "chef-456",
    cuisine: "Thai",
    description: "Master the art of balancing flavors in this classic Thai dish.",
    viewers: 987,
    thumbnail: "/placeholder.svg?height=480&width=854",
    isLive: true,
    startedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "French Pastry Basics",
    chef: "Chef Marie",
    chefId: "chef-789",
    cuisine: "French",
    description: "Learn the fundamental techniques of French pastry making.",
    viewers: 756,
    thumbnail: "/placeholder.svg?height=480&width=854",
    isLive: true,
    startedAt: new Date().toISOString(),
  },
  {
    id: "featured",
    title: "Authentic Thai Green Curry",
    chef: "Chef Suwanee",
    chefId: "chef-456",
    cuisine: "Thai",
    description: "Master the art of balancing flavors in this classic Thai dish.",
    viewers: 2543,
    thumbnail: "/placeholder.svg?height=480&width=854",
    isLive: true,
    startedAt: new Date().toISOString(),
  },
]

// Get all live sessions
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const session = liveSessions.find((s) => s.id === id)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }
    return NextResponse.json(session)
  }

  return NextResponse.json(liveSessions)
}

// Create a new live session
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.chef) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new session
    const newSession = {
      id: `new-${Date.now()}`,
      title: data.title,
      chef: data.chef,
      chefId: data.chefId || `chef-${Date.now()}`,
      cuisine: data.cuisine || "Other",
      description: data.description || "",
      viewers: 0,
      thumbnail: data.thumbnail || "/placeholder.svg?height=480&width=854",
      isLive: true,
      startedAt: new Date().toISOString(),
    }

    // In a real app, you would save this to a database
    liveSessions.push(newSession)

    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
