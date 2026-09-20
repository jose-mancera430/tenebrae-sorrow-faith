import { Entity } from "./Entity.js";

export class Projectile extends Entity {
    constructor(x, y) {
        const width = 8;
        const height = 20;

        super(
            x,
            y,
            width,
            height
        );

        this.speed = 600;
    }

    activate(x, y) {
        super.activate();

        this.x = x;
        this.y = y;
    }

    update(deltaTime) {
        this.y -= this.speed * deltaTime;
    }

    render(ctx) {
        ctx.fillStyle = "#f5f5dc";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}