// Web Audio API Synth Engine for Aqdas Research Institute
// Provides 100% reliable sound synthesis without external files.

let audioCtx: AudioContext | null = null;
let isMuted = false;
let ambientInterval: number | null = null;
let isAmbientPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const setMuted = (muted: boolean) => {
  isMuted = muted;
  if (muted && isAmbientPlaying) {
    stopAmbientSynth();
  } else if (!muted && isAmbientPlaying) {
    startAmbientSynth();
  }
};

export const getMuted = () => isMuted;

// 1. Play a subtle high-tech click sound
export const playClick = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Modern pitch-drop click
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

// 2. Play a glorious rising major-pentatonic chord arpeggio for accomplishments
export const playSuccess = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  } catch (e) {
    console.warn(e);
  }
};

// 3. Play a notification chime
export const playNotification = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc2.frequency.setValueAtTime(659.25, now); // E5

    // Slight sliding chime
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.25); // G5

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc1.start();
    osc2.start();
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  } catch (e) {
    console.warn(e);
  }
};

// 4. Play custom retro sound for mini-game power-up/action
export const playPowerUp = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.3);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.start();
    osc.stop(now + 0.3);
  } catch (e) {
    console.warn(e);
  }
};

// 5. Continuous background ambient track synthesizer
export const startAmbientSynth = () => {
  if (isMuted) return;
  isAmbientPlaying = true;
  if (ambientInterval) clearInterval(ambientInterval);

  let step = 0;
  // Pentatonic scale to sound incredibly futuristic and comforting
  const scale = [130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00]; // C3 to A4

  ambientInterval = window.setInterval(() => {
    if (isMuted || !isAmbientPlaying) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Play a very soft ambient chord pad note every 2.5 seconds
      const noteFreq1 = scale[Math.floor(Math.random() * 5)]; // Low note
      const noteFreq2 = scale[5 + Math.floor(Math.random() * 5)]; // High note

      [noteFreq1, noteFreq2].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const biquad = ctx.createBiquadFilter();

        osc.connect(biquad);
        biquad.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Low pass filter to make it soft and warm
        biquad.type = "lowpass";
        biquad.frequency.setValueAtTime(400, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(idx === 0 ? 0.025 : 0.015, now + 1.2); // Slow attack
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5); // Very long decay

        osc.start();
        osc.stop(now + 4);
      });

      step++;
    } catch (e) {
      console.warn("Ambient music error:", e);
    }
  }, 2500);
};

export const stopAmbientSynth = () => {
  isAmbientPlaying = false;
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
};

export const getIsAmbientPlaying = () => isAmbientPlaying;
