export class ComboManager {
    constructor() {
        this.streak = 0;
        this.multiplier = 1;

        this.maxMultiplier = 5;
    }

    registerKill() {
        this.streak++;

        this.updateMultiplier();
    }

    registerDamage() {
        this.reset();
    }

    updateMultiplier() {
        if (this.streak >= 30) {
            this.multiplier = 5;
            return;
        }

        if (this.streak >= 20) {
            this.multiplier = 4;
            return;
        }

        if (this.streak >= 10) {
            this.multiplier = 3;
            return;
        }

        if (this.streak >= 5) {
            this.multiplier = 2;
            return;
        }

        this.multiplier = 1;
    }

    getMultiplier() {
        return this.multiplier;
    }

    getStreak() {
        return this.streak;
    }

    reset() {
        this.streak = 0;
        this.multiplier = 1;
    }
}