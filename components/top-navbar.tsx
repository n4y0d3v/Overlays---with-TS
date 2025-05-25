"use client"

import { Menu, Copy, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function TopNavbar() {
  const [overlayUrl] = useState("https://overlay.example.com/stream/123456")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(overlayUrl)
    toast({
      title: "URL Copied",
      description: "Overlay URL has been copied to clipboard",
      duration: 3000,
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-lg font-semibold tracking-tight truncate">OVERLAY-PROJECT</h1>
          <span className="text-sm text-muted-foreground">Manage Your Overlays</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            <Copy className="h-5 w-5" />
            <span className="sr-only">Copy overlay URL</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </div>
      <Toaster />
    </header>
  )
}
