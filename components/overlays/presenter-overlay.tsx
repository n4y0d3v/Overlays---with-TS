"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorPicker } from "@/components/ui/color-picker"
import { useOverlay } from "@/context/overlay-context"

export function PresenterOverlay() {
  const { presenterOverlay, setPresenterOverlay } = useOverlay()

  // Local state for UI
  const [localState, setLocalState] = useState(presenterOverlay)

  // Update context when local state changes
  useEffect(() => {
    setPresenterOverlay(localState)
  }, [localState, setPresenterOverlay])

  // Reset function
  const handleReset = () => {
    setLocalState({
      ...localState,
      presenterTitle: "Speaker",
      presenterName: "John Doe",
      titleSettings: {
        fontSize: "24",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        transparent: false,
      },
      nameSettings: {
        fontSize: "32",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        transparent: false,
      },
    })
  }

  return (
    <div className="overlay-section">
      <div className="overlay-header">
        <h2 className="overlay-title">Presenter Lower-Third</h2>
        <div className="overlay-controls">
          <div className="flex items-center space-x-2">
            <Switch
              id="presenter-toggle"
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
        {/* Presenter Title Group */}
        <div className="section-group">
          <h3 className="section-group-title">Presenter Title</h3>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="presenter-title" className="form-label">
                Title
              </Label>
              <Input
                id="presenter-title"
                placeholder="e.g. Pastor, Speaker, Guest"
                value={localState.presenterTitle}
                onChange={(e) => setLocalState({ ...localState, presenterTitle: e.target.value })}
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

        {/* Presenter Name Group */}
        <div className="section-group">
          <h3 className="section-group-title">Presenter Name</h3>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="presenter-name" className="form-label">
                Name
              </Label>
              <Input
                id="presenter-name"
                placeholder="e.g. John Doe"
                value={localState.presenterName}
                onChange={(e) => setLocalState({ ...localState, presenterName: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="name-font-size" className="form-label">
                Font Size
              </Label>
              <div className="font-size-input">
                <input
                  id="name-font-size"
                  type="number"
                  min="8"
                  max="72"
                  value={localState.nameSettings.fontSize}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      nameSettings: { ...localState.nameSettings, fontSize: e.target.value },
                    })
                  }
                />
                <div className="spinner">
                  <button
                    onClick={() =>
                      setLocalState({
                        ...localState,
                        nameSettings: {
                          ...localState.nameSettings,
                          fontSize: (Number.parseInt(localState.nameSettings.fontSize) + 1).toString(),
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
                        nameSettings: {
                          ...localState.nameSettings,
                          fontSize: Math.max(8, Number.parseInt(localState.nameSettings.fontSize) - 1).toString(),
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
              <Label htmlFor="name-font-color" className="form-label">
                Font Color
              </Label>
              <ColorPicker
                id="name-font-color"
                color={localState.nameSettings.fontColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    nameSettings: { ...localState.nameSettings, fontColor: color },
                  })
                }
              />
            </div>

            <div className="form-field-fixed">
              <Label htmlFor="name-bg-color" className="form-label">
                Background Color
              </Label>
              <ColorPicker
                id="name-bg-color"
                color={localState.nameSettings.backgroundColor}
                onChange={(color) =>
                  setLocalState({
                    ...localState,
                    nameSettings: { ...localState.nameSettings, backgroundColor: color },
                  })
                }
                disabled={localState.nameSettings.transparent}
              />
            </div>

            <div className="form-field-fixed">
              <Label className="form-label">Transparent</Label>
              <div className="form-checkbox">
                <Checkbox
                  id="name-transparent"
                  checked={localState.nameSettings.transparent}
                  onCheckedChange={(checked) =>
                    setLocalState({
                      ...localState,
                      nameSettings: {
                        ...localState.nameSettings,
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
