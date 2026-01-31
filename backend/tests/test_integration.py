import os

import httpx
import pytest

BASE_URL = os.getenv("PM_BASE_URL", "")


def _can_run() -> bool:
    return bool(BASE_URL)


@pytest.mark.skipif(not _can_run(), reason="PM_BASE_URL not set")
def test_live_health() -> None:
    response = httpx.get(f"{BASE_URL}/health", timeout=5)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.skipif(not _can_run(), reason="PM_BASE_URL not set")
def test_live_root() -> None:
    response = httpx.get(f"{BASE_URL}/", timeout=5)
    assert response.status_code == 200
    assert "Welcome back" in response.text
