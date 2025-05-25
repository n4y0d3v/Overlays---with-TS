"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorPicker } from "@/components/ui/color-picker"
import { useOverlay } from "@/context/overlay-context"

export function TickerOverlay() {
  const { tickerOverlay, setTickerOverlay } = useOverlay()

  // Local state for UI
  const [localState, setLocalState] = useState(tickerOverlay)

  // Update context when local state changes
  useEffect(() => {
    setTickerOverlay(localState)
  }, [localState, setTickerOverlay])

  // Reset function
  const handleReset = () => {
    setLocalState({
      ...localState,
      tickerTitle: "BREAKING NEWS",
      titleBlink: false,
      tickerContent: "Welcome to our livestream. Thank you for joining us today!",
      scrollSpeed: 5,
      titleSettings: {
        fontSize: "24",
        fontColor: "#FFFFFF",
        backgroundColor: "#FF0000",
        transparent: false,
      },
      contentSettings: {
        fontSize: "20",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        transparent: false,
      },
    })
  }

  return (
    <div className="overlay-section">
      <div className="overlay-header">
        <h2 className="overlay-title">Ticker Overlay</h2>
        <div className="overlay-controls">
          <div className="flex items-center space-x-2">
            <Switch
              id="ticker-toggle"
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
        {/* Ticker Title Group */}
        <div className="section-group">
          <div className="flex justify-between items-center mb-3">
            <h3 className="section-group-title mb-0">Ticker Title</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="title-blink"
                checked={localState.titleBlink}
                onCheckedChange={(checked) => setLocalState({ ...localState, titleBlink: !!checked })}
              />
              <Label htmlFor="title-blink" className="text-xs">
                Blink
              </Label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="ticker-title" className="form-label">
                Title
              </Label>
              <Input
                id="ticker-title"
                placeholder="e.g. BREAKING NEWS, ANNOUNCEMENT"
                value={localState.tickerTitle}
                onChange={(e) => setLocalState({ ...localState, tickerTitle: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="title-font-size" className="form-label">
                Font Size
              </Label>
              <div className="font-size-input">
                <input
                  id="title-font-size"
                  type="number"
                  min="8"
                  max="72"
                  value={localState.titleSettings.fontSize}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      titleSettings: { ...localState.titleSettings, fontSize: e.target.value },
                    })
                  }
                />
                <div className="spinner">
                  <button
                    onClick={() =>
                      setLocalState({
                        ...localState,
                        titleSettings: {
                          ...localState.titleSettings,
                          fontSize: (Number.parseInt(localState.titleSettings.fontSize) + 1).toString(),
                        },
                      })
                    }
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      setLocalState({
                        ...localState,
                        titleSettings: {
                          ...localState.titleSettings,
                          fontSize: Math.max(8, Number.parseInt(localState.titleSettings.fontSize) - 1).toString(),
                        },
                      })
                    }
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="title-font-color" className="form-label">
                Font Color
              </Label>
              <ColorPicker
                id="title-font-color"
                color={localState.titleSettings.fontColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    titleSettings: { ...localState.titleSettings, fontColor: color },
                  })
                }
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="title-bg-color" className="form-label">
                Background Color
              </Label>
              <ColorPicker
                id="title-bg-color"
                color={localState.titleSettings.backgroundColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    titleSettings: { ...localState.titleSettings, backgroundColor: color },
                  })
                }
                disabled={localState.titleSettings.transparent}
              />
            </div>

            <div className="form-field-fixed">
              <Label className="form-label">Transparent</Label>
              <div className="form-checkbox">
                <Checkbox
                  id="title-transparent"
                  checked={localState.titleSettings.transparent}
                  onCheckedChange={(checked) =>
                    setLocalState({
                      ...localState,
                      titleSettings: {
                        ...localState.titleSettings,
                        transparent: checked === true,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ticker Content Group */}
        <div className="section-group">
          <div className="flex justify-between items-center mb-3">
            <h3 className="section-group-title mb-0">Ticker Content</h3>
            <div className="flex items-center gap-2">
              <Label htmlFor="scroll-speed" className="text-xs whitespace-nowrap">
                Scroll Speed (px/s)
              </Label>
              <div className="slider-container">
                <input
                  id="scroll-speed"
                  type="range"
                  min="1"
                  max="10"
                  value={localState.scrollSpeed}
                  onChange={(e) => setLocalState({ ...localState, scrollSpeed: Number.parseInt(e.target.value) })}
                  className="slider"
                />
                <span className="value">{localState.scrollSpeed}</span>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="ticker-content" className="form-label">
                Content
              </Label>
              <Input
                id="ticker-content"
                placeholder="Enter ticker text here"
                value={localState.tickerContent}
                onChange={(e) => setLocalState({ ...localState, tickerContent: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="content-font-size" className="form-label">
                Font Size
              </Label>
              <div className="font-size-input">
                <input
                  id="content-font-size"
                  type="number"
                  min="8"
                  max="72"
                  value={localState.contentSettings.fontSize}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      contentSettings: { ...localState.contentSettings, fontSize: e.target.value },
                    })
                  }
                />
                <div className="spinner">
                  <button
                    onClick={() =>
                      setLocalState({
                        ...localState,
                        contentSettings: {
                          ...localState.contentSettings,
                          fontSize: (Number.parseInt(localState.contentSettings.fontSize) + 1).toString(),
                        },
                      })
                    }
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      setLocalState({
                        ...localState,
                        contentSettings: {
                          ...localState.contentSettings,
                          fontSize: Math.max(8, Number.parseInt(localState.contentSettings.fontSize) - 1).toString(),
                        },
                      })
                    }
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="content-font-color" className="form-label">
                Font Color
              </Label>
              <ColorPicker
                id="content-font-color"
                color={localState.contentSettings.fontColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    contentSettings: { ...localState.contentSettings, fontColor: color },
                  })
                }
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="content-bg-color" className="form-label">
                Background Color
              </Label>
              <ColorPicker
                id="content-bg-color"
                color={localState.contentSettings.backgroundColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    contentSettings: { ...localState.contentSettings, backgroundColor: color },
                  })
                }
                disabled={localState.contentSettings.transparent}
              />
            </div>

            <div className="form-field-fixed">
              <Label className="form-label">Transparent</Label>
              <div className="form-checkbox">
                <Checkbox
                  id="content-transparent"
                  checked={localState.contentSettings.transparent}
                  onCheckedChange={(checked) =>
                    setLocalState({
                      ...localState,
                      contentSettings: {
                        ...localState.contentSettings,
                        transparent: checked === true,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
