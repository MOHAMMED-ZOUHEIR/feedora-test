import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SessionCardProps {
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
}

export default function SessionCard({
  id,
  title,
  chef,
  chefAvatar = "/placeholder.svg?height=24&width=24",
  cuisine,
  isLive = true,
  viewers = 0,
  thumbnail = "/placeholder.svg?height=180&width=320",
  upcoming = false,
  date,
  time,
}: SessionCardProps) {
  return (
    <Link href={`/live-sessions/${id}`} className="block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="relative aspect-video">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            width={320}
            height={180}
            className="object-cover w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {isLive && (
            <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              LIVE
            </div>
          )}

          {upcoming && (
            <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#F4A261] text-white">
              UPCOMING
            </div>
          )}

          {viewers > 0 && (
            <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
              {viewers.toLocaleString()} watching
            </div>
          )}

          <Button className="absolute bottom-2 left-2 bg-[#E63946] hover:bg-[#c62b38] text-xs h-8">
            {isLive ? "Join Now" : "View Details"}
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">{title}</h3>
            <Badge className="bg-[#2A9D8F] hover:bg-[#2A9D8F]">{cuisine}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={chefAvatar || "/placeholder.svg"} alt={chef} />
              <AvatarFallback>{chef.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{chef}</span>
          </div>

          {upcoming && date && time && (
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
                <span>{date}</span>
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
                <span>{time}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
