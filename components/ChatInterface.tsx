"use client";

import React from "react";
import { Workflow, WorkflowContent } from "@/types/workflow";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { ChatMessage } from "@/components/ui/ChatMessage";
import { DataGatheringSteps } from "@/components/ui/DataGatheringSteps";
import { useDemoFlow } from "@/hooks/useDemoFlow";

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
    gatheringSteps,
    simulatedInputValue,
    isSimulatingTyping,
    showUserMessage,
    showAIResponse,
    showFeedbackMessage,
    simulatedFeedbackValue,
    isSimulatingFeedback,
    feedbackSubmitted,
    feedbackProcessingSteps,
    showFeedbackProcessing,
    feedbackProcessingComplete,
  } = useDemoFlow({
    selectedWorkflow,
    workflowContent,
    currentStep,
    onUserMessageSent,
    onDataGatheringComplete,
    onFeedbackProcessingComplete,
  });

  const handleInputChange = () => {};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  // Determine which simulation value to show in input
  const getInputValue = () => {
    if (isSimulatingTyping) return simulatedInputValue;
    if (isSimulatingFeedback) return simulatedFeedbackValue;
    return "";
  };

  const isInputDisabled = isSimulatingTyping || isSimulatingFeedback;

  return (
    <div
      className={`${
        showDataPanel ? "flex-1" : "flex-1"
      } relative h-full border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-500`}
    >
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 p-3 border-b border-gray-100 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
          Conversation
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {selectedWorkflow.title} Assistant
        </p>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Simulated user message */}
        {showUserMessage && (
          <ChatMessage type="user" showIndicator>
            {workflowContent.userMessage}
          </ChatMessage>
        )}

        {/* AI Response with data gathering */}
        {showAIResponse &&
          selectedWorkflow.status === "active" &&
          showUserMessage && (
            <ChatMessage type="ai">
              <p className="mb-3">
                I&apos;ll gather data from your connected platforms and analyze
                optimization opportunities for your t-shirt campaigns.
              </p>
              <DataGatheringSteps
                steps={gatheringSteps}
                currentStep={currentStep}
              />
            </ChatMessage>
          )}

        {/* Human Feedback */}
        {showFeedbackMessage && selectedWorkflow.status === "active" && (
          <ChatMessage type="feedback" timestamp="30 sec ago" showIndicator>
            Great analysis! For Valentine&apos;s Day t-shirt campaigns, I&apos;d
            prefer focusing more on brand campaigns since they convert better
            for gift purchases.
          </ChatMessage>
        )}

        {/* AI Feedback Processing Response */}
        {showFeedbackProcessing && selectedWorkflow.status === "active" && (
          <ChatMessage type="ai">
            <p className="mb-3">
              I&apos;ll incorporate your Valentine&apos;s Day insights and
              adjust the campaign strategy to prioritize brand campaigns for
              gift purchases.
            </p>
            <DataGatheringSteps
              steps={feedbackProcessingSteps}
              currentStep={feedbackProcessingComplete ? 999 : 0}
            />
          </ChatMessage>
        )}

        {/* AI Final Response */}
        {feedbackProcessingComplete && selectedWorkflow.status === "active" && (
          <ChatMessage type="ai" timestamp="10 sec ago">
            Perfect! I&apos;ve recalculated the optimization with your
            Valentine&apos;s Day insight for t-shirt campaigns. The refined
            strategy prioritizes brand campaigns and adjusts for seasonal gift
            buying behavior.
          </ChatMessage>
        )}

        {/* Coming Soon Message for non-active workflows */}
        {selectedWorkflow.status !== "active" && (
          <div className="flex justify-start">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-lg rounded-bl-md px-3 py-2 max-w-xs">
              <p className="text-xs">{workflowContent.aiResponse}</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                Join our beta to get early access when this workflow is ready!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 p-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <PlaceholdersAndVanishInput
          placeholders={[]}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          value={getInputValue()}
          disabled={isInputDisabled}
        />
      </div>
    </div>
  );
}
