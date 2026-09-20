import { Entity } from "./Entity.js";

export class DamageableEntity extends Entity {
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
            height
        );

        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }

    activate() {
        super.activate();

        this.health = this.maxHealth;
    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health < 0) {
            this.health = 0;
        }
    }

    isDestroyed() {
        return this.health <= 0;
    }
}