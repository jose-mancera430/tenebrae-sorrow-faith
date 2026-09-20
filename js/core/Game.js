import { PatternSystem } from "./PatternSystem.js";
import { InputManager } from "../input/InputManager.js";
import { Player } from "./Player.js";
import { ProjectilePool } from "./ProjectilePool.js";
import { EnemyProjectilePool } from "./EnemyProjectilePool.js";
import { EnemyManager } from "./EnemyManager.js";
import { HUD } from "./HUD.js";
import { GameStateUI } from "./GameStateUI.js";
import { WaveManager } from "./WaveManager.js";

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.input = new InputManager();

        this.player = new Player(
            this.canvas,
            this.input
        );

        this.projectilePool = new ProjectilePool(100);

        this.enemyProjectilePool =
            new EnemyProjectilePool(100);

        this.enemyManager = new EnemyManager();
        
        this.patternSystem =
    new PatternSystem();

        this.hud = new HUD();

        this.gameStateUI = new GameStateUI();

        this.waveManager = new WaveManager(6);

        this.levelFinished = false;
        this.gameOver = false;

        this.enemyManager.createWave(
            this.waveManager.currentWave,
            this.canvas
        );

        this.tiempoAnterior = 0;
    }

    update(deltaTime) {
        if (
            (
                this.gameOver ||
                this.levelFinished
            ) &&
            this.input.isPressed("KeyR")
        ) {
            this.restartGame();
            return;
        }

        if (
            this.levelFinished ||
            this.gameOver
        ) {
            return;
        }

        this.player.update(deltaTime);

        this.handlePlayerShooting();

        this.projectilePool.update(
            deltaTime
        );

        this.enemyProjectilePool.update(
            deltaTime,
            this.canvas
        );

        this.enemyManager.update(
            deltaTime,
            this.canvas,
            this.player,
            this.enemyProjectilePool,
            this.patternSystem
        );

        this.enemyManager.checkProjectileCollisions(
            this.projectilePool,
            this.player
        );

        this.enemyManager.checkPlayerCollisions(
            this.player
        );
        this.enemyManager.checkEnemyProjectileCollisions(
    this.enemyProjectilePool,
    this.player
);

        this.checkGameOver();

        if (this.gameOver) {
            return;
        }

        this.checkWaveFinished();
    }

    handlePlayerShooting() {
        if (!this.player.wantsToShoot) {
            return;
        }

        const shootPosition =
            this.player.getShootPosition();

        this.projectilePool.getProjectile(
            shootPosition.x,
            shootPosition.y
        );
    }

    checkGameOver() {
        if (!this.player.isDestroyed()) {
            return;
        }

        this.gameOver = true;
    }

    checkWaveFinished() {
        if (this.waveManager.waveFinished) {
            return;
        }

        if (!this.enemyManager.hasActiveEnemies()) {
            this.waveManager.markWaveFinished();

            console.log(
                "OLEADA TERMINADA:",
                this.waveManager.currentWave
            );

            this.enemyManager.removeInactiveEnemies();

            if (this.waveManager.canAdvance()) {
                this.startNextWave();
            } else {
                this.finishLevel();
            }
        }
    }

    startNextWave() {
    const advanced =
        this.waveManager.advanceWave();

    if (!advanced) {
        return;
    }

    this.enemyProjectilePool.reset();

    this.enemyManager.createWave(
        this.waveManager.currentWave,
        this.canvas
    );

    console.log(
        "OLEADA INICIADA:",
        this.waveManager.currentWave
    );
}

    finishLevel() {
        if (this.levelFinished) {
            return;
        }

        this.levelFinished = true;

        console.log("NIVEL TERMINADO");
    }

    restartGame() {
        this.levelFinished = false;
        this.gameOver = false;

        this.player.reset();

        this.enemyManager.reset();

        this.projectilePool.reset();

        this.enemyProjectilePool.reset();

        this.waveManager.reset();

        this.enemyManager.createWave(
            this.waveManager.currentWave,
            this.canvas
        );
    }

    render() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.enemyManager.render(
            this.ctx
        );

        if (!this.player.isDestroyed()) {
            this.player.render(
                this.ctx
            );
        }

        this.projectilePool.render(
            this.ctx
        );

        this.enemyProjectilePool.render(
            this.ctx
        );

        this.hud.render(
            this.ctx,
            this.player,
            this.waveManager.currentWave,
            this.waveManager.maxWaves
        );

        if (this.levelFinished) {
            this.gameStateUI.renderLevelFinished(
                this.ctx,
                this.canvas
            );
        }

        if (this.gameOver) {
            this.gameStateUI.renderGameOver(
                this.ctx,
                this.canvas
            );
        }
    }

    gameLoop(tiempoActual) {
        const deltaTime =
            (tiempoActual - this.tiempoAnterior) / 1000;

        this.tiempoAnterior = tiempoActual;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(
            this.gameLoop.bind(this)
        );
    }

    start() {
        requestAnimationFrame(
            this.gameLoop.bind(this)
        );
    }
}