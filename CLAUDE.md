# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Project Management MVP web app: a Kanban board with AI chat sidebar. Users sign in (hardcoded: `user` / `password`), see their board, and can ask the AI to create/move/edit cards. Runs as a single Docker container locally.

Read `docs/PLAN.md` before starting any implementation work. Update `docs/PLAN.md` and `check_log.md` after completing each phase.

## Commands

### Frontend (`frontend/`)
```bash
npm run dev          # Dev server
npm run build        # Static export to out/
npm run lint         # ESLint
npm run test:unit    # Vitest (unit/component)
npm run test:e2e     # Playwright (e2e)
npm run test:all     # Both suites
```

Run a single Vitest test:
```bash
npx vitest run src/components/KanbanBoard.test.tsx
```

### Backend (`backend/`)
```bash
mvn spring-boot:run          # Dev server on :8000
mvn test                     # Tests + JaCoCo coverage
mvn clean package            # Build JAR
mvn -q -DskipTests package   # Build JAR, skip tests
```

### Docker
```bash
docker compose up --build -d   # Build and start
docker compose down            # Stop
```

Platform scripts also exist in `scripts/` for Windows/Linux/macOS.

## Architecture

**Single container**: Spring Boot serves both the REST API and the Next.js static build at `/`.

```
Browser → :8000 (Spring Boot)
             ├── GET /            → serves Next.js static app
             ├── /api/auth/*      → AuthController (login/logout/status)
             ├── /api/health      → health check
             └── /api/*           → protected by AuthFilter (session-based)
```

**Frontend components** (`frontend/src/`):
- `app/providers.tsx` — wraps app in `AuthProvider`
- `components/ProtectedRoute.tsx` — guards board behind auth check
- `components/KanbanBoard.tsx` — main orchestrator; owns board state, drag-drop via `@dnd-kit`
- `components/KanbanColumn.tsx`, `KanbanCard.tsx`, `NewCardForm.tsx` — rendering primitives
- `components/LoginPage.tsx` — login form
- `lib/kanban.ts` — `Card`, `Column`, `BoardData` types + pure logic
- `lib/auth.tsx` — `AuthContext`, `useAuth` hook, session API calls

**Backend classes** (`backend/src/main/java/com/pm/backend/`):
- `AuthController` — `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/status`
- `AuthFilter` — servlet filter; allows public paths, returns 401 otherwise

**Session auth**: Spring Session (in-memory). Credentials hardcoded in `AuthController`.

**Dockerfile**: multi-stage — (1) Node 22 Alpine builds Next.js → `out/`, (2) Maven builds JAR + copies `out/` into Spring Boot `static/`, (3) Temurin 17 JRE runs the JAR.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, @dnd-kit |
| Testing (FE) | Vitest 3, Playwright 1.58, Testing Library |
| Backend | Spring Boot 3.5.6, Java 17, Maven |
| Testing (BE) | JUnit (via Spring Boot starter), JaCoCo 80% coverage target |
| AI | OpenRouter (`openai/gpt-oss-120b`); key in `.env` as `OPENROUTER_API_KEY` |
| Database | SQLite (future phases) |
| Container | Docker / docker-compose, port 8000 |

## Coding Standards

- No emojis anywhere in code or output
- Never over-engineer; keep everything as simple as possible
- Before fixing a bug, identify root cause with evidence — no guessing
- 80% test coverage target for both frontend and backend
- Keep READMEs minimal
