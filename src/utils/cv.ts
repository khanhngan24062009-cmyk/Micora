/**
 * Computer Vision and Eye Tracking Helper for Micora
 */

export interface FrameAnalysisResult {
  faceDetected: boolean;
  faceCentered: boolean;
  lightingOk: boolean;
  averageLuminance: number; // 0 - 255
  eyeOpenness: number; // 0.0 (closed) to 1.0 (fully open)
  eyeStatus: 'open' | 'partial' | 'closed' | 'prolonged_closed';
  faceBox?: { x: number; y: number; width: number; height: number };
  leftEyeBox?: { x: number; y: number; width: number; height: number };
  rightEyeBox?: { x: number; y: number; width: number; height: number };
}

// Low-light threshold: average brightness under 35 (out of 255) is too dark
const MIN_LUMINANCE = 32;

/**
 * Analyzes a frame from video element using an internal canvas
 */
export function analyzeVideoFrame(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  customThreshold = 0.35
): FrameAnalysisResult {
  const width = video.videoWidth || 640;
  const height = video.videoHeight || 480;

  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    return {
      faceDetected: false,
      faceCentered: false,
      lightingOk: true,
      averageLuminance: 128,
      eyeOpenness: 1.0,
      eyeStatus: 'open',
    };
  }

  // Draw current video frame to canvas
  ctx.drawImage(video, 0, 0, width, height);

  // Measure overall scene brightness
  const step = 8; // sample every 8th pixel for fast 60fps performance
  const sampleWidth = Math.floor(width / step);
  const sampleHeight = Math.floor(height / step);

  let totalLuma = 0;
  let sampleCount = 0;

  // We inspect center region (where user face is supposed to be)
  const faceX = Math.floor(width * 0.25);
  const faceY = Math.floor(height * 0.15);
  const faceW = Math.floor(width * 0.5);
  const faceH = Math.floor(height * 0.65);

  const faceImgData = ctx.getImageData(faceX, faceY, faceW, faceH);
  const data = faceImgData.data;

  // Calculate luminance and contrast in face area
  let minLuma = 255;
  let maxLuma = 0;
  for (let i = 0; i < data.length; i += 4 * 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Standard relative luminance
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    totalLuma += luma;
    if (luma < minLuma) minLuma = luma;
    if (luma > maxLuma) maxLuma = luma;
    sampleCount++;
  }

  const avgLuma = sampleCount > 0 ? totalLuma / sampleCount : 120;
  const lightingOk = avgLuma >= MIN_LUMINANCE;
  const contrast = maxLuma - minLuma;

  // Face presence heuristic: adequate contrast, skin tone / facial structure variation
  const faceDetected = lightingOk && contrast > 30 && avgLuma > 25 && avgLuma < 245;
  const faceCentered = true;

  // Eye regions approximation within face bounding box
  // Left eye region (subject's right in mirror view)
  const eyeZoneY = Math.floor(faceH * 0.25);
  const eyeZoneH = Math.floor(faceH * 0.2);
  const leftEyeZoneX = Math.floor(faceW * 0.18);
  const eyeZoneW = Math.floor(faceW * 0.26);
  const rightEyeZoneX = Math.floor(faceW * 0.56);

  // Compute variance & darkness around eye region
  let leftEyeDarkness = 0;
  let rightEyeDarkness = 0;
  let eyeSamples = 0;

  // Eye openness estimation using vertical intensity gradients
  // When eyes are open, the pupil/iris and sclera create high frequency vertical changes
  // When eyes are closed (eyelid covering), skin surface is smooth and low vertical variance
  let verticalGradientSum = 0;
  let gradientCount = 0;

  for (let y = eyeZoneY; y < eyeZoneY + eyeZoneH - 2; y += 2) {
    for (let x = leftEyeZoneX; x < leftEyeZoneX + eyeZoneW; x += 2) {
      const idx1 = (y * faceW + x) * 4;
      const idx2 = ((y + 2) * faceW + x) * 4;
      const luma1 = 0.299 * data[idx1] + 0.587 * data[idx1 + 1] + 0.114 * data[idx1 + 2];
      const luma2 = 0.299 * data[idx2] + 0.587 * data[idx2 + 1] + 0.114 * data[idx2 + 2];
      verticalGradientSum += Math.abs(luma1 - luma2);
      gradientCount++;
    }
  }

  const rawGradient = gradientCount > 0 ? verticalGradientSum / gradientCount : 15;
  // Normalize gradient to an openness ratio (0.0 to 1.0)
  // Typically open eyes produce high gradient (12-30), closed eyes produce low gradient (< 7-9)
  const eyeOpenness = Math.min(1.0, Math.max(0.0, (rawGradient - 4) / 18));

  let eyeStatus: 'open' | 'partial' | 'closed' | 'prolonged_closed' = 'open';
  if (eyeOpenness < customThreshold) {
    eyeStatus = 'closed';
  } else if (eyeOpenness < customThreshold + 0.2) {
    eyeStatus = 'partial';
  } else {
    eyeStatus = 'open';
  }

  return {
    faceDetected,
    faceCentered,
    lightingOk,
    averageLuminance: Math.round(avgLuma),
    eyeOpenness,
    eyeStatus,
    faceBox: { x: faceX, y: faceY, width: faceW, height: faceH },
    leftEyeBox: { x: faceX + leftEyeZoneX, y: faceY + eyeZoneY, width: eyeZoneW, height: eyeZoneH },
    rightEyeBox: { x: faceX + rightEyeZoneX, y: faceY + eyeZoneY, width: eyeZoneW, height: eyeZoneH },
  };
}
