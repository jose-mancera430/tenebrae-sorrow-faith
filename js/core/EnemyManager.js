import { CircularEnemy } from "./CircularEnemy.js";
import { TurretEnemy } from "./TurretEnemy.js";
import { PursuerEnemy } from "./PursuerEnemy.js";
import { HeavyEnemy } from "./HeavyEnemy.js";
import { HunterEnemy } from "./HunterEnemy.js";
import { BasicEnemy } from "./BasicEnemy.js";
import { FormationManager } from "./FormationManager.js";
import { SeededRandom } from "./SeededRandom.js";

export class EnemyManager {
    constructor(
        seed = 1,
        enemySprites = {}
    ) {
        this.enemies = [];

        this.formationManager =
            new FormationManager();

        this.random =
            new SeededRandom(seed);

        this.enemySprites =
            enemySprites;


        /*
         * =====================================
         * FLUJO CONTINUO DE ENEMIGOS
         * =====================================
         *
         * Cada oleada conserva su formación
         * inicial, pero después siguen entrando
         * refuerzos de distintos tipos aunque
         * todavía existan enemigos en pantalla.
         */
        this.currentWaveNumber =
            1;

        this.streamActive =
            false;

        this.streamTarget =
            0;

        this.streamSpawned =
            0;

        this.spawnTimer =
            0;

        this.spawnInterval =
            1.45;

        this.maxActiveEnemies =
            10;

        this.lastSpawnType =
            null;
    }

    /*
     * =========================================
     * ÁREA DE COMBATE
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


    getPlayfieldCenterX(
        canvas
    ) {
        const left =
            this.getPlayfieldLeft(
                canvas
            );

        return (
            left +
            (
                canvas.width -
                left
            ) / 2
        );
    }


    setSeed(seed) {
        this.random.setSeed(seed);
    }

    getRandomInteger(
        min,
        max
    ) {
        return Math.floor(
            this.random.next() *
            (max - min + 1)
        ) + min;
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    applySprite(
        enemy,
        spriteName,
        renderWidth = 70,
        renderHeight = 90
    ) {
        const sprite =
            this.enemySprites[
                spriteName
            ];

        if (
            sprite &&
            typeof enemy.setSprite ===
                "function"
        ) {
            enemy.setSprite(
                sprite,
                renderWidth,
                renderHeight
            );
        }
    }

    createEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy =
            new BasicEnemy(
                x,
                y,
                width,
                height,
                maxHealth,
                this.enemySprites.basic
            );

        this.applySprite(
            enemy,
            "basic",
            70,
            90
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createHunterEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy =
            new HunterEnemy(
                x,
                y,
                width,
                height,
                maxHealth
            );

        this.applySprite(
            enemy,
            "hunter",
            70,
            90
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createHeavyEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy =
            new HeavyEnemy(
                x,
                y,
                width,
                height,
                maxHealth
            );

        this.applySprite(
            enemy,
            "heavy",
            85,
            105
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createPursuerEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy =
            new PursuerEnemy(
                x,
                y,
                width,
                height,
                maxHealth
            );

        this.applySprite(
            enemy,
            "pursuer",
            70,
            90
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createTurretEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy =
            new TurretEnemy(
                x,
                y,
                width,
                height,
                maxHealth
            );

        this.applySprite(
            enemy,
            "turret",
            75,
            95
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createCircularEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy =
            new CircularEnemy(
                x,
                y,
                width,
                height,
                maxHealth
            );

        this.applySprite(
            enemy,
            "circular",
            70,
            90
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createWave(
        waveNumber,
        canvas
    ) {
        /*
         * Reiniciar solamente el control del
         * flujo de esta oleada.
         */
        this.currentWaveNumber =
            waveNumber;

        this.streamActive =
            true;

        this.spawnTimer =
            1.15;

        this.lastSpawnType =
            null;


        /*
         * Cantidad TOTAL de enemigos que puede
         * presentar cada oleada.
         *
         * La formación inicial cuenta dentro
         * de este total.
         */
        /*
         * Presión progresiva, pero sin convertir
         * cada oleada en una batalla interminable.
         */
        const targets = {
            1: 8,
            2: 9,
            3: 10,
            4: 11,
            5: 12,
            6: 14
        };


        this.streamTarget =
            targets[
                waveNumber
            ] ||
            18;


        /*
         * Máximo simultáneo.
         *
         * Con esto pueden entrar refuerzos
         * aunque todavía queden enemigos vivos,
         * pero evitamos saturar la pantalla.
         */
        this.maxActiveEnemies =
            Math.min(
                5 +
                    Math.ceil(
                        waveNumber / 2
                    ),
                8
            );


        /*
         * El ritmo aumenta ligeramente
         * conforme avanza la oleada.
         */
        this.spawnInterval =
            Math.max(
                1.70,
                2.20 -
                    (
                        waveNumber -
                        1
                    ) *
                        0.10
            );


        /*
         * FORMACIÓN INICIAL.
         */
        if (
            waveNumber === 1
        ) {
            this.createInitialWave(
                canvas
            );
        }


        if (
            waveNumber === 2
        ) {
            this.createSecondWave(
                canvas
            );
        }


        if (
            waveNumber === 3
        ) {
            this.createThirdWave(
                canvas
            );
        }


        if (
            waveNumber === 4
        ) {
            this.createFourthWave(
                canvas
            );
        }


        if (
            waveNumber === 5
        ) {
            this.createFifthWave(
                canvas
            );
        }


        if (
            waveNumber === 6
        ) {
            this.createSixthWave(
                canvas
            );
        }


        /*
         * Los enemigos de la formación inicial
         * ya cuentan para el total de la oleada.
         */
        this.streamSpawned =
            this.getActiveEnemyCount();


        console.log(
            "FLUJO OLEADA:",
            waveNumber,
            "- objetivo:",
            this.streamTarget,
            "- simultáneos:",
            this.maxActiveEnemies
        );
    }


    createInitialWave(canvas) {
        const formation =
            this.formationManager
                .createLineFormation();

        const enemyCount =
            this.getRandomInteger(
                3,
                5
            );

        console.log(
            "OLEADA 1 - enemigos:",
            enemyCount
        );

        for (
            let i = 0;
            i < enemyCount;
            i++
        ) {
            const enemy =
                this.createEnemy(
                    0,
                    0,
                    50,
                    50,
                    3
                );

            formation.addEnemy(
                enemy
            );
        }

        formation.arrange(
            this.getPlayfieldCenterX(
                canvas
            ),
            80,
            120
        );
    }

    createSecondWave(canvas) {
        const formation =
            this.formationManager
                .createVFormation();

        const enemyCount =
            this.getRandomInteger(
                4,
                6
            );

        console.log(
            "OLEADA 2 - enemigos:",
            enemyCount
        );

        for (
            let i = 0;
            i < enemyCount;
            i++
        ) {
            const enemy =
                this.createHunterEnemy(
                    0,
                    0,
                    50,
                    50,
                    3
                );

            formation.addEnemy(
                enemy
            );
        }

        formation.arrange(
            this.getPlayfieldCenterX(
                canvas
            ),
            220,
            100,
            60
        );
    }

    createThirdWave(canvas) {
        const formation =
            this.formationManager
                .createCircleFormation();

        const enemyCount =
            this.getRandomInteger(
                5,
                7
            );

        console.log(
            "OLEADA 3 - enemigos:",
            enemyCount
        );

        for (
            let i = 0;
            i < enemyCount;
            i++
        ) {
            const enemy =
                this.createTurretEnemy(
                    0,
                    0,
                    50,
                    50,
                    3
                );

            formation.addEnemy(
                enemy
            );
        }

        formation.arrange(
            this.getPlayfieldCenterX(
                canvas
            ),
            200,
            120
        );
    }

    createFourthWave(canvas) {
        const formation =
            this.formationManager
                .createZigzagFormation();

        const enemyCount =
            this.getRandomInteger(
                5,
                7
            );

        console.log(
            "OLEADA 4 - enemigos:",
            enemyCount
        );

        for (
            let i = 0;
            i < enemyCount;
            i++
        ) {
            const enemy =
                this.createCircularEnemy(
                    0,
                    0,
                    50,
                    50,
                    3
                );

            formation.addEnemy(
                enemy
            );
        }

        formation.arrange(
            this.getPlayfieldCenterX(
                canvas
            ),
            100,
            100,
            70
        );
    }

    createFifthWave(canvas) {
        const formation =
            this.formationManager
                .createColumnFormation();

        const enemyCount =
            this.getRandomInteger(
                4,
                6
            );

        console.log(
            "OLEADA 5 - enemigos:",
            enemyCount
        );

        for (
            let i = 0;
            i < enemyCount;
            i++
        ) {
            const enemy =
                this.createHeavyEnemy(
                    0,
                    0,
                    50,
                    50,
                    6
                );

            formation.addEnemy(
                enemy
            );
        }

        formation.arrange(
            this.getPlayfieldCenterX(
                canvas
            ) - 25,
            60,
            70
        );
    }

    createSixthWave(canvas) {
        const formation =
            this.formationManager
                .createSwarmFormation();

        const enemyCount =
            this.getRandomInteger(
                5,
                7
            );

        console.log(
            "OLEADA 6 - enemigos:",
            enemyCount
        );

        for (
            let i = 0;
            i < enemyCount;
            i++
        ) {
            const enemy =
                this.createPursuerEnemy(
                    0,
                    0,
                    50,
                    50,
                    3
                );

            formation.addEnemy(
                enemy
            );
        }

        formation.arrange(
            this.getPlayfieldCenterX(
                canvas
            ),
            100,
            90,
            65
        );
    }

    /*
     * =========================================
     * ENEMIGOS ACTIVOS
     * =========================================
     */
    getActiveEnemyCount() {
        let count =
            0;


        for (
            const enemy
            of this.enemies
        ) {
            if (
                enemy.active
            ) {
                count++;
            }
        }


        return count;
    }


    /*
     * =========================================
     * TIPOS DISPONIBLES SEGÚN OLEADA
     * =========================================
     */
    getSpawnTypesForWave() {
        const wave =
            this.currentWaveNumber;


        if (
            wave === 1
        ) {
            return [
                "basic"
            ];
        }


        if (
            wave === 2
        ) {
            return [
                "basic",
                "hunter"
            ];
        }


        if (
            wave === 3
        ) {
            return [
                "basic",
                "hunter",
                "turret"
            ];
        }


        if (
            wave === 4
        ) {
            return [
                "basic",
                "hunter",
                "turret",
                "circular"
            ];
        }


        if (
            wave === 5
        ) {
            return [
                "heavy",
                "hunter",
                "circular",
                "pursuer"
            ];
        }


        return [
            "basic",
            "hunter",
            "turret",
            "circular",
            "heavy",
            "pursuer"
        ];
    }


    /*
     * =========================================
     * ELEGIR TIPO SIN REPETIR SIEMPRE
     * =========================================
     */
    chooseReinforcementType() {
        const available =
            this.getSpawnTypesForWave();


        if (
            available.length === 0
        ) {
            return "basic";
        }


        let candidates =
            available;


        if (
            available.length > 1 &&
            this.lastSpawnType
        ) {
            candidates =
                available.filter(
                    type =>
                        type !==
                        this.lastSpawnType
                );
        }


        const index =
            this.getRandomInteger(
                0,
                candidates.length -
                    1
            );


        const selected =
            candidates[
                index
            ];


        this.lastSpawnType =
            selected;


        return selected;
    }


    /*
     * =========================================
     * CREAR REFUERZO INDIVIDUAL
     * =========================================
     */
    spawnReinforcement(
        canvas
    ) {
        if (
            !canvas
        ) {
            return null;
        }


        const type =
            this.chooseReinforcementType();


        const margin =
            55;

        const playfieldLeft =
            this.getPlayfieldLeft(
                canvas
            );

        const minX =
            playfieldLeft +
            margin;

        const maxX =
            Math.max(
                minX,
                canvas.width -
                    margin -
                    50
            );

        const x =
            this.getRandomInteger(
                minX,
                maxX
            );

        const y =
            this.getRandomInteger(
                -150,
                -70
            );


        let enemy =
            null;


        if (
            type === "basic"
        ) {
            enemy =
                this.createEnemy(
                    x,
                    y,
                    50,
                    50,
                    3
                );
        }


        if (
            type === "hunter"
        ) {
            enemy =
                this.createHunterEnemy(
                    x,
                    y,
                    50,
                    50,
                    3
                );
        }


        if (
            type === "turret"
        ) {
            enemy =
                this.createTurretEnemy(
                    x,
                    y,
                    50,
                    50,
                    3
                );


            /*
             * Cada torreta nueva se detiene
             * en una altura ligeramente distinta.
             */
            enemy.stopY =
                this.getRandomInteger(
                    110,
                    245
                );
        }


        if (
            type === "circular"
        ) {
            enemy =
                this.createCircularEnemy(
                    x,
                    y,
                    50,
                    50,
                    3
                );
        }


        if (
            type === "heavy"
        ) {
            enemy =
                this.createHeavyEnemy(
                    x,
                    y,
                    50,
                    50,
                    6
                );
        }


        if (
            type === "pursuer"
        ) {
            enemy =
                this.createPursuerEnemy(
                    x,
                    y,
                    50,
                    50,
                    3
                );
        }


        if (
            enemy
        ) {
            /*
             * Es un refuerzo individual,
             * no pertenece a la formación
             * inicial.
             */
            enemy.inFormation =
                false;


            /*
             * Temporizador de disparo propio
             * gestionado por EnemyManager.
             */
            enemy.managerFireTimer =
                1.35 +
                this.random.next() *
                    1.10;


            this.streamSpawned++;
        }


        return enemy;
    }


    /*
     * =========================================
     * FLUJO CONTINUO
     * =========================================
     */
    updateContinuousSpawning(
        deltaTime,
        canvas
    ) {
        if (
            !this.streamActive
        ) {
            return;
        }


        /*
         * Ya se generó todo lo planeado
         * para esta oleada.
         */
        if (
            this.streamSpawned >=
            this.streamTarget
        ) {
            this.streamActive =
                false;

            return;
        }


        this.spawnTimer -=
            deltaTime;


        if (
            this.spawnTimer >
            0
        ) {
            return;
        }


        const activeCount =
            this.getActiveEnemyCount();


        if (
            activeCount >=
            this.maxActiveEnemies
        ) {
            /*
             * La pantalla ya tiene suficiente
             * presión. Volvemos a comprobar
             * muy pronto.
             */
            this.spawnTimer =
                0.55;

            return;
        }


        /*
         * Entran 1–3 enemigos en cada pulso,
         * dependiendo del hueco disponible.
         */
        const freeSlots =
            this.maxActiveEnemies -
            activeCount;

        const remaining =
            this.streamTarget -
            this.streamSpawned;

        const wantedGroup =
            this.getRandomInteger(
                1,
                2
            );

        const amount =
            Math.min(
                wantedGroup,
                freeSlots,
                remaining
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {
            this.spawnReinforcement(
                canvas
            );
        }


        this.spawnTimer =
            this.spawnInterval;
    }


    /*
     * =========================================
     * DISPARO SUPLEMENTARIO
     * =========================================
     *
     * TurretEnemy conserva su sistema propio.
     *
     * Los demás tipos reciben patrones
     * ligeros desde el manager para que no
     * existan oleadas enteras sin disparos.
     */
    updateEnemyFire(
        enemy,
        deltaTime,
        player,
        enemyProjectilePool
    ) {
        if (
            !enemy ||
            !enemy.active ||
            !player ||
            !enemyProjectilePool
        ) {
            return;
        }


        /*
         * TurretEnemy ya dispara por su cuenta.
         */
        if (
            enemy.type ===
            "turret"
        ) {
            return;
        }


        /*
         * No disparar mientras todavía está
         * completamente fuera de pantalla.
         */
        if (
            enemy.y +
                enemy.height <
            10
        ) {
            return;
        }


        if (
            typeof enemy.managerFireTimer !==
            "number"
        ) {
            enemy.managerFireTimer =
                1.40 +
                this.random.next() *
                    1.10;
        }


        enemy.managerFireTimer -=
            deltaTime;


        if (
            enemy.managerFireTimer >
            0
        ) {
            return;
        }


        const centerX =
            enemy.x +
            enemy.width / 2;

        const centerY =
            enemy.y +
            enemy.height / 2;

        const playerX =
            player.x +
            player.width / 2;

        const playerY =
            player.y +
            player.height / 2;

        const dx =
            playerX -
            centerX;

        const dy =
            playerY -
            centerY;

        const distance =
            Math.max(
                1,
                Math.hypot(
                    dx,
                    dy
                )
            );

        const baseAngle =
            Math.atan2(
                dy,
                dx
            );


        const fireOne =
            (
                angle,
                speed,
                visualType =
                    "hostia"
            ) => {
                const projectile =
                    enemyProjectilePool
                        .getProjectile(
                            centerX - 5,
                            centerY,
                            Math.cos(
                                angle
                            ) *
                                speed,
                            Math.sin(
                                angle
                            ) *
                                speed
                        );


                if (
                    projectile
                ) {
                    projectile.visualType =
                        visualType;
                }


                return projectile;
            };


        /*
         * BASIC:
         * tiro dirigido simple.
         */
        if (
            enemy.type ===
                "basic" ||
            !enemy.type
        ) {
            const speed =
                145;

            fireOne(
                baseAngle,
                speed,
                "cera"
            );

            enemy.managerFireTimer =
                3.20 +
                this.random.next() *
                    0.65;

            return;
        }


        /*
         * HUNTER:
         * abanico de 3 balas.
         */
        if (
            enemy.type ===
            "hunter"
        ) {
            const spread =
                0.18;

            const speed =
                165;


            fireOne(
                baseAngle -
                    spread,
                speed,
                "espina"
            );

            fireOne(
                baseAngle,
                speed,
                "espina"
            );

            fireOne(
                baseAngle +
                    spread,
                speed,
                "espina"
            );


            enemy.managerFireTimer =
                2.70 +
                this.random.next() *
                    0.55;

            return;
        }


        /*
         * HEAVY:
         * abanico lento de 5.
         */
        if (
            enemy.type ===
            "heavy"
        ) {
            const speed =
                140;

            const spread =
                0.19;


            for (
                let i = -1;
                i <= 1;
                i++
            ) {
                fireOne(
                    baseAngle +
                        i *
                            spread,
                    speed,
                    "campana"
                );
            }


            enemy.managerFireTimer =
                3.35 +
                this.random.next() *
                    0.65;

            return;
        }


        /*
         * PURSUER:
         * tiro directo más frecuente.
         */
        if (
            enemy.type ===
            "pursuer"
        ) {
            const speed =
                175;


            fireOne(
                Math.atan2(
                    dy / distance,
                    dx / distance
                ),
                speed,
                "mercurio"
            );


            enemy.managerFireTimer =
                2.25 +
                this.random.next() *
                    0.55;

            return;
        }


        /*
         * CIRCULAR:
         * anillo de 6 proyectiles.
         */
        if (
            enemy.type ===
            "circular"
        ) {
            const bullets =
                4;

            const speed =
                130;

            const rotation =
                (
                    enemy.managerRotation ||
                    0
                );


            for (
                let i = 0;
                i < bullets;
                i++
            ) {
                const angle =
                    rotation +
                    (
                        Math.PI *
                        2 *
                        i
                    ) /
                        bullets;


                fireOne(
                    angle,
                    speed,
                    "hostia"
                );
            }


            enemy.managerRotation =
                rotation +
                0.22;


            enemy.managerFireTimer =
                3.00 +
                this.random.next() *
                    0.70;

            return;
        }


        /*
         * Fallback para cualquier tipo
         * futuro.
         */
        fireOne(
            baseAngle,
            145
        );

        enemy.managerFireTimer =
            3.2;
    }


    hasActiveEnemies() {
        /*
         * Mientras queden refuerzos por generar,
         * la oleada sigue viva aunque el jugador
         * haya limpiado momentáneamente la pantalla.
         */
        if (
            this.streamActive ||
            this.streamSpawned <
                this.streamTarget
        ) {
            return true;
        }


        for (
            const enemy
            of this.enemies
        ) {
            if (
                enemy.active
            ) {
                return true;
            }
        }


        return false;
    }

    removeInactiveEnemies() {
        this.enemies =
            this.enemies.filter(
                enemy =>
                    enemy.active
            );
    }

    reset() {
        this.enemies = [];


        this.formationManager
            .reset();


        this.currentWaveNumber =
            1;

        this.streamActive =
            false;

        this.streamTarget =
            0;

        this.streamSpawned =
            0;

        this.spawnTimer =
            0;

        this.lastSpawnType =
            null;
    }

    update(
        deltaTime,
        canvas,
        player,
        enemyProjectilePool,
        patternSystem
    ) {
        /*
         * Las formaciones iniciales siguen
         * funcionando.
         */
        this.formationManager
            .update(
                deltaTime
            );


        /*
         * Refuerzos continuos.
         */
        this.updateContinuousSpawning(
            deltaTime,
            canvas
        );


        /*
         * Actualizar comportamiento normal
         * de cada clase y luego aplicar
         * disparo suplementario.
         */
        for (
            const enemy
            of this.enemies
        ) {
            if (
                !enemy.active
            ) {
                continue;
            }


            enemy.update(
                deltaTime,
                canvas,
                player,
                enemyProjectilePool,
                patternSystem
            );


            /*
             * Ningún enemigo puede entrar en
             * la columna reservada al HUD.
             */
            if (
                enemy.active
            ) {
                const playfieldLeft =
                    this.getPlayfieldLeft(
                        canvas
                    );

                enemy.x =
                    Math.max(
                        playfieldLeft + 8,
                        Math.min(
                            enemy.x,
                            canvas.width -
                                enemy.width -
                                8
                        )
                    );
            }


            if (
                enemy.active
            ) {
                this.updateEnemyFire(
                    enemy,
                    deltaTime,
                    player,
                    enemyProjectilePool
                );
            }
        }
    }

    checkProjectileCollisions(
        projectilePool,
        player,
        effectManager
    ) {
        for (
            const enemy
            of this.enemies
        ) {
            if (!enemy.active) {
                continue;
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
                 * Si el proyectil perforante
                 * ya golpeó a este enemigo,
                 * no volver a dañarlo.
                 */
                if (
                    projectile.piercing &&
                    projectile.hitTargets &&
                    projectile.hitTargets
                        .has(
                            enemy
                        )
                ) {
                    continue;
                }


                if (
                    enemy.collidesWith(
                        projectile
                    )
                ) {
                    const impactX =
                        projectile.x +
                        projectile.width / 2;

                    const impactY =
                        projectile.y +
                        projectile.height / 2;


                    /*
                     * PIERCING:
                     *
                     * - registra este enemigo
                     * - NO desactiva la bala
                     *
                     * NORMAL:
                     *
                     * - desaparece al impactar
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
                                enemy
                            );
                    } else {
                        projectile
                            .deactivate();
                    }


                    player.shotsHit++;


                    enemy.takeDamage(
                        projectile.damage ||
                        1
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
                        enemy.isDestroyed()
                    ) {
                        const destructionX =
                            enemy.x +
                            enemy.width / 2;

                        const destructionY =
                            enemy.y +
                            enemy.height / 2;


                        if (
                            effectManager
                        ) {
                            effectManager
                                .createDestruction(
                                    destructionX,
                                    destructionY
                                );
                        }


                        enemy.deactivate();


                        player
                            .enemiesDestroyed++;
                    }
                }
            }
        }
    }


    checkPlayerCollisions(
        player
    ) {
        for (
            const enemy
            of this.enemies
        ) {
            if (!enemy.active) {
                continue;
            }

            if (
                enemy.collidesWith(
                    player
                )
            ) {
                player.takeDamage(1);

                enemy.deactivate();
            }
        }
    }

    checkEnemyProjectileCollisions(
        enemyProjectilePool,
        player
    ) {
        for (
            const projectile
            of enemyProjectilePool.projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }

            if (
                projectile.collidesWith(
                    player
                )
            ) {
                projectile.deactivate();

                player.takeDamage(1);
            }
        }
    }

    render(ctx) {
        for (
            const enemy
            of this.enemies
        ) {
            if (!enemy.active) {
                continue;
            }

            enemy.render(ctx);
        }
    }
}