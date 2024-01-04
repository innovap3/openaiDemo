import React, { FC } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MarkdownComponent from "./markDown";
import CodeBlock from "./CodeBlock";
import ChatInput from "./ChatInput";
import { ErrorData } from "./api";

interface ContentProps {
  errorData: ErrorData | undefined;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding-left: 20%;
  margin: auto;
`;

const Content: FC<ContentProps> = ({ errorData }) => {
  const errorStack = errorData?.key && JSON.parse(errorData.key).stack;
  const message = errorData?.result;
  const timestamp = dayjs(errorData?.timestamp).format("YYYY-MM-DD hh:mm:ss");
  return (
    <Container>
      {errorStack && (
        <CodeBlock
          errorExplanation={{ errorComponent: errorStack, timestamp }}
        />
      )}
      {message && <MarkdownComponent markdownContent={{ message }} />}
      <ChatInput errorData={errorData} />
    </Container>
  );
};

export default Content;
