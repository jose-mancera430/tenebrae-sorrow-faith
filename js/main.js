import { Game } from "./core/Game.js";
import { AssetManager } from "./core/AssetManager.js";

const canvas =
    document.getElementById(
        "game-canvas"
    );

const ctx =
    canvas.getContext(
        "2d"
    );

console.log(
    "TENEBRAE: núcleo del juego cargado"
);


/*
 * =========================================
 * CARGA OPCIONAL DE IMÁGENES
 * =========================================
 *
 * Si un fondo todavía no existe,
 * no rompe todo el arranque.
 */
async function loadOptionalImage(
    assetManager,
    key,
    path
) {
    try {
        const image =
            await assetManager.loadImage(
                key,
                path
            );

        console.log(
            `Asset cargado: ${path}`
        );

        return image;
    } catch (error) {
        console.warn(
            `Asset todavía no disponible: ${path}`
        );

        return null;
    }
}


/*
 * =========================================
 * INICIO
 * =========================================
 */
async function startGame() {
    /*
     * =====================================
     * SEED
     * =====================================
     */
    let gameSeed =
        12345;


    try {
        const response =
            await fetch(
                "/api/daily-seed"
            );


        if (
            !response.ok
        ) {
            throw new Error(
                "No se pudo obtener la seed diaria"
            );
        }


        const data =
            await response.json();


        gameSeed =
            data.seed;


        console.log(
            "Seed diaria recibida:",
            gameSeed
        );
    } catch (error) {
        console.warn(
            "Usando seed de respaldo:",
            gameSeed
        );
    }


    /*
     * =====================================
     * ASSET MANAGER
     * =====================================
     */
    const assetManager =
        new AssetManager();


    /*
     * =====================================
     * SPRITES JUGADORES
     * =====================================
     */
    const playerSprites = {
        relicario: null,
        apostol: null,
        velo: null
    };


    /*
     * =====================================
     * SPRITES ENEMIGOS
     * =====================================
     */
    const enemySprites = {
        basic: null,
        hunter: null,
        turret: null,
        circular: null,
        heavy: null,
        pursuer: null
    };


    /*
     * =====================================
     * FONDOS
     * =====================================
     */
    const backgroundImages = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null
    };


    /*
     * =====================================
     * JUGADORES
     * =====================================
     */
    playerSprites.relicario =
        await loadOptionalImage(
            assetManager,
            "playerRelicario",
            "/assets/sprites/player/relicario.png"
        );


    playerSprites.apostol =
        await loadOptionalImage(
            assetManager,
            "playerApostol",
            "/assets/sprites/player/apostol.png"
        );


    playerSprites.velo =
        await loadOptionalImage(
            assetManager,
            "playerVelo",
            "/assets/sprites/player/velo.png"
        );


    /*
     * =====================================
     * ENEMIGOS
     * =====================================
     */
    enemySprites.basic =
        await loadOptionalImage(
            assetManager,
            "basicEnemy",
            "/assets/sprites/enemies/basic.png"
        );


    enemySprites.hunter =
        await loadOptionalImage(
            assetManager,
            "hunterEnemy",
            "/assets/sprites/enemies/hunter.png"
        );


    enemySprites.turret =
        await loadOptionalImage(
            assetManager,
            "turretEnemy",
            "/assets/sprites/enemies/turret.png"
        );


    enemySprites.circular =
        await loadOptionalImage(
            assetManager,
            "circularEnemy",
            "/assets/sprites/enemies/circular.png"
        );


    enemySprites.heavy =
        await loadOptionalImage(
            assetManager,
            "heavyEnemy",
            "/assets/sprites/enemies/heavy.png"
        );


    enemySprites.pursuer =
        await loadOptionalImage(
            assetManager,
            "pursuerEnemy",
            "/assets/sprites/enemies/pursuer.png"
        );


    /*
     * =====================================
     * FONDOS 1 - 8
     * =====================================
     */

    /*
     * NIVEL 1
     */
    backgroundImages[1] =
        await loadOptionalImage(
            assetManager,
            "level1Background",
            "/assets/backgrounds/level1_atrio_penitentes.png"
        );


    /*
     * NIVEL 2
     */
    backgroundImages[2] =
        await loadOptionalImage(
            assetManager,
            "level2Background",
            "/assets/backgrounds/level2_claustro_llagas.png"
        );


    /*
     * NIVEL 3
     */
    backgroundImages[3] =
        await loadOptionalImage(
            assetManager,
            "level3Background",
            "/assets/backgrounds/level3_nave_incorruptos.png"
        );


    /*
     * NIVEL 4
     */
    backgroundImages[4] =
        await loadOptionalImage(
            assetManager,
            "level4Background",
            "/assets/backgrounds/level4_campanario_agonia.png"
        );


    /*
     * NIVEL 5
     */
    backgroundImages[5] =
        await loadOptionalImage(
            assetManager,
            "level5Background",
            "/assets/backgrounds/level5_cripta_rostros.png"
        );


    /*
     * NIVEL 6
     */
    backgroundImages[6] =
        await loadOptionalImage(
            assetManager,
            "level6Background",
            "/assets/backgrounds/level6_altar_carne.png"
        );


    /*
     * NIVEL 7
     */
    backgroundImages[7] =
        await loadOptionalImage(
            assetManager,
            "level7Background",
            "/assets/backgrounds/level7_umbral_milagro.png"
        );


    /*
     * NIVEL 8
     */
    backgroundImages[8] =
        await loadOptionalImage(
            assetManager,
            "level8Background",
            "/assets/backgrounds/level8_calamidad.png"
        );


    /*
     * =====================================
     * DEBUG JUGADORES
     * =====================================
     */
    console.log(
        "Sprites jugador cargados:",
        {
            relicario:
                Boolean(
                    playerSprites.relicario
                ),

            apostol:
                Boolean(
                    playerSprites.apostol
                ),

            velo:
                Boolean(
                    playerSprites.velo
                )
        }
    );


    /*
     * =====================================
     * DEBUG ENEMIGOS
     * =====================================
     */
    console.log(
        "Sprites enemigos cargados:",
        {
            basic:
                Boolean(
                    enemySprites.basic
                ),

            hunter:
                Boolean(
                    enemySprites.hunter
                ),

            turret:
                Boolean(
                    enemySprites.turret
                ),

            circular:
                Boolean(
                    enemySprites.circular
                ),

            heavy:
                Boolean(
                    enemySprites.heavy
                ),

            pursuer:
                Boolean(
                    enemySprites.pursuer
                )
        }
    );


    /*
     * =====================================
     * DEBUG FONDOS
     * =====================================
     */
    console.log(
        "Fondos cargados:",
        {
            nivel1:
                Boolean(
                    backgroundImages[1]
                ),

            nivel2:
                Boolean(
                    backgroundImages[2]
                ),

            nivel3:
                Boolean(
                    backgroundImages[3]
                ),

            nivel4:
                Boolean(
                    backgroundImages[4]
                ),

            nivel5:
                Boolean(
                    backgroundImages[5]
                ),

            nivel6:
                Boolean(
                    backgroundImages[6]
                ),

            nivel7:
                Boolean(
                    backgroundImages[7]
                ),

            nivel8:
                Boolean(
                    backgroundImages[8]
                )
        }
    );


    /*
     * =====================================
     * CREAR GAME
     * =====================================
     */
    const game =
        new Game(
            canvas,
            ctx,
            gameSeed,
            playerSprites,
            enemySprites,
            backgroundImages
        );


    /*
     * =====================================
     * START
     * =====================================
     */
    game.start();
}


startGame();