// Web Audio API helper for ambient tones & tap chimes

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTapSound(freq = 587.33, type: OscillatorType = 'sine', duration = 0.15) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context play error catch
    }
  }

  public playTripleUnlockChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTapSound(freq, 'triangle', 0.25);
        }, idx * 80);
      });
    } catch {
      // Audio error catch
    }
  }

  public playColorShiftPulse(hue: number, soundMode: string) {
    if (this.isMuted || soundMode === 'off') return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (soundMode === 'chime') {
        // Map hue 0-360 to pentatonic frequencies
        const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
        const noteIndex = Math.floor((hue / 360) * pentatonicScale.length) % pentatonicScale.length;
        this.playTapSound(pentatonicScale[noteIndex], 'sine', 0.1);
      } else if (soundMode === 'healing432') {
        this.playTapSound(432, 'sine', 0.2);
      } else if (soundMode === 'pulse') {
        this.playTapSound(150 + (hue % 200), 'sawtooth', 0.08);
      }
    } catch {
      // Audio error catch
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }
}

export const audioSynth = new AudioSynthesizer();
