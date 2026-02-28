# Frontend Agent Notes

## Purpose

This `frontend/` app is the current MVP UI for a single-board Kanban experience. It is currently frontend-only and uses in-memory state.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- `@dnd-kit` for drag and drop
- Vitest + Testing Library for unit/component tests
- Playwright for end-to-end tests

## Current Entry Points

- Page entry: `src/app/page.tsx`
- Root layout: `src/app/layout.tsx`
- Global styles/tokens: `src/app/globals.css`

## Architecture Overview

- Main orchestrator component: `src/components/KanbanBoard.tsx`
- Column rendering and drop area: `src/components/KanbanColumn.tsx`
- Draggable card: `src/components/KanbanCard.tsx`
- Drag preview: `src/components/KanbanCardPreview.tsx`
- Add-card interaction: `src/components/NewCardForm.tsx`
- Data model and board utilities: `src/lib/kanban.ts`

## Data Model

`src/lib/kanban.ts` defines:

- `Card`: `{ id, title, details }`
- `Column`: `{ id, title, cardIds[] }`
- `BoardData`: `{ columns[], cardsById }` (implemented as `cards: Record<string, Card>`)
- `initialData`: seeded five-column board
- `moveCard(...)`: card move/reorder logic used by DnD handlers
- `createId(...)`: client-side ID generator for new cards

## Current Behavior

- Board state is local React state in `KanbanBoard`.
- Column titles are editable inline.
- Cards can be:
- added within a column,
- deleted from a column,
- dragged and reordered within a column,
- dragged between columns.
- No backend/API/database integration yet.
- No auth/sign-in yet.
- No AI/chat yet.

## Styling and Theme

- Uses project color tokens in `src/app/globals.css`:
- accent yellow `#ecad0a`
- primary blue `#209dd7`
- secondary purple `#753991`
- dark navy `#032147`
- gray text `#888888`
- Uses Google fonts via `next/font` in `src/app/layout.tsx`:
- `Space Grotesk` for display
- `Manrope` for body

## Tests

- Unit/component tests:
- `src/lib/kanban.test.ts` covers move logic scenarios.
- `src/components/KanbanBoard.test.tsx` covers render/rename/add/remove flows.
- E2E tests:
- `tests/kanban.spec.ts` covers load, add card, and drag between columns.
- Config:
- Vitest config: `vitest.config.ts`
- Playwright config: `playwright.config.ts`

## NPM Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run test:all`

## Constraints for Future Changes

- Keep MVP scope tight; avoid feature creep.
- Preserve existing Kanban interactions unless explicitly changing behavior.
- Prefer simple, test-backed refactors when integrating backend/auth/AI.
- Maintain or improve test coverage toward project target (80%+).
