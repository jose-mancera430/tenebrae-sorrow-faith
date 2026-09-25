import { AshImpactAbility } from "./AshImpactAbility.js";
import { BronzeBlocksAbility } from "./BronzeBlocksAbility.js";
import { BellRumbleAbility } from "./BellRumbleAbility.js";
import { RelicarioAbilityController } from "./RelicarioAbilityController.js";

import { ApostolAbility } from "./ApostolAbility.js";
import { VeloAbility } from "./VeloAbility.js";

import { PatternSystem } from "./PatternSystem.js";

import { InputManager } from "../input/InputManager.js";

import { Player } from "./Player.js";

import { ProjectilePool } from "./ProjectilePool.js";
import { EnemyProjectilePool } from "./EnemyProjectilePool.js";

import { EnemyManager } from "./EnemyManager.js";
import { BossManager } from "./BossManager.js";

import { HUD } from "./HUD.js";
import { GameStateUI } from "./GameStateUI.js";
import { PresentationUI } from "./PresentationUI.js";

import { WaveManager } from "./WaveManager.js";
import { LevelManager } from "./LevelManager.js";
import { DifficultyManager } from "./DifficultyManager.js";

import { BackgroundManager } from "./BackgroundManager.js";

import { EffectManager } from "./EffectManager.js";

import { ComboManager } from "./ComboManager.js";
import { ScoreManager } from "./ScoreManager.js";

import { PowerUpManager } from "./PowerUpManager.js";
import { FervorManager } from "./FervorManager.js";

import { RelicarioSpecial } from "./RelicarioSpecial.js";

import { CharacterManager } from "./CharacterManager.js";

import { AudioManager } from "./AudioManager.js";


export class Game {
    constructor(
        canvas,
        ctx,
        gameSeed = 12345,
        playerSprites = {},
        enemySprites = {},
        backgroundImages = {}
    ) {
        /*
         * =====================================
         * CANVAS
         * =====================================
         */
        this.canvas =
            canvas;

        this.ctx =
            ctx;


        /*
         * =====================================
         * SEED
         * =====================================
         */
        this.gameSeed =
            gameSeed;


        /*
         * =====================================
         * RECURSOS
         * =====================================
         */
        this.playerSprites =
            playerSprites;

        this.enemySprites =
            enemySprites;

        this.backgroundImages =
            backgroundImages;


        /*
         * =====================================
         * SPRITES DE JEFES
         * =====================================
         */
        const createBossSprite =
            (
                src
            ) => {
                const image =
                    new Image();

                image.src =
                    src;

                return image;
            };


        this.bossSprites = {
            obispo:
                createBossSprite(
                    "/assets/sprites/bosses/obispo_incorrupto.png"
                ),

            bestia:
                createBossSprite(
                    "/assets/sprites/bosses/bestia_siete_campanas.png"
                ),

            culto:
                createBossSprite(
                    "/assets/sprites/bosses/culto_llaga.png"
                ),

            milagro:
                createBossSprite(
                    "/assets/sprites/bosses/milagro_negro.png"
                )
        };


        /*
         * =====================================
         * INPUT
         * =====================================
         */
        this.input =
            new InputManager();


        /*
         * =====================================
         * PERSONAJES
         * =====================================
         */
        this.characterManager =
            new CharacterManager();


        /*
         * =====================================
         * PRESENTACIÓN
         * =====================================
         */
        this.presentationUI =
            new PresentationUI(
                this.playerSprites
            );


        /*
         * =====================================
         * NIVEL
         * =====================================
         */
        this.levelManager =
            new LevelManager();


        /*
         * =====================================
         * FONDO
         * =====================================
         */
        this.backgroundManager =
            new BackgroundManager(
                this.canvas
            );


        this.backgroundManager
            .setBackgroundImages(
                this.backgroundImages
            );


        this.backgroundManager
            .setLevel(
                1
            );


        /*
         * =====================================
         * AUDIO
         * =====================================
         */
        this.audioManager =
            new AudioManager();


        /*
         * Menú + selección.
         */
        this.audioManager
            .registerMusic(
                "menu",
                "/assets/audio/music/tenebrae_menu_theme.mp3"
            );


        /*
         * Gameplay.
         */
        this.audioManager
            .registerMusic(
                "main",
                "/assets/audio/music/tenebrae_theme.mp3"
            );


        /*
         * Boss.
         */
        this.audioManager
            .registerMusic(
                "boss",
                "/assets/audio/music/boss_theme.mp3"
            );


        /*
         * SFX DE DISPARO POR PERSONAJE.
         */
        this.audioManager
            .registerSFX(
                "shootRelicario",
                "/assets/audio/sfx/shoot_relicario.wav"
            );


        this.audioManager
            .registerSFX(
                "shootApostol",
                "/assets/audio/sfx/shoot_apostol.wav"
            );


        this.audioManager
            .registerSFX(
                "shootVelo",
                "/assets/audio/sfx/shoot_velo.wav"
            );


        this.audioManager
            .registerSFX(
                "hit",
                "/assets/audio/sfx/hit.wav"
            );


        this.audioManager
            .registerSFX(
                "damage",
                "/assets/audio/sfx/player_damage.wav"
            );


        this.audioManager
            .registerSFX(
                "ability",
                "/assets/audio/sfx/ability.wav"
            );


        /*
         * Solicitar música de menú.
         *
         * Si Chrome bloquea autoplay,
         * AudioManager la iniciará con
         * la primera interacción.
         */
        this.audioManager
            .playMusic(
                "menu",
                2
            );


        /*
         * =====================================
         * DIFICULTAD
         * =====================================
         */
        this.difficultyManager =
            new DifficultyManager();


        /*
         * =====================================
         * COMBO / SCORE
         * =====================================
         */
        this.comboManager =
            new ComboManager();


        this.scoreManager =
            new ScoreManager();


        /*
         * =====================================
         * POWER UPS
         * =====================================
         */
        this.powerUpManager =
            new PowerUpManager();


        /*
         * =====================================
         * FERVOR
         * =====================================
         */
        this.fervorManager =
            new FervorManager();


        /*
         * =====================================
         * RELICARIO
         * =====================================
         */
        this.ashImpactAbility =
            new AshImpactAbility();


        this.bronzeBlocksAbility =
            new BronzeBlocksAbility();


        this.bellRumbleAbility =
            new BellRumbleAbility();


        this.relicarioSpecial =
            new RelicarioSpecial();


        this.relicarioAbilityController =
            new RelicarioAbilityController();


        /*
         * =====================================
         * APÓSTOL
         * =====================================
         */
        this.apostolAbility =
            new ApostolAbility();


        /*
         * =====================================
         * VELO
         * =====================================
         */
        this.veloAbility =
            new VeloAbility();


        this.characterAbilityKeyWasPressed =
            false;


        /*
         * =====================================
         * EFECTOS
         * =====================================
         */
        this.effectManager =
            new EffectManager();


        /*
         * =====================================
         * PLAYER
         * =====================================
         */
        this.player =
            new Player(
                this.canvas,
                this.input,
                this.playerSprites.relicario ??
                    null,
                this.powerUpManager
            );


        this.characterManager
            .applyToPlayer(
                this.player
            );


        this.applyExtendedCharacterHealth();


        this.applyCurrentCharacterSprite();


        /*
         * =====================================
         * PROJECTILES
         * =====================================
         */
        this.projectilePool =
            new ProjectilePool(
                100
            );


        this.enemyProjectilePool =
            new EnemyProjectilePool(
                100
            );


        /*
         * =====================================
         * ENEMIGOS
         * =====================================
         */
        this.enemyManager =
            new EnemyManager(
                this.gameSeed,
                this.enemySprites
            );


        /*
         * =====================================
         * BOSSES
         * =====================================
         */
        this.bossManager =
            new BossManager(
                this.bossSprites
            );


        this.bossEncounterStarted =
            false;


        /*
         * =====================================
         * PATTERNS
         * =====================================
         */
        this.patternSystem =
            new PatternSystem(
                this.gameSeed
            );


        /*
         * =====================================
         * HUD
         * =====================================
         */
        this.hud =
            new HUD();


        this.gameStateUI =
            new GameStateUI();


        /*
         * =====================================
         * WAVES
         * =====================================
         */
        this.waveManager =
            new WaveManager(
                this.levelManager
                    .getWaveCount()
            );


        /*
         * =====================================
         * ESTADOS
         * =====================================
         */
        this.gameFinished =
            false;


        this.gameOver =
            false;


        /*
         * =====================================
         * ESTADÍSTICAS POR NIVEL
         * =====================================
         */
        this.levelStatsStart = {
            score: 0,
            shots: 0,
            hits: 0,
            kills: 0
        };


        /*
         * =====================================
         * CONTROL SONIDO DISPARO
         *
         * Evita reproducir shoot.wav
         * cientos de veces por segundo.
         * =====================================
         */
        this.shootSoundCooldown =
            0;


        this.shootSoundInterval =
            0.12;


        /*
         * =====================================
         * DEBUG
         * =====================================
         */
        this.debugKeyState = {
            Digit2: false,
            Digit3: false,
            Digit4: false,
            Digit5: false,
            Digit6: false,
            Digit7: false,
            Digit8: false
        };


        /*
         * =====================================
         * INICIO
         * =====================================
         */
        this.updateDifficulty();


        this.createCurrentWave();


        this.tiempoAnterior =
            0;
    }


    /*
     * =========================================
     * VIDA AMPLIADA
     * =========================================
     */
    applyExtendedCharacterHealth() {
        let maxHealth =
            7;


        if (
            this.characterManager
                .isRelicario()
        ) {
            maxHealth =
                8;
        }


        if (
            this.characterManager
                .isApostol()
        ) {
            maxHealth =
                7;
        }


        if (
            this.characterManager
                .isVelo()
        ) {
            maxHealth =
                6;
        }


        this.player.maxHealth =
            maxHealth;

        this.player.health =
            maxHealth;
    }


    /*
     * =========================================
     * SPRITE PERSONAJE
     * =========================================
     */
    applyCurrentCharacterSprite() {
        if (
            this.characterManager
                .isRelicario()
        ) {
            this.player
                .setSprite(
                    this.playerSprites.relicario ??
                        null,
                    100,
                    135
                );


            return;
        }


        if (
            this.characterManager
                .isApostol()
        ) {
            this.player
                .setSprite(
                    this.playerSprites.apostol ??
                        null,
                    90,
                    130
                );


            return;
        }


        if (
            this.characterManager
                .isVelo()
        ) {
            this.player
                .setSprite(
                    this.playerSprites.velo ??
                        null,
                    82,
                    125
                );
        }
    }


    /*
     * =========================================
     * FONDO
     * =========================================
     */
    updateBackgroundLevel() {
        const currentLevel =
            this.levelManager
                .getCurrentLevel();


        if (
            !currentLevel
        ) {
            return;
        }


        this.backgroundManager
            .setLevel(
                currentLevel.id
            );
    }


    /*
     * =========================================
     * DIFICULTAD
     * =========================================
     */
    updateDifficulty() {
        const difficulty =
            this.levelManager
                .getDifficulty();


        this.difficultyManager
            .setMultiplier(
                difficulty
            );


        /*
         * Curva más gradual:
         * nivel 1 comienza por debajo de 1.0
         * y la velocidad aumenta con los niveles.
         */
        const projectileSpeedMultiplier =
            0.82 +
            (
                difficulty -
                1
            ) *
                0.50;


        this.enemyProjectilePool
            .setSpeedMultiplier(
                projectileSpeedMultiplier
            );
    }


    /*
     * =========================================
     * CREAR WAVE
     * =========================================
     */
    createCurrentWave() {
        this.enemyManager
            .createWave(
                this.waveManager
                    .currentWave,
                this.canvas
            );


        this.difficultyManager
            .applyToEnemies(
                this.enemyManager
                    .enemies
            );
    }


    /*
     * =========================================
     * HABILIDADES
     * =========================================
     */
    handleCharacterAbilityInput() {
        const pressed =
            this.input
                .isPressed(
                    "KeyE"
                );


        /*
         * RELICARIO.
         */
        if (
            this.characterManager
                .isRelicario()
        ) {
            if (
                pressed &&
                !this.characterAbilityKeyWasPressed
            ) {
                this.audioManager
                    .playSFX(
                        "ability",
                        0.8
                    );
            }


            this.relicarioAbilityController
                .tryActivate(
                    pressed,
                    this.fervorManager,
                    this.ashImpactAbility,
                    this.bronzeBlocksAbility,
                    this.bellRumbleAbility,
                    this.relicarioSpecial,
                    this.enemyProjectilePool,
                    this.enemyManager,
                    this.player,
                    this.effectManager
                );


            this.characterAbilityKeyWasPressed =
                pressed;


            return;
        }


        /*
         * APÓSTOL / VELO.
         */
        if (
            pressed &&
            !this.characterAbilityKeyWasPressed
        ) {
            this.audioManager
                .playSFX(
                    "ability",
                    0.8
                );


            if (
                this.characterManager
                    .isApostol()
            ) {
                this.apostolAbility
                    .activate(
                        this.fervorManager,
                        this.enemyManager,
                        this.bossManager,
                        this.enemyProjectilePool,
                        this.player,
                        this.effectManager
                    );
            }


            if (
                this.characterManager
                    .isVelo()
            ) {
                this.veloAbility
                    .activate(
                        this.fervorManager,
                        this.player,
                        this.projectilePool
                    );
            }
        }


        this.characterAbilityKeyWasPressed =
            pressed;
    }


    /*
     * =========================================
     * ESTADÍSTICAS POR NIVEL
     * =========================================
     */
    markLevelStatsStart() {
        this.levelStatsStart = {
            score:
                this.scoreManager
                    .getScore(),

            shots:
                this.player
                    .shotsFired,

            hits:
                this.player
                    .shotsHit,

            kills:
                this.player
                    .enemiesDestroyed
        };
    }


    getCurrentLevelSummary() {
        const currentLevel =
            this.levelManager
                .getCurrentLevel();


        const score =
            this.scoreManager
                .getScore() -
            this.levelStatsStart
                .score;


        const shots =
            this.player
                .shotsFired -
            this.levelStatsStart
                .shots;


        const hits =
            this.player
                .shotsHit -
            this.levelStatsStart
                .hits;


        const kills =
            this.player
                .enemiesDestroyed -
            this.levelStatsStart
                .kills;


        const accuracy =
            shots > 0
                ? (
                    hits /
                    shots
                ) *
                    100
                : 0;


        return {
            levelId:
                currentLevel?.id ??
                1,

            levelName:
                currentLevel?.name ??
                "Las Cruces de Ceniza",

            levelSubtitle:
                currentLevel?.subtitle ??
                "",

            maxLevels:
                this.levelManager
                    .maxLevels ??
                8,

            score:
                Math.max(
                    0,
                    score
                ),

            shots:
                Math.max(
                    0,
                    shots
                ),

            hits:
                Math.max(
                    0,
                    hits
                ),

            kills:
                Math.max(
                    0,
                    kills
                ),

            accuracy:
                Number.isFinite(
                    accuracy
                )
                    ? accuracy
                    : 0,

            health:
                Math.max(
                    0,
                    this.player
                        .health
                ),

            maxHealth:
                this.player
                    .maxHealth,

            fervor:
                typeof this
                    .fervorManager
                    .getFervor ===
                    "function"
                    ? this
                        .fervorManager
                        .getFervor()
                    : 0,

            isFinalLevel:
                !this.levelManager
                    .canAdvance()
        };
    }


    /*
     * =========================================
     * UPDATE
     * =========================================
     */
    update(
        deltaTime
    ) {
        /*
         * Fondo.
         */
        this.backgroundManager
            .update(
                deltaTime
            );


        /*
         * Cooldown disparo audio.
         */
        this.shootSoundCooldown =
            Math.max(
                0,
                this.shootSoundCooldown -
                    deltaTime
            );


        /*
         * UI.
         */
        const uiAction =
            this.presentationUI
                .update(
                    this.input
                );


        /*
         * =====================================
         * VOLVER AL MENÚ
         * =====================================
         */
        if (
            uiAction &&
            uiAction.type ===
                "RETURN_MENU"
        ) {
            this.restartGame();


            this.presentationUI
                .showMenu();


            /*
             * Volvemos suavemente al
             * tema del menú.
             */
            this.audioManager
                .crossFadeTo(
                    "menu",
                    1.8
                );


            return;
        }


        /*
         * =====================================
         * START GAME
         * =====================================
         */
        if (
            uiAction &&
            uiAction.type ===
                "START_GAME"
        ) {
            const selectedCharacter =
                uiAction.character;


            this.restartGame();


            this.characterManager
                .selectCharacter(
                    selectedCharacter
                );


            this.characterManager
                .applyToPlayer(
                    this.player
                );


            this.applyExtendedCharacterHealth();


            this.applyCurrentCharacterSprite();


            /*
             * Registrar inicio estadístico.
             */
            this.markLevelStatsStart();


            /*
             * Mostrar tarjeta antes de arrancar.
             */
            this.presentationUI
                .showLevelIntro(
                    this.levelManager
                        .getCurrentLevel(),
                    this.levelManager
                        .maxLevels ??
                        8
                );


            /*
             * =================================
             * MENÚ → GAMEPLAY
             * =================================
             */
            this.audioManager
                .crossFadeTo(
                    "main",
                    1.8
                );


            return;
        }


        /*
         * =====================================
         * INICIAR NIVEL
         * =====================================
         */
        if (
            uiAction &&
            uiAction.type ===
                "START_LEVEL"
        ) {
            this.presentationUI
                .startPlaying();


            return;
        }


        /*
         * =====================================
         * CONTINUAR DESPUÉS DEL RESUMEN
         * =====================================
         */
        if (
            uiAction &&
            uiAction.type ===
                "CONTINUE_LEVEL"
        ) {
            const summary =
                uiAction.summary ||
                {};


            if (
                summary.isFinalLevel
            ) {
                this.finishGame();


                return;
            }


            this.startNextLevel();


            this.markLevelStatsStart();


            this.presentationUI
                .showLevelIntro(
                    this.levelManager
                        .getCurrentLevel(),
                    this.levelManager
                        .maxLevels ??
                        8
                );


            return;
        }


        /*
         * =====================================
         * MENÚ
         *
         * La música menu sigue sonando también
         * durante selección de personaje.
         * =====================================
         */
        if (
            this.presentationUI
                .isMenu()
        ) {
            return;
        }


        /*
         * =====================================
         * CHARACTER SELECT
         * =====================================
         */
        if (
            this.presentationUI
                .isCharacterSelect()
        ) {
            return;
        }


        /*
         * =====================================
         * TRANSICIONES DE NIVEL
         * =====================================
         */
        if (
            this.presentationUI
                .isLevelIntro() ||
            this.presentationUI
                .isLevelSummary()
        ) {
            return;
        }


        /*
         * =====================================
         * VICTORIA
         * =====================================
         */
        if (
            this.presentationUI
                .isVictory()
        ) {
            return;
        }


        /*
         * =====================================
         * PAUSA
         * =====================================
         */
        if (
            this.presentationUI
                .isPaused()
        ) {
            return;
        }


        /*
         * =====================================
         * EFECTOS
         * =====================================
         */
        this.effectManager
            .update(
                deltaTime
            );


        /*
         * RELICARIO.
         */
        if (
            this.characterManager
                .isRelicario()
        ) {
            this.relicarioSpecial
                .update(
                    deltaTime,
                    this.enemyProjectilePool
                );


            this.ashImpactAbility
                .update(
                    deltaTime
                );


            this.bellRumbleAbility
                .update(
                    deltaTime
                );
        }


        /*
         * APÓSTOL.
         */
        this.apostolAbility
            .update(
                deltaTime
            );


        /*
         * VELO.
         */
        this.veloAbility
            .update(
                deltaTime
            );


        /*
         * =====================================
         * GAME OVER
         * =====================================
         */
        if (
            this.gameOver
        ) {
            if (
                this.input
                    .isPressed(
                        "KeyR"
                    )
            ) {
                this.restartGame();


                this.presentationUI
                    .startPlaying();


                this.audioManager
                    .playMusic(
                        "main",
                        1.2
                    );
            }


            return;
        }


        /*
         * =====================================
         * DEBUG
         * =====================================
         */
        if (
            this.handleDebugLevelShortcuts()
        ) {
            return;
        }


        /*
         * =====================================
         * ESTADO ANTES DEL FRAME
         * =====================================
         */
        const previousHits =
            this.player
                .shotsHit;


        const previousKills =
            this.player
                .enemiesDestroyed;


        const previousHealth =
            this.player
                .health;


        /*
         * =====================================
         * HABILIDAD
         * =====================================
         */
        this.handleCharacterAbilityInput();


        /*
         * =====================================
         * POWER-UPS PASIVOS POR FERVOR
         * =====================================
         *
         * 1 barra = Double Shot
         * 2 barras = Double Shot + Speed Boost
         * 3 barras = Triple Shot + Speed Boost
         * 4 barras = Triple Shot + Speed Boost + Piercing
         */
        this.powerUpManager
            .syncWithFervor(
                this.fervorManager
            );


        /*
         * =====================================
         * PLAYER
         * =====================================
         */
        this.player
            .update(
                deltaTime
            );


        /*
         * =====================================
         * DISPARO
         * =====================================
         */
        this.handlePlayerShooting();


        /*
         * =====================================
         * PROJECTILES
         * =====================================
         */
        this.projectilePool
            .update(
                deltaTime
            );


        this.enemyProjectilePool
            .update(
                deltaTime,
                this.canvas
            );


        /*
         * =====================================
         * ENEMIGOS
         * =====================================
         */
        this.enemyManager
            .update(
                deltaTime,
                this.canvas,
                this.player,
                this.enemyProjectilePool,
                this.patternSystem
            );


        /*
         * =====================================
         * BOSS
         * =====================================
         */
        this.bossManager
            .update(
                deltaTime,
                this.canvas,
                this.player,
                this.enemyProjectilePool,
                this.patternSystem
            );


        /*
         * =====================================
         * BLOQUES BRONCE
         * =====================================
         */
        if (
            this.characterManager
                .isRelicario()
        ) {
            this.bronzeBlocksAbility
                .update(
                    deltaTime,
                    this.player,
                    this.enemyProjectilePool
                );
        }


        /*
         * =====================================
         * COLISIONES
         * =====================================
         */
        this.enemyManager
            .checkProjectileCollisions(
                this.projectilePool,
                this.player,
                this.effectManager
            );


        this.bossManager
            .checkProjectileCollisions(
                this.projectilePool,
                this.player,
                this.effectManager
            );


        this.enemyManager
            .checkPlayerCollisions(
                this.player
            );


        this.enemyManager
            .checkEnemyProjectileCollisions(
                this.enemyProjectilePool,
                this.player
            );


        /*
         * =====================================
         * IMPACTOS
         * =====================================
         */
        const hitsThisFrame =
            this.player
                .shotsHit -
            previousHits;


        if (
            hitsThisFrame > 0
        ) {
            this.audioManager
                .playSFX(
                    "hit",
                    0.65
                );


            for (
                let i = 0;
                i < hitsThisFrame;
                i++
            ) {
                this.fervorManager
                    .registerHit();
            }
        }


        /*
         * =====================================
         * KILLS
         * =====================================
         */
        const killsThisFrame =
            this.player
                .enemiesDestroyed -
            previousKills;


        if (
            killsThisFrame > 0
        ) {
            for (
                let i = 0;
                i < killsThisFrame;
                i++
            ) {
                this.comboManager
                    .registerKill();


                const multiplier =
                    this.comboManager
                        .getMultiplier();


                this.scoreManager
                    .registerKill(
                        multiplier
                    );


                this.fervorManager
                    .registerKill();
            }
        }


        /*
         * =====================================
         * DAÑO
         * =====================================
         */
        if (
            this.player.health <
            previousHealth
        ) {
            this.audioManager
                .playSFX(
                    "damage",
                    0.85
                );


            this.comboManager
                .registerDamage();


            this.fervorManager
                .registerDamage();
        }


        /*
         * =====================================
         * GAME OVER
         * =====================================
         */
        this.checkGameOver();


        if (
            this.gameOver
        ) {
            return;
        }


        /*
         * =====================================
         * WAVES
         * =====================================
         */
        this.checkWaveFinished();
    }


    /*
     * =========================================
     * DISPARO
     * =========================================
     */
    handlePlayerShooting() {
        if (
            !this.player
                .wantsToShoot
        ) {
            return;
        }


        /*
         * =====================================
         * AUDIO DISPARO
         * =====================================
         */
        if (
            this.shootSoundCooldown <=
            0
        ) {
            let shootSound =
                "shootRelicario";


            if (
                this.characterManager
                    .isApostol()
            ) {
                shootSound =
                    "shootApostol";
            }


            if (
                this.characterManager
                    .isVelo()
            ) {
                shootSound =
                    "shootVelo";
            }


            this.audioManager
                .playSFX(
                    shootSound,
                    0.42
                );


            this.shootSoundCooldown =
                this.shootSoundInterval;
        }


        const shootPosition =
            this.player
                .getShootPosition();


        const modifiers =
            this.characterManager
                .getProjectileModifiers();


        /*
         * =====================================
         * POWER-UPS POR BARRAS DE FERVOR
         * =====================================
         */
        let shotOffsets = [
            0
        ];


        if (
            this.powerUpManager
                .has(
                    "tripleShot"
                )
        ) {
            shotOffsets = [
                -18,
                0,
                18
            ];
        } else if (
            this.powerUpManager
                .has(
                    "doubleShot"
                )
        ) {
            shotOffsets = [
                -12,
                12
            ];
        }


        const piercingActive =
            this.powerUpManager
                .has(
                    "piercing"
                );


        /*
         * Player.update() ya contabilizó
         * el primer disparo.
         *
         * Sumamos únicamente los proyectiles
         * adicionales de Double/Triple Shot.
         */
        if (
            shotOffsets.length > 1
        ) {
            this.player.shotsFired +=
                shotOffsets.length -
                1;
        }


        /*
         * =====================================
         * RELICARIO
         * =====================================
         */
        if (
            this.characterManager
                .isRelicario()
        ) {
            const ashActive =
                this.ashImpactAbility
                    .isActive();


            for (
                const offsetX
                of shotOffsets
            ) {
                this.projectilePool
                    .getProjectile(
                        shootPosition.x +
                            offsetX,
                        shootPosition.y,
                        {
                            type:
                                ashActive
                                    ? "ash"
                                    : "normal",

                            ashImpact:
                                ashActive,

                            widthMultiplier:
                                ashActive
                                    ? this
                                        .ashImpactAbility
                                        .getProjectileWidthMultiplier()
                                    : modifiers
                                        .widthMultiplier,

                            damageMultiplier:
                                ashActive
                                    ? this
                                        .ashImpactAbility
                                        .getDamageMultiplier()
                                    : modifiers
                                        .damageMultiplier,

                            piercing:
                                piercingActive
                        }
                    );
            }


            return;
        }


        /*
         * =====================================
         * APÓSTOL
         * =====================================
         */
        if (
            this.characterManager
                .isApostol()
        ) {
            for (
                const offsetX
                of shotOffsets
            ) {
                this.projectilePool
                    .getProjectile(
                        shootPosition.x +
                            offsetX,
                        shootPosition.y,
                        {
                            type:
                                "magic",

                            ashImpact:
                                false,

                            widthMultiplier:
                                modifiers
                                    .widthMultiplier,

                            damageMultiplier:
                                modifiers
                                    .damageMultiplier,

                            speed:
                                520,

                            piercing:
                                piercingActive
                        }
                    );
            }


            return;
        }


        /*
         * =====================================
         * VELO
         * =====================================
         */
        if (
            this.characterManager
                .isVelo()
        ) {
            for (
                const offsetX
                of shotOffsets
            ) {
                this.projectilePool
                    .getProjectile(
                        shootPosition.x +
                            offsetX,
                        shootPosition.y,
                        {
                            type:
                                "blade",

                            ashImpact:
                                false,

                            widthMultiplier:
                                modifiers
                                    .widthMultiplier,

                            damageMultiplier:
                                modifiers
                                    .damageMultiplier,

                            speed:
                                760,

                            piercing:
                                piercingActive
                        }
                    );
            }
        }
    }


    /*
     * =========================================
     * GAME OVER
     * =========================================
     */
    checkGameOver() {
        if (
            !this.player
                .isDestroyed()
        ) {
            return;
        }


        this.gameOver =
            true;


        /*
         * Que no corte en seco.
         */
        this.audioManager
            .fadeOut(
                1.8
            );
    }


    /*
     * =========================================
     * WAVES / BOSS
     * =========================================
     */
    checkWaveFinished() {
        /*
         * =====================================
         * BOSS ACTIVO
         * =====================================
         */
        if (
            this.bossEncounterStarted
        ) {
            if (
                this.bossManager
                    .isBossDefeated()
            ) {
                this.bossEncounterStarted =
                    false;


                this.bossManager
                    .reset();


                /*
                 * Boss → gameplay.
                 */
                this.audioManager
                    .crossFadeTo(
                        "main",
                        1.6
                    );


                this.finishCurrentLevel();
            }


            return;
        }


        /*
         * Todavía hay enemigos.
         */
        if (
            this.enemyManager
                .hasActiveEnemies()
        ) {
            return;
        }


        /*
         * Terminar wave.
         */
        if (
            !this.waveManager
                .waveFinished
        ) {
            this.waveManager
                .markWaveFinished();


            this.enemyManager
                .removeInactiveEnemies();
        }


        /*
         * Siguiente wave.
         */
        if (
            this.waveManager
                .canAdvance()
        ) {
            this.startNextWave();


            return;
        }


        /*
         * =====================================
         * BOSS
         * =====================================
         */
        const currentLevel =
            this.levelManager
                .getCurrentLevel();


        if (
            this.bossManager
                .shouldSpawnBoss(
                    currentLevel.id
                )
        ) {
            const boss =
                this.bossManager
                    .createBoss(
                        currentLevel.id,
                        this.canvas
                    );


            if (
                boss
            ) {
                this.bossEncounterStarted =
                    true;


                this.projectilePool
                    .reset();


                this.enemyProjectilePool
                    .reset();


                /*
                 * Gameplay → boss.
                 */
                this.audioManager
                    .crossFadeTo(
                        "boss",
                        1.8
                    );


                return;
            }
        }


        this.finishCurrentLevel();
    }


    /*
     * =========================================
     * NEXT WAVE
     * =========================================
     */
    startNextWave() {
        const advanced =
            this.waveManager
                .advanceWave();


        if (
            !advanced
        ) {
            return;
        }


        this.enemyProjectilePool
            .reset();


        this.createCurrentWave();
    }


    /*
     * =========================================
     * FIN NIVEL
     * =========================================
     */
    finishCurrentLevel() {
        /*
         * Limpiar proyectiles antes de mostrar
         * los resultados.
         */
        this.projectilePool
            .reset();


        this.enemyProjectilePool
            .reset();


        const summary =
            this.getCurrentLevelSummary();


        this.presentationUI
            .showLevelSummary(
                summary
            );
    }


    /*
     * =========================================
     * NEXT LEVEL
     * =========================================
     */
    startNextLevel() {
        const advanced =
            this.levelManager
                .advanceLevel();


        if (
            !advanced
        ) {
            this.finishGame();


            return;
        }


        this.updateBackgroundLevel();


        /*
         * Asegurar música gameplay.
         */
        this.audioManager
            .crossFadeTo(
                "main",
                1.3
            );


        this.enemyManager
            .reset();


        this.bossManager
            .reset();


        this.bossEncounterStarted =
            false;


        this.projectilePool
            .reset();


        this.enemyProjectilePool
            .reset();


        this.effectManager
            .reset();


        this.resetAbilities();


        this.updateDifficulty();


        this.waveManager =
            new WaveManager(
                this.levelManager
                    .getWaveCount()
            );


        this.createCurrentWave();


        this.characterManager
            .applyToPlayer(
                this.player
            );


        this.applyExtendedCharacterHealth();


        this.applyCurrentCharacterSprite();
    }


    /*
     * =========================================
     * FIN DEL JUEGO
     * =========================================
     */
    finishGame() {
        this.gameFinished =
            true;


        this.projectilePool
            .reset();


        this.enemyProjectilePool
            .reset();


        this.audioManager
            .fadeOut(
                2.5
            );


        this.presentationUI
            .showVictory();
    }


    /*
     * =========================================
     * RESET HABILIDADES
     * =========================================
     */
    resetAbilities() {
        this.ashImpactAbility
            .reset();


        this.bronzeBlocksAbility
            .reset();


        this.bellRumbleAbility
            .reset();


        this.relicarioSpecial
            .reset();


        this.relicarioAbilityController
            .reset();


        this.apostolAbility
            .reset();


        this.veloAbility
            .reset();


        this.characterAbilityKeyWasPressed =
            false;
    }


    /*
     * =========================================
     * DEBUG
     * =========================================
     */
    handleDebugLevelShortcuts() {
        const keys = [
            {
                code:
                    "Digit2",
                level:
                    2
            },

            {
                code:
                    "Digit3",
                level:
                    3
            },

            {
                code:
                    "Digit4",
                level:
                    4
            },

            {
                code:
                    "Digit5",
                level:
                    5
            },

            {
                code:
                    "Digit6",
                level:
                    6
            },

            {
                code:
                    "Digit7",
                level:
                    7
            },

            {
                code:
                    "Digit8",
                level:
                    8
            }
        ];


        for (
            const item
            of keys
        ) {
            const pressed =
                this.input
                    .isPressed(
                        item.code
                    );


            const previous =
                this.debugKeyState[
                    item.code
                ];


            if (
                pressed &&
                !previous
            ) {
                this.debugKeyState[
                    item.code
                ] =
                    true;


                this.jumpToLevel(
                    item.level
                );


                return true;
            }


            if (
                !pressed
            ) {
                this.debugKeyState[
                    item.code
                ] =
                    false;
            }
        }


        return false;
    }


    /*
     * =========================================
     * JUMP NIVEL
     * =========================================
     */
    jumpToLevel(
        levelNumber
    ) {
        if (
            levelNumber < 1 ||
            levelNumber >
                this.levelManager
                    .maxLevels
        ) {
            return;
        }


        this.levelManager
            .setLevel(
                levelNumber
            );


        this.backgroundManager
            .setLevel(
                levelNumber
            );


        this.audioManager
            .crossFadeTo(
                "main",
                1
            );


        this.enemyManager
            .reset();


        this.bossManager
            .reset();


        this.bossEncounterStarted =
            false;


        this.projectilePool
            .reset();


        this.enemyProjectilePool
            .reset();


        this.effectManager
            .reset();


        this.resetAbilities();


        this.characterManager
            .applyToPlayer(
                this.player
            );


        this.applyExtendedCharacterHealth();


        this.applyCurrentCharacterSprite();


        this.updateDifficulty();


        this.waveManager =
            new WaveManager(
                this.levelManager
                    .getWaveCount()
            );


        /*
         * Debug manda a la wave final.
         */
        this.waveManager
            .currentWave =
            this.waveManager
                .maxWaves;


        this.createCurrentWave();
    }


    /*
     * =========================================
     * RESTART
     * =========================================
     */
    restartGame() {
        this.gameOver =
            false;


        this.gameFinished =
            false;


        this.levelManager
            .reset();


        this.backgroundManager
            .setLevel(
                1
            );


        this.comboManager
            .reset();


        this.scoreManager
            .reset();


        this.fervorManager
            .reset();


        this.resetAbilities();


        this.powerUpManager
            .reset();


        this.player
            .reset();


        this.enemyManager
            .reset();


        this.enemyManager
            .setSeed(
                this.gameSeed
            );


        this.bossManager
            .reset();


        this.bossEncounterStarted =
            false;


        this.projectilePool
            .reset();


        this.enemyProjectilePool
            .reset();


        this.effectManager
            .reset();


        this.patternSystem
            .setSeed(
                this.gameSeed
            );


        this.updateDifficulty();


        this.waveManager =
            new WaveManager(
                this.levelManager
                    .getWaveCount()
            );


        this.createCurrentWave();


        this.debugKeyState = {
            Digit2: false,
            Digit3: false,
            Digit4: false,
            Digit5: false,
            Digit6: false,
            Digit7: false,
            Digit8: false
        };


        this.shootSoundCooldown =
            0;


        this.characterManager
            .applyToPlayer(
                this.player
            );


        this.applyExtendedCharacterHealth();


        this.applyCurrentCharacterSprite();
    }


    /*
     * =========================================
     * ATAQUES ENEMIGOS RELIGIOSOS — OPTIMIZADOS
     * =========================================
     *
     * Sin sombras, filtros ni gradientes por bala.
     * Esto reduce mucho el costo de render.
     * La hitbox original no cambia.
     */
    renderReligiousEnemyProjectiles() {
        const ctx =
            this.ctx;

        const projectiles =
            this.enemyProjectilePool
                .projectiles ||
            [];


        ctx.save();

        ctx.lineWidth =
            2;


        for (
            let i = 0;
            i < projectiles.length;
            i++
        ) {
            const p =
                projectiles[i];


            if (
                !p ||
                !p.active
            ) {
                continue;
            }


            const x =
                Math.round(
                    p.x +
                    (
                        p.width ||
                        10
                    ) / 2
                );

            const y =
                Math.round(
                    p.y +
                    (
                        p.height ||
                        18
                    ) / 2
                );


            const type =
                p.visualType ||
                "cruz";


            /*
             * HOSTIA / SELLO
             */
            if (
                type ===
                "hostia"
            ) {
                ctx.fillStyle =
                    "#e5c36d";

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    9,
                    0,
                    Math.PI * 2
                );

                ctx.fill();


                ctx.strokeStyle =
                    "#fff0bd";

                ctx.stroke();


                ctx.fillStyle =
                    "#6f4326";

                ctx.fillRect(
                    x - 1,
                    y - 6,
                    2,
                    12
                );

                ctx.fillRect(
                    x - 4,
                    y - 2,
                    8,
                    2
                );

                continue;
            }


            /*
             * CERA / LUZ VOTIVA
             */
            if (
                type ===
                "cera"
            ) {
                ctx.fillStyle =
                    "#f2d88c";

                ctx.beginPath();

                ctx.moveTo(
                    x,
                    y - 12
                );

                ctx.lineTo(
                    x + 8,
                    y + 2
                );

                ctx.lineTo(
                    x,
                    y + 13
                );

                ctx.lineTo(
                    x - 8,
                    y + 2
                );

                ctx.closePath();

                ctx.fill();


                ctx.fillStyle =
                    "#fff8dc";

                ctx.fillRect(
                    x - 2,
                    y - 1,
                    4,
                    7
                );

                continue;
            }


            /*
             * MERCURIO
             */
            if (
                type ===
                "mercurio"
            ) {
                ctx.fillStyle =
                    "#d8dfdc";

                ctx.beginPath();

                ctx.moveTo(
                    x,
                    y - 14
                );

                ctx.lineTo(
                    x + 6,
                    y
                );

                ctx.lineTo(
                    x,
                    y + 14
                );

                ctx.lineTo(
                    x - 6,
                    y
                );

                ctx.closePath();

                ctx.fill();


                ctx.strokeStyle =
                    "#fffce8";

                ctx.stroke();

                continue;
            }


            /*
             * CAMPANA
             */
            if (
                type ===
                "campana"
            ) {
                ctx.fillStyle =
                    "#bd873d";

                ctx.beginPath();

                ctx.moveTo(
                    x - 9,
                    y + 7
                );

                ctx.lineTo(
                    x - 6,
                    y - 5
                );

                ctx.quadraticCurveTo(
                    x,
                    y - 12,
                    x + 6,
                    y - 5
                );

                ctx.lineTo(
                    x + 9,
                    y + 7
                );

                ctx.closePath();

                ctx.fill();


                ctx.fillStyle =
                    "#f0c568";

                ctx.fillRect(
                    x - 11,
                    y + 6,
                    22,
                    3
                );

                continue;
            }


            /*
             * ESPINA PENITENCIAL
             */
            if (
                type ===
                "espina"
            ) {
                ctx.fillStyle =
                    "#eee0bd";

                ctx.beginPath();

                ctx.moveTo(
                    x,
                    y - 14
                );

                ctx.lineTo(
                    x + 5,
                    y + 11
                );

                ctx.lineTo(
                    x - 5,
                    y + 11
                );

                ctx.closePath();

                ctx.fill();


                ctx.fillStyle =
                    "#8e3030";

                ctx.fillRect(
                    x - 6,
                    y + 1,
                    12,
                    3
                );

                continue;
            }


            /*
             * FALLBACK: CRUZ PENITENCIAL
             */
            ctx.fillStyle =
                "#e6c878";

            ctx.fillRect(
                x - 3,
                y - 11,
                6,
                22
            );

            ctx.fillRect(
                x - 8,
                y - 3,
                16,
                6
            );

            ctx.fillStyle =
                "#8e3030";

            ctx.fillRect(
                x - 1,
                y - 8,
                2,
                16
            );
        }


        ctx.restore();
    }


    /*
     * =========================================
     * RENDER GAMEPLAY
     * =========================================
     */
    renderGameplay() {
        this.enemyManager
            .render(
                this.ctx
            );


        this.bossManager
            .render(
                this.ctx
            );


        if (
            !this.player
                .isDestroyed()
        ) {
            this.player
                .render(
                    this.ctx
                );
        }


        this.projectilePool
            .render(
                this.ctx
            );


        this.renderReligiousEnemyProjectiles();


        this.effectManager
            .render(
                this.ctx
            );


        if (
            this.characterManager
                .isRelicario()
        ) {
            this.bronzeBlocksAbility
                .render(
                    this.ctx,
                    this.player
                );


            this.bellRumbleAbility
                .render(
                    this.ctx,
                    this.player
                );


            this.relicarioSpecial
                .render(
                    this.ctx,
                    this.player
                );
        }


        if (
            this.characterManager
                .isApostol()
        ) {
            this.apostolAbility
                .render(
                    this.ctx,
                    this.player
                );
        }


        if (
            this.characterManager
                .isVelo()
        ) {
            this.veloAbility
                .render(
                    this.ctx,
                    this.player
                );
        }


        const currentLevel =
            this.levelManager
                .getCurrentLevel();


        this.hud
            .render(
                this.ctx,
                this.player,
                this.waveManager
                    .currentWave,
                this.waveManager
                    .maxWaves,
                this.gameSeed,
                currentLevel,
                this.levelManager
                    .maxLevels,
                this.comboManager,
                this.scoreManager,
                this.fervorManager
            );
    }


    /*
     * =========================================
     * ÁREA JUGABLE
     * =========================================
     */
    getGameplayLeft() {
        return Math.min(
            390,
            Math.max(
                320,
                this.canvas.width *
                    0.25
            )
        ) + 18;
    }


    renderGameplayBackground() {
        const left =
            this.getGameplayLeft();

        const playableWidth =
            Math.max(
                1,
                this.canvas.width -
                    left
            );

        const scaleX =
            playableWidth /
            this.canvas.width;


        this.ctx.save();

        this.ctx.beginPath();

        this.ctx.rect(
            left,
            0,
            playableWidth,
            this.canvas.height
        );

        this.ctx.clip();

        this.ctx.translate(
            left,
            0
        );

        this.ctx.scale(
            scaleX,
            1
        );

        this.backgroundManager
            .render(
                this.ctx
            );

        this.ctx.restore();
    }


    /*
     * =========================================
     * RENDER
     * =========================================
     */
    render() {
        this.ctx
            .clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );


        /*
         * Menú: fondo completo.
         */
        if (
            this.presentationUI
                .isMenu()
        ) {
            this.backgroundManager
                .render(
                    this.ctx
                );


            this.presentationUI
                .render(
                    this.ctx,
                    this.canvas
                );


            return;
        }


        /*
         * Selección: fondo completo.
         */
        if (
            this.presentationUI
                .isCharacterSelect()
        ) {
            this.backgroundManager
                .render(
                    this.ctx
                );


            this.presentationUI
                .render(
                    this.ctx,
                    this.canvas
                );


            return;
        }


        /*
         * Gameplay: parallax solo en el área jugable.
         */
        this.renderGameplayBackground();


        this.renderGameplay();


        /*
         * Intro / resumen del nivel.
         */
        if (
            this.presentationUI
                .isLevelIntro() ||
            this.presentationUI
                .isLevelSummary()
        ) {
            this.presentationUI
                .render(
                    this.ctx,
                    this.canvas
                );


            return;
        }


        /*
         * Game Over.
         */
        if (
            this.gameOver
        ) {
            this.gameStateUI
                .renderGameOver(
                    this.ctx,
                    this.canvas
                );


            return;
        }


        /*
         * Pausa.
         */
        if (
            this.presentationUI
                .isPaused()
        ) {
            this.presentationUI
                .render(
                    this.ctx,
                    this.canvas
                );


            return;
        }


        /*
         * Victoria.
         */
        if (
            this.presentationUI
                .isVictory()
        ) {
            this.presentationUI
                .render(
                    this.ctx,
                    this.canvas,
                    this.scoreManager
                        .getScore(),
                    this.player
                        .getAccuracy()
                );
        }
    }


    /*
     * =========================================
     * LOOP
     * =========================================
     */
    gameLoop(
        tiempoActual
    ) {
        const deltaTime =
            Math.min(
                (
                    tiempoActual -
                    this.tiempoAnterior
                ) /
                    1000,
                0.05
            );


        this.tiempoAnterior =
            tiempoActual;


        this.update(
            deltaTime
        );


        this.render();


        requestAnimationFrame(
            this.gameLoop
                .bind(
                    this
                )
        );
    }


    /*
     * =========================================
     * START
     * =========================================
     */
    start() {
        /*
         * Pedimos tema menú otra vez
         * al iniciar el loop.
         */
        this.audioManager
            .playMusic(
                "menu",
                2
            );


        requestAnimationFrame(
            this.gameLoop
                .bind(
                    this
                )
        );
    }
}