"use client"

import { useState } from "react"
import { Share2, Copy, Check, Link2 } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRCodeSVG } from "qrcode.react"

interface ShareLiveSessionProps {
  sessionId: string
  isHost?: boolean
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ShareLiveSession({
  sessionId,
  isHost = false,
  variant = "outline",
  size = "sm",
  className = "",
}: ShareLiveSessionProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("link")
  
  // Generate a shareable link - in a real app, this would be a proper URL to your deployed app
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://feedora.example.com"
  const shareableLink = `${baseUrl}/live-sessions/${sessionId}`
  
  // Generate an embed code for the live session
  const embedCode = `<iframe src="${shareableLink}/embed" width="100%" height="480" frameborder="0" allow="camera; microphone" allowfullscreen></iframe>`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AnimatedButton
          variant={variant}
          size={size}
          animation="scale"
          className={className}
          icon={<Share2 className="h-4 w-4" />}
        >
          Share
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Live Session</DialogTitle>
          <DialogDescription>
            Share this live cooking session with friends, family, or on social media.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            {isHost && <TabsTrigger value="embed">Embed</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  id="link"
                  value={shareableLink}
                  readOnly
                  className="h-9"
                />
              </div>
              <Button 
                size="sm" 
                className="px-3 bg-[#E63946] hover:bg-[#c62b38]"
                onClick={() => copyToClipboard(shareableLink)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            {isHost && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Admin Panel</h4>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-2">
                    This link gives you access to the admin panel for this live session:
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={`${shareableLink}/admin`}
                      readOnly
                      className="h-8 text-xs"
                    />
                    <Button 
                      size="sm" 
                      className="px-3 h-8 bg-[#E63946] hover:bg-[#c62b38]"
                      onClick={() => copyToClipboard(`${shareableLink}/admin`)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex flex-col gap-2">
              <h4 className="text-sm font-medium">Share on social media</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  WhatsApp
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="qr" className="mt-4 flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <QRCodeSVG value={shareableLink} size={200} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Scan this QR code to join the live session
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                const canvas = document.querySelector("canvas");
                if (canvas) {
                  const url = canvas.toDataURL();
                  const a = document.createElement("a");
                  a.download = `feedora-live-session-${sessionId}.png`;
                  a.href = url;
                  a.click();
                }
              }}
            >
              Download QR Code
            </Button>
          </TabsContent>
          
          {isHost && (
            <TabsContent value="embed" className="mt-4">
              <div className="grid gap-2">
                <div className="bg-muted p-4 rounded-md overflow-auto">
                  <pre className="text-xs">{embedCode}</pre>
                </div>
                <Button 
                  size="sm" 
                  className="bg-[#E63946] hover:bg-[#c62b38]"
                  onClick={() => copyToClipboard(embedCode)}
                >
                  {copied ? "Copied!" : "Copy Embed Code"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Paste this code into your website or blog to embed this live session.
                </p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
