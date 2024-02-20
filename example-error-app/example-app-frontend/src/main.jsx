import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "./index.css";

const onError = (error) => {
  const errorJson = JSON.stringify({
    message: error.message,
    stack: error.stack,
  });
  fetch("/api/langChain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: errorJson }),
  });
  navigator.clipboard.writeText(errorJson).then(() => {
    // alert("An error has been copied to the clipboard");
  });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError,
  }),
  mutationCache: new MutationCache({
    onError,
  }),
});

window.addEventListener("error", ({ error }) => onError(error));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
