"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipForward,
  SkipBack,
  Heart,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InteractiveVideoPlayerProps {
  videoSrc?: string
  title: string
  chef: string
  chefAvatar?: string
  cuisine?: string
  isLive?: boolean
  viewerCount?: number
  onEnded?: () => void
}

export const InteractiveVideoPlayer = ({
  videoSrc = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  title,
  chef,
  chefAvatar = "/placeholder.svg?height=40&width=40",
  cuisine = "International",
  isLive = false,
  viewerCount = 0,
  onEnded,
}: InteractiveVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000) + 100)
  const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 200) + 20)
  const [isLoading, setIsLoading] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [quality, setQuality] = useState("720p")
  const [showReactions, setShowReactions] = useState(false)
  const [reactions, setReactions] = useState<{ emoji: string; x: number; y: number; id: string }[]>([])
  const [activeTab, setActiveTab] = useState("video")
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [dynamicViewerCount, setDynamicViewerCount] = useState(viewerCount)

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onEnded) onEnded()
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    // Simulate loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
      clearTimeout(loadingTimeout)
    }
  }, [onEnded])

  // Simulate dynamic viewer count for live videos
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Random fluctuation in viewer count
      const fluctuation = Math.floor(Math.random() * 20) - 10 // -10 to +10
      setDynamicViewerCount((prev) => Math.max(1, prev + fluctuation))
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle mute/unmute
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle controls visibility
  const showControlsTemporarily = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    showControlsTemporarily()
  }

  // Handle playback speed change
  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
  }

  // Handle quality change
  const changeQuality = (newQuality: string) => {
    // In a real implementation, this would switch video sources
    setQuality(newQuality)
  }

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Skip forward/backward
  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), video.duration)
  }

  // Handle like
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  // Add a reaction
  const addReaction = (emoji: string) => {
    // Random position within the video container
    const x = Math.random() * 80 + 10 // 10% to 90% of width
    const y = Math.random() * 70 + 10 // 10% to 80% of height

    const newReaction = {
      emoji,
      x,
      y,
      id: `reaction-${Date.now()}-${Math.random()}`,
    }

    setReactions((prev) => [...prev, newReaction])

    // Remove the reaction after animation
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id))
    }, 3000)
  }

  // Toggle info panel
  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel)
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="info">Info & Ingredients</TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="mt-0">
          <div
            ref={containerRef}
            className="relative aspect-video bg-black rounded-lg overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              onClick={togglePlay}
              playsInline
            />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
              </div>
            )}

            {/* Floating Reactions */}
            {reactions.map((reaction) => (
              <div
                key={reaction.id}
                className="absolute text-2xl animate-float-up"
                style={{ left: `${reaction.x}%`, top: `${reaction.y}%` }}
              >
                {reaction.emoji}
              </div>
            ))}

            {/* Live Badge */}
            {isLive && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#E63946] text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </div>
            )}

            {/* Viewer Count */}
            {(isLive || viewerCount > 0) && (
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white">
                <Users className="h-3 w-3" />
                {dynamicViewerCount.toLocaleString()} watching
              </div>
            )}

            {/* Controls Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={chefAvatar || "/placeholder.svg"} alt={chef} />
                    <AvatarFallback>{chef.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white text-sm font-medium">{chef}</h3>
                    <Badge className="bg-[#2A9D8F] text-[0.6rem]">{cuisine}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={toggleInfoPanel}
                  >
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
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Center Play Button */}
              {!isPlaying && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-[#E63946]/80 text-white hover:bg-[#E63946] hover:scale-110 transition-transform duration-200"
                  onClick={togglePlay}
                >
                  <Play className="h-8 w-8 fill-current" />
                </Button>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                {/* Progress Bar */}
                {!isLive && (
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs">{formatTime(currentTime)}</span>
                    <Slider
                      value={[currentTime]}
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="flex-1"
                    />
                    <span className="text-white text-xs">{formatTime(duration)}</span>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {!isLive && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                          onClick={() => skip(-10)}
                        >
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                          onClick={() => skip(10)}
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Volume Control */}
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                        onClick={toggleMute}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 rounded-full bg-transparent text-white hover:bg-black/30"
                          >
                            {Math.round(volume * 100)}%
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2" side="top">
                          <Slider
                            value={[volume]}
                            min={0}
                            max={1}
                            step={0.01}
                            onValueChange={handleVolumeChange}
                            className="my-4"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Reactions Button */}
                    <Popover open={showReactions} onOpenChange={setShowReactions}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                        >
                          😀 React
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2" side="top">
                        <div className="grid grid-cols-6 gap-2">
                          {["👍", "❤️", "😂", "😮", "😢", "👏", "🔥", "💯", "🎉", "🙏", "🤔", "😍"].map((emoji) => (
                            <button
                              key={emoji}
                              className="text-2xl p-1 hover:bg-gray-100 rounded"
                              onClick={() => {
                                addReaction(emoji)
                                setShowReactions(false)
                              }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Settings Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <DropdownMenuItem
                            key={speed}
                            onClick={() => changePlaybackSpeed(speed)}
                            className={playbackSpeed === speed ? "bg-muted" : ""}
                          >
                            {speed}x
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Quality</DropdownMenuLabel>
                        {["Auto", "1080p", "720p", "480p", "360p"].map((q) => (
                          <DropdownMenuItem
                            key={q}
                            onClick={() => changeQuality(q)}
                            className={quality === q ? "bg-muted" : ""}
                          >
                            {q}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Fullscreen Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${
                  isLiked ? "text-[#E63946]" : "text-muted-foreground"
                } transition-colors duration-200`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-[#E63946]" : ""} transition-all duration-200`} />
                <span>{likeCount.toLocaleString()}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount.toLocaleString()}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info" className="mt-0">
          <div className="p-4 border rounded-lg space-y-4">
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={chefAvatar || "/placeholder.svg"} alt={chef} />
                  <AvatarFallback>{chef.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{chef}</span>
                <Badge className="bg-[#2A9D8F]">{cuisine}</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Ingredients</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 tbsp olive oil</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>1 onion, finely chopped</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 cloves garlic, minced</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>1 red bell pepper, diced</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>2 cups rice</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>4 cups vegetable broth</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Salt and pepper to taste</span>
                </li>
              </ul>
            </div>

            <Button className="w-full bg-[#E63946] hover:bg-[#c62b38]">
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
                className="mr-2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Buy Ingredients Kit
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Also keep the default export for backward compatibility
export default InteractiveVideoPlayer
