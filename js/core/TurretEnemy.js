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

        this.fireTimer = 0;

        this.patternName =
            "aimed-single";
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
                    enemyProjectilePool &&
                    player
                ) {
                    this.fireAimedShot(
                        player,
                        enemyProjectilePool,
                        pattern
                    );

                    this.fireTimer =
                        pattern.interval / 1000;
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

    fireAimedShot(
        player,
        enemyProjectilePool,
        pattern
    ) {
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
}