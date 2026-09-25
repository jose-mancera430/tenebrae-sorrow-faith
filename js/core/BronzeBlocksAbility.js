export class BronzeBlocksAbility {
    constructor() {
        this.active = false;

        this.duration = 6;
        this.timer = 0;

        this.cost = 100;

        this.angle = 0;

        this.angularSpeed = 2.8;

        this.orbitRadius = 58;

        this.blockSize = 20;

        this.blockCount = 3;
    }

    activate(fervorManager) {
        if (!fervorManager) {
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

        this.angle = 0;

        console.log(
            "BLOQUES DE BRONCE ACTIVADOS"
        );

        return true;
    }

    update(
        deltaTime,
        player,
        enemyProjectilePool
    ) {
        if (!this.active) {
            return;
        }

        this.timer -=
            deltaTime;

        this.angle +=
            this.angularSpeed *
            deltaTime;

        if (
            player &&
            enemyProjectilePool
        ) {
            this.destroyProjectiles(
                player,
                enemyProjectilePool
            );
        }

        if (
            this.timer <= 0
        ) {
            this.active = false;
            this.timer = 0;

            console.log(
                "BLOQUES DE BRONCE TERMINADOS"
            );
        }
    }

    getBlockPositions(player) {
        const positions = [];

        if (!player) {
            return positions;
        }

        const centerX =
            player.x +
            player.width / 2;

        const centerY =
            player.y +
            player.height / 2;

        for (
            let i = 0;
            i < this.blockCount;
            i++
        ) {
            const angle =
                this.angle +
                (
                    Math.PI *
                    2 *
                    i
                ) /
                    this.blockCount;

            positions.push({
                x:
                    centerX +
                    Math.cos(angle) *
                        this.orbitRadius -
                    this.blockSize / 2,

                y:
                    centerY +
                    Math.sin(angle) *
                        this.orbitRadius -
                    this.blockSize / 2
            });
        }

        return positions;
    }

    destroyProjectiles(
        player,
        enemyProjectilePool
    ) {
        const blocks =
            this.getBlockPositions(
                player
            );

        for (
            const projectile
            of enemyProjectilePool.projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }

            for (
                const block
                of blocks
            ) {
                const collision =
                    projectile.x <
                        block.x +
                            this.blockSize &&

                    projectile.x +
                            projectile.width >
                        block.x &&

                    projectile.y <
                        block.y +
                            this.blockSize &&

                    projectile.y +
                            projectile.height >
                        block.y;

                if (collision) {
                    projectile.deactivate();
                    break;
                }
            }
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

        const blocks =
            this.getBlockPositions(
                player
            );

        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        for (
            const block
            of blocks
        ) {
            const x =
                Math.round(
                    block.x
                );

            const y =
                Math.round(
                    block.y
                );

            /*
             * SOMBRA
             */
            ctx.fillStyle =
                "#24160f";

            ctx.fillRect(
                x,
                y,
                20,
                20
            );

            /*
             * BRONCE EXTERIOR
             */
            ctx.fillStyle =
                "#79532b";

            ctx.fillRect(
                x + 2,
                y + 2,
                16,
                16
            );

            /*
             * INTERIOR
             */
            ctx.fillStyle =
                "#3b2920";

            ctx.fillRect(
                x + 5,
                y + 5,
                10,
                10
            );

            /*
             * CRUZ CENTRAL
             */
            ctx.fillStyle =
                "#d0a253";

            ctx.fillRect(
                x + 9,
                y + 4,
                3,
                12
            );

            ctx.fillRect(
                x + 5,
                y + 8,
                11,
                3
            );

            /*
             * REMACHE
             */
            ctx.fillStyle =
                "#ead18b";

            ctx.fillRect(
                x + 9,
                y + 9,
                3,
                3
            );
        }

        ctx.restore();
    }

    reset() {
        this.active = false;
        this.timer = 0;
        this.angle = 0;
    }
}