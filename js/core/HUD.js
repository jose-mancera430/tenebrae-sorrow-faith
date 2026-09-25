export class HUD {
    getSidebarWidth(
        ctx
    ) {
        return Math.min(
            390,
            Math.max(
                320,
                ctx.canvas.width *
                    0.25
            )
        );
    }


    render(
        ctx,
        player,
        currentWave,
        maxWaves,
        gameSeed,
        currentLevel,
        maxLevels,
        comboManager,
        scoreManager,
        fervorManager
    ) {
        if (
            !ctx ||
            !player
        ) {
            return;
        }


        const canvas =
            ctx.canvas;

        const sidebarWidth =
            this.getSidebarWidth(
                ctx
            );


        const levelId =
            currentLevel &&
            typeof currentLevel ===
                "object"
                ? currentLevel.id ?? 1
                : currentLevel ?? 1;


        const levelName =
            currentLevel &&
            typeof currentLevel ===
                "object"
                ? currentLevel.name ??
                    "Las Cruces de Ceniza"
                : "Las Cruces de Ceniza";


        const levelSubtitle =
            currentLevel &&
            typeof currentLevel ===
                "object"
                ? currentLevel.subtitle ?? ""
                : "";


        const score =
            scoreManager &&
            typeof scoreManager.getScore ===
                "function"
                ? scoreManager.getScore()
                : 0;


        const combo =
            comboManager &&
            typeof comboManager.getMultiplier ===
                "function"
                ? comboManager.getMultiplier()
                : 1;


        const fervor =
            fervorManager &&
            typeof fervorManager.getFervor ===
                "function"
                ? fervorManager.getFervor()
                : 0;


        const maxFervor =
            fervorManager &&
            typeof fervorManager.getMaxFervor ===
                "function"
                ? fervorManager.getMaxFervor()
                : 200;


        const accuracy =
            typeof player.getAccuracy ===
                "function"
                ? player.getAccuracy()
                : (
                    player.shotsFired > 0
                        ? (
                            player.shotsHit /
                            player.shotsFired
                        ) *
                            100
                        : 0
                );


        ctx.save();


        /*
         * =====================================
         * COLUMNA COMPLETA DEL HUD
         * =====================================
         */
        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                sidebarWidth,
                0
            );


        gradient.addColorStop(
            0,
            "rgba(5, 4, 6, 0.98)"
        );


        gradient.addColorStop(
            0.78,
            "rgba(14, 10, 12, 0.97)"
        );


        gradient.addColorStop(
            1,
            "rgba(23, 15, 13, 0.96)"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            sidebarWidth,
            canvas.height
        );


        /*
         * Separador vertical del área de juego.
         */
        ctx.fillStyle =
            "rgba(0, 0, 0, 0.45)";


        ctx.fillRect(
            sidebarWidth,
            0,
            14,
            canvas.height
        );


        const border =
            ctx.createLinearGradient(
                sidebarWidth - 4,
                0,
                sidebarWidth - 4,
                canvas.height
            );


        border.addColorStop(
            0,
            "#8e6836"
        );


        border.addColorStop(
            0.5,
            "#d0a556"
        );


        border.addColorStop(
            1,
            "#6f4b29"
        );


        ctx.fillStyle =
            border;


        ctx.fillRect(
            sidebarWidth - 4,
            0,
            4,
            canvas.height
        );


        ctx.fillStyle =
            "rgba(221, 187, 112, 0.22)";


        ctx.fillRect(
            sidebarWidth - 10,
            0,
            1,
            canvas.height
        );


        const padding =
            28;

        const contentWidth =
            sidebarWidth -
            padding * 2;


        /*
         * Cruz superior.
         */
        this.drawCross(
            ctx,
            padding + 4,
            31
        );


        ctx.textAlign =
            "left";


        ctx.fillStyle =
            "#e0c98d";


        ctx.font =
            "bold 21px Georgia";


        ctx.fillText(
            `NIVEL ${levelId}/${maxLevels}`,
            padding + 35,
            38
        );


        ctx.fillStyle =
            "#d4b56f";


        ctx.font =
            "bold 18px Georgia";


        this.fitText(
            ctx,
            levelName,
            padding,
            76,
            contentWidth,
            18
        );


        ctx.fillStyle =
            "#aaa198";


        ctx.font =
            "13px Georgia";


        this.fitText(
            ctx,
            levelSubtitle,
            padding,
            101,
            contentWidth,
            13
        );


        this.drawDivider(
            ctx,
            padding,
            sidebarWidth -
                padding,
            121
        );


        /*
         * OLEADA Y SCORE
         */
        ctx.fillStyle =
            "#d8cfba";


        ctx.font =
            "bold 17px Georgia";


        ctx.fillText(
            `OLEADA ${currentWave}/${maxWaves}`,
            padding,
            154
        );


        ctx.textAlign =
            "right";


        ctx.fillStyle =
            "#d8b45d";


        ctx.fillText(
            `PUNTOS ${score}`,
            sidebarWidth -
                padding,
            154
        );


        ctx.textAlign =
            "left";


        /*
         * VIDA
         */
        ctx.fillStyle =
            "#a79d90";


        ctx.font =
            "bold 12px monospace";


        ctx.fillText(
            "VIDA",
            padding,
            192
        );


        this.drawHealth(
            ctx,
            padding,
            207,
            contentWidth,
            player.health,
            player.maxHealth
        );


        /*
         * FERVOR
         */
        ctx.fillStyle =
            "#a79d90";


        ctx.fillText(
            `FERVOR ${fervor}/${maxFervor}`,
            padding,
            252
        );


        this.drawFervor(
            ctx,
            padding,
            269,
            contentWidth,
            fervorManager
        );


        this.drawDivider(
            ctx,
            padding,
            sidebarWidth -
                padding,
            334
        );


        /*
         * COMBO
         */
        ctx.fillStyle =
            "#dfc77f";


        ctx.font =
            "bold 25px Georgia";


        ctx.fillText(
            `COMBO  x${combo}`,
            padding,
            376
        );


        /*
         * ESTADÍSTICAS
         */
        const statY =
            422;


        this.drawMetric(
            ctx,
            padding,
            statY,
            "PRECISIÓN",
            `${accuracy.toFixed(1)}%`
        );


        this.drawMetric(
            ctx,
            padding,
            statY + 42,
            "BAJAS",
            `${player.enemiesDestroyed ?? 0}`
        );


        this.drawMetric(
            ctx,
            padding,
            statY + 84,
            "DISPAROS",
            `${player.shotsFired ?? 0}`
        );


        this.drawMetric(
            ctx,
            padding,
            statY + 126,
            "IMPACTOS",
            `${player.shotsHit ?? 0}`
        );


        /*
         * GUÍA DE FERVOR
         */
        this.drawDivider(
            ctx,
            padding,
            sidebarWidth -
                padding,
            statY + 166
        );


        ctx.fillStyle =
            "#8d8378";


        ctx.font =
            "bold 11px monospace";


        ctx.fillText(
            "FERVOR PASIVO",
            padding,
            statY + 194
        );


        ctx.fillStyle =
            "#b9aa8d";


        ctx.font =
            "12px Georgia";


        ctx.fillText(
            "I   Disparo doble",
            padding,
            statY + 220
        );


        ctx.fillText(
            "II  + Velocidad",
            padding,
            statY + 244
        );


        ctx.fillText(
            "III Disparo triple",
            padding,
            statY + 268
        );


        ctx.fillText(
            "IV  + Perforación",
            padding,
            statY + 292
        );


        /*
         * PIE DEL PANEL
         */
        const footerY =
            canvas.height -
            90;


        if (
            footerY >
            statY + 315
        ) {
            this.drawDivider(
                ctx,
                padding,
                sidebarWidth -
                    padding,
                footerY - 18
            );


            ctx.fillStyle =
                "#776f68";


            ctx.font =
                "11px monospace";


            ctx.fillText(
                "WASD  MOVER",
                padding,
                footerY + 6
            );


            ctx.fillText(
                "SHIFT DISPARAR",
                padding,
                footerY + 27
            );


            ctx.fillText(
                "E     FERVOR",
                padding,
                footerY + 48
            );


            ctx.fillStyle =
                "rgba(140, 130, 119, 0.50)";


            ctx.font =
                "10px monospace";


            ctx.fillText(
                `SEED ${gameSeed}`,
                padding,
                footerY + 71
            );
        }


        /*
         * Etiqueta de frontera.
         */
        ctx.save();


        ctx.translate(
            sidebarWidth - 17,
            canvas.height / 2
        );


        ctx.rotate(
            -Math.PI / 2
        );


        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "rgba(214, 178, 99, 0.40)";


        ctx.font =
            "10px monospace";


        ctx.fillText(
            "LÍMITE DEL ÁREA DE COMBATE",
            0,
            0
        );


        ctx.restore();


        ctx.restore();
    }


    fitText(
        ctx,
        text,
        x,
        y,
        maxWidth,
        initialSize
    ) {
        let size =
            initialSize;


        while (
            size >
                10 &&
            ctx.measureText(
                text
            ).width >
                maxWidth
        ) {
            size--;


            ctx.font =
                `bold ${size}px Georgia`;
        }


        ctx.fillText(
            text,
            x,
            y
        );
    }


    drawCross(
        ctx,
        x,
        y
    ) {
        ctx.fillStyle =
            "#9b7840";


        ctx.fillRect(
            x,
            y - 17,
            5,
            27
        );


        ctx.fillRect(
            x - 8,
            y - 8,
            21,
            5
        );
    }


    drawDivider(
        ctx,
        x1,
        x2,
        y
    ) {
        const line =
            ctx.createLinearGradient(
                x1,
                y,
                x2,
                y
            );


        line.addColorStop(
            0,
            "rgba(144, 95, 48, 0.20)"
        );


        line.addColorStop(
            0.5,
            "rgba(182, 131, 66, 0.85)"
        );


        line.addColorStop(
            1,
            "rgba(144, 95, 48, 0.20)"
        );


        ctx.strokeStyle =
            line;


        ctx.lineWidth =
            1;


        ctx.beginPath();


        ctx.moveTo(
            x1,
            y
        );


        ctx.lineTo(
            x2,
            y
        );


        ctx.stroke();
    }


    drawMetric(
        ctx,
        x,
        y,
        label,
        value
    ) {
        ctx.textAlign =
            "left";


        ctx.fillStyle =
            "#867d73";


        ctx.font =
            "11px monospace";


        ctx.fillText(
            label,
            x,
            y
        );


        ctx.fillStyle =
            "#d0c2a8";


        ctx.font =
            "bold 16px Georgia";


        ctx.fillText(
            value,
            x,
            y + 20
        );
    }


    drawHealth(
        ctx,
        x,
        y,
        width,
        health,
        maxHealth
    ) {
        const total =
            Math.max(
                1,
                maxHealth ||
                    1
            );


        const gap =
            7;


        const pipWidth =
            (
                width -
                gap *
                    (
                        total -
                        1
                    )
            ) /
            total;


        const pipHeight =
            13;


        for (
            let i = 0;
            i < total;
            i++
        ) {
            const px =
                x +
                i *
                    (
                        pipWidth +
                        gap
                    );


            ctx.fillStyle =
                "rgba(24, 12, 14, 0.95)";


            ctx.fillRect(
                px,
                y,
                pipWidth,
                pipHeight
            );


            ctx.strokeStyle =
                "#6f3f3e";


            ctx.strokeRect(
                px,
                y,
                pipWidth,
                pipHeight
            );


            if (
                i <
                health
            ) {
                const g =
                    ctx.createLinearGradient(
                        px,
                        y,
                        px +
                            pipWidth,
                        y
                    );


                g.addColorStop(
                    0,
                    "#78292c"
                );


                g.addColorStop(
                    1,
                    "#c15c53"
                );


                ctx.fillStyle =
                    g;


                ctx.fillRect(
                    px + 2,
                    y + 2,
                    pipWidth - 4,
                    pipHeight - 4
                );
            }
        }
    }


    drawFervor(
        ctx,
        x,
        y,
        width,
        fervorManager
    ) {
        const maxSegments =
            fervorManager &&
            typeof fervorManager.getMaxSegments ===
                "function"
                ? fervorManager.getMaxSegments()
                : 4;


        const fullSegments =
            fervorManager &&
            typeof fervorManager.getFullSegments ===
                "function"
                ? fervorManager.getFullSegments()
                : 0;


        const progress =
            fervorManager &&
            typeof fervorManager.getCurrentSegmentProgress ===
                "function"
                ? fervorManager.getCurrentSegmentProgress()
                : 0;


        const gap =
            8;


        const segmentWidth =
            (
                width -
                gap *
                    (
                        maxSegments -
                        1
                    )
            ) /
            maxSegments;


        const segmentHeight =
            13;


        const roman =
            [
                "I",
                "II",
                "III",
                "IV"
            ];


        for (
            let i = 0;
            i < maxSegments;
            i++
        ) {
            const sx =
                x +
                i *
                    (
                        segmentWidth +
                        gap
                    );


            ctx.fillStyle =
                "rgba(15, 11, 9, 0.96)";


            ctx.fillRect(
                sx,
                y,
                segmentWidth,
                segmentHeight
            );


            ctx.strokeStyle =
                "#72522c";


            ctx.strokeRect(
                sx,
                y,
                segmentWidth,
                segmentHeight
            );


            let fill =
                0;


            if (
                i <
                fullSegments
            ) {
                fill =
                    1;
            } else if (
                i ===
                fullSegments
            ) {
                fill =
                    progress;
            }


            if (
                fill >
                0
            ) {
                const g =
                    ctx.createLinearGradient(
                        sx,
                        y,
                        sx +
                            segmentWidth,
                        y
                    );


                g.addColorStop(
                    0,
                    "#84602e"
                );


                g.addColorStop(
                    1,
                    "#e0b65e"
                );


                ctx.fillStyle =
                    g;


                ctx.fillRect(
                    sx + 2,
                    y + 2,
                    (
                        segmentWidth -
                        4
                    ) *
                        fill,
                    segmentHeight -
                        4
                );
            }


            ctx.textAlign =
                "center";


            ctx.fillStyle =
                "#918573";


            ctx.font =
                "10px Georgia";


            ctx.fillText(
                roman[i] || "",
                sx +
                    segmentWidth /
                        2,
                y + 28
            );
        }


        ctx.textAlign =
            "left";
    }
}

