import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, ArrowIcon } from "@shared/ui/atoms/button";
import { cn } from "@shared/utils/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 bg-white/70 backdrop-blur-xl border border-[rgba(99,102,241,0.1)] rounded-2xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_4px_24px_rgba(99,102,241,0.06)] hidden md:block max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 h-14">
          <Link
            to="/"
            className="text-sm font-medium text-text-primary tracking-tight"
          >
            Postlight<span className="text-accent">.</span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  location.pathname === link.href
                    ? "text-accent bg-accent/5"
                    : "text-text-secondary hover:text-accent hover:bg-accent/5",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button variant="primary" size="sm" asChild>
            <Link to="/contact">
              Get started
              <ArrowIcon />
            </Link>
          </Button>
        </div>
      </header>

      <div className="md:hidden">
        <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 h-14 bg-white/70 backdrop-blur-xl border border-[rgba(99,102,241,0.1)] rounded-2xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_4px_24px_rgba(99,102,241,0.06)]">
          <Link to="/" className="text-sm font-medium text-text-primary tracking-tight">
            Postlight<span className="text-accent">.</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative size-9 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-full bg-text-secondary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isOpen && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-text-secondary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 bottom-0 h-[1.5px] w-full bg-text-secondary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isOpen && "top-1/2 -translate-y-1/2 -rotate-45 bottom-auto",
                )}
              />
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-display text-3xl font-semibold tracking-tight transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-text-secondary hover:text-accent",
                )}
                style={{ animation: `slide-up 0.5s ease-out ${i * 0.1}s both` }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="pt-8"
              style={{ animation: "slide-up 0.5s ease-out 0.4s both" }}
            >
              <Button variant="primary" size="lg" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get started
                  <ArrowIcon />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
