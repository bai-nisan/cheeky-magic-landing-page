import React from "react";
import { PlatformIcon } from "@/components/ui/icons";
import { Workflow, WorkflowContent } from "@/types/workflow";

interface DataAnalysisPanelProps {
  selectedWorkflow: Workflow;
  workflowContent: WorkflowContent;
  showDataPanel: boolean;
  currentStep: number;
  showImprovedRecommendation: boolean;
}

export function DataAnalysisPanel({
  selectedWorkflow,
  workflowContent,
  showDataPanel,
  currentStep,
  showImprovedRecommendation,
}: DataAnalysisPanelProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative bg-background">
      {/* Analysis Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto min-h-0">
        {selectedWorkflow.status === "active" ? (
          <>
            {/* Decision Framework */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">
                Decision Framework
              </h5>
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Analysis Method:
                    </span>
                    <span className="text-foreground font-medium">
                      Marginal Cost Optimization
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Key Principle:
                    </span>
                    <span className="text-foreground">
                      &ldquo;Next dollar&rdquo; returns
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Budget Changes:
                    </span>
                    <span className="text-foreground">
                      Percentage-based (+25%, +50%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Context Factor:
                    </span>
                    <span className="text-primary font-medium">
                      Valentine&apos;s Day Intent
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Performance Hierarchy */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">
                Performance Hierarchy
              </h5>
              <div className="space-y-2">
                {/* Brand Campaigns */}
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Brand Campaigns
                      </span>
                    </div>
                    <span className="text-green-600 text-xs font-bold">
                      BEST ROI
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-foreground">₪216</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Impression Share:
                      </span>
                      <span className="text-orange-500">99.25% (maxed)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Purchase Intent:
                      </span>
                      <span className="text-green-500">
                        High (brand + product)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Competitor Campaigns */}
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Competitor Campaigns
                      </span>
                    </div>
                    <span className="text-yellow-600 text-xs font-bold">
                      STRATEGIC
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-foreground">₪627</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Impression Share:
                      </span>
                      <span className="text-blue-500">60.56% (scalable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purpose:</span>
                      <span className="text-yellow-500">
                        Defensive + acquisition
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generic Campaigns */}
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Generic Campaigns
                      </span>
                    </div>
                    <span className="text-red-600 text-xs font-bold">
                      REDUCE
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-foreground">₪747</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Impression Share:
                      </span>
                      <span className="text-blue-500">45.18% (poor ROI)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Marginal Return:
                      </span>
                      <span className="text-red-500">Worst performer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Context & Learning */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">
                {showImprovedRecommendation
                  ? "Context Learned"
                  : "Strategic Context"}
              </h5>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="space-y-3 text-xs">
                  {!showImprovedRecommendation ? (
                    <>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        <span className="text-muted-foreground">
                          Seasonal factor: Valentine&apos;s Day (+40% gift
                          searches)
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        <span className="text-muted-foreground">
                          Campaign architecture: 3-layer concentric model
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        <span className="text-muted-foreground">
                          Optimization rule: Percentage-based reallocation
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                        <span className="text-foreground">
                          <strong>Learned:</strong> Valentine&apos;s Day = gift
                          purchase priority
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                        <span className="text-foreground">
                          <strong>Saved:</strong> Brand campaigns perform 3x
                          better for gifts
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                        <span className="text-foreground">
                          <strong>Applied:</strong> Seasonal campaign strategy
                          profile
                        </span>
                      </div>
                      <div className="border-t border-border pt-2 mt-3">
                        <span className="text-primary font-medium">
                          Trust Level: Increased → Seasonal Auto-approval
                          Enabled
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendation Confidence & Risk */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">
                Confidence & Risk Assessment
              </h5>
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Overall Confidence:
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full">
                      <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      87%
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Quality:</span>
                    <span className="text-green-600">High (30-day trends)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Model Accuracy:
                    </span>
                    <span className="text-green-600">
                      94% (validated patterns)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="text-yellow-600">
                      Low-Medium (seasonal)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Expected Timeline:
                    </span>
                    <span className="text-foreground">
                      3-5 days to see impact
                    </span>
                  </div>
                </div>

                {showImprovedRecommendation && (
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-xs text-foreground">
                        <strong>Context Integration:</strong> Your feedback
                        improved accuracy by +12%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h5 className="font-medium text-foreground mb-2">
              {selectedWorkflow.title}
            </h5>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedWorkflow.description}
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-accent-foreground">
                This workflow is currently in development. Join our beta program
                for early access!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
