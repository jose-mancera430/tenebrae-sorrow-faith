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

        // Velocidad base provisional
        this.speed = 100;

        // Indica si el enemigo está siendo controlado por una formación
        this.inFormation = false;
    }

    update(deltaTime, canvas) {
        if (!this.active) {
            return;
        }

        // Mientras esté dentro de una formación,
        // su movimiento individual queda detenido
        if (this.inFormation) {
            return;
        }

        // Movimiento provisional individual hacia abajo
        this.y += this.speed * deltaTime;

        // Desactivar al salir completamente del Canvas
        if (this.y > canvas.height) {
            this.deactivate();
        }
    }

    render(ctx) {
        if (!this.active) {
            return;
        }

        ctx.fillStyle = "#5a189a";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}