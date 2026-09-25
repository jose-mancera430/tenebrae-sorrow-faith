import { Entity } from "./Entity.js";

export class EnemyProjectile extends Entity {
    constructor(x, y) {
        const width = 12;
        const height = 12;

        super(
            x,
            y,
            width,
            height
        );

        this.speed = 260;

        this.velocityX = 0;

        this.velocityY =
            this.speed;
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

        this.velocityX =
            velocityX;

        this.velocityY =
            velocityY;
    }

    update(deltaTime) {
        if (!this.active) {
            return;
        }

        this.x +=
            this.velocityX *
            deltaTime;

        this.y +=
            this.velocityY *
            deltaTime;
    }

    render(ctx) {
        if (!this.active) {
            return;
        }

        const x =
            Math.round(this.x);

        const y =
            Math.round(this.y);

        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        /*
         * Proyectil corrupto pixel art.
         *
         * Forma irregular y colores
         * carmesí oscuro.
         */

        ctx.fillStyle =
            "#3a0710";

        ctx.fillRect(
            x + 3,
            y,
            6,
            2
        );

        ctx.fillRect(
            x + 1,
            y + 2,
            10,
            8
        );

        ctx.fillRect(
            x + 3,
            y + 10,
            6,
            2
        );

        /*
         * Interior rojo.
         */
        ctx.fillStyle =
            "#7d101b";

        ctx.fillRect(
            x + 3,
            y + 2,
            6,
            8
        );

        /*
         * Núcleo.
         */
        ctx.fillStyle =
            "#bc2530";

        ctx.fillRect(
            x + 4,
            y + 4,
            4,
            4
        );

        /*
         * Punto brillante mínimo.
         */
        ctx.fillStyle =
            "#df6970";

        ctx.fillRect(
            x + 5,
            y + 4,
            2,
            2
        );

        ctx.restore();
    }
}