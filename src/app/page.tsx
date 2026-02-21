import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { FeaturedHackathon } from "@/components/FeaturedHackathon";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {/* Internship Highlight Badge */}
          <RevealFx
            fillWidth
            horizontal="center"
            paddingTop="16"
            paddingBottom="24"
          >
            <Badge
              background="brand-alpha-medium"
              paddingX="16"
              paddingY="8"
              onBackground="brand-strong"
              textVariant="label-strong-s"
              arrow={false}
              style={{
                border: "1px solid var(--brand-alpha-medium)",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              }}
            >
              <Row gap="8" vertical="center">
                <Text 
                  style={{ 
                    width: "8px", 
                    height: "8px", 
                    borderRadius: "50%", 
                    background: "#22c55e",
                    animation: "pulse 2s infinite",
                  }} 
                />
                <Text>Currently @ Samsung R&D Institute India</Text>
              </Row>
            </Badge>
          </RevealFx>

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <div style={{ 
                    overflow: "hidden", 
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    marginRight: "8px",
                    marginLeft: "-0.75rem",
                    flexShrink: 0
                  }}>
                    <img 
                      src={person.avatar} 
                      alt="avatar"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        objectPosition: "center",
                        transform: "scale(1.3)"
                      }} 
                    />
                  </div>
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      
      {/* Featured Hackathon Win */}
      <FeaturedHackathon />

      {/* Featured Project */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      
      {/* More Projects */}
      <Projects range={[2]} />
    </Column>
  );
}
