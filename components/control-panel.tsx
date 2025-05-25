import { BibleOverlay } from "@/components/overlays/bible-overlay"
import { LyricsOverlay } from "@/components/overlays/lyrics-overlay"
import { PresenterOverlay } from "@/components/overlays/presenter-overlay"
import { TickerOverlay } from "@/components/overlays/ticker-overlay"
import { ImageOverlay } from "@/components/overlays/image-overlay"

export function ControlPanel() {
  return (
    <div className="control-panel">
      <div className="space-y-6">
        {/* Bible Overlay Section */}
        <BibleOverlay />

        {/* Lyrics Overlay Section */}
        <LyricsOverlay />

        {/* Presenter Overlay Section */}
        <PresenterOverlay />

        {/* Ticker Overlay Section */}
        <TickerOverlay />

        {/* Image Overlay Section */}
        <ImageOverlay />
      </div>
    </div>
  )
}
