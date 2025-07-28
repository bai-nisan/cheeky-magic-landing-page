import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  currentStep: number;
  onRestartDemo: () => void;
}

export function DashboardHeader({
  currentStep,
  onRestartDemo,
}: DashboardHeaderProps) {
  return (
    <header
      role="banner"
      aria-label="Dashboard header"
      className={cn(
        "relative flex-shrink-0 px-4 sm:px-6 py-3",
        "bg-gradient-to-r from-gray-50/80 to-gray-100/80",
        "dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm",
        "border-b border-gray-200/60 dark:border-gray-700/60",
        "animate-fade-in opacity-0 [--animation-delay:400ms]"
      )}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <div
            role="img"
            aria-label="Cheeky AI logo"
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shadow-lg",
              "bg-gradient-to-br from-purple-600 to-pink-500",
              "animate-fade-in opacity-0 [--animation-delay:600ms]"
            )}
          >
            <span className="text-white text-sm font-bold" aria-hidden="true">
              C
            </span>
          </div>
          <span
            className={cn(
              "hidden sm:block font-semibold text-gray-900 dark:text-white text-sm",
              "animate-fade-in opacity-0 [--animation-delay:700ms]"
            )}
          >
            Cheeky AI
          </span>
        </div>

        {/* Center: Current Workflow */}
        <div
          className={cn(
            "flex-1 flex justify-center",
            "animate-fade-in opacity-0 [--animation-delay:800ms]"
          )}
        >
          <div className="text-center">
            <h1 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
              Budget Optimization
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              FashionCo Marketing
            </p>
          </div>
        </div>

        {/* Right: Demo Control */}
        <div
          className={cn("animate-fade-in opacity-0 [--animation-delay:900ms]")}
        >
          <Button
            onClick={onRestartDemo}
            variant="outline"
            size="sm"
            aria-label={
              currentStep === 0
                ? "Start the demo workflow"
                : "Restart the demo from the beginning"
            }
            className={cn(
              "transition-all duration-300 backdrop-blur-sm shadow-lg",
              "bg-gradient-to-r from-purple-50 to-blue-50",
              "dark:from-purple-900/30 dark:to-blue-900/30",
              "border-purple-200 dark:border-purple-700",
              "hover:from-purple-100 hover:to-blue-100",
              "dark:hover:from-purple-900/50 dark:hover:to-blue-900/50",
              "text-gray-900 dark:text-white",
              "px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold",
              "focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            )}
          >
            {currentStep === 0 ? "Start Demo" : "Replay Demo"}
          </Button>
        </div>
      </div>
    </header>
  );
}
