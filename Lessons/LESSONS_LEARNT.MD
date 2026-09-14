# Lessons Learnt

## User preferences captured
- The first release should include both the patient rehab flow and the therapist portal.
- The v1 therapist scope includes patient management, program management, review workflows, and exercise library duplication features.
- Exercise authoring should be deferred to a later stage (Stage 1.2), not included in the initial release.
- A persistent database-backed backend is preferred from the start.
- The MVP scenario should be one representative exercise: overhead clothes hanging.
- The clinical accuracy target should be close to clinical-grade measurement.
- Full-session videos should remain stored locally by default.
- Traditional Chinese should be the default interface language.
- Consent and synchronization logic should be included in the product flow from the beginning.

## Mistakes to avoid next time
- Do not assume the MVP should be a minimal patient-only prototype when the user has already clarified that therapist support is required.
- Do not widen the MVP scope by including exercise authoring when the user explicitly wants that staged later.
- Do not assume browser-only local storage is acceptable when the preference is a persistent database-backed backend.
- Do not treat MVP scenario selection as optional; the chosen exercise should guide requirements and validation.

## Improvement plan
- Confirm scope, architecture, and clinical target before drafting implementation details.
- Translate product preferences directly into specification changes before moving into technical design or coding.
- Keep the specification aligned with the agreed MVP boundaries so later stages remain clearly separated.
