"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  id?: string
  color: string
  onChange: (color: string) => void
  disabled?: boolean
}

export function ColorPicker({ id, color, onChange, disabled = false }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={disabled ? false : open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full h-9 justify-start text-left font-normal p-0 overflow-hidden",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          disabled={disabled}
        >
          <div className="w-full h-full flex">
            <div className="h-full w-8 flex-shrink-0" style={{ backgroundColor: color }} />
            <div className="px-2 flex items-center text-xs">{color}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="grid grid-cols-5 gap-2">
            {[
              "#000000",
              "#FFFFFF",
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#00FFFF",
              "#FF00FF",
              "#C0C0C0",
              "#808080",
              "#800000",
              "#808000",
              "#008000",
              "#800080",
              "#008080",
              "#000080",
              "#FFA500",
              "#A52A2A",
              "#800080",
              "#008080",
            ].map((presetColor) => (
              <div
                key={presetColor}
                className="h-6 w-6 cursor-pointer rounded-sm border"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange(presetColor)
                  setOpen(false)
                }}
              />
            ))}
          </div>
          <div className="space-y-2">
            <label htmlFor="custom-color" className="text-xs">
              Custom Color
            </label>
            <Input
              id="custom-color"
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="hex-color" className="text-xs">
              Hex Value
            </label>
            <Input
              id="hex-color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="uppercase h-9 text-xs"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
