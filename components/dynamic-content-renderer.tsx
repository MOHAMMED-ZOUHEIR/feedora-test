"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"

// Types for our dynamic content
export interface DynamicContent {
  type: "recipe" | "session" | "product" | "chef"
  data: any
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
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video">
        <Image
          src={session.image || "/placeholder.svg"}
          alt={session.title}
          width={320}
          height={180}
          className="object-cover w-full"
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

        <Button className="absolute bottom-2 left-2 bg-[#E63946] hover:bg-[#c62b38] text-xs h-8">
          {session.isLive ? "Join Now" : "View Details"}
        </Button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{session.title}</h3>
          <Badge className="bg-[#2A9D8F]">{session.cuisine}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={session.chef} />
            <AvatarFallback>{session.chef.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{session.chef}</span>
        </div>
      </div>
    </Card>
  )
}

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold">{product.name}</h3>
        <div className="flex items-center justify-between pt-2">
          <p className="font-bold text-[#E63946]">${product.price}</p>
          <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Chef Card Component
const ChefCard = ({ chef }: { chef: any }) => {
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
            <span>{chef.followers.toLocaleString()} followers</span>
            <span>{chef.recipes} recipes</span>
          </div>
        </div>
        <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
          Follow
        </Button>
      </div>
    </Card>
  )
}
