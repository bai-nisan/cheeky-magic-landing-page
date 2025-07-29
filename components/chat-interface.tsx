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
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Chat Interface */}
      <Chat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isGenerating}
        suggestions={suggestions}
        className="flex-1 h-full"
      />
    </div>
  );
}
