import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CameraState, EyeStatus } from '../types';
import { analyzeVideoFrame } from '../utils/cv';
import { playAlertTone, speakVietnameseWarning } from '../utils/audio';
import { 
  Camera, 
  CameraOff, 
  AlertTriangle, 
  Eye, 
  Volume2, 
  Clock, 
  SunMedium, 
  RefreshCw, 
  StopCircle, 
  Play, 
  ShieldCheck, 
  Sliders, 
  Sparkles,
  Info
} from 'lucide-react';

interface CameraViewProps {
  cameraState: CameraState;
  setCameraState: React.Dispatch<React.SetStateAction<CameraState>>;
  onStopAndReview: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  cameraState,
  setCameraState,
  onStopAndReview,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Internal tracking refs for high-frequency animation loop
  const eyeClosedStartRef = useRef<number | null>(null);
  const lastAlertTimeRef = useRef<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartRef = useRef<number | null>(null);
  const totalClosedTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const prevEyeStatusRef = useRef<EyeStatus>('open');

  // Interactive controls
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [sensitivityThreshold, setSensitivityThreshold] = useState<number>(0.35);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [simulatedEyeState, setSimulatedEyeState] = useState<EyeStatus>('open');
  const [voiceAlertEnabled, setVoiceAlertEnabled] = useState<boolean>(true);

  // Stop camera stream safely
  const stopCameraStream = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState(prev => ({
      ...prev,
      isStreaming: false,
      faceDetected: false,
    }));
  }, [setCameraState]);

  // Request camera permission and start streaming
  const requestCameraAccess = async () => {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setCameraState(prev => ({
        ...prev,
        hasPermission: true,
        isStreaming: true,
      }));
    } catch (err: unknown) {
      console.warn('Camera access denied or unavailable:', err);
      const errorMsg = err instanceof Error ? err.message : 'Không thể truy cập camera';
      setPermissionError(
        `Không thể truy cập camera (${errorMsg}). Camera là thành phần cần thiết để quan sát mắt và nhận diện các dấu hiệu Microsleep theo thời gian thực.`
      );
      setCameraState(prev => ({
        ...prev,
        hasPermission: false,
        isStreaming: false,
      }));
    }
  };

  // Cooldown countdown tick
  useEffect(() => {
    if (cameraState.cooldownRemaining > 0) {
      const timer = setTimeout(() => {
        setCameraState(prev => ({
          ...prev,
          cooldownRemaining: Math.max(0, prev.cooldownRemaining - 1),
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cameraState.cooldownRemaining, setCameraState]);

  // Trigger real-time alert
  const triggerSleepAlert = useCallback(() => {
    const now = performance.now();
    // Enforce 10s cooldown
    if (now - lastAlertTimeRef.current < 10000) {
      return;
    }
    lastAlertTimeRef.current = now;

    // Play tone
    playAlertTone();

    // Vietnamese voice alert
    if (voiceAlertEnabled) {
      speakVietnameseWarning();
    }

    setCameraState(prev => ({
      ...prev,
      isAlerting: true,
      sleepEpisodesCount: prev.sleepEpisodesCount + 1,
      cooldownRemaining: 10,
    }));

    // Auto-dismiss alert banner animation after 4 seconds
    setTimeout(() => {
      setCameraState(prev => ({ ...prev, isAlerting: false }));
    }, 4500);
  }, [setCameraState, voiceAlertEnabled]);

  // Main real-time computer vision loop
  useEffect(() => {
    if (!cameraState.isStreaming && !simulationMode) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    let isSubscribed = true;

    const runLoop = () => {
      if (!isSubscribed) return;

      const now = performance.now();
      const deltaSec = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      // Handle session duration
      if (sessionStartRef.current) {
        const sessionSec = Math.floor((now - sessionStartRef.current) / 1000);
        setCameraState(prev => ({ ...prev, sessionDuration: sessionSec }));
      }

      let faceOk = true;
      let lightOk = true;
      let eyeStatus: EyeStatus = 'open';
      let avgLuma = 120;
      let leftBox: { x: number; y: number; width: number; height: number } | undefined;
      let rightBox: { x: number; y: number; width: number; height: number } | undefined;
      let faceBox: { x: number; y: number; width: number; height: number } | undefined;

      if (simulationMode) {
        // Simulation mode inputs
        faceOk = true;
        lightOk = true;
        eyeStatus = simulatedEyeState;
        avgLuma = 140;
      } else if (videoRef.current && canvasRef.current && videoRef.current.readyState >= 2) {
        const result = analyzeVideoFrame(videoRef.current, canvasRef.current, sensitivityThreshold);
        faceOk = result.faceDetected;
        lightOk = result.lightingOk;
        avgLuma = result.averageLuminance;
        eyeStatus = result.eyeStatus;
        faceBox = result.faceBox;
        leftBox = result.leftEyeBox;
        rightBox = result.rightEyeBox;
      }

      // Draw visual overlay guides
      if (overlayCanvasRef.current && videoRef.current) {
        const ovCtx = overlayCanvasRef.current.getContext('2d');
        if (ovCtx) {
          const w = overlayCanvasRef.current.width = videoRef.current.videoWidth || 640;
          const h = overlayCanvasRef.current.height = videoRef.current.videoHeight || 480;
          ovCtx.clearRect(0, 0, w, h);

          if (faceOk && lightOk) {
            // Draw Face bounds
            ovCtx.strokeStyle = eyeStatus === 'closed' ? '#ef4444' : '#14b8a6';
            ovCtx.lineWidth = 2;
            ovCtx.setLineDash([6, 6]);
            const fb = faceBox || { x: w * 0.25, y: h * 0.15, width: w * 0.5, height: h * 0.65 };
            ovCtx.strokeRect(fb.x, fb.y, fb.width, fb.height);

            // Draw eye targets
            ovCtx.setLineDash([]);
            ovCtx.strokeStyle = eyeStatus === 'closed' ? '#f43f5e' : '#22d3ee';
            ovCtx.lineWidth = 2;
            if (leftBox && rightBox) {
              ovCtx.strokeRect(leftBox.x, leftBox.y, leftBox.width, leftBox.height);
              ovCtx.strokeRect(rightBox.x, rightBox.y, rightBox.width, rightBox.height);
            }
          }
        }
      }

      // If face is NOT visible or light is too low, pause closure timer as required!
      if (!faceOk || !lightOk) {
        eyeClosedStartRef.current = null;
        setCameraState(prev => ({
          ...prev,
          faceDetected: faceOk,
          lightingOk: lightOk,
          lightingValue: avgLuma,
          currentClosedDuration: 0,
        }));
      } else {
        // Face is visible & lighting OK -> analyze eye closure duration
        if (eyeStatus === 'closed') {
          if (eyeClosedStartRef.current === null) {
            eyeClosedStartRef.current = now;
          }
          const closedDuration = (now - eyeClosedStartRef.current) / 1000;
          totalClosedTimeRef.current += deltaSec;

          // Check for >= 2s threshold for alert!
          if (closedDuration >= 2.0) {
            eyeStatus = 'prolonged_closed';
            triggerSleepAlert();
          }

          setCameraState(prev => {
            const sessionSec = prev.sessionDuration || 1;
            const perclosVal = Math.min(100, (totalClosedTimeRef.current / sessionSec) * 100);
            return {
              ...prev,
              faceDetected: true,
              lightingOk: true,
              lightingValue: avgLuma,
              eyeStatus,
              currentClosedDuration: Math.round(closedDuration * 10) / 10,
              perclos: Math.round(perclosVal * 10) / 10,
            };
          });
        } else {
          // Eye transitioned from closed -> open
          if (eyeClosedStartRef.current !== null) {
            const finalDuration = (now - eyeClosedStartRef.current) / 1000;
            eyeClosedStartRef.current = null;

            // Classify interval
            if (finalDuration >= 0.2 && finalDuration < 0.5) {
              // Normal blink
              setCameraState(prev => ({ ...prev, totalBlinks: prev.totalBlinks + 1 }));
            } else if (finalDuration >= 0.5 && finalDuration < 2.0) {
              // Prolonged closure
              setCameraState(prev => ({
                ...prev,
                prolongedClosuresCount: prev.prolongedClosuresCount + 1,
              }));
            }
          }

          setCameraState(prev => ({
            ...prev,
            faceDetected: true,
            lightingOk: true,
            lightingValue: avgLuma,
            eyeStatus,
            currentClosedDuration: 0,
          }));
        }
      }

      prevEyeStatusRef.current = eyeStatus;
      animationFrameId.current = requestAnimationFrame(runLoop);
    };

    animationFrameId.current = requestAnimationFrame(runLoop);

    return () => {
      isSubscribed = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cameraState.isStreaming, simulationMode, simulatedEyeState, sensitivityThreshold, triggerSleepAlert, setCameraState]);

  // Handle start/stop testing session
  const handleStartSession = () => {
    sessionStartRef.current = performance.now();
    totalClosedTimeRef.current = 0;
    eyeClosedStartRef.current = null;
    setCameraState(prev => ({
      ...prev,
      sessionDuration: 0,
      totalBlinks: 0,
      prolongedClosuresCount: 0,
      sleepEpisodesCount: 0,
      perclos: 0,
      currentClosedDuration: 0,
      isAlerting: false,
    }));
  };

  const handleStopSession = () => {
    sessionStartRef.current = null;
    onStopAndReview();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [stopCameraStream]);

  return (
    <div className="space-y-6">
      
      {/* 2.1.1 Permission Request / Gate Screen */}
      {!cameraState.isStreaming && !simulationMode && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto shadow-inner">
            <Camera className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-white font-display">
              Cấp quyền truy cập Camera
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              “Cho phép website sử dụng camera để thực hiện kiểm tra trạng thái tỉnh táo.”
            </p>
            <p className="text-xs text-slate-400">
              Hệ thống xử lý hình ảnh trực tiếp trên trình duyệt của bạn (Client-side), không thu thập hoặc truyền tải luồng video về máy chủ bên ngoài.
            </p>
          </div>

          {permissionError && (
            <div className="max-w-md mx-auto p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 text-left space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Quyền Camera chưa được cấp</span>
              </div>
              <p>{permissionError}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={requestCameraAccess}
              id="btn-request-camera"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 hover:bg-teal-400 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Cho phép & Mở Camera</span>
            </button>

            {/* Simulation mode fallback */}
            <button
              onClick={() => {
                setSimulationMode(true);
                handleStartSession();
              }}
              id="btn-simulation-mode"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Chế độ Mô phỏng / Kiểm thử</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Camera Active Viewport */}
      {(cameraState.isStreaming || simulationMode) && (
        <div className="space-y-4">
          
          {/* Top Status & Guidance Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Trạng thái: Đang hoạt động</span>
                  {simulationMode && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      Mô phỏng
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Hãy ngồi thẳng, giữ khuôn mặt trong khung hình và nhìn về phía camera.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>Thời gian: <strong>{cameraState.sessionDuration}s</strong></span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartSession}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5"
                  title="Đặt lại phiên kiểm tra"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
                  <span>Đặt lại</span>
                </button>
                <button
                  onClick={handleStopSession}
                  className="px-4 py-1.5 rounded-lg bg-teal-500 text-slate-950 text-xs font-bold shadow hover:bg-teal-400 flex items-center gap-1.5"
                >
                  <StopCircle className="w-3.5 h-3.5" />
                  <span>Dừng & Xem kết quả</span>
                </button>
              </div>
            </div>
          </div>

          {/* Video Container with Real-time Overlays */}
          <div className="relative aspect-video w-full rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Raw Video Element */}
            <video
              ref={videoRef}
              playsInline
              muted
              className={`w-full h-full object-cover scale-x-[-1] ${
                simulationMode ? 'opacity-20' : 'opacity-100'
              }`}
            />

            {/* Hidden canvas for pixel analysis */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Overlay canvas for facial landmarks */}
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none scale-x-[-1]"
            />

            {/* In simulation mode visual */}
            {simulationMode && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-slate-900/80">
                <div className="w-20 h-20 rounded-full bg-teal-500/10 border-2 border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Eye className="w-10 h-10" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-sm font-bold text-white">Chế độ Mô phỏng Kiểm thử Đang Bật</h4>
                  <p className="text-xs text-slate-400">
                    Sử dụng các nút bên dưới để thử nghiệm phản ứng của hệ thống khi mắt Mở, Chớp, hoặc Nhắm kéo dài ≥ 2s.
                  </p>
                </div>
              </div>
            )}

            {/* CRITICAL REAL-TIME ALERT BANNER (>= 2s closed) */}
            {cameraState.isAlerting && (
              <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30 animate-pulse border-4 border-rose-500">
                <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-white mb-3 shadow-lg shadow-rose-500/50">
                  <AlertTriangle className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase font-display">
                  ⚠️ CẢNH BÁO – CÓ DẤU HIỆU NGỦ GẬT
                </h3>
                <p className="mt-2 text-sm sm:text-base text-rose-100 max-w-md font-medium">
                  Bạn vừa nhắm mắt trong thời gian kéo dài ({cameraState.currentClosedDuration}s).
                </p>
                <p className="text-xs sm:text-sm text-rose-200/90 mt-1 max-w-lg">
                  Hãy kiểm tra lại trạng thái tỉnh táo và nghỉ ngơi nếu cần. Không tiếp tục các hoạt động đòi hỏi sự chú ý cao.
                </p>
                <div className="mt-4 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-400/40 text-xs text-rose-200">
                  🔊 Đang phát âm thanh cảnh báo tự động
                </div>
              </div>
            )}

            {/* Cooldown pill */}
            {cameraState.cooldownRemaining > 0 && !cameraState.isAlerting && (
              <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2 shadow-lg backdrop-blur">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Cooldown âm thanh: {cameraState.cooldownRemaining}s</span>
              </div>
            )}

            {/* Warning: Face NOT detected (2.1.2) */}
            {!cameraState.faceDetected && !cameraState.isAlerting && (
              <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 z-20 p-3 rounded-xl bg-amber-950/90 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2.5 backdrop-blur shadow-lg">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Không nhận diện được khuôn mặt. Vui lòng điều chỉnh vị trí và ánh sáng.</span>
              </div>
            )}

            {/* Warning: Low lighting (2.2.7) */}
            {!cameraState.lightingOk && cameraState.faceDetected && (
              <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 z-20 p-3 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-cyan-200 text-xs flex items-center gap-2.5 backdrop-blur shadow-lg">
                <SunMedium className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ánh sáng hiện tại chưa đủ để nhận diện chính xác. Vui lòng tăng ánh sáng.</span>
              </div>
            )}

            {/* Real-time eye status HUD tag */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur border border-slate-700/80 text-xs flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-teal-400" />
                <span>Mắt:</span>
                <strong className={
                  cameraState.eyeStatus === 'open' ? 'text-emerald-400' :
                  cameraState.eyeStatus === 'partial' ? 'text-amber-400' :
                  cameraState.eyeStatus === 'closed' ? 'text-rose-400' : 'text-rose-500 font-extrabold'
                }>
                  {cameraState.eyeStatus === 'open' && 'Mở (Tỉnh táo)'}
                  {cameraState.eyeStatus === 'partial' && 'Mở một phần'}
                  {cameraState.eyeStatus === 'closed' && `Đang nhắm (${cameraState.currentClosedDuration}s)`}
                  {cameraState.eyeStatus === 'prolonged_closed' && `Nhắm kéo dài (${cameraState.currentClosedDuration}s)`}
                </strong>
              </div>

              {cameraState.currentClosedDuration > 0 && (
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur flex items-center gap-1.5 ${
                  cameraState.currentClosedDuration >= 2.0 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-bounce' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                }`}>
                  <span>Thời gian nhắm: {cameraState.currentClosedDuration}s</span>
                  {cameraState.currentClosedDuration >= 2.0 && <span>⚠️ CẢNH BÁO!</span>}
                </div>
              )}
            </div>

            {/* Audio toggle & voice status */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setVoiceAlertEnabled(!voiceAlertEnabled)}
                className={`p-2 rounded-xl border backdrop-blur text-xs flex items-center gap-1.5 transition-colors ${
                  voiceAlertEnabled
                    ? 'bg-slate-900/85 border-teal-500/40 text-teal-300'
                    : 'bg-slate-900/85 border-slate-700 text-slate-400'
                }`}
                title="Bật/Tắt giọng đọc cảnh báo tiếng Việt"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{voiceAlertEnabled ? 'Giọng đọc: Bật' : 'Giọng đọc: Tắt'}</span>
              </button>
            </div>
          </div>

          {/* Real-time Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Chỉ số PERCLOS
              </div>
              <div className="text-xl font-extrabold text-teal-300 font-display">
                {cameraState.perclos}%
              </div>
              <div className="text-[10px] text-slate-400">
                Tỷ lệ thời gian mắt nhắm
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Chớp mắt bình thường
              </div>
              <div className="text-xl font-extrabold text-white font-display">
                {cameraState.totalBlinks}
              </div>
              <div className="text-[10px] text-slate-400">
                Khoảng 0.2s – 0.5s
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Nhắm kéo dài
              </div>
              <div className="text-xl font-extrabold text-amber-400 font-display">
                {cameraState.prolongedClosuresCount}
              </div>
              <div className="text-[10px] text-slate-400">
                Khoảng 0.5s – 1.9s
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Đợt ngủ gật (≥ 2s)
              </div>
              <div className={`text-xl font-extrabold font-display ${
                cameraState.sleepEpisodesCount > 0 ? 'text-rose-400' : 'text-slate-300'
              }`}>
                {cameraState.sleepEpisodesCount}
              </div>
              <div className="text-[10px] text-slate-400">
                Đã phát chuông cảnh báo
              </div>
            </div>
          </div>

          {/* Simulation & Sensitivity Tool Panel */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span>Bảng điều khiển kiểm thử & Độ nhạy mắt</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimulationMode(!simulationMode)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    simulationMode
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {simulationMode ? 'Tắt mô phỏng' : 'Bật mô phỏng kiểm thử'}
                </button>
              </div>
            </div>

            {/* If Simulation Mode Active: Interactive Eye Trigger Buttons */}
            {simulationMode && (
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="text-xs text-slate-300 font-medium">
                  Mô phỏng hành vi mắt tức thời:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => setSimulatedEyeState('open')}
                    className={`py-2 px-3 rounded-lg border font-medium transition-colors ${
                      simulatedEyeState === 'open'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    👁️ Mắt Mở (Tỉnh)
                  </button>
                  <button
                    onClick={() => {
                      setSimulatedEyeState('closed');
                      setTimeout(() => setSimulatedEyeState('open'), 300);
                    }}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium"
                  >
                    ⚡ Chớp mắt (0.3s)
                  </button>
                  <button
                    onClick={() => {
                      setSimulatedEyeState('closed');
                      setTimeout(() => setSimulatedEyeState('open'), 1200);
                    }}
                    className="py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-medium"
                  >
                    ⏳ Nhắm chậm (1.2s)
                  </button>
                  <button
                    onClick={() => {
                      setSimulatedEyeState('closed');
                      // keep closed for 2.5s to trigger alert!
                      setTimeout(() => setSimulatedEyeState('open'), 2600);
                    }}
                    className="py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold"
                  >
                    ⚠️ Ngủ gật (2.5s - Báo động)
                  </button>
                </div>
              </div>
            )}

            {/* Threshold slider */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="whitespace-nowrap">Ngưỡng nhạy nhận diện mắt:</span>
              <input
                type="range"
                min="0.15"
                max="0.65"
                step="0.05"
                value={sensitivityThreshold}
                onChange={e => setSensitivityThreshold(parseFloat(e.target.value))}
                className="w-full accent-teal-500"
              />
              <span className="font-mono text-teal-400 font-semibold">{sensitivityThreshold}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
