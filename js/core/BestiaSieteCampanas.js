import { Boss } from "./Boss.js";

export class BestiaSieteCampanas extends Boss {
    constructor(
        x,
        y,
        sprite = null
    ) {
        super(
            x,
            y,
            120,
            110,
            140,
            "La Bestia de las Siete Campanas"
        );

        this.sprite = sprite;

        this.renderWidth = 190;
        this.renderHeight = 180;

        this.mainFireTimer = 0;
        this.secondaryFireTimer = 0;

        this.currentRotation = 0;

        this.horizontalSpeed = 75;
    }

    onPhaseChanged(phase) {
        super.onPhaseChanged(
            phase
        );

        if (phase === 2) {
            this.horizontalSpeed = 120;

            this.mainFireTimer = 0.3;
            this.secondaryFireTimer = 0.6;
        }
    }

    updateAttack(
        deltaTime,
        canvas,
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        if (
            !enemyProjectilePool ||
            !patternSystem
        ) {
            return;
        }

        this.mainFireTimer -=
            deltaTime;

        this.secondaryFireTimer -=
            deltaTime;

        /*
         * FASE I
         * ondas y ráfagas
         */
        if (this.phase === 1) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.fireWave(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    1.1;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.fireRadial(
                    enemyProjectilePool,
                    patternSystem,
                    "cross-4"
                );

                this.secondaryFireTimer =
                    1.8;
            }

            return;
        }

        /*
         * FASE II
         * ondas rápidas
         * + radial rotatorio
         */
        if (this.phase === 2) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.fireWave(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    0.65;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.fireRadial(
                    enemyProjectilePool,
                    patternSystem,
                    "rotating-6"
                );

                this.secondaryFireTimer =
                    0.9;
            }
        }
    }

    fireWave(
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        if (!player) {
            return;
        }

        const pattern =
            patternSystem
                .getPattern(
                    "wave-5"
                );

        if (!pattern) {
            return;
        }

        const startX =
            this.x +
            this.width / 2;

        const startY =
            this.y +
            this.height;

        const dx =
            player.x +
            player.width / 2 -
            startX;

        const dy =
            player.y +
            player.height / 2 -
            startY;

        const baseAngle =
            Math.atan2(
                dy,
                dx
            );

        const velocities =
            patternSystem
                .calculateWaveVelocities(
                    pattern,
                    baseAngle,
                    this.currentRotation
                );

        for (
            const velocity
            of velocities
        ) {
            enemyProjectilePool
                .getProjectile(
                    startX,
                    startY,
                    velocity.velocityX,
                    velocity.velocityY
                );
        }

        this.currentRotation += 0.7;
    }

    fireRadial(
        enemyProjectilePool,
        patternSystem,
        patternName
    ) {
        const pattern =
            patternSystem
                .getPattern(
                    patternName
                );

        if (!pattern) {
            return;
        }

        const rotatedPattern = {
            ...pattern,

            rotation:
                this.currentRotation
        };

        const velocities =
            patternSystem
                .calculateRadialVelocities(
                    rotatedPattern
                );

        const startX =
            this.x +
            this.width / 2;

        const startY =
            this.y +
            this.height / 2;

        for (
            const velocity
            of velocities
        ) {
            enemyProjectilePool
                .getProjectile(
                    startX,
                    startY,
                    velocity.velocityX,
                    velocity.velocityY
                );
        }

        this.currentRotation += 15;

        if (
            this.currentRotation >= 360
        ) {
            this.currentRotation -= 360;
        }
    }
}