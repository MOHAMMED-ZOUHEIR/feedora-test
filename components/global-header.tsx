import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search, Bell, ShoppingCart } from "lucide-react"

export default function GlobalHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/">
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
          </Link>
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
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=32&h=32&auto=format&fit=facearea&facepad=2" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
