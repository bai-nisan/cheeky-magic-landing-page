import React from "react";

interface ChatMessageProps {
  type: "user" | "ai" | "feedback" | "improved";
  children: React.ReactNode;
  timestamp?: string;
  showIndicator?: boolean;
}

export function ChatMessage({
  type,
  children,
  timestamp = "Just now",
  showIndicator = false,
}: ChatMessageProps) {
  const getMessageStyles = () => {
    switch (type) {
      case "user":
        return {
          container: "flex justify-end",
          bubble:
            "bg-blue-600 dark:bg-blue-500 text-white rounded-lg rounded-br-md px-3 py-2 max-w-xs relative",
          indicatorColor: "bg-blue-500 dark:bg-blue-400",
          timestampColor: "text-blue-100",
        };
      case "feedback":
        return {
          container: "flex justify-end",
          bubble:
            "bg-green-600 dark:bg-green-500 text-white rounded-lg rounded-br-md px-3 py-2 max-w-xs relative",
          indicatorColor: "bg-green-500 dark:bg-green-400",
          timestampColor: "text-green-100",
        };
      case "improved":
        return {
          container: "flex justify-end",
          bubble:
            "bg-purple-600 dark:bg-purple-500 text-white rounded-lg rounded-br-md px-3 py-2 max-w-xs relative",
          indicatorColor: "bg-purple-500 dark:bg-purple-400",
          timestampColor: "text-purple-100",
        };
      case "ai":
      default:
        return {
          container: "flex justify-start",
          bubble:
            "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg rounded-bl-md px-3 py-2 max-w-md",
          indicatorColor: "",
          timestampColor: "text-gray-500 dark:text-gray-400",
        };
    }
  };

  const styles = getMessageStyles();

  return (
    <div className={styles.container}>
      <div className={styles.bubble}>
        <div className="text-xs">{children}</div>
        <p className={`text-xs ${styles.timestampColor} mt-1`}>{timestamp}</p>
      </div>
    </div>
  );
}
