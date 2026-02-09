import { Column, Heading, Meta, Schema, Text, Row, Grid } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="l" paddingTop="24" paddingX="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Hero Section */}
      <Column horizontal="center" gap="16" marginBottom="xl">
        <Text 
          variant="label-default-s" 
          onBackground="brand-medium"
          style={{ textTransform: "uppercase", letterSpacing: "0.2em" }}
        >
          Portfolio
        </Text>
        <Heading variant="display-strong-l" align="center">
          Featured Projects
        </Heading>
        <Text 
          variant="body-default-l" 
          onBackground="neutral-weak" 
          align="center"
          style={{ maxWidth: "600px" }}
        >
          A collection of projects I've built, from AI-powered applications to full-stack platforms
        </Text>
      </Column>
      
      {/* Projects Grid */}
      <Projects />
    </Column>
  );
}
