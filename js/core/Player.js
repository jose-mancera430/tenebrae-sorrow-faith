import { DamageableEntity } from "./DamageableEntity.js";

export class Player extends DamageableEntity {
    constructor(
        canvas,
        input,
        sprite = null,
        powerUpManager = null
    ) {
        const width = 50;
        const height = 50;

        const x =
            canvas.width / 2 -
            width / 2;

        const y =
            canvas.height / 2 -
            height / 2;

        const maxHealth = 3;

        super(
            x,
            y,
            width,
            height,
            maxHealth
        );

        /*
         * =====================================
         * REFERENCIAS PRINCIPALES
         * =====================================
         */
        this.canvas = canvas;

        this.input = input;

        this.sprite = sprite;

        this.powerUpManager =
            powerUpManager;


        /*
         * =====================================
         * TAMAÑO VISUAL
         * =====================================
         *
         * IMPORTANTE:
         *
         * La hitbox sigue siendo:
         *
         * 50 x 50
         *
         * Estos valores solamente afectan
         * cómo se dibuja el sprite.
         */
        this.renderWidth = 90;

        this.renderHeight = 130;


        /*
         * =====================================
         * ESTADÍSTICAS BASE
         * =====================================
         */
        this.baseSpeed = 300;

        this.defaultSpeed = 300;

        this.defaultMaxHealth = 3;


        /*
         * =====================================
         * DISPARO
         * =====================================
         */
        this.fireCooldown = 0.15;

        this.fireTimer = 0;

        this.wantsToShoot = false;


        /*
         * =====================================
         * ESTADÍSTICAS DE PARTIDA
         * =====================================
         */
        this.shotsFired = 0;

        this.shotsHit = 0;

        this.enemiesDestroyed = 0;


        /*
         * =====================================
         * INVULNERABILIDAD TRAS IMPACTO
         * =====================================
         *
         * Evita perder varias vidas en el mismo
         * instante por proyectiles superpuestos.
         */
        this.invulnerabilityDuration =
            0.75;

        this.invulnerabilityTimer =
            0;
    }


    /*
     * =========================================
     * LÍMITE IZQUIERDO DEL ÁREA DE JUEGO
     * =========================================
     *
     * El panel del HUD ocupa una columna
     * completa a la izquierda. El jugador no
     * puede entrar en esa zona.
     */
    getPlayfieldLeft() {
        return Math.min(
            390,
            Math.max(
                320,
                this.canvas.width *
                    0.25
            )
        ) + 18;
    }


    /*
     * =========================================
     * POWER-UP MANAGER
     * =========================================
     */
    setPowerUpManager(
        powerUpManager
    ) {
        this.powerUpManager =
            powerUpManager;
    }


    /*
     * =========================================
     * CAMBIAR SPRITE
     * =========================================
     *
     * Este método nos permitirá cambiar
     * visualmente de personaje cuando
     * el jugador seleccione:
     *
     * - Relicario
     * - Apóstol
     * - Velo
     *
     * SIN crear otro Player.
     * =========================================
     */
    setSprite(
        sprite,
        renderWidth = 90,
        renderHeight = 130
    ) {
        this.sprite = sprite;

        this.renderWidth =
            renderWidth;

        this.renderHeight =
            renderHeight;


        console.log(
            "SPRITE DEL JUGADOR CAMBIADO:",
            renderWidth,
            "x",
            renderHeight
        );
    }


    /*
     * =========================================
     * CONFIGURAR ESTADÍSTICAS
     * =========================================
     */
    setCharacterStats(
        {
            maxHealth = 3,
            speed = 300
        } = {}
    ) {
        /*
         * Vida máxima.
         */
        this.maxHealth =
            maxHealth;


        /*
         * Al cambiar de personaje
         * recuperamos la vida completa.
         */
        this.health =
            maxHealth;


        /*
         * Velocidad.
         */
        this.baseSpeed =
            speed;


        console.log(
            "PLAYER STATS →",
            "Vida:",
            this.health +
                "/" +
                this.maxHealth,
            "| Velocidad:",
            this.baseSpeed
        );
    }


    /*
     * =========================================
     * RESET
     * =========================================
     */
    reset() {
        /*
         * Reactivar entidad.
         */
        this.activate();


        /*
         * Restaurar vida.
         */
        this.health =
            this.maxHealth;


        /*
         * Volver al centro.
         */
        const playfieldLeft =
            this.getPlayfieldLeft();

        this.x =
            playfieldLeft +
            (
                this.canvas.width -
                playfieldLeft
            ) / 2 -
            this.width / 2;


        this.y =
            this.canvas.height / 2 -
            this.height / 2;


        /*
         * Reiniciar disparo.
         */
        this.fireTimer = 0;

        this.wantsToShoot =
            false;


        /*
         * Reiniciar estadísticas.
         */
        this.shotsFired = 0;

        this.shotsHit = 0;

        this.enemiesDestroyed = 0;


        this.invulnerabilityTimer =
            0;
    }


    /*
     * =========================================
     * DAÑO CON TIEMPO DE GRACIA
     * =========================================
     */
    takeDamage(
        amount = 1
    ) {
        if (
            this.invulnerabilityTimer >
            0
        ) {
            return false;
        }


        super.takeDamage(
            amount
        );


        this.invulnerabilityTimer =
            this.invulnerabilityDuration;


        return true;
    }


    /*
     * =========================================
     * VELOCIDAD ACTUAL
     * =========================================
     */
    getCurrentSpeed() {
        let multiplier = 1;


        /*
         * Aplicar power-up de velocidad
         * si existe.
         */
        if (
            this.powerUpManager
        ) {
            multiplier =
                this.powerUpManager
                    .getSpeedMultiplier();
        }


        return (
            this.baseSpeed *
            multiplier
        );
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
         * Tiempo de gracia después de daño.
         */
        this.invulnerabilityTimer =
            Math.max(
                0,
                this.invulnerabilityTimer -
                    deltaTime
            );


        /*
         * Reducir temporizador
         * del disparo.
         */
        this.fireTimer -=
            deltaTime;


        this.wantsToShoot =
            false;


        /*
         * =====================================
         * MOVIMIENTO
         * =====================================
         */
        let moveX = 0;

        let moveY = 0;


        /*
         * IZQUIERDA
         */
        if (
            this.input.isPressed(
                "KeyA"
            )
        ) {
            moveX -= 1;
        }


        /*
         * DERECHA
         */
        if (
            this.input.isPressed(
                "KeyD"
            )
        ) {
            moveX += 1;
        }


        /*
         * ARRIBA
         */
        if (
            this.input.isPressed(
                "KeyW"
            )
        ) {
            moveY -= 1;
        }


        /*
         * ABAJO
         */
        if (
            this.input.isPressed(
                "KeyS"
            )
        ) {
            moveY += 1;
        }


        /*
         * =====================================
         * DISPARO
         * =====================================
         */
        if (
            (
                this.input.isPressed(
                    "ShiftLeft"
                ) ||
                this.input.isPressed(
                    "ShiftRight"
                )
            ) &&
            this.fireTimer <= 0
        ) {
            this.wantsToShoot =
                true;


            this.shotsFired++;


            this.fireTimer =
                this.fireCooldown;
        }


        /*
         * =====================================
         * NORMALIZAR DIAGONAL
         * =====================================
         *
         * Evita que el jugador vaya
         * más rápido en diagonal.
         */
        if (
            moveX !== 0 &&
            moveY !== 0
        ) {
            const factor =
                1 /
                Math.sqrt(2);


            moveX *=
                factor;


            moveY *=
                factor;
        }


        /*
         * =====================================
         * VELOCIDAD
         * =====================================
         */
        const currentSpeed =
            this.getCurrentSpeed();


        this.x +=
            moveX *
            currentSpeed *
            deltaTime;


        this.y +=
            moveY *
            currentSpeed *
            deltaTime;


        /*
         * =====================================
         * LÍMITES DEL CANVAS
         * =====================================
         */
        const playfieldLeft =
            this.getPlayfieldLeft();

        this.x =
            Math.max(
                playfieldLeft,
                Math.min(
                    this.x,
                    this.canvas.width -
                        this.width
                )
            );


        this.y =
            Math.max(
                0,
                Math.min(
                    this.y,
                    this.canvas.height -
                        this.height
                )
            );
    }


    /*
     * =========================================
     * POSICIÓN DE DISPARO
     * =========================================
     *
     * El proyectil nace desde la parte
     * superior visual del sprite.
     * =========================================
     */
    getShootPosition() {
        const spriteTop =
            this.y -
            (
                this.renderHeight -
                this.height
            ) /
            2;


        return {
            x:
                this.x +
                this.width /
                    2 -
                4,

            y:
                spriteTop -
                20
        };
    }


    /*
     * =========================================
     * PRECISIÓN
     * =========================================
     */
    getAccuracy() {
        if (
            this.shotsFired === 0
        ) {
            return 0;
        }


        return (
            this.shotsHit /
            this.shotsFired
        ) *
        100;
    }


    /*
     * =========================================
     * RENDER
     * =========================================
     */
    render(
        ctx
    ) {
        /*
         * =====================================
         * SPRITE
         * =====================================
         */
        if (
            this.sprite &&
            this.sprite.complete
        ) {
            /*
             * Centrar sprite visual
             * sobre la hitbox.
             */
            const drawX =
                this.x -
                (
                    this.renderWidth -
                    this.width
                ) /
                2;


            const drawY =
                this.y -
                (
                    this.renderHeight -
                    this.height
                ) /
                2;


            ctx.save();


            /*
             * Parpadeo visual durante el tiempo
             * de invulnerabilidad.
             */
            if (
                this.invulnerabilityTimer >
                    0 &&
                Math.floor(
                    this.invulnerabilityTimer *
                        14
                ) %
                    2 ===
                    0
            ) {
                ctx.globalAlpha =
                    0.38;
            }


            /*
             * MUY IMPORTANTE
             * para conservar el aspecto
             * pixel art.
             */
            ctx.imageSmoothingEnabled =
                false;


            ctx.drawImage(
                this.sprite,
                drawX,
                drawY,
                this.renderWidth,
                this.renderHeight
            );


            ctx.restore();


            return;
        }


        /*
         * =====================================
         * FALLBACK
         * =====================================
         *
         * Si el sprite no cargó,
         * dibujamos un cuadrado para
         * no perder al jugador.
         */
        ctx.fillStyle =
            "#8b0000";


        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}