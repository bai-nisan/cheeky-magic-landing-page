"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          "bg-muted text-muted-foreground rounded-bl-sm"
        )}
      >
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
          </div>
          <span className="text-xs opacity-70 ml-2">AI is typing...</span>
        </div>
      </div>
    </div>
  )
} 