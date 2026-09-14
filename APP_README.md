# HP Rehabilitation MVP Application

This repository now contains the first runnable vertical slice of the v1 MVP:

- Vite + React + TypeScript responsive patient exercise screen
- Traditional Chinese default interface
- Camera permission and live preview
- MediaPipe Pose Landmarker and Object Detector loading boundary
- v1 exercise conditions displayed for right shoulder flexion, right elbow extension, and cloth-stick detection
- two compensation rules displayed with their configured thresholds
- FastAPI + SQLite backend foundation for patients and programs

## Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

Camera access requires a secure browser context such as `localhost` or HTTPS. The `測試 +1` control is a temporary development-only control for advancing the repetition counter; it is not clinical logic.

## Backend

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8000
```

Open `http://localhost:8000/docs` for the API explorer.

## Current boundary

The current slice does not yet implement clinical measurement or validated object detection. MediaPipe model loading is wired, but ROM calculation, hand-object association, temporal smoothing, compensation classification, session recording, authentication, consent synchronization, and therapist/admin screens remain subsequent implementation tasks.
