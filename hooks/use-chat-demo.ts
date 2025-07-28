"use client"

import { useState, useEffect, useMemo } from "react"
import { Message } from "@/components/ui/chat"
import { useDemoFlow } from "./use-demo-flow"
import { Workflow, WorkflowContent } from "@/types/workflow"

interface UseChatDemoProps {
  selectedWorkflow: Workflow
  workflowContent: WorkflowContent
  currentStep: number
  onUserMessageSent?: () => void
  onDataGatheringComplete?: () => void
  onFeedbackProcessingComplete?: () => void
}

export function useChatDemo({
  selectedWorkflow,
  workflowContent,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
  onFeedbackProcessingComplete,
}: UseChatDemoProps) {
  const [input, setInput] = useState("")
  
  // Use the existing demo flow hook
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
  })

  // Convert demo flow states to messages array
  const messages: Message[] = useMemo(() => {
    const messageArray: Message[] = []

    // User message (step 1)
    if (showUserMessage) {
      messageArray.push({
        id: "user-1",
        role: "user",
        content: workflowContent.userMessage,
        timestamp: "just now",
      })
    }

    // AI response with data gathering (step 2)
    if (showAIResponse && selectedWorkflow.status === "active" && showUserMessage) {
      let aiContent = "I'll gather data from your connected platforms and analyze optimization opportunities for your t-shirt campaigns.\n\n"
      
      // Add data gathering steps
      gatheringSteps.forEach((step) => {
        const statusIcon = step.status === "complete" ? "✅" : step.status === "connecting" ? "⏳" : "⏸️"
        aiContent += `${statusIcon} ${step.platform}: ${step.message}\n`
      })

      messageArray.push({
        id: "ai-1",
        role: "assistant",
        content: aiContent,
        timestamp: "1 min ago",
      })
    }

    // Human feedback message (step 4)
    if (showFeedbackMessage && selectedWorkflow.status === "active") {
      messageArray.push({
        id: "user-2", 
        role: "user",
        content: "Great analysis! For Valentine's Day t-shirt campaigns, I'd prefer focusing more on brand campaigns since they convert better for gift purchases.",
        timestamp: "30 sec ago",
      })
    }

    // AI feedback processing response (step 4+)
    if (showFeedbackProcessing && selectedWorkflow.status === "active") {
      let feedbackContent = "I'll incorporate your Valentine's Day insights and adjust the campaign strategy to prioritize brand campaigns for gift purchases.\n\n"
      
      // Add feedback processing steps
      feedbackProcessingSteps.forEach((step) => {
        const statusIcon = step.status === "complete" ? "✅" : step.status === "connecting" ? "⏳" : "⏸️"
        feedbackContent += `${statusIcon} ${step.platform}: ${step.message}\n`
      })

      messageArray.push({
        id: "ai-2",
        role: "assistant", 
        content: feedbackContent,
        timestamp: "20 sec ago",
      })
    }

    // AI final response (step 5)
    if (feedbackProcessingComplete && selectedWorkflow.status === "active") {
      messageArray.push({
        id: "ai-3",
        role: "assistant",
        content: "Perfect! I've recalculated the optimization with your Valentine's Day insight for t-shirt campaigns. The refined strategy prioritizes brand campaigns and adjusts for seasonal gift buying behavior.",
        timestamp: "10 sec ago",
      })
    }

    // Coming soon message for non-active workflows
    if (selectedWorkflow.status !== "active" && currentStep > 0) {
      messageArray.push({
        id: "system-1",
        role: "system",
        content: `${workflowContent.aiResponse}\n\nJoin our beta to get early access when this workflow is ready!`,
      })
    }

    return messageArray
  }, [
    showUserMessage,
    showAIResponse,
    showFeedbackMessage,
    showFeedbackProcessing,
    feedbackProcessingComplete,
    selectedWorkflow.status,
    workflowContent,
    gatheringSteps,
    feedbackProcessingSteps,
    currentStep,
  ])

  // Update input value based on simulation state
  useEffect(() => {
    if (isSimulatingTyping) {
      setInput(simulatedInputValue)
    } else if (isSimulatingFeedback) {
      setInput(simulatedFeedbackValue)
    } else {
      setInput("")
    }
  }, [isSimulatingTyping, simulatedInputValue, isSimulatingFeedback, simulatedFeedbackValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Don't allow manual input during simulation
    if (!isSimulatingTyping && !isSimulatingFeedback) {
      setInput(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is just a demo, so we don't actually submit anything
  }

  const isGenerating = currentStep === 2 || showFeedbackProcessing
  const isTyping = isSimulatingTyping || isSimulatingFeedback
  const isInputDisabled = isTyping

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isGenerating,
    isTyping,
    isInputDisabled,
  }
} 