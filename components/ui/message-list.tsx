"use client";

import * as React from "react";
import { Message } from "./chat";
import { cn } from "@/lib/utils";
import { MessageSkeleton } from "@/components/ui/skeleton";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-6 space-y-8"
      style={{ height: "100%" }}
    >
      <div className="max-w-3xl mx-auto space-y-8">
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
    <div className={cn("w-full", isFirst && "pt-2")}>
      {isUser ? (
        <div className="w-full text-left">
          {/* User message - with bubble for differentiation */}
          <div className="inline-block max-w-[85%] rounded-lg px-4 py-3 text-sm bg-primary text-primary-foreground">
            <div className="whitespace-pre-wrap leading-relaxed text-left">
              {formattedContent}
            </div>
          </div>
        </div>
      ) : isSystem ? (
        <div className="w-full text-left">
          <div
            className={cn(
              "rounded-lg px-4 py-3 text-sm text-left",
              "bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200"
            )}
          >
            <div className="whitespace-pre-wrap text-left">
              {formattedContent}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-left">
          {/* AI message - blended background style (no bubble) */}
          <div className="text-sm text-foreground">
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap leading-relaxed text-left">
              {message.isLoading ? (
                <MessageSkeleton />
              ) : (
                <MessageContent content={formattedContent} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like formatting for bold and sections
  const parts = content.split(/(\*\*.*?\*\*)/g);

  return (
    <div className="space-y-3">
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
                    <div
                      key={lineIndex}
                      className="ml-4 text-muted-foreground leading-relaxed"
                    >
                      {line.trim()}
                    </div>
                  );
                }
                return line ? (
                  <div key={lineIndex} className="leading-relaxed">
                    {line}
                  </div>
                ) : null;
              })}
            </div>
          );
        }

        return part ? (
          <span key={index} className="leading-relaxed">
            {part}
          </span>
        ) : null;
      })}
    </div>
  );
}
