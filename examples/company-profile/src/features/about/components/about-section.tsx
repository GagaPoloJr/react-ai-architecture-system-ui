import { SectionHeader } from "@shared/ui/molecules/section-header";
import type { CompanyInfo } from "../types";

const iconPaths: Record<string, React.ReactNode> = {
  rocket: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  target: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  eye: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  heart: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.5-1.5 2.5-3 2.5-5a4.5 4.5 0 0 0-9-1.5A4.5 4.5 0 0 0 4 9c0 2 1 3.5 2.5 5L12 21l7-7Z" />
    </svg>
  ),
};

interface AboutSectionProps {
  info: CompanyInfo;
}

export function AboutSection({ info }: AboutSectionProps) {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge="About"
          title={info.mission}
          description={info.story.slice(0, 180) + "..."}
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] overflow-hidden">
            <img
              src="/images/office.jpg"
              alt="Postlight office space"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="grid gap-6 content-start">
            {info.values.map((value, i) => (
              <div
                key={value.title}
                className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl p-8 lg:p-10 space-y-5 shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {iconPaths[value.icon] || iconPaths.heart}
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary tracking-tight">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
