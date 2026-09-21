
# Arquitectura del proyecto — Tenebrae: Sorrow & Faith

## Objetivo

Este documento describe la arquitectura utilizada en el desarrollo de Tenebrae: Sorrow & Faith.

Su propósito es documentar la organización de los principales componentes del videojuego, las responsabilidades de sus clases y la forma en que los diferentes sistemas se relacionan entre sí.

La documentación se basa en la estructura y el código implementado actualmente en el proyecto. Los sistemas que todavía se encuentren en desarrollo o que no estén integrados completamente se indicarán de forma explícita.

 ## Estructura general del proyecto
El proyecto está organizado en diferentes carpetas que separan las responsabilidades principales del videojuego.

La estructura general utilizada actualmente es:

```text
tenebrae-sorrow-faith/
├── css/
├── docs/
│   ├── arquitectura/
│   ├── pruebas/
│   └── sprites/
├── js/
├── server/
├── .gitignore
├── index.html
└── package.json


## Organización de la lógica del videojuego

La lógica principal del videojuego se encuentra organizada dentro de la carpeta `js/`. En particular, la carpeta `js/core/` contiene clases y sistemas responsables del comportamiento de las entidades y de diferentes mecánicas del juego.

Entre los componentes identificados actualmente se encuentran:

- **Entity:** clase base utilizada para representar entidades dentro del videojuego.
- **DamageableEntity:** extiende el comportamiento de una entidad para incorporar un sistema de vida y daño.
- **Player:** representa al jugador y administra aspectos como movimiento, disparo, vida y estadísticas.
- **Enemy:** funciona como clase base para los enemigos.
- **BasicEnemy:** representa un enemigo básico con desplazamiento vertical.
- **HeavyEnemy:** representa un enemigo con mayor resistencia y una velocidad de movimiento menor.
- **HunterEnemy:** enemigo capaz de ajustar horizontalmente su posición siguiendo la ubicación del jugador.
- **PursuerEnemy:** enemigo que calcula una dirección hacia el jugador y se desplaza hacia su posición.
- **TurretEnemy:** enemigo que se detiene en una posición determinada y puede realizar disparos dirigidos hacia el jugador.
- **Projectile:** representa los proyectiles disparados por el jugador.
- **ProjectilePool:** administra la reutilización de los proyectiles del jugador mediante Object Pooling.
- **EnemyProjectile:** representa los proyectiles generados por los enemigos.
- **EnemyProjectilePool:** administra un conjunto reutilizable de proyectiles enemigos mediante Object Pooling.
- **FormationManager:** administra el funcionamiento de las formaciones de enemigos.
- **Game:** coordina los principales sistemas y el funcionamiento general de la partida.
- **HUD:** administra la información que se muestra al jugador durante la partida.

## Jerarquía de entidades

El proyecto utiliza herencia para compartir características y comportamientos entre diferentes tipos de entidades del videojuego.

La relación principal puede representarse de la siguiente manera:

```text
Entity
├── DamageableEntity
│   ├── Player
│   └── Enemy
│       ├── BasicEnemy
│       ├── HeavyEnemy
│       ├── HunterEnemy
│       ├── PursuerEnemy
│       ├── TurretEnemy
│       └── CircularEnemy
├── Projectile
└── EnemyProjectile


### Entity

La clase `Entity` funciona como una clase base para diferentes objetos del videojuego.

Su constructor recibe las coordenadas `x` y `y`, además de `width` y `height`, que representan la posición y las dimensiones de la entidad.

También utiliza la propiedad `active` para indicar si una entidad se encuentra activa dentro del juego.

Los métodos `activate()` y `deactivate()` permiten cambiar este estado sin eliminar necesariamente el objeto de memoria.

#### Detección de colisiones

El método `collidesWith(other)` permite comprobar si una entidad está colisionando con otra.

La detección utiliza las coordenadas y dimensiones de ambos objetos para comprobar la superposición de sus rectángulos:

`this.x < other.x + other.width`

`this.x + this.width > other.x`

`this.y < other.y + other.height`

`this.y + this.height > other.y`

Si las cuatro condiciones se cumplen, los rectángulos se están superponiendo y el método devuelve `true`.

Este sistema corresponde a una detección de colisiones rectangular basada en los límites de las entidades y es reutilizado por los componentes que heredan de `Entity`.

### DamageableEntity

La clase `DamageableEntity` hereda de `Entity` y agrega un sistema de vida para las entidades que pueden recibir daño.

Su constructor recibe `maxHealth`, que representa la cantidad máxima de vida de la entidad.

La propiedad `health` almacena la vida actual y se inicializa con el mismo valor de `maxHealth`.

El método `takeDamage(amount)` resta a `health` la cantidad de daño recibida. Si el resultado es menor que cero, la vida se limita a `0`.

El método `isDestroyed()` comprueba si la vida de la entidad es menor o igual a cero y devuelve el resultado de esa condición.

La clase también sobrescribe el método `activate()`. Primero ejecuta `super.activate()` para volver a activar la entidad y después restaura su vida mediante:

`health = maxHealth`

De esta manera, las entidades que heredan de `DamageableEntity`, como `Player` y `Enemy`, pueden compartir el mismo sistema básico de vida y daño.

## Sistema de proyectiles y Object Pooling

El proyecto utiliza el patrón Object Pooling para administrar los proyectiles. Su objetivo es reutilizar objetos previamente creados en lugar de crear y eliminar continuamente nuevas instancias durante la ejecución del videojuego.

### Proyectiles del jugador

La clase `Projectile` representa los disparos realizados por el jugador. Cada proyectil tiene una representación gráfica generada mediante Canvas y se desplaza verticalmente hacia arriba.

`ProjectilePool` es responsable de administrar y reutilizar las instancias de los proyectiles del jugador.

### Proyectiles enemigos

La clase `EnemyProjectile` representa los proyectiles utilizados por los enemigos. Estos proyectiles pueden desplazarse utilizando componentes de velocidad en los ejes X e Y.

La clase `EnemyProjectilePool` administra un conjunto de proyectiles enemigos reutilizables. De manera predeterminada, el pool crea 100 instancias de `EnemyProjectile`.

Cuando se necesita un proyectil enemigo, `getProjectile()` busca una instancia inactiva, la activa y le asigna una nueva posición y velocidad. Cuando un proyectil sale de los límites del Canvas, se desactiva y queda disponible para volver a utilizarse.

El método `reset()` permite desactivar todos los proyectiles administrados por el pool.

### Flujo general

El funcionamiento puede representarse de forma simplificada de la siguiente manera:

Player / Enemy
      ↓
Solicita un proyectil
      ↓
ProjectilePool / EnemyProjectilePool
      ↓
Busca una instancia inactiva
      ↓
Activa y posiciona el proyectil
      ↓
El proyectil se actualiza y renderiza
      ↓
Sale del área de juego
      ↓
Se desactiva
      ↓
Queda disponible para reutilizarse

## Arquitectura del sistema de enemigos

El sistema de enemigos utiliza una clase base llamada `Enemy`, de la cual heredan diferentes clases especializadas. Esta organización permite compartir características comunes y, al mismo tiempo, implementar comportamientos distintos para cada tipo de enemigo.

### Enemy

`Enemy` funciona como la clase base. Cuando no está siendo controlado por una formación, su comportamiento provisional consiste en desplazarse verticalmente hacia abajo.

La propiedad `inFormation` permite determinar si el movimiento del enemigo está siendo controlado por un sistema de formación. Cuando su valor es `true`, el movimiento individual del enemigo se detiene.

### BasicEnemy

`BasicEnemy` mantiene un comportamiento sencillo de desplazamiento vertical hacia abajo. Su velocidad establecida en la clase es de 100.

### HeavyEnemy

`HeavyEnemy` representa una variante más resistente. Su velocidad se establece en 60 y su vida máxima se fija en 6.

### HunterEnemy

`HunterEnemy` combina el desplazamiento vertical con seguimiento horizontal del jugador. Compara el centro horizontal del enemigo con el centro horizontal del jugador para decidir si debe desplazarse hacia la izquierda o hacia la derecha.

Su velocidad horizontal es de 140.

### PursuerEnemy

`PursuerEnemy` realiza una persecución en dos dimensiones. Calcula el vector existente entre su posición y la del jugador, obtiene la distancia y normaliza la dirección antes de realizar el desplazamiento.

Su velocidad de persecución es de 110.

### TurretEnemy

`TurretEnemy` desciende hasta alcanzar la posición vertical `y = 180`. Después permanece detenido y puede utilizar un patrón de disparo dirigido denominado `aimed-single`.

Para apuntar, calcula la dirección desde el centro de la torreta hasta el centro del jugador y utiliza el sistema de proyectiles enemigos para generar el disparo.

### CircularEnemy

`CircularEnemy` implementa un movimiento circular cuando deja de estar controlado por una formación.

Al comenzar su movimiento individual, guarda su posición como centro de la órbita mediante `centerX` y `centerY`.

El enemigo utiliza un radio de órbita de 70 y una velocidad angular de 1.5. En cada actualización incrementa su ángulo utilizando `deltaTime`.

Su nueva posición se calcula mediante `Math.cos()` para el eje X y `Math.sin()` para el eje Y, generando un desplazamiento circular alrededor de su punto central.

Mientras `inFormation` sea `true`, el enemigo no ejecuta este movimiento individual.

### Relación general

Enemy
├── BasicEnemy → movimiento vertical
├── HeavyEnemy → mayor resistencia y menor velocidad
├── HunterEnemy → seguimiento horizontal
├── PursuerEnemy → persecución en X e Y
├── TurretEnemy → posición fija y disparo dirigido
└── CircularEnemy → movimiento circular

## Sistema de formaciones

El proyecto cuenta con un sistema destinado a organizar grupos de enemigos en diferentes formaciones.

Este sistema utiliza clases específicas para representar las formaciones y un `FormationManager` encargado de administrarlas.

Antes de documentar cada formación como funcional, se verificará su integración actual con el resto del videojuego.

### Formation

La clase `Formation` funciona como clase base para administrar grupos de enemigos dentro de una formación.

Internamente mantiene un arreglo llamado `enemies`, donde almacena los enemigos que pertenecen al grupo.

Cuando un enemigo se agrega mediante `addEnemy()`, su propiedad `inFormation` se establece en `true`. Esto permite que la formación controle temporalmente su movimiento.

Mientras la formación está activa, el método `update(deltaTime)` desplaza como grupo a todos los enemigos activos utilizando `speedX` y `speedY`.

La configuración base utiliza una velocidad horizontal de 60 y una velocidad vertical de 0.

La formación también utiliza `releaseDelay` y `releaseTimer` para controlar el tiempo durante el cual mantiene agrupados a los enemigos. Actualmente, `releaseDelay` tiene un valor de 3 segundos.

Cuando transcurren los 3 segundos, `releaseEnemies()` establece `inFormation` en `false` para los enemigos activos y desactiva la formación. A partir de ese momento, cada enemigo puede ejecutar su comportamiento individual.

El método `isEmpty()` permite comprobar si todavía existe algún enemigo activo dentro de la formación.

### LineFormation

La clase `LineFormation` hereda de `Formation` y organiza a los enemigos en una línea horizontal.

El método `arrange(startX, startY, spacing)` recorre los enemigos almacenados en la formación y asigna su posición.

Todos los enemigos utilizan el mismo valor vertical `startY`.

La posición horizontal de cada enemigo se calcula mediante:

`startX + index * spacing`

De esta manera, cada integrante se coloca a una distancia determinada por `spacing` con respecto al anterior.

Esta formación se utiliza actualmente en la primera oleada del videojuego con enemigos de tipo `BasicEnemy`. 

### VFormation

La clase `VFormation` hereda de `Formation` y organiza a los enemigos utilizando una distribución con forma de V.

El método `arrange(centerX, centerY, spacingX, spacingY)` utiliza un punto central como referencia para calcular la posición de cada integrante.

Primero se calcula el punto medio de la cantidad de enemigos mediante:

`(total - 1) / 2`

Después, cada enemigo obtiene un desplazamiento respecto a ese punto medio.

La posición horizontal se calcula utilizando `centerX`, el desplazamiento y `spacingX`.

La posición vertical utiliza `Math.abs(offset)` junto con `spacingY`, permitiendo distribuir simétricamente a los enemigos a ambos lados del centro.

Esta formación se utiliza actualmente en la segunda oleada del videojuego con enemigos de tipo `HunterEnemy`.

### CircleFormation

La clase `CircleFormation` hereda de `Formation` y organiza a los enemigos alrededor de una circunferencia.

El método `arrange(centerX, centerY, radius)` recibe el centro de la formación y el radio que tendrá el círculo.

Primero obtiene la cantidad total de enemigos. Si la formación no contiene enemigos, el método termina para evitar realizar cálculos innecesarios.

El espacio angular entre cada enemigo se calcula mediante:

`(Math.PI * 2) / total`

Esto divide los 360 grados de la circunferencia de manera uniforme entre todos los integrantes.

Para calcular la posición de cada enemigo se utilizan las funciones trigonométricas `Math.cos()` y `Math.sin()`:

`x = centerX + Math.cos(angle) * radius`

`y = centerY + Math.sin(angle) * radius`

De esta manera, los enemigos quedan distribuidos uniformemente alrededor del punto central.

Esta formación se utiliza actualmente en la tercera oleada del videojuego con enemigos de tipo `TurretEnemy`.

### ZigzagFormation

La clase `ZigzagFormation` hereda de `Formation` y organiza a los enemigos utilizando un patrón de zigzag.

El método `arrange(startX, startY, spacingX, spacingY)` calcula la posición de cada enemigo utilizando su índice dentro de la formación.

La posición horizontal aumenta progresivamente mediante:

`startX + index * spacingX`

Para determinar la posición vertical se utiliza el operador módulo (`%`).

Si el índice del enemigo es par (`index % 2 === 0`), su posición vertical es `startY`.

Si el índice es impar, su posición vertical se calcula como:

`startY + spacingY`

Esta alternancia entre dos posiciones verticales genera visualmente el patrón de zigzag.

Esta formación se utiliza actualmente en la cuarta oleada del videojuego con enemigos de tipo `CircularEnemy`.

### ColumnFormation

La clase `ColumnFormation` hereda de `Formation` y organiza a los enemigos en una columna vertical.

El método `arrange(x, startY, spacingY)` utiliza una misma posición horizontal `x` para todos los integrantes de la formación.

La posición vertical de cada enemigo se calcula mediante:

`startY + index * spacingY`

De esta manera, cada enemigo se coloca debajo del anterior manteniendo una separación determinada por `spacingY`.

A diferencia de una formación horizontal, en este caso la coordenada `x` permanece constante mientras la coordenada `y` aumenta progresivamente.

Esta formación se utiliza actualmente en la quinta oleada del videojuego con enemigos de tipo `HeavyEnemy`.
### SwarmFormation

La clase `SwarmFormation` hereda de `Formation` y organiza a los enemigos en una distribución compacta de tipo enjambre.

El método `arrange(centerX, centerY, spacingX, spacingY)` utiliza un arreglo de seis posiciones relativas que indican dónde debe colocarse cada integrante respecto al centro de la formación.

Las posiciones utilizadas son:

- `(0, 0)`
- `(-1, 0)`
- `(1, 0)`
- `(-0.5, 1)`
- `(0.5, 1)`
- `(0, 2)`

La posición final de cada enemigo se calcula multiplicando estos valores relativos por `spacingX` y `spacingY` y sumándolos a `centerX` y `centerY`.

El operador módulo (`%`) permite reutilizar las posiciones definidas si la cantidad de enemigos supera el número de posiciones disponibles.

Esta formación se utiliza actualmente en la sexta oleada del videojuego con enemigos de tipo `PursuerEnemy`.

### FormationManager

`FormationManager` es el componente encargado de crear, almacenar, actualizar y reiniciar las formaciones de enemigos utilizadas por el videojuego.

Internamente mantiene un arreglo llamado `formations`, donde se registran las formaciones que se crean durante la ejecución de la partida.

Actualmente, `FormationManager` dispone de métodos para crear los siguientes tipos de formación:

- `Formation`
- `LineFormation`
- `VFormation`
- `CircleFormation`
- `ZigzagFormation`
- `ColumnFormation`
- `SwarmFormation`

Cada método de creación genera una nueva instancia de la formación correspondiente, la agrega al arreglo `formations` y devuelve la instancia creada para que pueda utilizarse posteriormente.

El método `update(deltaTime)` recorre las formaciones registradas y actualiza únicamente aquellas que se encuentran activas.

El método `reset()` vacía el arreglo `formations`, permitiendo reiniciar el sistema de formaciones cuando sea necesario.

El método `hasActiveFormations()` recorre las formaciones almacenadas y permite determinar si todavía existe al menos una formación activa.

### Integración de las formaciones con las oleadas

La integración de las formaciones con el sistema de oleadas se realiza mediante `EnemyManager`.

Actualmente, el método `createWave()` de `EnemyManager` contempla seis oleadas diferentes. Cada una utiliza una formación y un tipo de enemigo específico:

| Oleada | Formación | Tipo de enemigo | Cantidad |
|---|---|---|---:|
| 1 | `LineFormation` | `BasicEnemy` | 3 |
| 2 | `VFormation` | `HunterEnemy` | 5 |
| 3 | `CircleFormation` | `TurretEnemy` | 6 |
| 4 | `ZigzagFormation` | `CircularEnemy` | 6 |
| 5 | `ColumnFormation` | `HeavyEnemy` | 5 |
| 6 | `SwarmFormation` | `PursuerEnemy` | 6 |

Para crear una oleada, `EnemyManager` solicita al `FormationManager` la formación correspondiente. Después crea los enemigos, los agrega a la formación mediante `addEnemy()` y utiliza `arrange()` para establecer su distribución inicial.

De esta manera, las formaciones `LineFormation`, `VFormation`, `CircleFormation`, `ZigzagFormation`, `ColumnFormation` y `SwarmFormation` se encuentran actualmente conectadas con el sistema de oleadas del proyecto.

## Coordinación general del videojuego

### Game

La clase `Game` funciona como el componente principal encargado de coordinar los diferentes sistemas del videojuego.

Durante su inicialización crea y mantiene las instancias principales de:

- `InputManager`
- `Player`
- `ProjectilePool`
- `EnemyProjectilePool`
- `EnemyManager`
- `PatternSystem`
- `HUD`
- `GameStateUI`
- `WaveManager`

El juego utiliza un `ProjectilePool` de 100 proyectiles para los disparos del jugador y un `EnemyProjectilePool` de 100 proyectiles para los disparos enemigos.

`Game` también mantiene los estados `levelFinished` y `gameOver`, utilizados para determinar si el nivel terminó o si el jugador perdió la partida.

El `WaveManager` se inicializa con un total de 6 oleadas. Al comenzar la partida, `Game` solicita a `EnemyManager` la creación de la oleada correspondiente a `currentWave`.

### Ciclo de actualización del juego

El método `update(deltaTime)` coordina la actualización de la lógica del videojuego durante cada ciclo de ejecución.

Mientras la partida se encuentra activa, el proceso general se realiza en el siguiente orden:

1. Se actualiza el estado y movimiento del jugador.
2. Se procesa el disparo del jugador mediante `handlePlayerShooting()`.
3. Se actualizan los proyectiles del jugador.
4. Se actualizan los proyectiles enemigos.
5. Se actualizan los enemigos mediante `EnemyManager`.
6. Se comprueban las colisiones entre proyectiles del jugador y enemigos.
7. Se comprueban las colisiones entre enemigos y el jugador.
8. Se comprueban las colisiones entre proyectiles enemigos y el jugador.
9. Se verifica si el jugador ha llegado al estado de Game Over.
10. Se comprueba si la oleada actual ha terminado.

Si `gameOver` o `levelFinished` están activos, la actualización normal de la partida se detiene. En estos estados, la tecla `R` permite ejecutar `restartGame()` para reiniciar la partida.

### Control y avance de las oleadas

`Game` utiliza `WaveManager` para controlar el progreso de las oleadas. Actualmente el juego está configurado con un máximo de 6 oleadas.

El método `checkWaveFinished()` comprueba si todavía existen enemigos activos mediante `EnemyManager`.

Cuando ya no quedan enemigos activos:

1. La oleada actual se marca como terminada mediante `markWaveFinished()`.
2. Se eliminan del administrador las referencias a enemigos inactivos.
3. Se comprueba mediante `canAdvance()` si existe otra oleada.
4. Si existe otra oleada, se ejecuta `startNextWave()`.
5. Si ya no existen más oleadas, se ejecuta `finishLevel()`.

`startNextWave()` utiliza `advanceWave()` para avanzar el contador de oleada. Después reinicia los proyectiles enemigos y solicita a `EnemyManager` la creación de la siguiente oleada.

Al finalizar la sexta y última oleada, `finishLevel()` establece `levelFinished` en `true`. A partir de ese momento se detiene la lógica normal de la partida y `GameStateUI` muestra el estado de nivel terminado.

### Reinicio de la partida

Cuando el jugador se encuentra en estado de `gameOver` o `levelFinished`, puede presionar la tecla `R` para ejecutar el método `restartGame()`.

Este método restablece los principales sistemas de la partida:

1. `levelFinished` vuelve a `false`.
2. `gameOver` vuelve a `false`.
3. Se reinicia el jugador mediante `player.reset()`.
4. Se reinicia `EnemyManager`.
5. Se vuelve a establecer la semilla `gameSeed` en `EnemyManager`.
6. Se reinicia el pool de proyectiles del jugador.
7. Se reinicia el pool de proyectiles enemigos.
8. Se vuelve a establecer la semilla en `PatternSystem`.
9. Se reinicia `WaveManager`.
10. Se crea nuevamente la primera oleada.

De esta manera, la partida puede comenzar nuevamente desde su estado inicial sin necesidad de recargar la página.

### Ciclo principal y renderizado

El método `gameLoop(tiempoActual)` mantiene la ejecución continua del videojuego.

En cada ciclo se calcula `deltaTime` utilizando el tiempo actual y el tiempo registrado en el ciclo anterior. El resultado se divide entre 1000 para trabajar el tiempo en segundos.

Después se ejecutan dos procesos principales:

1. `update(deltaTime)`: actualiza la lógica y el estado del videojuego.
2. `render()`: dibuja en pantalla el estado actual de la partida.

Al finalizar cada ciclo, `requestAnimationFrame()` solicita al navegador la ejecución del siguiente fotograma.

El método `render()` limpia primero el Canvas mediante `clearRect()` y posteriormente dibuja los elementos principales del juego, incluyendo enemigos, jugador, proyectiles y HUD.

El jugador solamente se renderiza mientras no se encuentre destruido.

Además, dependiendo del estado de la partida, `GameStateUI` puede mostrar la pantalla de nivel terminado o la pantalla de Game Over.

Finalmente, el método `start()` utiliza `requestAnimationFrame()` para iniciar el ciclo principal del videojuego.

## Administración de oleadas

### WaveManager

La clase `WaveManager` es responsable de controlar el número de la oleada actual y determinar si todavía es posible avanzar a una nueva oleada.

Internamente utiliza las siguientes propiedades:

- `currentWave`: almacena el número de la oleada actual. Su valor inicial es 1.
- `maxWaves`: establece la cantidad máxima de oleadas.
- `waveFinished`: indica si la oleada actual ha terminado.

El constructor de `WaveManager` utiliza 2 como valor predeterminado para `maxWaves`. Sin embargo, en la configuración actual del videojuego, la clase `Game` crea `WaveManager` con un máximo de 6 oleadas.

El método `canAdvance()` comprueba si `currentWave` es menor que `maxWaves`.

El método `advanceWave()` verifica primero si es posible avanzar. Si existen más oleadas, incrementa `currentWave`, establece `waveFinished` nuevamente en `false` y devuelve `true`. Si no es posible avanzar, devuelve `false`.

El método `markWaveFinished()` establece `waveFinished` en `true`.

Finalmente, `reset()` devuelve el administrador a su estado inicial, estableciendo `currentWave` en 1 y `waveFinished` en `false`.

## Interfaz de información

### HUD

La clase `HUD` es responsable de mostrar durante la partida información relevante sobre el estado del jugador y el progreso del videojuego.

El método `render()` recibe el contexto gráfico del Canvas, el jugador, la oleada actual, el número máximo de oleadas y la semilla utilizada por la partida.

Actualmente el HUD muestra los siguientes datos:

- **Oleada:** muestra la oleada actual y el total de oleadas.
- **Vida:** muestra la vida actual del jugador y su vida máxima.
- **Disparos:** muestra la cantidad de disparos realizados por el jugador.
- **Impactos:** muestra la cantidad de proyectiles que han impactado a un enemigo.
- **Precisión:** muestra el porcentaje de precisión obtenido mediante `player.getAccuracy()`, utilizando dos decimales.
- **Enemigos destruidos:** muestra la cantidad total de enemigos eliminados por el jugador.
- **Seed:** muestra la semilla utilizada durante la partida.

La información se dibuja directamente sobre el Canvas mediante `fillText()`.

### GameStateUI

La clase `GameStateUI` es responsable de mostrar mensajes relacionados con los estados especiales de la partida.

Actualmente administra dos estados visuales principales:

#### Nivel terminado

El método `renderLevelFinished()` muestra el mensaje:

`NIVEL TERMINADO`

Debajo del mensaje principal se muestra la instrucción:

`Presiona R para reiniciar`

#### Game Over

El método `renderGameOver()` muestra el mensaje:

`GAME OVER`

También muestra la instrucción:

`Presiona R para reiniciar`

Ambas interfaces se dibujan directamente sobre el Canvas mediante `fillText()` y colocan los mensajes en la zona central de la pantalla.

La clase `Game` determina cuándo debe mostrarse cada interfaz utilizando los estados `levelFinished` y `gameOver`.

## Sistema de patrones de disparo

### PatternSystem

La clase `PatternSystem` administra las configuraciones de diferentes patrones de disparo utilizados por los enemigos.

Al crearse, recibe una semilla y genera una instancia de `SeededRandom`. Posteriormente registra los patrones predeterminados mediante `registerDefaultPatterns()`.

Actualmente se encuentran registrados los siguientes patrones:

- `aimed-single`: disparo dirigido de un proyectil.
- `radial-8`: patrón radial de 8 proyectiles.
- `spiral-8`: configuración radial de 8 proyectiles con rotación.
- `cross-4`: patrón radial de 4 proyectiles.
- `burst-5`: ráfaga de 5 proyectiles distribuida dentro de un ángulo determinado.
- `wave-5`: patrón de 5 proyectiles cuya dirección incorpora una variación basada en una función seno.
- `random-5`: patrón de 5 proyectiles con variaciones de dirección generadas mediante `SeededRandom`.
- `rotating-6`: patrón de 6 proyectiles con distribución radial y rotación.
- `combo-aimed-radial`: configuración que combina los patrones `aimed-single` y `radial-8`.

El método `registerPattern()` permite almacenar una configuración utilizando un nombre como identificador.

`getPattern()` permite obtener una configuración registrada y `hasPattern()` permite comprobar si un patrón existe.

La clase también contiene métodos para calcular las velocidades de diferentes tipos de patrones:

- `calculateRadialVelocities()`
- `calculateBurstVelocities()`
- `calculateWaveVelocities()`
- `calculateRandomVelocities()`

Estos métodos utilizan cálculos trigonométricos para obtener los componentes `velocityX` y `velocityY` de los proyectiles.

Finalmente, `setSeed()` permite restablecer la semilla utilizada por el generador pseudoaleatorio y `getSeed()` permite consultar su valor actual.

### SeededRandom

La clase `SeededRandom` implementa un generador de números pseudoaleatorios basado en una semilla.

El constructor recibe una semilla inicial y la convierte a un entero sin signo de 32 bits mediante el operador `>>> 0`.

El método `setSeed()` permite establecer nuevamente la semilla del generador.

El método `next()` actualiza el estado interno mediante la siguiente operación:

`seed = (seed * 1664525 + 1013904223) >>> 0`

Después divide el resultado entre `4294967296` para obtener un valor pseudoaleatorio dentro del intervalo de 0 hasta un valor menor que 1.

Este sistema permite obtener secuencias reproducibles: si se utiliza la misma semilla inicial y se realizan las llamadas en el mismo orden, se genera la misma secuencia de valores.

`PatternSystem` utiliza esta clase en el patrón `random-5`, evitando depender directamente de `Math.random()` para calcular la variación aleatoria de los disparos.

## Sistema de entrada

### InputManager

La clase `InputManager` es responsable de registrar el estado de las teclas utilizadas durante la ejecución del videojuego.

Internamente mantiene un objeto llamado `keys`, donde se almacena si una tecla se encuentra presionada o liberada.

Para detectar la entrada del teclado utiliza dos eventos del navegador:

- `keydown`: establece el estado de la tecla en `true` cuando se presiona.
- `keyup`: establece el estado de la tecla en `false` cuando se libera.

Las teclas se identifican mediante `event.code`.

El método `isPressed(code)` permite consultar si una tecla específica se encuentra presionada.

`InputManager` no asigna por sí mismo una acción específica a cada tecla. Las diferentes clases del videojuego consultan este sistema para determinar qué acciones deben realizar, como el movimiento, el disparo o el reinicio de la partida.


## Inicialización del videojuego

### main.js

El archivo `main.js` funciona como punto de inicio del videojuego.

Primero obtiene el elemento Canvas con el identificador `game-canvas` y su contexto gráfico 2D.

Posteriormente, la función asíncrona `startGame()` establece inicialmente una semilla de respaldo con el valor `12345`.

El sistema intenta obtener una semilla diaria realizando una petición mediante `fetch()` al endpoint:

`/api/daily-seed`

Si la respuesta del servidor es correcta, la semilla recibida en `data.seed` sustituye a la semilla de respaldo.

Si ocurre un error al realizar la petición o la respuesta no es correcta, el juego conserva la semilla de respaldo `12345`.

Finalmente, se crea una instancia de `Game` proporcionando el Canvas, el contexto 2D y la semilla obtenida:

`new Game(canvas, ctx, gameSeed)`

Después se ejecuta `game.start()` para iniciar el ciclo principal del videojuego.

## Servidor con Node.js

### server.cjs

El archivo `server/server.cjs` implementa el servidor utilizado por el proyecto mediante módulos nativos de Node.js.

El servidor utiliza principalmente los módulos:

- `http`: permite crear el servidor HTTP.
- `fs`: permite comprobar y leer los archivos que serán enviados al navegador.
- `path`: permite construir y normalizar las rutas de los archivos.

El servidor funciona en el puerto `3000` y utiliza como directorio raíz la carpeta principal del proyecto.

### Seed diaria

La función `getDailySeed()` genera una semilla numérica utilizando la fecha actual del servidor.

La semilla se calcula mediante:

`year * 10000 + month * 100 + day`

De esta manera, la fecha queda representada con el formato numérico `AAAAMMDD`.

Por ejemplo, una fecha correspondiente al año 2026, mes 9 y día 21 produciría la seed `20260921`.

El endpoint `/api/daily-seed` ejecuta esta función y responde con un objeto JSON que contiene la semilla:

`{ "seed": valor }`

La respuesta utiliza el código HTTP `200` y establece `Cache-Control: no-store` para evitar que el navegador reutilice una respuesta almacenada en caché.

### Servicio de archivos

Además de proporcionar la seed diaria, el servidor permite entregar los archivos necesarios para ejecutar el videojuego.

Cuando se solicita la ruta `/`, el servidor utiliza `index.html` como página principal.

El servidor determina el tipo de contenido de los archivos mediante su extensión y contempla formatos como HTML, CSS, JavaScript, JSON, imágenes y audio.

También contempla respuestas de error:

- `403`: acceso denegado cuando la ruta intenta salir del directorio del proyecto.
- `404`: archivo no encontrado.
- `500`: error interno al leer un archivo.

Finalmente, `server.listen()` inicia el servidor en el puerto `3000`.

## Configuración de Node.js

### package.json

El archivo `package.json` contiene la configuración básica del proyecto para Node.js.

Actualmente el proyecto se identifica como `tenebrae-sorrow-faith`, con la versión `1.0.0`.

La propiedad `"type": "module"` establece el uso de módulos ES para los archivos JavaScript del proyecto, permitiendo utilizar instrucciones como `import` y `export`.

Actualmente `package.json` no contiene dependencias externas declaradas.

El apartado `scripts` contiene únicamente un script de prueba predeterminado y no incluye todavía un script específico para iniciar `server/server.cjs`.

Por esta razón, la documentación no debe indicar `npm start` como comando de ejecución mientras dicho script no exista.

## Estructura de la página principal

### index.html

El archivo `index.html` funciona como la página principal desde la cual se carga el videojuego.

El documento utiliza HTML5 y establece el idioma de la página en español mediante `lang="es"`.

Dentro del elemento `<main>` se encuentra el contenedor principal del juego con el identificador `game-container`.

La página muestra el título `TENEBRAE: SORROW & FAITH` y contiene un elemento `<canvas>` con el identificador `game-canvas`.

El Canvas tiene actualmente una resolución de:

`1280 × 720 píxeles`

Este Canvas funciona como el área gráfica principal donde se renderizan el jugador, los enemigos, los proyectiles, el HUD y los diferentes estados visuales de la partida.

La hoja de estilos utilizada por la página se carga desde:

`css/main.css`

Finalmente, el videojuego se inicia cargando:

`js/main.js`

El script utiliza `type="module"`, permitiendo trabajar con los módulos ES utilizados por las diferentes clases del proyecto.

## Diseño visual de la página

### main.css

El archivo `css/main.css` define la presentación general de la página donde se ejecuta el videojuego.

Los elementos `html` y `body` ocupan el 100 % del ancho y alto disponible. También se elimina el margen predeterminado y se utiliza `overflow: hidden` para evitar barras de desplazamiento.

La página utiliza un fondo de color oscuro (`#111111`) y texto claro (`#eeeeee`).

El contenedor `game-container` utiliza Flexbox para organizar sus elementos en columna y mantenerlos centrados horizontal y verticalmente.

El título principal utiliza un tamaño de fuente de 32 píxeles y alineación centrada.

El elemento `game-canvas` se muestra como un bloque y utiliza:

- `95vw` de ancho visual.
- `85vh` de alto visual.
- Fondo negro (`#000000`).
- Borde de 1 píxel con color `#444444`.

Aunque CSS adapta visualmente el Canvas al tamaño de la ventana, el tamaño interno definido en `index.html` es de `1280 × 720` píxeles.

## Componentes no integrados actualmente

### Target

La clase `Target` hereda de `DamageableEntity` y representa un objetivo estático con un tamaño de 80 × 50 píxeles y una vida máxima de 3.

Su posición inicial se calcula para quedar centrada horizontalmente en el Canvas y utiliza una posición vertical de `y = 80`.

Su representación gráfica consiste en un rectángulo de color gris (`#4b4b4b`).

Sin embargo, una búsqueda de referencias en el código actual muestra que `Target` no es importado ni utilizado por otros componentes del videojuego.

Por esta razón, `Target` se documenta como una clase existente en el código, pero no como una mecánica integrada actualmente en la ejecución principal del juego.