"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define types for each overlay
export interface BibleOverlayState {
  enabled: boolean
  verseReference: string
  bibleVersion: string
  verseContent: string
  referenceSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
  contentSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
}

export interface LyricsOverlayState {
  enabled: boolean
  selectedSongId: string
  currentVerseIndex: number
  songs: {
    id: string
    title: string
    lyrics: string
    verses: string[]
  }[]
  titleSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
  contentSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
}

export interface PresenterOverlayState {
  enabled: boolean
  presenterTitle: string
  presenterName: string
  titleSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
  nameSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
}

export interface TickerOverlayState {
  enabled: boolean
  tickerTitle: string
  titleBlink: boolean
  tickerContent: string
  scrollSpeed: number
  titleSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
  contentSettings: {
    fontSize: string
    fontColor: string
    backgroundColor: string
    transparent: boolean
  }
}

export interface ImageOverlayState {
  enabled: boolean
  images: {
    id: string
    url: string
    size: number
    position: { x: number; y: number }
  }[]
}

// Define the context type
interface OverlayContextType {
  bibleOverlay: BibleOverlayState
  setBibleOverlay: React.Dispatch<React.SetStateAction<BibleOverlayState>>
  lyricsOverlay: LyricsOverlayState
  setLyricsOverlay: React.Dispatch<React.SetStateAction<LyricsOverlayState>>
  presenterOverlay: PresenterOverlayState
  setPresenterOverlay: React.Dispatch<React.SetStateAction<PresenterOverlayState>>
  tickerOverlay: TickerOverlayState
  setTickerOverlay: React.Dispatch<React.SetStateAction<TickerOverlayState>>
  imageOverlay: ImageOverlayState
  setImageOverlay: React.Dispatch<React.SetStateAction<ImageOverlayState>>
}

// Create the context
const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

// Initial state values
const initialBibleOverlay: BibleOverlayState = {
  enabled: true,
  verseReference: "John 3:16",
  bibleVersion: "KJV",
  verseContent:
    "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
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
}

const initialLyricsOverlay: LyricsOverlayState = {
  enabled: true,
  selectedSongId: "1",
  currentVerseIndex: 0,
  songs: [
    {
      id: "1",
      title: "Amazing Grace",
      lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.`,
      verses: [
        `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.`,
        `'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.`,
      ],
    },
    {
      id: "2",
      title: "How Great Thou Art",
      lyrics: `O Lord my God, when I in awesome wonder,
Consider all the worlds Thy hands have made;
I see the stars, I hear the rolling thunder,
Thy power throughout the universe displayed.

Then sings my soul, my Savior God, to Thee,
How great Thou art, how great Thou art.
Then sings my soul, my Savior God, to Thee,
How great Thou art, how great Thou art!`,
      verses: [
        `O Lord my God, when I in awesome wonder,
Consider all the worlds Thy hands have made;
I see the stars, I hear the rolling thunder,
Thy power throughout the universe displayed.`,
        `Then sings my soul, my Savior God, to Thee,
How great Thou art, how great Thou art.
Then sings my soul, my Savior God, to Thee,
How great Thou art, how great Thou art!`,
      ],
    },
  ],
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
}

const initialPresenterOverlay: PresenterOverlayState = {
  enabled: true,
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
}

const initialTickerOverlay: TickerOverlayState = {
  enabled: true,
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
}

const initialImageOverlay: ImageOverlayState = {
  enabled: true,
  images: [],
}

// Create the provider component
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [bibleOverlay, setBibleOverlay] = useState<BibleOverlayState>(initialBibleOverlay)
  const [lyricsOverlay, setLyricsOverlay] = useState<LyricsOverlayState>(initialLyricsOverlay)
  const [presenterOverlay, setPresenterOverlay] = useState<PresenterOverlayState>(initialPresenterOverlay)
  const [tickerOverlay, setTickerOverlay] = useState<TickerOverlayState>(initialTickerOverlay)
  const [imageOverlay, setImageOverlay] = useState<ImageOverlayState>(initialImageOverlay)

  const value = {
    bibleOverlay,
    setBibleOverlay,
    lyricsOverlay,
    setLyricsOverlay,
    presenterOverlay,
    setPresenterOverlay,
    tickerOverlay,
    setTickerOverlay,
    imageOverlay,
    setImageOverlay,
  }

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
}

// Create a hook to use the context
export function useOverlay() {
  const context = useContext(OverlayContext)
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider")
  }
  return context
}
