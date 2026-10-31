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
          art.current.style.transform = `translate3d(${x * 18}px,${y * 14}px,0) rotate(${x * 3}deg)`;
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
          <span>RELIABILITY & AI SYSTEMS</span>
        </div>
        <div className="hero-intro">
          <span className="eyebrow">ENGINEER. BUILDER. EXPLORER.</span>
          <p>
            From an idea
            <br />
            to something <em>real.</em>
          </p>
          <span className="hero-intro-detail">
            I build products and test their boundaries.
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
            type="button"
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
          Good engineering starts with judgment.
          <br />
          Then <span>evidence that it works.</span>
        </p>
        <div className="intro-strip-note">
          I use AI to accelerate implementation. I own the context, technical decisions, review,
          failure checks, and the result that reaches the user.
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
            Runtime security, agent reliability,
            <br />
            and a client product taken to release.
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
            An Information Science engineering student building across full-stack products, runtime
            security, and evaluation for tool-using agents.
          </p>
          <p>
            My focus is the work around the code: defining the problem, finding failure modes,
            reviewing the implementation, and making regressions reproducible.
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
            <p>
              Five-day AI-assisted client build. Mobile app, VPS backend, authenticated chat, and
              verified payments.
            </p>
          </div>
          <div>
            <span>JUL 2025 — JAN 2026</span>
            <h3>
              Samsung R&D<small>Project Developer Intern · PRISM</small>
            </h3>
            <p>
              Reusable React CRM features, REST APIs, troubleshooting, and team code reviews before
              delivery.
            </p>
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
