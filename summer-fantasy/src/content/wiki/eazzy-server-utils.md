---
title: "Eazzy Server Utils"
description: "Comandos esenciales de teleporte, hogares, warps, mensajería y utilidades de staff."
category: "eazzy-server-utils"
order: 3
---

**Eazzy Server Utils** agrupa todos los comandos esenciales de Summer Fantasy: desde moverte rápidamente por el mundo hasta gestionar advertencias, baneos y anuncios como staff.

> 💡 **Consejo clave**: establece tu `/home` en un lugar seguro y aprende `/back` para recuperar tu ubicación tras morir o teletransportarte.

---

## Características principales

- **Sistema de hogares** con múltiples slots y visibilidad pública/privada.
- **Warps globales** para puntos de interés del servidor.
- **TPA** para viajar entre jugadores de forma segura y con consentimiento.
- **Teletransporte útil**: spawn, back, near.
- **Mensajería privada** y respuesta rápida.
- **Utilidades de staff**: inventario ajeno, congelar, vanish, TPS, anuncios.
- **Sanciones**: advertencias, kick, ban, tempban, unban e IP-ban.
- **Anti-exploit básico** para `/home` y `/warp` con cooldowns, dimensiones bloqueadas y bloqueo en combate.
- **Chat personalizado** con cabezas de jugador (requiere el mod en el cliente).

---

## Comandos de jugador

### Hogares

| Comando | Descripción |
|---|---|
| `/sethome [nombre]` | Establece un hogar. Si no pones nombre, se llama `home`. |
| `/home [nombre]` | Te teletransporta a un hogar. |
| `/homes` | Lista tus hogares guardados. |
| `/delhome <nombre>` | Elimina un hogar. |
| `/renamehome <antiguo> <nuevo>` | Cambia el nombre de un hogar. |
| `/homepublic <nombre>` | Alterna un hogar entre público y privado. |

### Warps y teletransporte

| Comando | Descripción |
|---|---|
| `/warp <nombre>` | Te lleva a un warp global. |
| `/warps` | Lista los warps disponibles. |
| `/tpa <jugador>` | Solicita teletransportarte a otro jugador. |
| `/tpahere <jugador>` | Solicita que otro jugador venga a ti. |
| `/tpaccept` | Acepta una solicitud de TPA. |
| `/tpacancel` | Cancela tu solicitud de TPA. |
| `/back` | Vuelve a tu ubicación anterior (muerte o teletransporte). |
| `/spawn` | Te teletransporta al spawn. |
| `/near` | Muestra los jugadores cercanos. |

### Mensajería y utilidades

| Comando | Descripción |
|---|---|
| `/msg <jugador> <mensaje>` | Envía un mensaje privado. Alias: `/tell`. |
| `/reply <mensaje>` | Responde al último mensaje privado. Alias: `/r`. |
| `/head <jugador>` | Obtiene la cabeza de un jugador. |
| `/crafting` | Abre una mesa de crafteo portátil. |
| `/anvil` | Abre un yunque portátil. |
| `/smithing` | Abre una mesa de herrería portátil. |

---

## Comandos de staff

> 🔒 Estos comandos requieren permisos de administración (nivel de permiso 2 en vanilla).

| Comando | Descripción |
|---|---|
| `/setwarp <nombre>` | Crea un warp global. |
| `/tps` | Muestra los TPS del servidor. |
| `/lag` / `/mspt` | Informe privado de rendimiento. |
| `/freeze <jugador>` | Congela a un jugador. |
| `/unfreeze <jugador>` | Descongela a un jugador. |
| `/iv <jugador>` | Abre el inventario de un jugador. Alias: `/invsee`. |
| `/vanish` | Activa/desactiva el vanish. |
| `/warn <jugador> <razón>` | Advierte a un jugador. |
| `/warns <jugador>` | Muestra las advertencias. |
| `/clearwarns <jugador>` | Limpia las advertencias. |
| `/kick <jugador> [razón]` | Expulsa a un jugador. |
| `/ban <jugador> [razón]` | Banea permanentemente. |
| `/tempban <jugador> <duración> [razón]` | Banea temporalmente. Formatos: `30s`, `5m`, `2h`, `7d`. |
| `/unban <jugador>` | Desbanea a un jugador. |
| `/ipban <jugador> [razón]` | Banea la UUID y la IP actual. |
| `/broadcast <mensaje>` / `/announce <mensaje>` | Muestra un título centrado a todos. |
| `/lockchat` | Bloquea/desbloquea el chat para jugadores sin permisos de staff. |

### Ejemplos de `/broadcast`

```
/broadcast &c¡Evento PvP! | &7Empieza en 5 minutos
/broadcast &a¡Bienvenidos! | &7Disfruten del servidor | &e¡Gracias por jugar!
```

---

## Gestión de dimensiones

Los administradores pueden bloquear dimensiones para evitar el acceso:

| Comando | Descripción |
|---|---|
| `/eazzyserverutils close <dimensión>` | Bloquea una dimensión. |
| `/eazzyserverutils open <dimensión>` | Desbloquea una dimensión. |
| `/eazzyserverutils list` | Lista las dimensiones bloqueadas. |

---

## Configuración del servidor

Eazzy Server Utils genera dos archivos en `config/eazzy_server_utils/`:

### `config.properties`

| Opción | Descripción | Por defecto |
|---|---|---|
| `maxHomes` | Máximo de hogares por jugador | `8` |
| `homeCooldown` | Cooldown de `/home` en segundos | `5` |
| `maxWarps` | Máximo de warps globales | `100` |
| `warpCooldown` | Cooldown de `/warp` en segundos | `5` |
| `tpaCooldown` | Cooldown de TPA en segundos | `3` |
| `tpaTimeout` | Tiempo de expiración de TPA en segundos | `12` |
| `headCooldown` | Cooldown de `/head` en segundos | `3600` |
| `spawnCooldown` | Cooldown de `/spawn` en segundos | `5` |
| `backCooldown` | Cooldown de `/back` en segundos | `5` |
| `nearRadius` | Radio de `/near` en bloques | `50` |
| `homeWarpSharedCooldown` | Cooldown compartido entre `/home` y `/warp` | `true` |
| `homeWarpCooldown` | Cooldown compartido en segundos | `5` |
| `homeWarpBlockedDimensions` | Dimensiones donde `/home` y `/warp` están bloqueados | `""` |
| `combatCooldownSeconds` | Segundos de bloqueo por combate tras recibir daño | `10` |

### `chat.properties`

| Opción | Descripción | Por defecto |
|---|---|---|
| `enabled` | Activa el chat personalizado | `true` |
| `format` | Formato del chat | `§b%name%§7: §f%message%` |
| `showHeadHover` | Muestra la cabeza del jugador al pasar el ratón por el nombre | `true` |
| `showHeadIndicator` | Muestra un indicador junto al nombre | `false` |
| `headIndicator` | Indicador a mostrar | `☺` |
| `clickNameToMessage` | Permite clickear el nombre para enviar `/msg` | `true` |
| `showHeadInline` | Renderiza cabezas en línea en el chat | `true` |

---

## Permisos

Eazzy Server Utils usa el sistema de permisos vanilla de Minecraft:

- **Permiso 0**: comandos de jugador.
- **Permiso 2**: comandos de staff.

Los jugadores con permiso 2 ignoran la mayoría de cooldowns y las protecciones anti-exploit.

---

## Persistencia

Los datos se guardan dentro del mundo en `<mundo>/data/eazzy_server_utils/`:

- `homes.json` — Hogares de los jugadores.
- `warps.json` — Warps globales.
- `warnings.json` — Historial de advertencias.
- `bans.json` — Baneos registrados.
- `locked_dimensions.json` — Dimensiones bloqueadas.

---

## Notas importantes

- El **chat personalizado** requiere que los jugadores tengan el mod instalado en el cliente para verse correctamente.
- `/lockchat` solo bloquea mensajes de chat, no comandos ni mensajes del sistema.
- El mod **no tiene integración con LuckPerms**: usa los niveles de permiso vanilla de Minecraft.
- Los staff con permiso 2 no sufren la mayoría de cooldowns anti-exploit.

---

## Resumen técnico

| Campo | Valor |
|---|---|
| **Mod ID** | `eazzyserverutils` (1.20.1) |
| **Versión** | 1.0.1 |
| **Minecraft** | 1.20.1 |
| **Loader** | Forge 47.4.10 |
| **Licencia** | MIT |
| **Entorno** | Cliente + Servidor |
