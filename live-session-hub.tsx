import { DynamicSessionGrid } from "@/components/dynamic-session-grid"
import HostControls from "@/components/host-controls"
import GlobalHeader from "@/components/global-header"

export default function LiveSessionHub() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <GlobalHeader />

      <main className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Live Cooking Sessions</h1>
            <p className="text-muted-foreground">Join live cooking sessions with professional chefs and home cooks</p>
          </div>
          <HostControls />
        </div>

        <DynamicSessionGrid />
      </main>
    </div>
  )
}
