export class DifficultyManager {
    constructor() {
        this.multiplier = 1;
    }

    setMultiplier(multiplier = 1) {
        this.multiplier =
            Math.max(
                1,
                multiplier
            );
    }

    applyToEnemies(enemies) {
        if (!enemies) {
            return;
        }

        for (
            const enemy
            of enemies
        ) {
            this.applyToEnemy(
                enemy
            );
        }
    }

    applyToEnemy(enemy) {
        if (!enemy) {
            return;
        }

        /*
         * Evita aplicar la dificultad
         * dos veces al mismo enemigo.
         */
        if (
            enemy.difficultyApplied
        ) {
            return;
        }

        /*
         * VIDA
         */
        const newMaxHealth =
            Math.max(
                1,
                Math.ceil(
                    enemy.maxHealth *
                    this.multiplier
                )
            );

        enemy.maxHealth =
            newMaxHealth;

        enemy.health =
            newMaxHealth;

        /*
         * VELOCIDAD BASE
         */
        if (
            typeof enemy.speed ===
            "number"
        ) {
            enemy.speed *=
                this.multiplier;
        }

        /*
         * HUNTER
         */
        if (
            typeof enemy.horizontalSpeed ===
            "number"
        ) {
            enemy.horizontalSpeed *=
                this.multiplier;
        }

        /*
         * PURSUER
         */
        if (
            typeof enemy.pursuitSpeed ===
            "number"
        ) {
            enemy.pursuitSpeed *=
                this.multiplier;
        }

        /*
         * CIRCULAR
         *
         * Aumentamos menos la
         * velocidad angular.
         */
        if (
            typeof enemy.angularSpeed ===
            "number"
        ) {
            enemy.angularSpeed *=
                1 +
                (
                    this.multiplier -
                    1
                ) *
                0.6;
        }

        /*
         * CADENCIA DE DISPARO
         *
         * No usamos el multiplicador
         * completo porque en niveles
         * altos produciría demasiadas
         * balas.
         */
        enemy.fireRateMultiplier =
            1 +
            (
                this.multiplier -
                1
            ) *
            0.45;

        enemy.difficultyApplied =
            true;
    }
}