export class HUD {
    render(
        ctx,
        player,
        currentWave,
        maxWaves,
        gameSeed
    ) {
        ctx.fillStyle = "#f5f5dc";
        ctx.font = "24px serif";
        ctx.textAlign = "left";

        ctx.fillText(
            `Oleada: ${currentWave}/${maxWaves}`,
            20,
            35
        );

        ctx.fillText(
            `Vida: ${player.health}/${player.maxHealth}`,
            20,
            65
        );

        ctx.fillText(
            `Disparos: ${player.shotsFired}`,
            20,
            95
        );

        ctx.fillText(
            `Impactos: ${player.shotsHit}`,
            20,
            125
        );

        ctx.fillText(
            `Precisión: ${player.getAccuracy().toFixed(2)}%`,
            20,
            155
        );

        ctx.fillText(
            `Enemigos destruidos: ${player.enemiesDestroyed}`,
            20,
            185
        );

        ctx.fillText(
            `Seed: ${gameSeed}`,
            20,
            215
        );
    }
}