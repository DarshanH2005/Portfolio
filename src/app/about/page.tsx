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
            Build with intent.
            <br />
            Verify with evidence.
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
            I use AI-assisted development with responsibility for the result. That means defining
            what should be built, providing useful context, reviewing proposed changes, and checking
            where the system fails. Generated code is a starting point for engineering judgment.
          </p>
          <p>
            Glass Cage explores how dependencies behave at runtime and how access can be controlled.
            CrashForge injects faults into tool-using agents, checks independent invariants, and
            turns failures into replayable regression evidence. These projects reflect where I want
            to go deeper: security boundaries, observability, and trustworthy delivery.
          </p>
          <Link href="/work/lagnam-matrimony" className="text-link">
            Explore the client project ↗
          </Link>
          <p>
            <a href="/darshan-h-resume.pdf" className="text-link" download>
              Download my resume ↗
            </a>
          </p>
        </div>
      </section>
      <section className="about-toolkit">
        <span className="eyebrow">WHAT I WORK WITH</span>
        <div>
          <h2>THE TOOLKIT.</h2>
          {[
            {
              name: "Product engineering",
              items: "React · Next.js · React Native/Expo · TypeScript · Node.js · REST APIs",
            },
            {
              name: "Reliability & security",
              items:
                "pytest · Fault injection · Regression replay · Linux · seccomp/eBPF · Runtime access policies",
            },
            {
              name: "AI & evaluation",
              items:
                "Tool-using agents · Agent evaluation · PyTorch · scikit-learn · Embeddings · RAG",
            },
            {
              name: "Data & delivery",
              items:
                "Python · SQL · PostgreSQL · SQLite · MongoDB · Git · Docker · AWS · VPS deployment",
            },
          ].map((group) => (
            <div className="toolkit-row" key={group.name}>
              <h3>{group.name}</h3>
              <p>{group.items}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-story">
        <span className="eyebrow">HOW I APPROACH THE WORK</span>
        <div>
          <h2>Context. Judgment. Accountability.</h2>
          <p>
            I start with the user, constraints, and a definition of success. That context guides
            both my own implementation and the tasks I give AI tools.
          </p>
          <p>
            I review boundaries where mistakes have consequences: access to files, authentication,
            payments, retries, and persistent state. A plausible response is not enough; I look for
            observable behavior and independent checks.
          </p>
          <p>
            When something fails, I want a small reproducer and a regression check. CrashForge is a
            concrete expression of that approach. I am continuing to develop these skills through
            shipped work, rather than treating a tool list as proof of expertise.
          </p>
          <p>
            My AI Biometric Attendance System combines 128-dimensional facial embeddings and an SVM
            classifier with speaker verification. Teacher and student workflows connect to Supabase
            PostgreSQL, with bcrypt password hashing and QR-code onboarding.
          </p>
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
