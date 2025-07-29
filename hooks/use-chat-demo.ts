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
      let aiContent = "**Analysis Complete** - I've identified 3 high-impact optimizations for your Valentine's Day campaigns:\n\n"
      
      // Show strategic action items based on optimization conversation guidelines
      const completedSteps = gatheringSteps.filter(step => step.status === "complete").length
      const totalSteps = gatheringSteps.length
      
      if (completedSteps >= 3) {
        aiContent += "**🎯 Priority Action Items:**\n\n"
        aiContent += "**1. Reallocate Budget to Brand Campaigns (+25%)**\n"
        aiContent += "   • Current Brand CPA: ₪216 vs Generic: ₪747\n"
        aiContent += "   • Expected impact: +15 conversions, -₪312 weekly cost\n"
        aiContent += "   • Confidence: High (99.25% impression share)\n\n"
        
        aiContent += "**2. Reduce Generic Campaign Spend (-15%)**\n"
        aiContent += "   • Current performance: ₪747 CPA at 45% impression share\n"
        aiContent += "   • Reason: Poor marginal return on next dollar\n"
        aiContent += "   • Confidence: High (textbook reallocation)\n\n"
        
        aiContent += "**3. Maintain Competitor Campaigns (Current Level)**\n"
        aiContent += "   • Strategic value for Valentine's gift market\n"
        aiContent += "   • 60% impression share allows for future scaling\n"
        aiContent += "   • Confidence: Medium (seasonal context important)\n\n"
      }
      
      // Show data gathering progress for incomplete steps
      if (completedSteps < totalSteps) {
        aiContent += "**📊 Strategic Analysis Progress:**\n\n"
        gatheringSteps.forEach((step, index) => {
          const statusIcon = step.status === "complete" ? "✅" : step.status === "connecting" ? "⏳" : "⏸️"
          if (index < completedSteps + 1) {
            aiContent += `${statusIcon} ${step.platform}: Analyzing campaign performance hierarchy\n`
          }
        })
        aiContent += "\n"
      }
      
      if (completedSteps >= totalSteps) {
        aiContent += "**📈 Expected Weekly Impact:**\n"
        aiContent += "• +15 conversions from brand campaign focus\n"
        aiContent += "• -₪312 cost reduction from generic reallocation\n"
        aiContent += "• 12% improvement in overall ROAS\n\n"
        aiContent += "*Ready to implement? I can make these changes automatically or walk you through each step.*"
      }

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

    // AI feedback processing response with learning context (step 4+)
    if (showFeedbackProcessing && selectedWorkflow.status === "active") {
      let feedbackContent = "**Learning from your feedback** - Updating strategy for Valentine's gift purchase patterns...\n\n"
      
      const completedFeedbackSteps = feedbackProcessingSteps.filter(step => step.status === "complete").length
      const totalFeedbackSteps = feedbackProcessingSteps.length
      
      if (completedFeedbackSteps >= 2) {
        feedbackContent += "**🧠 Context Learned:**\n"
        feedbackContent += "• Valentine's Day = gift purchase behavior priority\n"
        feedbackContent += "• Brand campaigns perform better for gift buyers\n"
        feedbackContent += "• Seasonal campaign strategy now saved to your profile\n\n"
      }
      
      feedbackContent += "**🔄 Strategy Updates:**\n\n"
      feedbackProcessingSteps.forEach((step, index) => {
        const statusIcon = step.status === "complete" ? "✅" : step.status === "connecting" ? "⏳" : "⏸️"
        if (index < completedFeedbackSteps + 1) {
          feedbackContent += `${statusIcon} ${step.platform}: ${step.message}\n`
        }
      })

      messageArray.push({
        id: "ai-2",
        role: "assistant", 
        content: feedbackContent,
        timestamp: "20 sec ago",
      })
    }

    // AI final response showing relationship building (step 5)
    if (feedbackProcessingComplete && selectedWorkflow.status === "active") {
      messageArray.push({
        id: "ai-3",
        role: "assistant",
        content: "**Strategy Updated** ✅\n\n**New Allocation:**\n• Brand campaigns: +35% (was +25%)\n• Generic campaigns: -25% (was -15%)\n• Competitor campaigns: Maintained\n\n**Context Saved:**\n*I'll remember your Valentine's Day gift campaign preferences for future seasonal optimizations.*\n\n**Trust Level:** Increased - You can now approve seasonal adjustments automatically.",
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