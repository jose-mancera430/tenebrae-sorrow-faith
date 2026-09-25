# Pruebas funcionales — Tenebrae: Sorrow & Faith

## Objetivo

Este documento registra las pruebas funcionales realizadas al videojuego
Tenebrae: Sorrow & Faith durante su proceso de desarrollo.

El propósito de estas pruebas es verificar el funcionamiento de los sistemas
implementados y dejar evidencia de los resultados obtenidos durante el
desarrollo.

## Estados de las pruebas

- **Aprobado:** la funcionalidad fue probada y funciona según lo esperado.
- **Fallido:** la funcionalidad fue probada, pero presentó errores.
- **Pendiente:** la prueba todavía no ha sido realizada o requiere una nueva verificación.

---

## PF-001 — Movimiento del jugador

**Objetivo:**  
Comprobar que el jugador puede desplazarse correctamente dentro del área de juego utilizando las teclas WASD.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo dentro del Canvas.

**Pasos:**
1. Presionar la tecla W.
2. Presionar la tecla S.
3. Presionar la tecla A.
4. Presionar la tecla D.
5. Observar el desplazamiento del jugador en cada dirección.

**Resultado esperado:**  
El jugador debe desplazarse hacia arriba, abajo, izquierda y derecha según la tecla presionada, sin salir de los límites del Canvas.

**Resultado obtenido:**  
El movimiento mediante WASD funciona correctamente y el jugador permanece dentro de los límites del Canvas.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar captura o evidencia visual de la prueba.

---

## PF-002 — Movimiento diagonal normalizado

**Objetivo:**  
Comprobar que el jugador puede desplazarse en diagonal sin obtener una velocidad mayor que al moverse en una sola dirección.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo dentro del Canvas.

**Pasos:**
1. Mantener presionadas simultáneamente las teclas W y D.
2. Observar el movimiento diagonal hacia arriba y la derecha.
3. Mantener presionadas simultáneamente las teclas W y A.
4. Observar el movimiento diagonal hacia arriba y la izquierda.
5. Repetir la prueba con S + D y S + A.

**Resultado esperado:**  
El jugador debe desplazarse diagonalmente manteniendo una velocidad normalizada, evitando que el movimiento diagonal sea más rápido que el movimiento horizontal o vertical.

**Resultado obtenido:**  
El movimiento diagonal se encuentra normalizado y funciona correctamente.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-003 — Límites de movimiento del Canvas

**Objetivo:**  
Comprobar que el jugador no puede desplazarse fuera de los límites del Canvas.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo dentro del Canvas.

**Pasos:**
1. Mantener presionada la tecla W hasta alcanzar el límite superior.
2. Mantener presionada la tecla S hasta alcanzar el límite inferior.
3. Mantener presionada la tecla A hasta alcanzar el límite izquierdo.
4. Mantener presionada la tecla D hasta alcanzar el límite derecho.
5. Observar el comportamiento del jugador en cada borde.

**Resultado esperado:**  
El jugador debe detenerse al alcanzar cualquiera de los límites del Canvas y no debe salir del área visible del juego.

**Resultado obtenido:**  
El jugador permanece dentro de los límites del Canvas durante el movimiento.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-004 — Disparo continuo con Shift

**Objetivo:**  
Comprobar que el jugador puede realizar disparos continuos manteniendo presionada la tecla Shift.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo dentro del Canvas.

**Pasos:**
1. Mantener presionada la tecla Shift izquierdo.
2. Observar la generación continua de proyectiles.
3. Soltar la tecla Shift y comprobar que el disparo se detiene.
4. Mantener presionada la tecla Shift derecho.
5. Comprobar nuevamente la generación continua de proyectiles.

**Resultado esperado:**  
El jugador debe disparar de forma continua mientras Shift izquierdo o derecho permanezca presionado y debe dejar de disparar al soltar la tecla.

**Resultado obtenido:**  
El disparo continuo funciona correctamente utilizando Shift izquierdo o derecho.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-005 — Reutilización de proyectiles mediante Object Pooling

**Objetivo:**  
Comprobar que el sistema de proyectiles utiliza correctamente el Projectile Pool y reutiliza los objetos disponibles durante el disparo continuo.

**Precondición:**  
El juego debe estar iniciado, el jugador debe encontrarse activo y el sistema ProjectilePool debe estar disponible.

**Pasos:**
1. Iniciar una partida.
2. Mantener presionada la tecla Shift para generar disparos continuos.
3. Mantener el disparo durante varios segundos.
4. Observar el comportamiento de los proyectiles mientras aparecen y desaparecen del área de juego.
5. Verificar que los proyectiles disponibles sean reutilizados por el sistema.

**Resultado esperado:**  
El sistema debe reutilizar los proyectiles preasignados en el ProjectilePool en lugar de crear continuamente nuevos objetos.

**Resultado obtenido:**  
El ProjectilePool reutiliza correctamente los proyectiles disponibles durante el disparo continuo.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-006 — Colisión entre proyectil y enemigo

**Objetivo:**  
Comprobar que los proyectiles disparados por el jugador detectan correctamente la colisión con los enemigos.

**Precondición:**  
El juego debe estar iniciado, el jugador debe estar activo y debe haber al menos un enemigo activo dentro del área de juego.

**Pasos:**
1. Iniciar una partida.
2. Colocar al jugador en una posición desde la que pueda disparar hacia un enemigo.
3. Mantener presionada la tecla Shift para disparar.
4. Hacer que uno o más proyectiles impacten al enemigo.
5. Observar el comportamiento del enemigo y las estadísticas del HUD.

**Resultado esperado:**  
Cuando un proyectil colisiona con un enemigo, el impacto debe ser detectado, el enemigo debe recibir daño y el contador de impactos debe actualizarse.

**Resultado obtenido:**  
La colisión entre proyectiles y enemigos funciona correctamente. Los enemigos reciben daño y el contador de impactos se incrementa.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-007 — Vida, daño y destrucción de enemigos

**Objetivo:**  
Comprobar que los enemigos reciben daño al ser alcanzados por los proyectiles del jugador y son destruidos cuando su vida se agota.

**Precondición:**  
El juego debe estar iniciado y debe existir al menos un enemigo activo dentro del área de juego.

**Pasos:**
1. Iniciar una partida.
2. Localizar un enemigo activo.
3. Disparar contra el enemigo utilizando la tecla Shift.
4. Hacer que los proyectiles impacten al enemigo.
5. Continuar disparando hasta agotar su vida.
6. Observar el comportamiento del enemigo después de recibir el daño necesario.

**Resultado esperado:**  
El enemigo debe recibir daño con los impactos y ser destruido cuando su vida llegue a cero.

**Resultado obtenido:**  
Los enemigos reciben daño correctamente y son destruidos al agotarse su vida.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-008 — Colisión entre enemigo y jugador

**Objetivo:**  
Comprobar que una colisión directa entre un enemigo y el jugador provoca correctamente la pérdida de vida.

**Precondición:**  
El juego debe estar iniciado, el jugador debe tener vida disponible y debe existir al menos un enemigo activo.

**Pasos:**
1. Iniciar una partida.
2. Permitir que un enemigo se acerque al jugador.
3. No destruir al enemigo antes de que alcance al jugador.
4. Permitir que el enemigo colisione directamente con el jugador.
5. Observar la vida mostrada en el HUD.
6. Observar qué sucede con el enemigo después de la colisión.

**Resultado esperado:**  
El jugador debe perder 1 punto de vida después de la colisión y el enemigo que colisionó debe desactivarse.

**Resultado obtenido:**  
La colisión resta 1 punto de vida al jugador y el enemigo involucrado se desactiva correctamente.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la prueba.

---

## PF-009 — Game Over al llegar a cero de vida

**Objetivo:**  
Comprobar que el estado Game Over se activa correctamente cuando la vida del jugador llega a cero.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo con vida disponible.

**Pasos:**
1. Iniciar una partida.
2. Permitir que los enemigos colisionen con el jugador.
3. Repetir las colisiones hasta que la vida del jugador llegue a cero.
4. Observar lo que sucede al agotarse la vida.
5. Verificar el estado mostrado en pantalla.

**Resultado esperado:**  
Al llegar a cero de vida, debe mostrarse GAME OVER, el jugador debe dejar de renderizarse y la lógica de la partida debe detenerse.

**Resultado obtenido:**  
Al llegar a cero de vida se activa correctamente el estado GAME OVER, el jugador deja de renderizarse y la lógica de la partida se detiene.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la pantalla GAME OVER.

---

## PF-010 — Reinicio después de Game Over

**Objetivo:**  
Comprobar que la tecla R reinicia correctamente la partida después de activar el estado Game Over.

**Precondición:**  
El jugador debe tener 0 de vida y la pantalla GAME OVER debe estar visible.

**Pasos:**
1. Llegar al estado GAME OVER.
2. Presionar la tecla R.
3. Observar el estado del jugador.
4. Observar la oleada y las estadísticas del HUD.
5. Verificar que no permanezcan proyectiles de la partida anterior.

**Resultado esperado:**  
La partida debe reiniciarse con la vida del jugador restaurada a 3/3, la oleada debe volver a la primera, las estadísticas deben reiniciarse a cero, los enemigos iniciales deben estar activos y no deben permanecer proyectiles anteriores.

**Resultado obtenido:**  
La partida se reinicia correctamente mediante la tecla R y los sistemas principales regresan a su estado inicial.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual antes y después del reinicio.

---

## PF-011 — Sistema de oleadas

**Objetivo:**  
Comprobar que el sistema de oleadas permite avanzar correctamente de una oleada a la siguiente después de eliminar a los enemigos activos.

**Precondición:**  
El juego debe estar iniciado en la primera oleada.

**Pasos:**
1. Iniciar una partida.
2. Observar los enemigos correspondientes a la primera oleada.
3. Destruir los 3 enemigos de la primera oleada.
4. Observar el cambio de oleada en el HUD.
5. Verificar la aparición de la segunda oleada.
6. Observar los 4 enemigos correspondientes a la segunda oleada.

**Resultado esperado:**  
Después de eliminar los 3 enemigos de la primera oleada, el juego debe avanzar a la segunda oleada y generar 4 enemigos.

**Resultado obtenido:**  
El sistema avanza correctamente de la primera a la segunda oleada y genera la cantidad provisional de enemigos correspondiente.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la primera y segunda oleada.

---

## PF-012 — Finalización del nivel

**Objetivo:**  
Comprobar que el nivel finaliza correctamente después de eliminar a todos los enemigos de la última oleada.

**Precondición:**  
El jugador debe encontrarse en la segunda y última oleada provisional del nivel.

**Pasos:**
1. Llegar a la segunda oleada.
2. Destruir los 4 enemigos de la oleada.
3. Comprobar que no queden enemigos activos.
4. Observar el estado mostrado en pantalla después de completar la oleada.

**Resultado esperado:**  
Después de eliminar a todos los enemigos de la última oleada, el juego debe finalizar el nivel y mostrar el estado NIVEL TERMINADO.

**Resultado obtenido:**  
El nivel finaliza correctamente después de completar la última oleada y se muestra NIVEL TERMINADO.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de la pantalla NIVEL TERMINADO.

---

## PF-013 — HUD y estadísticas en tiempo real

**Objetivo:**  
Comprobar que el HUD muestra correctamente la información y las estadísticas principales de la partida.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo.

**Pasos:**
1. Iniciar una partida.
2. Observar la información mostrada en el HUD.
3. Realizar varios disparos.
4. Impactar a uno o más enemigos.
5. Destruir al menos un enemigo.
6. Recibir daño mediante una colisión con un enemigo.
7. Avanzar de la primera a la segunda oleada.
8. Observar los cambios mostrados en el HUD.

**Resultado esperado:**  
El HUD debe mostrar y actualizar correctamente la vida del jugador, la oleada actual, los disparos realizados, los impactos, la precisión y los enemigos destruidos.

**Resultado obtenido:**  
El HUD muestra y actualiza correctamente la vida, oleada, disparos, impactos, precisión y enemigos destruidos durante la partida.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual del HUD durante una partida.

---

## PF-014 — Cálculo de precisión

**Objetivo:**  
Comprobar que el porcentaje de precisión se calcula correctamente a partir de los disparos realizados y los impactos registrados.

**Precondición:**  
El juego debe estar iniciado y el jugador debe encontrarse activo.

**Pasos:**
1. Iniciar una partida.
2. Realizar varios disparos.
3. Hacer que algunos proyectiles impacten a los enemigos.
4. Permitir que otros disparos no impacten a ningún enemigo.
5. Observar los valores de disparos e impactos mostrados en el HUD.
6. Observar el porcentaje de precisión calculado.

**Resultado esperado:**  
La precisión debe calcularse utilizando la fórmula:

`precision = (shotsHit / shotsFired) × 100`

El porcentaje mostrado debe corresponder con la cantidad de impactos y disparos registrados.

**Resultado obtenido:**  
El sistema calcula y muestra la precisión utilizando los valores de disparos realizados e impactos registrados.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual del HUD mostrando disparos, impactos y precisión.

---

## PF-015 — Formación de enemigos en línea

**Objetivo:**  
Comprobar que los enemigos pueden organizarse en una formación en línea y desplazarse como un grupo.

**Precondición:**  
El juego debe estar iniciado y debe generarse una oleada que utilice la formación en línea.

**Pasos:**
1. Iniciar una partida.
2. Avanzar hasta la aparición de la formación en línea.
3. Observar la posición de los enemigos que forman parte de la formación.
4. Observar el desplazamiento de los enemigos.
5. Verificar que los integrantes mantengan la formación mientras se desplazan como grupo.

**Resultado esperado:**  
Los enemigos deben aparecer organizados en línea y desplazarse como un conjunto mientras permanezcan dentro de la formación.

**Resultado obtenido:**  
La formación en línea organiza correctamente a los enemigos y permite que se desplacen como grupo.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de los enemigos desplazándose en formación.

---

## PF-015 — Formación de enemigos en línea

**Objetivo:**  
Comprobar que los enemigos pueden organizarse en una formación en línea y desplazarse como un grupo.

**Precondición:**  
El juego debe estar iniciado y debe generarse una oleada que utilice la formación en línea.

**Pasos:**
1. Iniciar una partida.
2. Avanzar hasta la aparición de la formación en línea.
3. Observar la posición de los enemigos que forman parte de la formación.
4. Observar el desplazamiento de los enemigos.
5. Verificar que los integrantes mantengan la formación mientras se desplazan como grupo.

**Resultado esperado:**  
Los enemigos deben aparecer organizados en línea y desplazarse como un conjunto mientras permanezcan dentro de la formación.

**Resultado obtenido:**  
La formación en línea organiza correctamente a los enemigos y permite que se desplacen como grupo.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual de los enemigos desplazándose en formación.

---

## PF-016 — Liberación de enemigos de la formación

**Objetivo:**  
Comprobar que los enemigos abandonan correctamente la formación después del tiempo establecido y continúan con su comportamiento individual.

**Precondición:**  
El juego debe estar iniciado y debe existir una formación en línea activa con enemigos agrupados.

**Pasos:**
1. Iniciar una partida.
2. Esperar a que aparezca la formación en línea.
3. Observar a los enemigos desplazándose como grupo.
4. Esperar aproximadamente 3 segundos desde la activación de la formación.
5. Observar el comportamiento de los enemigos después de este tiempo.

**Resultado esperado:**  
Después de aproximadamente 3 segundos, los enemigos deben dejar de pertenecer a la formación y continuar con su comportamiento individual.

**Resultado obtenido:**  
Los enemigos se liberan de la formación después de 3 segundos y continúan de manera individual.

**Estado:** Aprobado.

**Evidencia:**  
Pendiente de agregar evidencia visual antes y después de la liberación de la formación.


---

## Pruebas funcionales de la versión final

Las siguientes pruebas fueron realizadas manualmente sobre la versión final del videojuego ejecutada mediante el servidor local de Node.js.

### PF-017 — Movimiento del jugador

**Prueba realizada:**  
Se utilizaron las teclas W, A, S y D durante una partida.

**Resultado obtenido:**  
El jugador se desplaza correctamente en las cuatro direcciones.

**Estado:** Aprobado.

---

### PF-018 — Sistema de disparo

**Prueba realizada:**  
Se mantuvo presionada la tecla SHIFT durante la partida.

**Resultado obtenido:**  
El jugador realiza disparos correctamente mientras se mantiene presionada la tecla.

**Estado:** Aprobado.

---

### PF-019 — Sistema de Fervor

**Prueba realizada:**  
Se acumuló Fervor durante el combate y, después de llenar una barra, se presionó la tecla E.

**Resultado obtenido:**  
El Fervor aumenta durante el combate y al activarlo se incrementa la cantidad de disparos del jugador.

**Estado:** Aprobado.

---

### PF-020 — Pausa y reanudación

**Prueba realizada:**  
Durante una partida se presionó ESC y posteriormente se volvió a presionar ESC.

**Resultado obtenido:**  
La primera pulsación pausa correctamente el juego y la segunda permite reanudar la partida.

**Estado:** Aprobado.

---

### PF-021 — Power-ups

**Prueba realizada:**  
Se recogieron power-ups disponibles durante la partida.

**Resultado obtenido:**  
Los power-ups pudieron ser recogidos y aplicaron sus efectos durante el juego.

**Estado:** Aprobado.

---

### PF-022 — Sistema de vida y daño

**Prueba realizada:**  
Se permitió que el jugador recibiera daño de los enemigos.

**Resultado obtenido:**  
La barra de vida disminuye correctamente al recibir daño.

**Estado:** Aprobado.

---

### PF-023 — Game Over y reintento

**Prueba realizada:**  
Se redujo la vida del jugador hasta llegar a cero y posteriormente se presionó R.

**Resultado obtenido:**  
Al quedarse sin vida aparece la pantalla "LA FE HA CEDIDO" con la opción de reintentar. Al presionar R comienza correctamente una nueva partida.

**Estado:** Aprobado.

---

### PF-024 — Sistema de puntuación

**Prueba realizada:**  
Se eliminaron enemigos durante diferentes oleadas.

**Resultado obtenido:**  
La puntuación aumenta durante la partida conforme se eliminan enemigos.

**Estado:** Aprobado.

---

### PF-025 — Finalización y cambio de nivel

**Prueba realizada:**  
Se completó el Nivel 1 y posteriormente se presionó ENTER en la pantalla de nivel completado.

**Resultado obtenido:**  
El juego muestra una pantalla con las estadísticas del nivel y la opción "CONTINUAR AL NIVEL 2". Al presionar ENTER se carga correctamente el Nivel 2.

**Estado:** Aprobado.

---

### PF-026 — Sistema de jefes

**Prueba realizada:**  
Se avanzó hasta la Oleada 6/6 del Nivel 2.

**Resultado obtenido:**  
Aparece el jefe "El Obispo Incorrupto" con indicador de fase y una barra de vida propia.

**Estado:** Aprobado parcialmente.

**Observación:**  
Se comprobó la aparición y funcionamiento del combate contra el jefe, pero no se realizó en esta prueba la derrota completa del mismo.

---

### PF-027 — Música y efectos de sonido

**Prueba realizada:**  
Se ejecutó una partida comprobando el audio durante el combate.

**Resultado obtenido:**  
Se reproduce música de fondo y efectos de sonido durante acciones como disparos y daño.

**Estado:** Aprobado.

---

### PF-028 — Colisiones y daño a enemigos

**Prueba realizada:**  
Se realizaron disparos directamente contra los enemigos.

**Resultado obtenido:**  
Los impactos son detectados, los enemigos reciben daño y pueden ser eliminados después de recibir suficientes disparos.

**Estado:** Aprobado.

---

### PF-029 — Sistema de combo

**Prueba realizada:**  
Se eliminaron enemigos de manera consecutiva.

**Resultado obtenido:**  
El multiplicador de COMBO aumenta al realizar eliminaciones consecutivas.

**Estado:** Aprobado.

---

### PF-030 — Estadísticas de disparos e impactos

**Prueba realizada:**  
Se realizaron múltiples disparos contra enemigos durante una partida.

**Resultado obtenido:**  
Los contadores de DISPAROS e IMPACTOS aumentan durante el juego y el HUD muestra el porcentaje de PRECISIÓN.

**Estado:** Aprobado.

---

## Incidencia detectada durante las pruebas

Durante una prueba de finalización del Nivel 1 se observó que la pantalla de resultados mostró un valor de **PRECISIÓN de -5.9%**.

Este comportamiento se registra como una incidencia, ya que un porcentaje de precisión normalmente no debería presentar un valor negativo. La incidencia deberá ser revisada en la lógica encargada del cálculo o presentación de las estadísticas del nivel.