import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About",
  description: "Meet Darshan H, a developer and Information Science student based in Bengaluru.",
};
export default function About() {
  return (
    <div className="about-page">
      <section className="about-page-hero">
        <span className="eyebrow">THE PERSON BEHIND THE WORK</span>
        <h1>
          A CURIOUS
          <br />
          <span className="outline-type">WORK IN</span>
          <br />
          PROGRESS<span className="lime-period">.</span>
        </h1>
        <div className="about-page-portrait">
          <img src="/images/avatar.jpg" alt="Darshan H" width="700" height="800" />
          <span>DARSHAN H / BENGALURU</span>
        </div>
      </section>
      <section className="about-story">
        <span className="eyebrow">HELLO, I’M DARSHAN.</span>
        <div>
          <h2>
            I learn by making.
            <br />
            And there’s a lot left to make.
          </h2>
          <p>
            I’m pursuing a B.E. in Information Science at Cambridge Institute of Technology,
            Bengaluru (2023–2027). My work spans React interfaces, full-stack web applications, and
            React Native.
          </p>
          <p>
            At Samsung R&D, I worked on frontend components for internal CRM and workflow tools. In
            March 2026, I independently delivered Lagnam Matrimony for Smart Space Technologies—from
            requirements to its Google Play release.
          </p>
          <p>
            I use AI throughout my development process, alongside the full-stack foundations I built
            before it. New frameworks are an opportunity to learn; delivering a working product is
            the goal.
          </p>
          <p>
            Right now, I’m focusing on data structures, algorithms, and placement preparation.
            Longer term, I want to turn some of my own ideas into a business.
          </p>
          <Link href="/work/lagnam-matrimony" className="text-link">
            Explore the client project ↗
          </Link>
        </div>
      </section>
      <section className="about-toolkit">
        <span className="eyebrow">WHAT I WORK WITH</span>
        <div>
          <h2>THE TOOLKIT.</h2>
          {[
            { name: "Interfaces", items: "React · Next.js · React Native · TypeScript · Redux" },
            {
              name: "Behind the scenes",
              items: "Node.js · Express · MongoDB · PostgreSQL · Redis",
            },
            {
              name: "Connected experiences",
              items: "WebRTC · WebSockets · REST APIs · Payment integrations",
            },
            {
              name: "Exploration & delivery",
              items: "Python · Machine learning · Git · Docker · AWS",
            },
          ].map((group) => (
            <div className="toolkit-row" key={group.name}>
              <h3>{group.name}</h3>
              <p>{group.items}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="offscreen">
        <span className="eyebrow">WHEN THE EDITOR IS CLOSED</span>
        <h2>
          STILL
          <br />
          EXPLORING.
        </h2>
        <div>
          <p>
            Following the latest in AI. Finding the next corner of an open world in GTA V. A few
            rounds of PUBG. Heading out with friends.
          </p>
          <p>And occasionally writing down another startup idea before getting back to DSA.</p>
        </div>
      </section>
    </div>
  );
}
