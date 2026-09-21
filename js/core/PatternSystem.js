import { SeededRandom } from "./SeededRandom.js";
export class PatternSystem {
    constructor(seed = 1) {
    this.patterns = {};

    this.random =
        new SeededRandom(seed);

    this.registerDefaultPatterns();
}

    registerDefaultPatterns() {
        this.registerPattern(
            "aimed-single",
            {
                type: "aimed",
                bullets: 1,
                speed: 260,
                interval: 1200
            }
        );

        this.registerPattern(
            "radial-8",
            {
                type: "radial",
                bullets: 8,
                speed: 180,
                rotation: 12,
                interval: 1600
            }
        );

        this.registerPattern(
            "spiral-8",
            {
                type: "radial",
                bullets: 8,
                speed: 200,
                rotation: 18,
                interval: 500
            }
        );

        this.registerPattern(
            "cross-4",
            {
                type: "radial",
                bullets: 4,
                speed: 220,
                rotation: 0,
                interval: 1000
            }
        );

        this.registerPattern(
            "burst-5",
            {
                type: "burst",
                bullets: 5,
                speed: 280,
                spread: 30,
                interval: 1400
            }
        );

        this.registerPattern(
            "wave-5",
            {
                type: "wave",
                bullets: 5,
                speed: 240,
                spread: 60,
                interval: 900
            }
        );

        this.registerPattern(
            "random-5",
            {
                type: "random",
                bullets: 5,
                speed: 230,
                spread: 80,
                interval: 1000
            }
        );

        this.registerPattern(
            "rotating-6",
            {
                type: "rotating",
                bullets: 6,
                speed: 200,
                rotation: 15,
                interval: 700
            }
        );

        this.registerPattern(
            "combo-aimed-radial",
            {
                type: "combo",
                patterns: [
                    "aimed-single",
                    "radial-8"
                ],
                interval: 1200
            }
        );
    }

    registerPattern(
        name,
        configuration
    ) {
        this.patterns[name] =
            configuration;
    }

    getPattern(name) {
        return this.patterns[name] || null;
    }

    hasPattern(name) {
        return Boolean(
            this.patterns[name]
        );
    }

    calculateRadialVelocities(
        pattern
    ) {
        const velocities = [];

        if (
            !pattern ||
            (
                pattern.type !== "radial" &&
                pattern.type !== "rotating"
            ) ||
            pattern.bullets <= 0
        ) {
            return velocities;
        }

        const angleStep =
            (Math.PI * 2) /
            pattern.bullets;

        const rotationRadians =
            pattern.rotation *
            (Math.PI / 180);

        for (
            let i = 0;
            i < pattern.bullets;
            i++
        ) {
            const angle =
                i * angleStep +
                rotationRadians;

            const velocityX =
                Math.cos(angle) *
                pattern.speed;

            const velocityY =
                Math.sin(angle) *
                pattern.speed;

            velocities.push({
                velocityX,
                velocityY
            });
        }

        return velocities;
    }

    calculateBurstVelocities(
        pattern,
        baseAngle
    ) {
        const velocities = [];

        if (
            !pattern ||
            pattern.type !== "burst" ||
            pattern.bullets <= 0
        ) {
            return velocities;
        }

        const spreadRadians =
            pattern.spread *
            (Math.PI / 180);

        const startAngle =
            baseAngle -
            spreadRadians / 2;

        const angleStep =
            pattern.bullets > 1
                ? spreadRadians /
                    (pattern.bullets - 1)
                : 0;

        for (
            let i = 0;
            i < pattern.bullets;
            i++
        ) {
            const angle =
                startAngle +
                i * angleStep;

            const velocityX =
                Math.cos(angle) *
                pattern.speed;

            const velocityY =
                Math.sin(angle) *
                pattern.speed;

            velocities.push({
                velocityX,
                velocityY
            });
        }

        return velocities;
    }

    calculateWaveVelocities(
        pattern,
        baseAngle,
        waveOffset
    ) {
        const velocities = [];

        if (
            !pattern ||
            pattern.type !== "wave" ||
            pattern.bullets <= 0
        ) {
            return velocities;
        }

        const spreadRadians =
            pattern.spread *
            (Math.PI / 180);

        const startAngle =
            baseAngle -
            spreadRadians / 2;

        const angleStep =
            pattern.bullets > 1
                ? spreadRadians /
                    (pattern.bullets - 1)
                : 0;

        for (
            let i = 0;
            i < pattern.bullets;
            i++
        ) {
            const waveAngle =
                Math.sin(
                    waveOffset +
                    i * 0.8
                ) * 0.25;

            const angle =
                startAngle +
                i * angleStep +
                waveAngle;

            const velocityX =
                Math.cos(angle) *
                pattern.speed;

            const velocityY =
                Math.sin(angle) *
                pattern.speed;

            velocities.push({
                velocityX,
                velocityY
            });
        }

        return velocities;
    }

    calculateRandomVelocities(
        pattern,
        baseAngle
    ) {
        const velocities = [];

        if (
            !pattern ||
            pattern.type !== "random" ||
            pattern.bullets <= 0
        ) {
            return velocities;
        }

        const spreadRadians =
            pattern.spread *
            (Math.PI / 180);

        for (
            let i = 0;
            i < pattern.bullets;
            i++
        ) {
            const randomOffset =
    (
        this.random.next() -
        0.5
    ) *
    spreadRadians;
            const angle =
                baseAngle +
                randomOffset;

            const velocityX =
                Math.cos(angle) *
                pattern.speed;

            const velocityY =
                Math.sin(angle) *
                pattern.speed;

            velocities.push({
                velocityX,
                velocityY
            });
        }

        return velocities;
    }
setSeed(seed) {
    this.random.setSeed(seed);
}

getSeed() {
    return this.random.seed;
}
}