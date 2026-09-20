import { EnemyProjectile } from "./EnemyProjectile.js";

export class EnemyProjectilePool {
    constructor(size = 100) {
        this.projectiles = [];

        for (let i = 0; i < size; i++) {
            const projectile =
                new EnemyProjectile(0, 0);

            projectile.deactivate();

            this.projectiles.push(
                projectile
            );
        }
    }

    getProjectile(
        x,
        y,
        velocityX = 0,
        velocityY = 260
    ) {
        for (const projectile of this.projectiles) {
            if (!projectile.active) {
                projectile.activate(
                    x,
                    y,
                    velocityX,
                    velocityY
                );

                return projectile;
            }
        }

        return null;
    }

    reset() {
        for (const projectile of this.projectiles) {
            projectile.deactivate();
        }
    }

    update(
        deltaTime,
        canvas
    ) {
        for (const projectile of this.projectiles) {
            if (!projectile.active) {
                continue;
            }

            projectile.update(
                deltaTime
            );

            if (
                projectile.y >
                    canvas.height ||
                projectile.y +
                    projectile.height < 0 ||
                projectile.x >
                    canvas.width ||
                projectile.x +
                    projectile.width < 0
            ) {
                projectile.deactivate();
            }
        }
    }

    render(ctx) {
        for (const projectile of this.projectiles) {
            if (!projectile.active) {
                continue;
            }

            projectile.render(ctx);
        }
    }
}