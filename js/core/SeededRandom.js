export class SeededRandom {
    constructor(seed = 1) {
        this.seed = seed >>> 0;
    }

    setSeed(seed) {
        this.seed = seed >>> 0;
    }

    next() {
        this.seed =
            (
                this.seed * 1664525 +
                1013904223
            ) >>> 0;

        return (
            this.seed /
            4294967296
        );
    }
}