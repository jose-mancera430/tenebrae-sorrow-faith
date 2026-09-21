const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Carpeta raíz del proyecto
const ROOT_DIR = path.join(__dirname, "..");

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".wav": "audio/wav",
    ".mp3": "audio/mpeg",
    ".ogg": "audio/ogg"
};

function getDailySeed() {
    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        today.getMonth() + 1;

    const day =
        today.getDate();

    const seed =
        year * 10000 +
        month * 100 +
        day;

    return seed;
}

const server = http.createServer((req, res) => {
    let requestPath =
        decodeURIComponent(
            req.url.split("?")[0]
        );

    // API: seed diaria
    if (requestPath === "/api/daily-seed") {
        const dailySeed =
            getDailySeed();

        const response = {
            seed: dailySeed
        };

        res.writeHead(200, {
            "Content-Type":
                "application/json; charset=utf-8",
            "Cache-Control":
                "no-store"
        });

        res.end(
            JSON.stringify(response)
        );

        return;
    }

    // Página principal
    if (requestPath === "/") {
        requestPath = "/index.html";
    }

    // Construir la ruta real del archivo
    const filePath = path.normalize(
        path.join(
            ROOT_DIR,
            requestPath
        )
    );

    // Evitar acceder a archivos fuera del proyecto
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403, {
            "Content-Type":
                "text/plain; charset=utf-8"
        });

        res.end(
            "403 - Acceso denegado"
        );

        return;
    }

    fs.stat(
        filePath,
        (statError, stats) => {
            if (
                statError ||
                !stats.isFile()
            ) {
                res.writeHead(404, {
                    "Content-Type":
                        "text/plain; charset=utf-8"
                });

                res.end(
                    "404 - Archivo no encontrado"
                );

                return;
            }

            const extension =
                path.extname(
                    filePath
                ).toLowerCase();

            const contentType =
                mimeTypes[extension] ||
                "application/octet-stream";

            fs.readFile(
                filePath,
                (readError, content) => {
                    if (readError) {
                        res.writeHead(500, {
                            "Content-Type":
                                "text/plain; charset=utf-8"
                        });

                        res.end(
                            "500 - Error interno del servidor"
                        );

                        return;
                    }

                    res.writeHead(200, {
                        "Content-Type":
                            contentType
                    });

                    res.end(content);
                }
            );
        }
    );
});

server.listen(PORT, () => {
    console.log(
        `TENEBRAE: servidor funcionando en http://localhost:${PORT}`
    );
});