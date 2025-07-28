"use client";

import React, { useState, useEffect } from "react";
import { workflows, getWorkflowContent } from "@/types/workflow";
import { ConversationHistory } from "@/components/conversation-history";
import { ChatInterface } from "@/components/chat-interface";
import { DataAnalysisPanel } from "@/components/data-analysis-panel";
import { DashboardHeader } from "@/components/dashboard-header";
import { cn } from "@/lib/utils";

export function ChatDemo() {
  // Use the budget optimization workflow (first one) as the fixed workflow
  const selectedWorkflow = workflows[0];
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedbackStage, setShowFeedbackStage] = useState(false);
  const [showImprovedRecommendation, setShowImprovedRecommendation] =
    useState(false);
  const [feedbackProcessingComplete, setFeedbackProcessingComplete] =
    useState(false);

  // Demo flow: 0 = initial, 1 = user typing, 2 = ai responding/gathering data, 3 = recommendations shown, 4 = feedback, 5 = improved recommendation
  useEffect(() => {
    // Auto-start demo after page load
    const timer = setTimeout(() => {
      setCurrentStep(1); // Start typing simulation
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle progression from ChatInterface events
  const handleUserMessageSent = () => {
    setCurrentStep(2); // AI starts responding
  };

  const handleDataGatheringComplete = () => {
    setShowDataPanel(true);
    setCurrentStep(3); // Show recommendations

    // Show feedback stage after showing recommendations
    setTimeout(() => {
      setCurrentStep(4);
      setShowFeedbackStage(true);

      // Show improved recommendation after feedback
      setTimeout(() => {
        setCurrentStep(5);
        setShowImprovedRecommendation(true);
      }, 4000);
    }, 4000);
  };

  const handleFeedbackProcessingComplete = () => {
    setCurrentStep(5);
    setShowImprovedRecommendation(true);
    setFeedbackProcessingComplete(true);
  };

  const restartDemo = () => {
    setCurrentStep(0);
    setShowDataPanel(false);
    setShowFeedbackStage(false);
    setShowImprovedRecommendation(false);
    setFeedbackProcessingComplete(false);

    setTimeout(() => {
      setCurrentStep(1); // Start typing simulation
    }, 1000);
  };

  const workflowContent = getWorkflowContent(selectedWorkflow);

  return (
    <div
      className="w-full h-full"
      role="application"
      aria-label="Cheeky AI Marketing Dashboard Demo"
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Dashboard Interface */}
      <div
        className={cn(
          "w-full h-full flex flex-col overflow-hidden",
          "bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm",
          "shadow-xl border border-white/30 dark:border-gray-700/40",
          "rounded-[inherit] relative",
          "animate-fade-in opacity-0 [--animation-delay:200ms]"
        )}
      >
        {/* Subtle gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none rounded-[inherit]",
            "bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30",
            "dark:from-purple-900/10 dark:via-transparent dark:to-blue-900/10"
          )}
          aria-hidden="true"
        />

        {/* Dashboard Header */}
        <DashboardHeader
          currentStep={currentStep}
          onRestartDemo={restartDemo}
        />

        {/* Dashboard Content - Three Panel Layout */}
        <main
          id="main-content"
          role="main"
          aria-label="Dashboard main content"
          className={cn(
            "relative flex flex-1 min-h-0",
            "animate-fade-up opacity-0 [--animation-delay:600ms]"
          )}
        >
          {/* Left Panel - Conversation History */}
          <aside
            role="navigation"
            aria-label="Conversation history"
            className={cn(
              "hidden md:block",
              "translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]"
            )}
          >
            <ConversationHistory currentStep={currentStep} />
          </aside>

          {/* Middle Panel - Chat Interface */}
          <section
            role="region"
            aria-label="Chat interface"
            className={cn(
              "flex-1 min-w-0",
              "translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1100ms]"
            )}
          >
            <ChatInterface
              selectedWorkflow={selectedWorkflow}
              workflowContent={workflowContent}
              showDataPanel={showDataPanel}
              currentStep={currentStep}
              showFeedbackStage={showFeedbackStage}
              showImprovedRecommendation={showImprovedRecommendation}
              onUserMessageSent={handleUserMessageSent}
              onDataGatheringComplete={handleDataGatheringComplete}
              onFeedbackProcessingComplete={handleFeedbackProcessingComplete}
            />
          </section>

          {/* Right Panel - Data Analysis Panel */}
          <aside
            role="complementary"
            aria-label="Data analysis panel"
            className={cn(
              "hidden lg:block",
              "translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]"
            )}
          >
            <DataAnalysisPanel
              selectedWorkflow={selectedWorkflow}
              workflowContent={workflowContent}
              showDataPanel={showDataPanel}
              currentStep={currentStep}
              showImprovedRecommendation={feedbackProcessingComplete}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}
