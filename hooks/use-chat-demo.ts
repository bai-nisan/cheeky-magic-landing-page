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
}

export function useChatDemo({
  selectedWorkflow,
  workflowContent,
  currentStep,
  onUserMessageSent,
  onDataGatheringComplete,
}: UseChatDemoProps) {
  const [input, setInput] = useState("")
  
  // Use the existing demo flow hook
  const {
    gatheringSteps,
    simulatedInputValue,
    isSimulatingTyping,
    showUserMessage,
    showAIResponse,
  } = useDemoFlow({
    selectedWorkflow,
    workflowContent,
    currentStep,
    onUserMessageSent,
    onDataGatheringComplete,
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
        let aiContent = "**Analysis Complete** - I've identified 3 high-impact optimizations for your Valentine's Day campaigns:\n\n"
        
        aiContent += "**Priority Action Items:**\n\n"
        aiContent += "**1. Scale Demand Gen Campaigns (+$1,200)**\n"
        aiContent += "   • Current Demand Gen CPA: $58 vs Generic: $202\n"
        aiContent += "   • Expected impact: +21 conversions, $1,200 investment\n"
        aiContent += "   • Confidence: High (highest intent audience targeting)\n\n"
        
        aiContent += "**2. Boost Competitor Defense (+$500)**\n"
        aiContent += "   • Current Competitor CPA: $169 at 60% impression share\n"
        aiContent += "   • Reason: Block H&M/Zara from capturing searchers\n"
        aiContent += "   • Confidence: High (strategic defensive value)\n\n"
        
        aiContent += "**3. Maintain Pure Brand (Defensive Focus)**\n"
        aiContent += "   • Current Pure Brand CPA: $287 (defensive only)\n"
        aiContent += "   • Purpose: Prevent competitors, not optimize conversions\n"
        aiContent += "   • Confidence: High (expert-validated strategy)\n\n"
        
        aiContent += "**Expected Weekly Impact:**\n"
        aiContent += "• +21 conversions from Demand Gen scaling\n"
        aiContent += "• Enhanced competitor blocking from defense boost\n"
        aiContent += "• 15% improvement in overall ROAS\n\n"
        aiContent += "**Ready to implement?** I can make these changes automatically or walk you through each step."

        messageArray.push({
          id: "ai-1",
          role: "assistant",
          content: aiContent,
          timestamp: "1 min ago",
          isLoading: false,
        })
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