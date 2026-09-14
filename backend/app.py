from datetime import datetime, timezone
from pathlib import Path
import sqlite3

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DATABASE_PATH = Path(__file__).with_name("hp.sqlite3")
app = FastAPI(title="HP Rehabilitation API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientCreate(BaseModel):
    name: str
    external_patient_id: str | None = None


class ProgramCreate(BaseModel):
    patient_id: int
    name: str
    repetitions: int = 10
    hold_seconds: int = 5


def connection() -> sqlite3.Connection:
    db = sqlite3.connect(DATABASE_PATH)
    db.row_factory = sqlite3.Row
    return db


def initialize_database() -> None:
    with connection() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS patients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                external_patient_id TEXT,
                created_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS programs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                patient_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                repetitions INTEGER NOT NULL,
                hold_seconds INTEGER NOT NULL,
                exercise_code TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY(patient_id) REFERENCES patients(id)
            );
            """
        )


@app.on_event("startup")
def startup() -> None:
    initialize_database()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "hp-rehabilitation-api"}


@app.get("/api/patients")
def list_patients() -> list[dict]:
    with connection() as db:
        rows = db.execute("SELECT * FROM patients ORDER BY created_at DESC").fetchall()
    return [dict(row) for row in rows]


@app.post("/api/patients", status_code=201)
def create_patient(payload: PatientCreate) -> dict:
    created_at = datetime.now(timezone.utc).isoformat()
    with connection() as db:
        cursor = db.execute(
            "INSERT INTO patients (name, external_patient_id, created_at) VALUES (?, ?, ?)",
            (payload.name, payload.external_patient_id, created_at),
        )
        patient_id = cursor.lastrowid
    return {"id": patient_id, "name": payload.name, "external_patient_id": payload.external_patient_id, "created_at": created_at}


@app.post("/api/programs", status_code=201)
def create_program(payload: ProgramCreate) -> dict:
    with connection() as db:
        patient = db.execute("SELECT id FROM patients WHERE id = ?", (payload.patient_id,)).fetchone()
        if patient is None:
            raise HTTPException(status_code=404, detail="Patient not found")
        created_at = datetime.now(timezone.utc).isoformat()
        cursor = db.execute(
            "INSERT INTO programs (patient_id, name, repetitions, hold_seconds, exercise_code, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            (payload.patient_id, payload.name, payload.repetitions, payload.hold_seconds, "CLOTH_STICK_OVERHEAD_HANG", created_at),
        )
    return {"id": cursor.lastrowid, "patient_id": payload.patient_id, "name": payload.name, "repetitions": payload.repetitions, "hold_seconds": payload.hold_seconds, "exercise_code": "CLOTH_STICK_OVERHEAD_HANG", "created_at": created_at}
