# Product Backlog

## Product goal
Build a v1 MVP web-based upper-limb home rehabilitation platform focused on one representative exercise, one primary measured joint, and two compensatory movements. The product supports:
- patient exercise guidance and real-time feedback,
- therapist oversight of patients and programs,
- review of exercise results and consented videos,
- duplication and reuse of exercise-library content,
- secure persistence, consent management, and auditability.

## MVP scope confirmation for v1
Representative exercise:
- Cloth-stick overhead hanging

Measurement scope:
- Right shoulder flexion is the single primary joint movement measured for ROM
- Right elbow extension is a required movement condition, not a second ROM measurement

Compensation scope:
- Two compensation detectors only:
  - trunk leaning to the left
  - unintended shoulder abduction

In scope:
- Full patient rehab flow
- Therapist portal with full operational function except exercise authoring
- Patient management, program management, review workflows, and exercise-library duplication
- Administrator backend ready and included in v1
- Persistent database-backed backend
- Traditional Chinese default UI
- Full-session local video storage with consent-based sharing
- Consent and sync logic from the first release

Out of scope for v1:
- Full custom exercise authoring
- Exercise creation wizard for therapist-authored content
- Multi-joint ROM measurement beyond the selected primary joint
- More than two compensation detectors
- Multi-camera support
- Finger/hand tracking
- Advanced AI-authoring workflow

## Priority legend
- P0: must-have for v1
- P1: important for v1
- P2: valuable but can slip to later phase
- P3: later stage / future backlog

---

## Epic 1: Patient rehabilitation experience

### Story PAT-001: Secure patient login and session access
- Priority: P0
- As a patient, I want to log in securely so that only authorized users can access my rehab plan.
- Acceptance criteria:
  - Patient can sign in with secure credentials.
  - Session is protected and time-limited.
  - Unauthorized access is blocked.

### Story PAT-002: View assigned program and exercise schedule
- Priority: P0
- As a patient, I want to view my assigned home program and training schedule so that I know what to do each day.
- Acceptance criteria:
  - Assigned program list is visible.
  - Exercise order and schedule are shown clearly.
  - Sessions can be started from the program list.

### Story PAT-003: Camera setup and readiness check
- Priority: P0
- As a patient, I want the app to guide me through camera setup so that my body is visible and the exercise can be tracked reliably.
- Acceptance criteria:
  - Camera permission is requested.
  - Live preview is displayed.
  - Visibility, lighting, distance, and joint detection checks are shown.
  - Patient is prompted to adjust positioning before starting.

### Story PAT-004: Perform a prescribed exercise with live feedback
- Priority: P0
- As a patient, I want to perform the prescribed exercise while receiving real-time guidance so that I can complete the movement correctly.
- Acceptance criteria:
  - Skeleton overlay and selected joint markers are visible.
  - Target ROM and current ROM are displayed.
  - Movement count and timer are visible.
  - Voice and on-screen prompts are provided.

### Story PAT-005: Measure right shoulder flexion ROM and count repetitions
- Priority: P0
- As a patient, I want the system to measure right shoulder flexion and confirm right elbow extension during the cloth-stick overhead movement so that I can understand my exercise performance.
- Acceptance criteria:
  - Right shoulder flexion ROM is calculated in degrees.
  - Right elbow extension is checked as a required movement condition.
  - Right elbow extension is not reported as a separate ROM measurement in v1.
  - Repetition count increments only for valid movement cycles.
  - Confidence indicators are visible.

### Story PAT-006: Detect the two v1 compensations and moderate warning states
- Priority: P0
- As a patient, I want warnings for incorrect movement so that I can correct my posture before the exercise is stopped.
- Acceptance criteria:
  - Trunk leaning to the left is detected.
  - Unintended shoulder abduction is detected.
  - No additional compensation detector is required for v1.
  - Moderate compensation triggers visual and voice warning.
  - Affected body region is highlighted.
  - Warning is recorded in the session log.
  - Repetition is not counted as valid.

### Story PAT-007: Automatic pause and error replay after repeated errors
- Priority: P0
- As a patient, I want the app to pause after repeated errors and replay the incorrect movement so that I can understand what went wrong and restart correctly.
- Acceptance criteria:
  - Three accumulated moderate-to-severe errors trigger pause.
  - Alarm is played.
  - Latest incorrect movement video is replayed.
  - Written and voice instructions are shown.

### Story PAT-008: Restart failed repetition and retry rules
- Priority: P0
- As a patient, I want to restart from an invalid repetition so that I can continue the exercise safely.
- Acceptance criteria:
  - Reset position is required before resuming.
  - Restart flow is guided.
  - Same-compensation retry rule is enforced.
  - Skip or stop workflow is triggered when retry fails.

### Story PAT-009: Record pain, difficulty, and fatigue assessment
- Priority: P0
- As a patient, I want to report pain and difficulty so that my therapist can adjust rehabilitation safely.
- Acceptance criteria:
  - Pain rating can be submitted after exercise or during the session.
  - Difficulty and fatigue prompts are available.
  - Ratings are stored with the session.

### Story PAT-010: Review exercise and session summaries
- Priority: P0
- As a patient, I want to review my results after each exercise and session so that I can understand my progress and next steps.
- Acceptance criteria:
  - Exercise summary contains score, ROM, repetition counts, and compensation summary.
  - Session summary includes total time, completed/skipped exercises, and overall score.
  - Summary is displayed in Traditional Chinese.

### Story PAT-011: Local storage and consent-based sync control
- Priority: P0
- As a patient, I want my data to stay local by default and only sync with consent so that I control what is shared.
- Acceptance criteria:
  - Local data is stored encrypted.
  - Sync states are tracked.
  - Consent settings are applied before upload.
  - Failed sync does not delete local data.

### Story PAT-012: Full session video retention and sharing control
- Priority: P1
- As a patient, I want to control whether my full-session video and clips are shared so that privacy is preserved.
- Acceptance criteria:
  - Video retention is configured.
  - Sharing consent is stored per record.
  - Patient can review sync/share status.

---

## Epic 2: Therapist operations and review

### Story THR-001: Therapist login and role-based access
- Priority: P0
- As a therapist, I want secure login and role-based access so that only authorized staff can view patient data.
- Acceptance criteria:
  - Therapist can sign in securely.
  - Access is restricted by role and organization.
  - Audit actions are recorded.

### Story THR-002: Manage patient records
- Priority: P0
- As a therapist, I want to manage patient records so that I can organize assigned care for each patient.
- Acceptance criteria:
  - Patient list is visible.
  - Patient profile can be viewed and updated.
  - Patient status and assignment data are maintainable.

### Story THR-003: Create and assign programs
- Priority: P0
- As a therapist, I want to create home programs and assign exercises so that treatment plans are delivered to patients.
- Acceptance criteria:
  - Program can be created with schedule and exercise order.
  - Program can be assigned to a patient.
  - Exercises can be selected from the library.

### Story THR-004: Configure ROM targets and safety settings
- Priority: P0
- As a therapist, I want to configure patient-specific ROM targets and safety limits so that the exercise feedback matches clinical goals.
- Acceptance criteria:
  - ROM targets can be set by patient and exercise.
  - Safety thresholds are configurable.
  - Values are stored in the patient-specific care plan.

### Story THR-005: Configure compensation detection rules
- Priority: P0
- As a therapist, I want to select and configure compensations to detect so that the app evaluates the movement correctly for each patient.
- Acceptance criteria:
  - Compensation list is selectable.
  - Detection thresholds are configurable.
  - Selected detectors are persisted to the exercise/program configuration.

### Story THR-006: Review patient progress and session results
- Priority: P0
- As a therapist, I want to review progress and exercise results so that I can assess treatment effectiveness and risk.
- Acceptance criteria:
  - Session and exercise summaries are viewable.
  - ROM, score, and compensation summaries are displayed.
  - Past sessions are accessible by patient and program.

### Story THR-007: Review consented videos and events
- Priority: P0
- As a therapist, I want to review consented videos and compensation events so that I can provide clinical feedback.
- Acceptance criteria:
  - Consent-required clips are visible only when authorized.
  - Videos are accessible with audit trail.
  - Compensation events are linked to the relevant repetition.

### Story THR-008: Duplicate exercises into therapist library
- Priority: P0
- As a therapist, I want to duplicate organization exercises into the therapist library so that I can adapt them for patient use without changing the original.
- Acceptance criteria:
  - Organization exercise can be duplicated.
  - Original reference is retained.
  - Duplicate is editable within therapist scope.

### Story THR-009: Manage exercise library and reuse in programs
- Priority: P0
- As a therapist, I want to manage the exercise library and reuse items in patient programs so that care plans can be assembled efficiently.
- Acceptance criteria:
  - Exercise catalog is visible.
  - Items can be filtered, searched, and reused.
  - Program assignment references the selected exercise item.

### Story THR-010: Program review and patient notes
- Priority: P1
- As a therapist, I want to add clinical comments and review outcomes so that patient care can be adjusted based on objective data.
- Acceptance criteria:
  - Notes can be attached to patient or session records.
  - Review status is visible.
  - Notes are audit logged.

---

## Epic 3: Exercise library and duplication

### Story LIB-001: View organization exercise library
- Priority: P0
- As a therapist, I want to browse the organization exercise library so that I can select exercises for patient programs.
- Acceptance criteria:
  - Library is searchable and categorized.
  - Exercise metadata and status are displayed.
  - Approved exercises are clearly differentiated.

### Story LIB-002: Duplicate and customize library items
- Priority: P0
- As a therapist, I want to duplicate a library exercise and use it in a patient-specific program so that I can adapt care without modifying the master definition.
- Acceptance criteria:
  - Duplicate operation creates a derivative item.
  - Original remains preserved.
  - Customization can be applied to the duplicate without overwriting the original.

### Story LIB-003: Exercise versioning and archive status
- Priority: P1
- As a therapist, I want to manage exercise versioning and archive state so that patient programs remain linked to the correct content version.
- Acceptance criteria:
  - Version history is stored for each exercise.
  - Historical sessions retain reference to previous version.
  - Archived items are not active in new assignments.

### Story LIB-004: Exercise metadata and demonstration assets
- Priority: P1
- As a therapist, I want to maintain exercise metadata and demonstration media so patients can follow the exercise correctly.
- Acceptance criteria:
  - Title, description, body side, and equipment can be managed.
  - Demonstration media can be associated with the exercise.
  - Metadata and files are tracked with the exercise record.

---

## Epic 4: Data, consent, and synchronization

### Story DATA-001: Persistent database and API backbone
- Priority: P0
- As a product team, we need a persistent database-backed backend so that patient and therapist records are reliable and auditable.
- Acceptance criteria:
  - Data model supports users, patients, therapists, programs, sessions, exercises, videos, and sync records.
  - Core CRUD operations are available through backend APIs.
  - Records persist across sessions.

### Story DATA-002: Consent and sharing preferences
- Priority: P0
- As a patient, I want to control data sharing consent so that I decide what is uploaded and with whom.
- Acceptance criteria:
  - Consent state is stored.
  - Sharing permissions are enforced in upload logic.
  - Therapist access is limited to consented records.

### Story DATA-003: Sync state tracking and resilience
- Priority: P0
- As a patient, I want data synchronization to be reliable and non-destructive so that my local work is safe even if upload fails.
- Acceptance criteria:
  - Each record has a sync state.
  - Failed uploads do not remove local records.
  - Retry and status reporting are available.

### Story DATA-004: Retention and audit logging
- Priority: P1
- As an organization, I need audit and retention controls so that clinical data handling remains compliant and reviewable.
- Acceptance criteria:
  - Access events are logged.
  - Retention windows are configurable.
  - Deletion and expiry events are recorded.

---

## Epic 5: Security, privacy, and compliance

### Story SEC-001: Secure authentication and authorization
- Priority: P0
- As an organization, I want role-based authorization so that patient data is protected from unauthorized access.
- Acceptance criteria:
  - Patient and therapist roles are enforced.
  - Least-privilege authorization is implemented.
  - Sensitive data access is audit logged.

### Story SEC-002: Encrypted local and transport storage
- Priority: P0
- As an organization, I want encrypted storage and secure transport so that patient data is protected in use and in transit.
- Acceptance criteria:
  - Local patient data is encrypted at rest.
  - Data is transmitted via HTTPS/TLS.
  - Sensitive files use secure storage pathways.

### Story SEC-003: Privacy-safe data handling
- Priority: P0
- As an organization, I want privacy-safe handling of patient videos and identifiers so that we meet clinical privacy requirements.
- Acceptance criteria:
  - Patient video and raw frame data are excluded from public repositories.
  - Identifiers are stored according to privacy policy.
  - Sensitive files are excluded from Git tracking.

---

## Epic 6: Reporting and analytics

### Story REP-001: Exercise-level summary reports
- Priority: P0
- As a patient and therapist, I want exercise summaries so that performance and progress are easy to interpret.
- Acceptance criteria:
  - Score, ROM, repetitions, and compensation summary are included.
  - Summary is viewable in patient and therapist contexts.

### Story REP-002: Session and progress reports
- Priority: P1
- As a therapist, I want session progression reports so that I can assess patient improvement over time.
- Acceptance criteria:
  - Session trends are displayed.
  - ROM progress and completion metrics are visible.
  - Skipped and incomplete sessions are represented clearly.

### Story REP-003: Export and review data
- Priority: P2
- As a therapist, I want report export capability so that care review and documentation are supported.
- Acceptance criteria:
  - Report export is available in standard format.
  - Export contains approved, consented data only.

---

## Epic 7: Quality, reliability, and clinical validation

### Story QAL-001: Validate pose tracking and ROM accuracy
- Priority: P0
- As a product team, we need reliability testing for pose tracking and ROM calculations so that exercise feedback remains clinically credible.
- Acceptance criteria:
  - Joint angle calculations are validated against known movement patterns.
  - Confidence values are captured for uncertain results.
  - Low-confidence measurements are marked and not treated as definitive.

### Story QAL-002: Validate compensation detection behavior
- Priority: P0
- As a product team, we need compensation detection validation so that movement feedback is safe and interpretable.
- Acceptance criteria:
  - False-positive and false-negative risks are measured.
  - Warning and pause thresholds are reviewed.
  - Feedback latency remains acceptable for real-time exercise use.

### Story QAL-003: Browser and device readiness testing
- Priority: P1
- As a product team, we need cross-browser and device testing so the app works reliably on supported mobile and desktop devices.
- Acceptance criteria:
  - iOS, Android, tablet, and desktop support is tested.
  - Camera access and storage readiness are validated.
  - Performance is acceptable under normal usage.

### Story QAL-004: Clinical safety and risk review
- Priority: P1
- As a clinical stakeholder, I need safety disclaimers and manual stop controls so that the product is used appropriately and safely.
- Acceptance criteria:
  - Safety disclaimer is shown.
  - Patient can manually stop exercise.
  - Unsafe ROM warnings are surfaced.

---

## Deferred backlog for Stage 1.2 (not in v1)

### Story FUT-001: Full custom exercise authoring workflow
- Priority: P3
- As a therapist, I want to create custom exercises from scratch so that tailored programs can be defined in the system.

### Story FUT-002: AI-assisted exercise configuration review
- Priority: P3
- As a therapist, I want AI-generated exercise configuration suggestions reviewed before use so that recommendations remain clinically safe.

### Story FUT-003: Full approval and publishing lifecycle
- Priority: P3
- As an organization, I want a publish/approval workflow so that exercise content can be governed and version controlled.

### Story FUT-004: Multi-camera support and future clinical enhancements
- Priority: P3
- As a platform team, we want the architecture ready for future multi-camera and advanced clinical tracking so that the product can evolve safely.

---

## v1 backlog summary by priority

### P0 (must-have)
- PAT-001, PAT-002, PAT-003, PAT-004, PAT-005, PAT-006, PAT-007, PAT-008, PAT-009, PAT-010, PAT-011
- THR-001, THR-002, THR-003, THR-004, THR-005, THR-006, THR-007, THR-008, THR-009
- LIB-001, LIB-002
- DATA-001, DATA-002, DATA-003
- SEC-001, SEC-002, SEC-003
- REP-001
- QAL-001, QAL-002

### P1 (important for v1)
- PAT-012
- THR-010
- LIB-003, LIB-004
- DATA-004
- REP-002
- QAL-003, QAL-004

### P2 / P3
- REP-003 and future items in the deferred backlog

---

## Suggested v1 milestone split

### Milestone 1: Patient-flow foundation
- PAT-001 through PAT-011
- DATA-001 through DATA-003
- SEC-001 through SEC-003
- QAL-001 and QAL-002

### Milestone 2: Therapist operational workflow
- THR-001 through THR-010
- LIB-001 through LIB-004
- REP-001 and REP-002

### Milestone 3: Stabilization and validation
- QAL-003, QAL-004
- Data retention, privacy, and compliance sign-off
- Clinical safety review

This backlog can be used directly for sprint planning, release planning, and development tracking.
