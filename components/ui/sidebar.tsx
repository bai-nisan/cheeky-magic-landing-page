"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  width?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  side: "left" | "right";
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      width = "300px",
      collapsible = false,
      defaultCollapsed = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const toggleCollapsed = React.useCallback(() => {
      setIsCollapsed((prev) => !prev);
    }, []);

    const contextValue = React.useMemo(
      () => ({
        isCollapsed,
        toggleCollapsed,
        side,
      }),
      [isCollapsed, toggleCollapsed, side]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={{
            width: isCollapsed ? "60px" : width,
            minWidth: isCollapsed ? "60px" : width,
          }}
          className={cn(
            "flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
            side === "right" && "border-l border-r-0",
            isCollapsed && "items-center",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebar();

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center border-b px-4 sm:px-6 py-3",
        isCollapsed && "justify-center px-2",
        className
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto", className)}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebar();

  return (
    <div
      ref={ref}
      className={cn("border-t px-4 py-3", isCollapsed && "px-2", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggleCollapsed } = useSidebar();

  return (
    <button
      ref={ref}
      onClick={toggleCollapsed}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-9 w-9 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
};
