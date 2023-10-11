import React from "react";
import QuestionCard from "./QuestionCard";

const Test = () => {
  return (
    <div className="test-container">
      <div
        style={{
          maxWidth: "90rem",
          margin: "auto",
          padding: "2rem",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <QuestionCard />
        </div>
      </div>
    </div>
  );
};

export default Test;
