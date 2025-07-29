"use client";

import { useState, useEffect } from "react";
import { Workflow, WorkflowContent } from "@/types/workflow";

interface DataGatheringStep {
  platform: string;
  status: "pending" | "connecting" | "complete";
  message: string;
  icon: "meta" | "google" | "shopify" | "analysis" | "insights";
}

interface UseDemoFlowProps {
  selectedWorkflow: Workflow;
  workflowContent: WorkflowContent;
  currentStep: number;
  onUserMessageSent?: () => void;
  onDataGatheringComplete?: () => void;
}

export function useDemoFlow({
  selectedWorkflow,
  workflowContent,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
}: UseDemoFlowProps) {
  const [gatheringSteps, setGatheringSteps] = useState<DataGatheringStep[]>([
    {
      platform: "Meta Ads",
      status: "pending",
      message: "Connecting to Meta Ads API...",
      icon: "meta",
    },
    {
      platform: "Google Ads",
      status: "pending",
      message: "Retrieving Google Ads performance data...",
      icon: "google",
    },
    {
      platform: "Shopify",
      status: "pending",
      message: "Syncing Shopify product and sales data...",
      icon: "shopify",
    },
    {
      platform: "Analysis",
      status: "pending",
      message: "Analyzing cross-platform campaign performance...",
      icon: "analysis",
    },
    {
      platform: "Insights",
      status: "pending",
      message: "Generating optimization recommendations...",
      icon: "insights",
    },
  ]);

  const [simulatedInputValue, setSimulatedInputValue] = useState("");
  const [isSimulatingTyping, setIsSimulatingTyping] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);

  // Reset all states when demo restarts
  useEffect(() => {
    if (currentStep === 0) {
      setSimulatedInputValue("");
      setIsSimulatingTyping(false);
      setShowUserMessage(false);
      setShowAIResponse(false);
      setGatheringSteps((prev) =>
        prev.map((step) => ({ ...step, status: "pending" }))
      );
    }
  }, [currentStep]);

  // Typing simulation effect
  useEffect(() => {
    if (currentStep === 1 && selectedWorkflow.status === "active") {
      const message = workflowContent.userMessage;
      setIsSimulatingTyping(true);
      let currentIndex = 0;

      const typeInInput = () => {
        if (currentIndex < message.length) {
          setSimulatedInputValue(message.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeInInput, 50);
        } else {
          setTimeout(() => {
            setIsSimulatingTyping(false);
            setShowUserMessage(true);
            onUserMessageSent?.();
            
            // Add delay before AI starts responding
            setTimeout(() => {
              setShowAIResponse(true);
            }, 1500); // 1.5 second delay between user message and AI response
          }, 800);
        }
      };

      setTimeout(typeInInput, 1000);
    }
  }, [currentStep, selectedWorkflow.status, workflowContent.userMessage, onUserMessageSent]);

  // Data gathering animation effect
  useEffect(() => {
    if (currentStep === 2 && showAIResponse && selectedWorkflow.status === "active") {
      const animateSteps = async () => {
        for (let i = 0; i < gatheringSteps.length; i++) {
          setGatheringSteps((prev) =>
            prev.map((step, index) =>
              index === i ? { ...step, status: "connecting" } : step
            )
          );

          await new Promise((resolve) => setTimeout(resolve, 600));

          setGatheringSteps((prev) =>
            prev.map((step, index) =>
              index === i ? { ...step, status: "complete" } : step
            )
          );

          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        onDataGatheringComplete?.();
      };

      animateSteps();
    }
  }, [currentStep, showAIResponse, selectedWorkflow.status, onDataGatheringComplete]);

  return {
    gatheringSteps,
    simulatedInputValue,
    isSimulatingTyping,
    showUserMessage,
    showAIResponse,
  };
} 