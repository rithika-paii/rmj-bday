import { useState } from "react";
import { memories } from "./data/memories";
import Welcome from "./components/Welcome";
import MemoryCard from "./components/MemoryCard";
import Finale from "./components/Finale";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index + 1 < memories.length) setIndex(index + 1);
    else setScreen("finale");
  };

  const restart = () => {
    setIndex(0);
    setScreen("welcome");
  };

  return (
    <main className="page">
      {screen === "welcome" && <Welcome onStart={() => setScreen("quiz")} />}
      {screen === "quiz" && (
        <MemoryCard
          key={index}
          memory={memories[index]}
          index={index}
          total={memories.length}
          onNext={next}
        />
      )}
      {screen === "finale" && <Finale onRestart={restart} />}
    </main>
  );
}