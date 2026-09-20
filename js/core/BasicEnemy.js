import { Enemy } from "./Enemy.js";

export class BasicEnemy extends Enemy {
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

        this.type = "basic";

        this.speed = 100;
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

        this.y +=
            this.speed *
            deltaTime;

        if (this.y > canvas.height) {
            this.deactivate();
        }
    }
}