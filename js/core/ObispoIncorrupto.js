import { Boss } from "./Boss.js";

export class ObispoIncorrupto extends Boss {
    constructor(
        x,
        y,
        sprite = null
    ) {
        super(
            x,
            y,
            100,
            100,
            90,
            "El Obispo Incorrupto"
        );

        this.sprite = sprite;

        this.renderWidth = 170;
        this.renderHeight = 190;

        /*
         * TEMPORIZADORES
         */
        this.mainFireTimer = 0;
        this.secondaryFireTimer = 0;

        /*
         * ROTACIÓN PARA
         * PATRONES RADIALES.
         */
        this.currentRotation = 0;
    }

    onPhaseChanged(
        phase
    ) {
        super.onPhaseChanged(
            phase
        );

        /*
         * Al entrar a fase II
         * aumenta movimiento.
         */
        if (phase === 2) {
            this.horizontalSpeed =
                135;

            /*
             * Pequeña pausa antes
             * del siguiente ataque.
             */
            this.mainFireTimer =
                0.4;

            this.secondaryFireTimer =
                0.7;
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
         * ============================
         * FASE I
         * ============================
         *
         * Disparo dirigido
         * +
         * círculo radial periódico.
         */
        if (this.phase === 1) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.fireAimed(
                    player,
                    enemyProjectilePool,
                    270
                );

                this.mainFireTimer =
                    0.8;
            }

            if (
                this.secondaryFireTimer <=
                0
            ) {
                this.fireRadial(
                    enemyProjectilePool,
                    patternSystem,
                    "radial-8"
                );

                this.secondaryFireTimer =
                    2.1;
            }

            return;
        }

        /*
         * ============================
         * FASE II
         * ============================
         *
         * Espiral rápida
         * +
         * ráfaga dirigida.
         */
        if (this.phase === 2) {
            if (
                this.mainFireTimer <= 0
            ) {
                this.fireRadial(
                    enemyProjectilePool,
                    patternSystem,
                    "spiral-8"
                );

                this.mainFireTimer =
                    0.55;
            }

            if (
                this.secondaryFireTimer <=
                0
            ) {
                this.fireBurst(
                    player,
                    enemyProjectilePool,
                    patternSystem
                );

                this.secondaryFireTimer =
                    1.5;
            }
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
            this.width / 2 -
            6;

        const startY =
            this.y +
            this.height;

        const playerX =
            player.x +
            player.width / 2;

        const playerY =
            player.y +
            player.height / 2;

        const dx =
            playerX -
            startX;

        const dy =
            playerY -
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

        /*
         * Copiamos patrón para no
         * modificar el original.
         */
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
            this.width / 2 -
            6;

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

        /*
         * Rotamos cada descarga.
         */
        this.currentRotation +=
            this.phase === 1
                ? 10
                : 18;

        if (
            this.currentRotation >= 360
        ) {
            this.currentRotation -=
                360;
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
            this.width / 2 -
            6;

        const startY =
            this.y +
            this.height;

        const playerX =
            player.x +
            player.width / 2;

        const playerY =
            player.y +
            player.height / 2;

        const dx =
            playerX -
            startX;

        const dy =
            playerY -
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