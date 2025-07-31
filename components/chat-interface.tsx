"use client";

import React from "react";
import { Workflow, WorkflowContent } from "@/types/workflow";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@/components/ui/ai-conversation";
import { AIMessage, AIMessageContent } from "@/components/ui/ai-message";
import { AIResponse } from "@/components/ui/ai-response";
import {
  AISources,
  AISourcesContent,
  AISourcesTrigger,
  AISource,
} from "@/components/ui/ai-sources";
import { Spinner } from "@/components/ui/spinner";
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
  AIInputWorkflowSelect,
  AIInputWorkflowSelectContent,
  AIInputWorkflowSelectItem,
  AIInputWorkflowSelectTrigger,
  AIInputWorkflowSelectValue,
} from "@/components/ui/ai-input";
import { PlusIcon, MicIcon } from "lucide-react";
import { useChatDemo } from "@/hooks/use-chat-demo";

interface ChatInterfaceProps {
  selectedWorkflow: Workflow;
  workflowContent: WorkflowContent;
  showDataPanel: boolean;
  currentStep: number;
  onUserMessageSent?: () => void;
  onDataGatheringComplete?: () => void;
  onSecondAIResponse?: () => void;
}

export function ChatInterface({
  selectedWorkflow,
  workflowContent,
  showDataPanel,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
  onSecondAIResponse,
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
    onSecondAIResponse,
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
      <AIConversation className="flex-1 h-full">
        <AIConversationContent>
          <div className="max-w-2xl mx-auto w-full">
            {messages.length === 0 && suggestions && suggestions.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Suggested questions:
                </p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => {
                      // This would trigger sending the suggestion as a message
                      // You can implement this functionality as needed
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div key={message.id}>
                <AIMessage
                  from={message.role === "user" ? "user" : "assistant"}
                  className={
                    index === 0 && message.role === "user" ? "mt-4" : ""
                  }
                >
                  <AIMessageContent>
                    <AIResponse>{message.content}</AIResponse>
                  </AIMessageContent>
                </AIMessage>
                {message.role === "assistant" && !message.isLoading && (
                  <div className="flex justify-end mb-2">
                    <AISources className="max-w-[300px]">
                      <AISourcesTrigger count={3} />
                      <AISourcesContent>
                        <AISource
                          href="https://docs.google.com/spreadsheets"
                          title="Campaign Performance Data"
                        />
                        <AISource
                          href="https://analytics.google.com"
                          title="Google Analytics Insights"
                        />
                        <AISource
                          href="https://ads.google.com"
                          title="Google Ads Dashboard"
                        />
                      </AISourcesContent>
                    </AISources>
                  </div>
                )}
              </div>
            ))}
            {/* Loading spinner for AI messages */}
            {messages.some(
              (message) => message.role === "assistant" && message.isLoading
            ) && (
              <div className="flex justify-start pl-3">
                <Spinner
                  variant="pinwheel"
                  size={16}
                  className="text-muted-foreground"
                />
              </div>
            )}
          </div>
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>

      {/* Input Form */}
      <div className="flex-shrink-0 px-8 pb-6">
        <div className="max-w-3xl mx-auto">
          <AIInput onSubmit={handleSubmit}>
            <AIInputTextarea
              value={input}
              onChange={handleInputChange}
              disabled={isInputDisabled}
              placeholder="Ask about your marketing data..."
            />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton>
                  <PlusIcon size={16} />
                </AIInputButton>
                <AIInputButton>
                  <MicIcon size={16} />
                </AIInputButton>
                <AIInputWorkflowSelect value="budget-optimization">
                  <AIInputWorkflowSelectTrigger>
                    <AIInputWorkflowSelectValue />
                  </AIInputWorkflowSelectTrigger>
                  <AIInputWorkflowSelectContent>
                    <AIInputWorkflowSelectItem value="budget-optimization">
                      Budget Optimization
                    </AIInputWorkflowSelectItem>
                  </AIInputWorkflowSelectContent>
                </AIInputWorkflowSelect>
              </AIInputTools>
              <AIInputSubmit
                disabled={isInputDisabled || !input.trim()}
                status={isGenerating ? "streaming" : "ready"}
              />
            </AIInputToolbar>
          </AIInput>
        </div>
      </div>
    </div>
  );
}
