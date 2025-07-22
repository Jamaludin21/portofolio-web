"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

/**
 * SmartContentRenderer handles content that may be in Markdown, plain text,
 * or legacy format with bullets (· or -) and line breaks.
 */
export function SmartContentRenderer({ content, className = "" }) {
  // Check if the content likely uses legacy format
  const isLegacy =
    (content.includes("\n") ||
      content.includes("·") ||
      content.includes("-")) &&
    !content.includes("#") && // markdown syntax
    !content.includes("**") &&
    !content.includes("* ") &&
    !content.includes("```");

  if (isLegacy) {
    return (
      <div className={clsx("space-y-2", className)}>
        {content.split("\n").map((line, idx) => {
          const isBullet =
            line.trim().startsWith("·") || line.trim().startsWith("-");
          return isBullet ? (
            <li key={idx} className="list-disc ml-6 text-sm leading-relaxed">
              {line.replace(/^[-·]\s*/, "")}
            </li>
          ) : (
            <p key={idx} className="text-sm leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  }

  // If content is Markdown or HTML-like, use react-markdown
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={clsx(
        "prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300",
        className
      )}
    >
      {content}
    </ReactMarkdown>
  );
}
