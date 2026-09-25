import { Enemy } from "./Enemy.js";

export class TurretEnemy extends Enemy {
    constructor(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        super(
            x,
            y,
            width,
            height,
            maxHealth
        );

        this.type = "turret";

        this.stopY = 180;

        this.stopped = false;

        /*
         * No dispara inmediatamente al detenerse.
         */
        this.fireTimer =
            1.60;

        this.patternName =
            "combo-aimed-radial";

        this.currentRotation = 0;

        this.waveOffset = 0;

        this.comboIndex = 0;
    }

    update(
        deltaTime,
        canvas,
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        if (!this.active) {
            return;
        }

        if (this.inFormation) {
            return;
        }

        if (!this.stopped) {
            this.y +=
                this.speed *
                deltaTime;

            if (this.y >= this.stopY) {
                this.y = this.stopY;

                this.stopped = true;
            }
        }

        if (
            this.stopped &&
            patternSystem
        ) {
            const pattern =
                patternSystem.getPattern(
                    this.patternName
                );

            if (pattern) {
                this.fireTimer -=
                    deltaTime;

                if (
                    this.fireTimer <= 0 &&
                    enemyProjectilePool
                ) {
                    this.firePattern(
                        player,
                        enemyProjectilePool,
                        patternSystem,
                        pattern
                    );

                    /*
                     * Las torretas siguen siendo peligrosas,
                     * pero dejan tiempo real para esquivar.
                     */
                    this.fireTimer =
                        (
                            pattern.interval /
                            1000
                        ) *
                        1.85;
                }
            }
        }

        if (
            this.x + this.width < 0 ||
            this.x > canvas.width
        ) {
            this.deactivate();
        }
    }

    firePattern(
        player,
        enemyProjectilePool,
        patternSystem,
        pattern
    ) {
        if (pattern.type === "aimed") {
            this.fireAimedShot(
                player,
                enemyProjectilePool,
                pattern
            );
        }

        if (
            pattern.type === "radial" ||
            pattern.type === "rotating"
        ) {
            this.fireRadialShot(
                enemyProjectilePool,
                patternSystem,
                pattern
            );
        }

        if (pattern.type === "burst") {
            this.fireBurstShot(
                player,
                enemyProjectilePool,
                patternSystem,
                pattern
            );
        }

        if (pattern.type === "wave") {
            this.fireWaveShot(
                player,
                enemyProjectilePool,
                patternSystem,
                pattern
            );
        }

        if (pattern.type === "random") {
            this.fireRandomShot(
                player,
                enemyProjectilePool,
                patternSystem,
                pattern
            );
        }

        if (pattern.type === "combo") {
            this.fireComboShot(
                player,
                enemyProjectilePool,
                patternSystem,
                pattern
            );
        }
    }

    fireAimedShot(
        player,
        enemyProjectilePool,
        pattern
    ) {
        if (!player) {
            return;
        }

        const startX =
            this.x +
            this.width / 2 -
            5;

        const startY =
            this.y +
            this.height;

        const turretCenterX =
            this.x +
            this.width / 2;

        const turretCenterY =
            this.y +
            this.height / 2;

        const playerCenterX =
            player.x +
            player.width / 2;

        const playerCenterY =
            player.y +
            player.height / 2;

        const directionX =
            playerCenterX -
            turretCenterX;

        const directionY =
            playerCenterY -
            turretCenterY;

        const distance =
            Math.sqrt(
                directionX * directionX +
                directionY * directionY
            );

        if (distance <= 0) {
            return;
        }

        const velocityX =
            (directionX / distance) *
            pattern.speed;

        const velocityY =
            (directionY / distance) *
            pattern.speed;

        enemyProjectilePool.getProjectile(
            startX,
            startY,
            velocityX,
            velocityY
        );
    }

    fireRadialShot(
        enemyProjectilePool,
        patternSystem,
        pattern
    ) {
        const rotatedPattern = {
            ...pattern,
            rotation:
                this.currentRotation
        };

        const velocities =
            patternSystem.calculateRadialVelocities(
                rotatedPattern
            );

        const startX =
            this.x +
            this.width / 2 -
            5;

        const startY =
            this.y +
            this.height / 2 -
            9;

        for (const velocity of velocities) {
            enemyProjectilePool.getProjectile(
                startX,
                startY,
                velocity.velocityX,
                velocity.velocityY
            );
        }

        this.currentRotation +=
            pattern.rotation;

        if (this.currentRotation >= 360) {
            this.currentRotation -= 360;
        }
    }

    fireBurstShot(
        player,
        enemyProjectilePool,
        patternSystem,
        pattern
    ) {
        if (!player) {
            return;
        }

        const startX =
            this.x +
            this.width / 2 -
            5;

        const startY =
            this.y +
            this.height;

        const turretCenterX =
            this.x +
            this.width / 2;

        const turretCenterY =
            this.y +
            this.height / 2;

        const playerCenterX =
            player.x +
            player.width / 2;

        const playerCenterY =
            player.y +
            player.height / 2;

        const directionX =
            playerCenterX -
            turretCenterX;

        const directionY =
            playerCenterY -
            turretCenterY;

        const baseAngle =
            Math.atan2(
                directionY,
                directionX
            );

        const velocities =
            patternSystem.calculateBurstVelocities(
                pattern,
                baseAngle
            );

        for (const velocity of velocities) {
            enemyProjectilePool.getProjectile(
                startX,
                startY,
                velocity.velocityX,
                velocity.velocityY
            );
        }
    }

    fireWaveShot(
        player,
        enemyProjectilePool,
        patternSystem,
        pattern
    ) {
        if (!player) {
            return;
        }

        const startX =
            this.x +
            this.width / 2 -
            5;

        const startY =
            this.y +
            this.height;

        const turretCenterX =
            this.x +
            this.width / 2;

        const turretCenterY =
            this.y +
            this.height / 2;

        const playerCenterX =
            player.x +
            player.width / 2;

        const playerCenterY =
            player.y +
            player.height / 2;

        const directionX =
            playerCenterX -
            turretCenterX;

        const directionY =
            playerCenterY -
            turretCenterY;

        const baseAngle =
            Math.atan2(
                directionY,
                directionX
            );

        const velocities =
            patternSystem.calculateWaveVelocities(
                pattern,
                baseAngle,
                this.waveOffset
            );

        for (const velocity of velocities) {
            enemyProjectilePool.getProjectile(
                startX,
                startY,
                velocity.velocityX,
                velocity.velocityY
            );
        }

        this.waveOffset += 0.8;
    }

    fireRandomShot(
        player,
        enemyProjectilePool,
        patternSystem,
        pattern
    ) {
        if (!player) {
            return;
        }

        const startX =
            this.x +
            this.width / 2 -
            5;

        const startY =
            this.y +
            this.height;

        const turretCenterX =
            this.x +
            this.width / 2;

        const turretCenterY =
            this.y +
            this.height / 2;

        const playerCenterX =
            player.x +
            player.width / 2;

        const playerCenterY =
            player.y +
            player.height / 2;

        const directionX =
            playerCenterX -
            turretCenterX;

        const directionY =
            playerCenterY -
            turretCenterY;

        const baseAngle =
            Math.atan2(
                directionY,
                directionX
            );

        const velocities =
            patternSystem.calculateRandomVelocities(
                pattern,
                baseAngle
            );

        for (const velocity of velocities) {
            enemyProjectilePool.getProjectile(
                startX,
                startY,
                velocity.velocityX,
                velocity.velocityY
            );
        }
    }

    fireComboShot(
        player,
        enemyProjectilePool,
        patternSystem,
        pattern
    ) {
        if (
            !pattern.patterns ||
            pattern.patterns.length === 0
        ) {
            return;
        }

        const selectedPatternName =
            pattern.patterns[
                this.comboIndex
            ];

        const selectedPattern =
            patternSystem.getPattern(
                selectedPatternName
            );

        if (!selectedPattern) {
            return;
        }

        this.firePattern(
            player,
            enemyProjectilePool,
            patternSystem,
            selectedPattern
        );

        this.comboIndex++;

        if (
            this.comboIndex >=
            pattern.patterns.length
        ) {
            this.comboIndex = 0;
        }
    }
}