import { useCallback } from "react";

export function usePomodoroAudio() {
  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, delay: number = 0) => {
    if (typeof window === "undefined") return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  }, []);

  const playStart = useCallback(() => {
    playTone(880, "sine", 0.1); // High pip
  }, [playTone]);

  const playComplete = useCallback(() => {
    // A major chord arpeggio
    playTone(440, "sine", 0.5, 0);    // A4
    playTone(554.37, "sine", 0.5, 0.1); // C#5
    playTone(659.25, "sine", 0.8, 0.2); // E5
  }, [playTone]);

  return { playStart, playComplete };
}

