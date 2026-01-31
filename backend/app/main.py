import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()


def _resolve_static_dir() -> Path | None:
    env_dir = os.getenv("PM_STATIC_DIR", "").strip()
    candidates = [
        Path(env_dir) if env_dir else None,
        Path(__file__).resolve().parents[2] / "frontend" / "out",
        Path("/app/frontend/out"),
    ]
    for candidate in candidates:
        if candidate and candidate.exists():
            return candidate
    return None


def _mount_static_assets(static_dir: Path) -> None:
    next_assets = static_dir / "_next"
    if next_assets.exists():
        app.mount("/_next", StaticFiles(directory=next_assets), name="next-assets")
    static_assets = static_dir / "static"
    if static_assets.exists():
        app.mount("/static", StaticFiles(directory=static_assets), name="static-assets")


STATIC_DIR = _resolve_static_dir()

if STATIC_DIR:
    _mount_static_assets(STATIC_DIR)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/api/hello")
def hello() -> dict:
    return {"message": "Hello from FastAPI"}


@app.get("/", response_class=HTMLResponse)
def root():
    if STATIC_DIR:
        index_path = STATIC_DIR / "index.html"
        if index_path.exists():
            return FileResponse(index_path)

    return """<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <title>PM MVP</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 40px; color: #032147; }
      h1 { margin-bottom: 8px; }
      p { color: #888888; }
      code { background: #f7f8fb; padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <h1>Project Management MVP</h1>
    <p>FastAPI backend is running.</p>
    <p>Try <code>/api/hello</code> or <code>/health</code>.</p>
  </body>
</html>"""


@app.get("/{full_path:path}", include_in_schema=False)
def static_fallback(full_path: str):
    if not STATIC_DIR:
        return HTMLResponse("Not found", status_code=404)

    requested_path = STATIC_DIR / full_path
    if requested_path.is_dir():
        index_path = requested_path / "index.html"
        if index_path.exists():
            return FileResponse(index_path)

    if requested_path.exists():
        return FileResponse(requested_path)

    index_path = STATIC_DIR / "index.html"
    if index_path.exists():
        return FileResponse(index_path)

    return HTMLResponse("Not found", status_code=404)
