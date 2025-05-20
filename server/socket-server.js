const { Server } = require("socket.io")
const { createServer } = require("http")
const { v4: uuidv4 } = require("uuid")

// Create HTTP server
const httpServer = createServer()

// Create Socket.IO server with CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// Store active sessions and their messages
const sessions = new Map()

// Store user information
const users = new Map()

// Initialize a session if it doesn't exist
function initSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      messages: [],
      users: new Set(),
      streaming: false,
      host: null,
    })
  }
  return sessions.get(sessionId)
}

// Socket.IO connection handler
io.on("connection", (socket) => {
  const { sessionId, userId, username, avatar, isHost } = socket.handshake.query

  console.log(`User connected: ${username} (${userId}) to session ${sessionId}`)

  // Store user information
  users.set(socket.id, {
    id: userId,
    username,
    avatar,
    isHost: isHost === "true",
    sessionId,
  })

  // Initialize or get session
  const session = initSession(sessionId)

  // Add user to session
  session.users.add(socket.id)

  // If this is the host, mark them as such
  if (isHost === "true") {
    session.host = socket.id
  }

  // Send existing messages to the newly connected user
  socket.emit("messages", session.messages)

  // Send list of online users
  const onlineUsers = Array.from(session.users)
    .map((id) => users.get(id))
    .filter(Boolean)

  io.to(sessionId).emit("users", onlineUsers)

  // Join the session room
  socket.join(sessionId)

  // If this is a viewer and there's an active stream, notify the host
  if (isHost !== "true" && session.streaming && session.host) {
    io.to(session.host).emit("viewer-joined", userId)

    // Update viewer count for everyone
    io.to(sessionId).emit("viewer-count", session.users.size - 1) // Subtract host
  }

  // Handle chat messages
  socket.on("message", (messageData) => {
    const message = {
      id: uuidv4(),
      ...messageData,
      timestamp: Date.now(),
    }

    // Store the message
    session.messages.push(message)

    // Limit stored messages to prevent memory issues
    if (session.messages.length > 100) {
      session.messages.shift()
    }

    // Broadcast the message to all users in the session
    io.to(sessionId).emit("message", message)
  })

  // Handle typing indicators
  socket.on("typing", (username) => {
    socket.to(sessionId).emit("typing", username)
  })

  socket.on("stop-typing", (username) => {
    socket.to(sessionId).emit("stop-typing", username)
  })

  // WebRTC signaling
  socket.on("start-stream", ({ sessionId }) => {
    const session = sessions.get(sessionId)
    if (session) {
      session.streaming = true

      // Notify all viewers that stream has started
      socket.to(sessionId).emit("stream-started")

      // Update viewer count
      io.to(sessionId).emit("viewer-count", session.users.size - 1) // Subtract host
    }
  })

  socket.on("end-stream", ({ sessionId }) => {
    const session = sessions.get(sessionId)
    if (session) {
      session.streaming = false

      // Notify all viewers that stream has ended
      socket.to(sessionId).emit("stream-ended")
    }
  })

  socket.on("offer", ({ to, offer }) => {
    io.to(to).emit("offer", { from: userId, offer })
  })

  socket.on("answer", ({ to, answer }) => {
    io.to(to).emit("answer", { from: userId, answer })
  })

  socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", { from: userId, candidate })
  })

  // Handle disconnection
  socket.on("disconnect", () => {
    const user = users.get(socket.id)
    if (!user) return

    console.log(`User disconnected: ${user.username} (${user.id})`)

    // Remove user from session
    const session = sessions.get(user.sessionId)
    if (session) {
      session.users.delete(socket.id)

      // If this was the host, end the stream
      if (user.isHost) {
        session.streaming = false
        session.host = null
        io.to(user.sessionId).emit("stream-ended")
      } else if (session.host) {
        // If this was a viewer, notify the host
        io.to(session.host).emit("viewer-left", user.id)
      }

      // Update online users list
      const onlineUsers = Array.from(session.users)
        .map((id) => users.get(id))
        .filter(Boolean)

      io.to(user.sessionId).emit("users", onlineUsers)

      // Update viewer count
      if (session.streaming) {
        io.to(user.sessionId).emit("viewer-count", session.users.size - 1) // Subtract host
      }

      // Clean up empty sessions
      if (session.users.size === 0) {
        sessions.delete(user.sessionId)
      }
    }

    // Remove user from users map
    users.delete(socket.id)
  })
})

// Start the server
const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
