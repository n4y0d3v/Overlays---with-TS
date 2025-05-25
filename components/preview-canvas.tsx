"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Crown, Move } from "lucide-react"
import { useOverlay } from "@/context/overlay-context"
import { cn } from "@/lib/utils"

export function PreviewCanvas() {
  const { bibleOverlay, lyricsOverlay, presenterOverlay, tickerOverlay, imageOverlay, setImageOverlay } = useOverlay()

  const [tickerPosition, setTickerPosition] = useState(0)
  const [activeDragImage, setActiveDragImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  // Handle ticker animation
  useEffect(() => {
    if (!tickerOverlay.enabled || !tickerRef.current) return

    const tickerWidth = tickerRef.current.scrollWidth
    const containerWidth = 640 // Preview width

    // Reset position when it's completely off-screen
    if (tickerPosition < -tickerWidth) {
      setTickerPosition(containerWidth)
      return
    }

    // Calculate speed (1-10 scale to pixels per frame)
    const speed = tickerOverlay.scrollSpeed * 0.5

    const animationId = requestAnimationFrame(() => {
      setTickerPosition((prev) => prev - speed)
    })

    return () => cancelAnimationFrame(animationId)
  }, [tickerPosition, tickerOverlay.enabled, tickerOverlay.scrollSpeed])

  // Handle title blinking
  const [titleVisible, setTitleVisible] = useState(true)

  useEffect(() => {
    if (!tickerOverlay.enabled || !tickerOverlay.titleBlink) return

    const interval = setInterval(() => {
      setTitleVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [tickerOverlay.enabled, tickerOverlay.titleBlink])

  // Get selected song
  const selectedSong =
    lyricsOverlay.songs.find((song) => song.id === lyricsOverlay.selectedSongId) || lyricsOverlay.songs[0]
  const currentVerse = selectedSong?.verses[lyricsOverlay.currentVerseIndex] || ""

  // Handle image dragging
  const handleImageMouseDown = (e: React.MouseEvent, imageId: string) => {
    e.preventDefault()
    setActiveDragImage(imageId)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()

      // Calculate position as percentage of canvas dimensions
      const x = ((moveEvent.clientX - canvasRect.left) / canvasRect.width) * 100
      const y = ((moveEvent.clientY - canvasRect.top) / canvasRect.height) * 100

      // Clamp values between 0 and 100
      const clampedX = Math.max(0, Math.min(100, x))
      const clampedY = Math.max(0, Math.min(100, y))

      // Update image position
      setImageOverlay((prev) => ({
        ...prev,
        images: prev.images.map((img) =>
          img.id === imageId ? { ...img, position: { x: clampedX, y: clampedY } } : img,
        ),
      }))
    }

    const handleMouseUp = () => {
      setActiveDragImage(null)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  // Handle touch events for mobile
  const handleImageTouchStart = (e: React.TouchEvent, imageId: string) => {
    e.preventDefault()
    setActiveDragImage(imageId)

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!canvasRef.current || moveEvent.touches.length === 0) return

      const touch = moveEvent.touches[0]
      const canvasRect = canvasRef.current.getBoundingClientRect()

      // Calculate position as percentage of canvas dimensions
      const x = ((touch.clientX - canvasRect.left) / canvasRect.width) * 100
      const y = ((touch.clientY - canvasRect.top) / canvasRect.height) * 100

      // Clamp values between 0 and 100
      const clampedX = Math.max(0, Math.min(100, x))
      const clampedY = Math.max(0, Math.min(100, y))

      // Update image position
      setImageOverlay((prev) => ({
        ...prev,
        images: prev.images.map((img) =>
          img.id === imageId ? { ...img, position: { x: clampedX, y: clampedY } } : img,
        ),
      }))
    }

    const handleTouchEnd = () => {
      setActiveDragImage(null)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)
  }

  return (
    <div className="preview-section">
      <div className="preview-container">
        <div ref={canvasRef} className="preview-canvas-wrapper mb-4">
          {/* Bible Overlay */}
          {bibleOverlay.enabled && (
            <div className="absolute top-4 left-4 max-w-[80%]">
              <div
                className="inline-block mb-1 px-2 py-1"
                style={{
                  fontSize: `${bibleOverlay.referenceSettings.fontSize}px`,
                  color: bibleOverlay.referenceSettings.fontColor,
                  backgroundColor: bibleOverlay.referenceSettings.transparent
                    ? "transparent"
                    : bibleOverlay.referenceSettings.backgroundColor,
                }}
              >
                {bibleOverlay.verseReference} ({bibleOverlay.bibleVersion})
              </div>
              <div
                className="block px-2 py-1"
                style={{
                  fontSize: `${bibleOverlay.contentSettings.fontSize}px`,
                  color: bibleOverlay.contentSettings.fontColor,
                  backgroundColor: bibleOverlay.contentSettings.transparent
                    ? "transparent"
                    : bibleOverlay.contentSettings.backgroundColor,
                  maxWidth: "100%",
                }}
              >
                {bibleOverlay.verseContent}
              </div>
            </div>
          )}

          {/* Lyrics Overlay */}
          {lyricsOverlay.enabled && (
            <div className="absolute top-4 right-4 max-w-[80%] text-right">
              <div
                className="inline-block mb-1 px-2 py-1"
                style={{
                  fontSize: `${lyricsOverlay.titleSettings.fontSize}px`,
                  color: lyricsOverlay.titleSettings.fontColor,
                  backgroundColor: lyricsOverlay.titleSettings.transparent
                    ? "transparent"
                    : lyricsOverlay.titleSettings.backgroundColor,
                }}
              >
                {selectedSong?.title}
              </div>
              <div
                className="block px-2 py-1 whitespace-pre-line"
                style={{
                  fontSize: `${lyricsOverlay.contentSettings.fontSize}px`,
                  color: lyricsOverlay.contentSettings.fontColor,
                  backgroundColor: lyricsOverlay.contentSettings.transparent
                    ? "transparent"
                    : lyricsOverlay.contentSettings.backgroundColor,
                  maxWidth: "100%",
                }}
              >
                {currentVerse}
              </div>
            </div>
          )}

          {/* Presenter Overlay */}
          {presenterOverlay.enabled && (
            <div className="absolute bottom-20 left-4 max-w-[60%]">
              <div
                className="inline-block mb-1 px-2 py-1"
                style={{
                  fontSize: `${presenterOverlay.titleSettings.fontSize}px`,
                  color: presenterOverlay.titleSettings.fontColor,
                  backgroundColor: presenterOverlay.titleSettings.transparent
                    ? "transparent"
                    : presenterOverlay.titleSettings.backgroundColor,
                }}
              >
                {presenterOverlay.presenterTitle}
              </div>
              <div
                className="block px-2 py-1"
                style={{
                  fontSize: `${presenterOverlay.nameSettings.fontSize}px`,
                  color: presenterOverlay.nameSettings.fontColor,
                  backgroundColor: presenterOverlay.nameSettings.transparent
                    ? "transparent"
                    : presenterOverlay.nameSettings.backgroundColor,
                }}
              >
                {presenterOverlay.presenterName}
              </div>
            </div>
          )}

          {/* Ticker Overlay */}
          {tickerOverlay.enabled && (
            <div className="absolute bottom-4 left-0 right-0 flex flex-col">
              {/* Ticker Title */}
              <div
                className={cn(
                  "inline-block px-2 py-1 mx-auto mb-1",
                  tickerOverlay.titleBlink && !titleVisible && "opacity-0",
                )}
                style={{
                  fontSize: `${tickerOverlay.titleSettings.fontSize}px`,
                  color: tickerOverlay.titleSettings.fontColor,
                  backgroundColor: tickerOverlay.titleSettings.transparent
                    ? "transparent"
                    : tickerOverlay.titleSettings.backgroundColor,
                  transition: "opacity 0.1s ease",
                }}
              >
                {tickerOverlay.tickerTitle}
              </div>

              {/* Ticker Content */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  backgroundColor: tickerOverlay.contentSettings.transparent
                    ? "transparent"
                    : tickerOverlay.contentSettings.backgroundColor,
                  height: `${Number.parseInt(tickerOverlay.contentSettings.fontSize) + 16}px`,
                }}
              >
                <div
                  ref={tickerRef}
                  className="absolute whitespace-nowrap"
                  style={{
                    fontSize: `${tickerOverlay.contentSettings.fontSize}px`,
                    color: tickerOverlay.contentSettings.fontColor,
                    transform: `translateX(${tickerPosition}px)`,
                    padding: "4px 0",
                  }}
                >
                  {tickerOverlay.tickerContent}
                </div>
              </div>
            </div>
          )}

          {/* Image Overlay */}
          {imageOverlay.enabled &&
            imageOverlay.images.map((image) => (
              <div
                key={image.id}
                className={cn("absolute cursor-move", activeDragImage === image.id && "ring-2 ring-primary")}
                style={{
                  top: `${image.position.y}%`,
                  left: `${image.position.x}%`,
                  transform: "translate(-50%, -50%)",
                  width: `${image.size}%`,
                  maxWidth: "90%",
                  maxHeight: "90%",
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  aspectRatio: "1",
                }}
                onMouseDown={(e) => handleImageMouseDown(e, image.id)}
                onTouchStart={(e) => handleImageTouchStart(e, image.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 rounded-full p-2">
                    <Move className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center bg-yellow-400 text-white px-3 py-1 rounded-full">
          <Crown className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Premium</span>
        </div>
      </div>
    </div>
  )
}
