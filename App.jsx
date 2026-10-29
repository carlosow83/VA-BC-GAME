import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard.jsx";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Load questions.json
  useEffect(() => {
    fetch("questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  // When user answers a question
  function handleNext(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextIndex = index + 1;

    if (nextIndex < questions.length) {
      setIndex(nextIndex);
    } else {
      setFinished(true);
    }
  }

  // If questions haven't loaded yet
  if (questions.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Loading questions...</h2>;
  }

  // Game finished screen
  if (finished) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Game Over!</h1>
        <p style={{ fontSize: "1.5rem" }}>
          Your Score: {score} / {questions.length}
        </p>
      </div>
    );
  }

  // Show current question
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "2rem",
          color: "#ffdd57",
          textShadow: "0 0 8px #ffdd57, 0 0 24px #ffdd57"
        }}
      >
        VA-BC GAME SHOW
      </h1>

      <QuestionCard q={questions[index]} onNext={handleNext} />
    </div>
  );
}
