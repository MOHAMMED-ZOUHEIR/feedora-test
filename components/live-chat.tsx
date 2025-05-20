"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSocket, type ChatMessage } from "@/lib/socket"
import { Smile, Send } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Demo messages for immediate feedback
const demoMessages = [
  {
    id: "1",
    userId: "user-1",
    username: "CookingFan123",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
    text: "This looks amazing! Can't wait to try it.",
    timestamp: Date.now() - 300000, // 5 minutes ago
  },
  {
    id: "2",
    userId: "user-2",
    username: "ThaiFood4Life",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
    text: "Can I substitute chicken with tofu for a vegetarian version?",
    timestamp: Date.now() - 180000, // 3 minutes ago
  },
  {
    id: "3",
    userId: "host-1",
    username: "Chef Suwanee",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
    text: "@ThaiFood4Life Yes, tofu works great! Just make sure to press it well and fry it slightly before adding to the curry.",
    timestamp: Date.now() - 120000, // 2 minutes ago
    isHost: true,
  },
  {
    id: "4",
    userId: "user-3",
    username: "SpiceLover",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
    text: "How spicy is this curry? Can I adjust the heat level?",
    timestamp: Date.now() - 60000, // 1 minute ago
  },
]

export default function LiveChat() {
  const { messages: socketMessages, sendMessage, onlineUsers, typingUsers, startTyping, stopTyping } = useSocket()
  const [messageText, setMessageText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [demoMode, setDemoMode] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize with demo messages
  useEffect(() => {
    if (demoMode) {
      setMessages(demoMessages as ChatMessage[])

      // Add a new message every 10-20 seconds for a realistic feel
      const interval = setInterval(
        () => {
          const demoUsers = ["FoodieForever", "CookingNewbie", "ChefInTraining", "RecipeHunter", "KitchenExplorer"]
          const demoTexts = [
            "This looks delicious!",
            "What kind of knife do you recommend for chopping herbs?",
            "I'm definitely trying this recipe this weekend!",
            "How long will this keep in the refrigerator?",
            "Can I freeze the leftovers?",
            "What's your favorite brand of coconut milk?",
            "Is there a good substitute for fish sauce?",
            "The color looks amazing!",
            "Do you have any tips for growing Thai basil at home?",
            "How spicy is this on a scale of 1-10?",
          ]

          const newMessage: ChatMessage = {
            id: `demo-${Date.now()}`,
            userId: `user-${Math.floor(Math.random() * 1000)}`,
            username: demoUsers[Math.floor(Math.random() * demoUsers.length)],
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
            text: demoTexts[Math.floor(Math.random() * demoTexts.length)],
            timestamp: Date.now(),
          }

          setMessages((prev) => [...prev, newMessage])
        },
        Math.random() * 10000 + 10000,
      ) // Random interval between 10-20 seconds

      return () => clearInterval(interval)
    }
  }, [demoMode])

  // Use socket messages if available
  useEffect(() => {
    if (socketMessages && socketMessages.length > 0) {
      setMessages(socketMessages)
      setDemoMode(false)
    }
  }, [socketMessages])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    // Only auto-scroll if user is already at bottom or if it's a new user message
    const isUserNearBottom = () => {
      const container = messagesEndRef.current?.parentElement;
      if (!container) return false;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Consider "near bottom" if within 100px of bottom
      return scrollHeight - scrollTop - clientHeight < 100;
    };

    const isLatestMessageFromUser = () => {
      const latestMessage = messages[messages.length - 1];
      return latestMessage?.userId === "current-user";
    };

    // Only auto-scroll if user is near bottom or if it's their own message
    if (isUserNearBottom() || isLatestMessageFromUser()) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle typing indicator
  useEffect(() => {
    if (messageText && !isTyping) {
      setIsTyping(true)
      startTyping()
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
        stopTyping()
      }
    }, 1000)

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [messageText, isTyping, startTyping, stopTyping])

  const handleSendMessage = () => {
    if (messageText.trim()) {
      if (demoMode) {
        // In demo mode, add the message locally
        const newMessage: ChatMessage = {
          id: `user-${Date.now()}`,
          userId: "current-user",
          username: "You",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
          text: messageText,
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, newMessage])

        // Simulate a response from the host after a short delay
        if (Math.random() > 0.7) {
          // 30% chance of getting a response
          setTimeout(
            () => {
              const hostResponses = [
                `Thanks for your question! ${messageText.includes("?") ? "Let me address that." : "I appreciate your comment."}`,
                "Great question! I'll show you that in just a moment.",
                "Thanks for joining us today! Keep the questions coming.",
                "That's a good point! I'll make sure to cover that.",
              ]

              const hostResponse: ChatMessage = {
                id: `host-${Date.now()}`,
                userId: "host-1",
                username: "Chef Suwanee",
                avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
                text: hostResponses[Math.floor(Math.random() * hostResponses.length)],
                timestamp: Date.now(),
                isHost: true,
              }

              setMessages((prev) => [...prev, hostResponse])
            },
            2000 + Math.random() * 3000,
          ) // Random delay between 2-5 seconds
        }
      } else {
        // In real mode, use the socket
        sendMessage(messageText)
      }

      setMessageText("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold">Live Chat</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {onlineUsers?.length || Math.floor(Math.random() * 100) + 50} online
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
        {messages.map((message, index) => (
          <ChatMessageItem key={message.id || index} message={message} />
        ))}

        {typingUsers && typingUsers.length > 0 && (
          <div className="text-xs text-muted-foreground italic">
            {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t mt-auto">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Smile className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-8 gap-2">
                {[
                  "😀",
                  "😂",
                  "😍",
                  "🔥",
                  "👍",
                  "❤️",
                  "🎉",
                  "👏",
                  "😮",
                  "🤔",
                  "😢",
                  "😭",
                  "🙏",
                  "👨‍🍳",
                  "🍕",
                  "🍔",
                  "🍰",
                  "🍷",
                  "🍴",
                  "🥘",
                  "🥗",
                  "🍳",
                  "🧁",
                  "🍝",
                ].map((emoji) => (
                  <button
                    key={emoji}
                    className="text-xl p-1 hover:bg-muted rounded"
                    onClick={() => setMessageText((prev) => prev + emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 min-h-[40px] max-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />

          <Button
            size="icon"
            className="h-10 w-10 rounded-md bg-[#E63946] hover:bg-[#c62b38]"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChatMessageItem({ message }: { message: ChatMessage }) {
  return (
    <div className="flex gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={message.avatar || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2"} alt={message.username} />
        <AvatarFallback>{message.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium">{message.username}</span>
          {message.isHost && <Badge className="text-[0.6rem] py-0 px-1 h-4">HOST</Badge>}
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  )
}
