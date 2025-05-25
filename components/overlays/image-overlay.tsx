"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useOverlay } from "@/context/overlay-context"

export function ImageOverlay() {
  const { imageOverlay, setImageOverlay } = useOverlay()

  // Local state for UI
  const [localState, setLocalState] = useState(imageOverlay)
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [imageSize, setImageSize] = useState(100)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update context when local state changes
  useEffect(() => {
    setImageOverlay(localState)
  }, [localState, setImageOverlay])

  // Reset function
  const handleReset = () => {
    setLocalState({
      ...localState,
      images: [],
    })
    setCurrentImage(null)
    setImageSize(100)
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCurrentImage(file)
    }
  }

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setCurrentImage(file)
    }
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  // Add image to overlay
  const addImage = () => {
    if (currentImage) {
      const newImage = {
        id: Date.now().toString(),
        url: URL.createObjectURL(currentImage),
        size: imageSize,
        position: { x: 50, y: 50 }, // Default to center (percentage)
      }

      setLocalState({
        ...localState,
        images: [...localState.images, newImage],
      })

      // Reset file input for next upload
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Remove image from overlay
  const removeImage = (id: string) => {
    setLocalState({
      ...localState,
      images: localState.images.filter((img) => img.id !== id),
    })
  }

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="overlay-section">
      <div className="overlay-header">
        <h2 className="overlay-title">Image Overlay</h2>
        <div className="overlay-controls">
          <div className="flex items-center space-x-2">
            <Switch
              id="image-toggle"
              checked={localState.enabled}
              onCheckedChange={(checked) => setLocalState({ ...localState, enabled: checked })}
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="reset-button">
            Reset
          </Button>
        </div>
      </div>

      <div className="section-content">
        {/* Upload Image Group */}
        <div className="section-group">
          <h3 className="section-group-title">Upload Image</h3>
          <p className="text-xs text-muted-foreground mb-3">Add up to 10 images to your stream</p>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="upload-image" className="form-label">
                PNG only, not more than 200kb, square dimensions
              </Label>
              <div className="upload-button" onClick={triggerFileInput}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                {currentImage ? currentImage.name : "Choose file..."}
              </div>
            </div>

            <div className="form-field-auto">
              <Label htmlFor="image-size" className="form-label">
                Increase image size
              </Label>
              <div className="slider-container">
                <input
                  id="image-size"
                  type="range"
                  min="10"
                  max="200"
                  value={imageSize}
                  onChange={(e) => setImageSize(Number.parseInt(e.target.value))}
                  className="slider"
                  disabled={!currentImage}
                />
              </div>
            </div>

            <div className="form-field-fixed">
              <Label className="form-label">&nbsp;</Label>
              <Button onClick={addImage} className="add-button w-full" disabled={!currentImage}>
                Add
              </Button>
            </div>
          </div>

          {/* Added Images List */}
          {localState.images.length > 0 && (
            <div className="mt-4 space-y-4">
              <h4 className="text-sm font-medium">Added Images ({localState.images.length})</h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                {localState.images.map((img) => (
                  <div key={img.id} className="border rounded-md p-3 relative">
                    <div
                      className="relative w-full h-24"
                      style={{
                        backgroundImage: `url(${img.url})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Image #{img.id.slice(-4)}</span>
                      <span className="text-xs text-muted-foreground">{img.size}%</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="hidden xs:inline">Position: </span>
                        <span className="ml-1">X: {img.position.x.toFixed(0)}%</span>
                        <span className="ml-1">Y: {img.position.y.toFixed(0)}%</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={() => removeImage(img.id)}
                      >
                        ×<span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-sm">
                <p className="text-muted-foreground">
                  Drag and drop images directly in the preview canvas to position them exactly where you want.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
