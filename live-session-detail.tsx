"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import LiveSessionProviders from "@/components/live-session-providers"
import LiveChat from "@/components/live-chat"
import LiveStream from "@/components/live-stream"
import GlobalHeader from "@/components/global-header"
import { AnimatedButton } from "@/components/animated-button"
import { DynamicContentFeed } from "@/components/dynamic-content-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShareLiveSession } from "@/components/share-live-session"

// Mock user data - in a real app, this would come from authentication
const currentUser = {
  id: "user-" + Math.random().toString(36).substr(2, 9),
  username: "GuestUser" + Math.floor(Math.random() * 1000),
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=32&h=32&auto=format&fit=facearea&facepad=2",
}

interface SessionData {
  id: string
  title: string
  chef: string
  cuisine: string
  description: string
  viewers: number
  thumbnail: string
}

interface LiveSessionDetailProps {
  sessionData?: SessionData
  isHost?: boolean
}

export default function LiveSessionDetail({ sessionData, isHost = false }: LiveSessionDetailProps) {
  const [sessionId, setSessionId] = useState(sessionData?.id || "session-123")
  const [isLoading, setIsLoading] = useState(true)
  const [viewerCount, setViewerCount] = useState(sessionData?.viewers || 0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("live")
  const [ingredients, setIngredients] = useState([
    { name: "Thai Green Curry Paste", checked: false },
    { name: "Coconut Milk", checked: false },
    { name: "Chicken Breast", checked: false },
    { name: "Thai Basil", checked: false },
    { name: "Bamboo Shoots", checked: false },
    { name: "Fish Sauce", checked: false },
    { name: "Lime Leaves", checked: false },
    { name: "Lemongrass", checked: false },
  ])

  // Simulate dynamic viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation in viewer count
      const fluctuation = Math.floor(Math.random() * 20) - 5 // -5 to +15
      setViewerCount((prev) => Math.max(1, prev + fluctuation))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // At the top of the component, add a useEffect to set the session ID
  useEffect(() => {
    if (sessionData?.id) {
      setSessionId(sessionData.id)
    }

    // Simulate loading session data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [sessionData])

  const toggleIngredientCheck = (index: number) => {
    const newIngredients = [...ingredients]
    newIngredients[index].checked = !newIngredients[index].checked
    setIngredients(newIngredients)
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <GlobalHeader />

      <main className="container px-4 pt-24 pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{sessionData?.title || "Authentic Thai Green Curry"}</h1>
          <p className="text-muted-foreground">Live cooking session with {sessionData?.chef || "Chef Suwanee"}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="live" className="flex-1">
              Live Stream
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="flex-1">
              Ingredients & Recipe
            </TabsTrigger>
            <TabsTrigger value="related" className="flex-1">
              Related Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-0">
            <LiveSessionProviders
              sessionId={sessionId}
              userId={currentUser.id}
              username={currentUser.username}
              avatar={currentUser.avatar}
              isHost={isHost}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Live Stream Component */}
                  <LiveStream isHost={isHost} sessionId={sessionId} />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=40&h=40&auto=format&fit=facearea&facepad=2"
                          alt={sessionData?.chef || "Chef Suwanee"}
                        />
                        <AvatarFallback>{sessionData?.chef?.substring(0, 2) || "CS"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{sessionData?.chef || "Chef Suwanee"}</h3>
                          <Badge className="bg-[#F1FAEE] text-[#264653] border border-[#264653]">Chef</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {sessionData?.cuisine || "Thai"} Cuisine Specialist
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <AnimatedButton
                        variant={isFollowing ? "outline" : "default"}
                        size="sm"
                        animation="scale"
                        className={isFollowing ? "border-[#E63946] text-[#E63946]" : "bg-[#E63946] hover:bg-[#c62b38]"}
                        icon={<Heart className={isFollowing ? "fill-[#E63946]" : ""} />}
                        onClick={toggleFollow}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </AnimatedButton>
                      <ShareLiveSession
                        sessionId={sessionId}
                        isHost={isHost}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold">About This Session</h3>
                    <p className="text-muted-foreground">
                      {sessionData?.description ||
                        "Join Chef Suwanee as she guides you through creating an authentic Thai Green Curry from scratch. Learn the secrets to balancing the perfect flavors of spicy, sweet, salty, and sour that make Thai cuisine so distinctive."}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <Card className="h-full flex flex-col">
                    {/* Live Chat Component */}
                    <LiveChat />
                  </Card>
                </div>
              </div>
            </LiveSessionProviders>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Ingredients</h2>
                  <ul className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={ingredient.checked}
                          onChange={() => toggleIngredientCheck(index)}
                          className="rounded border-gray-300"
                        />
                        <span className={ingredient.checked ? "line-through text-muted-foreground" : ""}>
                          {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-2">Nutrition Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Calories</p>
                        <p className="font-medium">320 kcal</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Protein</p>
                        <p className="font-medium">34g</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fat</p>
                        <p className="font-medium">18g</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbs</p>
                        <p className="font-medium">6g</p>
                      </div>
                    </div>
                  </div>

                  <AnimatedButton
                    className="w-full mt-6 bg-[#E63946] hover:bg-[#c62b38]"
                    animation="scale"
                    icon={<ShoppingCart className="h-4 w-4" />}
                  >
                    Add All to Cart
                  </AnimatedButton>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Recipe Steps</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Prepare the Curry Paste</h3>
                        <p className="text-muted-foreground">
                          If using store-bought curry paste, measure out 2-3 tablespoons depending on your spice
                          preference. If making from scratch, blend all paste ingredients in a food processor until
                          smooth.
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden mt-2 max-w-md">
                          <Image
                            src="https://images.unsplash.com/photo-1599021456807-25db0f974333?q=80&w=420&h=240&auto=format&fit=crop"
                            alt="Preparing curry paste"
                            width={420}
                            height={240}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Cook the Curry Paste</h3>
                        <p className="text-muted-foreground">
                          Heat 2 tablespoons of oil in a large pan over medium heat. Add the curry paste and cook for 2-3
                          minutes until fragrant, stirring constantly to prevent burning.
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden mt-2 max-w-md">
                          <Image
                            src="https://images.unsplash.com/photo-1604497183114-1b7ec22f9293?q=80&w=420&h=240&auto=format&fit=crop"
                            alt="Cooking curry paste"
                            width={420}
                            height={240}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Add Protein</h3>
                        <p className="text-muted-foreground">
                          Add your choice of protein (chicken, tofu, or shrimp) to the pan and cook until browned on all
                          sides, about 5-7 minutes.
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden mt-2 max-w-md">
                          <Image
                            src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=420&h=240&auto=format&fit=crop"
                            alt="Adding protein"
                            width={420}
                            height={240}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xl">
                        4
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Add Coconut Milk</h3>
                        <p className="text-muted-foreground">
                          Pour in the coconut milk and stir to combine. Bring to a simmer and cook for 5 minutes to allow
                          the flavors to meld.
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden mt-2 max-w-md">
                          <Image
                            src="https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=420&h=240&auto=format&fit=crop"
                            alt="Adding coconut milk"
                            width={420}
                            height={240}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xl">
                        5
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Add Vegetables</h3>
                        <p className="text-muted-foreground">
                          Add bamboo shoots, bell peppers, and any other vegetables. Simmer for another 5-7 minutes until
                          vegetables are tender but still crisp.
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden mt-2 max-w-md">
                          <Image
                            src="https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?q=80&w=420&h=240&auto=format&fit=crop"
                            alt="Adding vegetables"
                            width={420}
                            height={240}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xl">
                        6
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Season and Finish</h3>
                        <p className="text-muted-foreground">
                          Add fish sauce, palm sugar, and lime juice to taste. Stir in Thai basil leaves just before
                          serving. Serve hot with steamed jasmine rice.
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden mt-2 max-w-md">
                          <Image
                            src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=420&h=240&auto=format&fit=crop"
                            alt="Finishing the dish"
                            width={420}
                            height={240}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related" className="mt-0">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">More From {sessionData?.chef || "Chef Suwanee"}</h2>
                <DynamicContentFeed contentType="recipe" initialCount={3} />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Similar Live Sessions</h2>
                <DynamicContentFeed contentType="session" initialCount={3} />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
                <DynamicContentFeed contentType="product" initialCount={3} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Sessions */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">More Live Sessions You Might Like</h2>
          <DynamicContentFeed contentType="session" initialCount={3} />
        </section>
      </main>
    </div>
  )
}
