import { DamageableEntity } from "./DamageableEntity.js";

export class Target extends DamageableEntity {
    constructor(canvas) {
        const width = 80;
        const height = 50;

        const x =
            canvas.width / 2 -
            width / 2;

        const y = 80;

        const maxHealth = 3;

        super(
            x,
            y,
            width,
            height,
            maxHealth
        );
    }

    render(ctx) {
        ctx.fillStyle = "#4b4b4b";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}