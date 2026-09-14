HP: AI-Assisted Upper-Limb Home Rehabilitation Application
Document status: Draft
Version: 0.5.0
Initial clinical focus: Orthopedic rehabilitation
Initial development stage: Proof of concept
Long-term target: Production clinical rehabilitation system
Initial platform: Responsive web application
Target devices: iOS, Android, tablet, and desktop browsers
Future platform option: Native or hybrid mobile application
Initial camera: One built-in front-facing camera
Future camera support: Up to three synchronized cameras
Initial motion framework: MediaPipe
Backend: Python
Persistent data store: Required from the initial build
Primary language: Traditional Chinese
Additional languages: Simplified Chinese and English

Confirmed scope decisions for the first release:
- First release includes the full patient home-rehabilitation workflow and therapist portal.
- The therapist v1 scope includes patient management, program management, review workflows, and exercise-library duplication features.
- Exercise authoring is deferred to a later stage (Stage 1.2) rather than the initial release.
- The MVP uses a persistent database-backed backend from the start.
- The representative MVP exercise is a cloth-stick overhead hanging task.
- The target movement requires right shoulder flexion and right elbow extension.
- The single primary ROM measurement for v1 is right shoulder flexion; right elbow extension is a required movement condition, not a second ROM measurement.
- The two v1 compensations are trunk leaning to the left and unintended shoulder abduction.
- Clinical target is close to clinical-grade measurement rather than purely coaching-oriented estimation.
- Full-session videos remain stored locally by default, with consent-based sharing controls.
- Consent and synchronization logic remain in the product flow from the first release.

# 1. Product Overview
The application is designed to assist patients in performing therapist-prescribed upper-limb rehabilitation exercises at home.

The application uses the device camera and AI-assisted computer vision to:

Detect the patient’s body and body landmarks.
Differentiate the patient from the background.
Detect and track exercise-related objects.
Measure selected upper-limb joint range of motion.
Detect compensatory or “trick” movements.
Provide real-time visual and voice feedback.
Pause or stop an exercise when repeated incorrect movement is detected.
Replay the latest incorrect movement with written instructions.
Calculate exercise and training-session scores.
Store patient-generated clinical data locally under patient control.
Synchronize selected information with therapists through consent-based cloud sharing.
Allow therapists to create, configure, prescribe, review, and version exercises.
Allow the organization to maintain software, exercise libraries, AI models, and standardized compensatory-movement definitions.
The first release focuses on orthopedic rehabilitation using a single front-facing camera and primarily 2D screen-position tracking.

# 2. Objectives
## 2.1 Primary objectives
Facilitate safe home-based upper-limb exercise.
Provide immediate feedback during exercise.
Detect selected compensatory movements.
Measure patient-specific range of motion.
Support task-based exercises involving household objects.
Provide therapists with objective progress information.
Allow therapists to customize exercises for individual patients.
Keep raw patient data under patient control by default.

## 2.2 Secondary objectives
Provide exercise demonstration videos.
Record and replay incorrect movement.
Track progress across sessions.
Standardize compensatory-movement terminology.
Support therapist-created exercises.
Support future clinical research and model improvement.
Provide a foundation for eventual clinical deployment.

## 2.3 Non-objectives for the first release
The first release will not initially provide:

Definitive medical diagnosis.
Automatic replacement of therapist judgment.
Fully automated treatment decisions.
Fully reliable 3D motion capture.
Mandatory multi-camera capture.
Wearable-sensor integration.
Finger and hand-joint analysis.
Clinical certification or regulatory approval.


# 3. User Roles
## 3.1 Patient
The patient shall be able to:

Log in securely.
View assigned home programs.
Watch exercise demonstration videos.
Perform camera setup.
Perform prescribed exercises.
Receive real-time feedback.
Pause or stop training manually.
Restart an invalid repetition.
Report pain and difficulty.
Respond to fatigue prompts.
Review exercise summaries.
Review training history.
Control whether data is synchronized.
Control whether videos are shared.

## 3.2 Therapist
The therapist shall be able to:

View authorized patients.
Manage patient records within the permitted organization or service, where required for clinical coverage.
Create and assign home programs.
Configure patient-specific ROM targets.
Configure safety limits.
Select compensatory movements to detect.
Configure detection thresholds.
Review patient progress.
Review compensation events.
Review consented session videos.
Add clinical comments.
Duplicate organization exercises into the therapist library.
Duplicate therapist-managed exercise templates for patient customization.
Review and approve exercise-library items in the applicable workflow.
Manage program assignment and review status.
Upload exercise demonstration videos for library items.
Review AI-generated exercise configurations.
Version and archive exercise library entries where supported.
Create custom compensatory-movement definitions.
Custom exercise authoring remains in a later staged release (Stage 1.2) and is not part of v1.

## 3.3 System administrator
The system administrator shall be able to:

Manage users and roles.
Manage organizations and system configuration.
Manage default exercises.
Manage the standardized compensatory-movement taxonomy.
Manage approved AI models.
Manage application updates.
Manage localization content.
View system-health information.
View technical audit logs.
By default, system administrators shall not access identifiable patient demographic data, clinical notes, or patient videos unless separately authorized and audited.

# 4. Data Ownership and Storage
## 4.1 Patient-controlled data
Patient-generated data shall be stored locally on the patient’s device by default.

This includes:

Full exercise-session videos.
Error-event video segments.
Camera frames.
Pose landmarks.
Object-detection results.
Joint-angle measurements.
Repetition records.
Compensation events.
Exercise scores.
Pain ratings.
Difficulty ratings.
Fatigue ratings.
Patient comments.
Locally generated reports.
Treatment history.
The organization shall not receive unrestricted access to raw patient-generated data.

## 4.2 Organization-managed data
The organization cloud shall maintain:

Application software updates.
Default exercise definitions.
Exercise-library metadata.
Approved exercise templates.
Standardized compensatory-movement definitions.
Approved AI models.
AI model metadata and versions.
Localization files.
Organization configuration.
Therapist account data.
Authentication metadata.
Consent and synchronization settings.
Optional consented clinical summaries.
Technical and administrative audit logs.

## 4.3 Consent-based synchronization
Patient data shall be uploaded according to patient consent and configured sharing permissions.

The patient may share:

Exercise summaries.
ROM results.
Scores.
Compensation summaries.
Pain and difficulty ratings.
Error-event video clips.
Full-session videos.
Raw motion data.
Recommended default:

Data type	Default storage	Therapist access
Full-session video	Patient device	Only with consent
Error video clips	Patient device	Only with consent
Raw camera frames	Temporary/local	Not shared by default
Pose landmarks	Patient device	Not shared by default
ROM measurements	Patient device	Shared with consent
Scores	Patient device	Shared with consent
Compensation summaries	Patient device	Shared with consent
Pain and difficulty scores	Patient device	Shared with consent
Exercise library	Organization cloud	Downloaded to patient device
Software and AI updates	Organization cloud	Downloaded by application

## 4.4 Synchronization states
Every local record shall have one of the following states:

text
LOCAL_ONLY
WAITING_FOR_CONSENT
READY_TO_SYNC
SYNCING
SYNCED
SYNC_FAILED
DELETED_LOCALLY
If synchronization fails, local data shall not be deleted automatically.

## 4.5 Web-storage limitation
The initial web application may use encrypted browser storage such as IndexedDB. However, browser storage has limitations:

The operating system or browser may delete stored data.
Private browsing may disable persistent storage.
Storage capacity may be insufficient for full-session videos.
Background processing may be interrupted.
Browser access to cameras varies by platform.
Browser storage does not provide the same control as native encrypted storage.
The application shall check storage capability before training starts and warn the patient if storage is unsuitable.

For production clinical use, a native or hybrid application should be considered.

# 5. Platform and Camera Requirements
## 5.1 Initial platform
The application shall support:

iOS mobile browsers.
Android mobile browsers.
Tablets.
Desktop browsers for therapist use.
Recommended browsers:

Safari on iOS.
Chrome on Android.
Chrome, Edge, and Safari on desktop.

## 5.2 Initial camera
The first release shall use:

One built-in front-facing camera.
2D screen-position tracking.
MediaPipe pose estimation.
MediaPipe-compatible object detection where appropriate.
The application shall:

Request camera permission.
Display a live preview.
Guide camera positioning.
Detect whether the patient is visible.
Check whether required joints are visible.
Detect poor lighting where possible.
Detect whether the patient is too close or too far.
Detect whether the required object is visible.

## 5.3 Future multi-camera support
The architecture shall allow up to three cameras:

One primary camera.
One optional secondary camera.
Two optional secondary cameras.
The first release does not require simultaneous multi-camera capture.

The future camera architecture shall support:

Camera discovery.
Permission management.
Camera-role assignment.
Timestamp synchronization.
Frame synchronization.
Camera calibration.
Per-camera confidence.
Cross-camera landmark matching.
Conflict resolution.
Fallback to the primary camera.
Possible camera positions:

text
FRONT
LEFT_SIDE
RIGHT_SIDE
REAR
TOP
CUSTOM
Possible camera roles:

text
PRIMARY
SECONDARY
REFERENCE
OBJECT_CAMERA
Each session shall store:

text
camera_count
camera_ids
camera_positions
camera_resolutions
camera_frame_rates
camera_calibration_status
camera_sync_status
primary_camera_id

# 6. Clinical Scope
## 6.1 Initial tracked joints and landmarks
The first stage shall track:

Left shoulder.
Right shoulder.
Left elbow.
Right elbow.
Left wrist.
Right wrist.
Trunk.
Head.
Additional torso, hip, facial, or head landmarks may be used when needed for posture analysis.

## 6.2 Stage 2 hand and finger tracking
Stage 2 may include:

Fingers.
Thumb.
Palm landmarks.
Individual hand joints.

## 6.3 Initial ROM movements
Shoulder
Flexion.
Extension.
Abduction.
Adduction.
Internal rotation.
External rotation.
Elbow
Flexion.
Extension.
Forearm
Pronation.
Supination.
Wrist
Flexion.
Extension.
Ulnar deviation.
Radial deviation.

Stage 2
Finger flexion.
Finger extension.
Finger abduction.
Finger adduction.
Thumb opposition.

## 6.4 ROM outputs
The system shall report:

Minimum ROM.
Maximum ROM.
Average ROM.
ROM in degrees.
ROM as a percentage of target.
ROM per repetition.
ROM per set.
ROM for the exercise.
ROM across the full training session.
Measurement confidence.

## 6.5 Patient-specific targets
Clinical reference values may be supplied as organization defaults.

Therapists shall be able to override these values for:

Individual patients.
Individual exercises.
Individual joints.
Individual movement directions.
Patient-specific targets shall be used for ROM scoring.

## 6.6 Camera-related limitations
A single front-facing RGB camera may provide limited accuracy for:

Shoulder internal and external rotation.
Forearm pronation and supination.
Wrist deviation.
Scapular movement.
Depth-related compensation.
Occluded joints.
The system shall:

Record confidence values.
Mark low-confidence measurements.
Provide exercise-specific camera instructions.
Allow therapists to disable unsuitable measurements.
Reserve the option for future additional-camera analysis.
Avoid presenting low-confidence measurements as clinically precise.


# 7. Body and Object Detection
## 7.1 Body landmark detection
The application shall use MediaPipe as the initial body landmark and pose-estimation framework.

The system shall:

Detect body landmarks.
Display a skeleton overlay.
Display selected joint markers.
Track the patient over time.
Detect missing landmarks.
Detect low-confidence tracking.
Pause or invalidate analysis when tracking is unreliable.
Record the model and package version used.

## 7.2 Supported exercise objects
Initial object categories:

Cloth stick.
Towel.
Cup.
Ball.
Bottle.
Compression item.
Upper garment.
Tie.
Bowl.
Spoon.
Sweeper.
Therapist-defined objects.
Objects may vary in color, size, shape, and appearance. The system shall not assume that all household objects are standardized.

The application shall support:

Generic object categories.
Object-placement instructions.
Object-confidence thresholds.
Therapist confirmation where appropriate.
Future custom object models.
Optional visual markers.
Temporal object tracking.

## 7.3 Object-body differentiation
The system shall distinguish between:

Patient body landmarks.
Exercise objects.
Background objects.
Other visible objects.
The system shall combine:

Pose estimation.
Object detection.
Temporal tracking.
Confidence thresholds.
Region-of-interest restrictions.
Therapist-configured object requirements.

## 7.4 Task-based object interaction
The system shall support detection of:

Whether the patient is holding the object.
Which hand is holding the object.
Whether both hands are holding the object.
Whether the object reaches a target region.
Whether the object follows a target path.
Whether the object remains visible.
Whether the object remains stable.
Whether the object is released or dropped.
Whether the object touches a target.
Whether the object orientation is acceptable.

# 8. Exercise and Home Program Requirements
## 8.1 Home program
A home program shall contain:

Program name.
Description.
Treatment objective.
Start date.
End date.
Training schedule.
Exercise sequence.
Exercise order.
Repetitions.
Sets.
Rest period.
Therapist notes.
Patient-specific ROM targets.
Safety limits.
Completion requirements.
Skipped exercises shall be repeated on the next applicable training day unless the therapist changes the program.

## 8.2 Exercise configuration
Each exercise shall support:

Basic information
Exercise name.
Description.
Clinical objective.
Body side.
Difficulty level.
Required equipment.
Required object.
Contraindications.
Safety instructions.
Patient instructions.
Therapist notes.
Media
Demonstration video.
Instruction images.
Voice instructions.
Written instructions.
Incorrect-movement examples.
Reset-position video.
Movement sequence
Preparation.
Starting position.
Movement phase.
Target position.
Return phase.
Completion condition.
Repetitions.
Sets.
Rest time.
Maximum exercise duration.
Movement-speed requirement.
Hold duration.
ROM configuration
Joints to measure.
Movement type.
Minimum target ROM.
Maximum target ROM.
Target ROM.
Allowed tolerance.
Starting position.
Ending position.
Patient-specific override.
Safety stop range.
Compensatory movement configuration
Compensations to detect.
Warning threshold.
Moderate threshold.
Severe threshold.
Safety threshold.
Severity calculation.
Number of allowed occurrences.
Feedback message.
Repetition invalidation rule.
Set invalidation rule.
Exercise-stop rule.
Object configuration
Required object.
Object class.
Required hand.
Holding requirement.
Object start position.
Target position.
Path requirement.
Orientation requirement.
Contact requirement.
Stability requirement.
Detection-confidence threshold.


# 9. Compensatory Movement Detection
## 9.1 Initial supported compensations
Trunk leaning.
Trunk rotation.
Shoulder shrugging.
Scapular elevation, where detectable.
Elbow movement outside the intended path.
Wrist compensation.
Head movement.
Excessive movement speed.
Incorrect starting position.
Incorrect ending position.
Loss of posture.
Excessive movement of the non-target limb.
Insufficient stabilization.
Object-position error.
Object-orientation error.
Object release or drop.
Incorrect hand use.
The therapist shall choose which compensations apply to each exercise.

## 9.2 Standard compensation definition
Each compensation type shall contain:

Unique ID.
Standard code.
Traditional Chinese name.
Simplified Chinese name.
English name.
Clinical description.
Detection description.
Body region.
Required landmarks.
Detection model or rule.
Measurement metric.
Warning threshold.
Moderate threshold.
Severe threshold.
Safety threshold.
Severity calculation.
Default feedback.
Corrective instruction.
Example video.
Model version.
Validation status.
Active status.

## 9.3 Severity calculation
The default severity calculation shall be based on the percentage of the undesired movement threshold reached.

text
severity_percentage =
    observed_undesired_motion /
    configured_reference_threshold * 100
Supported severity levels:

text
NONE
MILD
MODERATE
SEVERE
Thresholds may use:

Degrees.
Angular deviation.
Normalized screen distance.
Percentage of ROM.
Percentage of patient-specific target.
Duration.
Consecutive frames.
Number of occurrences.

## 9.4 Custom compensations
Therapists may create custom compensatory-movement definitions.

Each custom definition shall include:

Name.
Description.
Body region.
Relevant joints.
Desired movement.
Undesired movement.
Measurement method.
Threshold.
Severity definition.
Feedback instruction.
Example video.
Detection scope.
Approval status.
A custom clinical definition shall not automatically be treated as a validated machine-learning detector.

## 9.5 AI governance
AI-generated configurations must be reviewed before publication.

Approval workflow:

text
DRAFT
    |
THERAPIST REVIEW
    |
TECHNICAL VALIDATION
    |
CLINICAL APPROVAL
    |
PUBLISHED
The application shall distinguish:

text
RULE_BASED_DETECTOR
MACHINE_LEARNING_DETECTOR
THERAPIST_CONFIGURED_THRESHOLD
AI_SUGGESTED_CONFIGURATION
CLINICALLY_APPROVED_DETECTOR

# 10. Feedback and Error Workflow
## 10.1 During movement
The live screen shall display:

Camera preview.
Skeleton overlay.
Selected joint markers.
Current ROM.
Target ROM.
Target percentage.
Repetition count.
Set number.
Timer.
Tracking confidence.
Object status.
Safety status.
Pause button.
Stop button.

## 10.2 Error sequence
Step 1: Moderate warning
When a moderate compensation is detected:

Display a visual warning.
Provide voice feedback.
Highlight the affected body region.
Do not count the invalid repetition.
Continue monitoring.
Record the event.

Step 2: Automatic pause
After moderate-to-severe error occurs three times cumulatively:

Pause the exercise.
Stop repetition counting.
Play an alarm.
Display the detected problem.
Require the patient to reset or acknowledge.
Preserve the latest movement recording.
Record the event.
The default count is per exercise, but therapists may configure it per repetition, set, or exercise.

Step 3: Playback
The application shall:

Play the latest incorrect repetition or round.
Highlight the affected body region.
Display the compensation type.
Display severity.
Display written instructions.
Provide voice instructions.

Step 4: Restart
The application shall:

Restart from the invalid repetition.
Require the patient to return to the starting position.
Confirm the starting position.
Resume counting only after a valid reset.

Step 5: Repeat error
Each compensation type shall receive one retry by default.

If the same compensation is detected again during the retry:

Stop the exercise.
Mark it as skipped or incomplete.
Record the reason.
Save the event and video.
Add a therapist-review flag.
Continue to the next exercise if configured.
Schedule the skipped exercise for the next applicable training day.
If a different compensation occurs, apply the same warning-to-pause workflow to the new compensation.

The application cannot physically prevent movement. Stopping means stopping counting, pausing the software, playing an alarm, requiring reset, or ending the exercise.

# 11. Patient Safety and Feedback
The application shall:

Display a safety disclaimer.
Instruct patients to follow therapist instructions.
Provide emergency instructions.
Allow manual exercise termination.
Request pain and difficulty ratings.
Support fatigue prompts.
Provide unsafe-ROM warnings.
Support therapist-configured stop limits.
Record safety-related events.
Provide therapist alerts according to organization policy.
The application shall not claim to guarantee injury prevention or provide a diagnosis.

# 12. Feedback Timing
During movement
Live camera image.
Skeleton and joint overlays.
ROM display.
Repetition count.
Object status.
Voice instructions.
Warning messages.
Immediately after an error
Alarm.
Automatic pause.
Error video playback.
Highlighted body region.
Written instructions.
Voice instructions.
Restart instruction.
End of each exercise
Display:

Exercise status.
Maximum ROM.
Average ROM.
Percentage of target reached.
Correct repetitions.
Incorrect repetitions.
Compensation summary.
Exercise score.
Pain rating.
Difficulty rating.
Optional patient comment.
End of full training
Display:

Overall score.
Completed exercises.
Skipped exercises.
Total repetitions.
Total time.
ROM summary.
Compensation summary.
Pain summary.
Difficulty summary.
Fatigue summary.
Therapist message, if configured.


# 13. Scoring
Each exercise shall receive a score from 0 to 100.

Default weighting:

text
ROM achievement: 50%
Movement accuracy: 50%

## 13.1 ROM score
text
rom_percentage =
    measured_target_range /
    prescribed_target_range * 100
The ROM percentage shall normally be capped at 100.

text
rom_score =
    min(rom_percentage, 100) * 0.50

## 13.2 Movement accuracy score
Movement accuracy shall include:

Correct repetitions.
Invalid repetitions.
Compensation count.
Compensation severity.
Object interaction.
Starting-position accuracy.
Ending-position accuracy.
Movement-speed compliance.
text
accuracy_score =
    normalized_movement_accuracy * 0.50

## 13.3 Total score
text
total_score =
    rom_score + accuracy_score
The system shall store:

Score version.
Exercise version.
AI model version.
Input metrics.
Confidence values.
Therapist adjustments, if permitted.
Scores are AI-assisted exercise-performance scores and are not standalone clinical outcomes.

# 14. Reporting and Retention
## 14.1 Patient report
Patients may view:

Exercise scores.
ROM progress.
Completed sessions.
Correct and incorrect repetitions.
Compensation history.
Pain history.
Difficulty history.
Skipped exercises.
General progress charts.

## 14.2 Therapist report
Therapists may view consented:

Session trends.
ROM charts.
Maximum ROM per joint.
Average ROM per joint.
Percentage of target ROM achieved.
Correct and incorrect repetitions.
Compensation frequency.
Compensation severity.
Affected body region.
Skipped exercise history.
Pain and difficulty ratings.
Fatigue prompts.
Patient comments.
Exercise completion rate.
Consent-authorized videos.
AI confidence.
Model version.
Therapist review status.

## 14.3 Retention
Default retention:

Progress summaries: at least one year or until treatment completion.
Compensation summaries: at least one year or until treatment completion.
Full-session videos: 28 days by default.
Error clips: 28 days by default.
Therapist-retained videos: until therapist deletion or organizational retention expiry.
Retention policies shall be configurable and auditable.

# 15. Therapist Portal
The therapist portal shall include:

Dashboard.
Patient list.
Patient profile.
Program management.
Exercise library.
Exercise creation wizard. (stage 1.2)
Exercise video upload.
AI-generated configuration review.
Joint-selection interface.
ROM target configuration.
Compensation selector.
Threshold configuration.
Safety-limit configuration.
Exercise preview.
Approval queue.
Exercise version history.
Session reports.
Video review.
Progress charts.
Therapist notes.
Report export.


# 16. Exercise Library and Versioning
Exercise statuses:

text
ORGANIZATION_DEFAULT
THERAPIST_PRIVATE
DRAFT
PENDING_REVIEW
APPROVED
PUBLISHED
ARCHIVED
REJECTED
Organization-default exercises:

Must not be directly modified in the organization cloud history.
May be duplicated into a therapist library.
May be customized for a particular patient.
Must retain a link to the original exercise.
Must preserve historical versions.
When an exercise is edited after prescription:

A new version shall be created.
Historical sessions shall reference the previous version.
Historical reports shall not change.
The therapist shall be warned about future-program effects.


# 17. Exercise Creation
## 17.1 Form-first workflow
Enter exercise name and description.
Select body side.
Select joints to measure.
Select ROM movements.
Enter target ROM.
Configure starting and ending positions.
Select the required object.
Select compensatory movements.
Configure thresholds.
Configure repetitions, sets, speed, and rest time.
Upload demonstration media.
Preview.
Submit for approval or publish according to permissions.

## 17.2 Video-first workflow
Upload or record a demonstration.
AI analyzes the video.
AI proposes exercise parameters.
Therapist reviews the proposed values.
Therapist edits or rejects the values.
Therapist completes missing fields.
Therapist previews the exercise.
Therapist submits it for approval.
The approved exercise is published to selected patients.
AI-generated values must not be published without therapist confirmation.

# 18. MediaPipe and Third-Party Components
## 18.1 MediaPipe usage
The application shall use MediaPipe as the initial framework for:

Human body landmark detection.
Pose estimation.
Joint tracking.
Optional hand and finger tracking in Stage 2.
Object detection or object tracking where supported.
Real-time camera-frame processing.
Potential components:

MediaPipe Pose Landmarker.
MediaPipe Tasks Vision.
MediaPipe Object Detector.
MediaPipe Hand Landmarker for Stage 2.
MediaPipe visualization utilities.
The exact component selection shall be confirmed during the proof of concept.

## 18.2 Dependency management
MediaPipe shall be declared as a pinned dependency.

Example:

txt
mediapipe==TODO_VERSION
opencv-python==TODO_VERSION
numpy==TODO_VERSION
The final production version must replace TODO_VERSION with the tested version.

The project shall record:

text
Component
Package
Version
Platform
Model file
Model version
License
Source URL
Date reviewed
Known limitations

## 18.3 Model management
Model files shall be managed separately from the application source code where appropriate.

The project shall document:

Model download source.
Filename.
Model version.
SHA-256 checksum.
License.
Redistribution permission.
Installation method.
Known limitations.
Model files shall not be committed to GitHub unless:

Their license allows redistribution.
Their size is suitable.
They contain no patient data.
The organization has reviewed the license.

## 18.4 Model registry
Each deployed model shall include:

Model name.
Model version.
Model type.
Training-data description.
Dataset version.
Intended use.
Input and output format.
Validation results.
Known limitations.
Ownership.
License.
Approval status.
Deployment date.
Rollback version.
Checksum.
Every exercise session shall store the model versions used.

## 18.5 Third-party notices
The repository shall include:

text
docs/THIRD_PARTY_NOTICES.md
This file shall record:

MediaPipe.
OpenCV.
NumPy.
Frontend libraries.
Backend libraries.
AI models.
Cloud SDKs.
Other third-party components.
The software license and model license shall be reviewed separately.

## 18.6 Source-code handling
The project should not copy the entire MediaPipe source repository into the application repository unless required.

A MediaPipe Git submodule or fork should only be used when:

MediaPipe source code is modified.
A fixed source commit is required.
The project compiles MediaPipe from source.
A maintained organizational fork is required.
Otherwise, use a pinned package dependency.

# 19. Security and Privacy
The system shall be designed for compliance with:

Hong Kong Personal Data (Privacy) Ordinance.
Relevant Hong Kong Hospital Authority privacy and security requirements.
Organization-specific clinical data policies.
Future medical-device and healthcare regulations.
The system shall implement:

HTTPS/TLS.
Encryption at rest.
Encrypted local patient storage.
Secure password hashing.
Role-based access control.
Least-privilege access.
Consent records.
Data-sharing permissions.
Audit logs.
Secure video links.
Expiring playback URLs.
Session timeout.
Rate limiting.
Backup and recovery.
Secure deletion.
Data-export procedures.
Dependency vulnerability scanning.
Never commit the following to GitHub:

Patient videos.
Patient images.
Raw camera frames.
Identifiable patient data.
Authentication tokens.
API keys.
Passwords.
Private datasets.
Unapproved clinical data.
Unreviewed private model-training data.
Recommended .gitignore entries:

gitignore
.env
.env.*
*.key
*.pem
secrets/
patient-data/
patient-videos/
recordings/
raw-frames/
clinical-datasets/
models/


# 20. Localization
Initial language priority:

Traditional Chinese.
Simplified Chinese.
English.
Localization shall cover:

Patient instructions.
Therapist instructions.
Voice prompts.
Error messages.
Compensation names.
Exercise descriptions.
Reports.
Safety warnings.
Consent forms.
Notifications.
All user-visible content shall be externalized from source code.

Therapist-created exercises should support localized content fields.

# 21. Conceptual Data Model
<Admin>
text
id
role
username
password_hash
display_name
language
status
created_at
updated_at
last_login_at

<Patient>
text
id
user_id
external_patient_id
name
date_of_birth
affected_side
diagnosis_category
emergency_contact
consent_status
video_consent_status
data_sharing_preferences
treatment_start_date
treatment_end_date
created_by
created_at
updated_at

<Therapist>
text
id
user_id
staff_id
department
organization_id
status

<Exercise>
text
id
owner_type
owner_id
source_default_exercise_id
name
description
status
current_version_id
created_by
created_at
updated_at

<ExerciseVersion>
text
id
exercise_id
version_number
measured_joints
movement_types
target_rom_configuration
starting_position
ending_position
repetitions
sets
rest_time
speed_configuration
object_configuration
compensatory_movement_configuration
safety_configuration
instruction_media_id
approval_status
created_by
approved_by
created_at

<HomeProgram>
text
id
patient_id
created_by
name
description
start_date
end_date
schedule_configuration
status
created_at
updated_at

<TrainingSession>
text
id
patient_id
program_id
started_at
completed_at
status
device_type
browser
camera_configuration
overall_score
pain_score
difficulty_score
fatigue_score
local_storage_status
sync_status
model_versions

<ExerciseSession>
text
id
training_session_id
exercise_version_id
sequence_order
started_at
completed_at
status
score
maximum_rom
average_rom
target_rom_percentage
correct_repetitions
incorrect_repetitions
skipped_reason
pain_score
difficulty_score
therapist_review_status

<RepetitionRecord>
text
id
exercise_session_id
repetition_number
set_number
started_at
completed_at
status
measured_rom
target_rom_percentage
accuracy_score
video_segment_id

<CompensationEvent>
text
id
repetition_record_id
compensation_type_id
severity
severity_percentage
affected_region
threshold_value
observed_value
confidence
timestamp_start
timestamp_end
response_action
retry_count
therapist_review_status
therapist_comment
video_segment_id

<CompensationType>
text
id
code
localized_name
clinical_description
detection_definition
metric_definition
threshold_definition
severity_definition
default_feedback
detector_type
model_id
status
approval_status

<VideoAsset>
text
id
patient_id
session_id
exercise_session_id
type
local_storage_reference
cloud_storage_reference
encryption_status
consent_status
retention_until
created_at
deleted_at

<SyncRecord>
text
id
patient_id
record_type
record_id
sync_status
consent_reference
last_attempt_at
synced_at
failure_reason

<AuditLog>
text
id
actor_user_id
action
resource_type
resource_id
timestamp
ip_address
metadata


# 22. Technical Architecture
text
Patient Device
├── Responsive Web or Hybrid Mobile Client
├── Camera Capture
├── MediaPipe Pose Detection
├── Object Detection
├── Motion Analysis
├── Exercise State Machine
├── Local Encrypted Data Store
├── Local Video Store
└── Consent-Based Synchronization
          |
          | Optional encrypted synchronization
          v
Organization Backend
├── Python API
├── Authentication
├── Exercise Library
├── Program Management
├── Approved AI Models
├── Therapist Portal
├── Consent Management
├── Reports
├── Audit Logs
└── Optional Consent-Based Media Storage
Potential technologies:

Python.
FastAPI or Django.
PostgreSQL.
Redis.
Celery.
WebSocket.
Docker.
GitHub Actions.
IndexedDB for proof of concept.
Native secure storage for future mobile application.


# 23. Real-Time Motion Pipeline
text
Camera Capture
    |
    v
Frame Sampling
    |
    v
Image Quality Check
    |
    v
Pose Landmark Detection
    |
    v
Object Detection
    |
    v
Temporal Tracking
    |
    v
Joint Angle and Position Calculation
    |
    v
ROM Measurement
    |
    v
Compensation Detection
    |
    v
Exercise State Machine
    |
    v
Feedback and Repetition Decision
    |
    v
Local Session Storage
    |
    v
Consent-Based Synchronization
The system shall:

Maintain timestamps.
Handle dropped frames.
Detect camera freezing.
Detect missing landmarks.
Detect low confidence.
Avoid counting during unreliable tracking.
Store model versions.
Store confidence values.
Mark uncertain results.


# 24. API Requirements
Authentication
text
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password

Patients
text
GET    /api/patients
POST   /api/patients
GET    /api/patients/{patient_id}
PATCH  /api/patients/{patient_id}

Programs
text
GET    /api/programs
POST   /api/programs
GET    /api/programs/{program_id}
PATCH  /api/programs/{program_id}
POST   /api/programs/{program_id}/publish

Exercises
text
GET    /api/exercises
POST   /api/exercises
GET    /api/exercises/{exercise_id}
POST   /api/exercises/{exercise_id}/duplicate
POST   /api/exercises/{exercise_id}/versions
POST   /api/exercises/{exercise_id}/submit-review
POST   /api/exercises/{exercise_id}/approve
POST   /api/exercises/{exercise_id}/archive

Synchronization
text
GET    /api/sync/status
POST   /api/sync/consent
POST   /api/sync/upload-summary
POST   /api/sync/upload-video
POST   /api/sync/download-program
POST   /api/sync/download-exercise-library
Sessions and reports

text
POST   /api/sessions
GET    /api/sessions/{session_id}
POST   /api/sessions/{session_id}/events
POST   /api/sessions/{session_id}/complete
POST   /api/sessions/{session_id}/abort
GET    /api/patients/{patient_id}/progress
GET    /api/patients/{patient_id}/reports


25. MVP Scope
The first release is a core clinical workflow with patient-facing exercise execution and therapist-facing program review, while exercise authoring is intentionally deferred to a later stage (Stage 1.2).

Representative MVP exercise:
- Cloth-stick overhead hanging, used as the initial clinically representative task-based upper-limb movement.
- The target movement requires right shoulder flexion and right elbow extension.
- Right shoulder flexion is the single primary ROM measurement for v1.
- Right elbow extension is validated as a required movement condition but is not a separate ROM measurement in v1.
- The exercise shall validate camera setup, pose tracking, ROM measurement, compensatory detection, error handling, and summary reporting.

<Patient>
Secure login.
View assigned program.
Camera setup.
One front-facing camera.
MediaPipe pose tracking.
Shoulder, elbow, wrist, trunk, and head tracking.
Basic ROM measurement.
Skeleton overlay.
Repetition counting.
Therapist-defined right shoulder flexion ROM target.
Right elbow extension movement condition.
Exactly two compensation detectors:
Trunk leaning to the left.
Unintended shoulder abduction.
Moderate warning.
Automatic pause after three accumulated errors.
Alarm.
Error-video playback.
Written and voice feedback.
Restart from failed repetition.
Exercise skip after repeated same error.
Pain and difficulty input.
Local encrypted session storage, including full-session videos.
Consent-based synchronization.
Exercise and session summaries.

<Therapist>
Manage patient records.
Create programs.
Assign exercises.
Configure patient-specific ROM targets.
Select joints.
Select compensations.
Configure thresholds.
Review consented results and videos.
Duplicate organization exercises into the therapist library.
Duplicate library items for patient-specific program use.
Customize therapist-specific program configuration.
Review and manage exercise-library content.
Version and archive exercise library entries where supported.
Organization backend
Authentication.
Role-based authorization.
Exercise library with duplication and reuse features.
Software-update metadata.
Approved AI model registry.
Program distribution.
Consent-based synchronization.
Reporting APIs.
Audit logging.

Exercise authoring scope for later stage:
- Exercise creation wizard.
- Exercise versioning and review workflow.
- Therapist-uploaded demonstration media.
- AI-assisted configuration suggestions.
- Approval and publication flows for custom exercises.
This functionality is planned for Stage 1.2 rather than the initial MVP release.


# 26. Development Phases
Phase 0: Clinical and technical requirements
Confirm clinical ROM reference values.
Define the first exercises.
Define the compensation taxonomy.
Obtain sample videos.
Define safety rules.
Confirm local-storage behavior.
Confirm consent and sharing workflow.
Confirm the first supported devices.

## Phase 1: Interface prototype
Patient home screen.
Program overview.
Exercise instructions.
Camera setup.
Live exercise screen.
Warning screen.
Error playback screen.
Exercise summary.
Therapist dashboard.
Traditional Chinese interface.

## Phase 1.2: Exercise authoring foundation
Therapist exercise editor.
Exercise library review and duplicate flow.
Basic versioning and archiving.
Exercise template configuration.
Approval workflow for therapist-managed exercise content.

## Phase 2: Proof of concept
MediaPipe tracking.
Camera access.
Skeleton overlay.
Joint-angle calculations.
Repetition counting.
Basic object detection.
Basic compensation detection.
Local session recording.
Local encrypted storage.
Persistent database-backed backend.
Consent-based synchronization.

## Phase 3: MVP
Full patient workflow.
Therapist program management.
Exercise configuration.
Compensation selection.
Scoring.
Reports.
Video retention.
Authentication and role-based access.
iOS and Android browser testing.

## Phase 4: Clinical pilot
Usability testing.
Detection-performance testing.
Safety review.
False-positive analysis.
False-negative analysis.
Therapist feedback.
Patient feedback.
Data-quality review.

## Phase 5: Production preparation
Privacy assessment.
Security assessment.
Clinical validation.
Infrastructure hardening.
Monitoring.
Disaster recovery.
Model governance.
Regulatory assessment.
Support procedures.

## Phase 6: Future enhancement
Native or hybrid application.
Second and third camera support.
Finger and hand tracking.
Improved forearm rotation detection.
Custom object models.
Offline or hybrid AI inference.
Wearable sensors.
Depth-camera support.
Advanced fatigue analysis.


# 27. Testing Requirements
Testing shall cover:

Joint-angle calculation.
ROM calculation.
Score calculation.
Severity calculation.
Exercise-state transitions.
Retry and skip behavior.
Consent rules.
Local storage.
Synchronization.
Video upload.
Program distribution.
Exercise versioning.
Therapist review.
Role permissions.
iOS and Android browsers.
Different camera resolutions.
Different lighting and backgrounds.
Network interruption.
Low storage.
Low-confidence tracking.
Object occlusion.
Repeated compensation.
High pain reporting.
Unsafe ROM.
Different household objects.
AI validation shall measure:

Pose accuracy.
Object-detection precision.
Object-detection recall.
Repetition-count accuracy.
ROM measurement error.
Compensation sensitivity.
Compensation specificity.
False-warning rate.
Missed-error rate.
Feedback latency.

# 28. Acceptance Criteria
## Patient workflow
Patient can log in.
Patient can view the assigned program.
Patient can grant camera permission.
Patient can complete camera setup.
Skeleton overlay is displayed.
Configured joints are tracked.
Valid repetitions are counted.
ROM is displayed in degrees and percentage.
Configured compensations are detected.
Moderate compensation displays a warning.
Three configured errors cause an automatic pause.
Alarm is played.
Latest incorrect movement is replayed.
Error region is highlighted.
Written and voice feedback are provided.
Patient can restart from the failed repetition.
Exercise is skipped after the retry rule.
Skip reason is recorded.
Pain and difficulty can be entered.
Session is stored locally.
Patient controls synchronization.

## Therapist
Therapist workflow
Therapist can create or view patient records.
Therapist can create and assign programs.
Therapist can configure patient-specific ROM.
Therapist can select measured joints.
Therapist can select compensatory movements.
Therapist can configure thresholds.
Therapist can view consented results.
Therapist can view consented videos.
Therapist can duplicate organization exercises.
Therapist can create custom exercises. (stage 1.2)
Therapist can submit custom exercises for approval. (stage 1.2)
Therapist can version and archive exercises. 

## Admin
Historical sessions remain linked to the correct exercise version.
Privacy and security
Unauthorized users cannot view patient data.
Patient videos require consent and authorization.
Synchronization permissions are recorded.
Data access is audited.
Local data is encrypted.
Uploaded data is encrypted in transit and at rest.
Retention rules are applied.
Failed synchronization does not delete local data.
Administrators cannot access patient data without explicit authorization.

## Object Detection
Object detection precision
Object detection recall
Right-hand holding accuracy
Object-loss detection accuracy
False-positive rate
False-negative rate
Detection latency
Performance under occlusion
Performance under different lighting

# 29. Known Risks
Monocular-camera limitations
The system may have limited accuracy for:

True 3D shoulder rotation.
Forearm pronation and supination.
Wrist deviation.
Scapular movement.
Depth-dependent compensation.
Occluded joints.
The project accepts limited accuracy during the early stages but shall store confidence and clearly communicate limitations.

Object variability
Object detection may be affected by:

Shape.
Size.
Color.
Lighting.
Background.
Occlusion.
Similar-looking household objects.
False positives
Mitigations:

Temporal smoothing.
Consecutive-frame confirmation.
Exercise-specific thresholds.
Therapist-configured sensitivity.
Confidence-aware feedback.
Clinical pilot testing.
False negatives
Mitigations:

Safety disclaimer.
Therapist-configured stop limits.
Conservative thresholds.
Manual patient stop control.
Clinical validation.
Therapist review of consented videos.
Local-storage failure
Mitigations:

Storage-capability check.
Patient warnings.
Export and backup options.
Consent-based synchronization.
Native or hybrid application for production.