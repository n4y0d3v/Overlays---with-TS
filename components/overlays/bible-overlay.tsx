"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorPicker } from "@/components/ui/color-picker"
import { useOverlay } from "@/context/overlay-context"

export function BibleOverlay() {
  const { bibleOverlay, setBibleOverlay } = useOverlay()

  // Local state for UI
  const [localState, setLocalState] = useState(bibleOverlay)

  // Update context when local state changes
  useEffect(() => {
    setBibleOverlay(localState)
  }, [localState, setBibleOverlay])

  // Reset function
  const handleReset = () => {
    setLocalState({
      ...localState,
      verseReference: "",
      bibleVersion: "KJV",
      verseContent: "",
      referenceSettings: {
        fontSize: "24",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        transparent: false,
      },
      contentSettings: {
        fontSize: "18",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        transparent: false,
      },
    })
  }

  // Fetch verse function (mock)
  const fetchVerse = async () => {
    // This would be replaced with actual API call
    if (localState.verseReference) {
      setLocalState({
        ...localState,
        verseContent:
          "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      })
    }
  }

  return (
    <div className="overlay-section">
      <div className="overlay-header">
        <h2 className="overlay-title">Bible Lower-Third</h2>
        <div className="overlay-controls">
          <div className="flex items-center space-x-2">
            <Switch
              id="bible-toggle"
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
        {/* Verse Reference Group */}
        <div className="section-group">
          <h3 className="section-group-title">Verse Reference</h3>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="reference" className="form-label">
                Reference
              </Label>
              <Input
                id="reference"
                placeholder="e.g. John 3:16"
                value={localState.verseReference}
                onChange={(e) => setLocalState({ ...localState, verseReference: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="version" className="form-label">
                Version
              </Label>
              <select
                id="version"
                value={localState.bibleVersion}
                onChange={(e) => setLocalState({ ...localState, bibleVersion: e.target.value })}
                className="form-input"
              >
                <option value="KJV">KJV</option>
                <option value="NIV">NIV</option>
                <option value="ESV">ESV</option>
                <option value="NKJV">NKJV</option>
                <option value="NLT">NLT</option>
              </select>
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="reference-font-size" className="form-label">
                Font Size
              </Label>
              <div className="font-size-input">
                <input
                  id="reference-font-size"
                  type="number"
                  min="8"
                  max="72"
                  value={localState.referenceSettings.fontSize}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      referenceSettings: { ...localState.referenceSettings, fontSize: e.target.value },
                    })
                  }
                />
                <div className="spinner">
                  <button
                    onClick={() =>
                      setLocalState({
                        ...localState,
                        referenceSettings: {
                          ...localState.referenceSettings,
                          fontSize: (Number.parseInt(localState.referenceSettings.fontSize) + 1).toString(),
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
                        referenceSettings: {
                          ...localState.referenceSettings,
                          fontSize: Math.max(8, Number.parseInt(localState.referenceSettings.fontSize) - 1).toString(),
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
              <Label htmlFor="reference-font-color" className="form-label">
                Font Color
              </Label>
              <ColorPicker
                id="reference-font-color"
                color={localState.referenceSettings.fontColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    referenceSettings: { ...localState.referenceSettings, fontColor: color },
                  })
                }
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="reference-bg-color" className="form-label">
                Background Color
              </Label>
              <ColorPicker
                id="reference-bg-color"
                color={localState.referenceSettings.backgroundColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    referenceSettings: { ...localState.referenceSettings, backgroundColor: color },
                  })
                }
                disabled={localState.referenceSettings.transparent}
              />
            </div>

            <div className="form-field-fixed">
              <Label className="form-label">Transparent</Label>
              <div className="form-checkbox">
                <Checkbox
                  id="reference-transparent"
                  checked={localState.referenceSettings.transparent}
                  onCheckedChange={(checked) =>
                    setLocalState({
                      ...localState,
                      referenceSettings: {
                        ...localState.referenceSettings,
                        transparent: checked === true,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="button-row">
            <Button onClick={fetchVerse} className="fetch-button">
              Fetch Verse
            </Button>
          </div>
        </div>

        {/* Verse Content Group */}
        <div className="section-group">
          <h3 className="section-group-title">Verse Content</h3>

          <div className="form-row">
            <div className="form-field-full">
              <Label htmlFor="content" className="form-label">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Verse content will appear here after fetching"
                value={localState.verseContent}
                onChange={(e) => setLocalState({ ...localState, verseContent: e.target.value })}
                rows={3}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="form-row">
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
