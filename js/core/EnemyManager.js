import { CircularEnemy } from "./CircularEnemy.js";
import { TurretEnemy } from "./TurretEnemy.js";
import { PursuerEnemy } from "./PursuerEnemy.js";
import { HeavyEnemy } from "./HeavyEnemy.js";
import { HunterEnemy } from "./HunterEnemy.js";
import { BasicEnemy } from "./BasicEnemy.js";
import { FormationManager } from "./FormationManager.js";

export class EnemyManager {
    constructor() {
        this.enemies = [];

        this.formationManager =
            new FormationManager();
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    createEnemy(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        const enemy = new BasicEnemy(
            x,
            y,
            width,
            height,
            maxHealth
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
        const enemy = new HunterEnemy(
            x,
            y,
            width,
            height,
            maxHealth
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
        const enemy = new HeavyEnemy(
            x,
            y,
            width,
            height,
            maxHealth
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
        const enemy = new PursuerEnemy(
            x,
            y,
            width,
            height,
            maxHealth
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
        const enemy = new TurretEnemy(
            x,
            y,
            width,
            height,
            maxHealth
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
        const enemy = new CircularEnemy(
            x,
            y,
            width,
            height,
            maxHealth
        );

        this.addEnemy(enemy);

        return enemy;
    }

    createWave(waveNumber, canvas) {
        if (waveNumber === 1) {
            this.createInitialWave(canvas);
        }

        if (waveNumber === 2) {
            this.createSecondWave(canvas);
        }

        if (waveNumber === 3) {
            this.createThirdWave(canvas);
        }

        if (waveNumber === 4) {
            this.createFourthWave(canvas);
        }

        if (waveNumber === 5) {
            this.createFifthWave(canvas);
        }

        if (waveNumber === 6) {
            this.createSixthWave(canvas);
        }
    }

    createInitialWave(canvas) {
        const formation =
            this.formationManager.createLineFormation();

        const enemy1 = this.createEnemy(
            0, 0, 50, 50, 3
        );

        const enemy2 = this.createEnemy(
            0, 0, 50, 50, 3
        );

        const enemy3 = this.createEnemy(
            0, 0, 50, 50, 3
        );

        formation.addEnemy(enemy1);
        formation.addEnemy(enemy2);
        formation.addEnemy(enemy3);

        formation.arrange(
            canvas.width * 0.25,
            80,
            120
        );
    }

    createSecondWave(canvas) {
        const formation =
            this.formationManager.createVFormation();

        const enemy1 = this.createHunterEnemy(
            0, 0, 50, 50, 3
        );

        const enemy2 = this.createHunterEnemy(
            0, 0, 50, 50, 3
        );

        const enemy3 = this.createHunterEnemy(
            0, 0, 50, 50, 3
        );

        const enemy4 = this.createHunterEnemy(
            0, 0, 50, 50, 3
        );

        const enemy5 = this.createHunterEnemy(
            0, 0, 50, 50, 3
        );

        formation.addEnemy(enemy1);
        formation.addEnemy(enemy2);
        formation.addEnemy(enemy3);
        formation.addEnemy(enemy4);
        formation.addEnemy(enemy5);

        formation.arrange(
            canvas.width / 2,
            220,
            100,
            60
        );
    }

    createThirdWave(canvas) {
        const formation =
            this.formationManager.createCircleFormation();

        const enemy1 = this.createTurretEnemy(
            0, 0, 50, 50, 3
        );

        const enemy2 = this.createTurretEnemy(
            0, 0, 50, 50, 3
        );

        const enemy3 = this.createTurretEnemy(
            0, 0, 50, 50, 3
        );

        const enemy4 = this.createTurretEnemy(
            0, 0, 50, 50, 3
        );

        const enemy5 = this.createTurretEnemy(
            0, 0, 50, 50, 3
        );

        const enemy6 = this.createTurretEnemy(
            0, 0, 50, 50, 3
        );

        formation.addEnemy(enemy1);
        formation.addEnemy(enemy2);
        formation.addEnemy(enemy3);
        formation.addEnemy(enemy4);
        formation.addEnemy(enemy5);
        formation.addEnemy(enemy6);

        formation.arrange(
            canvas.width / 2,
            200,
            120
        );
    }

    createFourthWave(canvas) {
        const formation =
            this.formationManager.createZigzagFormation();

        const enemy1 = this.createCircularEnemy(
            0, 0, 50, 50, 3
        );

        const enemy2 = this.createCircularEnemy(
            0, 0, 50, 50, 3
        );

        const enemy3 = this.createCircularEnemy(
            0, 0, 50, 50, 3
        );

        const enemy4 = this.createCircularEnemy(
            0, 0, 50, 50, 3
        );

        const enemy5 = this.createCircularEnemy(
            0, 0, 50, 50, 3
        );

        const enemy6 = this.createCircularEnemy(
            0, 0, 50, 50, 3
        );

        formation.addEnemy(enemy1);
        formation.addEnemy(enemy2);
        formation.addEnemy(enemy3);
        formation.addEnemy(enemy4);
        formation.addEnemy(enemy5);
        formation.addEnemy(enemy6);

        formation.arrange(
            canvas.width * 0.20,
            100,
            100,
            70
        );
    }

    createFifthWave(canvas) {
        const formation =
            this.formationManager.createColumnFormation();

        const enemy1 = this.createHeavyEnemy(
            0, 0, 50, 50, 6
        );

        const enemy2 = this.createHeavyEnemy(
            0, 0, 50, 50, 6
        );

        const enemy3 = this.createHeavyEnemy(
            0, 0, 50, 50, 6
        );

        const enemy4 = this.createHeavyEnemy(
            0, 0, 50, 50, 6
        );

        const enemy5 = this.createHeavyEnemy(
            0, 0, 50, 50, 6
        );

        formation.addEnemy(enemy1);
        formation.addEnemy(enemy2);
        formation.addEnemy(enemy3);
        formation.addEnemy(enemy4);
        formation.addEnemy(enemy5);

        formation.arrange(
            canvas.width / 2 - 25,
            60,
            70
        );
    }

    createSixthWave(canvas) {
        const formation =
            this.formationManager.createSwarmFormation();

        const enemy1 = this.createPursuerEnemy(
            0, 0, 50, 50, 3
        );

        const enemy2 = this.createPursuerEnemy(
            0, 0, 50, 50, 3
        );

        const enemy3 = this.createPursuerEnemy(
            0, 0, 50, 50, 3
        );

        const enemy4 = this.createPursuerEnemy(
            0, 0, 50, 50, 3
        );

        const enemy5 = this.createPursuerEnemy(
            0, 0, 50, 50, 3
        );

        const enemy6 = this.createPursuerEnemy(
            0, 0, 50, 50, 3
        );

        formation.addEnemy(enemy1);
        formation.addEnemy(enemy2);
        formation.addEnemy(enemy3);
        formation.addEnemy(enemy4);
        formation.addEnemy(enemy5);
        formation.addEnemy(enemy6);

        formation.arrange(
            canvas.width / 2,
            100,
            90,
            65
        );
    }

    hasActiveEnemies() {
        for (const enemy of this.enemies) {
            if (enemy.active) {
                return true;
            }
        }

        return false;
    }

    removeInactiveEnemies() {
        this.enemies =
            this.enemies.filter(
                enemy => enemy.active
            );
    }

    reset() {
        this.enemies = [];

        this.formationManager.reset();
    }

    update(
    deltaTime,
    canvas,
    player,
    enemyProjectilePool,
    patternSystem
) {
    this.formationManager.update(
        deltaTime
    );

    for (const enemy of this.enemies) {
        if (!enemy.active) {
            continue;
        }

        enemy.update(
            deltaTime,
            canvas,
            player,
            enemyProjectilePool,
            patternSystem
        );
    }
}

    checkProjectileCollisions(
        projectilePool,
        player
    ) {
        for (const enemy of this.enemies) {
            if (!enemy.active) {
                continue;
            }

            for (
                const projectile
                of projectilePool.projectiles
            ) {
                if (!projectile.active) {
                    continue;
                }

                if (
                    enemy.collidesWith(
                        projectile
                    )
                ) {
                    projectile.deactivate();

                    player.shotsHit++;

                    enemy.takeDamage(1);

                    if (
                        enemy.isDestroyed()
                    ) {
                        enemy.deactivate();

                        player.enemiesDestroyed++;
                    }
                }
            }
        }
    }

    checkPlayerCollisions(player) {
        for (const enemy of this.enemies) {
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
        if (!projectile.active) {
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
        for (const enemy of this.enemies) {
            if (!enemy.active) {
                continue;
            }

            enemy.render(ctx);
        }
    }
}