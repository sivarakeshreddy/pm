# Backend overview

## Stack
- FastAPI
- Uvicorn
- Pytest for unit and integration tests

## Entry point
- app/main.py exposes the FastAPI application instance as `app`.

## Routes
- GET /: HTML health page
- GET /health: JSON status
- GET /api/hello: JSON example endpoint

## Tests
- Unit tests: tests/test_main.py
- Integration tests (live target): tests/test_integration.py
	- Uses PM_BASE_URL to target a running backend

## Container
- Dockerfile at repo root builds a Python 3.12 image and installs dependencies with uv.