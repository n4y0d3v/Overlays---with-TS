"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorPicker } from "@/components/ui/color-picker"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit } from "lucide-react"
import { useOverlay } from "@/context/overlay-context"

export function LyricsOverlay() {
  const { lyricsOverlay, setLyricsOverlay } = useOverlay()

  // Local state for UI
  const [localState, setLocalState] = useState(lyricsOverlay)
  const [isManageSongsOpen, setIsManageSongsOpen] = useState(false)
  const [newSong, setNewSong] = useState({ title: "", lyrics: "" })
  const [editingSong, setEditingSong] = useState<{ id: string; title: string; lyrics: string } | null>(null)

  // Update context when local state changes
  useEffect(() => {
    setLyricsOverlay(localState)
  }, [localState, setLyricsOverlay])

  // Get the selected song
  const selectedSong = localState.songs.find((song) => song.id === localState.selectedSongId) ||
    localState.songs[0] || { title: "", lyrics: "", verses: [""] }

  // Reset function
  const handleReset = () => {
    setLocalState({
      ...localState,
      selectedSongId: localState.songs[0]?.id || "",
      currentVerseIndex: 0,
      titleSettings: {
        fontSize: "28",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
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

  // Navigation functions
  const handlePrevious = () => {
    if (localState.currentVerseIndex > 0) {
      setLocalState({
        ...localState,
        currentVerseIndex: localState.currentVerseIndex - 1,
      })
    }
  }

  const handleNext = () => {
    if (localState.currentVerseIndex < selectedSong.verses.length - 1) {
      setLocalState({
        ...localState,
        currentVerseIndex: localState.currentVerseIndex + 1,
      })
    }
  }

  // Song management functions
  const handleAddSong = () => {
    if (newSong.title.trim() && newSong.lyrics.trim()) {
      const verses = newSong.lyrics.split("\n\n").filter((verse) => verse.trim())
      const newId = (Math.max(...localState.songs.map((s) => Number.parseInt(s.id)), 0) + 1).toString()

      const updatedSongs = [
        ...localState.songs,
        {
          id: newId,
          title: newSong.title,
          lyrics: newSong.lyrics,
          verses: verses.length > 0 ? verses : [newSong.lyrics],
        },
      ]

      setLocalState({
        ...localState,
        songs: updatedSongs,
        selectedSongId: localState.selectedSongId || newId,
      })

      setNewSong({ title: "", lyrics: "" })
    }
  }

  const handleUpdateSong = () => {
    if (editingSong && editingSong.title.trim() && editingSong.lyrics.trim()) {
      const verses = editingSong.lyrics.split("\n\n").filter((verse) => verse.trim())

      const updatedSongs = localState.songs.map((song) =>
        song.id === editingSong.id
          ? {
              ...song,
              title: editingSong.title,
              lyrics: editingSong.lyrics,
              verses: verses.length > 0 ? verses : [editingSong.lyrics],
            }
          : song,
      )

      setLocalState({
        ...localState,
        songs: updatedSongs,
      })

      setEditingSong(null)
    }
  }

  const handleDeleteSong = (id: string) => {
    const updatedSongs = localState.songs.filter((song) => song.id !== id)

    // If the deleted song was selected, select the first song
    const updatedSelectedId = localState.selectedSongId === id ? updatedSongs[0]?.id || "" : localState.selectedSongId

    setLocalState({
      ...localState,
      songs: updatedSongs,
      selectedSongId: updatedSelectedId,
      currentVerseIndex: updatedSelectedId === localState.selectedSongId ? localState.currentVerseIndex : 0,
    })
  }

  const startEditSong = (song: (typeof localState.songs)[0]) => {
    setEditingSong({
      id: song.id,
      title: song.title,
      lyrics: song.lyrics,
    })
  }

  return (
    <div className="overlay-section">
      <div className="overlay-header">
        <h2 className="overlay-title">Lyrics Lower-Third</h2>
        <div className="overlay-controls">
          <div className="flex items-center space-x-2">
            <Switch
              id="lyrics-toggle"
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
        {/* Lyrics Title Group */}
        <div className="section-group">
          <h3 className="section-group-title">Lyrics Title</h3>

          <div className="form-row">
            <div className="form-field-auto">
              <Label htmlFor="title" className="form-label">
                Title
              </Label>
              <select
                id="title"
                value={localState.selectedSongId}
                onChange={(e) => {
                  setLocalState({
                    ...localState,
                    selectedSongId: e.target.value,
                    currentVerseIndex: 0,
                  })
                }}
                className="form-input"
              >
                {localState.songs.map((song) => (
                  <option key={song.id} value={song.id}>
                    {song.title}
                  </option>
                ))}
              </select>
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

        {/* Lyrics Content Group */}
        <div className="section-group">
          <h3 className="section-group-title">Lyrics Content</h3>

          <div className="form-row">
            <div className="form-field-full">
              <Label htmlFor="lyrics-content" className="form-label">
                Content
              </Label>
              <Textarea
                id="lyrics-content"
                value={selectedSong.verses[localState.currentVerseIndex] || ""}
                readOnly
                rows={4}
                className="form-textarea"
                placeholder="Select a song and manage segments..."
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

          <div className="button-row">
            <Dialog open={isManageSongsOpen} onOpenChange={setIsManageSongsOpen}>
              <DialogTrigger asChild>
                <Button className="manage-button">Manage Songs</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Manage Songs</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 my-4">
                  <h4 className="font-medium">Add New Song</h4>
                  <div className="space-y-2">
                    <Label htmlFor="new-song-title">Song Title</Label>
                    <Input
                      id="new-song-title"
                      value={newSong.title}
                      onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                      placeholder="Enter song title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-song-lyrics">Lyrics (separate verses with blank lines)</Label>
                    <Textarea
                      id="new-song-lyrics"
                      value={newSong.lyrics}
                      onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
                      placeholder="Enter song lyrics"
                      rows={6}
                    />
                  </div>
                  <Button onClick={handleAddSong} className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Song
                  </Button>
                </div>

                {editingSong && (
                  <div className="space-y-4 my-4 border-t pt-4">
                    <h4 className="font-medium">Edit Song</h4>
                    <div className="space-y-2">
                      <Label htmlFor="edit-song-title">Song Title</Label>
                      <Input
                        id="edit-song-title"
                        value={editingSong.title}
                        onChange={(e) => setEditingSong({ ...editingSong, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-song-lyrics">Lyrics (separate verses with blank lines)</Label>
                      <Textarea
                        id="edit-song-lyrics"
                        value={editingSong.lyrics}
                        onChange={(e) => setEditingSong({ ...editingSong, lyrics: e.target.value })}
                        rows={6}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateSong} className="flex-1">
                        Update Song
                      </Button>
                      <Button variant="outline" onClick={() => setEditingSong(null)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Your Songs</h4>
                  <div className="max-h-[200px] overflow-y-auto space-y-2">
                    {localState.songs.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No songs added yet</p>
                    ) : (
                      localState.songs.map((song) => (
                        <div key={song.id} className="flex items-center justify-between border p-2 rounded-md">
                          <span className="font-medium truncate max-w-[300px]">{song.title}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => startEditSong(song)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSong(song.id)}
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handlePrevious} disabled={localState.currentVerseIndex === 0} className="prev-button">
              Prev
            </Button>

            <Button
              onClick={handleNext}
              disabled={localState.currentVerseIndex >= selectedSong.verses.length - 1}
              className="next-button"
            >
              Next
            </Button>

            <span className="text-sm text-muted-foreground">
              {selectedSong.verses.length > 0
                ? `Verse ${localState.currentVerseIndex + 1} of ${selectedSong.verses.length}`
                : "No verses"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
