"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectShowcase } from "./ProjectShowcase";
export function PortfolioHome() {
  const art = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotion(!query.matches);
    const update = () => setMotion(!query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <div className="portfolio-home">
      <section
        className={motion ? "hero motion-on" : "hero"}
        aria-labelledby="hero-title"
        onPointerMove={(event) => {
          if (!motion || event.pointerType !== "mouse" || !art.current) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          art.current.style.transform =
            "translate3d(" + x * 18 + "px," + y * 14 + "px,0) rotate(" + x * 3 + "deg)";
        }}
        onPointerLeave={() => {
          if (art.current) art.current.style.transform = "";
        }}
      >
        <div className="hero-topline">
          <span>PORTFOLIO — VOL. 2026</span>
          <span>12.97° N &nbsp; 77.59° E</span>
        </div>
        <h1 id="hero-title" className="hero-name">
          DARSHAN
          <span className="hero-h">
            {" "}
            H<span className="lime-period">.</span>
          </span>
        </h1>
        <div ref={art} className="hero-art" aria-hidden="true">
          <img
            src="/images/chrome-knot.webp"
            alt=""
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <span className="art-cross cross-one">+</span>
          <span className="art-cross cross-two">+</span>
        </div>
        <div className="hero-side-note">
          <span>FULL STACK</span>
          <span>MOBILE</span>
          <span>AI EXPLORATIONS</span>
        </div>
        <div className="hero-intro">
          <span className="eyebrow">ENGINEER. BUILDER. EXPLORER.</span>
          <p>
            From an idea
            <br />
            to something <em>real.</em>
          </p>
          <span className="hero-intro-detail">
            I build web & mobile products.
            <br />
            Based in Bengaluru. Driven by curiosity.
          </span>
          <Link href="/work" className="round-link">
            <span>Explore my work</span>
            <span className="round-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
        <div className="hero-bottom">
          <a href="#selected-work" className="scroll-link">
            <span className="scroll-line" aria-hidden="true" />
            SCROLL TO EXPLORE
          </a>
          <button
            className="motion-toggle"
            onClick={() => {
              setMotion(!motion);
              if (art.current) art.current.style.transform = "";
            }}
            aria-pressed={motion}
          >
            MOTION {motion ? "ON" : "OFF"}
            <span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span>
          </button>
          <span className="hero-edition">DESIGNED TO MOVE FORWARD ↗</span>
        </div>
      </section>
      <section className="intro-strip">
        <span className="eyebrow">A LITTLE CONTEXT /</span>
        <p>
          I like figuring things out.
          <br />
          Then <span>making them work.</span>
        </p>
        <div className="intro-strip-note">
          From React interfaces at Samsung R&D to independently shipping a client’s Android app. I
          learn by building, and build to solve something.
        </div>
      </section>
      <section id="selected-work" className="work-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / IDEAS INTO ACTION</span>
            <h2>
              SELECTED
              <br />
              <span className="outline-type">WORK</span>
              <sup>(03)</sup>
            </h2>
          </div>
          <p>
            Client products, team efforts,
            <br />
            and a few curious experiments.
          </p>
        </div>
        <ProjectShowcase />
        <Link href="/work" className="all-work-link">
          <span>THERE’S MORE TO EXPLORE</span>
          <strong>
            All projects <span aria-hidden="true">↗</span>
          </strong>
        </Link>
      </section>
      <section className="about-teaser">
        <div className="about-photo">
          <img src="/images/avatar.jpg" width="700" height="800" alt="Darshan H" loading="lazy" />
          <span>BENGALURU, INDIA / 2026</span>
        </div>
        <div className="about-teaser-copy">
          <span className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</span>
          <h2>
            CURIOUS
            <br />
            BY DEFAULT<span>.</span>
          </h2>
          <p>
            An Information Science student, a developer, and someone with a growing list of startup
            ideas.
          </p>
          <p>
            I’m preparing for my next engineering opportunity. Outside the code: following what’s
            happening in AI, open-world games, and time with friends.
          </p>
          <Link href="/about" className="round-link">
            <span>A little more about me</span>
            <span className="round-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
      <section className="experience-section">
        <div className="section-heading compact">
          <span className="eyebrow">03 / ALONG THE WAY</span>
          <h2>
            BUILT ON
            <br />
            EXPERIENCE.
          </h2>
        </div>
        <div className="experience-list">
          <div>
            <span>MAR 2026</span>
            <h3>
              Smart Space Technologies<small>Freelance React Native Developer</small>
            </h3>
            <p>Lagnam Matrimony. Requirements, development, payments, and Google Play release.</p>
          </div>
          <div>
            <span>JUL 2025 — FEB 2026</span>
            <h3>
              Samsung R&D<small>Frontend Developer Intern</small>
            </h3>
            <p>Modular React interfaces for internal CRM and employee workflow tools.</p>
          </div>
          <div>
            <span>COMMUNITY</span>
            <h3>
              Algorand Blockchain Club<small>Club Lead & Technical Core Team</small>
            </h3>
            <p>Technical workshops, collaborative learning, and blockchain projects at CIT.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
