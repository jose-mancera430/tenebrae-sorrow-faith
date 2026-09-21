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