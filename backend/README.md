# HP Rehabilitation API

## Run locally

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8000
```

Available endpoints:

- `GET /health`
- `GET /api/patients`
- `POST /api/patients`
- `POST /api/programs`

The initial database is SQLite at `backend/hp.sqlite3`. It stores patient and program records for the MVP foundation. Clinical session data remains a future local-first storage integration and should not be treated as complete clinical persistence yet.
