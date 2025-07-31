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
  onSecondAIResponse?: () => void
}

export function useChatDemo({
  selectedWorkflow,
  workflowContent,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
  onSecondAIResponse,
}: UseChatDemoProps) {
  const [input, setInput] = useState("")
  
  // Use the existing demo flow hook
  const {
    gatheringSteps,
    simulatedInputValue,
    isSimulatingTyping,
    showUserMessage,
    showAIResponse,
    showSecondUserMessage,
    showSecondAIResponse,
  } = useDemoFlow({
    selectedWorkflow,
    workflowContent,
    currentStep,
    onUserMessageSent,
    onDataGatheringComplete,
    onSecondAIResponse,
  })

  // Convert demo flow states to messages array with AX-focused content
  const messages: Message[] = useMemo(() => {
    const messageArray: Message[] = []

    // User message (step 1)
    if (showUserMessage) {
      messageArray.push({
        id: "user-1",
        role: "user",
        content: "Optimize budget for my Valentine's Day t-shirt campaigns this week",
        timestamp: "just now",
      })
    }

    // AI response with strategic analysis and action items (step 2)
    if (showAIResponse && selectedWorkflow.status === "active" && showUserMessage) {
      const completedSteps = gatheringSteps.filter(step => step.status === "complete").length
      const totalSteps = gatheringSteps.length
      
      // Show loading skeleton while data gathering is in progress
      if (completedSteps < totalSteps) {
        messageArray.push({
          id: "ai-1",
          role: "assistant",
          content: "", // Empty content since we're showing skeleton
          timestamp: "1 min ago",
          isLoading: true,
        })
      } else {
        // Show actual analysis results once complete
        let aiContent = "### Top opportunity identified\n\n"
        
        aiContent += "**Scale Demand Gen Campaigns by $1,200**\n"
        aiContent += "* Current CPA: $58 vs Generic: $202\n"
        aiContent += "* Projected +21 conversions (≈ $57 per extra conversion)\n"
        aiContent += "* Charts confirm CPA stability ($58 ± $2.8) and 73% impression-share headroom\n"
        aiContent += "* Confidence: High (highest-intent audience targeting)\n\n"
        
        aiContent += "Do you need any more information to help you make a decision?"

        messageArray.push({
          id: "ai-1",
          role: "assistant",
          content: aiContent,
          timestamp: "1 min ago",
          isLoading: false,
        })

        // Add follow-up user message for generative UI demo (only when typing is done)
        if (showSecondUserMessage) {
          messageArray.push({
            id: "user-2",
            role: "user",
            content: "Show me impression share breakdown and your insight on it",
            timestamp: "30 sec ago",
          })
        }

        // Add follow-up AI response for generative UI
        if (showSecondAIResponse) {
          messageArray.push({
            id: "ai-2",
            role: "assistant",
            content: "Sure, check out the graph in the analytics dashboard.",
            timestamp: "just now",
            isLoading: false,
          })
        }
      }
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
    showSecondUserMessage,
    showSecondAIResponse,
    selectedWorkflow.status,
    workflowContent,
    gatheringSteps,
    currentStep,
  ])

  // Update input value based on simulation state
  useEffect(() => {
    if (isSimulatingTyping) {
      setInput(simulatedInputValue)
    } else {
      setInput("")
    }
  }, [isSimulatingTyping, simulatedInputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Don't allow manual input during simulation
    if (!isSimulatingTyping) {
      setInput(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is just a demo, so we don't actually submit anything
  }

  const isGenerating = currentStep === 2
  const isTyping = isSimulatingTyping
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