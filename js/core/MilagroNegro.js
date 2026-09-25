import { Boss } from "./Boss.js";

export class MilagroNegro extends Boss {
    constructor(
        x,
        y,
        sprite = null
    ) {
        super(
            x,
            y,
            150,
            130,
            260,
            "El Milagro Negro"
        );

        this.sprite = sprite;

        this.renderWidth = 230;
        this.renderHeight = 220;

        this.maxPhases = 3;

        this.mainFireTimer = 0;

        this.secondaryFireTimer = 0;

        this.thirdFireTimer = 0;

        this.horizontalSpeed = 90;

        this.currentRotation = 0;
    }

    onPhaseChanged(phase) {
        super.onPhaseChanged(
            phase
        );

        if (phase === 2) {
            this.horizontalSpeed = 125;

            this.mainFireTimer = 0.3;
            this.secondaryFireTimer = 0.5;
        }

        if (phase === 3) {
            this.horizontalSpeed = 165;

            this.mainFireTimer = 0.15;
            this.secondaryFireTimer = 0.25;
            this.thirdFireTimer = 0.4;
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

        this.thirdFireTimer -=
            deltaTime;

        /*
         * FASE I
         */
        if (this.phase === 1) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.firePattern(
                    "radial-8",
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    1.1;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.fireAimed(
                    player,
                    enemyProjectilePool,
                    290
                );

                this.secondaryFireTimer =
                    0.8;
            }

            return;
        }

        /*
         * FASE II
         */
        if (this.phase === 2) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.firePattern(
                    "spiral-8",
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    0.55;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.fireBurst(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.secondaryFireTimer =
                    1.0;
            }

            return;
        }

        /*
         * FASE III
         */
        if (this.phase === 3) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.firePattern(
                    "rotating-6",
                    enemyProjectilePool,
                    patternSystem
                );

                this.mainFireTimer =
                    0.35;
            }

            if (
                this.secondaryFireTimer <= 0
            ) {
                this.firePattern(
                    "spiral-8",
                    enemyProjectilePool,
                    patternSystem
                );

                this.secondaryFireTimer =
                    0.45;
            }

            if (
                this.thirdFireTimer <= 0
            ) {
                this.fireBurst(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.thirdFireTimer =
                    0.75;
            }
        }
    }

    firePattern(
        patternName,
        enemyProjectilePool,
        patternSystem
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

        this.currentRotation +=
            this.phase === 3
                ? 26
                : 16;

        if (
            this.currentRotation >= 360
        ) {
            this.currentRotation -= 360;
        }
    }

    fireAimed(
        player,
        enemyProjectilePool,
        speed
    ) {
        if (!player) {
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

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        if (
            distance <= 0
        ) {
            return;
        }

        enemyProjectilePool
            .getProjectile(
                startX,
                startY,
                (
                    dx /
                    distance
                ) *
                    speed,
                (
                    dy /
                    distance
                ) *
                    speed
            );
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
}