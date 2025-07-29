"use client";

import React from "react";
import { Workflow, WorkflowContent } from "@/types/workflow";
import { Chat, MessageInput } from "@/components/ui/chat";
import { useChatDemo } from "@/hooks/use-chat-demo";

interface ChatInterfaceProps {
  selectedWorkflow: Workflow;
  workflowContent: WorkflowContent;
  showDataPanel: boolean;
  currentStep: number;
  onUserMessageSent?: () => void;
  onDataGatheringComplete?: () => void;
}

export function ChatInterface({
  selectedWorkflow,
  workflowContent,
  showDataPanel,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
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
        suggestions={suggestions}
        className="flex-1 h-full"
      />

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 px-8 pb-6">
        <div className="max-w-3xl mx-auto">
          <MessageInput
            value={input}
            onChange={handleInputChange}
            isGenerating={isGenerating}
            disabled={isInputDisabled}
          />
        </div>
      </form>
    </div>
  );
}
