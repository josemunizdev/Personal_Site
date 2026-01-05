# Mentor Notes (Next.js + React + TypeScript + Tailwind)

## What you have
- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind v4 via PostCSS

## What each technology is for (plain-English)

### Next.js
- A web application framework on top of React.
- Provides:
  - File-based routing (URLs come from files in `src/app/...`).
  - Layouts and nested UI composition (`layout.tsx`).
  - Server rendering and build output (static, server, or hybrid).
  - Production build pipeline (bundling, code-splitting, optimization).
  - Data-fetching patterns and caching controls (e.g., `fetch(..., { next: { revalidate } })`).

#### What Next.js is doing when you hit a page
When you visit a URL like `/` in your browser, you can think of it as a request/response pipeline:
1) **Browser requests a page**: `GET /`.
2) **Next.js matches the route** based on the folder/file structure under `src/app`.
3) **Next.js executes Server Components on the server** to produce HTML (and sometimes also produces data payloads used by React).
4) **Browser receives HTML + CSS + JS**:
  - HTML shows content immediately (good performance + SEO).
  - CSS styles the page.
  - JS is downloaded for any Client Components so they can become interactive.

This matters because “web dev” is not a single program running in one place:
- Some code runs on **the server** (Node.js environment).
- Some code runs in **the browser** (Chrome/Safari runtime).

#### App Router conventions (the files are the architecture)
In App Router, folder structure *is* routing:
- `src/app/page.tsx` → `/`
- `src/app/projects/page.tsx` → `/projects`
- `src/app/layout.tsx` → wraps every route below it

Common file types you’ll eventually use:
- `page.tsx`: a route (a screen).
- `layout.tsx`: shared wrapper UI for a segment of routes.
- `loading.tsx`: what to show while a route is loading.
- `error.tsx`: UI for runtime errors in that route segment.
- `not-found.tsx`: UI for 404s.

#### Rendering modes (why “static vs server” exists)
Next can produce pages in different ways depending on what you build:
- **Static**: HTML is generated at build time (fast, cacheable).
- **Server-rendered**: HTML is generated on demand per request (fresh data, more server work).
- **Hybrid**: parts are static; parts revalidate; some routes are dynamic.

In practice, you choose a mode by how you fetch data and which caching controls you use.

#### Data fetching and caching (the part people trip on)
Next extends `fetch` so you can control caching:
- `fetch(url)` may be cached depending on context.
- `fetch(url, { cache: "no-store" })` forces fresh data.
- `fetch(url, { next: { revalidate: 60 } })` says “cache it, but refresh at most every 60 seconds”.

If you come from API integration work: treat caching as an explicit contract. Decide what must be fresh vs what can be cached.

#### API routes (Route Handlers)
Next.js can also host APIs inside the same project:
- `src/app/api/health/route.ts` handles requests like `GET /api/health`.

This is useful for:
- A small backend for your site (contact form, health checks, proxying to other services).
- Keeping secrets on the server (call 3rd party APIs without exposing keys to the browser).

### React
- The UI library.
- You build your UI as components.
- React handles:
  - Rendering UI from state/props.
  - Updates when state changes.
  - Composition (small components combine into larger screens).

### TypeScript
- Adds types to JavaScript.
- Helps you catch mistakes early (wrong property names, wrong null handling, wrong function signatures).
- Makes refactors safer because the compiler points to broken call sites.

### Tailwind CSS
- A utility-first styling system.
- You style using class names like `px-4 py-2 text-sm` instead of writing lots of custom CSS files.
- Good for consistency and fast iteration; you can still add custom CSS when needed.

### PostCSS
- A CSS processing step used during builds.
- In your project it enables Tailwind v4’s PostCSS plugin.

### Node.js + npm (and why they exist together)

#### Node.js is not “the compiler”
- **Node.js is a runtime**: it executes JavaScript programs outside the browser.
- It exists because modern web development uses lots of tooling that needs to run on your machine (or CI): dev servers, bundlers, linters, test runners, code generators.
- Next.js itself is a program that runs on Node during development/build.

#### npm is not “the compiler” either
- **npm is a package manager + task runner**.
- It does two big jobs:
  - **Installs dependencies** into `node_modules/` based on `package.json` (and locks them via `package-lock.json`).
  - **Runs project scripts** defined in `package.json` (e.g., `npm run dev`).

#### How they work together (what actually happens)
When you run `npm run dev`:
1) npm looks up the `dev` script in `package.json`.
2) npm finds the `next` executable in `node_modules/.bin/next`.
3) npm starts it.
4) **Node.js** is the runtime that actually executes that `next` program.

So: **npm launches tools; Node runs them.**

### What is the “compiler” in this stack?
In web dev there are usually multiple compile-like steps:

#### TypeScript
- TypeScript has a compiler (`tsc`), but in most Next.js setups it’s used primarily for **type-checking**.
- Your TypeScript (`.ts/.tsx`) still needs to become JavaScript the browser can run.

#### Next.js build tooling (transpilation + bundling)
- Next.js uses its own toolchain to:
  - **Transpile** your code (TS/JS/JSX/TSX → browser/server-compatible JS).
  - **Bundle** code into optimized chunks for the browser.
  - **Optimize** output (minify, code-split, tree-shake, etc.).
- In current Next versions, the heavy lifting is typically done by **SWC** (a fast compiler written in Rust) and/or **Turbopack** in dev.

#### Tailwind + PostCSS
- Your Tailwind usage is also a “compile step”: Tailwind scans your files and generates the CSS you actually ship.
- PostCSS is the pipeline mechanism Tailwind plugs into here.

### Node.js + npm (practical summary)
- **Node.js**: runs Next.js and tooling.
- **npm**: installs tooling and invokes it.
- **Next.js toolchain**: performs transpilation/bundling/optimization.
- **TypeScript**: enforces types (and participates in builds as checks).
- **Tailwind/PostCSS**: turns utility classes into real CSS.

### ESLint
- Static analysis for JavaScript/TypeScript.
- Catches common bugs and enforces consistency (especially in React/Next projects).

### (Optional) Prettier
- Code formatter (auto-formats files to a consistent style).
- Not required for correctness; it reduces style debates and keeps diffs clean.
- If/when you add it, you’ll typically run it on save or via `npm run format`.

## Rules of thumb (keep you out of trouble)

### Server vs Client Components (critical concept)
- In the App Router, files are **Server Components by default**.
- Use a Server Component when you want:
  - Data fetching on the server.
  - Rendering without shipping extra JS to the browser.
  - Access to server-only resources (DB, private APIs) *without exposing secrets*.
- Add `"use client"` only when you need browser-only behavior:
  - React hooks like `useState`, `useEffect`.
  - Click handlers, form interactivity.
  - Access to `window`, `document`, `localStorage`.

### Practical constraints
- Don’t put secrets in components or committed files. Use `.env*` (ignored by git) for secrets.
- Keep components small: one component = one responsibility.
- Prefer server data-fetching; keep client state minimal.

## An API-first way to think about the app (useful if you’ve built integrations)

### Two kinds of “calls” exist in a web app
1) **Browser → Next.js** (page requests and API calls)
  - Page request: `GET /projects`
  - API request: `POST /api/contact`
2) **Next.js (server) → external services**
  - Example: `fetch("https://api.github.com/...", { headers: { Authorization: ... } })`

The key idea: the browser is an untrusted client. Anything you don’t want exposed (API keys, privileged calls) must live on the server side.

### Where API design shows up in a personal site
Even a portfolio site often has “API concerns”:
- **Contact form**: needs validation, rate-limiting (later), safe error handling.
- **Projects list**: might come from a data file today; later from GitHub API.
- **Analytics/events**: should not block page rendering.

### Contracts and validation
Treat request/response shapes as contracts:
- Define a TypeScript type for inputs and outputs.
- Validate inputs at runtime in route handlers (because TypeScript types do not run at runtime).

## What happens when you run the common commands

### `npm run dev`
- Starts the Next.js development server.
- Watches your files; recompiles as you edit.
- Serves the app at `http://localhost:3000` (or the next available port).

### `npm run build`
- Produces an optimized production build.
- Runs type-checking as part of the build (your build output will fail on TypeScript errors).
- Generates server/static artifacts in `.next/`.

### `npm run lint`
- Runs ESLint across your project.
- This is separate from building: you can have code that builds but fails lint (or vice versa).

## Templates

### 1) Server Component page with data fetch
```tsx
// src/app/example/page.tsx

type Todo = { id: number; title: string };

async function getTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
    // Next.js caching; remove if you want always-fresh
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.status}`);
  }

  return (await res.json()) as Todo[];
}

export default async function ExamplePage() {
  const todos = await getTodos();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Example</h1>
      <ul className="list-disc pl-6 text-neutral-800">
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 2) Client Component with state
```tsx
// src/components/Counter.tsx

"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="rounded border border-neutral-300 px-3 py-1 text-sm"
        onClick={() => setCount((c) => c - 1)}
      >
        -
      </button>
      <span className="tabular-nums">{count}</span>
      <button
        type="button"
        className="rounded border border-neutral-300 px-3 py-1 text-sm"
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
    </div>
  );
}
```

### 3) Route handler (API endpoint)
```ts
// src/app/api/health/route.ts

export function GET() {
  return Response.json({ ok: true, ts: new Date().toISOString() });
}
```

### 4) Route handler with basic validation (contact-style)
```ts
// src/app/api/contact/route.ts

type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseContactRequest(body: unknown): ContactRequest {
  if (typeof body !== "object" || body === null) {
    throw new Error("Invalid JSON body");
  }

  const record = body as Record<string, unknown>;

  const name = record.name;
  const email = record.email;
  const message = record.message;

  if (!isNonEmptyString(name)) throw new Error("Missing name");
  if (!isNonEmptyString(email)) throw new Error("Missing email");
  if (!isNonEmptyString(message)) throw new Error("Missing message");

  return { name: name.trim(), email: email.trim(), message: message.trim() };
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const contact = parseContactRequest(json);

    // You would send email / write to DB / call an external API here.
    // Keep secrets on the server via env vars.

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
```

## Reference material (high-signal)
- Next.js App Router: https://nextjs.org/docs/app
- React (thinking in components/state): https://react.dev/learn
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Tailwind v4 docs: https://tailwindcss.com/docs

## Suggested learning path (build your site while learning)
1) Layout + Navbar + one page
2) Add a Projects page from a typed data file
3) Add an API route (health/contact)
4) Add a simple form (client component) + validation
5) Deploy (Vercel) + basic SEO metadata
