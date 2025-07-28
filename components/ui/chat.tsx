"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageList } from "./message-list";
import { TypingIndicator } from "./typing-indicator";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
}

interface ChatProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isGenerating?: boolean;
  stop?: () => void;
  suggestions?: string[];
  append?: (message: Message) => void;
  className?: string;
}

export function Chat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isGenerating = false,
  stop,
  suggestions,
  append,
  className,
}: ChatProps) {
  const isTyping = isGenerating;
  const isEmpty = messages.length === 0;

  return (
    <ChatContainer className={className}>
      {isEmpty && suggestions ? (
        <PromptSuggestions suggestions={suggestions} append={append} />
      ) : null}

      {!isEmpty ? (
        <ChatMessages>
          <MessageList messages={messages} isTyping={isTyping} />
        </ChatMessages>
      ) : null}

      <ChatForm
        className="mt-auto"
        isPending={isGenerating || isTyping}
        handleSubmit={handleSubmit}
      >
        <MessageInput
          value={input}
          onChange={handleInputChange}
          stop={stop}
          isGenerating={isGenerating}
        />
      </ChatForm>
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
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function ChatMessages({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
      {children}
    </div>
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
      className={cn(
        "flex-shrink-0 border-t border-gray-100 dark:border-gray-700 p-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
        className
      )}
    >
      {children}
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
    <div className="flex items-end space-x-2">
      <div className="flex-1">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Type your message..."
          className="min-h-[60px] resize-none"
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
      </div>
      <div className="flex space-x-1">
        {isGenerating ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={stop}
            disabled={!stop}
          >
            Stop
          </Button>
        ) : (
          <Button type="submit" size="sm" disabled={disabled || !value.trim()}>
            Send
          </Button>
        )}
      </div>
    </div>
  );
}
