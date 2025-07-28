import React from "react";
import { cn } from "@/lib/utils";

interface ConversationEntry {
  id: string;
  title: string;
  isActive?: boolean;
}

interface ConversationHistoryProps {
  currentStep: number;
}

const demoConversations: ConversationEntry[] = [
  {
    id: "current",
    title: "Budget Optimization Review",
    isActive: true,
  },
  {
    id: "conv-1",
    title: "Meta Ads Performance",
  },
  {
    id: "conv-2",
    title: "Google Ads Analysis",
  },
  {
    id: "conv-3",
    title: "Budget Reallocation",
  },
  {
    id: "conv-4",
    title: "Creative Performance",
  },
  {
    id: "conv-5",
    title: "Audience Insights",
  },
  {
    id: "conv-6",
    title: "Campaign Launch",
  },
];

export function ConversationHistory({ currentStep }: ConversationHistoryProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Simple conversation list */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {demoConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm",
                conversation.isActive && currentStep > 0
                  ? "bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {conversation.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
