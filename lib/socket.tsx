"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Define a mock interface that mimics Socket but doesn't require the actual socket.io library
interface MockSocket {
  id?: string;
  connected?: boolean;
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string) => void;
}

export interface ChatMessage {
  id: string
  userId: string
  username: string
  avatar?: string
  text: string
  timestamp: number
  isHost?: boolean
}

interface SocketContextType {
  socket: MockSocket | null
  isConnected: boolean
  error: string | null
  messages: ChatMessage[]
  sendMessage: (text: string) => void
  onlineUsers: string[]
  typingUsers: string[]
  startTyping: () => void
  stopTyping: () => void
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  error: null,
  messages: [],
  sendMessage: () => {},
  onlineUsers: [],
  typingUsers: [],
  startTyping: () => {},
  stopTyping: () => {}
})

export const useSocket = () => useContext(SocketContext)

interface SocketProviderProps {
  children: React.ReactNode
  sessionId: string
  userId: string
  username: string
  avatar: string
  isHost: boolean
}

// Demo messages for immediate feedback
const demoMessages: ChatMessage[] = [
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
export const SocketProvider: React.FC<SocketProviderProps> = ({ 
  children,
  sessionId,
  userId,
  username,
  avatar,
  isHost
}) => {
  // Create a mock socket that doesn't actually connect to anything
  const mockSocket: MockSocket = {
    id: `mock-${Math.random().toString(36).substring(2, 9)}`,
    connected: true,
    emit: (event, ...args) => {
      console.log(`Mock socket emitted ${event}:`, args);
      // We could implement mock event handling here if needed
    },
    on: (event, callback) => {
      console.log(`Mock socket registered listener for ${event}`);
      // We don't actually register any events since this is a mock
    },
    off: (event) => {
      console.log(`Mock socket removed listener for ${event}`);
      // We don't actually remove any events since this is a mock
    }
  };
  
  const [socket] = useState<MockSocket>(mockSocket);
  const [isConnected] = useState(true); // Always connected in mock mode
  const [error] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(demoMessages);
  const [onlineUsers, setOnlineUsers] = useState<string[]>(["User1", "User2", "User3", "CookingFan123"]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    // Simulate connection success
    console.log("Mock socket connected");
    
    // Add random users occasionally
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomUser = `User${Math.floor(Math.random() * 100)}`;
        setOnlineUsers((prev: string[]) => [...prev, randomUser]);
        
        // And remove them after a while
        setTimeout(() => {
          setOnlineUsers((prev: string[]) => prev.filter(u => u !== randomUser));
        }, 30000 + Math.random() * 60000);
      }
    }, 20000);
    
    // Occasionally add a random message
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const demoUsers = ["CookingFan123", "ThaiFood4Life", "SpiceLover", "RecipeHunter", "KitchenExplorer"];
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
        ];

        const newMessage: ChatMessage = {
          id: `demo-${Date.now()}`,
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          username: demoUsers[Math.floor(Math.random() * demoUsers.length)],
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
          text: demoTexts[Math.floor(Math.random() * demoTexts.length)],
          timestamp: Date.now(),
        };

        setMessages((prev: ChatMessage[]) => [...prev, newMessage]);
      }
    }, 15000);
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  // Send a chat message
  const sendMessage = (text: string) => {
    if (text.trim()) {
      const message: ChatMessage = {
        id: `user-${Date.now()}`,
        userId,
        username,
        avatar,
        text,
        timestamp: Date.now(),
        isHost,
      };

      // If socket is connected, emit the message
      if (socket) {
        socket.emit("chat-message", {
          sessionId,
          message,
        });
      }

      // Add message to local state immediately for better UX
      setMessages((prev: ChatMessage[]) => [...prev, message]);
      
      // For demo: simulate a response from the host if the user is not the host
      if (!isHost && Math.random() > 0.7) {
        setTimeout(() => {
          const hostResponses = [
            `Thanks for your question! ${text.includes("?") ? "Let me address that." : "I appreciate your comment."}`,
            "Great question! I'll show you that in just a moment.",
            "Thanks for joining us today! Keep the questions coming.",
            "That's a good point! I'll make sure to cover that.",
          ];
          
          const hostMessage: ChatMessage = {
            id: `host-${Date.now()}`,
            userId: "host-1",
            username: "Chef Suwanee",
            avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=24&h=24&auto=format&fit=facearea&facepad=2",
            text: hostResponses[Math.floor(Math.random() * hostResponses.length)],
            timestamp: Date.now(),
            isHost: true,
          };
          
          setMessages((prev: ChatMessage[]) => [...prev, hostMessage]);
        }, 2000 + Math.random() * 3000);
      }
    }
  };

  // Start typing indicator
  const startTyping = () => {
    if (socket) {
      socket.emit("typing", {
        sessionId,
        username,
      });
    }
    
    // For demo purposes, simulate someone else typing occasionally
    if (Math.random() > 0.8) {
      const demoUsers = ["FoodieForever", "CookingNewbie", "ChefInTraining", "RecipeHunter"];
      const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
      
      setTypingUsers((prev: string[]) => {
        if (!prev.includes(randomUser)) {
          return [...prev, randomUser];
        }
        return prev;
      });
      
      setTimeout(() => {
        setTypingUsers((prev: string[]) => prev.filter((name: string) => name !== randomUser));
      }, 3000 + Math.random() * 5000);
    }
  };

  // Stop typing indicator
  const stopTyping = () => {
    if (socket) {
      socket.emit("stop-typing", {
        sessionId,
        username,
      });
    }
    
    // For demo purposes, we don't need to do anything else here
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        error,
        messages,
        sendMessage,
        onlineUsers,
        typingUsers,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}