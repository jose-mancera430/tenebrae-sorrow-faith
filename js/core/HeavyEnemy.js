import { Enemy } from "./Enemy.js";

export class HeavyEnemy extends Enemy {
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

        this.type = "heavy";

        this.speed = 60;

        this.maxHealth = 6;
        this.health = this.maxHealth;
    }
}