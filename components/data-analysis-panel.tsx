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
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      {/* Panel Header */}
      <div className="p-3 border-b border-white/40 dark:border-gray-600/40 flex-shrink-0">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
          {workflowContent.analysisTitle}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {workflowContent.analysisSubtitle}
          {showImprovedRecommendation &&
            selectedWorkflow.status === "active" && (
              <span className="ml-2 text-purple-600 dark:text-purple-400 font-medium">
                • Updated
              </span>
            )}
        </p>
      </div>

      {/* Analysis Content */}
      <div className="flex-1 p-3 space-y-4 overflow-y-auto min-h-0">
        {selectedWorkflow.status === "active" ? (
          <>
            {/* Data Sources */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-xs relative">
                Data Sources Analyzed
              </h5>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/60 dark:bg-blue-900/30 backdrop-blur-sm border border-white/40 dark:border-blue-700/40 rounded p-2 text-center">
                  <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                    <PlatformIcon
                      platform="meta"
                      variant="simple"
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Meta Ads
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Active
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded p-2 text-center">
                  <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                    <PlatformIcon
                      platform="google"
                      variant="simple"
                      size={20}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Google Ads
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Active
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded p-2 text-center">
                  <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                    <PlatformIcon
                      platform="shopify"
                      variant="simple"
                      size={20}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Shopify
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Synced
                  </p>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-xs relative">
                Key Insights
              </h5>
              <div className="space-y-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded p-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 dark:bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200">
                        Valentine&apos;s Day Opportunity
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        +40% increase in gift-related searches
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded p-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">₪</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                        CPA Performance Gap
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Brand: ₪216 vs Generic: ₪747
                      </p>
                    </div>
                  </div>
                </div>

                {/* New insight for refined recommendations */}
                {showImprovedRecommendation && (
                  <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded p-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-purple-800 dark:text-purple-200">
                          Gift Purchase Intent
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-300">
                          Brand campaigns: 3x higher gift conversion
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-xs">
                AI Recommendations
                {showImprovedRecommendation && (
                  <span className="ml-2 text-purple-600 dark:text-purple-400 font-medium text-xs">
                    • Refined
                  </span>
                )}
              </h5>
              <div
                className={`${
                  showImprovedRecommendation
                    ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-200 dark:border-purple-700"
                    : "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border-green-200 dark:border-green-700"
                } rounded p-3 border`}
              >
                <div className="flex items-start space-x-2">
                  <div
                    className={`w-5 h-5 ${
                      showImprovedRecommendation
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400"
                        : "bg-gradient-to-br from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
                    } rounded flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {showImprovedRecommendation ? "R" : "A"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h6 className="font-medium text-gray-900 dark:text-white mb-1 text-xs">
                      {showImprovedRecommendation
                        ? "Refined Budget Strategy"
                        : "Budget Reallocation"}
                    </h6>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          {showImprovedRecommendation
                            ? "Generic → Brand: $2,200"
                            : "Generic → Brand: $1,500"}
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {showImprovedRecommendation
                            ? "+31% ROAS"
                            : "+23% ROAS"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          {showImprovedRecommendation
                            ? "Brand Valentine Focus +40%"
                            : "Competitor +25%"}
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {showImprovedRecommendation ? "+23 conv" : "+15 conv"}
                        </span>
                      </div>
                      {showImprovedRecommendation && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Defensive bidding on Generic
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            -12% waste
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex space-x-1">
                        <button
                          className={`${
                            showImprovedRecommendation
                              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                              : "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                          } text-white px-2 py-1 rounded text-xs font-medium transition-colors`}
                        >
                          Apply
                        </button>
                        <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">
              {selectedWorkflow.title}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {selectedWorkflow.description}
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
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
