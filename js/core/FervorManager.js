export class FervorManager {
    constructor() {
        /*
         * FERVOR ACTUAL
         */
        this.fervor = 0;

        /*
         * 4 CARGAS DE 50.
         *
         * I   = 50
         * II  = 100
         * III = 150
         * IV  = 200
         */
        this.maxFervor = 200;

        this.segmentSize = 50;

        this.maxSegments = 4;

        /*
         * GANANCIA
         */
        this.fervorPerHit = 1;

        this.fervorPerKill = 5;

        /*
         * PENALIZACIÓN
         */
        this.damagePenalty = 15;

        /*
         * Por ahora el Botafumeiro
         * que ya tenemos será tratado
         * como la habilidad máxima.
         */
        this.specialCost = 200;
    }

    addFervor(amount) {
        if (amount <= 0) {
            return;
        }

        this.fervor =
            Math.min(
                this.maxFervor,
                this.fervor + amount
            );
    }

    removeFervor(amount) {
        if (amount <= 0) {
            return;
        }

        this.fervor =
            Math.max(
                0,
                this.fervor - amount
            );
    }

    registerHit() {
        this.addFervor(
            this.fervorPerHit
        );
    }

    registerKill() {
        this.addFervor(
            this.fervorPerKill
        );
    }

    registerDamage() {
        this.removeFervor(
            this.damagePenalty
        );
    }

    getFervor() {
        return this.fervor;
    }

    getMaxFervor() {
        return this.maxFervor;
    }

    getSegmentSize() {
        return this.segmentSize;
    }

    getMaxSegments() {
        return this.maxSegments;
    }

    /*
     * Número de cargas
     * completamente llenas.
     *
     * 0 - 4
     */
    getFullSegments() {
        return Math.floor(
            this.fervor /
            this.segmentSize
        );
    }

    /*
     * Progreso del segmento
     * que se está llenando.
     *
     * 0.0 - 1.0
     */
    getCurrentSegmentProgress() {
        if (
            this.fervor >=
            this.maxFervor
        ) {
            return 1;
        }

        return (
            (
                this.fervor %
                this.segmentSize
            ) /
            this.segmentSize
        );
    }

    hasSegments(amount) {
        return (
            this.fervor >=
            amount *
            this.segmentSize
        );
    }

    canUseSpecial() {
        return (
            this.fervor >=
            this.specialCost
        );
    }

    useSpecial() {
        if (
            !this.canUseSpecial()
        ) {
            return false;
        }

        this.removeFervor(
            this.specialCost
        );

        return true;
    }

    getSpecialCost() {
        return this.specialCost;
    }

    getPercentage() {
        if (
            this.maxFervor <= 0
        ) {
            return 0;
        }

        return (
            this.fervor /
            this.maxFervor
        );
    }

    reset() {
        this.fervor = 0;
    }
}