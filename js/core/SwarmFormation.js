import { Formation } from "./Formation.js";

export class SwarmFormation extends Formation {
    constructor() {
        super();
    }

    arrange(
        centerX,
        centerY,
        spacingX,
        spacingY
    ) {
        const positions = [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: -0.5, y: 1 },
            { x: 0.5, y: 1 },
            { x: 0, y: 2 }
        ];

        let index = 0;

        for (const enemy of this.enemies) {
            const position =
                positions[
                    index % positions.length
                ];

            enemy.x =
                centerX +
                position.x * spacingX;

            enemy.y =
                centerY +
                position.y * spacingY;

            index++;
        }
    }
}