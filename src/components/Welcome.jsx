import { friendName, memories } from "../data/memories";

export default function Welcome({ onStart }) {
  const n = memories.length;
  return (
    <section className="welcome">
      <h1>Hey {friendName}</h1>
      <p>I made you something. {n} memories, {n} questions.</p>
      <button className="btn" onClick={onStart}>Open it</button>
    </section>
  );
}