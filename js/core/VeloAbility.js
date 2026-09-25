export class VeloAbility {
    constructor() {
        this.name =
            "Tormenta de Filos";

        this.cost = 100;

        this.bladeCount = 20;

        this.bladeSpeed = 500;

        this.bladeDamage = 3;

        this.duration = 0.8;

        this.timer = 0;

        this.active = false;
    }


    canActivate(
        fervorManager
    ) {
        return (
            fervorManager &&
            fervorManager
                .getFervor() >=
            this.cost
        );
    }


    activate(
        fervorManager,
        player,
        projectilePool
    ) {
        if (
            !this.canActivate(
                fervorManager
            )
        ) {
            return false;
        }


        fervorManager
            .removeFervor(
                this.cost
            );


        this.active = true;

        this.timer =
            this.duration;


        const centerX =
            player.x +
            player.width / 2;

        const centerY =
            player.y +
            player.height / 2;


        /*
         * =====================================
         * TORMENTA RADIAL
         * =====================================
         */
        for (
            let i = 0;
            i < this.bladeCount;
            i++
        ) {
            const angle =
                (
                    Math.PI * 2 *
                    i
                ) /
                this.bladeCount;


            const velocityX =
                Math.cos(angle) *
                this.bladeSpeed;


            const velocityY =
                Math.sin(angle) *
                this.bladeSpeed;


            projectilePool
                .getProjectile(
                    centerX,
                    centerY,
                    {
                        type:
                            "blade",

                        ashImpact:
                            false,

                        widthMultiplier:
                            0.8,

                        damageMultiplier:
                            this.bladeDamage,

                        velocityX:
                            velocityX,

                        velocityY:
                            velocityY,

                        lifetime:
                            1.7
                    }
                );


            /*
             * Los filos especiales también
             * cuentan como disparos.
             */
            player.shotsFired++;
        }


        console.log(
            "VELO:",
            this.name
        );


        return true;
    }


    update(
        deltaTime
    ) {
        if (
            !this.active
        ) {
            return;
        }


        this.timer -=
            deltaTime;


        if (
            this.timer <= 0
        ) {
            this.active =
                false;

            this.timer = 0;
        }
    }


    isActive() {
        return this.active;
    }


    /*
     * Ya no usamos multiplicador
     * temporal de daño.
     */
    getDamageMultiplier() {
        return 1;
    }


    render(
        ctx,
        player
    ) {
        if (
            !this.active
        ) {
            return;
        }


        const centerX =
            player.x +
            player.width / 2;

        const centerY =
            player.y +
            player.height / 2;


        ctx.save();


        /*
         * Destello central.
         */
        ctx.strokeStyle =
            "#e0e3e5";

        ctx.lineWidth = 3;


        for (
            let i = 0;
            i < 8;
            i++
        ) {
            const angle =
                (
                    Math.PI * 2 *
                    i
                ) /
                8;


            const innerX =
                centerX +
                Math.cos(angle) *
                30;


            const innerY =
                centerY +
                Math.sin(angle) *
                30;


            const outerX =
                centerX +
                Math.cos(angle) *
                80;


            const outerY =
                centerY +
                Math.sin(angle) *
                80;


            ctx.beginPath();

            ctx.moveTo(
                innerX,
                innerY
            );

            ctx.lineTo(
                outerX,
                outerY
            );

            ctx.stroke();
        }


        ctx.restore();
    }


    reset() {
        this.active = false;

        this.timer = 0;
    }
}