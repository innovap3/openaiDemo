import React, { useState } from "react";
import { Container, Content } from "./styles";
import { styled } from "styled-components";
import { ErrorData, QUERY_KEYS, postAi } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const InputContainer = styled.div`
  display: flex;
  input {
    flex-grow: 1;
    margin-right: 1rem;
  }
`;

const ChatInput = ({ errorData }: { errorData: ErrorData | undefined }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: postAi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getAi] });
    },
  });
  const { key } = errorData || {};
  const [value, setValue] = useState("");
  return (
    <Container>
      <Content>
        <InputContainer>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button
            disabled={isPending || errorData?.status === "pending"}
            onClick={() => {
              if (!value) return;
              mutate({ error: key || value, input: value });
            }}
          >
            Submit
          </button>
        </InputContainer>
      </Content>
    </Container>
  );
};

export default ChatInput;
