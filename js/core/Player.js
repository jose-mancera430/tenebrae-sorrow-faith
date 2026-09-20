import { DamageableEntity } from "./DamageableEntity.js";

export class Player extends DamageableEntity {
    constructor(canvas, input) {
        const width = 50;
        const height = 50;

        const x =
            canvas.width / 2 -
            width / 2;

        const y =
            canvas.height / 2 -
            height / 2;

        const maxHealth = 3;

        super(
            x,
            y,
            width,
            height,
            maxHealth
        );

        this.canvas = canvas;
        this.input = input;

        this.speed = 300;

        this.fireCooldown = 0.15;
        this.fireTimer = 0;

        this.wantsToShoot = false;

        this.shotsFired = 0;
        this.shotsHit = 0;
        this.enemiesDestroyed = 0;
    }

    reset() {
        this.activate();

        this.x =
            this.canvas.width / 2 -
            this.width / 2;

        this.y =
            this.canvas.height / 2 -
            this.height / 2;

        this.fireTimer = 0;
        this.wantsToShoot = false;

        this.shotsFired = 0;
        this.shotsHit = 0;
        this.enemiesDestroyed = 0;
    }

    update(deltaTime) {
        this.fireTimer -= deltaTime;

        this.wantsToShoot = false;

        let moveX = 0;
        let moveY = 0;

        if (this.input.isPressed("KeyA")) {
            moveX -= 1;
        }

        if (this.input.isPressed("KeyD")) {
            moveX += 1;
        }

        if (this.input.isPressed("KeyW")) {
            moveY -= 1;
        }

        if (this.input.isPressed("KeyS")) {
            moveY += 1;
        }

        if (
            (
                this.input.isPressed("ShiftLeft") ||
                this.input.isPressed("ShiftRight")
            ) &&
            this.fireTimer <= 0
        ) {
            this.wantsToShoot = true;
            this.shotsFired++;

            this.fireTimer = this.fireCooldown;
        }

        if (moveX !== 0 && moveY !== 0) {
            const factor = 1 / Math.sqrt(2);

            moveX *= factor;
            moveY *= factor;
        }

        this.x += moveX * this.speed * deltaTime;
        this.y += moveY * this.speed * deltaTime;

        this.x = Math.max(
            0,
            Math.min(
                this.x,
                this.canvas.width - this.width
            )
        );

        this.y = Math.max(
            0,
            Math.min(
                this.y,
                this.canvas.height - this.height
            )
        );
    }

    getShootPosition() {
        return {
            x: this.x + this.width / 2 - 4,
            y: this.y - 20
        };
    }

    getAccuracy() {
        if (this.shotsFired === 0) {
            return 0;
        }

        return (
            this.shotsHit /
            this.shotsFired
        ) * 100;
    }

    render(ctx) {
        ctx.fillStyle = "#8b0000";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}