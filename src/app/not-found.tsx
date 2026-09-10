import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found-page">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        OFF THE
        <br />
        <span className="outline-type">MAP.</span>
      </h1>
      <p>This page doesn’t exist. Let’s get you back to the work.</p>
      <Link href="/work" className="round-link">
        <span>Explore my projects</span>
        <span className="round-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
    </section>
  );
}
