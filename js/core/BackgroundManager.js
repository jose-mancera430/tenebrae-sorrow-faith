export class BackgroundManager {
    constructor(canvas) {
        this.canvas =
            canvas;


        /*
         * =====================================
         * NIVEL
         * =====================================
         */
        this.currentLevel =
            1;


        /*
         * =====================================
         * IMÁGENES
         * =====================================
         */
        this.backgroundImages =
            {};


        /*
         * =====================================
         * SCROLL DEL FONDO REAL
         * =====================================
         *
         * El fondo se desplaza hacia abajo.
         * Esto hace sentir que el jugador
         * asciende por el escenario.
         */
        this.imageScroll =
            0;


        this.imageScrollSpeed =
            38;


        /*
         * =====================================
         * PARALLAX
         * =====================================
         */
        this.scrollFar =
            0;

        this.scrollMid =
            0;

        this.scrollNear =
            0;

        this.scrollForeground =
            0;


        /*
         * =====================================
         * CENIZA
         * =====================================
         */
        this.ashParticles =
            this.createAshParticles(
                70
            );


        /*
         * =====================================
         * TEMAS FALLBACK
         * =====================================
         *
         * Estos seguirán funcionando para
         * niveles sin fondo ilustrado.
         */
        this.levelThemes = {
            1: {
                name:
                    "Atrio de los Penitentes",

                sky:
                    "#08060c",

                haze:
                    "#120d19",

                far:
                    "#1a1322",

                mid:
                    "#23172c",

                near:
                    "#2f1d33",

                accent:
                    "#6e2430",

                light:
                    "#b79a62",

                ember:
                    "#d8c28e"
            },

            2: {
                name:
                    "Claustro de las Llagas",

                sky:
                    "#09050c",

                haze:
                    "#140b14",

                far:
                    "#1d1020",

                mid:
                    "#261329",

                near:
                    "#321734",

                accent:
                    "#7e1f2f",

                light:
                    "#b69a69",

                ember:
                    "#d3b68f"
            },

            3: {
                name:
                    "Nave de los Incorruptos",

                sky:
                    "#07070a",

                haze:
                    "#101018",

                far:
                    "#171923",

                mid:
                    "#1f2230",

                near:
                    "#2b2b38",

                accent:
                    "#6d2a39",

                light:
                    "#c6b27d",

                ember:
                    "#ddd0a5"
            },

            4: {
                name:
                    "Campanario de la Agonía",

                sky:
                    "#06050a",

                haze:
                    "#120d18",

                far:
                    "#171321",

                mid:
                    "#21182c",

                near:
                    "#2b2037",

                accent:
                    "#8a6a34",

                light:
                    "#cfb57f",

                ember:
                    "#efe0b0"
            },

            5: {
                name:
                    "Cripta de los Rostros",

                sky:
                    "#060607",

                haze:
                    "#111012",

                far:
                    "#18171b",

                mid:
                    "#211d23",

                near:
                    "#2c252c",

                accent:
                    "#6b3131",

                light:
                    "#bfa77a",

                ember:
                    "#d4bf9f"
            },

            6: {
                name:
                    "Santuario de Mercurio",

                sky:
                    "#05070a",

                haze:
                    "#0c1118",

                far:
                    "#121a22",

                mid:
                    "#17242d",

                near:
                    "#1d3138",

                accent:
                    "#68858e",

                light:
                    "#b8c7ca",

                ember:
                    "#d4e0df"
            },

            7: {
                name:
                    "Umbral del Lienzo",

                sky:
                    "#080406",

                haze:
                    "#14080c",

                far:
                    "#210c13",

                mid:
                    "#31121b",

                near:
                    "#471824",

                accent:
                    "#b13844",

                light:
                    "#d8b381",

                ember:
                    "#f0d2aa"
            },

            8: {
                name:
                    "Calamidad",

                sky:
                    "#040204",

                haze:
                    "#120508",

                far:
                    "#22070d",

                mid:
                    "#370b13",

                near:
                    "#57101b",

                accent:
                    "#d33b4b",

                light:
                    "#f0d098",

                ember:
                    "#ffe2b4"
            }
        };
    }


    /*
     * =========================================
     * RECIBIR IMÁGENES
     * =========================================
     */
    setBackgroundImages(
        backgroundImages = {}
    ) {
        this.backgroundImages =
            backgroundImages;


        console.log(
            "BACKGROUND MANAGER:",
            "fondos recibidos",
            backgroundImages
        );
    }


    /*
     * =========================================
     * CAMBIAR NIVEL
     * =========================================
     */
    setLevel(level) {
        this.currentLevel =
            Math.max(
                1,
                Math.min(
                    8,
                    Number(level)
                )
            );


        /*
         * Reiniciar recorrido del fondo.
         *
         * Empezamos desde la parte inferior
         * de la imagen.
         */
        this.imageScroll =
            0;


        console.log(
            "ESCENARIO:",
            this.currentLevel,
            "-",
            this.getTheme().name
        );
    }


    /*
     * =========================================
     * TEMA
     * =========================================
     */
    getTheme() {
        return (
            this.levelThemes[
                this.currentLevel
            ] ||
            this.levelThemes[1]
        );
    }


    /*
     * =========================================
     * OBTENER FONDO REAL
     * =========================================
     */
    getCurrentBackgroundImage() {
        return (
            this.backgroundImages[
                this.currentLevel
            ] ||
            null
        );
    }


    /*
     * =========================================
     * PARTÍCULAS
     * =========================================
     */
    createAshParticles(
        amount
    ) {
        const particles =
            [];


        for (
            let i = 0;
            i < amount;
            i++
        ) {
            particles.push({
                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                size:
                    Math.random() <
                    0.70
                        ? 2
                        : 3,

                speed:
                    15 +
                    Math.random() *
                        35,

                drift:
                    -8 +
                    Math.random() *
                        16
            });
        }


        return particles;
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
         * =====================================
         * FONDO ILUSTRADO
         * =====================================
         */
        const background =
            this.getCurrentBackgroundImage();


        if (
            background
        ) {
            this.imageScroll +=
                this.imageScrollSpeed *
                deltaTime;
        }


        /*
         * =====================================
         * PARALLAX
         * =====================================
         */
        this.scrollFar +=
            10 *
            deltaTime;


        this.scrollMid +=
            22 *
            deltaTime;


        this.scrollNear +=
            38 *
            deltaTime;


        this.scrollForeground +=
            60 *
            deltaTime;


        /*
         * =====================================
         * CENIZA
         * =====================================
         */
        for (
            const particle
            of this.ashParticles
        ) {
            particle.y +=
                particle.speed *
                deltaTime;


            particle.x +=
                particle.drift *
                deltaTime;


            if (
                particle.y >
                this.canvas.height +
                    10
            ) {
                particle.y =
                    -10;


                particle.x =
                    Math.random() *
                    this.canvas.width;
            }


            if (
                particle.x <
                -10
            ) {
                particle.x =
                    this.canvas.width +
                    10;
            }


            if (
                particle.x >
                this.canvas.width +
                    10
            ) {
                particle.x =
                    -10;
            }
        }
    }


    /*
     * =========================================
     * RENDER
     * =========================================
     */
    render(
        ctx
    ) {
        ctx.save();


        ctx.imageSmoothingEnabled =
            true;


        const background =
            this.getCurrentBackgroundImage();


        /*
         * =====================================
         * FONDO REAL
         * =====================================
         */
        if (
            background &&
            background.complete &&
            background.naturalWidth > 0
        ) {
            this.renderIllustratedBackground(
                ctx,
                background
            );
        } else {
            /*
             * Si todavía no existe una
             * ilustración para este nivel.
             */
            this.renderProceduralFallback(
                ctx
            );
        }


        /*
         * =====================================
         * CAPAS ATMOSFÉRICAS
         * =====================================
         */
        this.renderDepthMist(
            ctx
        );


        this.renderAsh(
            ctx
        );


        this.renderForeground(
            ctx
        );


        ctx.restore();
    }


    /*
     * =========================================
     * FONDO ILUSTRADO VERTICAL
     * =========================================
     */
    renderIllustratedBackground(
        ctx,
        image
    ) {
        /*
         * Queremos cubrir TODO el ancho
         * del canvas conservando proporciones.
         */
        const scale =
            this.canvas.width /
            image.naturalWidth;


        const drawWidth =
            this.canvas.width;


        const drawHeight =
            image.naturalHeight *
            scale;


        /*
         * Diferencia entre la altura del fondo
         * y la pantalla.
         */
        const maxTravel =
            Math.max(
                0,
                drawHeight -
                    this.canvas.height
            );


        /*
         * imageScroll aumenta continuamente.
         *
         * Para crear la sensación de subir,
         * recorremos la ilustración desde
         * abajo hacia arriba.
         */
        let travel =
            this.imageScroll;


        /*
         * Cuando llegamos al final,
         * mantenemos el escenario vivo
         * con un recorrido suave inverso.
         *
         * Esto evita un corte brusco.
         */
        if (
            maxTravel > 0
        ) {
            const cycle =
                maxTravel *
                2;


            const cyclePosition =
                travel %
                cycle;


            if (
                cyclePosition <=
                maxTravel
            ) {
                travel =
                    cyclePosition;
            } else {
                travel =
                    cycle -
                    cyclePosition;
            }
        } else {
            travel =
                0;
        }


        /*
         * Empezar mostrando la zona inferior.
         */
        const drawY =
            -maxTravel +
            travel;


        /*
         * Base negra por seguridad.
         */
        ctx.fillStyle =
            "#020203";


        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        /*
         * Dibujar escenario.
         */
        ctx.drawImage(
            image,
            0,
            drawY,
            drawWidth,
            drawHeight
        );
    }


    /*
     * =========================================
     * FALLBACK PROCEDURAL
     * =========================================
     */
    renderProceduralFallback(
        ctx
    ) {
        const theme =
            this.getTheme();


        /*
         * Fondo.
         */
        ctx.fillStyle =
            theme.sky;


        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        /*
         * Zona media.
         */
        ctx.fillStyle =
            theme.haze;


        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height *
                0.55
        );


        /*
         * Torres lejanas.
         */
        this.renderFallbackTowers(
            ctx,
            theme
        );


        /*
         * Columnas.
         */
        this.renderFallbackColumns(
            ctx,
            theme
        );
    }


    /*
     * =========================================
     * TORRES FALLBACK
     * =========================================
     */
    renderFallbackTowers(
        ctx,
        theme
    ) {
        const towerWidth =
            90;


        const towerHeight =
            200;


        const spacing =
            85;


        const offset =
            this.scrollFar %
            250;


        for (
            let x = 20;
            x <
                this.canvas.width;
            x +=
                towerWidth +
                spacing
        ) {
            for (
                let y =
                    -250 +
                    offset;
                y <
                    this.canvas.height +
                        250;
                y +=
                    250
            ) {
                ctx.fillStyle =
                    theme.far;


                ctx.fillRect(
                    x,
                    y + 30,
                    towerWidth,
                    towerHeight -
                        30
                );


                /*
                 * Punta.
                 */
                ctx.fillRect(
                    x + 20,
                    y + 10,
                    towerWidth - 40,
                    30
                );


                /*
                 * Cruz.
                 */
                ctx.fillStyle =
                    theme.accent;


                ctx.fillRect(
                    x +
                        towerWidth /
                            2 -
                        2,
                    y,
                    4,
                    20
                );


                ctx.fillRect(
                    x +
                        towerWidth /
                            2 -
                        8,
                    y + 6,
                    16,
                    4
                );
            }
        }
    }


    /*
     * =========================================
     * COLUMNAS FALLBACK
     * =========================================
     */
    renderFallbackColumns(
        ctx,
        theme
    ) {
        const offset =
            this.scrollMid %
            180;


        for (
            let y =
                -180 +
                offset;
            y <
                this.canvas.height +
                    180;
            y +=
                180
        ) {
            ctx.fillStyle =
                theme.mid;


            /*
             * Izquierda.
             */
            ctx.fillRect(
                35,
                y,
                30,
                130
            );


            /*
             * Derecha.
             */
            ctx.fillRect(
                this.canvas.width -
                    65,
                y,
                30,
                130
            );


            ctx.fillStyle =
                theme.light;


            ctx.fillRect(
                27,
                y + 5,
                46,
                8
            );


            ctx.fillRect(
                this.canvas.width -
                    73,
                y + 5,
                46,
                8
            );
        }
    }


    /*
     * =========================================
     * NIEBLA / PROFUNDIDAD
     * =========================================
     */
    renderDepthMist(
        ctx
    ) {
        /*
         * Oscurecer ligeramente bordes
         * para mejorar lectura del centro.
         */
        const edgeWidth =
            Math.max(
                50,
                this.canvas.width *
                    0.09
            );


        ctx.fillStyle =
            "rgba(0, 0, 0, 0.18)";


        ctx.fillRect(
            0,
            0,
            edgeWidth,
            this.canvas.height
        );


        ctx.fillRect(
            this.canvas.width -
                edgeWidth,
            0,
            edgeWidth,
            this.canvas.height
        );


        /*
         * Niebla ligera superior.
         */
        ctx.fillStyle =
            "rgba(210, 205, 195, 0.025)";


        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height *
                0.45
        );
    }


    /*
     * =========================================
     * CENIZA
     * =========================================
     */
    renderAsh(
        ctx
    ) {
        const theme =
            this.getTheme();


        ctx.fillStyle =
            theme.ember;


        for (
            const particle
            of this.ashParticles
        ) {
            /*
             * Partículas más transparentes
             * para no tapar balas.
             */
            ctx.globalAlpha =
                0.45;


            ctx.fillRect(
                Math.round(
                    particle.x
                ),

                Math.round(
                    particle.y
                ),

                particle.size,

                particle.size +
                    1
            );
        }


        ctx.globalAlpha =
            1;
    }


    /*
     * =========================================
     * FOREGROUND
     * =========================================
     */
    renderForeground(
        ctx
    ) {
        const theme =
            this.getTheme();


        const offset =
            this.scrollForeground %
            300;


        /*
         * Dos cadenas cercanas.
         *
         * Se mueven más rápido que el
         * fondo para aumentar profundidad.
         */
        this.renderChain(
            ctx,
            45,
            -300 +
                offset,
            theme
        );


        this.renderChain(
            ctx,
            this.canvas.width -
                48,
            -150 +
                offset,
            theme
        );
    }


    /*
     * =========================================
     * CADENA
     * =========================================
     */
    renderChain(
        ctx,
        x,
        startY,
        theme
    ) {
        ctx.fillStyle =
            "rgba(20, 15, 16, 0.72)";


        for (
            let y =
                startY;
            y <
                this.canvas.height +
                    300;
            y +=
                18
        ) {
            ctx.fillRect(
                x,
                y,
                4,
                11
            );


            ctx.fillRect(
                x - 2,
                y + 11,
                8,
                3
            );
        }


        /*
         * Detalle metálico ocasional.
         */
        ctx.fillStyle =
            theme.light;


        ctx.globalAlpha =
            0.20;


        for (
            let y =
                startY;
            y <
                this.canvas.height +
                    300;
            y +=
                90
        ) {
            ctx.fillRect(
                x + 1,
                y,
                1,
                8
            );
        }


        ctx.globalAlpha =
            1;
    }
}