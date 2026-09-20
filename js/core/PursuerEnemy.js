import { Enemy } from "./Enemy.js";

export class PursuerEnemy extends Enemy {
    constructor(
        x,
        y,
        width,
        height,
        maxHealth
    ) {
        super(
            x,
            y,
            width,
            height,
            maxHealth
        );

        this.type = "pursuer";

        this.pursuitSpeed = 110;
    }

    update(
        deltaTime,
        canvas,
        player
    ) {
        if (!this.active) {
            return;
        }

        if (this.inFormation) {
            return;
        }

        if (player) {
            const enemyCenterX =
                this.x +
                this.width / 2;

            const enemyCenterY =
                this.y +
                this.height / 2;

            const playerCenterX =
                player.x +
                player.width / 2;

            const playerCenterY =
                player.y +
                player.height / 2;

            const directionX =
                playerCenterX -
                enemyCenterX;

            const directionY =
                playerCenterY -
                enemyCenterY;

            const distance =
                Math.sqrt(
                    directionX * directionX +
                    directionY * directionY
                );

            if (distance > 0) {
                this.x +=
                    (directionX / distance) *
                    this.pursuitSpeed *
                    deltaTime;

                this.y +=
                    (directionY / distance) *
                    this.pursuitSpeed *
                    deltaTime;
            }
        }

        if (
            this.y > canvas.height ||
            this.x + this.width < 0 ||
            this.x > canvas.width
        ) {
            this.deactivate();
        }
    }
}