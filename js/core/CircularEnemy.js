import { Enemy } from "./Enemy.js";

export class CircularEnemy extends Enemy {
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

        this.type = "circular";

        this.angle = 0;

        this.orbitRadius = 70;

        this.angularSpeed = 1.5;

        this.centerX = x;
        this.centerY = y;

        this.orbitInitialized = false;
    }

    update(
        deltaTime,
        canvas,
        player
    ) {
        if (!this.active) {
            return;
        }

        if (this.inFormation) {
            return;
        }

        if (!this.orbitInitialized) {
            this.centerX = this.x;
            this.centerY = this.y;

            this.orbitInitialized = true;
        }

        this.angle +=
            this.angularSpeed *
            deltaTime;

        this.x =
            this.centerX +
            Math.cos(this.angle) *
            this.orbitRadius;

        this.y =
            this.centerY +
            Math.sin(this.angle) *
            this.orbitRadius;

        if (
            this.x + this.width < 0 ||
            this.x > canvas.width ||
            this.y + this.height < 0 ||
            this.y > canvas.height
        ) {
            this.deactivate();
        }
    }
}