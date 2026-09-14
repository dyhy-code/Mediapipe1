# Sprint-by-Sprint Execution Plan

## Assumptions
- v1 MVP is a single representative exercise: cloth-stick overhead hanging.
- Right shoulder flexion is the primary ROM measurement in v1.
- Right elbow extension is a required movement condition, not a second ROM measurement.
- Two compensations are detected in v1: trunk leaning to the left and unintended shoulder abduction.
- Full patient rehab flow and full therapist portal are in scope, except custom exercise authoring.
- Administrator backend is included.
- Backend uses persistent database and Python.
- Frontend is a responsive web application in Traditional Chinese by default.

## Team model suggestion
- Backend engineer 1
- Backend engineer 2
- Frontend engineer 1
- Frontend engineer 2
- QA / product validation engineer
- Optional UX / product owner support

---

## Sprint 1: Foundation and architecture

### Goal
Set up the technical foundation, data model, and core app shell.

### Backend tasks
- Initialize Python backend project structure
- Configure database and migration system
- Create core domain models:
  - user
  - patient
  - therapist
  - admin
  - organization
  - program
  - exercise library item
  - session
  - exercise session
  - repetition record
  - compensation event
  - video asset
  - consent sync record
- Implement auth skeleton and RBAC
- Add base API framework and health checks
- Create environment configuration and secret management

### Frontend tasks
- Set up frontend app shell
- Configure routing and role-based layout
- Create shared design system basics
- Build login UI shell and auth state handling
- Set up localization framework for Traditional Chinese
- Create dashboard placeholders for patient and therapist

### QA tasks
- Validate database migrations and environment setup
- Check login roles and route protection basics
- Validate responsiveness and default language rendering

### Deliverables
- Running backend skeleton
- Database schema foundation
- Frontend shell with auth route structure
- Basic role-based navigations

---

## Sprint 2: Patient auth, patient profiles, and program assignment

### Goal
Deliver patient access and therapist program assignment capabilities.

### Backend tasks
- Implement patient CRUD APIs
- Implement therapist and admin CRUD APIs
- Build program creation and assignment APIs
- Build exercise library listing APIs
- Add patient-program association logic
- Add consent metadata models and endpoints

### Frontend tasks
- Build patient login and dashboard screens
- Build therapist dashboard and patient list screen
- Create patient profile management forms
- Create program creation form
- Create assignment flow from therapist to patient
- Build program overview screen for patient

### QA tasks
- Validate patient/therapist access permissions
- Validate program assignment correctness
- Check data persistence after assignment

### Deliverables
- Working patient and therapist user flows
- Program assignment flow functional
- Data persisted in backend database

---

## Sprint 3: Exercise library and duplication workflow

### Goal
Support therapist library duplication and reuse without full custom exercise authoring.

### Backend tasks
- Build organization exercise library APIs
- Add therapist library duplication endpoint
- Preserve source reference and version metadata
- Add exercise metadata fields for the v1 exercise
- Add exercise status fields and approval-ready metadata
- Expose library query and filtering endpoints

### Frontend tasks
- Build exercise library screen
- Build library item detail view
- Build duplication workflow UI
- Add library item reuse into program creation
- Add version/archive visual indicators

### QA tasks
- Validate source library item remains unchanged after duplication
- Validate therapist can reuse items in programs
- Validate permission rules by user role

### Deliverables
- Exercise library browse and duplicate flow working
- Therapist can assign an exercise from the library without authoring

---

## Sprint 4: Camera setup and live exercise flow

### Goal
Implement the patient exercise experience for the single representative exercise.

### Backend tasks
- Define v1 exercise model and exercise configuration schema
- Add session lifecycle endpoints
- Add repetition-record endpoints
- Add event capture endpoints for warnings and errors
- Prepare storage and media metadata APIs for local video capture

### Frontend tasks
- Build camera permission/setup screen
- Build live preview with readiness checks
- Add skeleton overlay and pose markers
- Add exercise state machine UI
- Add timer, target ROM display, repetition count, and warning banner
- Add pause/stop actions

### QA tasks
- Validate camera access and readiness checks
- Validate exercise screen on supported browsers
- Validate no crash when tracking confidence is low

### Deliverables
- Exercise can be started and tracked in the patient app
- Camera setup and live motion screen functioning

---

## Sprint 5: ROM measurement and compensatory movement logic

### Goal
Implement the single measured joint and two compensation detectors.

### Backend tasks
- Add movement configuration for v1 exercise
- Add ROM result persistence model
- Implement scoring rules for the selected primary joint
- Add compensation event schema for two detectors
- Add thresholds and severity logic
- Add session summary aggregation APIs

### Frontend tasks
- Implement ROM display and target comparison
- Implement warning screens for two compensation events
- Implement recovery / restart flow
- Add scoring and summary visual states
- Add voice/on-screen prompt hooks for the v1 movement

### QA tasks
- Validate movement calculations are consistent
- Validate warning triggers and pause thresholds
- Validate event recording and summary values

### Deliverables
- Valid ROM, compensation, and summary logic for the v1 exercise
- Patient receives live feedback and warnings appropriately

---

## Sprint 6: Error replay, restart, and retry flow

### Goal
Deliver the full patient recovery process after a compensation event.

### Backend tasks
- Add retry and invalid repetition logic to session models
- Save replay metadata and video references
- Add error event and skip reason persistence
- Add result finalization service for incomplete sessions

### Frontend tasks
- Build error replay screen
- Build auto-pause state UI and alarm flow
- Build restart from last invalid repetition flow
- Build retry guidance and skip status handling
- Add written and voice instruction screens

### QA tasks
- Validate pauses after repeated errors
- Validate same-error retry and skip behavior
- Validate patient can resume correctly after reset

### Deliverables
- Full validation and recovery flow for the v1 exercise
- Session can complete or be marked skipped accurately

---

## Sprint 7: Therapist review, reports, and data access

### Goal
Make therapist review functional for patient and program outcomes.

### Backend tasks
- Implement patient progress API
- Add session review and summary APIs
- Add compensation review endpoints
- Add consent-filtered video access logic
- Add therapist notes and review status fields
- Add report query endpoints

### Frontend tasks
- Build therapist review dashboard
- Build patient detail and progress screens
- Build session summary screen
- Build consented video review area
- Build therapist notes and comments
- Add progress charts and ROM summary visualizations

### QA tasks
- Validate only consented videos are accessible
- Validate therapist can review correct session records
- Validate reporting consistency

### Deliverables
- Therapist can review patient data and exercise results
- Consent-based access is enforced

---

## Sprint 8: Consent, sync, and privacy enforcement

### Goal
Deliver secure consent and data synchronization behavior for v1.

### Backend tasks
- Implement sync state machine and records
- Build consent enforcement layer
- Add upload queue and retry logic
- Add retention policy logic
- Add audit logging for access and sync actions
- Build secure media reference handling

### Frontend tasks
- Create patient consent settings screen
- Create sync status screen
- Implement upload status and failure handling
- Show local storage warnings and privacy notices

### QA tasks
- Validate failed sync does not delete local data
- Validate patient consent restrictions are enforced
- Validate video retention and audit tracking

### Deliverables
- Consent and sync workflow fully operational
- Privacy protections integrated into v1 flow

---

## Sprint 9: Admin backend and operational completeness

### Goal
Complete administrator backend readiness and operational controls.

### Backend tasks
- Admin user management APIs
- Organization configuration APIs
- Default program and library management endpoints
- Approved model metadata registry endpoints
- Audit log listing and export support
- System health and configuration management

### Frontend tasks
- Admin dashboard shell
- User management screens
- Organization configuration screens
- Model and configuration listing screens

### QA tasks
- Validate admin visibility versus patient/therapist restrictions
- Validate role separation and security constraints
- Validate auditability of privileged actions

### Deliverables
- Admin backend is ready and operational
- Governance and control features integrated for v1

---

## Sprint 10: Hardening, validation, and readiness

### Goal
Stabilize the MVP for internal validation and release readiness.

### Backend tasks
- Performance tuning and query optimization
- Security hardening
- Error handling review and validation
- Database cleanup and data integrity checks
- Final retention and audit review

### Frontend tasks
- Cross-browser QA
- Mobile responsiveness validation
- Localization checks in Traditional Chinese
- UI polish and message consistency
- Final patient and therapist flow testing

### QA tasks
- End-to-end patient workflow tests
- End-to-end therapist workflow tests
- Consent, upload, and privacy checks
- Edge cases: low tracking confidence, camera blocked, storage errors
- Final regression testing

### Deliverables
- Release candidate for v1 MVP
- Acceptance checklist signed off by product and QA

---

## Suggested release gates

### Release gate 1: Functionality
- One exercise flow works end-to-end
- One measured joint and two compensations function correctly
- Patient and therapist workflows work with all core actions

### Release gate 2: Data and privacy
- Consent flows work
- Sync states are correct
- Local storage and video retention behave as expected
- Audit logs are recorded

### Release gate 3: Admin readiness
- Administrator backend is available and secure
- Role boundaries are enforced
- Org-level controls are functional

### Release gate 4: Stability
- Browser/device testing passes for supported targets
- Edge cases and failure handling are covered
- No critical privacy or data-loss issues remain

---

## Scope summary by sprint
- Sprint 1: foundation
- Sprint 2: patient and therapist access
- Sprint 3: exercise library and duplication
- Sprint 4: exercise preparation and live tracking
- Sprint 5: ROM + compensations
- Sprint 6: error handling + retry workflow
- Sprint 7: therapist review and reports
- Sprint 8: consent + sync + privacy
- Sprint 9: admin backend
- Sprint 10: QA, hardening, release readiness

This plan is aligned to the confirmed v1 MVP scope and keeps implementation realistic for a single exercise, one primary measurement, and two compensation rules.
