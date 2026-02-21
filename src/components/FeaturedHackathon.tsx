"use client";

import { useState, useRef } from "react";
import { Column, Row, Text, Heading, RevealFx, Button, Badge } from "@once-ui-system/core";
import styles from "./FeaturedHackathon.module.scss";

export const FeaturedHackathon = () => {
  const [tiltStyle, setTiltStyle] = useState({});
  const [showComingSoon, setShowComingSoon] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return (
    <RevealFx translateY="16" delay={0.2} fillWidth horizontal="center">
      <div 
        ref={cardRef}
        className={styles.hackathonCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        <Column gap="24" padding="32">
          {/* Top Badge/Banner */}
          <Column gap="8">
            <Row gap="12" vertical="center" wrap>
              <Badge
                background="warning-alpha-medium"
                paddingX="16"
                paddingY="8"
                onBackground="warning-strong"
                textVariant="label-strong-s"
                arrow={false}
                style={{
                  border: "1px solid var(--warning-alpha-medium)",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
                }}
              >
                🏆 1st Prize Winner - ₹25,000
              </Badge>
              <Text variant="label-default-s" onBackground="neutral-weak">
                CITI-ZEN 2026 TERRABYTE Hackathon @ Alliance University
              </Text>
            </Row>
          </Column>

          {/* Project Title & Team */}
          <Column gap="8">
            <Heading variant="display-strong-xs">
              Parisar-Netra: Autonomous Net-Zero Campus Intelligence System
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak" className={styles.teamText}>
              Team Detox: Darshan H, Gagan Hegde, Rohith G, Rajendra Kumar S, Sachin Sankole
            </Text>
          </Column>

          {/* Key Impact Metrics */}
          <Row gap="12" wrap>
            <Badge
              background="success-alpha-medium"
              paddingX="12"
              paddingY="8"
              onBackground="success-strong"
              textVariant="label-strong-s"
              arrow={false}
              style={{ border: "1px solid var(--success-alpha-medium)" }}
            >
              ⚡ Up to 15% Energy Reduction
            </Badge>
            <Badge
              background="success-alpha-medium"
              paddingX="12"
              paddingY="8"
              onBackground="success-strong"
              textVariant="label-strong-s"
              arrow={false}
              style={{ border: "1px solid var(--success-alpha-medium)" }}
            >
              ⏱️ &lt; 2 Month ROI
            </Badge>
            <Badge
              background="success-alpha-medium"
              paddingX="12"
              paddingY="8"
              onBackground="success-strong"
              textVariant="label-strong-s"
              arrow={false}
              style={{ border: "1px solid var(--success-alpha-medium)" }}
            >
              🌍 Offsets 0.82 kg CO2 per kWh
            </Badge>
          </Row>

          {/* Description */}
          <Text variant="body-default-m" onBackground="neutral-medium" style={{ lineHeight: "1.6" }}>
            Engineered an AI-driven cyber-physical platform that transforms campuses into 'Smart Energy Cells'. The system utilizes local Edge IoT sensors and Google Gemini's multimodal reasoning to autonomously eliminate 'Zombie Loads' through predictive HVAC optimization and dynamic daylight harvesting, directly advancing Bengaluru's Net-Zero climate goals.
          </Text>

          {/* Tech Stack Tags */}
          <Row gap="8" wrap>
            {["Next.js", "Node.js", "ESP32", "Embedded C++", "TensorFlow.js", "Gemini API"].map((tag) => (
              <Badge
                key={tag}
                background="neutral-alpha-medium"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                style={{ border: "1px solid var(--neutral-alpha-weak)" }}
              >
                {tag}
              </Badge>
            ))}
          </Row>

          {/* Call to Action */}
          <Row paddingTop="16" gap="16" vertical="center">
            <Button
              href="/work/parisar-netra-net-zero-campus"
              variant="primary"
              size="m"
              weight="default"
              arrowIcon
            >
              Read Case Study
            </Button>
            <div style={{ position: "relative" }}>
              <Button
                variant="secondary"
                size="m"
                weight="default"
                onClick={() => {
                  setShowComingSoon(true);
                  setTimeout(() => setShowComingSoon(false), 2000);
                }}
              >
                <Row gap="8" vertical="center">
                  <Text variant="label-strong-s">View Project</Text>
                </Row>
              </Button>
              {showComingSoon && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--surface-background)",
                    border: "1px solid var(--neutral-alpha-weak)",
                    borderRadius: "var(--radius-m, 8px)",
                    padding: "6px 12px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    animation: "fadeIn 0.2s ease-out",
                  }}
                >
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    🚀 Coming Soon
                  </Text>
                </div>
              )}
            </div>
          </Row>
        </Column>
      </div>
    </RevealFx>
  );
};
