import React, { FC } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose your preferred style
import { Container, Title, Content } from "./styles";

interface MarkdownComponentProps {
  markdownContent: {
    message: string;
  };
}

const MessageBox = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #dbdee1;
  background-color: ${(props) =>
    props.role === "user" ? "#e6f7ff" : "#2b2d31"};
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #232428;
`;

const MarkdownComponent: FC<MarkdownComponentProps> = ({ markdownContent }) => {
  const messages = [{ role: "users" }];
  const sections = markdownContent.message.split("```");

  return (
    <Container>
      <Content>
        <Title>Possible Solution:</Title>
        {messages.map((message, index) => (
          <MessageBox key={index} role={message.role}>
            <pre
              style={{
                whiteSpace: "pre-wrap", // or "pre-line" depending on your preference
                wordWrap: "break-word",
              }}
            >
              {sections.map((section, index) => {
                if (index % 2 === 0) {
                  // Regular text section
                  return <ReactMarkdown>{section.trim()}</ReactMarkdown>;
                } else {
                  // Code section
                  const filteredCode = section.split("\n").slice(1).join("\n");
                  return (
                    <SyntaxHighlighter
                      language={"javascript"}
                      style={vscDarkPlus}
                    >
                      {filteredCode.trim()}
                    </SyntaxHighlighter>
                  );
                }
              })}
            </pre>
          </MessageBox>
        ))}
      </Content>
    </Container>
  );
};

export default MarkdownComponent;
