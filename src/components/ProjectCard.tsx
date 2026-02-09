"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Row,
  Badge,
} from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  github?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  github,
}) => {
  return (
    <Column 
      fillWidth 
      gap="m" 
      className={styles.projectCard}
      style={{
        background: "var(--surface-background)",
        borderRadius: "var(--radius-l)",
        overflow: "hidden",
        border: "1px solid var(--neutral-alpha-weak)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Project Image */}
      <div style={{ position: "relative" }}>
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
        {/* Gradient Overlay */}
        <div 
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to top, var(--page-background), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
      
      {/* Project Info */}
      <Flex
        direction="column"
        fillWidth
        paddingX="l"
        paddingTop="8"
        paddingBottom="l"
        gap="m"
      >
        {/* Title & Badge Row */}
        <Row fillWidth gap="12" vertical="center" wrap>
          {title && (
            <Heading as="h2" wrap="balance" variant="heading-strong-l">
              {title}
            </Heading>
          )}
        </Row>
        
        {/* Description */}
        {description?.trim() && (
          <Text 
            wrap="balance" 
            variant="body-default-m" 
            onBackground="neutral-weak"
            style={{ lineHeight: 1.6 }}
          >
            {description}
          </Text>
        )}
        
        {/* Actions Row */}
        <Row gap="16" wrap paddingTop="8" vertical="center">
          {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="s" reverse />}
          
          <Row gap="24" style={{ marginLeft: "auto" }}>
            {content?.trim() && (
              <SmartLink
                suffixIcon="arrowRight"
                style={{ margin: "0", width: "fit-content" }}
                href={href}
              >
                <Text variant="label-strong-s">Case Study</Text>
              </SmartLink>
            )}
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="label-strong-s">Live Demo</Text>
              </SmartLink>
            )}
            {github && (
              <SmartLink
                suffixIcon="github"
                style={{ margin: "0", width: "fit-content" }}
                href={github}
              >
                <Text variant="label-strong-s">GitHub</Text>
              </SmartLink>
            )}
          </Row>
        </Row>
      </Flex>
    </Column>
  );
};
