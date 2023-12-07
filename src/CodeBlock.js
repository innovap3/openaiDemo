import React from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Styled components for the CodeBlock
const Container = styled.div`
  width: -webkit-fill-available;
  width: -moz-fill-available;
  width: -moz-available;
  width: fill-available;
  margin: auto;
  padding: 20px;
`;

const HighlightContainer = styled.div`
  background-color: #e6f7ff;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 130%;
`;

const CodeBlock = ({ errorExplanation }) => {
  return (
    <Container>
      <HighlightContainer>
        <Title>Problematic Code</Title>
        <pre>
          <SyntaxHighlighter language={"javascript"} style={vscDarkPlus}>
            {errorExplanation.errorComponent}
          </SyntaxHighlighter>
        </pre>
      </HighlightContainer>
    </Container>
  );
};

export default CodeBlock;
