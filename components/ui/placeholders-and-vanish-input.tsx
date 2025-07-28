"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
  disabled?: boolean;
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  value = "",
  disabled = false,
}: PlaceholdersAndVanishInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholders[0] || "Type your message..."}
          className={cn(
            "w-full min-h-12 max-h-32 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-900 dark:text-white"
          )}
          rows={1}
        />
        {value && !disabled && (
          <button
            type="submit"
            className="absolute right-2 bottom-2 px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            Send
          </button>
        )}
      </div>
    </form>
  );
}
