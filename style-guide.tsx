import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StyleGuide() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Feedora Style Guide</h1>
        <p className="text-muted-foreground text-lg">
          A cooking and recipe social platform with a warm, community-centered vibe
        </p>
      </header>

      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Primary Colors */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#E63946]"></div>
              <p className="font-medium">Primary Red</p>
              <p className="text-sm text-muted-foreground">#E63946</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#F4A261]"></div>
              <p className="font-medium">Burnt Orange</p>
              <p className="text-sm text-muted-foreground">#F4A261</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#E9C46A]"></div>
              <p className="font-medium">Warm Yellow</p>
              <p className="text-sm text-muted-foreground">#E9C46A</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#2A9D8F]"></div>
              <p className="font-medium">Accent Teal</p>
              <p className="text-sm text-muted-foreground">#2A9D8F</p>
            </div>

            {/* Neutrals */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#264653]"></div>
              <p className="font-medium">Dark Blue</p>
              <p className="text-sm text-muted-foreground">#264653</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#F1FAEE]"></div>
              <p className="font-medium">Off White</p>
              <p className="text-sm text-muted-foreground">#F1FAEE</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#F8F9FA]"></div>
              <p className="font-medium">Background</p>
              <p className="text-sm text-muted-foreground">#F8F9FA</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#495057]"></div>
              <p className="font-medium">Text</p>
              <p className="text-sm text-muted-foreground">#495057</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Typography</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold">Heading 1</h1>
              <p className="text-sm text-muted-foreground">Font: Inter, 48px, Bold (700)</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Heading 2</h2>
              <p className="text-sm text-muted-foreground">Font: Inter, 36px, Bold (700)</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Heading 3</h3>
              <p className="text-sm text-muted-foreground">Font: Inter, 24px, Bold (700)</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-medium">Heading 4</h4>
              <p className="text-sm text-muted-foreground">Font: Inter, 20px, Medium (500)</p>
            </div>
            <div className="space-y-2">
              <p className="text-base">Body Text</p>
              <p className="text-sm text-muted-foreground">Font: Inter, 16px, Regular (400)</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">Small Text</p>
              <p className="text-sm text-muted-foreground">Font: Inter, 14px, Regular (400)</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#E63946] hover:bg-[#c62b38]">Primary</Button>
                <Button variant="outline" className="border-[#E63946] text-[#E63946]">
                  Secondary
                </Button>
                <Button variant="ghost" className="text-[#E63946] hover:bg-[#E63946]/10">
                  Ghost
                </Button>
                <Button variant="link" className="text-[#E63946]">
                  Link
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Cards</h3>
              <Card className="p-4 max-w-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Card Title</h4>
                  <p className="text-sm text-muted-foreground">
                    Cards use a subtle shadow and rounded corners to create depth.
                  </p>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E63946] text-white">
                  #FireCooked
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2A9D8F] text-white">
                  #Vegan
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F4A261] text-white">
                  #Breakfast
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E9C46A] text-[#264653]">
                  #PlantBased
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#264653] text-white">
                  <span className="w-2 h-2 rounded-full bg-[#E63946]"></span>
                  Live Now
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#F1FAEE] text-[#264653] border border-[#264653]">
                  Chef
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#F4A261] text-white">
                  New
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="icons" className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Icons</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E63946]"
              >
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
              <span className="mt-2 text-sm">Trending</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E63946]"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <span className="mt-2 text-sm">Like</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E63946]"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="mt-2 text-sm">Comment</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E63946]"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              <span className="mt-2 text-sm">Share</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E63946]"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span className="mt-2 text-sm">Add</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E63946]"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="mt-2 text-sm">Cart</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
