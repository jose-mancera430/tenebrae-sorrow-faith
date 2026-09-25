export class BellRumbleAbility {
    constructor() {
        this.active = false;

        this.duration = 0.9;

        this.timer = 0;

        this.cost = 150;

        this.maxRadius = 320;

        this.damage = 3;

        this.knockback = 35;
    }

    activate(
        fervorManager,
        enemyProjectilePool,
        enemyManager,
        player,
        effectManager
    ) {
        if (
            !fervorManager ||
            !player
        ) {
            return false;
        }

        if (
            fervorManager.getFervor() <
            this.cost
        ) {
            return false;
        }

        fervorManager.removeFervor(
            this.cost
        );

        this.active = true;

        this.timer =
            this.duration;

        this.purgeProjectiles(
            player,
            enemyProjectilePool
        );

        this.damageEnemies(
            player,
            enemyManager,
            effectManager
        );

        console.log(
            "RETUMBO DE CAMPANA ACTIVADO"
        );

        return true;
    }

    purgeProjectiles(
        player,
        enemyProjectilePool
    ) {
        if (
            !enemyProjectilePool
        ) {
            return;
        }

        const centerX =
            player.x +
            player.width / 2;

        const centerY =
            player.y +
            player.height / 2;

        for (
            const projectile
            of enemyProjectilePool.projectiles
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
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance <=
                this.maxRadius
            ) {
                projectile.deactivate();
            }
        }
    }

    damageEnemies(
        player,
        enemyManager,
        effectManager
    ) {
        if (!enemyManager) {
            return;
        }

        const centerX =
            player.x +
            player.width / 2;

        const centerY =
            player.y +
            player.height / 2;

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

            const dx =
                enemyX -
                centerX;

            const dy =
                enemyY -
                centerY;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance >
                this.maxRadius
            ) {
                continue;
            }

            /*
             * DAÑO
             */
            enemy.takeDamage(
                this.damage
            );

            /*
             * EMPUJE HACIA ARRIBA
             */
            enemy.y =
                Math.max(
                    0,
                    enemy.y -
                        this.knockback
                );

            /*
             * IMPACTO VISUAL
             */
            if (effectManager) {
                effectManager
                    .createImpact(
                        enemyX,
                        enemyY
                    );
            }

            /*
             * MUERTE
             */
            if (
                enemy.isDestroyed()
            ) {
                if (effectManager) {
                    effectManager
                        .createDestruction(
                            enemyX,
                            enemyY
                        );
                }

                enemy.deactivate();

                player.enemiesDestroyed++;
            }
        }
    }

    update(deltaTime) {
        if (!this.active) {
            return;
        }

        this.timer -=
            deltaTime;

        if (
            this.timer <= 0
        ) {
            this.active = false;
            this.timer = 0;
        }
    }

    render(
        ctx,
        player
    ) {
        if (
            !this.active ||
            !player
        ) {
            return;
        }

        const progress =
            1 -
            (
                this.timer /
                this.duration
            );

        const radius =
            Math.floor(
                30 +
                (
                    this.maxRadius -
                    30
                ) *
                    progress
            );

        const centerX =
            Math.round(
                player.x +
                player.width / 2
            );

        const centerY =
            Math.round(
                player.y +
                player.height / 2
            );

        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        /*
         * ONDA EXTERIOR
         */
        const segments = 48;

        for (
            let i = 0;
            i < segments;
            i++
        ) {
            const angle =
                (
                    Math.PI *
                    2 *
                    i
                ) /
                segments;

            const x =
                Math.round(
                    centerX +
                    Math.cos(angle) *
                        radius
                );

            const y =
                Math.round(
                    centerY +
                    Math.sin(angle) *
                        radius
                );

            if (
                i % 3 === 0
            ) {
                ctx.fillStyle =
                    "#e1bb67";
            } else {
                ctx.fillStyle =
                    "#72502a";
            }

            ctx.fillRect(
                x - 3,
                y - 3,
                6,
                6
            );
        }

        /*
         * CAMPANA CENTRAL
         */
        ctx.fillStyle =
            "#3a2618";

        ctx.fillRect(
            centerX - 15,
            centerY - 20,
            30,
            25
        );

        ctx.fillStyle =
            "#a87336";

        ctx.fillRect(
            centerX - 12,
            centerY - 18,
            24,
            20
        );

        ctx.fillStyle =
            "#d8ad58";

        ctx.fillRect(
            centerX - 8,
            centerY - 21,
            16,
            5
        );

        ctx.fillStyle =
            "#4d321e";

        ctx.fillRect(
            centerX - 17,
            centerY + 2,
            34,
            5
        );

        ctx.fillStyle =
            "#e8cd82";

        ctx.fillRect(
            centerX - 2,
            centerY + 7,
            4,
            6
        );

        ctx.restore();
    }

    reset() {
        this.active = false;
        this.timer = 0;
    }
}