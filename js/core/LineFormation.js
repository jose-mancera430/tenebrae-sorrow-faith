import { Formation } from "./Formation.js";

export class LineFormation extends Formation {
    constructor() {
        super();
    }

    arrange(
        startX,
        startY,
        spacing
    ) {
        let index = 0;

        for (const enemy of this.enemies) {
            enemy.x =
                startX +
                index * spacing;

            enemy.y =
                startY;

            index++;
        }
    }
}