"use client";

import React from "react";
import { PlatformIcon } from "@/components/ui/icons";

interface DataGatheringStep {
  platform: string;
  status: "pending" | "connecting" | "complete";
  message: string;
  icon: "meta" | "google" | "shopify" | "analysis" | "insights";
}

interface DataGatheringStepsProps {
  steps: DataGatheringStep[];
  currentStep: number;
}

export function DataGatheringSteps({
  steps,
  currentStep,
}: DataGatheringStepsProps) {
  const getStepIcon = (
    iconType: DataGatheringStep["icon"],
    status: DataGatheringStep["status"]
  ) => {
    if (iconType === "analysis") {
      return (
        <div
          className={`w-4 h-4 rounded flex items-center justify-center ${
            status === "complete"
              ? "bg-green-500 dark:bg-green-400"
              : status === "connecting"
              ? "bg-blue-500 dark:bg-blue-400"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <span className="text-white text-xs font-bold">A</span>
        </div>
      );
    }

    if (iconType === "insights") {
      return (
        <div
          className={`w-4 h-4 rounded flex items-center justify-center ${
            status === "complete"
              ? "bg-green-500 dark:bg-green-400"
              : status === "connecting"
              ? "bg-blue-500 dark:bg-blue-400"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <span className="text-white text-xs font-bold">I</span>
        </div>
      );
    }

    return (
      <PlatformIcon
        platform={iconType}
        variant="simple"
        size={16}
        className={
          status === "complete"
            ? "text-green-600 dark:text-green-400"
            : status === "connecting"
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-400 dark:text-gray-500"
        }
      />
    );
  };

  const getStatusIndicator = (status: DataGatheringStep["status"]) => {
    if (status === "complete") {
      return (
        <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
      );
    }
    if (status === "connecting") {
      return (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
    );
  };

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-2">
          {getStepIcon(step.icon, step.status)}
          <span className="text-xs flex-1">{step.message}</span>
          {getStatusIndicator(step.status)}
        </div>
      ))}
      {currentStep >= 3 && (
        <p className="text-xs mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
          Data analysis complete! Check the analysis panel for detailed
          recommendations for your t-shirt campaigns.
        </p>
      )}
    </div>
  );
}
