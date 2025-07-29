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
        "bg-background",
        "border-b border-border",
        "animate-fade-in opacity-0 [--animation-delay:400ms]"
      )}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <div
            role="img"
            aria-label="FashionCo logo"
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shadow-lg",
              "bg-gradient-to-br from-primary to-secondary",
              "animate-fade-in opacity-0 [--animation-delay:600ms]"
            )}
          >
            <span
              className="text-primary-foreground text-sm font-bold"
              aria-hidden="true"
            >
              F
            </span>
          </div>
          <span
            className={cn(
              "hidden sm:block font-semibold text-foreground text-sm",
              "animate-fade-in opacity-0 [--animation-delay:700ms]"
            )}
          >
            FashionCo
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
            <h1 className="font-bold text-foreground text-sm sm:text-base">
              Budget Optimization
            </h1>
            <p className="text-xs text-muted-foreground">FashionCo Marketing</p>
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
              "transition-all duration-300 shadow-lg",
              "bg-card border-border",
              "hover:bg-muted",
              "text-foreground",
              "px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold",
              "focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
          >
            {currentStep === 0 ? "Start Demo" : "Replay Demo"}
          </Button>
        </div>
      </div>
    </header>
  );
}
