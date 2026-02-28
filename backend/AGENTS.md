# Backend Agent Notes

## Purpose

`backend/` contains the Spring Boot service that will serve the web app and API endpoints.

## Current Scope (Phase 2)

- Spring Boot app entry point in `backend/src/main/java/com/pm/backend/BackendApplication.java`
- Health endpoint at `/api/health` in `backend/src/main/java/com/pm/backend/HealthController.java`
- Static hello-world page in `backend/src/main/resources/static/index.html` served at `/`
- Maven build config in `backend/pom.xml` (Java 17)
- Backend tests in `backend/src/test/java/com/pm/backend/BackendApplicationTests.java`

## Run Notes

- Local dev (without Docker): `mvn spring-boot:run` from `backend/`
- Test: `mvn test` from `backend/`

## Constraints

- Keep implementation simple and MVP-focused.
- Prefer clear API contracts and test-backed changes.
