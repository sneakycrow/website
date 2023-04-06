"use client";

import ReactMarkdown from "react-markdown";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownProps {
  children: string;
}

const Markdown = (props: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ ...props }) => <p {...props} className="text-lg" />,
        h2: ({ ...props }) => (
          <h2 {...props} className="text-xl leading-loose" />
        ),
        ol: ({ ...props }) => (
          <ol {...props} className="list-disc list-inside" />
        ),
        ul: ({ ...props }) => (
          <ul {...props} className="list-disc list-inside" />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              // @ts-ignore
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
};

export default Markdown;
