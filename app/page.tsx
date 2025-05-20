"use client"

import { useState, useEffect } from "react"
import GlobalHeader from "@/components/global-header"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/animated-button"
import {
  DynamicContentFeed,
  generateRandomContent,
  generateRandomContentBatch,
} from "@/components/dynamic-content-generator"
import {
  Heart,
  MessageCircle,
  ShoppingCart,
  Play,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [trendingRecipes, setTrendingRecipes] = useState([])
  const [liveSessions, setLiveSessions] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [popularChefs, setPopularChefs] = useState([])
  const [featuredContent, setFeaturedContent] = useState(null)
  const [activeTab, setActiveTab] = useState("for-you")

  // Generate content on mount
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // Generate trending recipes
      const recipes = generateRandomContentBatch(6, "recipe").map((item) => item.data)

      // Generate live sessions
      const sessions = generateRandomContentBatch(8, "session").map((item) => item.data)

      // Generate featured products
      const products = generateRandomContentBatch(5, "product").map((item) => item.data)

      // Generate popular chefs
      const chefs = generateRandomContentBatch(4, "chef").map((item) => item.data)

      // Generate featured content (random type)
      const featured = generateRandomContent("recipe").data

      setTrendingRecipes(recipes)
      setLiveSessions(sessions)
      setFeaturedProducts(products)
      setPopularChefs(chefs)
      setFeaturedContent(featured)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Handle navigation to live sessions
  const navigateToLiveSessions = () => {
    router.push("/live-sessions")
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Global Navigation */}
      <GlobalHeader />

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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
                <Heart className="h-4 w-4" />
                Saved
              </Link>
              <Link
                href="/live-sessions"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="m16 6-4 4-4-4"></path>
                  <path d="M16 18a4 4 0 0 0-8 0"></path>
                </svg>
                Live Sessions
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">My Cookbooks</h3>
            <nav className="space-y-1">
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-[#E63946] transition-colors"
              >
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

          {/* Popular Chefs Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Popular Chefs</h3>
              <Link href="#" className="text-xs text-[#E63946] hover:underline">
                View All
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {popularChefs.slice(0, 3).map((chef, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chef.image || "/placeholder.svg"} alt={chef.name} />
                      <AvatarFallback>{chef.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{chef.name}</p>
                      <p className="text-xs text-muted-foreground">{chef.specialty} Cuisine</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-5 space-y-8">
          {/* Feed Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Featured Content */}
          {isLoading ? (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
          ) : (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image
                src={featuredContent.image || "/placeholder.svg?height=600&width=1200"}
                alt={featuredContent.title}
                width={1200}
                height={600}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <Badge className="bg-[#E63946]">Featured</Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredContent.title}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={featuredContent.chef} />
                    <AvatarFallback>{featuredContent.chef.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{featuredContent.chef}</p>
                    <p className="text-white/80 text-sm">{featuredContent.cuisine} Cuisine</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <AnimatedButton animation="scale" className="bg-[#E63946] hover:bg-[#c62b38]">
                    View Recipe
                  </AnimatedButton>
                  <AnimatedButton
                    animation="scale"
                    variant="outline"
                    className="bg-white/10 text-white border-white hover:bg-white/20"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </AnimatedButton>
                </div>
              </div>
            </div>
          )}

          {/* Live Now Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Live Now</h2>
                <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse"></span>
              </div>
              <Button variant="link" className="text-sm font-medium text-[#E63946]" onClick={navigateToLiveSessions}>
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {isLoading ? (
              <div className="flex space-x-4 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-none w-72">
                    <div className="aspect-video rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="mt-2 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {liveSessions.map((session, index) => (
                    <div
                      key={index}
                      className="relative flex-none w-72 group cursor-pointer"
                      onClick={navigateToLiveSessions}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={session.image || "/placeholder.svg?height=180&width=320"}
                          alt={session.title}
                          width={320}
                          height={180}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          LIVE
                        </div>
                        <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
                          {session.viewers.toLocaleString()} watching
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="h-6 w-6 fill-current" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={session.chef} />
                          <AvatarFallback>{session.chef.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-medium line-clamp-1">{session.title}</h3>
                          <p className="text-xs text-muted-foreground">{session.chef}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </section>

          {/* Trending Recipes */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Trending Recipes</h2>
                <TrendingUp className="h-5 w-5 text-[#E63946]" />
              </div>
              <Link href="#" className="text-sm font-medium text-[#E63946]">
                View All <ChevronRight className="h-4 w-4 ml-1 inline" />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex justify-between">
                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingRecipes.slice(0, 2).map((recipe, index) => (
                  <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
                    <div className="relative aspect-video">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        width={600}
                        height={300}
                        className="object-cover w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#2A9D8F]">{recipe.cuisine}</Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt={recipe.chef} />
                          <AvatarFallback>{recipe.chef.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{recipe.chef}</span>
                        <span className="text-xs text-muted-foreground">{recipe.timePosted}h ago</span>
                      </div>
                      <h3 className="text-lg font-bold">{recipe.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <Heart className="h-4 w-4" />
                            <span>{recipe.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span>{recipe.comments}</span>
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="text-[#E63946] border-[#E63946]">
                          View Recipe
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* What's Hot Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">What's Hot</h2>
                <Award className="h-5 w-5 text-[#F4A261]" />
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingRecipes.slice(2, 5).map((recipe, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="flex h-24">
                      <div className="w-1/3 relative">
                        <Image
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="w-2/3 p-3 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2">{recipe.title}</h3>
                          <p className="text-xs text-muted-foreground">{recipe.chef}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs flex items-center gap-1">
                            <Heart className="h-3 w-3 text-[#E63946]" />
                            {recipe.likes}
                          </span>
                          <Badge className="text-[0.6rem] py-0 h-4">{recipe.cuisine}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Featured Products */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Featured Products</h2>
              <Link href="#" className="text-sm font-medium text-[#E63946]">
                View All <ChevronRight className="h-4 w-4 ml-1 inline" />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex space-x-4 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-none w-56">
                    <div className="aspect-square rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="mt-2 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {featuredProducts.map((product, index) => (
                    <Card
                      key={index}
                      className="flex-none w-56 overflow-hidden group hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      </div>
                      <div className="p-3 space-y-2">
                        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-[#E63946]">${product.price}</p>
                          <Button size="sm" className="h-8 w-8 p-0 rounded-full bg-[#E63946] hover:bg-[#c62b38]">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </section>

          {/* Recent Recipes Feed */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Recent Recipes</h2>
                <Clock className="h-5 w-5 text-[#2A9D8F]" />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex justify-between">
                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <DynamicContentFeed contentType="recipe" initialCount={3} loadMoreCount={2} />
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
