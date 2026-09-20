export class InputManager {
    constructor() {
        this.keys = {};

        window.addEventListener("keydown", (event) => {
            this.keys[event.code] = true;
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.code] = false;
        });
    }

    isPressed(code) {
        return this.keys[code] === true;
    }
}
