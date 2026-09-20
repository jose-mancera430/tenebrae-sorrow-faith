import { Formation } from "./Formation.js";

export class VFormation extends Formation {
    constructor() {
        super();
    }

    arrange(
        centerX,
        centerY,
        spacingX,
        spacingY
    ) {
        const total =
            this.enemies.length;

        const middle =
            (total - 1) / 2;

        let index = 0;

        for (const enemy of this.enemies) {
            const offset =
                index - middle;

            enemy.x =
                centerX +
                offset * spacingX;

            enemy.y =
                centerY -
                Math.abs(offset) * spacingY;

            index++;
        }
    }
}