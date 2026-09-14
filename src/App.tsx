import { useEffect, useRef, useState } from 'react';
import { FilesetResolver, ObjectDetector, PoseLandmarker, type NormalizedLandmark } from '@mediapipe/tasks-vision';

type DetectorStatus = 'idle' | 'loading' | 'ready' | 'error';

type Metric = {
  label: string;
  value: string;
  detail: string;
  tone?: 'accent' | 'warning';
};

const POSE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
const OBJECT_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float32/1/efficientdet_lite0.tflite';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const poseRef = useRef<PoseLandmarker | null>(null);
  const objectDetectorRef = useRef<ObjectDetector | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [detectorStatus, setDetectorStatus] = useState<DetectorStatus>('idle');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [repetition, setRepetition] = useState(0);
  const [pain, setPain] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      poseRef.current?.close();
      objectDetectorRef.current?.close();
    };
  }, []);

  function drawPose(landmarks: NormalizedLandmark[][]) {
    const video = videoRef.current;
    const canvas = overlayRef.current;
    if (!video || !canvas || video.videoWidth === 0 || video.videoHeight === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const connections = PoseLandmarker.POSE_CONNECTIONS;
    for (const pose of landmarks) {
      context.lineWidth = Math.max(2, canvas.width / 360);
      context.strokeStyle = '#e8d39b';
      context.lineCap = 'round';
      for (const connection of connections) {
        const start = pose[connection.start];
        const end = pose[connection.end];
        if (!start || !end || (start.visibility ?? 1) < 0.45 || (end.visibility ?? 1) < 0.45) continue;
        context.beginPath();
        context.moveTo(start.x * canvas.width, start.y * canvas.height);
        context.lineTo(end.x * canvas.width, end.y * canvas.height);
        context.stroke();
      }

      for (const landmark of pose) {
        if ((landmark.visibility ?? 1) < 0.45) continue;
        context.beginPath();
        context.fillStyle = '#f7f4e9';
        context.arc(landmark.x * canvas.width, landmark.y * canvas.height, Math.max(3, canvas.width / 180), 0, Math.PI * 2);
        context.fill();
      }
    }
  }

  function startPoseLoop() {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    const processFrame = () => {
      const video = videoRef.current;
      const pose = poseRef.current;
      if (video && pose && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        const result = pose.detectForVideo(video, performance.now());
        drawPose(result.landmarks);
      }
      animationFrameRef.current = requestAnimationFrame(processFrame);
    };
    animationFrameRef.current = requestAnimationFrame(processFrame);
  }

  async function enableCamera() {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraReady(true);
      if (poseRef.current) startPoseLoop();
    } catch {
      setCameraError('無法取得攝影機權限，請確認瀏覽器設定及 HTTPS 連線。');
    }
  }

  async function loadVisionModels() {
    setDetectorStatus('loading');
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm',
      );
      poseRef.current = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: POSE_MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      objectDetectorRef.current = await ObjectDetector.createFromOptions(vision, {
        baseOptions: { modelAssetPath: OBJECT_MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        scoreThreshold: 0.5,
        maxResults: 3,
      });
      setDetectorStatus('ready');
      if (cameraReady) startPoseLoop();
    } catch {
      setDetectorStatus('error');
    }
  }

  function startSession() {
    setSessionStarted(true);
    setRepetition(0);
  }

  function simulateValidRepetition() {
    if (sessionStarted && repetition < 10) setRepetition((current) => current + 1);
  }

  const metrics: Metric[] = [
    { label: '右肩屈曲', value: '0°', detail: '目標 140°', tone: 'accent' },
    { label: '右手肘伸展', value: '待確認', detail: '結束時檢查，180° ±30°' },
    { label: '物件狀態', value: '未偵測', detail: '需要辨識 cloth stick' },
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">H</div>
        <div>
          <p className="eyebrow">HOME REHABILITATION / V1 MVP</p>
          <h1>復健小站</h1>
        </div>
        <div className="topbar-actions">
          <span className="role-pill">患者模式</span>
          <button className="text-button" type="button">離開訓練</button>
        </div>
      </header>

      <section className="page-intro">
        <div>
          <p className="eyebrow">今日處方 · 第 1 組</p>
          <h2>使用曬衣棒向上伸展</h2>
          <p className="intro-copy">側身面向攝影機，右肩向前屈曲至目標位置，右手肘在結束時保持伸展。</p>
        </div>
        <div className="progress-card">
          <span>本組進度</span>
          <strong>{repetition}<small> / 10 次</small></strong>
          <div className="progress-track"><span style={{ width: `${repetition * 10}%` }} /></div>
        </div>
      </section>

      <section className="training-grid">
        <div className="camera-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">LIVE CAMERA</p>
              <h3>準備畫面</h3>
            </div>
            <span className={`status-dot ${cameraReady ? 'is-ready' : ''}`}><i />{cameraReady ? '攝影機已連線' : '等待攝影機'}</span>
          </div>
          <div className="camera-stage">
            <video ref={videoRef} muted playsInline className={cameraReady ? 'visible' : ''} />
            <canvas ref={overlayRef} className={`pose-overlay ${cameraReady && detectorStatus === 'ready' ? 'visible' : ''}`} aria-label="MediaPipe 人體骨架疊加層" />
            {!cameraReady && <div className="camera-empty"><span className="camera-icon">◉</span><strong>請先開啟攝影機</strong><p>將手機放在身體右側，讓全身和曬衣棒都在畫面中。</p><button className="primary-button" onClick={enableCamera} type="button">開啟攝影機</button></div>}
            {cameraReady && <div className="camera-overlay"><span className="tracking-label">MediaPipe 姿勢骨架</span><span className="object-label">物件：待辨識</span></div>}
          </div>
          {cameraError && <p className="error-message">{cameraError}</p>}
          <div className="camera-footer">
            <span><i className="signal-icon" />畫面品質良好</span>
            <span>側身 · 全身入鏡</span>
          </div>
        </div>

        <aside className="session-panel">
          <div className="panel-heading compact"><div><p className="eyebrow">EXERCISE SETUP</p><h3>動作條件</h3></div><span className="step-count">01 / 03</span></div>
          <div className="condition-list">
            <div className="condition-row"><span className="condition-index">01</span><div><strong>右肩屈曲</strong><small>目標 140° · 上限 180°</small></div><b className="condition-check">✓</b></div>
            <div className="condition-row"><span className="condition-index">02</span><div><strong>右手肘伸展</strong><small>結束時確認 · 容許 ±30°</small></div><b className="condition-check">✓</b></div>
            <div className="condition-row"><span className="condition-index">03</span><div><strong>曬衣棒</strong><small>需確認右手握持</small></div><b className="condition-pending">•</b></div>
          </div>
          <div className="guardrail"><span className="shield-icon">+</span><div><strong>安全提醒</strong><p>動作時間需維持 7–15 秒，頂端停留 5 秒。</p></div></div>
          <button className="primary-button wide" disabled={!cameraReady} onClick={startSession} type="button">{sessionStarted ? '訓練進行中' : '開始這組訓練'}<span>→</span></button>
          <p className="privacy-note">資料預設儲存在本機，分享前需要你的同意。</p>
        </aside>
      </section>

      <section className="metrics-section">
        <div className="section-heading"><div><p className="eyebrow">MOTION MONITOR</p><h3>即時動作狀態</h3></div><button className="secondary-button" onClick={loadVisionModels} disabled={detectorStatus === 'loading'} type="button">{detectorStatus === 'loading' ? '模型載入中…' : detectorStatus === 'ready' ? '模型已就緒' : '載入 MediaPipe'}</button></div>
        <div className="metric-grid">{metrics.map((metric) => <div className={`metric-card ${metric.tone ?? ''}`} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small></div>)}</div>
        {detectorStatus === 'error' && <p className="error-message">MediaPipe 模型載入失敗。可先使用畫面原型，確認網路或模型來源後再重試。</p>}
      </section>

      <section className="bottom-grid">
        <div className="compensation-card"><div className="section-heading"><div><p className="eyebrow">FORM GUARD</p><h3>補償動作監測</h3></div><span className="neutral-badge">尚未開始</span></div><div className="compensation-items"><div><span className="line-swatch left" /><strong>軀幹向左側傾</strong><small>Warning 10° · Moderate 25° · Severe 40°</small></div><div><span className="line-swatch shoulder" /><strong>非預期肩外展</strong><small>Warning 30° · Moderate 45° · Severe 50°</small></div></div></div>
        <div className="checkin-card"><p className="eyebrow">AFTER EXERCISE</p><h3>完成後告訴我們</h3><div className="checkin-row"><label>疼痛程度 <span>{pain ?? '未填寫'}</span></label><input aria-label="疼痛程度" type="range" min="0" max="10" value={pain ?? 0} onChange={(event) => setPain(Number(event.target.value))} /></div><div className="checkin-row"><label>動作難度 <span>{difficulty ?? '未填寫'}</span></label><input aria-label="動作難度" type="range" min="0" max="10" value={difficulty ?? 0} onChange={(event) => setDifficulty(Number(event.target.value))} /></div></div>
      </section>

      <footer className="app-footer"><span>HP Rehabilitation · v1 MVP prototype</span><span>本工具不能取代治療師判斷</span></footer>
      <button className="dev-trigger" onClick={simulateValidRepetition} type="button" aria-label="測試有效重複次數">測試 +1</button>
    </main>
  );
}

export default App;
