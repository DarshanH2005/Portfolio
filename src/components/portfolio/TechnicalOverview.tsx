"use client";

import { useState } from "react";
import styles from "./TechnicalOverview.module.css";

const studies = {
  glass: {
    label: "RUNTIME SECURITY",
    title: "Installed does not mean authorized.",
    summary:
      "Glass Cage connects package-level context to runtime activity, access policies, and an inspection interface. The engineering problem is preserving who initiated an action when many dependencies share one process.",
    question: "Which package performed this action, and was it allowed?",
    stages: [
      ["Application", "Node.js / Python", "Third-party code executes inside a host application."],
      [
        "Attribution",
        "Package + async context",
        "Associate sensitive activity with its initiating dependency.",
      ],
      [
        "Policy boundary",
        "Observe / restrict",
        "Evaluate file and network activity against access rules.",
      ],
      [
        "Investigation",
        "React / Three.js",
        "Inspect connections, stack traces, alerts, and approvals.",
      ],
    ],
    scenarios: [
      {
        name: "Sensitive file",
        action: "read /app/.env",
        identity: "example-dependency",
        policy: "Sensitive configuration is outside this package’s allowed access.",
        decision: "RESTRICT",
        detail:
          "A file-access decision needs the resource identity and package context. A syscall name alone does not identify either.",
        trace: [
          "01  Dependency initiates a file read",
          "02  Runtime context attributes the request",
          "03  Access policy evaluates the resource",
          "04  Restricted attempt is available for investigation",
        ],
      },
      {
        name: "Network request",
        action: "connect collector.example:443",
        identity: "example-dependency",
        policy: "The outbound destination is not authorized for this package.",
        decision: "REVIEW",
        detail:
          "Connection approval is an explicit policy decision. The destination’s location is investigation context, not a verdict about whether it is safe.",
        trace: [
          "01  Package initiates an outbound connection",
          "02  Destination and package context are inspected",
          "03  Existing access policy determines the outcome",
          "04  An operator can inspect the trace and review access",
        ],
      },
      {
        name: "Suspicious DNS",
        action: "resolve x7k9p2m8q.example",
        identity: "example-dependency",
        policy: "High domain-name entropy raises an investigation signal.",
        decision: "ALERT",
        detail:
          "High entropy is a heuristic. Legitimate generated domains can look random; an alert is not proof of exfiltration.",
        trace: [
          "01  A domain lookup is observed",
          "02  Domain-name randomness contributes a signal",
          "03  The event is associated with runtime context",
          "04  Review the signal alongside other evidence",
        ],
      },
    ],
  },
  crash: {
    label: "AGENT RELIABILITY",
    title: "A timeout is not proof of failure.",
    summary:
      "CrashForge tests agents that call tools with persistent side effects. It introduces faults, checks independent state, and reduces failing plans into replayable regression evidence.",
    question: "Did the tool fail, or did only its response fail?",
    stages: [
      ["Fault plan", "Controlled injection", "Choose the tool boundary and failure conditions."],
      ["Agent + tools", "Execute under faults", "Observe retries and external side effects."],
      [
        "Independent oracle",
        "Ledger invariants",
        "Check state rather than trusting the agent’s answer.",
      ],
      [
        "Regression",
        "Reduce / persist / replay",
        "Keep a smaller reproducer and offline evidence.",
      ],
    ],
    scenarios: [
      {
        name: "After-commit timeout",
        action: "booking.create → commit → timeout",
        identity: "tool-using agent",
        policy: "One requested booking must not produce duplicate side effects.",
        decision: "CHECK LEDGER",
        detail:
          "The server commits the operation before the response is lost. A retry can repeat the effect; the independent ledger reveals whether it did.",
        trace: [
          "01  First tool call commits the booking",
          "02  Injected timeout hides the successful response",
          "03  Agent decides whether and how to retry",
          "04  Ledger invariant checks for duplicate effects",
        ],
      },
      {
        name: "Stale read",
        action: "booking.status → outdated state",
        identity: "tool-using agent",
        policy: "A stale observation must not justify an unchecked duplicate write.",
        decision: "CHECK STATE",
        detail:
          "An outdated result can mislead the agent about what already happened. CrashForge evaluates the resulting side effects against independent state.",
        trace: [
          "01  A read returns an older view of state",
          "02  Agent reasons from the stale observation",
          "03  Subsequent tool actions are recorded",
          "04  Independent invariants evaluate the result",
        ],
      },
      {
        name: "Malformed result",
        action: "tool.result → unexpected structure",
        identity: "tool-using agent",
        policy: "Unexpected output should not silently become a successful operation.",
        decision: "INSPECT TRACE",
        detail:
          "Fault injection exposes how the agent handles an invalid tool response. Trace evidence makes the outcome inspectable and repeatable.",
        trace: [
          "01  A tool response is replaced with malformed data",
          "02  Agent handles or propagates the bad result",
          "03  Execution evidence is persisted",
          "04  Failing plans can be reduced and replayed",
        ],
      },
    ],
  },
};

export function TechnicalOverview({ kind }: { kind: "glass" | "crash" }) {
  const [selected, setSelected] = useState(0);
  const study = studies[kind];
  const scenario = study.scenarios[selected];
  return (
    <section className={styles.overview} aria-label="Technical project overview">
      <div className={styles.readingRoute}>
        <span>5-MINUTE TECHNICAL BRIEF</span>
        <a href="#system-map">01 Architecture</a>
        <a href="#runtime-example">02 Execution trace</a>
        <a href="#engineering-notes">03 Decisions & limits</a>
      </div>
      <div className={styles.thesis}>
        <span className={styles.label}>{study.label} / THE CENTRAL QUESTION</span>
        <h2>{study.title}</h2>
        <p>{study.summary}</p>
        <blockquote>{study.question}</blockquote>
      </div>
      <section id="system-map" className={styles.section} aria-labelledby="architecture-title">
        <div className={styles.sectionTitle}>
          <span>01 / SYSTEM MAP</span>
          <h2 id="architecture-title">From execution to evidence.</h2>
        </div>
        <p className={styles.caption}>
          Conceptual flow of the project’s responsibilities; not a deployment topology.
        </p>
        <ol className={styles.pipeline}>
          {study.stages.map(([name, technology, detail], index) => (
            <li key={name}>
              <span className={styles.step}>0{index + 1}</span>
              <h3>{name}</h3>
              <code>{technology}</code>
              <p>{detail}</p>
              {index < 3 && (
                <span className={styles.connector} aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
      <section id="runtime-example" className={styles.section} aria-labelledby="trace-title">
        <div className={styles.sectionTitle}>
          <span>02 / FOLLOW THE BOUNDARY</span>
          <h2 id="trace-title">Walk through an execution.</h2>
        </div>
        <fieldset className={styles.choices}>
          <legend>Choose a scenario</legend>
          {study.scenarios.map((item, index) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {item.name}
            </button>
          ))}
        </fieldset>
        <div className={styles.tracePanel} aria-live="polite" aria-atomic="true">
          <div className={styles.traceHeader}>
            <span>ILLUSTRATIVE TRACE · NOT LIVE TELEMETRY</span>
            <span className={styles.verdict}>{scenario.decision}</span>
          </div>
          <div className={styles.traceGrid}>
            <div className={styles.event}>
              <span className={styles.label}>ACTOR</span>
              <p>{scenario.identity}</p>
              <span className={styles.label}>OPERATION</span>
              <code>{scenario.action}</code>
              <span className={styles.label}>POLICY / INVARIANT</span>
              <p>{scenario.policy}</p>
            </div>
            <ol className={styles.trace}>
              {scenario.trace.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
          <p className={styles.takeaway}>{scenario.detail}</p>
        </div>
      </section>
      <div id="engineering-notes" className={styles.notesAnchor}>
        <span className={styles.label}>03 / ENGINEERING DECISIONS & LIMITS</span>
      </div>
    </section>
  );
}
