import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, ShoppingCart, Bell, Filter, Star, Calendar } from "lucide-react"

export default function Marketplace() {
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
              placeholder="Search products, kits, classes..."
              className="w-full rounded-full border border-input bg-background py-2 pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#E63946]"></span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#E63946] text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Discover gourmet kits, cooking classes, and culinary tools</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="kits">Cooking Kits</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="tools">Tools & Equipment</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-[#E63946]">
                  Reset All
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Category</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="category-kits" />
                      <Label htmlFor="category-kits" className="text-sm font-normal">
                        Cooking Kits
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="category-classes" />
                      <Label htmlFor="category-classes" className="text-sm font-normal">
                        Cooking Classes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="category-tools" />
                      <Label htmlFor="category-tools" className="text-sm font-normal">
                        Kitchen Tools
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="category-ingredients" />
                      <Label htmlFor="category-ingredients" className="text-sm font-normal">
                        Specialty Ingredients
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="category-digital" />
                      <Label htmlFor="category-digital" className="text-sm font-normal">
                        Digital Downloads
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <Slider defaultValue={[50]} max={200} step={1} className="py-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">$0</span>
                    <span className="text-sm">$200+</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Cuisine Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="cuisine-italian" />
                      <Label htmlFor="cuisine-italian" className="text-sm font-normal">
                        Italian
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cuisine-asian" />
                      <Label htmlFor="cuisine-asian" className="text-sm font-normal">
                        Asian
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cuisine-mexican" />
                      <Label htmlFor="cuisine-mexican" className="text-sm font-normal">
                        Mexican
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cuisine-mediterranean" />
                      <Label htmlFor="cuisine-mediterranean" className="text-sm font-normal">
                        Mediterranean
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cuisine-american" />
                      <Label htmlFor="cuisine-american" className="text-sm font-normal">
                        American
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Rating</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="rating-4" />
                      <Label htmlFor="rating-4" className="text-sm font-normal flex items-center">
                        <div className="flex mr-1">
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                        & up
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="rating-3" />
                      <Label htmlFor="rating-3" className="text-sm font-normal flex items-center">
                        <div className="flex mr-1">
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                        & up
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="rating-2" />
                      <Label htmlFor="rating-2" className="text-sm font-normal flex items-center">
                        <div className="flex mr-1">
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                        & up
                      </Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#E63946] hover:bg-[#c62b38]">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </Card>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cooking Kits */}
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Gourmet Pancake Kit"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#E63946]">Best Seller</Badge>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      Cooking Kit
                    </Badge>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                      <span className="text-xs ml-1">4.8 (124)</span>
                    </div>
                  </div>
                  <h3 className="font-bold">Gourmet Pancake Kit</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Everything you need to make perfect fluffy pancakes with premium ingredients and maple syrup.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-[#E63946]">$24.99</p>
                    <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Pasta Making Kit"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      Cooking Kit
                    </Badge>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                      <span className="text-xs ml-1">4.7 (89)</span>
                    </div>
                  </div>
                  <h3 className="font-bold">Pasta Making Kit</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Craft authentic Italian pasta at home with this complete kit including flour, tools, and recipes.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-[#E63946]">$34.99</p>
                    <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Cooking Classes */}
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Italian Cooking Masterclass"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#2A9D8F]">Class</Badge>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      Restaurant
                    </Badge>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                      <span className="text-xs ml-1">4.9 (56)</span>
                    </div>
                  </div>
                  <h3 className="font-bold">Italian Cooking Masterclass</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>May 25, 2025 • 6:00 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Learn authentic Italian cooking techniques from Chef Marco at his renowned restaurant.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-[#E63946]">$89.99</p>
                    <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Kitchen Tools */}
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Professional Chef's Knife"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      Kitchen Tool
                    </Badge>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                      <span className="text-xs ml-1">4.8 (215)</span>
                    </div>
                  </div>
                  <h3 className="font-bold">Professional Chef's Knife</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    High-carbon stainless steel chef's knife with ergonomic handle for precision cutting.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-[#E63946]">$79.99</p>
                    <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Digital Downloads */}
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Seasonal Recipe Collection"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#F4A261]">Digital</Badge>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      eBook
                    </Badge>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                      <span className="text-xs ml-1">4.6 (78)</span>
                    </div>
                  </div>
                  <h3 className="font-bold">Seasonal Recipe Collection</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    50+ seasonal recipes organized by ingredient availability throughout the year.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-[#E63946]">$12.99</p>
                    <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Specialty Ingredients */}
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Artisanal Spice Collection"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      Ingredients
                    </Badge>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                      <span className="text-xs ml-1">4.7 (92)</span>
                    </div>
                  </div>
                  <h3 className="font-bold">Artisanal Spice Collection</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Hand-blended spices from around the world, perfect for elevating any dish.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-[#E63946]">$29.99</p>
                    <Button size="sm" className="bg-[#E63946] hover:bg-[#c62b38]">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Featured Creator Storefront */}
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">Featured Creator Storefront</h2>

              <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Chef" />
                        <AvatarFallback>CH</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">Chef Maria's Kitchen</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <Star className="h-4 w-4 fill-[#E9C46A] text-[#E9C46A]" />
                          <span className="ml-1 text-sm">(142 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Award-winning chef specializing in Mediterranean cuisine. All products are handcrafted with
                      locally sourced ingredients.
                    </p>
                    <Button className="w-full bg-[#E63946] hover:bg-[#c62b38]">Visit Storefront</Button>
                  </div>

                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card className="overflow-hidden">
                        <div className="relative aspect-square">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt="Olive Oil Collection"
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 space-y-1">
                          <h4 className="font-medium text-sm">Olive Oil Collection</h4>
                          <p className="font-bold text-[#E63946] text-sm">$39.99</p>
                        </div>
                      </Card>

                      <Card className="overflow-hidden">
                        <div className="relative aspect-square">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt="Mediterranean Cookbook"
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 space-y-1">
                          <h4 className="font-medium text-sm">Mediterranean Cookbook</h4>
                          <p className="font-bold text-[#E63946] text-sm">$24.99</p>
                        </div>
                      </Card>

                      <Card className="overflow-hidden">
                        <div className="relative aspect-square">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt="Cooking Class"
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-[#2A9D8F]">Class</Badge>
                        </div>
                        <div className="p-3 space-y-1">
                          <h4 className="font-medium text-sm">Mediterranean Basics Class</h4>
                          <p className="font-bold text-[#E63946] text-sm">$79.99</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
