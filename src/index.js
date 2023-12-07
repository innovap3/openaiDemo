import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import contentReducer from "./reducer";
import SideBar from "./SideBar";
import Content from "./Content";
import "./reset.css";

const rootReducer = combineReducers({
  form: formReducer,
  content: contentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const Container = styled.div`
  display: flex;
  max-width: 100%;
  margin: auto;
`;

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <SideBar />
        <Content />
      </Container>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
