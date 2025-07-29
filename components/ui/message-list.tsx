"use client";

import * as React from "react";
import { Message } from "./chat";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4"
      style={{ height: "100%" }}
    >
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            isFirst={index === 0}
          />
        ))}
      </div>
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
}

interface ChatMessageItemProps {
  message: Message;
  isFirst?: boolean;
}

function formatMessageContent(content: string): string {
  // Remove emojis and format markdown-style content
  const withoutEmojis = content.replace(
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
    ""
  );
  return withoutEmojis;
}

function ChatMessageItem({ message, isFirst = false }: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const formattedContent = formatMessageContent(message.content);

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start",
        isFirst && "pt-2"
      )}
    >
      {isUser ? (
        <div
          className={cn(
            "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
            "bg-primary text-primary-foreground",
            "rounded-br-md"
          )}
        >
          <div className="whitespace-pre-wrap text-left">
            {formattedContent}
          </div>
          {message.timestamp && (
            <div className="text-xs opacity-70 mt-1 text-left">
              {message.timestamp}
            </div>
          )}
        </div>
      ) : isSystem ? (
        <div
          className={cn(
            "max-w-[80%] rounded-lg px-4 py-2 text-sm",
            "bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200",
            "rounded-bl-sm"
          )}
        >
          <div className="whitespace-pre-wrap">{formattedContent}</div>
          {message.timestamp && (
            <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
          )}
        </div>
      ) : (
        <div className="max-w-[85%] text-sm text-foreground text-left">
          <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
            <MessageContent content={formattedContent} />
          </div>
          {message.timestamp && (
            <div className="text-xs opacity-60 mt-2 text-muted-foreground text-left">
              {message.timestamp}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like formatting for bold and sections
  const parts = content.split(/(\*\*.*?\*\*)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const text = part.slice(2, -2);
          return (
            <strong key={index} className="font-semibold text-foreground">
              {text}
            </strong>
          );
        }

        // Handle bullet points
        if (part.includes("•")) {
          const lines = part.split("\n");
          return (
            <div key={index}>
              {lines.map((line, lineIndex) => {
                if (line.trim().startsWith("•")) {
                  return (
                    <div key={lineIndex} className="ml-4 text-muted-foreground">
                      {line.trim()}
                    </div>
                  );
                }
                return line ? <div key={lineIndex}>{line}</div> : null;
              })}
            </div>
          );
        }

        return part ? <span key={index}>{part}</span> : null;
      })}
    </div>
  );
}
