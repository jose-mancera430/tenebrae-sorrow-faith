export class AssetManager {
    constructor() {
        this.images = {};
    }

    loadImage(name, src) {
        return new Promise(
            (resolve, reject) => {
                const image =
                    new Image();

                image.onload = () => {
                    this.images[name] =
                        image;

                    resolve(image);
                };

                image.onerror = () => {
                    reject(
                        new Error(
                            `No se pudo cargar la imagen: ${src}`
                        )
                    );
                };

                image.src = src;
            }
        );
    }

    getImage(name) {
        return this.images[name] || null;
    }

    hasImage(name) {
        return Boolean(
            this.images[name]
        );
    }
}