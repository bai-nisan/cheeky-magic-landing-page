import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Clock, TrendingUp } from "lucide-react";

interface ConversationEntry {
  id: string;
  title: string;
  timestamp: string;
  summary: string;
  isActive?: boolean;
}

interface ConversationHistoryProps {
  currentStep: number;
}

const demoConversations: ConversationEntry[] = [
  {
    id: "current",
    title: "Budget Optimization Review",
    timestamp: "Now",
    summary: "Analyzing Q4 campaign performance...",
    isActive: true,
  },
  {
    id: "conv-1",
    title: "Meta Ads Performance",
    timestamp: "2 hours ago",
    summary: "Reviewed ROAS across demographics",
  },
  {
    id: "conv-2",
    title: "Google Ads Analysis",
    timestamp: "Yesterday",
    summary: "Keyword performance deep dive",
  },
  {
    id: "conv-3",
    title: "Budget Reallocation",
    timestamp: "2 days ago",
    summary: "Shifted $5k from underperforming campaigns",
  },
  {
    id: "conv-4",
    title: "Creative Performance",
    timestamp: "1 week ago",
    summary: "A/B tested new ad creatives",
  },
];

export function ConversationHistory({ currentStep }: ConversationHistoryProps) {
  return (
    <div className="w-80 border-r border-white/40 dark:border-gray-600/40 flex flex-col bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/40 dark:border-gray-600/40">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
            Conversation History
          </h2>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Recent optimization sessions
        </p>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {demoConversations.map((conversation, index) => (
            <div
              key={conversation.id}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-all duration-200",
                "hover:bg-white/80 dark:hover:bg-gray-700/80",
                "group relative",
                conversation.isActive && currentStep > 0
                  ? "bg-purple-50/80 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700"
                  : "hover:shadow-sm",
                "translate-y-[-1rem] animate-fade-in opacity-0",
                `[--animation-delay:${1100 + index * 100}ms]`
              )}
            >
              {/* Active indicator */}
              {conversation.isActive && currentStep > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r" />
              )}

              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate flex-1">
                  {conversation.title}
                </h3>
                {conversation.isActive && currentStep > 0 && (
                  <TrendingUp className="w-3 h-3 text-purple-500 ml-2 flex-shrink-0" />
                )}
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {conversation.summary}
              </p>

              <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {conversation.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/40 dark:border-gray-600/40">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {demoConversations.length} conversations
        </div>
      </div>
    </div>
  );
}
