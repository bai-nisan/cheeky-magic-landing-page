// Workflow interface
export interface Workflow {
  id: number;
  title: string;
  description: string;
  status: "active" | "available" | "coming-soon";
}

// Top 10 Most Time-Consuming Marketing Workflows
export const workflows: Workflow[] = [
  {
    id: 1,
    title: "Budget Optimization",
    description: "Cross-platform budget allocation and ROAS optimization",
    status: "active",
  },
  {
    id: 2,
    title: "Performance Analysis",
    description: "Campaign performance reporting and attribution modeling",
    status: "available",
  },
  {
    id: 3,
    title: "Audience Management",
    description: "Customer segmentation and lookalike creation",
    status: "available",
  },
  {
    id: 4,
    title: "Creative Optimization",
    description: "A/B testing and creative fatigue detection",
    status: "available",
  },
  {
    id: 5,
    title: "Cross-Channel Coordination",
    description: "Message consistency and timing optimization",
    status: "available",
  },
  {
    id: 6,
    title: "Competitive Analysis",
    description: "Automated competitor tracking and pricing analysis",
    status: "coming-soon",
  },
  {
    id: 7,
    title: "Product Feed Optimization",
    description: "Shopping feed quality and SEO optimization",
    status: "coming-soon",
  },
  {
    id: 8,
    title: "Email Marketing",
    description: "Behavioral triggers and lifecycle campaigns",
    status: "coming-soon",
  },
  {
    id: 9,
    title: "Attribution Analysis",
    description: "Customer journey mapping and multi-touch analysis",
    status: "coming-soon",
  },
  {
    id: 10,
    title: "Customer Lifecycle",
    description: "Onboarding, retention, and churn prediction",
    status: "coming-soon",
  },
];

// Workflow content helper
export interface WorkflowContent {
  userMessage: string;
  aiResponse: string;
  analysisTitle: string;
  analysisSubtitle: string;
}

export const getWorkflowContent = (workflow: Workflow): WorkflowContent => {
  // Only Budget Optimization has full demo content
  if (workflow.id === 1) {
    return {
      userMessage: "Optimize budget for my t-shirt campaigns this week",
      aiResponse:
        "Gathering relevant data from your platforms and analyzing market conditions...",
      analysisTitle: "Campaign Analysis",
      analysisSubtitle: "T-Shirt Campaign Optimization",
    };
  }

  // Other workflows show coming soon content
  return {
    userMessage: `Help me with ${workflow.title.toLowerCase()}`,
    aiResponse: `${workflow.title} workflow is coming soon! We're building this capability to help automate your most time-consuming marketing tasks.`,
    analysisTitle: workflow.title,
    analysisSubtitle: "Workflow in Development",
  };
}; 