export class ParallaxBackground {
    constructor(canvas) {
        this.canvas = canvas;

        /*
         * =====================================
         * NIVEL ACTUAL
         * =====================================
         */
        this.currentLevel = 1;


        /*
         * =====================================
         * VELOCIDAD GENERAL DEL ESCENARIO
         * =====================================
         *
         * El fondo baja porque el jugador
         * avanza hacia arriba.
         */
        this.scrollSpeed = 70;


        /*
         * =====================================
         * CAPAS PARALLAX
         * =====================================
         */
        this.farAsh = [];
        this.middleAsh = [];
        this.nearAsh = [];


        /*
         * =====================================
         * ARQUITECTURA
         * =====================================
         */
        this.architectureSegments = [];


        /*
         * =====================================
         * TEMAS DE LOS 8 NIVELES
         * =====================================
         */
        this.themes = {
            1: {
                name:
                    "Atrio de los Penitentes",

                background:
                    "#050306",

                upper:
                    "#09050a",

                lower:
                    "#020203",

                wall:
                    "#100b11",

                wallDetail:
                    "#1c1218",

                accent:
                    "#512329",

                ashFar:
                    "#62564f",

                ashMiddle:
                    "#816b5e",

                ashNear:
                    "#a48a74"
            },

            2: {
                name:
                    "Claustro de las Llagas",

                background:
                    "#060404",

                upper:
                    "#0d0707",

                lower:
                    "#020202",

                wall:
                    "#170d0d",

                wallDetail:
                    "#2a1515",

                accent:
                    "#6d2828",

                ashFar:
                    "#6e554d",

                ashMiddle:
                    "#8e6659",

                ashNear:
                    "#b17c66"
            },

            3: {
                name:
                    "Nave de los Incorruptos",

                background:
                    "#030507",

                upper:
                    "#060b0e",

                lower:
                    "#020304",

                wall:
                    "#091116",

                wallDetail:
                    "#12222a",

                accent:
                    "#294452",

                ashFar:
                    "#50616a",

                ashMiddle:
                    "#69808b",

                ashNear:
                    "#8da1aa"
            },

            4: {
                name:
                    "Campanario de la Agonía",

                background:
                    "#060504",

                upper:
                    "#0b0906",

                lower:
                    "#020202",

                wall:
                    "#15110b",

                wallDetail:
                    "#2b2416",

                accent:
                    "#7b5c24",

                ashFar:
                    "#655d4d",

                ashMiddle:
                    "#88785c",

                ashNear:
                    "#b29a70"
            },

            5: {
                name:
                    "Cripta de los Rostros",

                background:
                    "#050407",

                upper:
                    "#09070c",

                lower:
                    "#020203",

                wall:
                    "#120d17",

                wallDetail:
                    "#23192c",

                accent:
                    "#503560",

                ashFar:
                    "#5d5464",

                ashMiddle:
                    "#786c81",

                ashNear:
                    "#9b8aa5"
            },

            6: {
                name:
                    "Altar de la Carne",

                background:
                    "#080303",

                upper:
                    "#100505",

                lower:
                    "#020101",

                wall:
                    "#1c0909",

                wallDetail:
                    "#341010",

                accent:
                    "#8b2525",

                ashFar:
                    "#704848",

                ashMiddle:
                    "#965454",

                ashNear:
                    "#be6969"
            },

            7: {
                name:
                    "Umbral del Milagro",

                background:
                    "#030304",

                upper:
                    "#070709",

                lower:
                    "#010102",

                wall:
                    "#0c0c10",

                wallDetail:
                    "#19191f",

                accent:
                    "#393943",

                ashFar:
                    "#55555d",

                ashMiddle:
                    "#707079",

                ashNear:
                    "#92929c"
            },

            8: {
                name:
                    "Calamidad",

                background:
                    "#020103",

                upper:
                    "#050106",

                lower:
                    "#000001",

                wall:
                    "#0b050d",

                wallDetail:
                    "#1c0921",

                accent:
                    "#740d29",

                ashFar:
                    "#654354",

                ashMiddle:
                    "#8a4861",

                ashNear:
                    "#b25572"
            }
        };


        this.createLayers();

        this.createArchitecture();
    }


    /*
     * =========================================
     * CAMBIAR NIVEL
     * =========================================
     */
    setLevel(levelNumber) {
        const numericLevel =
            Number(levelNumber);


        if (
            !this.themes[
                numericLevel
            ]
        ) {
            return;
        }


        this.currentLevel =
            numericLevel;


        /*
         * Aumentar ligeramente
         * sensación de avance.
         */
        this.scrollSpeed =
            65 +
            numericLevel *
                5;


        /*
         * Recolorear partículas.
         */
        this.refreshParticleColors();


        console.log(
            "AMBIENTACIÓN:",
            this.themes[
                this.currentLevel
            ].name
        );
    }


    /*
     * =========================================
     * TEMA ACTUAL
     * =========================================
     */
    getTheme() {
        return (
            this.themes[
                this.currentLevel
            ] ||
            this.themes[1]
        );
    }


    /*
     * =========================================
     * CREAR CAPAS
     * =========================================
     */
    createLayers() {
        this.createFarLayer();

        this.createMiddleLayer();

        this.createNearLayer();
    }


    /*
     * =========================================
     * CAPA LEJANA
     * =========================================
     */
    createFarLayer() {
        this.farAsh = [];


        for (
            let i = 0;
            i < 70;
            i++
        ) {
            this.farAsh.push({
                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                size:
                    Math.random() <
                    0.75
                        ? 1
                        : 2,

                speed:
                    12 +
                    Math.random() *
                        10,

                color:
                    this.getTheme()
                        .ashFar
            });
        }
    }


    /*
     * =========================================
     * CAPA MEDIA
     * =========================================
     */
    createMiddleLayer() {
        this.middleAsh = [];


        for (
            let i = 0;
            i < 42;
            i++
        ) {
            this.middleAsh.push({
                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                width:
                    Math.random() <
                    0.65
                        ? 2
                        : 3,

                height:
                    4 +
                    Math.floor(
                        Math.random() *
                            5
                    ),

                speed:
                    28 +
                    Math.random() *
                        20,

                color:
                    this.getTheme()
                        .ashMiddle
            });
        }
    }


    /*
     * =========================================
     * CAPA CERCANA
     * =========================================
     */
    createNearLayer() {
        this.nearAsh = [];


        for (
            let i = 0;
            i < 24;
            i++
        ) {
            this.nearAsh.push({
                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                width:
                    3 +
                    Math.floor(
                        Math.random() *
                            3
                    ),

                height:
                    6 +
                    Math.floor(
                        Math.random() *
                            8
                    ),

                speed:
                    70 +
                    Math.random() *
                        55,

                color:
                    this.getTheme()
                        .ashNear
            });
        }
    }


    /*
     * =========================================
     * RECOLOREAR PARTÍCULAS
     * =========================================
     */
    refreshParticleColors() {
        const theme =
            this.getTheme();


        for (
            const particle
            of this.farAsh
        ) {
            particle.color =
                theme.ashFar;
        }


        for (
            const particle
            of this.middleAsh
        ) {
            particle.color =
                theme.ashMiddle;
        }


        for (
            const particle
            of this.nearAsh
        ) {
            particle.color =
                theme.ashNear;
        }
    }


    /*
     * =========================================
     * ARQUITECTURA VERTICAL
     * =========================================
     */
    createArchitecture() {
        this.architectureSegments =
            [];


        const segmentHeight =
            260;


        /*
         * Creamos suficientes secciones
         * para llenar toda la pantalla
         * y algunas adicionales arriba.
         */
        for (
            let i = -2;
            i <
            Math.ceil(
                this.canvas.height /
                    segmentHeight
            ) +
                2;
            i++
        ) {
            this.architectureSegments
                .push({
                    y:
                        i *
                        segmentHeight,

                    height:
                        segmentHeight,

                    variant:
                        Math.floor(
                            Math.random() *
                                3
                        )
                });
        }
    }


    /*
     * =========================================
     * UPDATE GENERAL
     * =========================================
     */
    update(deltaTime) {
        this.updateFarLayer(
            deltaTime
        );

        this.updateMiddleLayer(
            deltaTime
        );

        this.updateNearLayer(
            deltaTime
        );

        this.updateArchitecture(
            deltaTime
        );
    }


    /*
     * =========================================
     * ARQUITECTURA BAJANDO
     * =========================================
     */
    updateArchitecture(
        deltaTime
    ) {
        const speed =
            this.scrollSpeed;


        let highestY =
            Infinity;


        for (
            const segment
            of this.architectureSegments
        ) {
            segment.y +=
                speed *
                deltaTime;


            if (
                segment.y <
                highestY
            ) {
                highestY =
                    segment.y;
            }
        }


        /*
         * Reciclar segmentos
         * cuando salen por abajo.
         */
        for (
            const segment
            of this.architectureSegments
        ) {
            if (
                segment.y >
                this.canvas.height +
                    segment.height
            ) {
                segment.y =
                    highestY -
                    segment.height;


                segment.variant =
                    Math.floor(
                        Math.random() *
                            3
                    );


                highestY =
                    segment.y;
            }
        }
    }


    /*
     * =========================================
     * UPDATE FAR
     * =========================================
     */
    updateFarLayer(
        deltaTime
    ) {
        for (
            const particle
            of this.farAsh
        ) {
            particle.y +=
                (
                    particle.speed +
                    this.scrollSpeed *
                        0.12
                ) *
                deltaTime;


            if (
                particle.y >
                this.canvas.height
            ) {
                particle.y =
                    -4;


                particle.x =
                    Math.random() *
                    this.canvas.width;
            }
        }
    }


    /*
     * =========================================
     * UPDATE MIDDLE
     * =========================================
     */
    updateMiddleLayer(
        deltaTime
    ) {
        for (
            const particle
            of this.middleAsh
        ) {
            particle.y +=
                (
                    particle.speed +
                    this.scrollSpeed *
                        0.28
                ) *
                deltaTime;


            particle.x +=
                Math.sin(
                    particle.y *
                        0.015
                ) *
                5 *
                deltaTime;


            if (
                particle.y >
                this.canvas.height
            ) {
                particle.y =
                    -10;


                particle.x =
                    Math.random() *
                    this.canvas.width;
            }
        }
    }


    /*
     * =========================================
     * UPDATE NEAR
     * =========================================
     */
    updateNearLayer(
        deltaTime
    ) {
        for (
            const particle
            of this.nearAsh
        ) {
            particle.y +=
                (
                    particle.speed +
                    this.scrollSpeed *
                        0.60
                ) *
                deltaTime;


            particle.x +=
                Math.sin(
                    particle.y *
                        0.02
                ) *
                8 *
                deltaTime;


            if (
                particle.y >
                this.canvas.height +
                    20
            ) {
                particle.y =
                    -20;


                particle.x =
                    Math.random() *
                    this.canvas.width;
            }
        }
    }


    /*
     * =========================================
     * RENDER GENERAL
     * =========================================
     */
    render(ctx) {
        ctx.save();


        ctx.imageSmoothingEnabled =
            false;


        this.renderBase(
            ctx
        );


        this.renderArchitecture(
            ctx
        );


        this.renderFarLayer(
            ctx
        );


        this.renderMiddleLayer(
            ctx
        );


        this.renderNearLayer(
            ctx
        );


        this.renderDarkEdges(
            ctx
        );


        ctx.restore();
    }


    /*
     * =========================================
     * BASE
     * =========================================
     */
    renderBase(
        ctx
    ) {
        const theme =
            this.getTheme();


        ctx.fillStyle =
            theme.background;


        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        /*
         * Zona superior.
         */
        ctx.fillStyle =
            theme.upper;


        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            Math.floor(
                this.canvas.height *
                    0.40
            )
        );


        /*
         * Parte inferior.
         */
        ctx.fillStyle =
            theme.lower;


        ctx.fillRect(
            0,
            Math.floor(
                this.canvas.height *
                    0.80
            ),
            this.canvas.width,
            Math.ceil(
                this.canvas.height *
                    0.20
            )
        );
    }


    /*
     * =========================================
     * ARQUITECTURA
     * =========================================
     */
    renderArchitecture(
        ctx
    ) {
        const theme =
            this.getTheme();


        const corridorWidth =
            Math.min(
                this.canvas.width *
                    0.72,
                900
            );


        const corridorX =
            (
                this.canvas.width -
                corridorWidth
            ) /
            2;


        /*
         * Piso central.
         */
        ctx.fillStyle =
            theme.wall;


        ctx.fillRect(
            corridorX,
            0,
            corridorWidth,
            this.canvas.height
        );


        /*
         * Muros laterales.
         */
        const sideWidth =
            Math.max(
                45,
                corridorX
            );


        ctx.fillStyle =
            theme.wallDetail;


        ctx.fillRect(
            0,
            0,
            sideWidth,
            this.canvas.height
        );


        ctx.fillRect(
            this.canvas.width -
                sideWidth,
            0,
            sideWidth,
            this.canvas.height
        );


        /*
         * =====================================
         * SEGMENTOS QUE BAJAN
         * =====================================
         */
        for (
            const segment
            of this.architectureSegments
        ) {
            this.renderArchitectureSegment(
                ctx,
                segment,
                corridorX,
                corridorWidth,
                sideWidth,
                theme
            );
        }
    }


    /*
     * =========================================
     * SEGMENTO ARQUITECTÓNICO
     * =========================================
     */
    renderArchitectureSegment(
        ctx,
        segment,
        corridorX,
        corridorWidth,
        sideWidth,
        theme
    ) {
        const y =
            Math.round(
                segment.y
            );


        /*
         * =====================================
         * LOSAS DEL PISO
         * =====================================
         */
        ctx.fillStyle =
            theme.wallDetail;


        ctx.fillRect(
            corridorX +
                12,
            y +
                20,
            corridorWidth -
                24,
            3
        );


        ctx.fillRect(
            corridorX +
                12,
            y +
                130,
            corridorWidth -
                24,
            2
        );


        /*
         * Línea central del camino.
         */
        ctx.fillStyle =
            theme.accent;


        ctx.fillRect(
            this.canvas.width /
                2 -
                2,
            y +
                25,
            4,
            85
        );


        /*
         * =====================================
         * PILARES IZQUIERDOS / DERECHOS
         * =====================================
         */
        const pillarWidth =
            18;


        const pillarHeight =
            105;


        ctx.fillStyle =
            theme.wallDetail;


        ctx.fillRect(
            sideWidth -
                pillarWidth -
                5,
            y +
                15,
            pillarWidth,
            pillarHeight
        );


        ctx.fillRect(
            this.canvas.width -
                sideWidth +
                5,
            y +
                15,
            pillarWidth,
            pillarHeight
        );


        /*
         * Bases.
         */
        ctx.fillStyle =
            theme.accent;


        ctx.fillRect(
            sideWidth -
                pillarWidth -
                10,
            y +
                112,
            pillarWidth +
                10,
            8
        );


        ctx.fillRect(
            this.canvas.width -
                sideWidth +
                5,
            y +
                112,
            pillarWidth +
                10,
            8
        );


        /*
         * =====================================
         * CRUCES
         * =====================================
         */
        if (
            segment.variant ===
            0 ||
            segment.variant ===
            2
        ) {
            this.renderCross(
                ctx,
                sideWidth /
                    2,
                y +
                    70,
                theme.accent
            );


            this.renderCross(
                ctx,
                this.canvas.width -
                    sideWidth /
                        2,
                y +
                    70,
                theme.accent
            );
        }


        /*
         * =====================================
         * VENTANAS GÓTICAS
         * =====================================
         */
        if (
            segment.variant ===
            1
        ) {
            this.renderGothicWindow(
                ctx,
                sideWidth /
                    2,
                y +
                    55,
                theme.accent
            );


            this.renderGothicWindow(
                ctx,
                this.canvas.width -
                    sideWidth /
                        2,
                y +
                    55,
                theme.accent
            );
        }


        /*
         * =====================================
         * SÍMBOLO CENTRAL OCASIONAL
         * =====================================
         */
        if (
            segment.variant ===
            2
        ) {
            ctx.strokeStyle =
                theme.accent;


            ctx.lineWidth =
                2;


            ctx.beginPath();


            ctx.arc(
                this.canvas.width /
                    2,
                y +
                    175,
                28,
                0,
                Math.PI *
                    2
            );


            ctx.stroke();


            this.renderCross(
                ctx,
                this.canvas.width /
                    2,
                y +
                    175,
                theme.accent
            );
        }
    }


    /*
     * =========================================
     * CRUZ
     * =========================================
     */
    renderCross(
        ctx,
        centerX,
        centerY,
        color
    ) {
        ctx.fillStyle =
            color;


        ctx.fillRect(
            centerX - 3,
            centerY - 18,
            6,
            36
        );


        ctx.fillRect(
            centerX - 11,
            centerY - 6,
            22,
            6
        );
    }


    /*
     * =========================================
     * VENTANA GÓTICA
     * =========================================
     */
    renderGothicWindow(
        ctx,
        centerX,
        centerY,
        color
    ) {
        ctx.fillStyle =
            color;


        ctx.fillRect(
            centerX - 7,
            centerY,
            14,
            30
        );


        /*
         * Punta escalonada.
         */
        ctx.fillRect(
            centerX - 5,
            centerY - 5,
            10,
            5
        );


        ctx.fillRect(
            centerX - 3,
            centerY - 10,
            6,
            5
        );
    }


    /*
     * =========================================
     * FAR PARTICLES
     * =========================================
     */
    renderFarLayer(
        ctx
    ) {
        for (
            const particle
            of this.farAsh
        ) {
            ctx.fillStyle =
                particle.color;


            ctx.fillRect(
                Math.round(
                    particle.x
                ),
                Math.round(
                    particle.y
                ),
                particle.size,
                particle.size
            );
        }
    }


    /*
     * =========================================
     * MIDDLE PARTICLES
     * =========================================
     */
    renderMiddleLayer(
        ctx
    ) {
        for (
            const particle
            of this.middleAsh
        ) {
            const x =
                Math.round(
                    particle.x
                );


            const y =
                Math.round(
                    particle.y
                );


            ctx.fillStyle =
                particle.color;


            ctx.fillRect(
                x,
                y,
                particle.width,
                particle.height
            );


            /*
             * Cola.
             */
            ctx.fillStyle =
                this.getTheme()
                    .wallDetail;


            ctx.fillRect(
                x,
                y -
                    particle.height,
                Math.max(
                    1,
                    particle.width -
                        1
                ),
                Math.max(
                    2,
                    Math.floor(
                        particle.height /
                            2
                    )
                )
            );
        }
    }


    /*
     * =========================================
     * NEAR PARTICLES
     * =========================================
     */
    renderNearLayer(
        ctx
    ) {
        for (
            const particle
            of this.nearAsh
        ) {
            const x =
                Math.round(
                    particle.x
                );


            const y =
                Math.round(
                    particle.y
                );


            ctx.fillStyle =
                particle.color;


            ctx.fillRect(
                x,
                y,
                particle.width,
                particle.height
            );


            ctx.fillStyle =
                this.getTheme()
                    .accent;


            ctx.fillRect(
                x +
                    Math.floor(
                        particle.width /
                            2
                    ),

                y -
                    Math.floor(
                        particle.height /
                            2
                    ),

                Math.max(
                    1,
                    particle.width -
                        1
                ),

                Math.max(
                    2,
                    Math.floor(
                        particle.height /
                            2
                    )
                )
            );
        }
    }


    /*
     * =========================================
     * BORDES OSCUROS
     * =========================================
     */
    renderDarkEdges(
        ctx
    ) {
        const width =
            Math.max(
                40,
                this.canvas.width *
                    0.08
            );


        ctx.fillStyle =
            "rgba(0, 0, 0, 0.36)";


        ctx.fillRect(
            0,
            0,
            width,
            this.canvas.height
        );


        ctx.fillRect(
            this.canvas.width -
                width,
            0,
            width,
            this.canvas.height
        );
    }
}