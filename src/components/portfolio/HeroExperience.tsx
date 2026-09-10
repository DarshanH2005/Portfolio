"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./HeroExperience.module.css";
import { HeroSculpture } from "./HeroSculpture";

const studies = [
  { name: "Entangle", note: "A few unexpected connections." },
  { name: "Orbit", note: "A different point of view." },
  { name: "Bloom", note: "Room for an idea to grow." },
];

export function HeroExperience() {
  const [motion, setMotion] = useState(false);
  const [study, setStudy] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.topline}>
        <span>INDEPENDENT DEVELOPER & CURIOUS HUMAN</span>
        <span>
          BENGALURU, IN <span className={styles.separator}>/</span> PORTFOLIO ’26
        </span>
      </div>

      <h1 id="hero-title" className={styles.name}>
        DARSHAN H<span>.</span>
      </h1>

      <div className={styles.intro}>
        <span className="eyebrow">ENGINEER. BUILDER. EXPLORER.</span>
        <p>
          Serious about building.
          <br />
          <em>Curious about everything.</em>
        </p>
        <div className={styles.description}>
          I turn ideas into web & mobile products.
          <br />A little logic. A lot of possibility.
        </div>
        <Link href="/work" className="round-link">
          <span>Explore my work</span>
          <span className="round-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>

      <div className={styles.exhibit}>
        <div className={styles.exhibitLabel} aria-hidden="true">
          <span className={styles.registration}>+</span>
          <span>
            FIG. 0{study + 1}
            <br />
            {studies[study].name.toUpperCase()}
          </span>
        </div>
        <HeroSculpture motion={motion} study={study} wireframe={wireframe} onStatus={setStatus} />
        <div className={styles.exhibitSide} aria-hidden="true">
          {status === "ready" ? "DRAG TO EXPLORE" : "IDEAS TAKE SHAPE"}
        </div>
        <div className={styles.exhibitFoot}>
          <span className={styles.registration} aria-hidden="true">
            +
          </span>
          <span aria-live="polite">{studies[study].note}</span>
          <span className={styles.registration} aria-hidden="true">
            +
          </span>
        </div>
      </div>

      <div className={styles.controls}>
        <fieldset className={styles.studyPicker} aria-label="Sculpture shape">
          {studies.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={study === index}
              disabled={status !== "ready"}
              onClick={() => setStudy(index)}
            >
              <span>0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </fieldset>
        <button
          className={styles.surfaceButton}
          type="button"
          disabled={status !== "ready"}
          aria-pressed={wireframe}
          aria-label="Show sculpture wireframe"
          onClick={() => setWireframe(!wireframe)}
        >
          <svg
            viewBox="0 0 20 20"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="m10 2 7 4v8l-7 4-7-4V6l7-4Zm0 0v16M3 6l14 8M17 6 3 14" />
          </svg>
          <span>{wireframe ? "Wire" : "Solid"}</span>
        </button>
      </div>

      <div className={styles.bottom}>
        <a href="#selected-work" className={styles.scrollLink}>
          <span aria-hidden="true">↓</span> SCROLL TO EXPLORE
        </a>
        <span className={styles.hint}>
          {status === "ready"
            ? "DRAG TO TURN · PICK A SHAPE · MAKE IT YOURS"
            : status === "loading"
              ? "PREPARING THE SCULPTURE"
              : "A STUDY IN POSSIBILITIES"}
        </span>
        <button
          className={styles.motionButton}
          disabled={status !== "ready"}
          type="button"
          aria-pressed={motion}
          aria-label="Animate sculpture"
          onClick={() => setMotion(!motion)}
        >
          <span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span> MOTION {motion ? "ON" : "OFF"}
        </button>
      </div>
    </section>
  );
}
