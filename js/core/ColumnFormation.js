import { Formation } from "./Formation.js";

export class ColumnFormation extends Formation {
    constructor() {
        super();
    }

    arrange(
        x,
        startY,
        spacingY
    ) {
        let index = 0;

        for (const enemy of this.enemies) {
            enemy.x = x;

            enemy.y =
                startY +
                index * spacingY;

            index++;
        }
    }
}