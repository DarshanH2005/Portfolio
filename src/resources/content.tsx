import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Darshan",
  lastName: "H",
  name: `Darshan H`,
  role: "Full-Stack & Mobile Developer",
  avatar: "/images/avatar.jpg",
  email: "darshan1970h@gmail.com",
  location: "Asia/Kolkata", // Bengaluru, Karnataka, India
  languages: [], // Empty - using skills instead
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about web development and AI/ML</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/DarshanH2005",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/darshanh2005/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} | Full-Stack & Mobile Developer`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>From an idea to something real.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Lagnam Matrimony</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Independent client work
        </Text>
      </Row>
    ),
    href: "/work/lagnam-matrimony",
  },
  subline: (
    <>
      Full-Stack & Mobile Developer &{" "}
      <Text as="span" size="xl" weight="strong">
        AI/ML Enthusiast
      </Text>
      .
      <br />
      Previously at{" "}
      <Text as="span" weight="strong">
        Samsung R&D
      </Text>{" "}
      • Exploring{" "}
      <Text as="span" weight="strong">
        Machine Learning
      </Text>
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Bengaluru, India`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Darshan is a Bengaluru-based Full-Stack & Mobile Developer with a passion for building
        scalable web applications and exploring AI/ML technologies. Currently pursuing B.E in
        Information Science at Cambridge Institute of Technology, he completed a Frontend Developer
        Internship at Samsung R&D Institute India (July 2025–February 2026), followed by
        independently delivering Lagnam Matrimony for Smart Space Technologies in March 2026.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Samsung R&D Institute India - Bangalore",
        timeframe: "July 2025 - February 2026",
        role: "Frontend Developer Intern",
        achievements: [
          <>
            Developed pixel-perfect frontend UI components from Figma designs for Internal CRM &
            Workflow Management System.
          </>,
          <>
            Implemented React.js components for critical employee modules including Leave Requests
            and Asset Management.
          </>,
          <>
            Collaborated with design team using AI-assisted development (GitHub Copilot) to
            accelerate development velocity.
          </>,
          <>
            Optimized component performance and reusability through modular architecture. Ensured
            cross-browser compatibility and responsive design implementation.
          </>,
        ],
        images: [],
      },
      {
        company: "Algorand Blockchain Club CIT",
        timeframe: "September 2025 - Present",
        role: "Club Lead",
        achievements: [
          <>
            Led and managed the Algorand Blockchain Club at Cambridge Institute of Technology as
            Club Lead.
          </>,
          <>
            Orchestrated technical workshops, seminar sessions, and hands-on blockchain projects to
            build community engagement.
          </>,
          <>
            Developed strategic initiatives and collaborative learning programs for tech
            enthusiasts.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Cambridge Institute of Technology, Bangalore",
        description: <>B.E in Information Science (2023 - 2027) | CGPA: 8.4</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>
            Expert in building responsive, performant user interfaces with React.js, Next.js, and
            Redux.
          </>
        ),
        tags: [
          { name: "React.js", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "JavaScript", icon: "javascript" },
        ],
        images: [],
      },
      {
        title: "Backend Development",
        description: (
          <>
            Building scalable APIs and server-side applications with Node.js, Express.js, and
            MongoDB.
          </>
        ),
        tags: [
          { name: "Node.js", icon: "nodejs" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "Express.js", icon: "code" },
        ],
        images: [],
      },
      {
        title: "AI & Machine Learning",
        description: (
          <>
            Learning AI/ML with focus on Supervised Learning. Exploring Deep Learning, Unsupervised
            & Reinforcement Learning next.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "ML", icon: "sparkle" },
          { name: "Data Science", icon: "chart" },
        ],
        images: [],
      },
      {
        title: "DevOps & Cloud",
        description: (
          <>
            Experience with AWS services (EC2, S3, Lambda), Docker containerization, and CI/CD
            pipelines.
          </>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "Git", icon: "github" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about development and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full-stack projects and applications by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
