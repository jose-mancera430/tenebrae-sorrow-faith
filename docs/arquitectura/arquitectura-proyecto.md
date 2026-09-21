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
│       └── TurretEnemy
├── Projectile
└── EnemyProjectile

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

### Relación general

Enemy
├── BasicEnemy → movimiento vertical
├── HeavyEnemy → mayor resistencia y menor velocidad
├── HunterEnemy → seguimiento horizontal
├── PursuerEnemy → persecución en X e Y
└── TurretEnemy → posición fija y disparo dirigido

## Sistema de formaciones

El proyecto cuenta con un sistema destinado a organizar grupos de enemigos en diferentes formaciones.

Este sistema utiliza clases específicas para representar las formaciones y un `FormationManager` encargado de administrarlas.

Antes de documentar cada formación como funcional, se verificará su integración actual con el resto del videojuego.

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