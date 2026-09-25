export class ApostolAbility {
    constructor() {
        this.name =
            "Sello de Mercurio";

        this.cost = 100;

        this.damage = 4;

        this.radius = 280;

        this.duration = 1;

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
        enemyManager,
        bossManager,
        enemyProjectilePool,
        player,
        effectManager
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
         * PURGAR PROYECTILES
         * =====================================
         */
        for (
            const projectile
            of enemyProjectilePool
                .projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }


            const projectileX =
                projectile.x +
                projectile.width / 2;

            const projectileY =
                projectile.y +
                projectile.height / 2;


            const dx =
                projectileX -
                centerX;

            const dy =
                projectileY -
                centerY;


            const distance =
                Math.hypot(
                    dx,
                    dy
                );


            if (
                distance <=
                this.radius
            ) {
                projectile
                    .deactivate();
            }
        }


        /*
         * =====================================
         * ENEMIGOS
         * =====================================
         */
        for (
            const enemy
            of enemyManager.enemies
        ) {
            if (
                !enemy.active
            ) {
                continue;
            }


            const enemyX =
                enemy.x +
                enemy.width / 2;

            const enemyY =
                enemy.y +
                enemy.height / 2;


            const distance =
                Math.hypot(
                    enemyX -
                        centerX,

                    enemyY -
                        centerY
                );


            if (
                distance >
                this.radius
            ) {
                continue;
            }


            enemy.takeDamage(
                this.damage
            );


            if (
                effectManager
            ) {
                effectManager
                    .createImpact(
                        enemyX,
                        enemyY
                    );
            }


            if (
                enemy.isDestroyed()
            ) {
                enemy.deactivate();

                player
                    .enemiesDestroyed++;


                if (
                    effectManager
                ) {
                    effectManager
                        .createDestruction(
                            enemyX,
                            enemyY
                        );
                }
            }
        }


        /*
         * =====================================
         * BOSS
         * =====================================
         */
        if (
            bossManager &&
            bossManager.currentBoss &&
            bossManager.currentBoss.active
        ) {
            const boss =
                bossManager.currentBoss;


            const bossX =
                boss.x +
                boss.width / 2;

            const bossY =
                boss.y +
                boss.height / 2;


            const distance =
                Math.hypot(
                    bossX -
                        centerX,

                    bossY -
                        centerY
                );


            if (
                distance <=
                this.radius
            ) {
                boss.takeDamage(
                    this.damage
                );


                if (
                    effectManager
                ) {
                    effectManager
                        .createImpact(
                            bossX,
                            bossY
                        );
                }
            }
        }


        console.log(
            "APÓSTOL:",
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


        const progress =
            1 -
            this.timer /
            this.duration;


        const radius =
            80 +
            (
                this.radius -
                80
            ) *
            progress;


        ctx.save();


        /*
         * Círculo exterior.
         */
        ctx.strokeStyle =
            "#b8c5c4";

        ctx.lineWidth = 4;


        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        /*
         * Segundo círculo.
         */
        ctx.strokeStyle =
            "#708c8a";

        ctx.lineWidth = 2;


        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius * 0.7,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        /*
         * Cruz del sello.
         */
        ctx.fillStyle =
            "#d9dedc";


        ctx.fillRect(
            centerX - 3,
            centerY - 70,
            6,
            140
        );


        ctx.fillRect(
            centerX - 70,
            centerY - 3,
            140,
            6
        );


        /*
         * Marcas rituales.
         */
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


            const x =
                centerX +
                Math.cos(angle) *
                radius *
                0.82;


            const y =
                centerY +
                Math.sin(angle) *
                radius *
                0.82;


            ctx.fillRect(
                x - 4,
                y - 4,
                8,
                8
            );
        }


        ctx.restore();
    }


    reset() {
        this.active = false;

        this.timer = 0;
    }
}