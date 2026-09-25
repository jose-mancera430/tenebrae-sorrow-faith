export class GameStateUI {
    constructor() {
        this.titlePulse =
            0;
    }


    /*
     * ==========================================
     * PANEL
     * ==========================================
     */
    drawPanel(
        ctx,
        x,
        y,
        width,
        height
    ) {
        ctx.fillStyle =
            "rgba(0, 0, 0, 0.42)";

        ctx.fillRect(
            x + 8,
            y + 8,
            width,
            height
        );


        const gradient =
            ctx.createLinearGradient(
                x,
                y,
                x,
                y + height
            );

        gradient.addColorStop(
            0,
            "rgba(24, 14, 17, 0.94)"
        );

        gradient.addColorStop(
            1,
            "rgba(6, 5, 7, 0.96)"
        );


        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            x,
            y,
            width,
            height
        );


        ctx.strokeStyle =
            "#704337";

        ctx.lineWidth =
            3;

        ctx.strokeRect(
            x,
            y,
            width,
            height
        );


        ctx.strokeStyle =
            "rgba(194, 147, 91, 0.25)";

        ctx.lineWidth =
            1;

        ctx.strokeRect(
            x + 8,
            y + 8,
            width - 16,
            height - 16
        );
    }


    drawCross(
        ctx,
        centerX,
        centerY
    ) {
        ctx.fillStyle =
            "#7c4538";

        ctx.fillRect(
            centerX - 3,
            centerY - 24,
            6,
            48
        );

        ctx.fillRect(
            centerX - 16,
            centerY - 8,
            32,
            5
        );
    }


    /*
     * ==========================================
     * GAME OVER
     * ==========================================
     */
    renderGameOver(
        ctx,
        canvas
    ) {
        ctx.save();


        /*
         * Oscurecer gameplay sin ocultarlo.
         */
        ctx.fillStyle =
            "rgba(5, 3, 5, 0.76)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const width =
            Math.min(
                650,
                canvas.width *
                    0.54
            );

        const height =
            390;

        const x =
            canvas.width / 2 -
            width / 2;

        const y =
            canvas.height / 2 -
            height / 2;


        this.drawPanel(
            ctx,
            x,
            y,
            width,
            height
        );


        const centerX =
            canvas.width / 2;


        this.drawCross(
            ctx,
            centerX,
            y + 48
        );


        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "#a13f3b";

        ctx.font =
            "bold 45px Georgia";

        ctx.fillText(
            "LA FE HA CEDIDO",
            centerX,
            y + 125
        );


        ctx.fillStyle =
            "#b7a99b";

        ctx.font =
            "16px Georgia";

        ctx.fillText(
            "El penitente ha vuelto a sentir el peso de la tierra.",
            centerX,
            y + 165
        );


        /*
         * Separador.
         */
        const gradient =
            ctx.createLinearGradient(
                x + 75,
                0,
                x +
                    width -
                    75,
                0
            );

        gradient.addColorStop(
            0,
            "rgba(111, 63, 48, 0)"
        );

        gradient.addColorStop(
            0.5,
            "rgba(151, 81, 60, 0.85)"
        );

        gradient.addColorStop(
            1,
            "rgba(111, 63, 48, 0)"
        );

        ctx.strokeStyle =
            gradient;

        ctx.lineWidth =
            1;

        ctx.beginPath();

        ctx.moveTo(
            x + 75,
            y + 200
        );

        ctx.lineTo(
            x +
                width -
                75,
            y + 200
        );

        ctx.stroke();


        ctx.fillStyle =
            "#7f756d";

        ctx.font =
            "italic 14px Georgia";

        ctx.fillText(
            "La penitencia puede comenzar de nuevo.",
            centerX,
            y + 245
        );


        const pulse =
            0.70 +
            Math.sin(
                Date.now() *
                    0.004
            ) *
                0.30;


        ctx.strokeStyle =
            `rgba(187, 118, 78, ${pulse})`;

        ctx.lineWidth =
            1.5;

        ctx.strokeRect(
            centerX - 150,
            y + 286,
            300,
            48
        );


        ctx.fillStyle =
            "#e2c9aa";

        ctx.font =
            "bold 15px monospace";

        ctx.fillText(
            "[ R ]  REINTENTAR",
            centerX,
            y + 316
        );


        ctx.restore();
    }


    /*
     * Compatibilidad con versiones previas.
     */
    renderLevelFinished(
        ctx,
        canvas
    ) {
        ctx.save();


        ctx.fillStyle =
            "rgba(4, 3, 5, 0.68)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.textAlign =
            "center";

        ctx.fillStyle =
            "#d7c38c";

        ctx.font =
            "bold 36px Georgia";

        ctx.fillText(
            "RITO COMPLETADO",
            canvas.width / 2,
            canvas.height / 2
        );


        ctx.restore();
    }
}
