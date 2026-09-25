export class EffectManager {
    constructor() {
        this.impacts = [];
        this.bloodSplatters = [];
        this.bloodChunks = [];
    }

    createImpact(x, y) {
        const impact = {
            x: Math.round(x),
            y: Math.round(y),

            life: 0.12,
            maxLife: 0.12,

            frame: 0
        };

        this.impacts.push(
            impact
        );
    }

    createDestruction(x, y) {
        this.createBloodSplatter(
            x,
            y
        );

        this.createBloodChunks(
            x,
            y
        );
    }

    createBloodSplatter(x, y) {
        const splatter = {
            x: Math.round(x),
            y: Math.round(y),

            life: 0.7,
            maxLife: 0.7,

            pixels: []
        };

        /*
         * Mancha central grande.
         */
        this.addBloodBlock(
            splatter,
            -12,
            -8,
            24,
            16,
            "#65070d"
        );

        this.addBloodBlock(
            splatter,
            -8,
            -12,
            16,
            24,
            "#7f0b13"
        );

        this.addBloodBlock(
            splatter,
            -16,
            -4,
            32,
            8,
            "#4a0509"
        );

        /*
         * Fragmentos grandes alrededor.
         */
        const fragmentCount =
            10 +
            Math.floor(
                Math.random() * 6
            );

        for (
            let i = 0;
            i < fragmentCount;
            i++
        ) {
            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                12 +
                Math.random() *
                34;

            const offsetX =
                Math.round(
                    Math.cos(angle) *
                    distance
                );

            const offsetY =
                Math.round(
                    Math.sin(angle) *
                    distance
                );

            const width =
                4 +
                Math.floor(
                    Math.random() *
                    9
                );

            const height =
                3 +
                Math.floor(
                    Math.random() *
                    8
                );

            this.addBloodBlock(
                splatter,
                offsetX,
                offsetY,
                width,
                height,
                this.getBloodColor()
            );

            /*
             * Algunas extensiones
             * forman líneas de sangre.
             */
            if (
                Math.random() <
                0.55
            ) {
                const tailLength =
                    5 +
                    Math.floor(
                        Math.random() *
                        12
                    );

                this.addBloodBlock(
                    splatter,

                    offsetX +
                    Math.round(
                        Math.cos(angle) *
                        tailLength
                    ),

                    offsetY +
                    Math.round(
                        Math.sin(angle) *
                        tailLength
                    ),

                    Math.max(
                        2,
                        Math.floor(
                            width / 2
                        )
                    ),

                    Math.max(
                        2,
                        Math.floor(
                            height / 2
                        )
                    ),

                    this.getBloodColor()
                );
            }
        }

        /*
         * Salpicaduras largas.
         */
        const streakCount =
            5 +
            Math.floor(
                Math.random() * 4
            );

        for (
            let i = 0;
            i < streakCount;
            i++
        ) {
            const angle =
                Math.random() *
                Math.PI *
                2;

            const length =
                25 +
                Math.random() *
                40;

            const steps =
                3 +
                Math.floor(
                    Math.random() *
                    4
                );

            for (
                let step = 1;
                step <= steps;
                step++
            ) {
                const progress =
                    step / steps;

                const px =
                    Math.round(
                        Math.cos(angle) *
                        length *
                        progress
                    );

                const py =
                    Math.round(
                        Math.sin(angle) *
                        length *
                        progress
                    );

                const size =
                    Math.max(
                        2,
                        7 - step
                    );

                this.addBloodBlock(
                    splatter,
                    px,
                    py,
                    size,
                    size,
                    this.getBloodColor()
                );
            }
        }

        this.bloodSplatters.push(
            splatter
        );
    }

    addBloodBlock(
        splatter,
        offsetX,
        offsetY,
        width,
        height,
        color
    ) {
        splatter.pixels.push({
            offsetX,
            offsetY,
            width,
            height,
            color
        });
    }

    createBloodChunks(x, y) {
        const chunkCount =
            8 +
            Math.floor(
                Math.random() *
                5
            );

        for (
            let i = 0;
            i < chunkCount;
            i++
        ) {
            const angle =
                Math.random() *
                Math.PI *
                2;

            const speed =
                80 +
                Math.random() *
                160;

            const width =
                3 +
                Math.floor(
                    Math.random() *
                    6
                );

            const height =
                5 +
                Math.floor(
                    Math.random() *
                    10
                );

            this.bloodChunks.push({
                x:
                    Math.round(x),

                y:
                    Math.round(y),

                velocityX:
                    Math.cos(angle) *
                    speed,

                velocityY:
                    Math.sin(angle) *
                    speed -
                    70,

                gravity:
                    300 +
                    Math.random() *
                    120,

                life:
                    0.45 +
                    Math.random() *
                    0.35,

                maxLife: 0.8,

                width,
                height,

                color:
                    this.getBloodColor()
            });
        }
    }

    getBloodColor() {
        const value =
            Math.random();

        if (value < 0.25) {
            return "#280305";
        }

        if (value < 0.55) {
            return "#4a0509";
        }

        if (value < 0.82) {
            return "#72090f";
        }

        return "#98121b";
    }

    update(deltaTime) {
        /*
         * Impactos.
         */
        for (
            const impact
            of this.impacts
        ) {
            impact.life -=
                deltaTime;

            impact.frame++;
        }

        this.impacts =
            this.impacts.filter(
                impact =>
                    impact.life > 0
            );

        /*
         * Manchas.
         */
        for (
            const splatter
            of this.bloodSplatters
        ) {
            splatter.life -=
                deltaTime;
        }

        this.bloodSplatters =
            this.bloodSplatters.filter(
                splatter =>
                    splatter.life > 0
            );

        /*
         * Fragmentos móviles.
         */
        for (
            const chunk
            of this.bloodChunks
        ) {
            chunk.x +=
                chunk.velocityX *
                deltaTime;

            chunk.y +=
                chunk.velocityY *
                deltaTime;

            chunk.velocityY +=
                chunk.gravity *
                deltaTime;

            chunk.velocityX *=
                0.98;

            chunk.life -=
                deltaTime;
        }

        this.bloodChunks =
            this.bloodChunks.filter(
                chunk =>
                    chunk.life > 0
            );
    }

    render(ctx) {
        ctx.save();

        ctx.imageSmoothingEnabled =
            false;

        this.renderBloodSplatters(
            ctx
        );

        this.renderBloodChunks(
            ctx
        );

        this.renderImpacts(
            ctx
        );

        ctx.restore();
    }

    renderBloodSplatters(ctx) {
        for (
            const splatter
            of this.bloodSplatters
        ) {
            let alpha = 1;

            if (
                splatter.life <
                0.12
            ) {
                alpha =
                    splatter.life /
                    0.12;
            }

            ctx.globalAlpha =
                alpha;

            for (
                const pixel
                of splatter.pixels
            ) {
                ctx.fillStyle =
                    pixel.color;

                ctx.fillRect(
                    Math.round(
                        splatter.x +
                        pixel.offsetX
                    ),

                    Math.round(
                        splatter.y +
                        pixel.offsetY
                    ),

                    pixel.width,
                    pixel.height
                );
            }
        }

        ctx.globalAlpha = 1;
    }

    renderBloodChunks(ctx) {
        for (
            const chunk
            of this.bloodChunks
        ) {
            const x =
                Math.round(
                    chunk.x
                );

            const y =
                Math.round(
                    chunk.y
                );

            ctx.fillStyle =
                chunk.color;

            /*
             * Fragmento principal.
             */
            ctx.fillRect(
                x,
                y,
                chunk.width,
                chunk.height
            );

            /*
             * Cola de sangre.
             */
            if (
                chunk.velocityY >
                0
            ) {
                ctx.fillRect(
                    x +
                    Math.floor(
                        chunk.width /
                        3
                    ),

                    y -
                    Math.floor(
                        chunk.height /
                        2
                    ),

                    Math.max(
                        2,
                        Math.floor(
                            chunk.width /
                            2
                        )
                    ),

                    Math.max(
                        3,
                        Math.floor(
                            chunk.height /
                            2
                        )
                    )
                );
            }
        }
    }

    renderImpacts(ctx) {
        for (
            const impact
            of this.impacts
        ) {
            const x =
                impact.x;

            const y =
                impact.y;

            /*
             * Cruz pixelada de impacto.
             */
            ctx.fillStyle =
                "#e0bc68";

            ctx.fillRect(
                x - 2,
                y - 8,
                4,
                16
            );

            ctx.fillRect(
                x - 8,
                y - 2,
                16,
                4
            );

            ctx.fillStyle =
                "#fff0ae";

            ctx.fillRect(
                x - 1,
                y - 4,
                2,
                8
            );

            ctx.fillRect(
                x - 4,
                y - 1,
                8,
                2
            );
        }
    }

    reset() {
        this.impacts = [];

        this.bloodSplatters = [];

        this.bloodChunks = [];
    }
}