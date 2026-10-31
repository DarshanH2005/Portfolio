import Link from "next/link";
import { selectedProjects } from "./projects";
export function ProjectShowcase({ all = false }: { all?: boolean }) {
  return (
    <div className="project-list">
      {selectedProjects.slice(0, all ? undefined : 3).map((project) => (
        <article className={"project-row " + project.className} key={project.slug}>
          <Link
            href={"/work/" + project.slug}
            className="project-visual"
            aria-label={"Explore " + project.name}
          >
            <div className="project-visual-top">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            {project.className === "glasscage" || project.className === "crashforge" ? (
              <div className="engineering-cover">
                <span className="eyebrow">
                  {project.className === "glasscage"
                    ? "OBSERVE / ATTRIBUTE / ENFORCE"
                    : "INJECT / DETECT / REDUCE / REPLAY"}
                </span>
                <strong>{project.name}</strong>
                <p>
                  {project.className === "glasscage"
                    ? "Every dependency has a boundary."
                    : "Find the failure. Keep the evidence."}
                </p>
                <span className="engineering-cover-detail">
                  {project.className === "glasscage"
                    ? "Package policies · Runtime inspection · Connection approvals"
                    : "Ledger invariants · Delta debugging · Regression exports"}
                </span>
              </div>
            ) : project.className === "lagnam" ? (
              <>
                <div className="lagnam-word">
                  lagnam<span>MATRIMONY</span>
                </div>
                <div className="app-screens">
                  <img
                    src="/images/projects/lagnam/screen-2.webp"
                    width="333"
                    height="592"
                    alt="Lagnam Matrimony Play Store product preview"
                    loading="lazy"
                  />
                  <img
                    src={project.image}
                    width="333"
                    height="592"
                    alt="Lagnam Matrimony: find a life partner"
                    loading="lazy"
                  />
                  <img
                    src="/images/projects/lagnam/screen-3.webp"
                    width="333"
                    height="592"
                    alt="Lagnam Matrimony app features"
                    loading="lazy"
                  />
                </div>
                <span className="visual-caption">
                  SMART SPACE TECHNOLOGIES · LIVE ON GOOGLE PLAY
                </span>
              </>
            ) : (
              <img
                className="project-cover"
                src={project.image}
                alt={
                  project.name +
                  (project.className === "parisar" ? " hackathon team" : " project interface")
                }
                loading="lazy"
              />
            )}
            <span className="project-open" aria-hidden="true">
              ↗
            </span>
          </Link>
          <div className="project-info">
            <span className="project-number">/{project.number}</span>
            <div>
              <h3>
                <Link href={"/work/" + project.slug}>{project.name}</Link>
              </h3>
              <p className="project-descriptor">{project.descriptor}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <Link className="text-link project-read" href={"/work/" + project.slug}>
              {project.className === "glasscage" || project.className === "crashforge"
                ? "Read technical brief"
                : "View project"} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
