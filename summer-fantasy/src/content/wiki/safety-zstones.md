---
title: "Safety ZStones"
description: "Protege tu base, recursos y construcciones con los bloques de protección de Safety ZStones."
category: "safety-zstones"
order: 4
---

**Safety ZStones** es el sistema de protección de zonas de Summer Fantasy. Coloca un bloque de protección en el centro de tu base y crea un área segura donde solo tú puedes construir, romper e interactuar.

> 💡 **Consejo clave**: protege tu base lo antes posible. El mundo es persistente, los recursos son limitados y Safety ZStones es tu mejor aliado contra el griefing.

---

## Características principales

- **Cinco tamaños de protección** para adaptarse a cualquier construcción, desde un refugio pequeño hasta una ciudad.
- **Protección en forma de cubo** centrada en el bloque que colocas.
- **Solo el propietario** puede construir, romper o interactuar dentro de la zona (salvo en spawn).
- **Defensa contra explosiones**: los bloques dentro de una protección no se destruyen por explosiones.
- **Protección de spawn** pública con regeneración y bloqueo de PvP.
- **Persistencia** entre reinicios: tus protecciones se guardan con el mundo.

---

## Bloques de protección

Cada bloque crea un cubo de protección centrado en sí mismo. El tamaño total se calcula como `radio × 2 + 1`.

| Bloque | ID interno | Radio | Tamaño total | Uso ideal |
|---|---|---|---|---|
| 🛡️ Small Protection | `small_protection` | 12 bloques | 25 × 25 | Refugio personal pequeño |
| 🏠 Medium Protection | `medium_protection` | 30 bloques | 61 × 61 | Base mediana |
| 🏰 Big Protection | `big_protection` | 55 bloques | 111 × 111 | Base grande o aldea |
| 🏔️ Huge Protection | `huge_protection` | 82 bloques | 165 × 165 | Ciudad o proyecto enorme |
| 🌟 Spawn Protection | `spawn_protection` | 128 bloques | 257 × 257 | Zona de spawn pública |

### Propiedades de los bloques

- Material de piedra con alta resistencia a explosiones.
- Requieren la herramienta correcta para dropear.
- El bloque central debe romperse con un **pico** si el propietario quiere eliminar la protección en supervivencia.

---

## Cómo funciona

### Colocación

Cuando colocas un bloque de protección:

1. El jugador que lo coloca se convierte automáticamente en **propietario**.
2. Se crea una zona cúbica centrada en el bloque.
3. La protección se guarda en la dimensión actual.

### Romper bloques

| Situación | ¿Puede romper? |
|---|---|
| Sin protección | Comportamiento normal de Minecraft |
| Propietario en supervivencia | ✅ Sí, dentro de su zona. El bloque central requiere pico |
| No propietario en supervivencia | ❌ No |
| Jugador en creativo | ✅ Sí, y rompiendo el centro elimina la protección |

### Interacciones

- Los jugadores **no propietarios** no pueden abrir cofres, puertas, hornos ni interactuar con bloques dentro de tu protección.
- El **modo creativo** actúa como bypass administrativo.
- La **Spawn Protection** permite interacciones públicas para que todos puedan usar servicios comunes.

### Protección de spawn

La Spawn Protection es especial:

- ✅ Permite que cualquier jugador interactúe con bloques públicos.
- ✅ Otorga **regeneración** mientras estás dentro.
- 🛡️ **Bloquea el daño entre jugadores**: no hay PvP en spawn.
- La regeneración desaparece 3 segundos después de salir de la zona.

### Explosiones

Antes de que una explosión dañe bloques, Safety ZStones elimina de la lista de afectados todos los bloques que estén dentro de cualquier protección. Tus construcciones están a salvo de creepers, TNT y otros estallidos.

---

## Consejos para proteger tu base

1. **Coloca el bloque en el centro** de tu construcción para aprovechar todo el radio.
2. **Elige el tamaño adecuado**: piensa en lo que vas a construir en el futuro, no solo hoy.
3. **Rompe el centro con cuidado**: si rompes el bloque central con pico, la protección desaparece.
4. **No añadas a desconocidos**: actualmente solo el propietario tiene permisos dentro de la zona.
5. **Spawn seguro**: si vas a construir cerca del spawn, respeta la Spawn Protection pública.

---

## Resumen técnico

| Campo | Valor |
|---|---|
| **Mod ID** | `safety_zstones` |
| **Versión** | 1.0.0 |
| **Minecraft** | 1.20.1 |
| **Loader** | Forge 47.4.10 |
| **Licencia** | MIT |
| **Entorno** | Servidor |
