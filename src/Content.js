import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import fetchData from "./api";
import MarkdownComponent from "./markDown.js";
import CodeBlock from "./CodeBlock";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20%;
  margin: auto;
`;

const errorExplanation = {
  errorComponent: `import React from "react";

  const CodeBlock = ({ errorExplanation }) => {
    console.log(errorExplanation);
  
    return (
      <div>
        <div
          style={{
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#e6f7ff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h2>Problematic Code</h2>
            <pre
              style={{
                whiteSpace: "pre-wrap", // or "pre-line" depending on your preference
                wordWrap: "break-word",
                overflow: "auto",
              }}
            >
              <code>{errorExplanation.errorCode}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  };
  
  export default CodeBlock;`,
  //errorCode: "Help me to do the code review",
  errorCode: "Cannot read properties of undefined (reading 'price')",
};

const Content = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState(null);
  const data = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData({ errorExplanation }));
  }, []);

  return (
    <Container>
      <CodeBlock errorExplanation={errorExplanation} />
      {data && <MarkdownComponent markdownContent={data} />}
    </Container>
  );
};

export default Content;
