# Scripts Agent Notes

This folder contains cross-platform start/stop scripts for local Docker-based runs.

## Available Scripts

- Windows:
- `scripts/start-server-windows.ps1`
- `scripts/stop-server-windows.ps1`
- Linux:
- `scripts/start-server-linux.sh`
- `scripts/stop-server-linux.sh`
- macOS:
- `scripts/start-server-mac.sh`
- `scripts/stop-server-mac.sh`

## Behavior

- Start scripts run `docker compose up --build -d` then show status.
- Stop scripts run `docker compose down`.
