"use client";

import React, { useState, useEffect } from "react";
import { workflows, getWorkflowContent } from "@/types/workflow";
import { ChatInterface } from "@/components/chat-interface";
import { DataAnalysisPanel } from "@/components/data-analysis-panel";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { BarChart3, PanelRightClose } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom header component that handles collapsed state
function AnalyticsSidebarHeader() {
  const { isCollapsed } = useSidebar();

  return (
    <SidebarHeader className="bg-background border-l border-b px-4 sm:px-6 py-3 mt-0">
      <SidebarTrigger>
        <PanelRightClose className="h-4 w-4" />
      </SidebarTrigger>
      {!isCollapsed && (
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="font-semibold text-card-foreground">Analytics</span>
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
      )}
    </SidebarHeader>
  );
}

export function ChatDemo() {
  // Use the budget optimization workflow (first one) as the fixed workflow
  const selectedWorkflow = workflows[0];
  const [showDataPanel, setShowDataPanel] = useState(true); // Always show for constant size
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedbackStage, setShowFeedbackStage] = useState(false);
  const [showImprovedRecommendation, setShowImprovedRecommendation] =
    useState(false);
  const [feedbackProcessingComplete, setFeedbackProcessingComplete] =
    useState(false);

  // New state to track if we've received the first AI response
  const [hasReceivedFirstResponse, setHasReceivedFirstResponse] =
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
    // showDataPanel is now always true for constant size
    setCurrentStep(3); // Show recommendations

    // Mark that we've received the first AI response after a short delay
    setTimeout(() => {
      setHasReceivedFirstResponse(true);
    }, 1500);

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
    // showDataPanel stays true for constant size
    setShowFeedbackStage(false);
    setShowImprovedRecommendation(false);
    setFeedbackProcessingComplete(false);
    // Reset first response state for demo restart
    setHasReceivedFirstResponse(false);

    setTimeout(() => {
      setCurrentStep(1); // Start typing simulation
    }, 1000);
  };

  const workflowContent = getWorkflowContent(selectedWorkflow);

  return (
    <div
      className="w-full h-[900px]"
      role="application"
      aria-label="FashionCo Marketing Dashboard Demo"
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Dashboard Interface */}
      <div
        className={cn(
          "w-full h-full flex flex-col overflow-hidden",
          "bg-background",
          "shadow-none border-0",
          "rounded-[inherit] relative"
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

        {/* Dashboard Content - Two Panel Layout */}
        <main
          id="main-content"
          role="main"
          aria-label="Dashboard main content"
          className={cn(
            "relative flex flex-1 min-h-0 overflow-hidden",
            "animate-fade-up opacity-0 [--animation-delay:600ms]"
          )}
        >
          {/* Center Panel - Chat Interface */}
          <section
            role="region"
            aria-label="Chat interface"
            className={cn(
              "flex-1 min-w-0 flex flex-col overflow-hidden",
              "translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]"
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

          {/* Right Sidebar - Analytics Panel */}
          <Sidebar
            side="right"
            width="400px"
            collapsible={true}
            defaultCollapsed={!hasReceivedFirstResponse}
            className={cn(
              "hidden lg:flex z-10",
              "border-l border-border",
              "bg-background",
              "translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1100ms]"
            )}
          >
            <AnalyticsSidebarHeader />
            <SidebarContent className="p-0">
              <DataAnalysisPanel
                selectedWorkflow={selectedWorkflow}
                workflowContent={workflowContent}
                showDataPanel={showDataPanel}
                currentStep={currentStep}
                showImprovedRecommendation={feedbackProcessingComplete}
              />
            </SidebarContent>
          </Sidebar>
        </main>
      </div>
    </div>
  );
}
