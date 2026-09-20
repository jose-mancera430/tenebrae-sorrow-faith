import { Projectile } from "./Projectile.js";

export class ProjectilePool {
    constructor(size = 100) {
        this.projectiles = [];

        for (let i = 0; i < size; i++) {
            const projectile = new Projectile(0, 0);

            projectile.deactivate();

            this.projectiles.push(projectile);
        }
    }

    getProjectile(x, y) {
        for (const projectile of this.projectiles) {
            if (!projectile.active) {
                projectile.activate(x, y);

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

    update(deltaTime) {
        for (const projectile of this.projectiles) {
            if (!projectile.active) {
                continue;
            }

            projectile.update(deltaTime);

            if (
                projectile.y +
                projectile.height < 0
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