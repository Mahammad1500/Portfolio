// Lightweight synthesized audio effects using Web Audio API (no external assets needed)

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Bell chime completely disabled per user preference — only song plays
  public playChime() {
    // Silent: no bell sound on click
  }

  // Gentle sound effects silenced so only background song plays
  public playGadgetPop() {
    // Silent
  }

  public playDoorSwoosh() {
    // Silent
  }
}

export const sounds = new SoundManager();
