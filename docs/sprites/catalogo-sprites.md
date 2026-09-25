# Catálogo de sprites — Tenebrae: Sorrow & Faith

## Objetivo

Este documento registra y organiza los sprites y recursos gráficos utilizados en el desarrollo de Tenebrae: Sorrow & Faith.

El catálogo permitirá identificar cada recurso gráfico, su función dentro del videojuego, sus características técnicas, su origen y, cuando corresponda, la licencia bajo la cual puede utilizarse.

## Información que se registrará

Para cada sprite o recurso gráfico se documentará:

- Nombre del recurso.
- Categoría.
- Archivo correspondiente.
- Personaje, enemigo, objeto o elemento que representa.
- Dimensiones.
- Animaciones disponibles.
- Uso previsto dentro del videojuego.
- Estado de integración.
- Herramienta utilizada para su creación, cuando sea un recurso propio.
- Procedencia y licencia, cuando sea un recurso externo.
- Observaciones.
## Jugador

### Representación gráfica actual

- **Elemento:** Jugador.
- **Categoría:** Personaje jugable.
- **Archivo de lógica:** `js/core/Player.js`.
- **Recurso gráfico externo:** No utiliza actualmente.
- **Dimensiones:** 50 × 50 píxeles.
- **Representación actual:** Rectángulo dibujado directamente mediante Canvas.
- **Método de dibujo:** `ctx.fillRect()`.
- **Color actual:** `#8b0000`.
- **Estado de integración:** Funcional.
- **Animaciones:** No se observan animaciones mediante sprites en la implementación actual.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Observaciones:** La implementación actual utiliza una representación gráfica provisional mediante Canvas en lugar de una imagen o sprite.
## Enemigos

### Enemigo base

- **Elemento:** Enemigo base.
- **Categoría:** Enemigo.
- **Archivo de lógica:** `js/core/Enemy.js`.
- **Recurso gráfico externo:** No utiliza actualmente.
- **Dimensiones:** Definidas por las clases o instancias que utilizan la clase `Enemy`.
- **Representación actual:** Rectángulo dibujado directamente mediante Canvas.
- **Método de dibujo:** `ctx.fillRect()`.
- **Color actual:** `#5a189a`.
- **Estado de integración:** Funcional.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Observaciones:** La clase `Enemy` funciona como implementación base. Su velocidad provisional es de 100 y su movimiento individual actual es hacia abajo. Cuando `inFormation` es verdadero, el movimiento individual se detiene para permitir que una formación controle al enemigo.

### BasicEnemy

- **Elemento:** Enemigo básico.
- **Categoría:** Enemigo.
- **Archivo de lógica:** `js/core/BasicEnemy.js`.
- **Clase base:** `Enemy`.
- **Tipo interno:** `basic`.
- **Recurso gráfico externo:** No utiliza uno directamente en esta clase.
- **Dimensiones:** Recibidas mediante los parámetros `width` y `height`.
- **Representación actual:** Hereda la representación gráfica de `Enemy`.
- **Método de dibujo:** Heredado de `Enemy`, mediante `ctx.fillRect()`.
- **Color actual:** `#5a189a`, heredado de `Enemy`.
- **Velocidad:** 100.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Observaciones:** Cuando pertenece a una formación (`inFormation`), su movimiento individual se detiene. Fuera de una formación se desplaza verticalmente hacia abajo y se desactiva al salir del Canvas.

### HeavyEnemy

- **Elemento:** Enemigo pesado.
- **Categoría:** Enemigo.
- **Archivo de lógica:** `js/core/HeavyEnemy.js`.
- **Clase base:** `Enemy`.
- **Tipo interno:** `heavy`.
- **Recurso gráfico externo:** No utiliza uno directamente en esta clase.
- **Dimensiones:** Recibidas mediante los parámetros `width` y `height`.
- **Representación actual:** Hereda la representación gráfica de `Enemy`.
- **Método de dibujo:** Heredado de `Enemy`, mediante `ctx.fillRect()`.
- **Color actual:** `#5a189a`, heredado de `Enemy`.
- **Velocidad:** 60.
- **Vida máxima:** 6.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Observaciones:** `HeavyEnemy` tiene una velocidad menor que la establecida en el enemigo base y fija su vida máxima en 6. No define un método de renderizado propio, por lo que conserva la representación visual de la clase `Enemy`.
### HunterEnemy

- **Elemento:** Enemigo cazador.
- **Categoría:** Enemigo.
- **Archivo de lógica:** `js/core/HunterEnemy.js`.
- **Clase base:** `Enemy`.
- **Tipo interno:** `hunter`.
- **Recurso gráfico externo:** No utiliza uno directamente en esta clase.
- **Dimensiones:** Recibidas mediante los parámetros `width` y `height`.
- **Representación actual:** Hereda la representación gráfica de `Enemy`.
- **Método de dibujo:** Heredado de `Enemy`, mediante `ctx.fillRect()`.
- **Color actual:** `#5a189a`, heredado de `Enemy`.
- **Velocidad vertical:** 100, heredada de `Enemy`.
- **Velocidad horizontal:** 140.
- **Vida máxima:** Recibida mediante el parámetro `maxHealth`; esta clase no establece un valor propio.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Comportamiento:** Se desplaza verticalmente hacia abajo y ajusta horizontalmente su posición en dirección al centro del jugador.
- **Observaciones:** Cuando `inFormation` es verdadero, su movimiento individual se detiene. Si recibe una referencia válida del jugador, compara el centro horizontal de ambas entidades y se desplaza a la izquierda o derecha para seguir su posición. Se desactiva cuando sale completamente por la parte inferior del Canvas.
### PursuerEnemy

- **Elemento:** Enemigo perseguidor.
- **Categoría:** Enemigo.
- **Archivo de lógica:** `js/core/PursuerEnemy.js`.
- **Clase base:** `Enemy`.
- **Tipo interno:** `pursuer`.
- **Recurso gráfico externo:** No utiliza uno directamente en esta clase.
- **Dimensiones:** Recibidas mediante los parámetros `width` y `height`.
- **Representación actual:** Hereda la representación gráfica de `Enemy`.
- **Método de dibujo:** Heredado de `Enemy`, mediante `ctx.fillRect()`.
- **Color actual:** `#5a189a`, heredado de `Enemy`.
- **Velocidad de persecución:** 110.
- **Vida máxima:** Recibida mediante el parámetro `maxHealth`; esta clase no establece un valor propio.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Comportamiento:** Persigue directamente al jugador mediante movimiento en los ejes X e Y.
- **Algoritmo de movimiento:** Calcula el vector entre el centro del enemigo y el centro del jugador, obtiene su distancia y normaliza la dirección para desplazarse hacia el jugador a una velocidad constante.
- **Observaciones:** Cuando `inFormation` es verdadero, su movimiento individual se detiene. Se desactiva si sale del Canvas por la parte inferior, izquierda o derecha.
### TurretEnemy

- **Elemento:** Enemigo torreta.
- **Categoría:** Enemigo.
- **Archivo de lógica:** `js/core/TurretEnemy.js`.
- **Clase base:** `Enemy`.
- **Tipo interno:** `turret`.
- **Recurso gráfico externo:** No utiliza uno directamente en esta clase.
- **Dimensiones:** Recibidas mediante los parámetros `width` y `height`.
- **Representación actual:** Hereda la representación gráfica de `Enemy`.
- **Método de dibujo:** Heredado de `Enemy`, mediante `ctx.fillRect()`.
- **Color actual:** `#5a189a`, heredado de `Enemy`.
- **Vida máxima:** Recibida mediante el parámetro `maxHealth`; esta clase no establece un valor propio.
- **Posición vertical de detención:** 180.
- **Patrón de disparo:** `aimed-single`.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Comportamiento:** Desciende hasta alcanzar la posición vertical `y = 180` y posteriormente permanece detenido.
- **Sistema de disparo:** Cuando está detenido y dispone del sistema de patrones, obtiene el patrón `aimed-single` y puede generar proyectiles dirigidos hacia el jugador mediante `enemyProjectilePool`.
- **Algoritmo de apuntado:** Calcula el vector desde el centro de la torreta hasta el centro del jugador, obtiene su distancia y normaliza la dirección. La velocidad final del proyectil se calcula utilizando `pattern.speed`.
- **Cadencia de disparo:** Determinada por `pattern.interval`, convertido de milisegundos a segundos.
- **Observaciones:** Cuando `inFormation` es verdadero, su comportamiento individual se detiene. Esta clase contiene lógica para disparar, pero los valores concretos de velocidad e intervalo del patrón deben verificarse en la configuración del sistema de patrones.

## Proyectiles

### Proyectil enemigo

- **Elemento:** Proyectil enemigo.
- **Categoría:** Proyectil.
- **Archivo de lógica:** `js/core/EnemyProjectile.js`.
- **Clase base:** `Entity`.
- **Recurso gráfico externo:** No utiliza actualmente.
- **Dimensiones:** 10 × 18 píxeles.
- **Representación actual:** Rectángulo dibujado directamente mediante Canvas.
- **Método de dibujo:** `ctx.fillRect()`.
- **Color actual:** `#ff6b6b`.
- **Velocidad base:** 260.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Movimiento:** Utiliza los componentes `velocityX` y `velocityY` para actualizar su posición.
- **Dirección predeterminada:** Si no se especifican otras velocidades al activarlo, `velocityX` es 0 y `velocityY` utiliza la velocidad base.
- **Observaciones:** El método `activate()` permite reutilizar el proyectil asignándole una nueva posición y nuevos componentes de velocidad. Esto permite que otros sistemas, como el enemigo torreta, generen proyectiles con diferentes direcciones.

### Sistema de reutilización de proyectiles enemigos

- **Sistema:** Object Pooling.
- **Archivo de lógica:** `js/core/EnemyProjectilePool.js`.
- **Tamaño predeterminado del pool:** 100 proyectiles.
- **Clase administrada:** `EnemyProjectile`.
- **Funcionamiento:** Los proyectiles se crean previamente y permanecen desactivados hasta que son necesarios.
- **Obtención de proyectiles:** `getProjectile()` busca un proyectil inactivo, lo reactiva y le asigna una nueva posición y velocidad.
- **Pool agotado:** Si todos los proyectiles están activos, `getProjectile()` devuelve `null`.
- **Reutilización:** Los proyectiles que salen de los límites del Canvas se desactivan y quedan disponibles para volver a utilizarse.
- **Reinicio:** El método `reset()` desactiva todos los proyectiles del pool.
- **Actualización:** Solo se actualizan los proyectiles que se encuentran activos.
- **Renderizado:** Solo se dibujan los proyectiles activos mediante su método `render()`.
- **Objetivo técnico:** Evitar la creación y eliminación constante de objetos durante la ejecución del juego mediante la reutilización de instancias existentes.

### Proyectil del jugador

- **Elemento:** Proyectil del jugador.
- **Categoría:** Proyectil.
- **Archivo de lógica:** `js/core/Projectile.js`.
- **Clase base:** `Entity`.
- **Recurso gráfico externo:** No utiliza actualmente.
- **Dimensiones:** 8 × 20 píxeles.
- **Representación actual:** Rectángulo dibujado directamente mediante Canvas.
- **Método de dibujo:** `ctx.fillRect()`.
- **Color actual:** `#f5f5dc`.
- **Velocidad:** 600.
- **Estado de integración:** Implementado en el código.
- **Animaciones:** No se observan animaciones mediante sprites en esta clase.
- **Origen/licencia:** No aplica a la representación actual, ya que se genera mediante código.
- **Movimiento:** Se desplaza verticalmente hacia arriba.
- **Actualización de posición:** Su posición vertical disminuye utilizando `this.y -= this.speed * deltaTime`.
- **Reutilización:** El método `activate()` permite asignar nuevamente su posición cuando el proyectil es activado.
- **Observaciones:** La representación gráfica actual es provisional y se genera completamente mediante código.


---

# Actualización del catálogo — Versión final

La versión final de *Tenebrae: Sorrow & Faith* incorpora recursos gráficos en formato PNG para representar personajes, enemigos, jefes y escenarios. Esta sección actualiza el catálogo anterior de acuerdo con los recursos incorporados en la versión final del proyecto.

## Sprites del jugador

La versión final contiene tres recursos gráficos principales para los personajes o variantes jugables.

### Apóstol

- **Categoría:** Jugador.
- **Archivo gráfico:** `assets/sprites/player/apostol.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del personaje Apóstol dentro del videojuego.
- **Integración:** El recurso es cargado por el sistema de assets del juego y utilizado durante la representación del jugador.

### Relicario

- **Categoría:** Jugador.
- **Archivo gráfico:** `assets/sprites/player/relicario.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del personaje Relicario dentro del videojuego.
- **Integración:** Forma parte de los recursos gráficos disponibles para los personajes del juego.

### Velo

- **Categoría:** Jugador.
- **Archivo gráfico:** `assets/sprites/player/velo.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del personaje Velo dentro del videojuego.
- **Integración:** Forma parte de los recursos gráficos disponibles para los personajes del juego.

> **Nota sobre origen y licencia:** La procedencia, herramienta de creación y licencia de estos archivos deberá indicarse de acuerdo con la información proporcionada por el integrante que creó o incorporó los recursos. No se asigna una licencia sin contar con esa información.

## Sprites de enemigos

La versión final incorpora seis recursos gráficos principales para representar diferentes tipos de enemigos.

### Enemigo básico

- **Categoría:** Enemigo.
- **Archivo gráfico:** `assets/sprites/enemies/basic.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del enemigo básico.

### Enemigo circular

- **Categoría:** Enemigo.
- **Archivo gráfico:** `assets/sprites/enemies/circular.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del enemigo identificado como circular.

### Enemigo pesado

- **Categoría:** Enemigo.
- **Archivo gráfico:** `assets/sprites/enemies/heavy.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del enemigo identificado como pesado.

### Enemigo cazador

- **Categoría:** Enemigo.
- **Archivo gráfico:** `assets/sprites/enemies/hunter.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del enemigo identificado como cazador.

### Enemigo perseguidor

- **Categoría:** Enemigo.
- **Archivo gráfico:** `assets/sprites/enemies/pursuer.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del enemigo identificado como perseguidor.

### Enemigo torreta

- **Categoría:** Enemigo.
- **Archivo gráfico:** `assets/sprites/enemies/turret.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del enemigo identificado como torreta.

> **Observación:** Los diferentes tipos de enemigos utilizan recursos gráficos independientes. Su comportamiento y lógica se encuentran implementados mediante las clases y sistemas correspondientes dentro de `js/core/`.

## Sprites de jefes

La versión final del videojuego incorpora cuatro recursos gráficos principales correspondientes a los jefes.

### Bestia de las Siete Campanas

- **Categoría:** Jefe.
- **Archivo gráfico:** `assets/sprites/bosses/bestia_siete_campanas.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del jefe Bestia de las Siete Campanas.
- **Lógica relacionada:** `js/core/BestiaSieteCampanas.js`

### Culto de la Llaga

- **Categoría:** Jefe.
- **Archivo gráfico:** `assets/sprites/bosses/culto_llaga.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del jefe Culto de la Llaga.
- **Lógica relacionada:** `js/core/CultoLlaga.js`

### Milagro Negro

- **Categoría:** Jefe.
- **Archivo gráfico:** `assets/sprites/bosses/milagro_negro.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del jefe Milagro Negro.
- **Lógica relacionada:** `js/core/MilagroNegro.js`

### Obispo Incorrupto

- **Categoría:** Jefe.
- **Archivo gráfico:** `assets/sprites/bosses/obispo_incorrupto.png`
- **Formato:** PNG.
- **Uso:** Representación gráfica del jefe Obispo Incorrupto.
- **Lógica relacionada:** `js/core/ObispoIncorrupto.js`
- **Prueba realizada:** Durante las pruebas funcionales se comprobó su aparición en el Nivel 2, Oleada 6/6, mostrando indicador de fase y barra de vida propia.

> **Origen y licencia:** La procedencia, herramienta de creación y licencia de los recursos deberá documentarse con la información proporcionada por el integrante que los creó o incorporó al proyecto.

## Escenarios y fondos

La versión final incorpora ocho fondos principales, correspondientes a los diferentes niveles y escenarios del videojuego.

### Nivel 1 — Atrio de los Penitentes
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level1_atrio_penitentes.png`
- **Formato:** PNG.
- **Uso:** Fondo utilizado para representar el escenario del primer nivel.

### Nivel 2 — Claustro de las Llagas
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level2_claustro_llagas.png`
- **Formato:** PNG.
- **Uso:** Fondo utilizado para representar el escenario del segundo nivel.

### Nivel 3 — Nave de los Incorruptos
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level3_nave_incorruptos.png`
- **Formato:** PNG.
- **Uso:** Fondo correspondiente al tercer nivel.

### Nivel 4 — Campanario de la Agonía
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level4_campanario_agonia.png`
- **Formato:** PNG.
- **Uso:** Fondo correspondiente al cuarto nivel.

### Nivel 5 — Cripta de los Rostros
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level5_cripta_rostros.png`
- **Formato:** PNG.
- **Uso:** Fondo correspondiente al quinto nivel.

### Nivel 6 — Altar de Carne
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level6_altar_carne.png`
- **Formato:** PNG.
- **Uso:** Fondo correspondiente al sexto nivel.

### Nivel 7 — Umbral del Milagro
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level7_umbral_milagro.png`
- **Formato:** PNG.
- **Uso:** Fondo correspondiente al séptimo nivel.

### Nivel 8 — Calamidad
- **Categoría:** Escenario / fondo.
- **Archivo:** `assets/backgrounds/level8_calamidad.png`
- **Formato:** PNG.
- **Uso:** Fondo correspondiente al octavo nivel.

Los fondos son administrados dentro del juego mediante los sistemas relacionados con `BackgroundManager.js` y `ParallaxBackground.js`.

---

## Proyectiles

El videojuego utiliza proyectiles tanto para el jugador como para los enemigos.

### Proyectiles del jugador
- **Categoría:** Proyectil.
- **Lógica principal:** `js/core/Projectile.js`
- **Administración:** `js/core/ProjectilePool.js`
- **Uso:** Permiten al jugador atacar a los enemigos durante el combate.
- **Prueba funcional:** Se comprobó que los disparos impactan a los enemigos, producen daño y permiten eliminarlos.

### Proyectiles enemigos
- **Categoría:** Proyectil enemigo.
- **Lógica principal:** `js/core/EnemyProjectile.js`
- **Administración:** `js/core/EnemyProjectilePool.js`
- **Uso:** Son utilizados por los enemigos para atacar al jugador.
- **Interacción:** Pueden producir daño al jugador cuando se detecta una colisión.

El uso de sistemas de reutilización de proyectiles permite administrar múltiples disparos durante el combate sin depender de crear continuamente nuevos objetos para cada disparo.

---

## Power-ups

La versión final incluye un sistema de power-ups administrado mediante:

- `js/core/PowerUpItem.js`
- `js/core/PowerUpManager.js`

Los power-ups pueden aparecer durante la partida y ser recogidos por el jugador para obtener efectos o mejoras temporales o relacionadas con las mecánicas del juego.

Durante las pruebas funcionales se comprobó que los power-ups pueden recogerse y que sus efectos se aplican durante la partida.

> Los nombres y efectos individuales de cada power-up deberán documentarse únicamente después de comprobarlos directamente en el código o durante la ejecución del juego.

---

## Efectos visuales

Los efectos visuales del videojuego son administrados principalmente mediante:

`js/core/EffectManager.js`

Este sistema permite gestionar efectos utilizados durante las diferentes acciones y eventos de la partida, complementando visualmente elementos como ataques, impactos y habilidades.

Además, la versión final incluye diferentes clases relacionadas con habilidades y efectos especiales, entre ellas:

- `ApostolAbility.js`
- `AshImpactAbility.js`
- `BellRumbleAbility.js`
- `BronzeBlocksAbility.js`
- `RelicarioAbilityController.js`
- `RelicarioSpecial.js`
- `VeloAbility.js`

Estas clases forman parte de los sistemas especiales asociados con personajes, habilidades y efectos del videojuego.

---

## Animaciones

La versión final utiliza recursos gráficos y sistemas de representación para mostrar los diferentes elementos durante la partida.

Las animaciones y cambios visuales se gestionan desde las clases correspondientes a cada entidad y desde los administradores gráficos del juego.

Entre los elementos visuales que presentan cambios o comportamiento dinámico se encuentran:

- jugador;
- enemigos;
- jefes;
- proyectiles;
- efectos de impacto;
- habilidades;
- power-ups;
- fondos y escenarios.

No se documenta el uso de una hoja de sprites o **sprite sheet** específica en esta sección, ya que esto deberá confirmarse directamente en la implementación antes de afirmarlo.

---

## Sistema de carga de recursos

La versión final incorpora:

`js/core/AssetManager.js`

Este componente forma parte de la administración de los recursos utilizados por el videojuego. Los archivos gráficos se encuentran organizados dentro de la carpeta `assets/`, principalmente en las carpetas correspondientes a jugadores, enemigos, jefes y fondos.

Esta organización permite separar los recursos visuales de la lógica JavaScript y facilita su localización y mantenimiento.

---

## Recursos de audio

Aunque los archivos de audio no son sprites, forman parte de los recursos multimedia utilizados por la versión final.

### Música

- `assets/audio/music/boss_theme.mp3`
- `assets/audio/music/tenebrae_menu_theme.mp3`
- `assets/audio/music/tenebrae_theme.mp3`

### Efectos de sonido

- `assets/audio/sfx/ability.wav`
- `assets/audio/sfx/hit.wav`
- `assets/audio/sfx/player_damage.wav`
- `assets/audio/sfx/shoot.wav`
- `assets/audio/sfx/shoot_apostol.wav`
- `assets/audio/sfx/shoot_relicario.wav`
- `assets/audio/sfx/shoot_velo.wav`

La reproducción y administración del audio se relaciona con:

`js/core/AudioManager.js`

Durante las pruebas funcionales se comprobó que el videojuego reproduce música de fondo y efectos de sonido durante el combate.

---

## Organización general de recursos gráficos

La versión final organiza los recursos principales de la siguiente manera:

assets/
├── backgrounds/
│   ├── level1_atrio_penitentes.png
│   ├── level2_claustro_llagas.png
│   ├── level3_nave_incorruptos.png
│   ├── level4_campanario_agonia.png
│   ├── level5_cripta_rostros.png
│   ├── level6_altar_carne.png
│   ├── level7_umbral_milagro.png
│   └── level8_calamidad.png
│
├── sprites/
│   ├── player/
│   │   ├── apostol.png
│   │   ├── relicario.png
│   │   └── velo.png
│   │
│   ├── enemies/
│   │   ├── basic.png
│   │   ├── circular.png
│   │   ├── heavy.png
│   │   ├── hunter.png
│   │   ├── pursuer.png
│   │   └── turret.png
│   │
│   └── bosses/
│       ├── bestia_siete_campanas.png
│       ├── culto_llaga.png
│       ├── milagro_negro.png
│       └── obispo_incorrupto.png
│
└── audio/
    ├── music/
    └── sfx/

---

## Origen, creación y licencias de los recursos

Para la entrega final se deberá especificar el origen de los recursos gráficos y de audio utilizados.

En caso de que hayan sido creados por los integrantes del equipo, deberá indicarse la herramienta utilizada para su elaboración.

En caso de que hayan sido obtenidos de una fuente externa, deberá registrarse:

- nombre o descripción del recurso;
- autor o creador, cuando corresponda;
- página o fuente de procedencia;
- tipo de licencia o condiciones de uso.

Esta información no se asigna de manera automática en este catálogo para evitar registrar una autoría, herramienta o licencia que no haya sido confirmada por los integrantes del proyecto.

---

## Conclusión del catálogo actualizado

La versión final de *Tenebrae: Sorrow & Faith* amplía considerablemente el apartado visual respecto a las primeras versiones del proyecto. Actualmente se dispone de recursos gráficos específicos para personajes, seis tipos de enemigos, cuatro jefes y ocho escenarios, además de sistemas para proyectiles, power-ups, efectos y habilidades.

La separación de los recursos dentro de `assets/` y de la lógica dentro de `js/core/` permite mantener una estructura organizada y facilita la administración de los elementos utilizados durante la ejecución del videojuego.

Las pruebas realizadas sobre la versión final permitieron comprobar visualmente la carga de escenarios, sprites del jugador, enemigos y el jefe El Obispo Incorrupto, además del funcionamiento de proyectiles, power-ups y efectos asociados al combate.

