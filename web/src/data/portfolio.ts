export type Project = {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  links?: {
    href: string;
    label: string;
  }[];
};

export type SocialLink = {
  href: string;
  label: string;
};

export const portfolio = {
  name: "Jose Muniz",
  headline: "Full-stack Developer (Next.js • React • TypeScript)",
  location: "",
  summary:
    "I build modern web applications with Next.js and TypeScript—focused on clean UX, reliable APIs, and maintainable systems.",
  cta: {
    primary: { href: "#projects", label: "View projects" },
    secondary: { href: "#contact", label: "Contact" },
  },
  about: {
    paragraphs: [
      "I like shipping practical features, improving performance, and simplifying complex codebases.",
      "I work primarily with Next.js (App Router), React, TypeScript, Node.js, and Tailwind, and I’m comfortable designing and integrating APIs.",
    ],
    skills: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs / Integrations",
      "SQL",
      "CI/CD",
    ],
  },
  projects: <Project[]>[
    {
      title: "Project One",
      description:
        "A concise description of what this project does and the problem it solves.",
      highlights: [
        "Built a responsive UI and reusable components",
        "Designed a clear data model and API contract",
        "Improved performance and reduced complexity",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind"],
      links: [
        { href: "https://github.com/josemunizdev", label: "GitHub" },
      ],
    },
    {
      title: "Project Two",
      description:
        "Another project description. Keep it short and focused on outcomes.",
      highlights: [
        "Implemented server-side rendering and caching strategy",
        "Added type-safe utilities and linting",
      ],
      tech: ["React", "TypeScript"],
      links: [{ href: "https://github.com/josemunizdev", label: "GitHub" }],
    },
  ],
  contact: {
    email: "your@email.com",
    social: <SocialLink[]>[
      { href: "https://github.com/josemunizdev", label: "GitHub" },
      { href: "https://www.linkedin.com", label: "LinkedIn" },
    ],
  },
} as const;
