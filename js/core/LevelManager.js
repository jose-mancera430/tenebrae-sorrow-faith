export class LevelManager {
    constructor() {
        this.currentLevel = 1;

        this.maxLevels = 8;

        this.levelFinished = false;

        this.levels = this.createLevels();
    }

    createLevels() {
        return [
            {
                id: 1,

                name:
                    "Las Cruces de Ceniza",

                subtitle:
                    "Atrio de los Penitentes",

                waveCount: 6,

                difficulty:
                    1.0,

                background:
                    "ash-crosses"
            },

            {
                id: 2,

                name:
                    "Las Cruces de Ceniza",

                subtitle:
                    "Claustro de las Llagas",

                waveCount: 6,

                difficulty:
                    1.15,

                background:
                    "wounded-cloister"
            },

            {
                id: 3,

                name:
                    "Catedral del Silencio",

                subtitle:
                    "Nave de los Incorruptos",

                waveCount: 6,

                difficulty:
                    1.30,

                background:
                    "silent-cathedral"
            },

            {
                id: 4,

                name:
                    "Catedral del Silencio",

                subtitle:
                    "Campanario de la Agonía",

                waveCount: 6,

                difficulty:
                    1.45,

                background:
                    "bell-tower"
            },

            {
                id: 5,

                name:
                    "Santuario de Mercurio",

                subtitle:
                    "Cripta de los Rostros",

                waveCount: 6,

                difficulty:
                    1.60,

                background:
                    "mercury-sanctuary"
            },

            {
                id: 6,

                name:
                    "Santuario de Mercurio",

                subtitle:
                    "Altar de la Carne",

                waveCount: 6,

                difficulty:
                    1.75,

                background:
                    "flesh-altar"
            },

            {
                id: 7,

                name:
                    "El Lienzo Negro",

                subtitle:
                    "Umbral del Milagro",

                waveCount: 6,

                difficulty:
                    1.90,

                background:
                    "black-canvas"
            },

            {
                id: 8,

                name:
                    "El Lienzo Negro",

                subtitle:
                    "Calamidad",

                waveCount: 6,

                difficulty:
                    2.10,

                background:
                    "calamity"
            }
        ];
    }

    getCurrentLevel() {
        return (
            this.levels[
                this.currentLevel - 1
            ] || null
        );
    }

    getLevel(levelNumber) {
        return (
            this.levels[
                levelNumber - 1
            ] || null
        );
    }

    getDifficulty() {
        const level =
            this.getCurrentLevel();

        if (!level) {
            return 1;
        }

        return level.difficulty;
    }

    getWaveCount() {
        const level =
            this.getCurrentLevel();

        if (!level) {
            return 6;
        }

        return level.waveCount;
    }

    canAdvance() {
        return (
            this.currentLevel <
            this.maxLevels
        );
    }

    advanceLevel() {
        if (
            !this.canAdvance()
        ) {
            this.levelFinished =
                true;

            return false;
        }

        this.currentLevel++;

        this.levelFinished =
            false;

        return true;
    }

    setLevel(levelNumber) {
        if (
            levelNumber < 1 ||
            levelNumber >
                this.maxLevels
        ) {
            return false;
        }

        this.currentLevel =
            levelNumber;

        this.levelFinished =
            false;

        return true;
    }

    reset() {
        this.currentLevel = 1;

        this.levelFinished =
            false;
    }
}