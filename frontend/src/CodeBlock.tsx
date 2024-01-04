import React, { FC } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Container, Title, Header, Content } from "./styles";

interface CodeBlockProps {
  errorExplanation: {
    errorComponent: string;
    timestamp: string;
  };
}

const CodeBlock: FC<CodeBlockProps> = ({ errorExplanation }) => {
  return (
    <Container>
      <Content>
        <Header>
          <Title>Problematic Code</Title>
          <span>{errorExplanation.timestamp}</span>
        </Header>
        <pre>
          <SyntaxHighlighter language={"javascript"} style={vscDarkPlus}>
            {errorExplanation.errorComponent}
          </SyntaxHighlighter>
        </pre>
      </Content>
    </Container>
  );
};

export default CodeBlock;
