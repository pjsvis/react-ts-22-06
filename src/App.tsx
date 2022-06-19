import React from "react";
import { storeApi, useStoreState } from "./store";
import "./styles.css";

const divStyle = { marginBottom: "1em" };

export default function App() {
  const [storeState] = useStoreState();
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.currentTarget.value;
    storeApi.setAnswer(answer);
  };
  const { question, conclusion } = storeState;
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={divStyle}> {question}</div>
      <div style={divStyle}>
        <input type="text" onChange={handleAnswer} />
      </div>
      <div>{conclusion}</div>
    </div>
  );
}
