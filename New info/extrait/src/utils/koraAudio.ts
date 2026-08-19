// Web Audio Synthesizer mimicking a gentle continuous West African Kora loop
class KoraAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.08; // Very soft, gentle background volume

  // Traditional Kora Hardino / Silaba pentatonic tuning frequencies (Hz)
  private koraScale = [
    196.00, // G3
    220.00, // A3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25  // E5
  ];

  // Gentle rhythmic pattern steps
  private pattern = [
    [0, 4, 7],
    [2, 5],
    [1, 6],
    [3, 7],
    [0, 5, 8],
    [2, 6],
    [1, 4, 7],
    [3, 9]
  ];
  private stepIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private playPluck(freq: number, delaySec: number = 0) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm wooden acoustic character
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, this.ctx.currentTime + delaySec);
    filter.Q.setValueAtTime(3, this.ctx.currentTime + delaySec);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delaySec);

    // Kora string attack & resonant decay envelope
    const startTime = this.ctx.currentTime + delaySec;
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 1.7);
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    // Trigger step every 650ms for calm, meditative tempo
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const currentNotes = this.pattern[this.stepIndex % this.pattern.length];
      currentNotes.forEach((noteIdx, i) => {
        const freq = this.koraScale[noteIdx % this.koraScale.length];
        this.playPluck(freq, i * 0.12);
      });
      this.stepIndex++;
    }, 650);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const koraAudio = new KoraAudioEngine();

export const toggleKoraAudio = (): boolean => {
  return koraAudio.toggle();
};

export const isKoraPlaying = (): boolean => {
  return koraAudio.getIsPlaying();
};
