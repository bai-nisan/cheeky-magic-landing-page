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
            {/* Intelligence Sources & Decision Framework */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Intelligence Sources */}
              <div>
                <h5 className="font-medium text-foreground mb-3 text-sm">
                  Intelligence Sources
                </h5>
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">
                        Google Ads API
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">
                        Market Intel
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">
                        Campaign Analysis
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-primary">
                        {showImprovedRecommendation
                          ? "6 weeks learned"
                          : "Learning..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Framework */}
              <div>
                <h5 className="font-medium text-foreground mb-3 text-sm">
                  Decision Framework
                </h5>
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div className="text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Method:</span>
                      <span className="text-foreground font-medium">
                        Marginal Cost Optimization
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Principle:</span>
                      <span className="text-foreground">
                        &ldquo;Next dollar&rdquo; returns
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Context:</span>
                      <span className="text-primary font-medium">
                        Valentine&apos;s Apparel Gifts
                      </span>
                    </div>
                    {showImprovedRecommendation && (
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Trust Level:
                          </span>
                          <span className="text-green-600 font-medium">
                            Auto-approval enabled
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Opportunities */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">
                Key Opportunities
              </h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      High Impact
                    </span>
                    <span className="text-green-600 text-xs font-bold">
                      +21 CONV
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Scale Demand Gen (+$1,200)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      Strategic Defense
                    </span>
                    <span className="text-blue-600 text-xs font-bold">
                      $500
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Block H&M/Zara searches
                  </p>
                </div>

                {showImprovedRecommendation && (
                  <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-3 lg:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        Expert Strategy
                      </span>
                      <span className="text-purple-600 text-xs font-bold">
                        DEFENSIVE FOCUS
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      &ldquo;Pure brand: just prevent competitors&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Performance (Simplified) */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">
                Performance Ranking
              </h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Demand Gen
                      </span>
                    </div>
                    <span className="text-green-600 text-xs font-bold">
                      BEST
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-green-600 font-bold">$58</span>
                    </div>
                    <div className="text-muted-foreground">Highest Intent</div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Brand+Product
                      </span>
                    </div>
                    <span className="text-blue-600 text-xs font-bold">
                      HIGH
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-blue-600 font-bold">$143</span>
                    </div>
                    <div className="text-orange-500">99.25% maxed</div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Competitors
                      </span>
                    </div>
                    <span className="text-yellow-600 text-xs font-bold">
                      STRATEGIC
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-yellow-600 font-bold">$169</span>
                    </div>
                    <div className="text-blue-500">60% scalable</div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Generic
                      </span>
                    </div>
                    <span className="text-orange-600 text-xs font-bold">
                      DISCOVERY
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPA:</span>
                      <span className="text-orange-600 font-bold">$202</span>
                    </div>
                    <div className="text-muted-foreground">Discovery</div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-3 lg:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-foreground">
                        Pure Brand
                      </span>
                    </div>
                    <span className="text-red-600 text-xs font-bold">
                      DEFENSIVE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPA:</span>
                        <span className="text-red-600 font-bold">$287</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-red-500">
                        Defensive only - prevent competitors
                      </div>
                    </div>
                  </div>
                  {showImprovedRecommendation && (
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-primary text-xs">
                          Purchase intent hierarchy validated: performance
                          matches prediction exactly
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Strategic Context & Confidence/Risk */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strategic Context */}
              <div>
                <h5 className="font-medium text-foreground mb-3 text-sm">
                  {showImprovedRecommendation
                    ? "Learned Strategy"
                    : "Strategic Context"}
                </h5>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="space-y-2 text-xs">
                    {!showImprovedRecommendation ? (
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-muted-foreground">
                            3-layer concentric model: Generic → Competitors →
                            Brand+Product
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-muted-foreground">
                            Valentine's Day: +40% apparel gift searches
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-muted-foreground">
                            Defensive strategy: Prevent competitors, not
                            optimize conversions
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-foreground">
                              <strong>Learned:</strong> Valentine's = apparel
                              gift priority
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-foreground">
                              <strong>Validated:</strong> Intent hierarchy
                              drives performance
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-foreground">
                            <strong>Expert:</strong> &ldquo;Focus on defensive
                            bidding&rdquo;
                          </span>
                        </div>
                        <div className="border-t border-border pt-3 mt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-medium">
                              Expert-Level Partnership
                            </span>
                            <span className="text-green-600">
                              Auto-approval enabled
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Confidence & Risk */}
              <div>
                <h5 className="font-medium text-foreground mb-3 text-sm">
                  Confidence & Risk
                </h5>
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Decision Confidence:
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            showImprovedRecommendation
                              ? "w-15 bg-green-500"
                              : "w-14 bg-blue-500"
                          }`}
                        ></div>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          showImprovedRecommendation
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {showImprovedRecommendation ? "94%" : "87%"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">
                        Risk Level:
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-600">
                          Medium (seasonal timing)
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">
                        Data Quality:
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600">
                          High (30-day trends)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Expected Impact:
                      </span>
                      <span className="text-foreground">3-5 days</span>
                    </div>
                    {showImprovedRecommendation && (
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-muted-foreground">
                          Your Input Value:
                        </span>
                        <span className="text-primary">+7% accuracy</span>
                      </div>
                    )}
                  </div>
                </div>
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
