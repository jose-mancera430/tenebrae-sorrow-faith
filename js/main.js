import { Game } from "./core/Game.js";

const canvas =
    document.getElementById(
        "game-canvas"
    );

const ctx =
    canvas.getContext("2d");

console.log(
    "TENEBRAE: núcleo del juego cargado"
);

async function startGame() {
    let gameSeed = 12345;

    try {
        const response =
            await fetch(
                "/api/daily-seed"
            );

        if (!response.ok) {
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

    const game =
        new Game(
            canvas,
            ctx,
            gameSeed
        );

    game.start();
}

startGame();