import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Heart,
  MessageCircle,
  ShoppingCart,
  Search,
  Bell,
  Play,
  Clock,
  Users,
  ChevronLeft,
  Star,
  Bookmark,
  Calendar,
} from "lucide-react"

export default function RecipeDetail() {
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

      <main className="container px-4 py-6">
        <Link href="#" className="inline-flex items-center text-sm font-medium mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Feed
        </Link>

        {/* Recipe Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#F4A261] hover:bg-[#F4A261]">#FireCooked</Badge>
              <Badge className="bg-[#2A9D8F] hover:bg-[#2A9D8F]">#Dinner</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">Grilled Salmon with Lemon Herb Sauce</h1>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Chef" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Jane Doe</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F1FAEE] text-[#264653] border border-[#264653]">
                    Chef
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Professional Chef, Cookbook Author</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-[#E9C46A] text-[#E9C46A]" />
                <Star className="h-5 w-5 fill-[#E9C46A] text-[#E9C46A]" />
                <Star className="h-5 w-5 fill-[#E9C46A] text-[#E9C46A]" />
                <Star className="h-5 w-5 fill-[#E9C46A] text-[#E9C46A]" />
                <Star className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">4.0 (128 reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">30 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Serves 4</span>
              </div>
              <div className="flex items-center gap-1">
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
                  className="text-muted-foreground"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              Perfect for summer evenings! This grilled salmon with a zesty lemon herb sauce is both healthy and
              delicious. The flame-grilled flavor combined with fresh herbs creates an unforgettable dining experience.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#E63946] hover:bg-[#c62b38]">
                <Bookmark className="h-4 w-4 mr-2" />
                Save to Cookbook
              </Button>
              <Button variant="outline" className="border-[#E63946] text-[#E63946]">
                <Calendar className="h-4 w-4 mr-2" />
                Cook-Along Live
              </Button>
              <Button variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Ingredients Bundle
              </Button>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-video lg:aspect-square">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Grilled Salmon"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Column */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>4 salmon fillets (6 oz each)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 tbsp olive oil</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 lemons (1 juiced, 1 sliced)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>3 cloves garlic, minced</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 tbsp fresh dill, chopped</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 tbsp fresh parsley, chopped</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>1 tbsp honey</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Salt and pepper to taste</span>
                </li>
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

              <Button className="w-full mt-6 bg-[#E63946] hover:bg-[#c62b38]">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            </Card>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Instructions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step-1">
                  <AccordionTrigger className="text-base font-medium">Step 1: Prepare the Marinade</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      In a small bowl, combine the olive oil, lemon juice, minced garlic, 1 tbsp dill, 1 tbsp parsley,
                      honey, salt, and pepper. Whisk until well combined.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=240&width=420"
                        alt="Preparing marinade"
                        width={420}
                        height={240}
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-2">
                  <AccordionTrigger className="text-base font-medium">Step 2: Marinate the Salmon</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      Place the salmon fillets in a shallow dish and pour half of the marinade over them. Turn to coat
                      evenly. Reserve the remaining marinade for the sauce. Let marinate for 15-30 minutes.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=240&width=420"
                        alt="Marinating salmon"
                        width={420}
                        height={240}
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-3">
                  <AccordionTrigger className="text-base font-medium">Step 3: Preheat the Grill</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      Preheat your grill to medium-high heat (about 375-400°F). Clean and oil the grates to prevent
                      sticking.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=240&width=420"
                        alt="Preheating grill"
                        width={420}
                        height={240}
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-4">
                  <AccordionTrigger className="text-base font-medium">Step 4: Grill the Salmon</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      Place the salmon on the grill, skin-side down. Add the lemon slices to the grill as well. Close
                      the lid and cook for 4-6 minutes. Carefully flip and cook for another 2-3 minutes, or until the
                      salmon is cooked through and flakes easily with a fork.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=240&width=420"
                        alt="Grilling salmon"
                        width={420}
                        height={240}
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-5">
                  <AccordionTrigger className="text-base font-medium">Step 5: Prepare the Sauce</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      While the salmon is grilling, heat the reserved marinade in a small saucepan over medium heat.
                      Bring to a simmer and cook for 2-3 minutes. Stir in the remaining dill and parsley.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=240&width=420"
                        alt="Preparing sauce"
                        width={420}
                        height={240}
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-6">
                  <AccordionTrigger className="text-base font-medium">Step 6: Serve</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      Transfer the grilled salmon to serving plates. Drizzle with the lemon herb sauce and garnish with
                      grilled lemon slices. Serve immediately.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=240&width=420"
                        alt="Serving salmon"
                        width={420}
                        height={240}
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/* Chef's Tips */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Chef's Tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#E63946] mt-1"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <p>For the best flavor, use fresh herbs rather than dried ones.</p>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#E63946] mt-1"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <p>
                    The salmon is done when it reaches an internal temperature of 145°F (63°C) and flakes easily with a
                    fork.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#E63946] mt-1"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <p>If you don't have a grill, you can use a grill pan or broil the salmon in the oven.</p>
                </li>
              </ul>
            </Card>

            {/* Comments */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Comments</h2>
                <span className="text-sm text-muted-foreground">32 comments</span>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">Mike K.</h4>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm">
                      Made this last night and it was absolutely delicious! The lemon herb sauce really makes the dish
                      special. Will definitely be making this again.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">Sarah L.</h4>
                      <span className="text-xs text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm">
                      I substituted the dill with basil since that's what I had on hand, and it still turned out great!
                      The grilling technique was spot on.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      className="w-full min-h-[80px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                    ></textarea>
                    <Button className="mt-2 bg-[#E63946] hover:bg-[#c62b38]">Post Comment</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Recipes */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Recipe"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-[#E63946]"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="font-medium">Grilled Lemon Herb Chicken</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>25 min</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
