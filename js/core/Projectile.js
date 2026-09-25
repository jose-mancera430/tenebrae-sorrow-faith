import { Entity } from "./Entity.js";

export class Projectile extends Entity {
    constructor() {
        super(
            0,
            0,
            8,
            20
        );

        /*
         * Tamaño original.
         */
        this.baseWidth = 8;
        this.baseHeight = 20;

        /*
         * Movimiento.
         */
        this.speed = 600;

        this.velocityX = 0;
        this.velocityY = -600;

        /*
         * Daño.
         */
        this.damage = 1;

        /*
         * Tipo visual.
         *
         * normal
         * ash
         * magic
         * blade
         */
        this.type = "normal";

        this.ashImpact = false;

        /*
         * Tiempo máximo de vida.
         * Muy útil para las cuchillas
         * que pueden viajar en cualquier
         * dirección.
         */
        this.maxLifetime = 2.5;
        this.lifetime = 0;

        this.active = false;
    }


    activate(
        x,
        y,
        options = {}
    ) {
        /*
         * =====================================
         * OPCIONES
         * =====================================
         */
        const widthMultiplier =
            options.widthMultiplier ?? 1;

        const damageMultiplier =
            options.damageMultiplier ?? 1;


        this.type =
            options.type ??
            "normal";


        this.ashImpact =
            options.ashImpact === true;


        /*
         * =====================================
         * REINICIAR PROPIEDADES
         * =====================================
         */
        this.width =
            this.baseWidth *
            widthMultiplier;


        this.height =
            this.baseHeight;


        this.damage =
            damageMultiplier;


        this.speed =
            options.speed ??
            600;


        /*
         * Por defecto el proyectil
         * viaja hacia arriba.
         */
        this.velocityX =
            options.velocityX ??
            0;


        this.velocityY =
            options.velocityY ??
            -this.speed;


        this.maxLifetime =
            options.lifetime ??
            2.5;


        this.lifetime = 0;


        /*
         * =====================================
         * IMPACTO DE CENIZA
         * =====================================
         */
        if (
            this.ashImpact
        ) {
            this.type = "ash";

            this.width =
                this.baseWidth *
                2.2;

            this.height = 24;

            this.damage =
                Math.max(
                    this.damage,
                    1.5
                );
        }


        /*
         * =====================================
         * MAGIA
         * =====================================
         */
        if (
            this.type ===
            "magic"
        ) {
            this.height = 18;
        }


        /*
         * =====================================
         * CUCHILLA
         * =====================================
         */
        if (
            this.type ===
            "blade"
        ) {
            this.height = 22;
        }


        /*
         * Centrado.
         */
        this.x =
            x -
            (
                this.width -
                this.baseWidth
            ) /
            2;


        this.y = y;


        this.active = true;
    }


    update(
        deltaTime
    ) {
        if (
            !this.active
        ) {
            return;
        }


        /*
         * Movimiento vectorial.
         */
        this.x +=
            this.velocityX *
            deltaTime;


        this.y +=
            this.velocityY *
            deltaTime;


        /*
         * Tiempo de vida.
         */
        this.lifetime +=
            deltaTime;


        if (
            this.lifetime >=
            this.maxLifetime
        ) {
            this.deactivate();

            return;
        }


        /*
         * Seguridad para proyectiles
         * normales que salen por arriba.
         */
        if (
            this.y +
            this.height <
            -100
        ) {
            this.deactivate();
        }
    }


    deactivate() {
        this.active = false;

        this.width =
            this.baseWidth;

        this.height =
            this.baseHeight;

        this.damage = 1;

        this.speed = 600;

        this.velocityX = 0;

        this.velocityY = -600;

        this.type = "normal";

        this.ashImpact = false;

        this.lifetime = 0;

        this.maxLifetime = 2.5;
    }


    /*
     * =====================================
     * RELICARIO NORMAL
     * =====================================
     */
    renderNormal(
        ctx
    ) {
        ctx.fillStyle =
            "#d9b66f";


        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );


        ctx.fillStyle =
            "#f4e0a5";


        const innerWidth =
            Math.max(
                2,
                this.width *
                    0.35
            );


        ctx.fillRect(
            this.x +
                (
                    this.width -
                    innerWidth
                ) /
                2,
            this.y,
            innerWidth,
            this.height *
                0.65
        );
    }


    /*
     * =====================================
     * CENIZA
     * =====================================
     */
    renderAshImpact(
        ctx
    ) {
        ctx.fillStyle =
            "#9f713d";


        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );


        ctx.fillStyle =
            "#d2a45e";


        ctx.fillRect(
            this.x +
                this.width *
                    0.2,
            this.y,
            this.width *
                0.6,
            this.height *
                0.75
        );


        ctx.fillStyle =
            "#6e6258";


        ctx.fillRect(
            this.x - 2,
            this.y +
                this.height -
                5,
            3,
            4
        );


        ctx.fillRect(
            this.x +
                this.width +
                1,
            this.y +
                this.height -
                9,
            3,
            4
        );
    }


    /*
     * =====================================
     * MAGIA DE MERCURIO
     * =====================================
     */
    renderMagic(
        ctx
    ) {
        const centerX =
            this.x +
            this.width / 2;

        const centerY =
            this.y +
            this.height / 2;


        ctx.save();


        /*
         * Núcleo de mercurio.
         */
        ctx.fillStyle =
            "#d4d6d8";


        ctx.fillRect(
            centerX - 4,
            centerY - 7,
            8,
            14
        );


        /*
         * Runas laterales.
         */
        ctx.fillStyle =
            "#8aa7a7";


        ctx.fillRect(
            centerX - 9,
            centerY - 2,
            5,
            4
        );


        ctx.fillRect(
            centerX + 4,
            centerY - 2,
            5,
            4
        );


        /*
         * Pequeña cruz arcana.
         */
        ctx.fillStyle =
            "#eeeeee";


        ctx.fillRect(
            centerX - 1,
            centerY - 10,
            2,
            20
        );


        ctx.fillRect(
            centerX - 6,
            centerY - 1,
            12,
            2
        );


        ctx.restore();
    }


    /*
     * =====================================
     * FILO / DAGA
     * =====================================
     */
    renderBlade(
        ctx
    ) {
        const centerX =
            this.x +
            this.width / 2;

        const centerY =
            this.y +
            this.height / 2;


        /*
         * Para que la daga apunte
         * en la dirección real.
         */
        const angle =
            Math.atan2(
                this.velocityY,
                this.velocityX
            ) +
            Math.PI / 2;


        ctx.save();


        ctx.translate(
            centerX,
            centerY
        );


        ctx.rotate(
            angle
        );


        /*
         * Hoja.
         */
        ctx.fillStyle =
            "#d7d9dc";


        ctx.beginPath();

        ctx.moveTo(
            0,
            -12
        );

        ctx.lineTo(
            4,
            5
        );

        ctx.lineTo(
            0,
            9
        );

        ctx.lineTo(
            -4,
            5
        );

        ctx.closePath();

        ctx.fill();


        /*
         * Centro.
         */
        ctx.fillStyle =
            "#f3f3f3";


        ctx.fillRect(
            -1,
            -7,
            2,
            11
        );


        /*
         * Guarda.
         */
        ctx.fillStyle =
            "#927342";


        ctx.fillRect(
            -6,
            5,
            12,
            3
        );


        ctx.restore();
    }


    render(
        ctx
    ) {
        if (
            !this.active
        ) {
            return;
        }


        if (
            this.type ===
            "ash"
        ) {
            this.renderAshImpact(
                ctx
            );

            return;
        }


        if (
            this.type ===
            "magic"
        ) {
            this.renderMagic(
                ctx
            );

            return;
        }


        if (
            this.type ===
            "blade"
        ) {
            this.renderBlade(
                ctx
            );

            return;
        }


        this.renderNormal(
            ctx
        );
    }
}