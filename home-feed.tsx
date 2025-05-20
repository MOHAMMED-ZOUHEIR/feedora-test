import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Share2, ShoppingCart, Search, Bell, Play } from "lucide-react"

export default function HomeFeed() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Global Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#E63946]"
            >
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
              placeholder="Search recipes, chefs, ingredients..."
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
        <aside className="hidden md:block md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Discover</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-2 text-[#E63946] font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home Feed
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20V10"></path>
                  <path d="M18 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
                Trending
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                  <path d="M16 16h5v5"></path>
                </svg>
                Following
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                Saved
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">My Cookbooks</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                Quick Weeknight Dinners
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                Baking Adventures
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                Holiday Specials
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Groups</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Sourdough Baking
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Healthy Meal Plans
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Plant-Based Cooking
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-5 space-y-6">
          {/* Live Now Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Live Now</h2>
              <Link href="#" className="text-sm font-medium text-[#E63946]">
                View All
              </Link>
            </div>

            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="relative flex-none w-64">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=180&width=320"
                        alt="Live cooking session"
                        width={320}
                        height={180}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        LIVE
                      </div>
                      <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
                        1.2K watching
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Chef" />
                        <AvatarFallback>CH</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium">Perfect Pasta Carbonara</h3>
                        <p className="text-xs text-muted-foreground">Chef Antonio</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Post Cards */}
          <section className="space-y-6">
            {[1, 2, 3].map((post) => (
              <Card key={post} className="overflow-hidden">
                <div className="p-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Jane Doe</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F1FAEE] text-[#264653] border border-[#264653]">
                        Chef
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="relative aspect-video">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Recipe"
                    width={800}
                    height={400}
                    className="object-cover w-full"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <h2 className="text-xl font-bold">Grilled Salmon with Lemon Herb Sauce</h2>
                  <p className="text-muted-foreground">
                    Perfect for summer evenings! This grilled salmon with a zesty lemon herb sauce is both healthy and
                    delicious.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E63946] text-white">
                      #FireCooked
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2A9D8F] text-white">
                      #Seafood
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F4A261] text-white">
                      #SummerRecipes
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>245</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>32</span>
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
            ))}
          </section>

          {/* Featured Marketplace */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Featured Products</h2>
              <Link href="#" className="text-sm font-medium text-[#E63946]">
                View All
              </Link>
            </div>

            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Card key={item} className="flex-none w-64 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src="/placeholder.svg?height=256&width=256"
                        alt="Product"
                        width={256}
                        height={256}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <h3 className="font-medium">Gourmet Pancake Kit</h3>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#E63946]">$24.99</p>
                        <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        </div>
      </main>
    </div>
  )
}
