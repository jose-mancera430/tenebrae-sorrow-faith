import { Enemy } from "./Enemy.js";

export class HunterEnemy extends Enemy {
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

        this.type = "hunter";

        this.horizontalSpeed = 140;
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

            const playerCenterX =
                player.x +
                player.width / 2;

            if (playerCenterX < enemyCenterX) {
                this.x -=
                    this.horizontalSpeed *
                    deltaTime;
            }

            if (playerCenterX > enemyCenterX) {
                this.x +=
                    this.horizontalSpeed *
                    deltaTime;
            }
        }

        this.y +=
            this.speed *
            deltaTime;

        if (this.y > canvas.height) {
            this.deactivate();
        }
    }
}