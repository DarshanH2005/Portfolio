"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Darshan H home">
        d<span className="wordmark-slash">/</span>h<span className="wordmark-period">.</span>
      </Link>
      <span className="header-caption">
        INDEPENDENT MIND.
        <br />
        ENGINEER BY CRAFT.
      </span>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="primary-nav"
        className={open ? "primary-nav is-open" : "primary-nav"}
        aria-label="Main navigation"
      >
        <Link
          href="/work"
          aria-current={pathname?.startsWith("/work") ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          Work <sup>05</sup>
        </Link>
        <Link
          href="/about"
          aria-current={pathname === "/about" ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          About
        </Link>
        <a href="/#contact" className="nav-contact" onClick={() => setOpen(false)}>
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
};
