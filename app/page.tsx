import { TopNavbar } from "@/components/top-navbar"
import { ControlPanel } from "@/components/control-panel"
import { PreviewCanvas } from "@/components/preview-canvas"
import { OverlayProvider } from "@/context/overlay-context"

export default function Home() {
  return (
    <OverlayProvider>
      <div className="flex min-h-screen flex-col">
        <TopNavbar />
        <main className="flex flex-1 flex-col md:flex-row">
          <div className="w-full md:w-[65%] overflow-y-auto border-r h-[calc(100vh-4rem)]">
            <ControlPanel />
          </div>
          <div className="w-full md:w-[35%] md:fixed md:right-0 md:top-16 md:bottom-0 bg-muted/20 overflow-hidden">
            <PreviewCanvas />
          </div>
        </main>
      </div>
    </OverlayProvider>
  )
}
