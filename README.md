# Hacker News Reader

A fast, accessible Hacker News client built with React and TypeScript. Browse the front page, read threaded discussions and keep reading offline as an installable Progressive Web App.

It started as a Create React App project and has since been rebuilt with modern tooling (Vite, React 19, function components and hooks).

## Features

- **Front page and threaded comments**: browse the top 30 stories and read full discussion threads, with each reply level colour-coded
- **Two-column on desktop, single view on mobile**: the story list and article sit side by side on wide screens; on phones you move between them, and the browser's back gesture closes an open story
- **Keyboard shortcuts**: `J`/`K` to move between stories, `N` to jump to the next comment thread, `A` to jump to the article and `Esc` to close it. Press `Ctrl` + `/` (`⌘` + `/` on macOS) for a help panel where the shortcuts can also be switched off
- **Next-thread button**: a floating button that skips to the next top-level comment thread
- **Light and dark themes**: follows the system preference by default, and remembers your choice
- **Installable and offline-ready**: the app shell is cached by a service worker, and stories and comments you've already loaded stay available without a connection

## Tech stack

| Area          | Tools                                                                 |
| ------------- | --------------------------------------------------------------------- |
| UI            | React 19 (function components and hooks)                              |
| Language      | TypeScript (strict mode)                                              |
| Build         | Vite                                                                  |
| Styling       | Plain CSS with native nesting and custom properties, no CSS framework |
| Data          | [Hacker News Search API by Algolia](https://hn.algolia.com/api)       |
| Offline / PWA | `vite-plugin-pwa` (Workbox)                                           |
| Security      | DOMPurify                                                             |
| Code quality  | Oxlint, Prettier                                                      |

## Engineering highlights

### Accessibility

Accessibility was treated as a feature rather than an afterthought. The app has been audited with axe-core in both themes and at mobile and desktop sizes, with no automated violations.

- Semantic structure: one `h1`, a logical heading outline, labelled `header`, `nav`, `main` and `article` landmarks, and comment threads as nested lists so screen readers announce reply depth
- Fully keyboard operable, with visible focus styles. Focus is managed deliberately when views change, for example moving to the article on mobile and returning to the selected story when going back
- Colour contrast checked against WCAG AA in both themes, and links are underlined so they don't rely on colour alone
- Loading states are announced to screen readers through a live region, and the page title updates with the open story
- Keyboard shortcuts can be switched off (WCAG 2.1.4), and smooth scrolling respects `prefers-reduced-motion`

### Security

Comment bodies arrive as HTML from a third-party API. Rather than trusting them, every comment is sanitised with DOMPurify against an allowlist of the few tags Hacker News actually produces (`p`, `a`, `i`, `pre`, `code`). This strips scripts, event handlers and `javascript:` URLs, and forces outbound links to open safely with `rel="noopener noreferrer"`.

### Offline support

Workbox precaches the app shell so the app opens without a connection. API requests use a network-first strategy with a short timeout, so you get fresh data when online and the last cached copy when not. The service worker is published at the same URL as the original Create React App worker, so users who still have the old version installed are upgraded automatically rather than stuck on a stale cached build.

### Code organisation

- Behaviour lives in small custom hooks (`useKeyboardShortcuts`, `useTheme`, `useNextThread`), which keeps components focused on rendering
- Raw API responses are mapped into the app's own `Post` and `Comment` types in a single module (`src/api/hackerNews.ts`), so the rest of the app doesn't depend on the API's shape
- Race conditions are handled explicitly; for example, comment responses for a story you've already navigated away from are discarded

## Project structure

```
src/
├── api/          # Hacker News API client and response mapping
├── components/   # UI components, each with its own stylesheet
├── hooks/        # Reusable behaviour (shortcuts, theme, thread navigation)
├── models/       # Post and Comment types
└── utils/        # HTML sanitising and platform helpers
```

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/ZaphodAndo/hacker-news.git
cd hacker-news
npm install
npm run dev
```

| Script            | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `npm run dev`     | Start the development server                                          |
| `npm run build`   | Type-check and build for production                                   |
| `npm run preview` | Serve the production build locally (needed to try the service worker) |
| `npm run lint`    | Lint with Oxlint                                                      |
| `npm run format`  | Format with Prettier                                                  |

## Roadmap

- Automated tests (unit tests for the hooks and API mapping, and end-to-end accessibility checks)
- Collapsible comment threads
- Showing the body text of Ask HN posts
- Clearer error states when the API can't be reached
