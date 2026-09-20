import { Game } from "./core/Game.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

console.log("TENEBRAE: núcleo del juego cargado");

const game = new Game(canvas, ctx);

game.start();