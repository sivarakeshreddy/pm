# Project Plan

## Delivery Rules

- [ ] Keep implementation simple and MVP-scoped only.
- [ ] Root-cause issues before fixing.
- [ ] Use latest stable, idiomatic libraries.
- [ ] Maintain comprehensive tests with at least 80% coverage for frontend and backend once both exist.
- [ ] Request explicit user approval before starting each phase.
- [ ] Maintain `check_log.md` as the execution status log, updating it for every phase start, key step completion, blockers, and phase completion.

## Phase 1: Planning and Project Documentation

### Checklist

- [x] Expand this plan with actionable substeps, tests, and success criteria for each phase.
- [x] Create `frontend/AGENTS.md` documenting existing frontend structure and behavior.
- [x] Define `check_log.md` logging requirement and create initial status log file template.
- [x] User reviews and approves this plan.

### Tests

- Manual review:
- [ ] Verify plan includes all ten phases and approval gates.
- [ ] Verify `frontend/AGENTS.md` matches current frontend codebase.

### Success Criteria

- Clear, phase-by-phase execution checklist exists.
- Every phase includes test scope and measurable success criteria.
- User approves Phase 1 outputs before any implementation work starts.

## Phase 2: Scaffolding (Docker + Spring Boot + Scripts)

### Checklist

- [x] Create minimal Spring Boot service in `backend/`.
- [x] Add hello-world static page served from `/`.
- [x] Add API route (for example `/api/health`) returning JSON.
- [x] Add Java dependency/build management using Maven.
- [x] Create Dockerfile for single-container run.
- [x] Add `docker-compose.yml` for local convenience.
- [x] Add start/stop scripts for macOS, Linux, and Windows in `scripts/`.
- [x] Add basic backend test scaffolding.
- [ ] Request user approval before Phase 3.

### Tests

- [ ] Backend unit test for health endpoint.
- [ ] Container smoke test: build succeeds.
- [ ] Container smoke test: `/` serves HTML and `/api/health` returns 200.
- [ ] Script smoke tests for start/stop on at least current platform.

### Success Criteria

- Project starts with Docker and docker-compose.
- Spring Boot responds at API endpoint and serves static page at `/`.
- Start/stop scripts work and are documented briefly.

## Phase 3: Add Frontend Static Build and Serving

### Checklist

- [ ] Build Next.js frontend as static assets suitable for backend serving.
- [ ] Configure backend to serve frontend build at `/`.
- [ ] Preserve current Kanban behavior.
- [ ] Align Docker build to include frontend artifact.
- [ ] Add/adjust tests for static serving.
- [ ] Request user approval before Phase 4.

### Tests

- [ ] Frontend unit tests pass.
- [ ] Frontend e2e tests pass.
- [ ] Integration test confirms `/` renders Kanban page from backend.
- [ ] Coverage report meets 80% target for frontend scope.

### Success Criteria

- Opening `/` from containerized app shows existing Kanban UI.
- No regression in rename/add/delete/drag behaviors.

## Phase 4: Fake Sign-In Experience

### Checklist

- [ ] Add login page/view gated at `/` until authenticated.
- [ ] Implement dummy credentials: `user` / `password`.
- [ ] Implement logout flow.
- [ ] Use cookie-based server session for MVP auth state.
- [ ] Protect Kanban routes from unauthenticated access.
- [ ] Add tests for positive and negative login flows.
- [ ] Request user approval before Phase 5.

### Tests

- [ ] Unit tests for auth validation logic.
- [ ] Integration tests for login, invalid credentials, logout.
- [ ] E2E test verifies redirect/gating behavior.
- [ ] Coverage remains at or above 80% for touched areas.

### Success Criteria

- Unauthenticated users cannot access board.
- Correct credentials grant access.
- Logout clears session and returns user to login.

## Phase 5: Database Modeling and Documentation

### Checklist

- [ ] Propose SQLite schema supporting multi-user future and one-board-per-user MVP.
- [ ] Define JSON storage strategy for board state.
- [ ] Document schema, migration/init approach, and rationale in `docs/`.
- [ ] Provide sample rows/data flow examples.
- [ ] Request explicit user sign-off before implementation in Phase 6.

### Tests

- [ ] Manual schema review for required entities and constraints.
- [ ] Validate schema supports board read/write and future multi-user extension.

### Success Criteria

- Approved schema design documented clearly.
- Design is implementable without adding unnecessary complexity.

## Phase 6: Backend Kanban API and Persistence

### Checklist

- [ ] Implement SQLite initialization/create-if-missing.
- [ ] Implement board API routes for authenticated user.
- [ ] Support read and update operations for board JSON.
- [ ] Add backend service/repository layer with simple structure.
- [ ] Add backend unit and integration tests.
- [ ] Request user approval before Phase 7.

### Tests

- [ ] Unit tests for persistence layer.
- [ ] API tests for read/update happy path.
- [ ] API tests for auth failures and validation errors.
- [ ] DB auto-create behavior test.
- [ ] Coverage at or above 80% for backend.

### Success Criteria

- Board persists across restarts.
- API reliably returns and updates current user board.
- Missing DB file is created automatically.

## Phase 7: Frontend + Backend Integration

### Checklist

- [ ] Replace in-memory board initialization with backend fetch.
- [ ] Persist user actions (rename/move/add/delete) through backend API.
- [ ] Handle loading and error states simply.
- [ ] Keep UI behavior close to current MVP.
- [ ] Add integration and e2e tests for persistence.
- [ ] Request user approval before Phase 8.

### Tests

- [ ] Frontend integration tests mock/live API interactions.
- [ ] E2E tests confirm persistence after page refresh.
- [ ] Regression tests for all board operations.
- [ ] Combined coverage remains at or above 80%.

### Success Criteria

- Board actions persist in database.
- Refreshing app shows saved state.
- Existing UX remains stable.

## Phase 8: AI Connectivity (OpenRouter)

### Checklist

- [ ] Add backend AI client using `OPENROUTER_API_KEY`.
- [ ] Use model `openai/gpt-oss-120b`.
- [ ] Implement simple backend AI connectivity path.
- [ ] Add configuration and error handling for missing key/network issues.
- [ ] Validate with simple "2+2" call.
- [ ] Request user approval before Phase 9.

### Tests

- [ ] Unit tests for AI client request construction.
- [ ] Mocked tests for success and failure responses.
- [ ] Optional manual connectivity check against OpenRouter.
- [ ] Coverage target maintained.

### Success Criteria

- Backend can successfully call OpenRouter when key is present.
- Failures return controlled, clear errors.

## Phase 9: Structured Output AI + Kanban Updates

### Checklist

- [ ] Define structured response schema (assistant reply + optional board update).
- [ ] Send board JSON + user prompt + conversation history to AI.
- [ ] Validate and parse structured output.
- [ ] Apply optional board mutation safely and persist it.
- [ ] Return updated board and assistant response.
- [ ] Add comprehensive tests for parsing and mutation paths.
- [ ] Request user approval before Phase 10.

### Tests

- [ ] Schema validation tests (valid/invalid AI payloads).
- [ ] API tests for "reply only" and "reply + board update".
- [ ] Persistence tests for mutation application.
- [ ] Error-path tests for malformed model output.
- [ ] Coverage target maintained.

### Success Criteria

- AI responses are structured and validated.
- Optional board updates are applied and persisted correctly.
- Malformed outputs do not corrupt board data.

## Phase 10: Sidebar AI Chat UX and Auto-Refresh

### Checklist

- [ ] Build sidebar chat UI integrated into existing board screen.
- [ ] Show conversation history and send user prompts.
- [ ] Apply backend-returned board updates immediately in UI.
- [ ] Keep visuals aligned with project color scheme and current design language.
- [ ] Add e2e tests for AI chat and board update loop.
- [ ] Final user review and acceptance.

### Tests

- [ ] Frontend unit tests for chat component logic.
- [ ] Integration tests for chat API interactions.
- [ ] E2E test where AI response updates board and UI reflects change automatically.
- [ ] Full-suite coverage at or above 80%.

### Success Criteria

- User can chat with AI in sidebar without leaving board.
- AI-proposed board changes appear automatically after response.
- End-to-end MVP flow works locally in Docker/docker-compose.
