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
  onFeedbackProcessingComplete?: () => void;
}

export function useDemoFlow({
  selectedWorkflow,
  workflowContent,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
  onFeedbackProcessingComplete,
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
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [simulatedFeedbackValue, setSimulatedFeedbackValue] = useState("");
  const [isSimulatingFeedback, setIsSimulatingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackProcessingSteps, setFeedbackProcessingSteps] = useState<DataGatheringStep[]>([
    {
      platform: "Feedback Analysis",
      status: "pending",
      message: "Analyzing your Valentine's Day campaign preferences...",
      icon: "analysis",
    },
    {
      platform: "Strategy Adjustment",
      status: "pending", 
      message: "Adjusting brand vs generic campaign allocation...",
      icon: "insights",
    },
    {
      platform: "Seasonal Optimization",
      status: "pending",
      message: "Optimizing for gift-purchase behavior patterns...",
      icon: "meta",
    },
    {
      platform: "Budget Reallocation", 
      status: "pending",
      message: "Recalculating optimal budget distribution...",
      icon: "google",
    },
  ]);
  const [showFeedbackProcessing, setShowFeedbackProcessing] = useState(false);
  const [feedbackProcessingComplete, setFeedbackProcessingComplete] = useState(false);

  // Reset all states when demo restarts
  useEffect(() => {
    if (currentStep === 0) {
      setSimulatedInputValue("");
      setIsSimulatingTyping(false);
      setShowUserMessage(false);
      setShowAIResponse(false);
      setShowFeedbackMessage(false);
      setSimulatedFeedbackValue("");
      setIsSimulatingFeedback(false);
      setFeedbackSubmitted(false);
      setShowFeedbackProcessing(false);
      setFeedbackProcessingComplete(false);
      setFeedbackProcessingSteps((prev) =>
        prev.map((step) => ({ ...step, status: "pending" }))
      );
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
            setShowAIResponse(true);
            onUserMessageSent?.();
          }, 800);
        }
      };

      setTimeout(typeInInput, 1000);
    }
  }, [currentStep, selectedWorkflow.status, workflowContent.userMessage, onUserMessageSent]);

  // Feedback typing simulation effect
  useEffect(() => {
    if (currentStep >= 4 && selectedWorkflow.status === "active" && !showFeedbackMessage && !isSimulatingFeedback) {
      const feedbackMessage = "Great analysis! For Valentine's Day t-shirt campaigns, I'd prefer focusing more on brand campaigns since they convert better for gift purchases.";
      setIsSimulatingFeedback(true);
      let currentIndex = 0;

      const typeFeedback = () => {
        if (currentIndex < feedbackMessage.length) {
          setSimulatedFeedbackValue(feedbackMessage.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeFeedback, 50);
        } else {
          setTimeout(() => {
            setIsSimulatingFeedback(false);
            setShowFeedbackMessage(true);
            setSimulatedFeedbackValue("");
            // Mark feedback as submitted and start processing
            setTimeout(() => {
              setFeedbackSubmitted(true);
              setShowFeedbackProcessing(true);
            }, 1000);
          }, 800);
        }
      };

      setTimeout(typeFeedback, 500);
    }
  }, [currentStep, selectedWorkflow.status, showFeedbackMessage, isSimulatingFeedback]);

  // Feedback processing animation effect
  useEffect(() => {
    if (showFeedbackProcessing && selectedWorkflow.status === "active" && !feedbackProcessingComplete) {
      const animateSteps = async () => {
        for (let i = 0; i < feedbackProcessingSteps.length; i++) {
          setFeedbackProcessingSteps((prev) =>
            prev.map((step, index) =>
              index === i ? { ...step, status: "connecting" } : step
            )
          );

          await new Promise((resolve) => setTimeout(resolve, 500));

          setFeedbackProcessingSteps((prev) =>
            prev.map((step, index) =>
              index === i ? { ...step, status: "complete" } : step
            )
          );

          await new Promise((resolve) => setTimeout(resolve, 150));
        }

        setFeedbackProcessingComplete(true);
        onFeedbackProcessingComplete?.();
      };

      animateSteps();
    }
  }, [showFeedbackProcessing, selectedWorkflow.status, feedbackProcessingComplete]);

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
    showFeedbackMessage,
    simulatedFeedbackValue,
    isSimulatingFeedback,
    feedbackSubmitted,
    feedbackProcessingSteps,
    showFeedbackProcessing,
    feedbackProcessingComplete,
  };
} 