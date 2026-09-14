# Technical Task Breakdown by Backend and Frontend Modules

This document converts the v1 product backlog into a technical implementation plan by system layer. It is planning-only and does not include application code.

## 1. Overall architecture

### Recommended v1 architecture
- Frontend: responsive web app for patient and therapist workflows
- Backend: Python service with a persistent relational database
- Real-time exercise pipeline: browser-side camera + MediaPipe processing
- Storage: encrypted local browser storage for patient session data and video; backend for program, patient, and consent records
- Sync: consent-controlled upload of selected summaries, videos, and metadata

### v1 MVP constraints
- One representative exercise only: cloth-stick overhead hanging
- Right shoulder flexion is the single primary ROM measurement
- Right elbow extension is a required movement condition, not a second ROM measurement
- Two compensation detectors only: trunk leaning to the left and unintended shoulder abduction
- Therapist portal is full-featured except for exercise authoring
- Administrator backend is included and fully available in v1
- No multi-joint, multi-exercise, or multi-camera scope in this release

### High-level component map
- Backend API and business logic
- Database schema and migration tooling
- Authentication and role-based authorization
- Patient and therapist data management
- Program and exercise assignment logic
- Exercise library and duplication services
- Repetition, ROM, and compensation processing pipeline
- Consent and synchronization services
- Reporting and audit services
- Frontend patient app screens
- Frontend therapist dashboard and portal
- Shared UI components and localization layer

---

## 2. Backend module breakdown

### Module B1: Authentication and authorization
Tasks:
- User model design: admin, therapist, patient
- Secure login flows and password handling
- Role-based access control (RBAC)
- Session token management and expiry
- Audit log for sensitive actions
- Organization and permission scoping

Deliverables:
- Auth endpoints
- Permission matrix
- Route protection rules
- Login/logout/refresh APIs

### Module B2: Patient and therapist management
Tasks:
- Patient profile schema and CRUD APIs
- Therapist profile schema and organization mapping
- Patient assignment to therapists and programs
- Organization boundary enforcement
- Consent status profile management

Deliverables:
- Patient management API
- Therapist dashboard API
- Audit-safe data access layer

### Module B3: Home program and assignment engine
Tasks:
- Program creation, editing, and status lifecycle
- Program schedule definition
- Exercise ordering and sets/repetitions rules
- Assignment to patient records
- Skip and reschedule logic
- Completion tracking per session

Deliverables:
- /programs API set
- program domain model
- assignment rules service

### Module B4: Exercise library and duplication services
Tasks:
- Organization-level exercise library model
- Therapist-level library access model
- Duplicate operation preserving source linkage
- Patient-specific copy or cloned configuration
- Exercise metadata and status management
- Version reference tracking

Deliverables:
- exercise catalog API
- duplication workflow API
- version metadata model
- library permission rules

### Module B5: Session, exercise, and repetition domain model
Tasks:
- Training session record model
- Exercise session model
- Repetition record model
- Score and ROM result fields
- Compensation event schema
- Session status transitions

Deliverables:
- backend data model for sessions and results
- result persistence layer
- status workflow service

### Module B6: Motion analysis and scoring service
Tasks:
- Accept exercise results from the client for the single representative exercise
- Store right shoulder flexion ROM as the primary measurement and its target thresholds
- Validate right elbow extension as a required movement condition
- Validate repetition completion and timing for the scoped exercise flow
- Apply simplified score calculation rules for v1 MVP
- Store confidence values and thresholds for the selected movement
- Support persistence for trunk-left-leaning and unintended-shoulder-abduction events only

Deliverables:
- exercise scoring service
- ROM aggregation service
- summary generation utilities
- model-version metadata persistence
- v1-scoped compensation rule service

### Module B7: Consent, synchronization, and storage orchestration
Tasks:
- Consent record schema and permission checks
- Sync state machine: LOCAL_ONLY, WAITING_FOR_CONSENT, READY_TO_SYNC, SYNCING, SYNCED, SYNC_FAILED, DELETED_LOCALLY
- Local-to-cloud upload orchestration
- Retry policy and failure logging
- Privacy-controlled upload filtering
- Video upload and retention handling

Deliverables:
- sync service
- consent policy enforcement
- upload queue and retry logic

### Module B8: Video, media, and retention service
Tasks:
- Local video metadata capture
- Consent-controlled cloud upload
- Retention policy management
- Expiry and cleanup logic
- Secure storage reference mapping
- Video access authorization checks

Deliverables:
- media metadata model
- retention rules engine
- secure file reference service

### Module B9: Reporting and analytics backend
Tasks:
- Session summary generation
- Progress report computation
- Exercise history queries
- ROM trend aggregation
- Compensation frequency reporting
- Therapist dashboard summary data

Deliverables:
- reporting APIs
- aggregate query layer
- dashboard data contract

### Module B10: Audit logging and compliance services
Tasks:
- Event logging for action history
- Access tracking for patient data
- Consent and review event logs
- Retention and deletion audit records
- Admin visibility for support and compliance

Deliverables:
- audit log model
- log retrieval API
- compliance monitoring utilities

### Module B11: Configuration and localization backend
Tasks:
- System configuration model
- Organization-specific settings
- Localization resource storage
- Approved model registry metadata
- Default exercise library metadata

Deliverables:
- configuration API
- localization payload service
- model registry service

### Module B12: Database and API foundation
Tasks:
- Database schema design
- Migrations and versioning
- API framework setup
- Validation, error handling, and pagination
- Health checks and environment configuration

Deliverables:
- base API structure
- DB models and migration plan
- environment config and deployment baseline

---

## 3. Frontend module breakdown

### Module F1: App shell and navigation
Tasks:
- Responsive app layout
- Patient and therapist route structure
- Navigation guards and role checks
- Shared loading, error, and empty-state UI
- Traditional Chinese default language setup

Deliverables:
- root app shell
- route definitions
- auth-protected layouts

### Module F2: Authentication and onboarding
Tasks:
- Login screen
- Role-based landing page
- Password reset and session handling
- First-run patient and therapist onboarding flow

Deliverables:
- auth screens
- onboarding flows
- role redirect logic

### Module F3: Patient dashboard and program overview
Tasks:
- Assigned program list
- Session schedule view
- Program detail and exercise list
- Exercise summary cards
- Next-step guidance

Deliverables:
- patient dashboard screen
- program overview screen

### Module F4: Camera setup and exercise preparation screen
Tasks:
- Camera permission flow
- Live preview UI
- Visibility and lighting checks
- Position guidance and readiness state
- Error states for hardware or detection issues

Deliverables:
- camera setup screen
- readiness indicator components

### Module F5: Real-time exercise UI
Tasks:
- Canvas overlay for skeleton and markers for the single exercise flow
- Live right shoulder flexion ROM and target ROM display
- Right elbow extension movement-condition status
- Repetition counter and timer
- Warning banner and voice prompt UI for left trunk leaning and unintended shoulder abduction
- Pause/stop controls
- Object detection state display relevant to the single exercise

Deliverables:
- exercise execution screen
- live feedback components
- overlay layer for pose visualization
- v1-scoped compensation warning states

### Module F6: Error handling and retry flow
Tasks:
- Moderate warning alert screen
- Auto-pause state UI
- Replay error video screen
- Restart instructions and reset confirmation
- Retry logic UI messaging
- Skip/failure notification states

Deliverables:
- warning screen
- replay screen
- retry workflow UI

### Module F7: Exercise summary and history
Tasks:
- Per-exercise summary dashboard
- Session summary screen
- ROM trend and progress view
- Pain, difficulty, and fatigue reporting
- Completed vs skipped exercises display

Deliverables:
- summary screens
- historical review screens

### Module F8: Patient data consent and sync controls
Tasks:
- Consent toggles for upload and video sharing
- Sync status display and retry actions
- Local storage health warning
- Privacy confirmation flow

Deliverables:
- consent settings screen
- sync status UI

### Module F9: Therapist dashboard and patient review
Tasks:
- Therapist dashboard overview
- Patient list and filtering
- Patient profile and clinical notes
- Program assignment UI
- Review of consented session data and videos

Deliverables:
- therapist dashboard
- patient review screens

### Module F10: Program management UI
Tasks:
- Create new program
- Assign the single representative exercise to patients
- Configure right shoulder flexion ROM targets and safety limits
- Configure right elbow extension movement-condition thresholds
- Configure the two supported compensatory movement rules: left trunk leaning and unintended shoulder abduction
- Save and publish program states

Deliverables:
- program composer screen
- assignment form views
- v1-specific compensation configuration form

### Module F11: Exercise library and duplication UI
Tasks:
- Search and browse library
- View exercise details
- Duplicate into therapist library
- Reuse library items in programs
- Library status indicators

Deliverables:
- exercise library screen
- duplication workflow UI

### Module F12: Review and reporting UI
Tasks:
- Session-level review panels
- Compensation event timeline
- ROM charts
- Summary cards and trend graphs
- Export preparation UI

Deliverables:
- reporting screens
- review panels

### Module F13: Shared components and design system
Tasks:
- Form inputs and validation
- Cards, tables, modal dialogs, confirmations
- Accessibility and keyboard support
- Traditional Chinese localization resources
- Voice prompt integration
- Charting and visualization components

Deliverables:
- design system
- shared localization layer
- reusable UI primitives

### Module F14: Frontend state and API integration
Tasks:
- API client setup
- Query and mutation patterns
- Local persistence layer
- Error handling and retry logic
- Queueing for sync and offline-safe data flows

Deliverables:
- client state layer
- data-fetching architecture
- sync-aware state model

---

## 4. Cross-cutting technical tasks

### Security and privacy tasks
- Encrypt local patient data
- Secure backend auth and RBAC
- Consent enforcement in all reads and uploads
- Audit log integration for patient and therapist actions
- Video access control and secure links

### Localization tasks
- Traditional Chinese default strings
- Simplified Chinese and English fallback setup
- Externalized content for all user-visible labels and prompts
- Therapist-created exercise fields with localized metadata support

### Testing tasks
- ROM validation tests
- Compensation detection validation
- Browser/device compatibility testing
- Local storage and sync failure tests
- Video retention and consent test coverage

### Clinical safety tasks
- Disclaimer and emergency guidance UI
- Manual stop controls
- Unsafe ROM warnings
- Low-confidence measurement handling
- Clear separation between AI-assisted scoring and clinical diagnosis

---

## 5. Suggested implementation order

### Phase A: Foundation
- Authentication and authorization
- Database and API skeleton
- Patient/therapist models
- Program and assignment models
- Basic frontend app shell and routing

### Phase B: Patient flow
- Camera setup
- Real-time exercise UI
- Repetition and ROM handling
- Compensation warning and pause flow
- Session summary and reporting

### Phase C: Therapist workflow
- Patient management
- Program management
- Review dashboard
- Exercise library browsing and duplication
- Consent-aware result review

### Phase D: Stability and compliance
- Sync and consent engine
- Retention and audit features
- Security hardening and privacy checks
- Browser/device validation and optimization

---

## 6. v1 technical scope summary

### Backend must-have modules
- B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12

### Frontend must-have modules
- F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14

### Deferred beyond v1
- full custom exercise authoring tools
- AI-generated exercise creation workflow
- advanced production governance and publishing lifecycle
- multi-camera architecture

This technical breakdown is suitable for sprint planning, team assignment, and implementation sequencing for v1.
