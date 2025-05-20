import type React from "react"
import GlobalHeader from "@/components/global-header"

export default function LiveSessionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <GlobalHeader />
      {children}
    </div>
  )
}
