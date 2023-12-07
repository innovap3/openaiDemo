import React from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose your preferred style



const MarkdownComponent = ({ markdownContent }) => {
  const messages = [{ role: "users" }];
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            backgroundColor: message.role === "user" ? "#e6f7ff" : "#f0f0f0",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h2>Possible Solution:</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap", // or "pre-line" depending on your preference
              wordWrap: "break-word",
              overflow: "auto",
            }}
          >
            <SyntaxHighlighter language={"javascript"} style={vscDarkPlus}>
              {markdownContent.message}
            </SyntaxHighlighter>
          </pre>
        </div>
      ))}
    </>
  );
};

export default MarkdownComponent;
