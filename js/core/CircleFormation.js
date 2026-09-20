import { Formation } from "./Formation.js";

export class CircleFormation extends Formation {
    constructor() {
        super();
    }

    arrange(
        centerX,
        centerY,
        radius
    ) {
        const total =
            this.enemies.length;

        if (total === 0) {
            return;
        }

        const angleStep =
            (Math.PI * 2) / total;

        let index = 0;

        for (const enemy of this.enemies) {
            const angle =
                index * angleStep;

            enemy.x =
                centerX +
                Math.cos(angle) * radius;

            enemy.y =
                centerY +
                Math.sin(angle) * radius;

            index++;
        }
    }
}