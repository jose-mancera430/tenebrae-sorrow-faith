import { Entity } from "./Entity.js";

export class PowerUpItem extends Entity {
    constructor(
        x,
        y,
        type = "speedBoost"
    ) {
        const width = 28;
        const height = 28;

        super(
            x,
            y,
            width,
            height
        );

        this.type = type;

        this.speed = 110;

        /*
         * Pequeño movimiento lateral
         * para que el objeto no caiga
         * completamente recto.
         */
        this.horizontalOffset = 0;

        this.time = 0;
    }

    setType(type) {
        this.type = type;
    }

    update(
        deltaTime,
        canvas
    ) {
        if (!this.active) {
            return;
        }

        this.time +=
            deltaTime;

        /*
         * Caída vertical.
         */
        this.y +=
            this.speed *
            deltaTime;

        /*
         * Oscilación lateral leve.
         */
        this.horizontalOffset =
            Math.sin(
                this.time * 3
            ) * 12;

        /*
         * Desactivar al salir
         * de la pantalla.
         */
        if (
            this.y >
            canvas.height +
                this.height
        ) {
            this.deactivate();
        }
    }

    render(ctx) {
        if (!this.active) {
            return;
        }

        const x =
            Math.round(
                this.x +
                this.horizontalOffset
            );

        const y =
            Math.round(
                this.y
            );

        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        /*
         * Marco exterior pixel art.
         */
        ctx.fillStyle =
            "#1d1518";

        ctx.fillRect(
            x,
            y,
            28,
            28
        );

        /*
         * Borde dorado.
         */
        ctx.fillStyle =
            "#9b7438";

        ctx.fillRect(
            x + 2,
            y + 2,
            24,
            24
        );

        /*
         * Fondo interior.
         */
        ctx.fillStyle =
            "#2a1b23";

        ctx.fillRect(
            x + 5,
            y + 5,
            18,
            18
        );

        this.renderSymbol(
            ctx,
            x,
            y
        );

        ctx.restore();
    }

    renderSymbol(
        ctx,
        x,
        y
    ) {
        if (
            this.type ===
            "speedBoost"
        ) {
            /*
             * Rayo pixelado.
             */
            ctx.fillStyle =
                "#e2bd65";

            ctx.fillRect(
                x + 13,
                y + 7,
                5,
                6
            );

            ctx.fillRect(
                x + 10,
                y + 12,
                7,
                5
            );

            ctx.fillRect(
                x + 9,
                y + 16,
                5,
                5
            );

            return;
        }

        if (
            this.type ===
            "doubleShot"
        ) {
            ctx.fillStyle =
                "#d8c58a";

            ctx.fillRect(
                x + 8,
                y + 8,
                4,
                13
            );

            ctx.fillRect(
                x + 17,
                y + 8,
                4,
                13
            );

            return;
        }

        if (
            this.type ===
            "tripleShot"
        ) {
            ctx.fillStyle =
                "#d8c58a";

            ctx.fillRect(
                x + 6,
                y + 9,
                4,
                12
            );

            ctx.fillRect(
                x + 12,
                y + 6,
                4,
                15
            );

            ctx.fillRect(
                x + 18,
                y + 9,
                4,
                12
            );

            return;
        }

        if (
            this.type ===
            "shield"
        ) {
            ctx.fillStyle =
                "#7b8fa3";

            ctx.fillRect(
                x + 8,
                y + 7,
                12,
                4
            );

            ctx.fillRect(
                x + 7,
                y + 11,
                14,
                7
            );

            ctx.fillRect(
                x + 10,
                y + 18,
                8,
                4
            );

            return;
        }

        if (
            this.type ===
            "piercing"
        ) {
            ctx.fillStyle =
                "#b7a8c7";

            ctx.fillRect(
                x + 13,
                y + 6,
                3,
                16
            );

            ctx.fillRect(
                x + 10,
                y + 9,
                9,
                3
            );

            return;
        }

        if (
            this.type ===
            "specialBomb"
        ) {
            ctx.fillStyle =
                "#7f0d14";

            ctx.fillRect(
                x + 9,
                y + 10,
                11,
                11
            );

            ctx.fillStyle =
                "#d6ad58";

            ctx.fillRect(
                x + 17,
                y + 7,
                4,
                4
            );
        }
    }
}