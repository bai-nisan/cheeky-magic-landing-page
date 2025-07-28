"use client";

import React from "react";
import { Workflow, WorkflowContent } from "@/types/workflow";
import { Chat } from "@/components/ui/chat";
import { useChatDemo } from "@/hooks/use-chat-demo";

interface ChatInterfaceProps {
  selectedWorkflow: Workflow;
  workflowContent: WorkflowContent;
  showDataPanel: boolean;
  currentStep: number;
  showFeedbackStage: boolean;
  showImprovedRecommendation: boolean;
  onUserMessageSent?: () => void;
  onDataGatheringComplete?: () => void;
  onFeedbackProcessingComplete?: () => void;
}

export function ChatInterface({
  selectedWorkflow,
  workflowContent,
  showDataPanel,
  currentStep,
  showFeedbackStage,
  showImprovedRecommendation,
  onUserMessageSent,
  onDataGatheringComplete,
  onFeedbackProcessingComplete,
}: ChatInterfaceProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isGenerating,
    isInputDisabled,
  } = useChatDemo({
    selectedWorkflow,
    workflowContent,
    currentStep,
    onUserMessageSent,
    onDataGatheringComplete,
    onFeedbackProcessingComplete,
  });

  const suggestions =
    selectedWorkflow.status === "active"
      ? []
      : [
          "Analyze my Meta Ads performance",
          "Optimize Google Ads budget allocation",
          "Review cross-platform campaign ROI",
        ];

  return (
    <div
      className={`${
        showDataPanel ? "flex-1" : "flex-1"
      } relative h-full flex flex-col overflow-hidden transition-all duration-500`}
    >
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
          Conversation
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {selectedWorkflow.title} Assistant
        </p>
      </div>

      {/* Chat Interface */}
      <Chat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isGenerating}
        suggestions={suggestions}
        className="flex-1"
      />
    </div>
  );
}
