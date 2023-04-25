"use client";

import ReactMarkdown from "react-markdown";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownProps {
  children: string;
  className?: string;
}

const Article = (props: MarkdownProps) => {
  const classes = `bg-white p-6 flex justify-center ${props.className}}`;
  return (
    <article className={classes}>
      <ReactMarkdown
        className="max-w-[1000px] space-y-8"
        components={{
          p: ({ ...props }) => <p {...props} className="text-base leading-1" />,
          a: ({ ...props }) => (
            <a {...props} className="text-green-550 font-bold" />
          ),
          h1: ({ ...props }) => (
            <h1 {...props} className="text-xl font-bold my-4" />
          ),
          h2: ({ ...props }) => (
            <h2 {...props} className="text-xl font-bold my-4" />
          ),
          ol: ({ ...props }) => (
            <ol {...props} className="list-disc list-inside" />
          ),
          ul: ({ ...props }) => (
            <ul {...props} className="list-disc list-inside" />
          ),
          img: ({ ...props }) => (
            <img {...props} className="max-w-[90%] mx-auto shadow-lg my-4" />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                // @ts-ignore
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
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
    </article>
  );
};

export default Article;