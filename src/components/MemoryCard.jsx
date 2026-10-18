import { useState } from "react";

const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

export default function MemoryCard({ memory, index, total, onNext }) {
  const [options] = useState(() => shuffle(memory.options));
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState([]);
  const [shake, setShake] = useState(false);

  const trick = !memory.options.includes(memory.answer);

  const pick = (option) => {
    if (trick || option === memory.answer) {
      setSolved(true);
      return;
    }
    setWrong([...wrong, option]);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  return (
    <section className="memory">
      <div className="dots">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={i < index || (i === index && solved) ? "dot on" : "dot"}
          />
        ))}
      </div>
      <p className="count">
        Frame {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <div className={shake ? "polaroid shake" : "polaroid"}>
        <span className="tape" />
        <div className="photo-wrap">
          <img
            src={memory.photo}
            alt=""
            className={solved ? "photo" : "photo blurred"}
          />
        </div>
        <p className="caption">{solved ? memory.caption : ""}</p>
      </div>

      {!solved && (
        <>
          <p className="question">{memory.question}</p>
          <div className="options">
            {options.map((option) => (
              <button
                key={option}
                className="option"
                disabled={wrong.includes(option)}
                onClick={() => pick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      {solved && trick && <p className="reveal">{memory.answer}</p>}

      {solved && (
        <button className="btn" onClick={onNext}>
          {index + 1 === total ? "Finish" : "Next"}
        </button>
      )}
    </section>
  );
}