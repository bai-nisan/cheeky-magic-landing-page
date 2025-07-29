"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronUpIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageList } from "./message-list";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  isLoading?: boolean;
}

interface ChatProps {
  messages: Message[];
  suggestions?: string[];
  append?: (message: Message) => void;
  className?: string;
}

export function Chat({ messages, suggestions, append, className }: ChatProps) {
  const isEmpty = messages.length === 0;

  return (
    <ChatContainer className={className}>
      {isEmpty && suggestions ? (
        <PromptSuggestions suggestions={suggestions} append={append} />
      ) : null}

      {!isEmpty ? (
        <ChatMessages>
          <MessageList messages={messages} />
        </ChatMessages>
      ) : null}
    </ChatContainer>
  );
}

export function ChatContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col h-full min-h-0 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ChatMessages({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-0 h-full overflow-hidden">{children}</div>
  );
}

export function ChatForm({
  children,
  className,
  isPending,
  handleSubmit,
}: {
  children: React.ReactNode;
  className?: string;
  isPending: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex-shrink-0 px-8 py-6 bg-background", className)}
    >
      <div className="max-w-3xl mx-auto">{children}</div>
    </form>
  );
}

export function PromptSuggestions({
  suggestions,
  append,
}: {
  suggestions: string[];
  append?: (message: Message) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          How can I help you today?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try one of these suggestions to get started
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 w-full max-w-md">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-left h-auto py-3 px-4 text-wrap"
            onClick={() =>
              append?.({
                id: Date.now().toString(),
                role: "user",
                content: suggestion,
              })
            }
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  stop?: () => void;
  isGenerating?: boolean;
  disabled?: boolean;
}

export function MessageInput({
  value,
  onChange,
  stop,
  isGenerating = false,
  disabled = false,
}: MessageInputProps) {
  return (
    <div className="bg-muted/50 dark:bg-muted/30 border border-border/50 rounded-lg focus-within:ring-2 focus-within:ring-primary/20">
      {/* Text input row */}
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        className="min-h-[60px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pb-1 pt-3"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) {
              const form = e.currentTarget.closest("form");
              form?.requestSubmit();
            }
          }
        }}
      />

      {/* Buttons row */}
      <div className="flex items-center justify-between px-3 pb-3">
        {/* Left side - Plus button */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-8 border border-border/50 hover:border-border/50"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>

        {/* Right side - Send/Stop button */}
        <div>
          {isGenerating ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={stop}
              disabled={!stop}
              className="h-8 px-3"
            >
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={disabled || !value.trim()}
              className="size-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ChevronUpIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
