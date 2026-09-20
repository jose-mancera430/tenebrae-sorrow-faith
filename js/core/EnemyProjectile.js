import { Entity } from "./Entity.js";

export class EnemyProjectile extends Entity {
    constructor(x, y) {
        const width = 10;
        const height = 18;

        super(
            x,
            y,
            width,
            height
        );

        this.speed = 260;

        this.velocityX = 0;
        this.velocityY = this.speed;
    }

    activate(
        x,
        y,
        velocityX = 0,
        velocityY = this.speed
    ) {
        super.activate();

        this.x = x;
        this.y = y;

        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    update(deltaTime) {
        this.x +=
            this.velocityX *
            deltaTime;

        this.y +=
            this.velocityY *
            deltaTime;
    }

    render(ctx) {
        ctx.fillStyle = "#ff6b6b";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}