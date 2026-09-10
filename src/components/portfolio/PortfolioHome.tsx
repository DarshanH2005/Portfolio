"use client";
import Link from "next/link";
import { HeroExperience } from "./HeroExperience";
import { ProjectShowcase } from "./ProjectShowcase";
export function PortfolioHome() {
  return (
    <div className="portfolio-home">
      <HeroExperience />
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
