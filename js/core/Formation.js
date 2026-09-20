export class Formation {
    constructor() {
        this.enemies = [];

        this.active = true;
        this.released = false;

        this.speedX = 60;
        this.speedY = 0;

        // Tiempo provisional antes de liberar enemigos
        this.releaseDelay = 3;
        this.releaseTimer = 0;
    }

    addEnemy(enemy) {
        enemy.inFormation = true;

        this.enemies.push(enemy);
    }

    isEmpty() {
        for (const enemy of this.enemies) {
            if (enemy.active) {
                return false;
            }
        }

        return true;
    }

    releaseEnemies() {
        this.released = true;

        for (const enemy of this.enemies) {
            if (!enemy.active) {
                continue;
            }

            enemy.inFormation = false;
        }

        // La formación deja de controlar a sus integrantes
        this.active = false;
    }

    update(deltaTime) {
        if (!this.active) {
            return;
        }

        if (this.isEmpty()) {
            this.active = false;
            return;
        }

        // Mover formación como grupo
        for (const enemy of this.enemies) {
            if (!enemy.active) {
                continue;
            }

            enemy.x +=
                this.speedX * deltaTime;

            enemy.y +=
                this.speedY * deltaTime;
        }

        // Contar tiempo antes de liberar
        this.releaseTimer += deltaTime;

        if (this.releaseTimer >= this.releaseDelay) {
            this.releaseEnemies();
        }
    }
}