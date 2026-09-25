import {
    Projectile
} from "./Projectile.js";

export class ProjectilePool {
    constructor(
        size = 100
    ) {
        this.projectiles = [];


        for (
            let i = 0;
            i < size;
            i++
        ) {
            this.projectiles.push(
                new Projectile()
            );
        }
    }


    /*
     * =====================================
     * OBTENER PROYECTIL
     * =====================================
     */
    getProjectile(
        x,
        y,
        options = {}
    ) {
        for (
            const projectile
            of this.projectiles
        ) {
            if (
                projectile.active
            ) {
                continue;
            }


            projectile.activate(
                x,
                y,
                options
            );


            /*
             * =================================
             * PIERCING
             * =================================
             *
             * Se reinicia SIEMPRE al reutilizar
             * un proyectil del pool.
             *
             * Esto evita que un proyectil viejo
             * conserve el estado del anterior.
             */
            projectile.piercing =
                Boolean(
                    options.piercing
                );


            /*
             * Entidades que este proyectil ya
             * golpeó.
             *
             * Impide dañar al mismo enemigo/boss
             * en cada frame mientras la bala
             * permanece superpuesta.
             */
            projectile.hitTargets =
                new Set();


            return projectile;
        }


        /*
         * Pool lleno.
         */
        return null;
    }


    /*
     * =====================================
     * UPDATE
     * =====================================
     */
    update(
        deltaTime
    ) {
        for (
            const projectile
            of this.projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }


            projectile.update(
                deltaTime
            );
        }
    }


    /*
     * =====================================
     * RENDER
     * =====================================
     */
    render(
        ctx
    ) {
        for (
            const projectile
            of this.projectiles
        ) {
            if (
                !projectile.active
            ) {
                continue;
            }


            projectile.render(
                ctx
            );
        }
    }


    /*
     * =====================================
     * RESET
     * =====================================
     */
    reset() {
        for (
            const projectile
            of this.projectiles
        ) {
            projectile.deactivate();

            projectile.piercing =
                false;

            projectile.hitTargets =
                new Set();
        }
    }
}
