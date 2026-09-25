export class RelicarioSpecial {
    constructor() {
        this.active = false;

        this.duration = 1.2;

        this.timer = 0;

        this.maxRadius = 190;

        this.keyWasPressed = false;
    }

    update(
        deltaTime,
        enemyProjectilePool = null
    ) {
        if (!this.active) {
            return;
        }

        /*
         * Mientras el Botafumeiro
         * esté activo, purgamos
         * continuamente cualquier
         * proyectil enemigo nuevo.
         */
        if (
            enemyProjectilePool
        ) {
            this.clearEnemyProjectiles(
                enemyProjectilePool,
                false
            );
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

    tryActivate(
        keyPressed,
        fervorManager,
        enemyProjectilePool
    ) {
        if (
            keyPressed &&
            !this.keyWasPressed
        ) {
            this.activate(
                fervorManager,
                enemyProjectilePool
            );
        }

        this.keyWasPressed =
            keyPressed;
    }

    activate(
        fervorManager,
        enemyProjectilePool
    ) {
        if (
            !fervorManager ||
            !enemyProjectilePool
        ) {
            return false;
        }

        /*
         * Consumir Fervor.
         */
        const used =
            fervorManager
                .useSpecial();

        if (!used) {
            return false;
        }

        /*
         * Limpieza inicial.
         */
        const destroyedCount =
            this.clearEnemyProjectiles(
                enemyProjectilePool,
                true
            );

        /*
         * Activar efecto.
         */
        this.active = true;

        this.timer =
            this.duration;

        console.log(
            "BOTAFUMEIRO INQUISITORIAL ACTIVADO"
        );

        console.log(
            "PROYECTILES PURGADOS INICIALMENTE:",
            destroyedCount
        );

        return true;
    }

    clearEnemyProjectiles(
        enemyProjectilePool,
        countDestroyed = false
    ) {
        let destroyedCount = 0;

        for (
            const projectile
            of enemyProjectilePool.projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }

            projectile.deactivate();

            destroyedCount++;
        }

        /*
         * Solo devolvemos el conteo.
         * No imprimimos cada frame
         * para evitar llenar la consola.
         */
        if (
            countDestroyed
        ) {
            return destroyedCount;
        }

        return 0;
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

        const radius =
            Math.floor(
                28 +
                (
                    this.maxRadius -
                    28
                ) *
                progress
            );

        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        this.renderChains(
            ctx,
            centerX,
            centerY,
            progress
        );

        this.renderCenser(
            ctx,
            centerX,
            centerY,
            progress
        );

        this.renderSacredSmoke(
            ctx,
            centerX,
            centerY,
            radius,
            progress
        );

        this.renderPurgeWave(
            ctx,
            centerX,
            centerY,
            radius
        );

        ctx.restore();
    }

    renderChains(
        ctx,
        centerX,
        centerY,
        progress
    ) {
        const swing =
            Math.round(
                Math.sin(
                    progress *
                    Math.PI *
                    4
                ) *
                24
            );

        ctx.fillStyle =
            "#6c5536";

        for (
            let i = 0;
            i < 6;
            i++
        ) {
            ctx.fillRect(
                centerX -
                    12 +
                    Math.round(
                        swing *
                        (
                            i / 6
                        )
                    ),
                centerY +
                    8 +
                    i * 6,
                3,
                4
            );
        }

        for (
            let i = 0;
            i < 6;
            i++
        ) {
            ctx.fillRect(
                centerX +
                    9 +
                    Math.round(
                        swing *
                        (
                            i / 6
                        )
                    ),
                centerY +
                    8 +
                    i * 6,
                3,
                4
            );
        }
    }

    renderCenser(
        ctx,
        centerX,
        centerY,
        progress
    ) {
        const swing =
            Math.round(
                Math.sin(
                    progress *
                    Math.PI *
                    4
                ) *
                24
            );

        const x =
            centerX +
            swing;

        const y =
            centerY +
            46;

        ctx.fillStyle =
            "#2a1b16";

        ctx.fillRect(
            x - 10,
            y - 4,
            20,
            16
        );

        ctx.fillStyle =
            "#7d5930";

        ctx.fillRect(
            x - 8,
            y - 2,
            16,
            12
        );

        ctx.fillStyle =
            "#b18443";

        ctx.fillRect(
            x - 5,
            y - 6,
            10,
            5
        );

        ctx.fillStyle =
            "#d6ad58";

        ctx.fillRect(
            x - 2,
            y,
            4,
            6
        );

        ctx.fillStyle =
            "#4c3421";

        ctx.fillRect(
            x - 6,
            y + 10,
            12,
            4
        );
    }

    renderSacredSmoke(
        ctx,
        centerX,
        centerY,
        radius,
        progress
    ) {
        const smokeCount = 18;

        for (
            let i = 0;
            i < smokeCount;
            i++
        ) {
            const angle =
                (
                    Math.PI *
                    2 *
                    i
                ) /
                smokeCount;

            const distance =
                radius *
                (
                    0.25 +
                    (
                        (
                            i % 4
                        ) /
                        4
                    ) *
                    0.5
                );

            const offset =
                Math.sin(
                    progress *
                    8 +
                    i
                ) *
                8;

            const x =
                Math.round(
                    centerX +
                    Math.cos(angle) *
                    distance +
                    offset
                );

            const y =
                Math.round(
                    centerY +
                    Math.sin(angle) *
                    distance
                );

            if (
                i % 3 === 0
            ) {
                ctx.fillStyle =
                    "#8c8172";
            } else {
                ctx.fillStyle =
                    "#5f5a52";
            }

            const size =
                4 +
                (
                    i % 3
                ) *
                2;

            ctx.fillRect(
                x,
                y,
                size,
                size
            );

            ctx.fillStyle =
                "#3f3b38";

            ctx.fillRect(
                x +
                    size,
                y - 3,
                Math.max(
                    2,
                    size - 2
                ),
                Math.max(
                    2,
                    size - 3
                )
            );
        }
    }

    renderPurgeWave(
        ctx,
        centerX,
        centerY,
        radius
    ) {
        const segments = 40;

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
                i % 4 === 0
            ) {
                ctx.fillStyle =
                    "#e0c47a";
            } else if (
                i % 2 === 0
            ) {
                ctx.fillStyle =
                    "#a47d3d";
            } else {
                ctx.fillStyle =
                    "#5e4327";
            }

            ctx.fillRect(
                x - 3,
                y - 3,
                6,
                6
            );
        }

        ctx.fillStyle =
            "#b58a45";

        ctx.fillRect(
            centerX - 2,
            centerY - 14,
            4,
            28
        );

        ctx.fillRect(
            centerX - 10,
            centerY - 2,
            20,
            4
        );
    }

    reset() {
        this.active = false;

        this.timer = 0;

        this.keyWasPressed =
            false;
    }
}