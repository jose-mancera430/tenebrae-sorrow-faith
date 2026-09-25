export class ScoreManager {
    constructor() {
        this.score = 0;

        this.baseEnemyScore = 100;
    }

    registerKill(
        comboMultiplier = 1
    ) {
        const safeMultiplier =
            Math.max(
                1,
                comboMultiplier
            );

        const points =
            this.baseEnemyScore *
            safeMultiplier;

        this.score +=
            points;

        return points;
    }

    getScore() {
        return this.score;
    }

    reset() {
        this.score = 0;
    }
}