import { useState } from "react";

export default function QuestionCard({ q, onNext }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(opt) {
    if (revealed) return;
    setSelected(opt.id);
    setRevealed(true);

    // Wait 1.2 seconds so user sees green/red colors
    setTimeout(() => {
      onNext(opt.isCorrect);
      setSelected(null);
      setRevealed(false);
    }, 1200);
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{q.question}</h2>

      {q.options.map((opt) => {
        const isSelected = selected === opt.id;
        const showCorrect = revealed && opt.isCorrect;
        const showWrong = revealed && isSelected && !opt.isCorrect;

        const baseStyle = {
          display: "block",
          margin: "0.6rem auto",
          padding: "1rem",
          borderRadius: "8px",
          background: "#222",
          color: "#fff",
          border: "none",
          width: "100%",
          maxWidth: "400px",
          transition: "all .12s",
          fontSize: "1rem",
          cursor: "pointer"
        };

        if (showCorrect) {
          baseStyle.background = "#16a34a"; // green
          baseStyle.boxShadow = "0 0 12px #16a34a";
          baseStyle.transform = "scale(1.02)";
        }

        if (showWrong) {
          baseStyle.background = "#dc2626"; // red
          baseStyle.boxShadow = "0 0 12px #dc2626";
          baseStyle.transform = "scale(.98)";
        }

        return (
          <button
            key={opt.id}
            style={baseStyle}
            onClick={() => handleSelect(opt)}
          >
            {opt.text}
          </button>
        );
      })}
    </div>
  );
}
