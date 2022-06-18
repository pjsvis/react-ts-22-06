import React from "react";
import { storeStateApi, useStoreState } from "./store";
import "./styles.css";

export default function App() {
  const [storeState] = useStoreState();
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.currentTarget.value;
    storeStateApi.setAnswer(answer);
  };
  const divStyle = { marginBottom: "1em" };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={divStyle}> {storeState.question}</div>
      <div style={divStyle}>
        <input type="text" onChange={handleAnswer} />
      </div>
      <div>
        {storeState.validity && (
          <span>{storeState.answer} is the correct answer!</span>
        )}
        {!storeState.validity && (
          <span>{storeState.answer} is the wrong answer!</span>
        )}
      </div>
    </div>
  );
}
