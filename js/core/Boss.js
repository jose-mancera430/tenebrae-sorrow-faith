import { Enemy } from "./Enemy.js";

export class Boss extends Enemy {
    constructor(
        x,
        y,
        width,
        height,
        maxHealth,
        name = "Boss"
    ) {
        super(
            x,
            y,
            width,
            height,
            maxHealth
        );

        this.name = name;

        this.phase = 1;
        this.maxPhases = 2;

        /*
         * ENTRADA
         */
        this.entering = true;
        this.targetY = 90;

        this.speed = 80;

        /*
         * MOVIMIENTO LATERAL
         */
        this.horizontalSpeed = 90;
        this.direction = 1;

        /*
         * TAMAÑO VISUAL
         */
        this.renderWidth = 160;
        this.renderHeight = 180;
    }

    update(
        deltaTime,
        canvas,
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        if (!this.active) {
            return;
        }

        /*
         * ENTRADA A LA ARENA
         */
        if (this.entering) {
            this.y +=
                this.speed *
                deltaTime;

            if (
                this.y >=
                this.targetY
            ) {
                this.y =
                    this.targetY;

                this.entering =
                    false;
            }

            return;
        }

        this.updatePhase();

        /*
         * MOVIMIENTO
         */
        this.x +=
            this.horizontalSpeed *
            this.direction *
            deltaTime;

        if (this.x <= 40) {
            this.x = 40;
            this.direction = 1;
        }

        if (
            this.x +
                this.width >=
            canvas.width - 40
        ) {
            this.x =
                canvas.width -
                this.width -
                40;

            this.direction = -1;
        }

        /*
         * ATAQUE ESPECÍFICO
         * DE CADA JEFE.
         */
        this.updateAttack(
            deltaTime,
            canvas,
            player,
            enemyProjectilePool,
            patternSystem
        );
    }

    updatePhase() {
        const percentage =
            this.health /
            this.maxHealth;

        let newPhase = 1;

        /*
         * JEFES DE 2 FASES
         */
        if (
            this.maxPhases === 2 &&
            percentage <= 0.5
        ) {
            newPhase = 2;
        }

        /*
         * JEFE FINAL
         */
        if (
            this.maxPhases === 3
        ) {
            if (
                percentage <= 0.33
            ) {
                newPhase = 3;
            } else if (
                percentage <= 0.66
            ) {
                newPhase = 2;
            }
        }

        if (
            newPhase !==
            this.phase
        ) {
            this.phase =
                newPhase;

            this.onPhaseChanged(
                newPhase
            );
        }
    }

    onPhaseChanged(
        phase
    ) {
        console.log(
            `${this.name} - FASE ${phase}`
        );
    }

    updateAttack(
        deltaTime,
        canvas,
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        /*
         * Cada jefe sobrescribe
         * este método.
         */
    }

    getHealthPercentage() {
        if (
            this.maxHealth <= 0
        ) {
            return 0;
        }

        return (
            this.health /
            this.maxHealth
        );
    }

    render(ctx) {
        if (!this.active) {
            return;
        }

        /*
         * SPRITE REAL
         */
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
        } else {
            /*
             * REPRESENTACIÓN
             * PROVISIONAL PIXEL-ART
             */
            const x =
                Math.round(
                    this.x
                );

            const y =
                Math.round(
                    this.y
                );

            ctx.save();

            ctx.imageSmoothingEnabled =
                false;

            ctx.fillStyle =
                "#241217";

            ctx.fillRect(
                x,
                y,
                this.width,
                this.height
            );

            ctx.fillStyle =
                "#711d2b";

            ctx.fillRect(
                x + 8,
                y + 8,
                this.width - 16,
                this.height - 16
            );

            /*
             * MITRA
             */
            ctx.fillStyle =
                "#b38a4b";

            ctx.fillRect(
                x + 35,
                y - 18,
                30,
                28
            );

            ctx.fillStyle =
                "#e0bf72";

            ctx.fillRect(
                x + 48,
                y - 22,
                4,
                32
            );

            /*
             * CRUZ
             */
            ctx.fillRect(
                x + 40,
                y - 8,
                20,
                4
            );

            /*
             * ROSTRO
             */
            ctx.fillStyle =
                "#d7c7aa";

            ctx.fillRect(
                x + 37,
                y + 18,
                26,
                22
            );

            /*
             * OJOS
             */
            ctx.fillStyle =
                "#5b0710";

            ctx.fillRect(
                x + 41,
                y + 25,
                5,
                4
            );

            ctx.fillRect(
                x + 54,
                y + 25,
                5,
                4
            );

            ctx.restore();
        }

        this.renderHealthBar(
            ctx
        );
    }

    renderHealthBar(ctx) {
        const percentage =
            this.getHealthPercentage();

        const barWidth = 420;
        const barHeight = 18;

        const x =
            ctx.canvas.width / 2 -
            barWidth / 2;

        const y = 25;

        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        /*
         * NOMBRE
         */
        ctx.textAlign =
            "center";

        ctx.font =
            "20px serif";

        ctx.fillStyle =
            "#d6ad58";

        ctx.fillText(
            `${this.name} — Fase ${this.phase}`,
            ctx.canvas.width / 2,
            y - 5
        );

        /*
         * MARCO
         */
        ctx.fillStyle =
            "#100a0c";

        ctx.fillRect(
            x,
            y,
            barWidth,
            barHeight
        );

        ctx.fillStyle =
            "#6e5233";

        ctx.fillRect(
            x + 2,
            y + 2,
            barWidth - 4,
            barHeight - 4
        );

        /*
         * INTERIOR
         */
        ctx.fillStyle =
            "#1e1114";

        ctx.fillRect(
            x + 4,
            y + 4,
            barWidth - 8,
            barHeight - 8
        );

        /*
         * VIDA
         */
        ctx.fillStyle =
            this.phase === 1
                ? "#7d1e2b"
                : "#af2636";

        ctx.fillRect(
            x + 4,
            y + 4,
            Math.floor(
                (
                    barWidth -
                    8
                ) *
                percentage
            ),
            barHeight - 8
        );

        ctx.restore();
    }
}