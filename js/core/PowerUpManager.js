export class PowerUpManager {
    constructor() {
        this.activePowerUps = {
            doubleShot: false,
            tripleShot: false,
            speedBoost: false,
            shield: false,
            piercing: false,
            specialBomb: 0
        };

        this.speedMultiplier =
            1.35;

        this.currentFervorSegments =
            0;
    }


    /*
     * =========================================
     * SINCRONIZAR CON FERVOR
     * =========================================
     *
     * No existen drops.
     *
     * Los power-ups ofensivos se obtienen
     * automáticamente al conservar barras
     * completas de Fervor:
     *
     * I   = Double Shot
     * II  = Double Shot + Speed Boost
     * III = Triple Shot + Speed Boost
     * IV  = Triple Shot + Speed Boost
     *       + Piercing
     *
     * Shield y Special Bomb están representados
     * por habilidades reales del Relicario:
     *
     * Shield       = Bloques de Bronce
     * Special Bomb = Retumbo de Campana
     * =========================================
     */
    syncWithFervor(
        fervorManager
    ) {
        if (
            !fervorManager
        ) {
            this.clearPassivePowerUps();

            return;
        }


        const segments =
            fervorManager
                .getFullSegments();


        this.currentFervorSegments =
            segments;


        /*
         * DOUBLE SHOT
         *
         * Activo con 1 o 2 barras.
         * Al llegar a 3 se reemplaza
         * por Triple Shot.
         */
        this.activePowerUps
            .doubleShot =
            segments >= 1 &&
            segments < 3;


        /*
         * TRIPLE SHOT
         */
        this.activePowerUps
            .tripleShot =
            segments >= 3;


        /*
         * SPEED BOOST
         */
        this.activePowerUps
            .speedBoost =
            segments >= 2;


        /*
         * PIERCING
         */
        this.activePowerUps
            .piercing =
            segments >= 4;


        /*
         * No se gestionan como pasivos.
         */
        this.activePowerUps
            .shield =
            false;

        this.activePowerUps
            .specialBomb =
            0;
    }


    clearPassivePowerUps() {
        this.activePowerUps
            .doubleShot =
            false;

        this.activePowerUps
            .tripleShot =
            false;

        this.activePowerUps
            .speedBoost =
            false;

        this.activePowerUps
            .piercing =
            false;

        this.activePowerUps
            .shield =
            false;

        this.activePowerUps
            .specialBomb =
            0;

        this.currentFervorSegments =
            0;
    }


    /*
     * =========================================
     * COMPATIBILIDAD
     * =========================================
     *
     * Se conserva activate/deactivate por si
     * algún código anterior todavía lo llama.
     *
     * Durante gameplay syncWithFervor()
     * será quien determine los pasivos.
     */
    activate(
        type
    ) {
        if (
            type ===
            "doubleShot"
        ) {
            this.activePowerUps
                .doubleShot =
                true;

            this.activePowerUps
                .tripleShot =
                false;

            return;
        }


        if (
            type ===
            "tripleShot"
        ) {
            this.activePowerUps
                .tripleShot =
                true;

            this.activePowerUps
                .doubleShot =
                false;

            return;
        }


        if (
            type ===
            "speedBoost"
        ) {
            this.activePowerUps
                .speedBoost =
                true;

            return;
        }


        if (
            type ===
            "shield"
        ) {
            this.activePowerUps
                .shield =
                true;

            return;
        }


        if (
            type ===
            "piercing"
        ) {
            this.activePowerUps
                .piercing =
                true;

            return;
        }


        if (
            type ===
            "specialBomb"
        ) {
            this.activePowerUps
                .specialBomb++;

            return;
        }
    }


    deactivate(
        type
    ) {
        if (
            Object.prototype
                .hasOwnProperty.call(
                    this.activePowerUps,
                    type
                )
        ) {
            if (
                type ===
                "specialBomb"
            ) {
                return;
            }


            this.activePowerUps[
                type
            ] =
                false;
        }
    }


    has(
        type
    ) {
        return Boolean(
            this.activePowerUps[
                type
            ]
        );
    }


    getSpeedMultiplier() {
        if (
            this.activePowerUps
                .speedBoost
        ) {
            return (
                this.speedMultiplier
            );
        }


        return 1;
    }


    getCurrentFervorSegments() {
        return (
            this.currentFervorSegments
        );
    }


    getBombCount() {
        return (
            this.activePowerUps
                .specialBomb
        );
    }


    useBomb() {
        if (
            this.activePowerUps
                .specialBomb <= 0
        ) {
            return false;
        }


        this.activePowerUps
            .specialBomb--;


        return true;
    }


    reset() {
        this.activePowerUps = {
            doubleShot: false,
            tripleShot: false,
            speedBoost: false,
            shield: false,
            piercing: false,
            specialBomb: 0
        };


        this.currentFervorSegments =
            0;
    }
}
