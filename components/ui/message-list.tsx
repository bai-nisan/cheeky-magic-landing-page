"use client";

import * as React from "react";
import { Message } from "./chat";
import { TypingIndicator } from "./typing-indicator";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Use scrollTop instead of scrollIntoView to prevent affecting page scroll
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    // Add a small delay to prevent jumping during rapid state changes
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  // Only scroll on typing changes if there are already messages
  React.useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isTyping, messages.length]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0"
    >
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}

interface ChatMessageItemProps {
  message: Message;
}

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  return (
    <div className={cn("flex", "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : isSystem
            ? "bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200"
            : "bg-muted text-muted-foreground",
          "rounded-bl-sm"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.timestamp && (
          <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
        )}
      </div>
    </div>
  );
}
