# Tenebrae: Sorrow & Faith

## Descripción

Tenebrae: Sorrow & Faith es un videojuego desarrollado como proyecto académico utilizando tecnologías web.

El videojuego se ejecuta dentro de un Canvas de HTML5 y cuenta con movimiento del jugador, sistema de disparos, enemigos con diferentes comportamientos, detección de colisiones, sistema de vida, oleadas, formaciones de enemigos y estadísticas mostradas mediante un HUD.

El proyecto utiliza una arquitectura basada en clases de JavaScript para organizar las entidades, enemigos, proyectiles, formaciones y sistemas principales del videojuego.

## Integrantes

- [Miguel Angel Mancera Gonzalez]
- [Jose Alfredo  Mancera Chavez]


## Requisitos

Para ejecutar el proyecto se requiere:

- Node.js instalado.
- Un navegador web moderno como Google Chrome, Microsoft Edge o Mozilla Firefox.
- Tener descargado o clonado el repositorio del proyecto.
- Visual Studio Code u otro editor de código para visualizar y modificar los archivos del proyecto.

## Instrucciones de instalación

1. Descargar o clonar el repositorio de GitHub.
2. Abrir la carpeta `tenebrae-sorrow-faith` en Visual Studio Code.
3. Verificar que Node.js se encuentre instalado en el equipo.
4. Abrir una terminal dentro de la carpeta principal del proyecto.

## Instrucciones de ejecución

Desde la carpeta principal del proyecto, ejecutar el servidor con el siguiente comando:

```bash
node server/server.cjs
```

Después, abrir un navegador web e ingresar a:

```text
http://localhost:3000
```

El servidor permite cargar los archivos del videojuego y proporciona la semilla diaria utilizada por el sistema del juego.

## Controles

Los controles principales del videojuego son:

| Tecla | Acción |
|---|---|
| W | Mover al jugador hacia arriba |
| A | Mover al jugador hacia la izquierda |
| S | Mover al jugador hacia abajo |
| D | Mover al jugador hacia la derecha |
| Shift izquierdo o derecho | Disparar de forma continua |
| R | Reiniciar el juego después de Game Over o al finalizar el nivel |

## Estructura del proyecto

El proyecto se encuentra organizado de la siguiente manera:

```text
tenebrae-sorrow-faith/
├── assets/
├── css/
│   └── main.css
├── docs/
│   ├── arquitectura/
│   ├── pruebas/
│   └── sprites/
├── js/
│   ├── core/
│   ├── input/
│   └── main.js
├── server/
│   └── server.cjs
├── .gitignore
├── index.html
├── package.json
└── README.md
```

### Descripción de la estructura

- `assets/`: almacena los recursos utilizados por el videojuego.
- `css/`: contiene los estilos visuales del proyecto.
- `docs/`: contiene la documentación técnica, pruebas y catálogo de recursos gráficos.
- `js/`: contiene la lógica principal del videojuego.
- `js/core/`: contiene las clases y sistemas principales del juego, como jugador, enemigos, proyectiles, oleadas y formaciones.
- `js/input/`: contiene el sistema encargado de detectar las entradas del teclado.
- `server/`: contiene el servidor desarrollado con Node.js.
- `index.html`: contiene la estructura principal de la página donde se ejecuta el videojuego.
- `package.json`: contiene la configuración general del proyecto.
- `README.md`: contiene la descripción, requisitos e instrucciones generales del proyecto.

## Tecnologías utilizadas

Para el desarrollo del proyecto se utilizaron las siguientes tecnologías:

- HTML5: estructura principal de la página web.
- CSS3: diseño y estilos visuales.
- JavaScript: programación de la lógica y mecánicas del videojuego.
- HTML5 Canvas: representación gráfica y renderizado del videojuego.
- Node.js: ejecución del servidor del proyecto.
- Git: control de versiones del código y de la documentación.
- GitHub: almacenamiento y colaboración en el repositorio del proyecto.
- Visual Studio Code: editor utilizado para trabajar con los archivos del proyecto.

---

## Estado de la versión final

La versión final de **Tenebrae: Sorrow & Faith** incorpora una estructura modular con sistemas independientes para jugador, enemigos, formaciones, oleadas, niveles, jefes, puntuación, combo, Fervor, power-ups, audio, fondos, efectos y recursos gráficos.

### Controles comprobados

| Tecla | Acción |
|---|---|
| W, A, S, D | Mover al jugador |
| SHIFT | Disparar |
| E | Activar Fervor cuando se dispone de carga |
| ESC | Pausar / reanudar |
| ENTER | Iniciar o continuar cuando la interfaz lo solicita |
| R | Reintentar después de Game Over |

### Ejecución mediante Node.js

Con Node.js instalado, desde la carpeta raíz del proyecto ejecutar:

```bash
node server/server.cjs