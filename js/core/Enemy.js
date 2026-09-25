import { DamageableEntity } from "./DamageableEntity.js";

export class Enemy extends DamageableEntity {
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

        // Velocidad base
        this.speed = 100;

        // Control de formaciones
        this.inFormation = false;

        // Sprite visual
        this.sprite = null;

        // Tamaño visual independiente
        // de la hitbox
        this.renderWidth = 70;
        this.renderHeight = 90;
    }

    setSprite(
        sprite,
        renderWidth = 70,
        renderHeight = 90
    ) {
        this.sprite = sprite;

        this.renderWidth =
            renderWidth;

        this.renderHeight =
            renderHeight;
    }

    update(
        deltaTime,
        canvas
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

        if (
            this.y >
            canvas.height
        ) {
            this.deactivate();
        }
    }

    render(ctx) {
        if (!this.active) {
            return;
        }

        // Si existe sprite,
        // dibujamos la imagen
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

        // Respaldo provisional
        // si el sprite no existe
        ctx.fillStyle =
            "#5a189a";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}