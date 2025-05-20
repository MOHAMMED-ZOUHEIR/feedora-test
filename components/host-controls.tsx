"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AnimatedButton } from "@/components/animated-button"
import { PlusCircle, Video, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HostControls() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sessionTitle, setSessionTitle] = useState("")
  const [sessionDescription, setSessionDescription] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [sessionDate, setSessionDate] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState("now")
  const { toast } = useToast()
  const router = useRouter()

  const cuisineOptions = [
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

  const handleCreateSession = () => {
    if (!sessionTitle) {
      toast({
        title: "Session title required",
        description: "Please provide a title for your live cooking session",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would create a session in your backend
      const sessionId = "new-" + Date.now()

      toast({
        title: isScheduled ? "Live session scheduled!" : "Live session created!",
        description: isScheduled
          ? `Your session "${sessionTitle}" has been scheduled.`
          : "Your live cooking session has been set up successfully.",
      })

      setIsCreating(false)
      setIsDialogOpen(false)

      // Reset form
      setSessionTitle("")
      setSessionDescription("")
      setCuisine("")
      setIsScheduled(false)
      setSessionDate("")
      setSessionTime("")

      // Navigate to the new session page if going live now
      if (!isScheduled) {
        router.push(`/live-sessions/${sessionId}?host=true`)
      }
    }, 2000)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <AnimatedButton
          animation="scale"
          className="bg-[#E63946] hover:bg-[#c62b38]"
          icon={<PlusCircle className="h-4 w-4" />}
        >
          Host a Session
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a Live Cooking Session</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="now" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Go Live Now
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="now" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title-now">Session Title</Label>
              <Input
                id="title-now"
                placeholder="e.g., Perfect Pasta Carbonara"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine-now">Cuisine Type</Label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger id="cuisine-now">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description-now">Description</Label>
              <Textarea
                id="description-now"
                placeholder="Describe what you'll be cooking and what viewers will learn..."
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="private-now">Private Session</Label>
                <Switch id="private-now" />
              </div>
              <p className="text-xs text-muted-foreground">Private sessions are only visible to people you invite.</p>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title-schedule">Session Title</Label>
              <Input
                id="title-schedule"
                placeholder="e.g., Perfect Pasta Carbonara"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine-schedule">Cuisine Type</Label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger id="cuisine-schedule">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description-schedule">Description</Label>
              <Textarea
                id="description-schedule"
                placeholder="Describe what you'll be cooking and what viewers will learn..."
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify">Notify Followers</Label>
                <Switch id="notify" defaultChecked />
              </div>
              <p className="text-xs text-muted-foreground">
                Send a notification to your followers when this session is scheduled.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <AnimatedButton
            animation="scale"
            className="bg-[#E63946] hover:bg-[#c62b38]"
            onClick={handleCreateSession}
            loading={isCreating}
            loadingText={activeTab === "now" ? "Creating..." : "Scheduling..."}
          >
            {activeTab === "now" ? "Create & Go Live" : "Schedule Session"}
          </AnimatedButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
