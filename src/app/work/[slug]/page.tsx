import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts } from "@/utils/utils";
import { selectedProjects } from "@/components/portfolio/projects";
export async function generateStaticParams() {
  return getPosts(["src", "app", "work", "projects"]).map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);
  if (!post) return {};
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: { images: post.metadata.images[0] ? [post.metadata.images[0]] : [] },
  };
}
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);
  if (!post) notFound();
  const index = selectedProjects.findIndex((project) => project.slug === slug);
  const project = selectedProjects[index];
  const next = selectedProjects[(index + 1) % selectedProjects.length];
  const lagnam = slug === "lagnam-matrimony";
  return (
    <article className="project-detail">
      <Link href="/work" className="detail-back">
        ← ALL PROJECTS
      </Link>
      <header className="detail-head">
        <span className="eyebrow">
          {project?.category || "SELECTED WORK"} / {project?.year}
        </span>
        <h1>{post.metadata.title}</h1>
        <p className="detail-summary">{post.metadata.summary}</p>
        <div className="detail-meta">
          <div>
            <span>CONTRIBUTION</span>
            {post.metadata.team?.[0]?.role || "Developer"}
          </div>
          {lagnam && (
            <>
              <div>
                <span>CLIENT</span>Smart Space Technologies
              </div>
              <div>
                <span>DELIVERED</span>March 2026 · ~15 days
              </div>
            </>
          )}
          <div>
            <span>TECHNOLOGY</span>
            {project?.tags.join(" / ")}
          </div>
        </div>
        <div className="detail-links">
          {post.metadata.link && (
            <a
              className="text-link"
              href={post.metadata.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lagnam ? "View on Google Play" : "Visit project"} ↗
            </a>
          )}
          {post.metadata.github && (
            <a
              className="text-link"
              href={post.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code ↗
            </a>
          )}
        </div>
      </header>
      {post.metadata.images.length > 0 && (
        <div className={lagnam ? "detail-gallery mobile-gallery" : "detail-gallery"}>
          {post.metadata.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={
                post.metadata.title +
                " — " +
                (lagnam ? "Play Store screenshot " : "project image ") +
                (i + 1)
              }
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      )}
      <div className="detail-body">
        <MDXRemote source={post.content} />
      </div>
      <Link href={"/work/" + next.slug} className="next-project">
        <span>NEXT PROJECT / {next.number}</span>
        <strong>{next.name} ↗</strong>
      </Link>
    </article>
  );
}
