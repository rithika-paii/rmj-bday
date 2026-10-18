import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { memories, extras, fromName } from "../data/memories";

const tilts = [-5, 3, -2, 6, -4, 2, 5, -3];
const colors = ["#D85A30", "#EF9F27", "#FAC775", "#F0997B"];

export default function Finale({ onRestart }) {
  const [open, setOpen] = useState(null);

  const photos = [
    ...memories.map((m) => ({ src: m.photo, caption: m.caption })),
    ...extras.map((src) => ({ src, caption: "" })),
  ];

  useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 }, colors });
    const timer = setTimeout(() => {
      confetti({ particleCount: 80, spread: 120, origin: { y: 0.2 }, colors });
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="finale">
      <h1>Happy birthday to my best friend, I love you</h1>
      <p className="signed">{fromName}</p>

      <div className="collage">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className="mini"
            style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
            onClick={() => setOpen(photo)}
          >
            <img src={photo.src} alt="" />
          </button>
        ))}
      </div>

      <button className="link" onClick={onRestart}>Play again</button>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <div className="polaroid">
            <div className="photo-wrap">
              <img src={open.src} alt="" className="photo" />
            </div>
            <p className="caption">{open.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}