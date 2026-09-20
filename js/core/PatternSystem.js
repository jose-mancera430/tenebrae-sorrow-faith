export class PatternSystem {
    constructor() {
        this.patterns = {};

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
}