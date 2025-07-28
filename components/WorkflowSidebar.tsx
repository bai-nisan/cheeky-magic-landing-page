import React, { useState } from "react";
import { Workflow, workflows } from "@/types/workflow";
import { ChevronDown, ChevronUp } from "lucide-react";

interface WorkflowSidebarProps {
  selectedWorkflow: Workflow;
  onWorkflowSelect: (workflow: Workflow) => void;
}

export function WorkflowSidebar({
  selectedWorkflow,
  onWorkflowSelect,
}: WorkflowSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="w-80 border-r border-white/40 dark:border-gray-600/40 flex flex-col bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
      <div className="p-3 border-b border-white/40 dark:border-gray-600/40">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              Marketing Workflows
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select a workflow to explore
            </p>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded transition-colors"
            aria-label={isCollapsed ? "Expand workflows" : "Collapse workflows"}
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? "max-h-0" : "max-h-[600px]"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              onClick={() => onWorkflowSelect(workflow)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedWorkflow.id === workflow.id
                  ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-700 shadow-sm backdrop-blur-sm"
                  : workflow.status === "active"
                  ? "bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 backdrop-blur-sm"
                  : "bg-gray-100/60 dark:bg-gray-800/40 border border-white/30 dark:border-gray-600/30 opacity-60 backdrop-blur-sm"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {workflow.title}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                    {workflow.description}
                  </p>
                  <div className="mt-2">
                    {workflow.status === "active" && (
                      <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400">
                        <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-1"></div>
                        Live Demo
                      </span>
                    )}
                    {workflow.status === "available" && (
                      <span className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-1"></div>
                        Available
                      </span>
                    )}
                    {workflow.status === "coming-soon" && (
                      <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mr-1"></div>
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
