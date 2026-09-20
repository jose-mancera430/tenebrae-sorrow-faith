export class WaveManager {
    constructor(maxWaves = 2) {
        this.currentWave = 1;
        this.maxWaves = maxWaves;
        this.waveFinished = false;
    }

    reset() {
        this.currentWave = 1;
        this.waveFinished = false;
    }

    canAdvance() {
        return this.currentWave < this.maxWaves;
    }

    advanceWave() {
        if (!this.canAdvance()) {
            return false;
        }

        this.currentWave++;
        this.waveFinished = false;

        return true;
    }

    markWaveFinished() {
        this.waveFinished = true;
    }
}