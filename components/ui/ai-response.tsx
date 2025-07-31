"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

// Import highlight.js styles
import "highlight.js/styles/github-dark.css";

const components: Components = {
  // Custom code block styling
  pre: ({ className, children, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  // Custom inline code styling
  code: ({ className, children, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-900 dark:bg-slate-800 dark:text-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),
  // Custom paragraph styling
  p: ({ className, children, ...props }) => (
    <p
      className={cn("leading-6 [&:not(:first-child)]:mt-2", className)}
      {...props}
    >
      {children}
    </p>
  ),
  // Custom link styling
  a: ({ className, children, ...props }) => (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4",
        className
      )}
      {...props}
    >
      {children}
    </a>
  ),
  // Custom heading styles
  h1: ({ className, children, ...props }) => (
    <h1
      className={cn(
        "mt-3 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }) => (
    <h2
      className={cn(
        "mt-3 scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3
      className={cn(
        "mt-3 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  // Custom list styling
  ul: ({ className, children, ...props }) => (
    <ul className={cn("my-3 ml-6 list-disc [&>li]:mt-1", className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ...props }) => (
    <ol
      className={cn("my-3 ml-6 list-decimal [&>li]:mt-1", className)}
      {...props}
    >
      {children}
    </ol>
  ),
  // Custom blockquote styling
  blockquote: ({ className, children, ...props }) => (
    <blockquote
      className={cn("mt-3 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  ),
};

interface AIResponseProps {
  children: string;
  className?: string;
}

export const AIResponse = ({ children, className }: AIResponseProps) => {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none dark:prose-invert",
        className
      )}
    >
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
