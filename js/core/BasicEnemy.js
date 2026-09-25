import { Enemy } from "./Enemy.js";

export class BasicEnemy extends Enemy {
    constructor(
        x,
        y,
        width,
        height,
        maxHealth,
        sprite = null
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

        this.sprite = sprite;

        this.renderWidth = 70;
        this.renderHeight = 90;
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

    render(ctx) {
        if (
            this.sprite &&
            this.sprite.complete
        ) {
            const drawX =
                this.x +
                this.width / 2 -
                this.renderWidth / 2;

            const drawY =
                this.y +
                this.height / 2 -
                this.renderHeight / 2;

            ctx.drawImage(
                this.sprite,
                drawX,
                drawY,
                this.renderWidth,
                this.renderHeight
            );

            return;
        }

        super.render(ctx);
    }
}