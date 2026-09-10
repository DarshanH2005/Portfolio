import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home, person } from "./index";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = process.env.NEXT_PUBLIC_SITE_URL || "https://darshanh.me";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": false, // Disabled blog for cleaner portfolio
  "/gallery": false, // Disabled gallery for now
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: false,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes: ProtectedRoutesConfig = {};

// A compact editorial system: condensed geometry for display, calm text, and a precise mono layer.
import { Archivo, DM_Mono, Manrope } from "next/font/google";

const heading = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const label = Manrope({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const code = DM_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// Premium dark theme with sleek violet/indigo accent
const style: StyleConfig = {
  theme: "dark", // Force dark mode for premium feel
  neutral: "slate", // Slate gives a more premium, modern look
  brand: "violet", // Violet - modern, tech-forward color
  accent: "indigo", // Indigo accent - subtle and premium
  solid: "contrast", // High contrast for readability
  solidStyle: "plastic", // Plastic gives depth and premium feel
  border: "rounded", // Clean rounded corners
  surface: "translucent", // Glassmorphism effect
  transition: "all", // Smooth transitions everywhere
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // Gradient for modern charts
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

// Premium effects - gradient glow and subtle patterns
const effects: EffectsConfig = {
  mask: {
    cursor: true, // Enable cursor glow effect
    x: 50,
    y: 0,
    radius: 150,
  },
  gradient: {
    display: true, // Enable background gradient
    opacity: 60,
    x: 50,
    y: 0,
    width: 100,
    height: 60,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 20, // Subtle dot pattern
    size: "2",
    color: "brand-on-background-weak",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "brand-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

// Schema data for SEO
const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: person.name,
  description: home.description,
  email: person.email,
};

// Social links for SEO
const sameAs: SameAsConfig = {
  linkedin: "https://www.linkedin.com/in/darshanh2005/",
  threads: "",
  discord: "",
};

// Social sharing configuration
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: true,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
