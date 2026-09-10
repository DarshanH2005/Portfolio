import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
export const metadata: Metadata = {
  title: "Selected Work",
  description: "Client products, full-stack projects and AI experiments by Darshan H.",
};
export default function Work() {
  return (
    <section className="work-section work-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A SELECTION OF THINGS I’VE BUILT / 2024—2026</span>
          <h1>
            WORK IN
            <br />
            <span className="outline-type">THE WORLD.</span>
          </h1>
        </div>
        <p>
          From a client’s first brief
          <br />
          to that final deployment.
        </p>
      </div>
      <ProjectShowcase all />
    </section>
  );
}
