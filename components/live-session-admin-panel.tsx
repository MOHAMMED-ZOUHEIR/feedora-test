"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Users, MessageSquare, Settings, Link2, QrCode } from "lucide-react"
import { useWebRTC } from "@/lib/webrtc"
import { QRCodeSVG } from "qrcode.react"

interface LiveSessionAdminPanelProps {
  sessionId: string
  title: string
}

export default function LiveSessionAdminPanel({ sessionId, title }: LiveSessionAdminPanelProps) {
  const [activeTab, setActiveTab] = useState("share")
  const [copied, setCopied] = useState(false)
  const { viewerCount, isStreaming, startBroadcast, stopBroadcast } = useWebRTC()
  
  // Generate a shareable link - in a real app, this would be a proper URL to your deployed app
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://feedora.example.com"
  const shareableLink = `${baseUrl}/live-sessions/${sessionId}`
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <Badge variant={isStreaming ? "default" : "outline"} className={isStreaming ? "bg-green-500" : ""}>
          {isStreaming ? "LIVE" : "Offline"}
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="share" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span>Share</span>
          </TabsTrigger>
          <TabsTrigger value="viewers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Viewers</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="share" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Share Your Live Session</h3>
            <p className="text-sm text-muted-foreground">
              Share this link with your audience to let them join your live cooking session.
            </p>
            
            <div className="bg-muted p-4 rounded-md space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Public Link</h4>
                <div className="flex items-center space-x-2">
                  <Input
                    value={shareableLink}
                    readOnly
                    className="h-9 bg-background"
                  />
                  <Button 
                    size="sm" 
                    className="px-3 bg-[#E63946] hover:bg-[#c62b38]"
                    onClick={() => copyToClipboard(shareableLink)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Admin Link</h4>
                <div className="flex items-center space-x-2">
                  <Input
                    value={`${shareableLink}/admin`}
                    readOnly
                    className="h-9 bg-background"
                  />
                  <Button 
                    size="sm" 
                    className="px-3 bg-[#E63946] hover:bg-[#c62b38]"
                    onClick={() => copyToClipboard(`${shareableLink}/admin`)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center mt-6 p-4 border rounded-md">
              <h4 className="text-sm font-medium mb-4">QR Code</h4>
              <div className="bg-white p-4 rounded-md">
                <QRCodeSVG value={shareableLink} size={150} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Scan to join the live session
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
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Share on social media</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="viewers" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Viewers</h3>
              <Badge>{viewerCount} online</Badge>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Viewer Statistics</h4>
                <Button variant="outline" size="sm">Refresh</Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-background p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Peak Viewers</p>
                  <p className="text-lg font-bold">{Math.max(viewerCount, 120)}</p>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Average Watch Time</p>
                  <p className="text-lg font-bold">12:45</p>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Chat Messages</p>
                  <p className="text-lg font-bold">{Math.floor(Math.random() * 50) + 20}</p>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                  <p className="text-lg font-bold">{Math.floor(Math.random() * 30) + 60}%</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Stream Settings</h3>
            
            <div className="bg-muted p-4 rounded-md space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Stream Title</h4>
                <Input defaultValue={title} className="h-9 bg-background" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Stream Quality</h4>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                  <option value="480p">480p (SD)</option>
                </select>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Stream Controls</h4>
                <div className="flex gap-2">
                  {isStreaming ? (
                    <Button 
                      className="bg-red-500 hover:bg-red-600" 
                      onClick={stopBroadcast}
                    >
                      End Stream
                    </Button>
                  ) : (
                    <Button 
                      className="bg-[#E63946] hover:bg-[#c62b38]" 
                      onClick={startBroadcast}
                    >
                      Start Stream
                    </Button>
                  )}
                  <Button variant="outline">Test Connection</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
