"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react"
import Image from "next/image"

// Types for our dynamic content
export interface DynamicContent {
  type: "recipe" | "session" | "product" | "chef"
  data: any
}

// Sample chef names for random generation
const chefNames = [
  "Chef Antonio",
  "Chef Suwanee",
  "Chef Marie",
  "Chef Miguel",
  "Chef Yuki",
  "Chef Carlos",
  "Chef Elena",
  "Chef Raj",
  "Chef Pierre",
  "Chef Min",
  "Chef Olivia",
  "Chef Marco",
]

// Sample cuisine types
const cuisineTypes = [
  "Italian",
  "Thai",
  "French",
  "Spanish",
  "Japanese",
  "Mexican",
  "Mediterranean",
  "Indian",
  "Korean",
  "Chinese",
  "American",
  "Middle Eastern",
]

// Sample recipe titles
const recipeTitles = [
  "Perfect Pasta Carbonara",
  "Authentic Thai Green Curry",
  "French Pastry Basics",
  "Spanish Tapas Selection",
  "Japanese Sushi Masterclass",
  "Mexican Street Food",
  "Mediterranean Mezze Platter",
  "Indian Curry Fundamentals",
  "Korean BBQ at Home",
  "Chinese Dim Sum",
  "Classic American Burgers",
  "Lebanese Mezze Platter",
]

// Sample product names
const productNames = [
  "Gourmet Pancake Kit",
  "Pasta Making Kit",
  "Professional Chef's Knife",
  "Artisanal Spice Collection",
  "Olive Oil Collection",
  "Mediterranean Cookbook",
  "Japanese Knife Set",
  "Ceramic Cooking Pot",
  "Bamboo Steamer",
  "Cast Iron Skillet",
  "Herb Garden Kit",
  "Digital Cooking Thermometer",
]

// Generate a random recipe
const generateRandomRecipe = () => {
  const title = recipeTitles[Math.floor(Math.random() * recipeTitles.length)]
  const chef = chefNames[Math.floor(Math.random() * chefNames.length)]
  const cuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)]
  const likes = Math.floor(Math.random() * 500) + 50
  const comments = Math.floor(Math.random() * 100) + 5
  const timePosted = Math.floor(Math.random() * 24) + 1

  return {
    id: `recipe-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title,
    chef,
    cuisine,
    likes,
    comments,
    timePosted,
    description: `Delicious ${cuisine} cuisine prepared with authentic techniques and fresh ingredients.`,
    image: `/placeholder.svg?height=${Math.floor(Math.random() * 100) + 400}&width=${
      Math.floor(Math.random() * 200) + 600
    }`,
  }
}

// Generate a random live session
const generateRandomSession = () => {
  const title = recipeTitles[Math.floor(Math.random() * recipeTitles.length)]
  const chef = chefNames[Math.floor(Math.random() * chefNames.length)]
  const cuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)]
  const viewers = Math.floor(Math.random() * 2000) + 100
  const isLive = Math.random() > 0.3 // 70% chance of being live
  const upcoming = !isLive && Math.random() > 0.5 // If not live, 50% chance of being upcoming

  return {
    id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title,
    chef,
    cuisine,
    viewers,
    isLive,
    upcoming,
    date: upcoming ? new Date(Date.now() + Math.random() * 604800000).toLocaleDateString() : null, // Random date within next week
    time: upcoming
      ? `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? "30" : "00"} ${
          Math.random() > 0.5 ? "AM" : "PM"
        }`
      : null,
    image: `/placeholder.svg?height=180&width=320`,
  }
}

// Generate a random product
const generateRandomProduct = () => {
  const name = productNames[Math.floor(Math.random() * productNames.length)]
  const price = (Math.random() * 100 + 9.99).toFixed(2)
  const rating = (Math.random() * 1 + 4).toFixed(1) // Rating between 4.0 and 5.0
  const reviews = Math.floor(Math.random() * 200) + 10

  return {
    id: `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name,
    price,
    rating,
    reviews,
    image: `/placeholder.svg?height=300&width=300`,
  }
}

// Generate a random chef profile
const generateRandomChef = () => {
  const name = chefNames[Math.floor(Math.random() * chefNames.length)]
  const specialty = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)]
  const followers = Math.floor(Math.random() * 50000) + 1000
  const recipes = Math.floor(Math.random() * 100) + 5

  return {
    id: `chef-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name,
    specialty,
    followers,
    recipes,
    image: `/placeholder.svg?height=64&width=64`,
  }
}

// Generate random content based on type
export const generateRandomContent = (type: "recipe" | "session" | "product" | "chef"): DynamicContent => {
  switch (type) {
    case "recipe":
      return { type, data: generateRandomRecipe() }
    case "session":
      return { type, data: generateRandomSession() }
    case "product":
      return { type, data: generateRandomProduct() }
    case "chef":
      return { type, data: generateRandomChef() }
    default:
      return { type: "recipe", data: generateRandomRecipe() }
  }
}

// Generate multiple random content items
export const generateRandomContentBatch = (
  count: number,
  type?: "recipe" | "session" | "product" | "chef",
): DynamicContent[] => {
  const content: DynamicContent[] = []
  for (let i = 0; i < count; i++) {
    if (type) {
      content.push(generateRandomContent(type))
    } else {
      // If no type specified, generate a random mix
      const types = ["recipe", "session", "product", "chef"] as const
      const randomType = types[Math.floor(Math.random() * types.length)]
      content.push(generateRandomContent(randomType))
    }
  }
  return content
}

// Component to render dynamic content
export const DynamicContentRenderer = ({ content }: { content: DynamicContent }) => {
  switch (content.type) {
    case "recipe":
      return <RecipeCard recipe={content.data} />
    case "session":
      return <SessionCard session={content.data} />
    case "product":
      return <ProductCard product={content.data} />
    case "chef":
      return <ChefCard chef={content.data} />
    default:
      return null
  }
}

// Recipe Card Component
const RecipeCard = ({ recipe }: { recipe: any }) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(recipe.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={recipe.chef} />
          <AvatarFallback>{recipe.chef.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{recipe.chef}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F1FAEE] text-[#264653] border border-[#264653]">
              Chef
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{recipe.timePosted} hours ago</p>
        </div>
      </div>

      <div className="relative aspect-video">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          width={800}
          height={400}
          className="object-cover w-full"
        />
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <p className="text-muted-foreground">{recipe.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E63946] text-white">
            #FireCooked
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2A9D8F] text-white">
            #{recipe.cuisine}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F4A261] text-white">
            #FeedoraOriginal
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${
                liked ? "text-[#E63946]" : "text-muted-foreground"
              } transition-colors duration-200`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-[#E63946]" : ""} transition-all duration-200`} />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{recipe.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="text-[#E63946] border-[#E63946]">
            View Recipe
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Session Card Component
const SessionCard = ({ session }: { session: any }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video">
        <Image
          src={session.image || "/placeholder.svg"}
          alt={session.title}
          width={320}
          height={180}
          className={`object-cover w-full transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
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

        {session.viewers > 0 && (
          <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
            {session.viewers.toLocaleString()} watching
          </div>
        )}

        <Button
          className={`absolute bottom-2 left-2 bg-[#E63946] hover:bg-[#c62b38] text-xs h-8 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-80"
          }`}
        >
          {session.isLive ? "Join Now" : "View Details"}
        </Button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{session.title}</h3>
          <Badge className="bg-[#2A9D8F] hover:bg-[#2A9D8F]">{session.cuisine}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={session.chef} />
            <AvatarFallback>{session.chef.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{session.chef}</span>
        </div>

        {session.upcoming && session.date && session.time && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
              </svg>
              <span>{session.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{session.time}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  const [isInCart, setIsInCart] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    setIsInCart(!isInCart)
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button variant="secondary" className="bg-white/80 hover:bg-white">
              Quick View
            </Button>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-normal">
            Kitchen Tool
          </Badge>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-[#E9C46A] text-[#E9C46A]"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-xs ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <h3 className="font-bold">{product.name}</h3>
        <div className="flex items-center justify-between pt-2">
          <p className="font-bold text-[#E63946]">${product.price}</p>
          <Button
            size="sm"
            className={`${
              isInCart ? "bg-green-600 hover:bg-green-700" : "bg-[#E63946] hover:bg-[#c62b38]"
            } transition-colors duration-300`}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {isInCart ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Chef Card Component
const ChefCard = ({ chef }: { chef: any }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(chef.followers)

  const handleFollow = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1)
    } else {
      setFollowerCount(followerCount + 1)
    }
    setIsFollowing(!isFollowing)
  }

  return (
    <Card className="p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={chef.image || "/placeholder.svg"} alt={chef.name} />
          <AvatarFallback>{chef.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-bold">{chef.name}</h3>
          <p className="text-sm text-muted-foreground">{chef.specialty} Cuisine Specialist</p>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <span>{followerCount.toLocaleString()} followers</span>
            <span>{chef.recipes} recipes</span>
          </div>
        </div>
        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          className={isFollowing ? "border-[#E63946] text-[#E63946]" : "bg-[#E63946] hover:bg-[#c62b38]"}
          onClick={handleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </Card>
  )
}

// Dynamic Content Feed Component
export const DynamicContentFeed = ({
  contentType,
  initialCount = 3,
  loadMoreCount = 3,
}: {
  contentType?: "recipe" | "session" | "product" | "chef"
  initialCount?: number
  loadMoreCount?: number
}) => {
  const [content, setContent] = useState<DynamicContent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Generate initial content
    setContent(generateRandomContentBatch(initialCount, contentType))
  }, [contentType, initialCount])

  const loadMoreContent = () => {
    setIsLoading(true)
    // Simulate network delay
    setTimeout(() => {
      setContent([...content, ...generateRandomContentBatch(loadMoreCount, contentType)])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item, index) => (
          <DynamicContentRenderer key={`${item.type}-${index}`} content={item} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="border-[#E63946] text-[#E63946]"
          onClick={loadMoreContent}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#E63946]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            "Load More"
          )}
        </Button>
      </div>
    </div>
  )
}
