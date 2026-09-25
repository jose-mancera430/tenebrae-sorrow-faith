import { Boss } from "./Boss.js";

export class CultoLlaga extends Boss {
    constructor(
        x,
        y,
        sprite = null
    ) {
        super(
            x,
            y,
            130,
            110,
            170,
            "El Culto de la Llaga"
        );

        this.sprite = sprite;

        this.renderWidth = 200;
        this.renderHeight = 185;

        this.mainFireTimer = 0;
        this.secondaryFireTimer = 0;

        this.horizontalSpeed = 85;

        this.currentRotation = 0;
    }

    onPhaseChanged(phase) {
        super.onPhaseChanged(
            phase
        );

        if (phase === 2) {
            this.horizontalSpeed = 145;

            this.mainFireTimer = 0.2;
            this.secondaryFireTimer = 0.4;
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
         * ráfagas
         * + disparos aleatorios
         */
        if (this.phase === 1) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.fireBurst(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    1.0;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.fireRandom(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.secondaryFireTimer =
                    1.6;
            }

            return;
        }

        /*
         * FASE II
         * ráfaga rápida
         * + espiral
         */
        if (this.phase === 2) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.fireBurst(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    0.55;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.fireSpiral(
                    enemyProjectilePool,
                    patternSystem
                );

                this.secondaryFireTimer =
                    0.7;
            }
        }
    }

    fireBurst(
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
                    "burst-5"
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
                .calculateBurstVelocities(
                    pattern,
                    baseAngle
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
    }

    fireRandom(
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
                    "random-5"
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
                .calculateRandomVelocities(
                    pattern,
                    baseAngle
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
    }

    fireSpiral(
        enemyProjectilePool,
        patternSystem
    ) {
        const pattern =
            patternSystem
                .getPattern(
                    "spiral-8"
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

        this.currentRotation += 22;

        if (
            this.currentRotation >= 360
        ) {
            this.currentRotation -= 360;
        }
    }
}