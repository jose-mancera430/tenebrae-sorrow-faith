export class AshImpactAbility {
    constructor() {
        /*
         * ESTADO
         */
        this.active = false;

        /*
         * DURACIÓN DEL EFECTO
         */
        this.duration = 4.0;

        this.timer = 0;

        /*
         * COSTE:
         * 1 SEGMENTO
         */
        this.cost = 50;

        /*
         * MODIFICADORES
         *
         * Se usarán después
         * al disparar.
         */
        this.projectileWidthMultiplier =
            2.2;

        this.damageMultiplier =
            1.5;

        /*
         * CONTROL DE TECLA
         */
        this.keyWasPressed =
            false;
    }

    update(deltaTime) {
        if (!this.active) {
            return;
        }

        this.timer -=
            deltaTime;

        if (
            this.timer <= 0
        ) {
            this.active =
                false;

            this.timer = 0;

            console.log(
                "IMPACTOS DE CENIZA TERMINADO"
            );
        }
    }

    tryActivate(
        keyPressed,
        fervorManager
    ) {
        /*
         * Solo una activación
         * por pulsación.
         */
        if (
            keyPressed &&
            !this.keyWasPressed
        ) {
            this.activate(
                fervorManager
            );
        }

        this.keyWasPressed =
            keyPressed;
    }

    activate(
        fervorManager
    ) {
        if (!fervorManager) {
            return false;
        }

        /*
         * Comprobar que existe
         * al menos una carga.
         */
        if (
            fervorManager.getFervor() <
            this.cost
        ) {
            return false;
        }

        /*
         * Consumir 50 Fervor.
         */
        fervorManager.removeFervor(
            this.cost
        );

        /*
         * Activar habilidad.
         */
        this.active = true;

        this.timer =
            this.duration;

        console.log(
            "IMPACTOS DE CENIZA ACTIVADO"
        );

        return true;
    }

    isActive() {
        return this.active;
    }

    getProjectileWidthMultiplier() {
        if (!this.active) {
            return 1;
        }

        return this
            .projectileWidthMultiplier;
    }

    getDamageMultiplier() {
        if (!this.active) {
            return 1;
        }

        return this.damageMultiplier;
    }

    getRemainingTime() {
        return Math.max(
            0,
            this.timer
        );
    }

    reset() {
        this.active = false;

        this.timer = 0;

        this.keyWasPressed =
            false;
    }
}