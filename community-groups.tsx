import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Bell, ShoppingCart, Users, Trophy, Calendar } from "lucide-react"

export default function CommunityGroups() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Global Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E63946]">
              <path d="M15 11h.01"></path>
              <path d="M11 15h.01"></path>
              <path d="M16 16h.01"></path>
              <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"></path>
              <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"></path>
            </svg>
            <span className="text-xl font-bold">Feedora</span>
          </div>
          
          <div className="relative w-full max-w-sm mx-4">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search groups, challenges..."
              className="w-full rounded-full border border-input bg-background py-2 pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#E63946]"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 grid grid-cols-1 md:grid-cols-7 gap-6">
        {/* Left Sidebar */}
        <aside className="md:col-span-2 space-y-6">
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Community</h3>
              <nav className="space-y-1">
                <Link href="#" className="flex items-center gap-2 text-[#E63946] font-medium">
                  <Users className="h-4 w-4" />
                  Groups
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  Challenges
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Events
                </Link>
              </nav>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">My Groups</h3>
              <nav className="space-y-1">
                <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-[#E63946]"></span>
                  Sourdough Baking
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-[#E63946]"></span>
                  Healthy Meal Plans
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-[#E63946]"></span>
                  Plant-Based Cooking
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-[#E63946]"></span>
                  Italian Cuisine Lovers
                </Link>
              </nav>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Active Challenges</h3>
              <div className="space-y-3">
                <Card className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-[#F4A261] flex items-center justify-center text-white">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Summer Grilling</h4>
                      <p className="text-xs text-muted-foreground">Ends in 5 days</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-[#2A9D8F] flex items-center justify-center text-white">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Vegan Desserts</h4>
                      <p className="text-xs text-muted-foreground">Ends in 12 days</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-[#E63946] hover:bg-[#c62b38]">
              Create New Group
            </Button>
          </Card>
        </aside>

        {/* Main Content */
\
## Feedora UI/UX Design System Overview

I've created a comprehensive UI/UX design system for Feedora, the cooking and recipe social platform. The design reflects the warm, community-centered brand identity with fire-inspired hues and intuitive user flows.

### Style Guide

The style guide establishes Feedora's visual identity with:

- **Color Palette**: Warm, fire-inspired hues (deep reds, burnt oranges) balanced with soft neutrals
- **Typography**: Modern sans-serif headings with clean body text
- **Components**: Custom buttons, cards, tags, and badges that reflect the brand's energetic and trustworthy mood
- **Icons**: Cooking and social-focused icons with a consistent style

### Core Screens

1. **Home Feed**
   - Global navigation with Feedora logo, search bar, and profile/cart icons
   - Post cards with user avatars, recipe titles, and media
   - "Live Now" carousel showing current cooking livestreams
   - Featured marketplace strip with product cards

2. **Recipe Detail Screen**
   - Header with recipe title, author badge, and rating
   - Full-width hero image with recipe details
   - Two-column layout for ingredients and step-by-step instructions
   - Action bar with "Save to Cookbook," "Cook-Along Live," and "Buy Ingredients" options

3. **Live Session Hub**
   - Tabs for "Live Now," "Upcoming," and "Past Sessions"
   - Session cards with thumbnails, chef information, and viewer counts
   - Featured live session with chat panel and product purchase links
   - Calendar view for upcoming sessions

4. **Marketplace & Commerce**
   - Product cards for cooking kits, classes, and tools
   - Filters for category, price range, and ratings
   - Featured creator storefront section
   - Shopping cart integration

5. **Community & Groups**
   - Sidebar navigation for groups, challenges, and events
   - Group feeds with themed collections
   - Challenge banners and peer voting
   - Member interaction features

### Interaction & State

The design includes hover states with subtle card lifts, active states with accent orange transitions, and notification badges with pulsing dots for new messages and live alerts.

This design system provides a cohesive, intuitive framework that reflects Feedora's unique brand identity while guiding users seamlessly from discovery to engagement and commerce.
