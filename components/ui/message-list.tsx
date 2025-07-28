"use client"

import * as React from "react"
import { Message } from "./chat"
import { TypingIndicator } from "./typing-indicator"
import { cn } from "@/lib/utils"

interface MessageListProps {
  messages: Message[]
  isTyping?: boolean
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <>
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </>
  )
}

interface ChatMessageItemProps {
  message: Message
}

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user"
  const isSystem = message.role === "system"

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground ml-auto"
            : isSystem
            ? "bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200"
            : "bg-muted text-muted-foreground",
          isUser ? "rounded-br-sm" : "rounded-bl-sm"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.timestamp && (
          <div className="text-xs opacity-70 mt-1">
            {message.timestamp}
          </div>
        )}
      </div>
    </div>
  )
} 