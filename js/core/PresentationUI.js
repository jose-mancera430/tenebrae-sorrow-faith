export class PresentationUI {
    constructor(
        playerSprites = {}
    ) {
        this.state =
            "menu";

        this.selectedCharacter =
            0;

        this.playerSprites =
            playerSprites || {};

        this.previousKeys = {};


        /*
         * Datos de transición de nivel.
         */
        this.levelIntroData =
            null;

        this.levelSummaryData =
            null;


        this.characters = [
            {
                id:
                    "relicario",

                name:
                    "EL SILENTE DE BRONCE",

                title:
                    "El Relicario",

                role:
                    "Tanque / Fervor",

                health:
                    8,

                speed:
                    300,

                attack:
                    "Bronce y Ceniza",

                ability:
                    "Ritos del Relicario",

                description:
                    "Resistente y equilibrado. Domina el Botafumeiro, la ceniza y las campanas.",

                available:
                    true
            },

            {
                id:
                    "apostol",

                name:
                    "EL ERMITAÑO LLAGADO",

                title:
                    "El Apóstol Incorrupto",

                role:
                    "Místico / Control",

                health:
                    7,

                speed:
                    220,

                attack:
                    "Mercurio Inquisitorial",

                ability:
                    "Sello de Mercurio",

                description:
                    "Canaliza mercurio ritual y controla amplias zonas del campo de batalla.",

                available:
                    true
            },

            {
                id:
                    "velo",

                name:
                    "EL EJECUTOR DE PLATA",

                title:
                    "El Velo Inquisitorial",

                role:
                    "Filo / Velocidad",

                health:
                    6,

                speed:
                    430,

                attack:
                    "Dagas de Exvoto",

                ability:
                    "Tormenta de Filos",

                description:
                    "Extremadamente veloz. Convierte movilidad y precisión en daño brutal.",

                available:
                    true
            }
        ];
    }


    /*
     * ==========================================
     * ESTADOS
     * ==========================================
     */

    isMenu() {
        return (
            this.state ===
            "menu"
        );
    }


    isCharacterSelect() {
        return (
            this.state ===
            "characterSelect"
        );
    }


    isPlaying() {
        return (
            this.state ===
            "playing"
        );
    }


    isPaused() {
        return (
            this.state ===
            "paused"
        );
    }


    isLevelIntro() {
        return (
            this.state ===
            "levelIntro"
        );
    }


    isLevelSummary() {
        return (
            this.state ===
            "levelSummary"
        );
    }


    isVictory() {
        return (
            this.state ===
            "victory"
        );
    }


    showMenu() {
        this.state =
            "menu";
    }


    showCharacterSelect() {
        this.state =
            "characterSelect";
    }


    showLevelIntro(
        level,
        maxLevels = 8
    ) {
        this.levelIntroData = {
            id:
                level?.id ??
                1,

            name:
                level?.name ??
                "Las Cruces de Ceniza",

            subtitle:
                level?.subtitle ??
                "",

            maxLevels:
                maxLevels
        };


        this.state =
            "levelIntro";
    }


    showLevelSummary(
        summary
    ) {
        this.levelSummaryData =
            summary ||
            {};


        this.state =
            "levelSummary";
    }


    startPlaying() {
        this.state =
            "playing";
    }


    showVictory() {
        this.state =
            "victory";
    }


    togglePause() {
        if (
            this.state ===
            "playing"
        ) {
            this.state =
                "paused";

            return;
        }


        if (
            this.state ===
            "paused"
        ) {
            this.state =
                "playing";
        }
    }


    /*
     * ==========================================
     * PERSONAJES
     * ==========================================
     */

    moveCharacterSelection(
        direction
    ) {
        const total =
            this.characters.length;

        this.selectedCharacter +=
            direction;


        if (
            this.selectedCharacter <
            0
        ) {
            this.selectedCharacter =
                total - 1;
        }


        if (
            this.selectedCharacter >=
            total
        ) {
            this.selectedCharacter =
                0;
        }
    }


    getSelectedCharacter() {
        return (
            this.characters[
                this.selectedCharacter
            ]
        );
    }


    getCharacterSprite(
        characterId
    ) {
        if (
            !this.playerSprites
        ) {
            return null;
        }


        return (
            this.playerSprites[
                characterId
            ] ||
            null
        );
    }


    /*
     * ==========================================
     * INPUT
     * ==========================================
     */

    wasPressed(
        input,
        code
    ) {
        const pressed =
            input.isPressed(
                code
            );

        const previous =
            this.previousKeys[
                code
            ] ||
            false;

        this.previousKeys[
            code
        ] =
            pressed;

        return (
            pressed &&
            !previous
        );
    }


    update(
        input
    ) {
        /*
         * MENÚ.
         */
        if (
            this.state ===
            "menu"
        ) {
            if (
                this.wasPressed(
                    input,
                    "Enter"
                ) ||
                this.wasPressed(
                    input,
                    "Space"
                )
            ) {
                this.showCharacterSelect();
            }


            return null;
        }


        /*
         * SELECCIÓN.
         */
        if (
            this.state ===
            "characterSelect"
        ) {
            if (
                this.wasPressed(
                    input,
                    "KeyA"
                ) ||
                this.wasPressed(
                    input,
                    "ArrowLeft"
                )
            ) {
                this.moveCharacterSelection(
                    -1
                );
            }


            if (
                this.wasPressed(
                    input,
                    "KeyD"
                ) ||
                this.wasPressed(
                    input,
                    "ArrowRight"
                )
            ) {
                this.moveCharacterSelection(
                    1
                );
            }


            if (
                this.wasPressed(
                    input,
                    "Escape"
                )
            ) {
                this.showMenu();

                return null;
            }


            if (
                this.wasPressed(
                    input,
                    "Enter"
                ) ||
                this.wasPressed(
                    input,
                    "Space"
                )
            ) {
                const character =
                    this.getSelectedCharacter();


                if (
                    character &&
                    character.available
                ) {
                    return {
                        type:
                            "START_GAME",

                        character:
                            character.id
                    };
                }
            }


            return null;
        }


        /*
         * INTRO DE NIVEL.
         */
        if (
            this.state ===
            "levelIntro"
        ) {
            if (
                this.wasPressed(
                    input,
                    "Enter"
                ) ||
                this.wasPressed(
                    input,
                    "Space"
                )
            ) {
                return {
                    type:
                        "START_LEVEL"
                };
            }


            return null;
        }


        /*
         * RESUMEN DE NIVEL.
         */
        if (
            this.state ===
            "levelSummary"
        ) {
            if (
                this.wasPressed(
                    input,
                    "Enter"
                ) ||
                this.wasPressed(
                    input,
                    "Space"
                )
            ) {
                return {
                    type:
                        "CONTINUE_LEVEL",

                    summary:
                        this.levelSummaryData
                };
            }


            return null;
        }


        /*
         * JUGANDO / PAUSA.
         */
        if (
            this.state ===
                "playing" ||
            this.state ===
                "paused"
        ) {
            if (
                this.wasPressed(
                    input,
                    "Escape"
                )
            ) {
                this.togglePause();


                return {
                    type:
                        "PAUSE_CHANGED"
                };
            }
        }


        /*
         * VICTORIA.
         */
        if (
            this.state ===
            "victory"
        ) {
            if (
                this.wasPressed(
                    input,
                    "KeyR"
                )
            ) {
                this.showMenu();


                return {
                    type:
                        "RETURN_MENU"
                };
            }
        }


        return null;
    }


    /*
     * ==========================================
     * HELPERS VISUALES
     * ==========================================
     */

    renderOverlay(
        ctx,
        canvas,
        opacity = 0.72
    ) {
        ctx.save();

        ctx.fillStyle =
            `rgba(4, 3, 5, ${opacity})`;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.restore();
    }


    drawPanel(
        ctx,
        x,
        y,
        width,
        height,
        selected = false
    ) {
        ctx.save();


        ctx.fillStyle =
            "rgba(0, 0, 0, 0.36)";

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
            selected
                ? "rgba(63, 47, 31, 0.90)"
                : "rgba(20, 16, 19, 0.88)"
        );

        gradient.addColorStop(
            1,
            selected
                ? "rgba(24, 17, 14, 0.92)"
                : "rgba(7, 6, 8, 0.94)"
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
            selected
                ? "#c4a261"
                : "#564b43";

        ctx.lineWidth =
            selected
                ? 3
                : 1.5;

        ctx.strokeRect(
            x,
            y,
            width,
            height
        );


        ctx.strokeStyle =
            selected
                ? "rgba(235, 210, 150, 0.36)"
                : "rgba(145, 125, 104, 0.16)";

        ctx.lineWidth =
            1;

        ctx.strokeRect(
            x + 7,
            y + 7,
            width - 14,
            height - 14
        );


        ctx.restore();
    }


    drawDivider(
        ctx,
        x1,
        x2,
        y
    ) {
        const gradient =
            ctx.createLinearGradient(
                x1,
                y,
                x2,
                y
            );

        gradient.addColorStop(
            0,
            "rgba(121, 82, 52, 0)"
        );

        gradient.addColorStop(
            0.5,
            "rgba(177, 126, 69, 0.85)"
        );

        gradient.addColorStop(
            1,
            "rgba(121, 82, 52, 0)"
        );


        ctx.strokeStyle =
            gradient;

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


    drawCross(
        ctx,
        centerX,
        centerY,
        scale = 1
    ) {
        ctx.fillStyle =
            "#94713d";

        ctx.fillRect(
            centerX - 3 * scale,
            centerY - 20 * scale,
            6 * scale,
            40 * scale
        );

        ctx.fillRect(
            centerX - 13 * scale,
            centerY - 7 * scale,
            26 * scale,
            5 * scale
        );
    }


    drawStatBar(
        ctx,
        x,
        y,
        width,
        label,
        valueText,
        normalized,
        selected = false
    ) {
        ctx.textAlign =
            "left";

        ctx.fillStyle =
            "#a39a8d";

        ctx.font =
            "bold 11px monospace";

        ctx.fillText(
            label,
            x,
            y
        );


        ctx.textAlign =
            "right";

        ctx.fillStyle =
            "#c7b99b";

        ctx.fillText(
            valueText,
            x + width,
            y
        );


        ctx.fillStyle =
            "rgba(25, 20, 20, 0.95)";

        ctx.fillRect(
            x,
            y + 8,
            width,
            7
        );


        ctx.strokeStyle =
            "#4e433a";

        ctx.lineWidth =
            1;

        ctx.strokeRect(
            x,
            y + 8,
            width,
            7
        );


        const fill =
            Math.max(
                0,
                Math.min(
                    1,
                    normalized
                )
            );


        const barGradient =
            ctx.createLinearGradient(
                x,
                y,
                x + width,
                y
            );

        barGradient.addColorStop(
            0,
            selected
                ? "#8c672f"
                : "#6f4c2f"
        );

        barGradient.addColorStop(
            1,
            selected
                ? "#d7b35f"
                : "#a78653"
        );


        ctx.fillStyle =
            barGradient;

        ctx.fillRect(
            x + 1,
            y + 9,
            (
                width - 2
            ) *
                fill,
            5
        );
    }


    drawSprite(
        ctx,
        sprite,
        centerX,
        centerY,
        maxWidth,
        maxHeight
    ) {
        if (
            !sprite ||
            !sprite.complete ||
            !sprite.naturalWidth ||
            !sprite.naturalHeight
        ) {
            this.drawCross(
                ctx,
                centerX,
                centerY,
                1.4
            );

            return;
        }


        const ratio =
            Math.min(
                maxWidth /
                    sprite.naturalWidth,
                maxHeight /
                    sprite.naturalHeight
            );

        const width =
            sprite.naturalWidth *
            ratio;

        const height =
            sprite.naturalHeight *
            ratio;


        ctx.imageSmoothingEnabled =
            false;

        ctx.drawImage(
            sprite,
            centerX -
                width / 2,
            centerY -
                height / 2,
            width,
            height
        );
    }


    /*
     * ==========================================
     * MENÚ
     * ==========================================
     */

    renderMenu(
        ctx,
        canvas
    ) {
        ctx.save();


        const vignette =
            ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                100,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.72
            );

        vignette.addColorStop(
            0,
            "rgba(0, 0, 0, 0.06)"
        );

        vignette.addColorStop(
            0.58,
            "rgba(0, 0, 0, 0.30)"
        );

        vignette.addColorStop(
            1,
            "rgba(0, 0, 0, 0.82)"
        );


        ctx.fillStyle =
            vignette;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const panelWidth =
            Math.min(
                820,
                canvas.width *
                    0.62
            );

        const panelHeight =
            Math.min(
                500,
                canvas.height *
                    0.74
            );

        const panelX =
            canvas.width / 2 -
            panelWidth / 2;

        const panelY =
            canvas.height / 2 -
            panelHeight / 2;


        this.drawPanel(
            ctx,
            panelX,
            panelY,
            panelWidth,
            panelHeight,
            true
        );


        const centerX =
            canvas.width / 2;


        /*
         * Adorno superior.
         */
        this.drawDivider(
            ctx,
            panelX + 45,
            centerX - 55,
            panelY + 38
        );

        this.drawDivider(
            ctx,
            centerX + 55,
            panelX +
                panelWidth -
                45,
            panelY + 38
        );

        this.drawCross(
            ctx,
            centerX,
            panelY + 38,
            0.9
        );


        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "rgba(0, 0, 0, 0.75)";

        ctx.font =
            "bold 68px Georgia";

        ctx.fillText(
            "TENEBRAE",
            centerX + 3,
            panelY + 135
        );


        ctx.fillStyle =
            "#dfc487";

        ctx.fillText(
            "TENEBRAE",
            centerX,
            panelY + 131
        );


        this.drawDivider(
            ctx,
            centerX - 210,
            centerX + 210,
            panelY + 155
        );


        ctx.fillStyle =
            "#922d2d";

        ctx.font =
            "bold 29px Georgia";

        ctx.fillText(
            "SORROW & FAITH",
            centerX,
            panelY + 198
        );


        ctx.fillStyle =
            "#b0a79b";

        ctx.font =
            "16px Georgia";

        ctx.fillText(
            "LAS CRUCES DE CENIZA",
            centerX,
            panelY + 230
        );


        this.drawCross(
            ctx,
            centerX,
            panelY + 281,
            1.2
        );


        /*
         * Botón.
         */
        const pulse =
            0.72 +
            Math.sin(
                Date.now() *
                    0.004
            ) *
                0.28;

        const buttonWidth =
            320;

        const buttonHeight =
            54;

        const buttonX =
            centerX -
            buttonWidth / 2;

        const buttonY =
            panelY + 330;


        ctx.fillStyle =
            "rgba(12, 9, 9, 0.86)";

        ctx.fillRect(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight
        );


        ctx.strokeStyle =
            `rgba(218, 182, 100, ${pulse})`;

        ctx.lineWidth =
            2;

        ctx.strokeRect(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight
        );


        ctx.fillStyle =
            "#ead8ae";

        ctx.font =
            "bold 22px Georgia";

        ctx.fillText(
            "[ ENTER ]  JUGAR",
            centerX,
            buttonY + 35
        );


        ctx.fillStyle =
            "#948b80";

        ctx.font =
            "13px monospace";

        ctx.fillText(
            "WASD  MOVER   •   SHIFT  DISPARAR   •   E  FERVOR   •   ESC  PAUSA",
            centerX,
            panelY +
                panelHeight -
                60
        );


        ctx.fillStyle =
            "#6f6962";

        ctx.font =
            "italic 12px Georgia";

        ctx.fillText(
            "Aquel que entrega completamente su peso a la fe, deja de pertenecer a la tierra.",
            centerX,
            panelY +
                panelHeight -
                28
        );


        ctx.restore();
    }


    /*
     * ==========================================
     * SELECCIÓN DE PERSONAJE
     * ==========================================
     */

    renderCharacterSelect(
        ctx,
        canvas
    ) {
        this.renderOverlay(
            ctx,
            canvas,
            0.68
        );


        ctx.save();

        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "#dbc78d";

        ctx.font =
            "bold 33px Georgia";

        ctx.fillText(
            "ESCOGE AL PENITENTE",
            canvas.width / 2,
            55
        );


        ctx.fillStyle =
            "#8f877e";

        ctx.font =
            "13px monospace";

        ctx.fillText(
            "A / D  O  ← / →  PARA SELECCIONAR",
            canvas.width / 2,
            82
        );


        const margin =
            28;

        const spacing =
            24;

        const cardWidth =
            (
                canvas.width -
                margin * 2 -
                spacing * 2
            ) /
            3;

        const cardHeight =
            Math.min(
                470,
                canvas.height - 180
            );

        const startX =
            margin;

        const y =
            105;


        for (
            let i = 0;
            i <
            this.characters.length;
            i++
        ) {
            const character =
                this.characters[i];

            const x =
                startX +
                i *
                    (
                        cardWidth +
                        spacing
                    );

            const selected =
                i ===
                this.selectedCharacter;


            this.drawPanel(
                ctx,
                x,
                y,
                cardWidth,
                cardHeight,
                selected
            );


            /*
             * Línea roja ritual.
             */
            ctx.strokeStyle =
                selected
                    ? "#a63c37"
                    : "#5e2c2e";

            ctx.lineWidth =
                2;

            ctx.beginPath();

            ctx.moveTo(
                x + 28,
                y + 18
            );

            ctx.lineTo(
                x +
                    cardWidth -
                    28,
                y + 18
            );

            ctx.stroke();


            ctx.fillStyle =
                selected
                    ? "#ead9ad"
                    : "#c7bcb0";

            ctx.font =
                "bold 14px Georgia";

            ctx.fillText(
                character.name,
                x +
                    cardWidth / 2,
                y + 43
            );


            /*
             * Sprite.
             */
            const sprite =
                this.getCharacterSprite(
                    character.id
                );


            if (
                selected
            ) {
                ctx.fillStyle =
                    "rgba(170, 130, 73, 0.13)";

                ctx.fillRect(
                    x +
                        cardWidth / 2 -
                        70,
                    y + 62,
                    140,
                    125
                );
            }


            this.drawSprite(
                ctx,
                sprite,
                x +
                    cardWidth / 2,
                y + 125,
                125,
                145
            );


            /*
             * Separador.
             */
            this.drawDivider(
                ctx,
                x + 30,
                x +
                    cardWidth -
                    30,
                y + 205
            );


            ctx.fillStyle =
                selected
                    ? "#e2c98e"
                    : "#c5b7a0";

            ctx.font =
                "bold 19px Georgia";

            ctx.fillText(
                character.title,
                x +
                    cardWidth / 2,
                y + 232
            );


            ctx.fillStyle =
                "#9b9287";

            ctx.font =
                "12px monospace";

            ctx.fillText(
                character.role,
                x +
                    cardWidth / 2,
                y + 252
            );


            /*
             * Stats.
             */
            const statX =
                x + 28;

            const statWidth =
                cardWidth - 56;


            this.drawStatBar(
                ctx,
                statX,
                y + 278,
                statWidth,
                "VIDA",
                `${character.health}`,
                character.health /
                    8,
                selected
            );


            this.drawStatBar(
                ctx,
                statX,
                y + 314,
                statWidth,
                "VELOCIDAD",
                `${character.speed}`,
                character.speed /
                    430,
                selected
            );


            ctx.textAlign =
                "left";

            ctx.fillStyle =
                "#8f877c";

            ctx.font =
                "11px monospace";

            ctx.fillText(
                "ATAQUE",
                statX,
                y + 357
            );


            ctx.fillStyle =
                "#d2c3a5";

            ctx.font =
                "13px Georgia";

            ctx.fillText(
                character.attack,
                statX,
                y + 375
            );


            ctx.fillStyle =
                "#8f877c";

            ctx.font =
                "11px monospace";

            ctx.fillText(
                "E — HABILIDAD",
                statX,
                y + 401
            );


            ctx.fillStyle =
                selected
                    ? "#d5b763"
                    : "#c2b6a2";

            ctx.font =
                "bold 13px Georgia";

            ctx.fillText(
                character.ability,
                statX,
                y + 420
            );


            ctx.textAlign =
                "center";

            ctx.fillStyle =
                selected
                    ? "#d8bd71"
                    : "#9d8959";

            ctx.font =
                "bold 11px monospace";

            ctx.fillText(
                selected
                    ? "◆  SELECCIONADO  ◆"
                    : "DISPONIBLE",
                x +
                    cardWidth / 2,
                y +
                    cardHeight -
                    18
            );
        }


        const selected =
            this.getSelectedCharacter();


        ctx.fillStyle =
            "#b8ab98";

        ctx.font =
            "14px Georgia";

        ctx.fillText(
            selected.description,
            canvas.width / 2,
            canvas.height - 69
        );


        ctx.fillStyle =
            "#ead8ae";

        ctx.font =
            "bold 15px monospace";

        ctx.fillText(
            "[ ENTER ]  CONFIRMAR",
            canvas.width / 2,
            canvas.height - 31
        );


        ctx.textAlign =
            "left";

        ctx.fillStyle =
            "#756f68";

        ctx.font =
            "11px monospace";

        ctx.fillText(
            "ESC  VOLVER",
            28,
            canvas.height - 31
        );


        ctx.restore();
    }


    /*
     * ==========================================
     * PAUSA
     * ==========================================
     */

    renderPause(
        ctx,
        canvas
    ) {
        this.renderOverlay(
            ctx,
            canvas,
            0.67
        );


        ctx.save();


        const width =
            Math.min(
                560,
                canvas.width *
                    0.48
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
            height,
            true
        );


        const centerX =
            canvas.width / 2;


        this.drawCross(
            ctx,
            centerX,
            y + 42,
            0.85
        );


        ctx.textAlign =
            "center";

        ctx.fillStyle =
            "#dfc98e";

        ctx.font =
            "bold 42px Georgia";

        ctx.fillText(
            "PAUSA",
            centerX,
            y + 112
        );


        this.drawDivider(
            ctx,
            x + 70,
            x +
                width -
                70,
            y + 137
        );


        ctx.fillStyle =
            "#a9a095";

        ctx.font =
            "14px monospace";


        ctx.fillText(
            "WASD   MOVIMIENTO",
            centerX,
            y + 182
        );


        ctx.fillText(
            "SHIFT   DISPARO CONTINUO",
            centerX,
            y + 215
        );


        ctx.fillText(
            "E   HABILIDAD DE FERVOR",
            centerX,
            y + 248
        );


        ctx.fillStyle =
            "#786e63";

        ctx.font =
            "italic 13px Georgia";

        ctx.fillText(
            "La penitencia no termina. Solo permanece suspendida.",
            centerX,
            y + 292
        );


        const pulse =
            0.72 +
            Math.sin(
                Date.now() *
                    0.004
            ) *
                0.28;


        ctx.strokeStyle =
            `rgba(215, 180, 103, ${pulse})`;

        ctx.lineWidth =
            1.5;

        ctx.strokeRect(
            centerX - 135,
            y + 320,
            270,
            42
        );


        ctx.fillStyle =
            "#e8d6aa";

        ctx.font =
            "bold 15px monospace";

        ctx.fillText(
            "[ ESC ]  CONTINUAR",
            centerX,
            y + 347
        );


        ctx.restore();
    }


    /*
     * ==========================================
     * INTRO DE NIVEL
     * ==========================================
     */
    renderLevelIntro(
        ctx,
        canvas
    ) {
        const data =
            this.levelIntroData ||
            {};


        this.renderOverlay(
            ctx,
            canvas,
            0.74
        );


        ctx.save();


        const width =
            Math.min(
                700,
                canvas.width *
                    0.58
            );


        const height =
            385;


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
            height,
            true
        );


        const centerX =
            canvas.width / 2;


        this.drawCross(
            ctx,
            centerX,
            y + 44,
            0.9
        );


        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "#9a8357";


        ctx.font =
            "bold 15px monospace";


        ctx.fillText(
            `NIVEL ${data.id ?? 1}/${data.maxLevels ?? 8}`,
            centerX,
            y + 105
        );


        ctx.fillStyle =
            "#e1c986";


        ctx.font =
            "bold 35px Georgia";


        ctx.fillText(
            data.name ||
                "Las Cruces de Ceniza",
            centerX,
            y + 158
        );


        if (
            data.subtitle
        ) {
            ctx.fillStyle =
                "#aaa095";


            ctx.font =
                "italic 17px Georgia";


            ctx.fillText(
                data.subtitle,
                centerX,
                y + 198
            );
        }


        this.drawDivider(
            ctx,
            x + 80,
            x +
                width -
                80,
            y + 230
        );


        ctx.fillStyle =
            "#81786e";


        ctx.font =
            "italic 14px Georgia";


        ctx.fillText(
            "La penitencia continúa.",
            centerX,
            y + 274
        );


        ctx.fillStyle =
            "#ead8ae";


        ctx.font =
            "bold 16px monospace";


        ctx.fillText(
            "[ ENTER ]  INICIAR NIVEL",
            centerX,
            y + 327
        );


        ctx.restore();
    }


    /*
     * ==========================================
     * RESUMEN DE NIVEL
     * ==========================================
     */
    renderLevelSummary(
        ctx,
        canvas
    ) {
        const data =
            this.levelSummaryData ||
            {};


        this.renderOverlay(
            ctx,
            canvas,
            0.80
        );


        ctx.save();


        const width =
            Math.min(
                760,
                canvas.width *
                    0.62
            );


        const height =
            535;


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
            height,
            true
        );


        const centerX =
            canvas.width / 2;


        this.drawCross(
            ctx,
            centerX,
            y + 38,
            0.85
        );


        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "#dfc487";


        ctx.font =
            "bold 34px Georgia";


        ctx.fillText(
            `NIVEL ${data.levelId ?? 1} COMPLETADO`,
            centerX,
            y + 103
        );


        ctx.fillStyle =
            "#918574";


        ctx.font =
            "15px Georgia";


        ctx.fillText(
            data.levelName ||
                "",
            centerX,
            y + 136
        );


        this.drawDivider(
            ctx,
            x + 70,
            x +
                width -
                70,
            y + 160
        );


        const leftX =
            centerX -
            190;


        const rightX =
            centerX +
            50;


        const statY =
            y + 210;


        ctx.textAlign =
            "left";


        ctx.fillStyle =
            "#857c71";


        ctx.font =
            "12px monospace";


        ctx.fillText(
            "PUNTOS DEL NIVEL",
            leftX,
            statY
        );

        ctx.fillText(
            "BAJAS",
            rightX,
            statY
        );

        ctx.fillText(
            "PRECISIÓN",
            leftX,
            statY + 72
        );

        ctx.fillText(
            "DISPAROS / IMPACTOS",
            rightX,
            statY + 72
        );

        ctx.fillText(
            "VIDA RESTANTE",
            leftX,
            statY + 144
        );

        ctx.fillText(
            "FERVOR",
            rightX,
            statY + 144
        );


        ctx.fillStyle =
            "#e0cfaa";


        ctx.font =
            "bold 23px Georgia";


        ctx.fillText(
            `${data.score ?? 0}`,
            leftX,
            statY + 31
        );

        ctx.fillText(
            `${data.kills ?? 0}`,
            rightX,
            statY + 31
        );


        const accuracy =
            Number.isFinite(
                data.accuracy
            )
                ? data.accuracy
                : 0;


        ctx.fillText(
            `${accuracy.toFixed(1)}%`,
            leftX,
            statY + 103
        );

        ctx.fillText(
            `${data.shots ?? 0} / ${data.hits ?? 0}`,
            rightX,
            statY + 103
        );

        ctx.fillText(
            `${data.health ?? 0}/${data.maxHealth ?? 0}`,
            leftX,
            statY + 175
        );

        ctx.fillText(
            `${data.fervor ?? 0}/200`,
            rightX,
            statY + 175
        );


        this.drawDivider(
            ctx,
            x + 70,
            x +
                width -
                70,
            y + 407
        );


        ctx.textAlign =
            "center";


        ctx.fillStyle =
            "#837a70";


        ctx.font =
            "italic 14px Georgia";


        ctx.fillText(
            data.isFinalLevel
                ? "El peregrinaje alcanza su juicio final."
                : "La senda permanece abierta.",
            centerX,
            y + 443
        );


        ctx.fillStyle =
            "#ead8ae";


        ctx.font =
            "bold 16px monospace";


        ctx.fillText(
            data.isFinalLevel
                ? "[ ENTER ]  VER RESULTADO FINAL"
                : `[ ENTER ]  CONTINUAR AL NIVEL ${(data.levelId ?? 1) + 1}`,
            centerX,
            y + 493
        );


        ctx.restore();
    }


    /*
     * ==========================================
     * VICTORIA
     * ==========================================
     */

    renderVictory(
        ctx,
        canvas,
        score = 0,
        accuracy = 0
    ) {
        this.renderOverlay(
            ctx,
            canvas,
            0.84
        );


        ctx.save();


        const width =
            Math.min(
                740,
                canvas.width *
                    0.60
            );

        const height =
            470;

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
            height,
            true
        );


        const centerX =
            canvas.width / 2;


        this.drawCross(
            ctx,
            centerX,
            y + 42,
            1
        );


        ctx.textAlign =
            "center";

        ctx.fillStyle =
            "#dfc487";

        ctx.font =
            "bold 44px Georgia";

        ctx.fillText(
            "CALAMIDAD PURGADA",
            centerX,
            y + 123
        );


        ctx.fillStyle =
            "#922e2e";

        ctx.font =
            "bold 20px Georgia";

        ctx.fillText(
            "EL MILAGRO NEGRO HA CAÍDO",
            centerX,
            y + 162
        );


        this.drawDivider(
            ctx,
            x + 80,
            x +
                width -
                80,
            y + 194
        );


        /*
         * Caja estadísticas.
         */
        const statWidth =
            400;

        const statX =
            centerX -
            statWidth / 2;

        const statY =
            y + 222;


        ctx.fillStyle =
            "rgba(9, 8, 9, 0.74)";

        ctx.fillRect(
            statX,
            statY,
            statWidth,
            105
        );


        ctx.strokeStyle =
            "#5f4c32";

        ctx.lineWidth =
            1;

        ctx.strokeRect(
            statX,
            statY,
            statWidth,
            105
        );


        ctx.fillStyle =
            "#c9bda9";

        ctx.font =
            "15px monospace";

        ctx.fillText(
            `PUNTUACIÓN FINAL   ${score}`,
            centerX,
            statY + 37
        );


        const safeAccuracy =
            Number.isFinite(
                accuracy
            )
                ? accuracy
                : 0;


        ctx.fillText(
            `PRECISIÓN   ${safeAccuracy.toFixed(1)}%`,
            centerX,
            statY + 72
        );


        ctx.fillStyle =
            "#827a70";

        ctx.font =
            "italic 14px Georgia";

        ctx.fillText(
            "Las Cruces de Ceniza guardan silencio una vez más.",
            centerX,
            y + 365
        );


        ctx.fillStyle =
            "#ead8ae";

        ctx.font =
            "bold 15px monospace";

        ctx.fillText(
            "[ R ]  VOLVER AL MENÚ",
            centerX,
            y + 417
        );


        ctx.restore();
    }


    /*
     * ==========================================
     * RENDER GENERAL
     * ==========================================
     */

    render(
        ctx,
        canvas,
        score = 0,
        accuracy = 0
    ) {
        if (
            this.state ===
            "menu"
        ) {
            this.renderMenu(
                ctx,
                canvas
            );

            return;
        }


        if (
            this.state ===
            "characterSelect"
        ) {
            this.renderCharacterSelect(
                ctx,
                canvas
            );

            return;
        }


        if (
            this.state ===
            "levelIntro"
        ) {
            this.renderLevelIntro(
                ctx,
                canvas
            );

            return;
        }


        if (
            this.state ===
            "levelSummary"
        ) {
            this.renderLevelSummary(
                ctx,
                canvas
            );

            return;
        }


        if (
            this.state ===
            "paused"
        ) {
            this.renderPause(
                ctx,
                canvas
            );

            return;
        }


        if (
            this.state ===
            "victory"
        ) {
            this.renderVictory(
                ctx,
                canvas,
                score,
                accuracy
            );
        }
    }
}


