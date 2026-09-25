import {
    ObispoIncorrupto
} from "./ObispoIncorrupto.js";

import {
    BestiaSieteCampanas
} from "./BestiaSieteCampanas.js";

import {
    CultoLlaga
} from "./CultoLlaga.js";

import {
    MilagroNegro
} from "./MilagroNegro.js";

export class BossManager {
    constructor(
        bossSprites = {}
    ) {
        this.currentBoss =
            null;

        this.bossSprites =
            bossSprites;

        this.bossDefeated =
            false;


        /*
         * =====================================
         * BALANCE DE JEFES
         * =====================================
         */
        this.currentLevelNumber =
            0;

        this.bossProjectileProxy =
            null;

        this.bossProjectileSource =
            null;

        this.bossEmissionCounter =
            0;

        this.currentCanvas =
            null;


        /*
         * =====================================
         * MOVIMIENTO DEL JEFE
         * =====================================
         */
        this.bossMoveDirection =
            1;

        this.bossMoveSpeed =
            0;


        /*
         * Tiempo independiente de patrulla.
         * No depende del movimiento interno
         * de cada clase de jefe.
         */
        this.bossPatrolTime =
            0;
    }

    /*
     * =========================================
     * ÁREA JUGABLE
     * =========================================
     */
    getPlayfieldLeft(
        canvas
    ) {
        return Math.min(
            390,
            Math.max(
                320,
                canvas.width *
                    0.25
            )
        ) + 18;
    }


    /*
     * =========================================
     * CONFIGURACIÓN POR JEFE
     * =========================================
     *
     * El jefe final sigue siendo el más difícil,
     * pero el primero deja de llenar toda la
     * pantalla de proyectiles.
     */
    getBossBalanceConfig() {
        /*
         * El jefe 1 debe ser un combate real,
         * pero todavía legible.
         */
        if (
            this.currentLevelNumber === 2
        ) {
            return {
                maxProjectiles: 20,
                emissionModulo: 2,
                projectileSpeedScale: 0.64,
                moveSpeed: 1.05,
                maxHealth: 360
            };
        }


        if (
            this.currentLevelNumber === 4
        ) {
            return {
                maxProjectiles: 26,
                emissionModulo: 2,
                projectileSpeedScale: 0.70,
                moveSpeed: 1.15,
                maxHealth: 520
            };
        }


        if (
            this.currentLevelNumber === 6
        ) {
            return {
                maxProjectiles: 32,
                emissionModulo: 2,
                projectileSpeedScale: 0.76,
                moveSpeed: 1.25,
                maxHealth: 700
            };
        }


        return {
            maxProjectiles: 40,
            emissionModulo: 2,
            projectileSpeedScale: 0.82,
            moveSpeed: 1.35,
            maxHealth: 950
        };
    }


    /*
     * =========================================
     * VIDA DEL JEFE
     * =========================================
     */
    applyBossHealth() {
        const boss =
            this.currentBoss;


        if (
            !boss
        ) {
            return;
        }


        const config =
            this.getBossBalanceConfig();


        boss.maxHealth =
            config.maxHealth;


        boss.health =
            config.maxHealth;
    }


    /*
     * =========================================
     * PATRULLA HORIZONTAL
     * =========================================
     *
     * El jefe ya no permanece inmóvil.
     * Se desplaza de izquierda a derecha
     * dentro del área jugable y rebota en
     * los límites.
     */
    updateBossMovement(
        deltaTime,
        canvas
    ) {
        const boss =
            this.currentBoss;


        if (
            !boss ||
            !boss.active
        ) {
            return;
        }


        const config =
            this.getBossBalanceConfig();


        const playfieldLeft =
            this.getPlayfieldLeft(
                canvas
            );


        const entityWidth =
            boss.width ||
            100;


        const visualWidth =
            Math.max(
                entityWidth,
                boss.renderWidth ||
                    entityWidth
            );


        const halfVisual =
            visualWidth /
            2;


        const minCenter =
            playfieldLeft +
            halfVisual +
            26;


        const maxCenter =
            canvas.width -
            halfVisual -
            26;


        const playfieldCenter =
            (
                minCenter +
                maxCenter
            ) /
            2;


        /*
         * Amplitud real disponible.
         * Dejamos un poco de margen para
         * que nunca toque el borde.
         */
        const amplitude =
            Math.max(
                0,
                (
                    maxCenter -
                    minCenter
                ) /
                    2 -
                    12
            );


        /*
         * Movimiento independiente del boss.
         *
         * Esto evita que la propia clase del
         * jefe vuelva a escribir x y anule
         * nuestra patrulla.
         */
        this.bossPatrolTime +=
            deltaTime *
            config.moveSpeed;


        const centerX =
            playfieldCenter +
            Math.sin(
                this.bossPatrolTime
            ) *
                amplitude;


        boss.x =
            centerX -
            entityWidth /
                2;
    }


    /*
     * =========================================
     * PROXY DEL POOL DE PROYECTILES
     * =========================================
     *
     * No modifica EnemyProjectilePool.
     * Solo regula lo que puede generar el boss.
     */
    getBossProjectilePool(
        enemyProjectilePool
    ) {
        if (
            !enemyProjectilePool
        ) {
            return enemyProjectilePool;
        }


        if (
            this.bossProjectileSource ===
                enemyProjectilePool &&
            this.bossProjectileProxy
        ) {
            return this.bossProjectileProxy;
        }


        this.bossProjectileSource =
            enemyProjectilePool;


        const manager =
            this;


        this.bossProjectileProxy =
            new Proxy(
                enemyProjectilePool,
                {
                    get(
                        target,
                        property
                    ) {
                        if (
                            property ===
                            "getProjectile"
                        ) {
                            return (
                                x,
                                y,
                                velocityX,
                                velocityY,
                                ...rest
                            ) => {
                                const config =
                                    manager
                                        .getBossBalanceConfig();


                                if (
                                    manager.currentCanvas
                                ) {
                                    const playfieldLeft =
                                        manager
                                            .getPlayfieldLeft(
                                                manager.currentCanvas
                                            );


                                    if (
                                        x <
                                        playfieldLeft
                                    ) {
                                        return null;
                                    }
                                }


                                const activeCount =
                                    target
                                        .projectiles
                                        .reduce(
                                            (
                                                total,
                                                projectile
                                            ) =>
                                                total +
                                                (
                                                    projectile.active
                                                        ? 1
                                                        : 0
                                                ),
                                            0
                                        );


                                if (
                                    activeCount >=
                                    config
                                        .maxProjectiles
                                ) {
                                    return null;
                                }


                                /*
                                 * Reducimos densidad de cada
                                 * patrón manteniendo su forma.
                                 *
                                 * Ejemplo:
                                 * un radial de 8 termina
                                 * mostrando aproximadamente 4.
                                 */
                                manager
                                    .bossEmissionCounter++;


                                if (
                                    config
                                        .emissionModulo >
                                        1 &&
                                    manager
                                        .bossEmissionCounter %
                                        config
                                            .emissionModulo !==
                                        0
                                ) {
                                    return null;
                                }


                                const projectile =
                                    target
                                        .getProjectile(
                                            x,
                                            y,
                                            velocityX *
                                                config
                                                    .projectileSpeedScale,
                                            velocityY *
                                                config
                                                    .projectileSpeedScale,
                                            ...rest
                                        );


                                if (
                                    projectile
                                ) {
                                    projectile
                                        .visualType =
                                        projectile
                                            .visualType ||
                                        "hostia";
                                }


                                return projectile;
                            };
                        }


                        const value =
                            target[
                                property
                            ];


                        if (
                            typeof value ===
                            "function"
                        ) {
                            return value.bind(
                                target
                            );
                        }


                        return value;
                    }
                }
            );


        return this.bossProjectileProxy;
    }


    /*
     * =========================================
     * DELIMITAR JEFE AL ÁREA JUGABLE
     * =========================================
     */
    clampBossToPlayfield(
        canvas
    ) {
        const boss =
            this.currentBoss;


        if (
            !boss ||
            !boss.active
        ) {
            return;
        }


        const playfieldLeft =
            this.getPlayfieldLeft(
                canvas
            );


        const entityWidth =
            boss.width ||
            100;


        const visualWidth =
            Math.max(
                entityWidth,
                boss.renderWidth ||
                    entityWidth
            );


        const halfVisual =
            visualWidth /
            2;


        const minCenter =
            playfieldLeft +
            halfVisual +
            14;


        const maxCenter =
            canvas.width -
            halfVisual -
            14;


        let centerX =
            boss.x +
            entityWidth /
                2;


        centerX =
            Math.max(
                minCenter,
                Math.min(
                    centerX,
                    maxCenter
                )
            );


        boss.x =
            centerX -
            entityWidth /
                2;
    }


    /*
     * =========================================
     * ELIMINAR BALAS FUERA DEL ÁREA JUGABLE
     * =========================================
     */
    removeProjectilesOutsidePlayfield(
        enemyProjectilePool,
        canvas
    ) {
        if (
            !enemyProjectilePool ||
            !enemyProjectilePool
                .projectiles
        ) {
            return;
        }


        const playfieldLeft =
            this.getPlayfieldLeft(
                canvas
            );


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


            const projectileWidth =
                projectile.width ||
                10;


            if (
                projectile.x <
                    playfieldLeft ||
                projectile.x >
                    canvas.width
            ) {
                projectile
                    .deactivate();
            }
        }
    }


    shouldSpawnBoss(
        levelNumber
    ) {
        return (
            levelNumber === 2 ||
            levelNumber === 4 ||
            levelNumber === 6 ||
            levelNumber === 8
        );
    }

    createBoss(
        levelNumber,
        canvas
    ) {
        this.currentBoss = null;

        this.bossDefeated = false;

        this.currentLevelNumber =
            levelNumber;

        this.currentCanvas =
            canvas;

        this.bossEmissionCounter =
            0;


        /*
         * Área jugable actual:
         * deja libre la columna completa del HUD.
         */
        const playfieldLeft =
            Math.min(
                390,
                Math.max(
                    320,
                    canvas.width *
                        0.25
                )
            ) + 18;


        const playfieldCenterX =
            playfieldLeft +
            (
                canvas.width -
                playfieldLeft
            ) / 2;

        /*
         * NIVEL 2
         */
        if (
            levelNumber === 2
        ) {
            this.currentBoss =
                new ObispoIncorrupto(
                    playfieldCenterX -
                        50,
                    -140,
                    this.bossSprites
                        .obispo ||
                        null
                );
        }

        /*
         * NIVEL 4
         */
        if (
            levelNumber === 4
        ) {
            this.currentBoss =
                new BestiaSieteCampanas(
                    playfieldCenterX -
                        60,
                    -150,
                    this.bossSprites
                        .bestia ||
                        null
                );
        }

        /*
         * NIVEL 6
         */
        if (
            levelNumber === 6
        ) {
            this.currentBoss =
                new CultoLlaga(
                    playfieldCenterX -
                        65,
                    -150,
                    this.bossSprites
                        .culto ||
                        null
                );
        }

        /*
         * NIVEL 8
         */
        if (
            levelNumber === 8
        ) {
            this.currentBoss =
                new MilagroNegro(
                    playfieldCenterX -
                        75,
                    -180,
                    this.bossSprites
                        .milagro ||
                        null
                );
        }

        if (
            this.currentBoss
        ) {
            this.bossMoveDirection =
                1;


            this.bossPatrolTime =
                0;


            this.applyBossHealth();


            console.log(
                "JEFE INICIADO:",
                this.currentBoss
                    .name,
                "- VIDA:",
                this.currentBoss
                    .health
            );
        }

        return this.currentBoss;
    }

    hasActiveBoss() {
        return (
            this.currentBoss &&
            this.currentBoss.active
        );
    }

    isBossDefeated() {
        return this.bossDefeated;
    }

    update(
        deltaTime,
        canvas,
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        if (
            !this.currentBoss ||
            !this.currentBoss.active
        ) {
            return;
        }


        this.currentCanvas =
            canvas;


        const config =
            this.getBossBalanceConfig();


        const balancedPool =
            this.getBossProjectilePool(
                enemyProjectilePool
            );


        /*
         * El boss ejecuta su lógica con deltaTime
         * normal. La cantidad y velocidad de las
         * balas ya se regulan mediante el proxy,
         * así que no frenamos también su movimiento.
         */
        this.currentBoss.update(
            deltaTime,
            canvas,
            player,
            balancedPool,
            patternSystem
        );


        /*
         * Movimiento horizontal adicional.
         */
        this.updateBossMovement(
            deltaTime,
            canvas
        );


        /*
         * Mismo límite horizontal que los
         * enemigos normales.
         */
        this.clampBossToPlayfield(
            canvas
        );


        /*
         * Ninguna bala del jefe permanece
         * dentro de la columna del HUD.
         */
        this.removeProjectilesOutsidePlayfield(
            enemyProjectilePool,
            canvas
        );
    }

    checkProjectileCollisions(
        projectilePool,
        player,
        effectManager
    ) {
        const boss =
            this.currentBoss;

        if (
            !boss ||
            !boss.active
        ) {
            return;
        }

        for (
            const projectile
            of projectilePool.projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }


            /*
             * Un proyectil perforante solamente
             * puede dañar una vez al mismo boss.
             */
            if (
                projectile.piercing &&
                projectile.hitTargets &&
                projectile.hitTargets
                    .has(
                        boss
                    )
            ) {
                continue;
            }


            if (
                !boss.collidesWith(
                    projectile
                )
            ) {
                continue;
            }

            const impactX =
                projectile.x +
                projectile.width / 2;

            const impactY =
                projectile.y +
                projectile.height / 2;

            const damage =
                projectile.damage ||
                1;


            /*
             * PIERCING.
             */
            if (
                projectile.piercing
            ) {
                if (
                    !projectile
                        .hitTargets
                ) {
                    projectile
                        .hitTargets =
                        new Set();
                }


                projectile
                    .hitTargets
                    .add(
                        boss
                    );
            } else {
                projectile
                    .deactivate();
            }


            player.shotsHit++;

            boss.takeDamage(
                damage
            );

            if (
                effectManager
            ) {
                effectManager
                    .createImpact(
                        impactX,
                        impactY
                    );
            }

            if (
                boss.isDestroyed()
            ) {
                const destructionX =
                    boss.x +
                    boss.width / 2;

                const destructionY =
                    boss.y +
                    boss.height / 2;

                if (
                    effectManager
                ) {
                    effectManager
                        .createDestruction(
                            destructionX,
                            destructionY
                        );
                }

                boss.deactivate();

                this.bossDefeated =
                    true;

                player.enemiesDestroyed++;

                console.log(
                    "JEFE DERROTADO:",
                    boss.name
                );

                break;
            }
        }
    }

    render(ctx) {
        if (
            !this.currentBoss ||
            !this.currentBoss.active
        ) {
            return;
        }


        const canvas =
            ctx.canvas;


        const playfieldLeft =
            this.getPlayfieldLeft(
                canvas
            );


        /*
         * El sprite del jefe jamás se dibuja
         * encima del HUD, incluso si su sprite
         * visual es mayor que su hitbox.
         */
        ctx.save();


        ctx.beginPath();


        ctx.rect(
            playfieldLeft,
            0,
            canvas.width -
                playfieldLeft,
            canvas.height
        );


        ctx.clip();


        this.currentBoss.render(
            ctx
        );


        ctx.restore();
    }

    reset() {
        this.currentBoss =
            null;

        this.bossDefeated =
            false;

        this.currentLevelNumber =
            0;

        this.bossEmissionCounter =
            0;

        this.bossProjectileProxy =
            null;

        this.bossProjectileSource =
            null;

        this.currentCanvas =
            null;


        this.bossMoveDirection =
            1;

        this.bossMoveSpeed =
            0;

        this.bossPatrolTime =
            0;
    }
}



