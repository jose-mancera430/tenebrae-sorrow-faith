export class RelicarioAbilityController {
    constructor() {
        this.keyWasPressed = false;
    }

    tryActivate(
        keyPressed,
        fervorManager,
        ability1,
        ability2,
        ability3,
        ability4,
        enemyProjectilePool,
        enemyManager,
        player,
        effectManager
    ) {
        if (
            keyPressed &&
            !this.keyWasPressed
        ) {
            this.activateBySegments(
                fervorManager,
                ability1,
                ability2,
                ability3,
                ability4,
                enemyProjectilePool,
                enemyManager,
                player,
                effectManager
            );
        }

        this.keyWasPressed =
            keyPressed;
    }

    activateBySegments(
        fervorManager,
        ability1,
        ability2,
        ability3,
        ability4,
        enemyProjectilePool,
        enemyManager,
        player,
        effectManager
    ) {
        if (!fervorManager) {
            return false;
        }

        const segments =
            fervorManager
                .getFullSegments();

        if (segments <= 0) {
            return false;
        }

        /*
         * I
         */
        if (
            segments === 1 &&
            ability1
        ) {
            return ability1.activate(
                fervorManager
            );
        }

        /*
         * II
         */
        if (
            segments === 2 &&
            ability2
        ) {
            return ability2.activate(
                fervorManager
            );
        }

        /*
         * III
         */
        if (
            segments === 3 &&
            ability3
        ) {
            return ability3.activate(
                fervorManager,
                enemyProjectilePool,
                enemyManager,
                player,
                effectManager
            );
        }

        /*
         * IV
         */
        if (
            segments >= 4 &&
            ability4
        ) {
            return ability4.activate(
                fervorManager,
                enemyProjectilePool
            );
        }

        return false;
    }

    reset() {
        this.keyWasPressed =
            false;
    }
}