export class GameStateUI {
    renderLevelFinished(ctx, canvas) {
        ctx.fillStyle = "#f5f5dc";
        ctx.font = "48px serif";
        ctx.textAlign = "center";

        ctx.fillText(
            "NIVEL TERMINADO",
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.font = "24px serif";

        ctx.fillText(
            "Presiona R para reiniciar",
            canvas.width / 2,
            canvas.height / 2 + 50
        );
    }

    renderGameOver(ctx, canvas) {
        ctx.fillStyle = "#f5f5dc";
        ctx.font = "48px serif";
        ctx.textAlign = "center";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.font = "24px serif";

        ctx.fillText(
            "Presiona R para reiniciar",
            canvas.width / 2,
            canvas.height / 2 + 50
        );
    }
}