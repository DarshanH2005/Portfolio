import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fonts, baseURL } from "@/resources";
export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: { default: "Darshan H — Engineer. Builder. Explorer.", template: "%s — Darshan H" },
  description:
    "Full-stack and mobile developer in Bengaluru. Explore Lagnam Matrimony, my Samsung R&D internship, and experiments across web, AI and IoT.",
  openGraph: {
    title: "Darshan H — Selected Work",
    description:
      "From an idea to something people use. Full-stack engineering, mobile products, and experiments.",
    images: ["/images/chrome-knot.webp"],
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={[
          fonts.heading.variable,
          fonts.body.variable,
          fonts.label.variable,
          fonts.code.variable,
        ].join(" ")}
      >
        <Providers>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
