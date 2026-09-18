/**
 * Web Audio and Speech Synthesis for Micora Microsleep Alert
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a distinctive, attention-grabbing multi-frequency alarm chime
 */
export function playAlertTone(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pulse 1
    createBeep(ctx, 880, now, 0.18, 0.35); // A5
    createBeep(ctx, 1108.73, now + 0.1, 0.2, 0.4); // C#6

    // Pulse 2 (higher urgency)
    createBeep(ctx, 987.77, now + 0.32, 0.18, 0.4); // B5
    createBeep(ctx, 1318.51, now + 0.42, 0.3, 0.45); // E6
  } catch (err) {
    console.warn('Unable to play alert audio:', err);
  }
}

function createBeep(ctx: AudioContext, freq: number, startTime: number, duration: number, gainVal: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, startTime);
  
  // Quick attack and decay to avoid loud pop
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

/**
 * Play a softer test chime for user calibration
 */
export function playTestChime(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    createBeep(ctx, 523.25, now, 0.2, 0.2); // C5
    createBeep(ctx, 659.25, now + 0.15, 0.2, 0.2); // E5
    createBeep(ctx, 783.99, now + 0.3, 0.35, 0.25); // G5
  } catch (err) {
    console.warn('Audio test failed:', err);
  }
}

/**
 * Vietnamese voice warning as specified in prompt:
 * “Cảnh báo! Bạn có dấu hiệu buồn ngủ. Hãy nghỉ ngơi và không tiếp tục các hoạt động đòi hỏi sự tỉnh táo cao.”
 */
export function speakVietnameseWarning(): void {
  if (!('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(
      'Cảnh báo! Bạn có dấu hiệu buồn ngủ. Hãy nghỉ ngơi và không tiếp tục các hoạt động đòi hỏi sự tỉnh táo cao.'
    );
    utterance.lang = 'vi-VN';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Try to find a Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.startsWith('vi') || v.lang.includes('VN'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis failed:', err);
  }
}
