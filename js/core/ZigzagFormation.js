import { Formation } from "./Formation.js";

export class ZigzagFormation extends Formation {
    constructor() {
        super();
    }

    arrange(
        startX,
        startY,
        spacingX,
        spacingY
    ) {
        let index = 0;

        for (const enemy of this.enemies) {
            enemy.x =
                startX +
                index * spacingX;

            if (index % 2 === 0) {
                enemy.y = startY;
            } else {
                enemy.y =
                    startY +
                    spacingY;
            }

            index++;
        }
    }
}