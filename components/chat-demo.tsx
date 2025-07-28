"use client";
import React, { useState, useEffect } from "react";
import { Workflow, workflows, getWorkflowContent } from "@/types/workflow";
import { WorkflowSidebar } from "@/components/workflow-sidebar";
import { ChatInterface } from "@/components/chat-interface";
import { DataAnalysisPanel } from "@/components/data-analysis-panel";

interface ChatDemoProps {
  contained?: boolean;
}

export function ChatDemo({ contained = false }: ChatDemoProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
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

  const handleWorkflowSelect = (workflow: Workflow) => {
    if (workflow.status === "active") {
      setSelectedWorkflow(workflow);
      // Reset demo when switching workflows
      restartDemo();
    }
  };

  const workflowContent = getWorkflowContent(selectedWorkflow);

  return (
    <div
      className={contained ? "w-full h-full" : "w-full max-w-6xl mx-auto px-4"}
    >
      {/* Dashboard Interface - Updated with glass morphism styling */}
      <div
        className={`w-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm shadow-xl border border-white/30 dark:border-gray-700/40 flex flex-col overflow-hidden relative ${
          contained ? "h-full rounded-[inherit]" : "h-[700px] rounded-2xl"
        }`}
      >
        {/* Subtle gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 dark:from-purple-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none ${
            contained ? "rounded-[inherit]" : "rounded-2xl"
          }`}
        />

        {/* Dashboard Header - Updated with modern styling */}
        <div className="relative flex-shrink-0 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-700/60 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {selectedWorkflow.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  FashionCo - Marketing Automation
                </p>
              </div>
            </div>
            <button
              onClick={restartDemo}
              className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 text-gray-900 dark:text-white border border-purple-200 dark:border-purple-700 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg"
            >
              {currentStep === 0 ? "Start Demo" : "Replay Demo"}
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="relative flex flex-1 min-h-0">
          {/* Left Sidebar - Workflows */}
          <WorkflowSidebar
            selectedWorkflow={selectedWorkflow}
            onWorkflowSelect={handleWorkflowSelect}
          />

          {/* Middle - Chat Interface */}
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

          {/* Right Side - Data Analysis Panel */}
          <DataAnalysisPanel
            selectedWorkflow={selectedWorkflow}
            workflowContent={workflowContent}
            showDataPanel={showDataPanel}
            currentStep={currentStep}
            showImprovedRecommendation={feedbackProcessingComplete}
          />
        </div>
      </div>
    </div>
  );
}
