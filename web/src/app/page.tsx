import Link from "next/link";

import { portfolio } from "@/data/portfolio";

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section
        aria-label="Intro"
        className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10"
      >
        <div className="grid gap-8 sm:grid-cols-5">
          <div className="space-y-6 sm:col-span-3">
            <div className="space-y-2">
              <p className="text-sm text-neutral-600">{portfolio.headline}</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {portfolio.name}
              </h1>
              {portfolio.location ? (
                <p className="text-sm text-neutral-600">{portfolio.location}</p>
              ) : null}
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
              {portfolio.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={portfolio.cta.primary.href}
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
              >
                {portfolio.cta.primary.label}
              </Link>

              <Link
                href={portfolio.cta.secondary.href}
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900"
              >
                {portfolio.cta.secondary.label}
              </Link>
            </div>
          </div>

          <aside className="space-y-3 sm:col-span-2">
            <p className="text-sm font-semibold text-neutral-900">Tech focus</p>
            <p className="text-sm text-neutral-700">
              The tools I use most often for product work.
            </p>
            <ul className="flex flex-wrap gap-2">
              {portfolio.about.skills.slice(0, 6).map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-800"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="about" aria-label="About" className="scroll-mt-24 space-y-6">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-neutral-700">
            A quick overview of what I do and how I work.
          </p>
        </header>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              {portfolio.about.paragraphs.map((p) => (
                <p key={p} className="leading-relaxed text-neutral-700">
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-900">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {portfolio.about.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        aria-label="Projects"
        className="scroll-mt-24 space-y-6"
      >
        <header className="space-y-2">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-neutral-700">
            A few recent builds—focused on outcomes and maintainability.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {portfolio.projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-700">{project.description}</p>
                </div>

                <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.links && project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" aria-label="Contact" className="scroll-mt-24 space-y-4">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-neutral-700">
            Want to collaborate or chat? The fastest way to reach me is email.
          </p>
        </header>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-neutral-900">Email</p>
              <Link
                href={`mailto:${portfolio.contact.email}`}
                className="text-sm text-neutral-900 underline underline-offset-4"
              >
                {portfolio.contact.email}
              </Link>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-neutral-900">Links</p>
              <ul className="flex flex-wrap gap-3">
                {portfolio.contact.social.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-sm text-neutral-900 underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
