# Mentor Notes (Next.js + React + TypeScript + Tailwind)

## What you have
- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind v4 via PostCSS

## How to think (mapping from your background)
- **Java classes → React components**: components are functions from `props` → UI.
- **SQL rows → TypeScript types**: define the “shape” of data you expect.
- **MuleSoft flows → request/response boundaries**: in Next.js, server components + route handlers handle IO.
- **PeopleCode events → React render cycle**: UI is a pure projection of state.

## Rules of thumb (keep you out of trouble)
- Default to **Server Components** (no `"use client"`) unless you need:
  - local state (`useState`), effects (`useEffect`), event handlers, browser-only APIs.
- Fetch data **in server components** when possible.
- Keep components small: one component = one responsibility.

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
