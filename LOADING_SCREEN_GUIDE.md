# Guía: Pantalla de Carga con Cinnamoroll

## ¿Cómo funciona?

La pantalla de carga se muestra automáticamente mientras se cargan las fotos, mensajes y canciones desde la base de datos. Cinnamoroll comiendo zanahoria aparecerá con animaciones suaves y desaparecerá cuando todo esté listo.

**Características:**
- Duración mínima: 5 segundos (configurable)
- Desaparece automáticamente cuando todos los datos se cargan
- Cinnamoroll rebota suavemente
- Partículas flotantes (tulipanes y estrellas)
- Texto "Cargando tu sorpresa especial..."
- Barra de progreso animada
- Fondo con efecto blur suave

---

## Personalización

### Cambiar la duración mínima

En `client/src/pages/Home.tsx`, línea 59:

```tsx
<PageLoadingScreen isLoading={isPageLoading} minDuration={5000} />
```

Cambia `5000` por la duración en milisegundos:
- `3000` = 3 segundos
- `5000` = 5 segundos (default)
- `8000` = 8 segundos

### Cambiar el texto

En `client/src/components/PageLoadingScreen.tsx`, línea 62:

```tsx
<p className="text-lg font-semibold text-rosa-pastel mb-2">
  Cargando tu sorpresa especial...
</p>
```

Reemplaza "Cargando tu sorpresa especial..." con tu mensaje personalizado.

### Cambiar los emojis flotantes

En `client/src/components/PageLoadingScreen.tsx`, línea 48:

```tsx
{i % 2 === 0 ? '🌷' : '✨'}
```

Reemplaza los emojis:
- `🌷` por otro emoji (ej: `💕`, `🌙`, `⭐`)
- `✨` por otro emoji (ej: `💫`, `🎀`, `🌸`)

### Cambiar los colores

En `client/src/components/PageLoadingScreen.tsx`:

**Texto:**
```tsx
<p className="text-lg font-semibold text-rosa-pastel mb-2">
```
Cambia `text-rosa-pastel` por:
- `text-celeste-romantic` (azul pastel)
- `text-amarillo-suave` (amarillo suave)

**Barra de progreso:**
```tsx
className="h-full bg-gradient-to-r from-rosa-pastel to-celeste-romantic rounded-full"
```
Personaliza los colores del gradiente.

---

## Ejemplos de Personalización

### Ejemplo 1: Pantalla de carga rápida (3 segundos)

```tsx
<PageLoadingScreen isLoading={isPageLoading} minDuration={3000} />
```

### Ejemplo 2: Cambiar texto y emojis

En `PageLoadingScreen.tsx`:

```tsx
// Cambiar texto
<p className="text-lg font-semibold text-celeste-romantic mb-2">
  ¡Tu regalo especial está casi listo!
</p>

// Cambiar emojis
{i % 2 === 0 ? '💕' : '🌙'}
```

### Ejemplo 3: Pantalla de carga sin duración mínima

```tsx
<PageLoadingScreen isLoading={isPageLoading} minDuration={0} />
```

La pantalla desaparecerá inmediatamente cuando los datos se carguen.

---

## Solución de Problemas

### La pantalla de carga no aparece

**Posibles causas:**
- Los datos ya están cargados en caché
- La conexión a la base de datos es muy rápida
- `isPageLoading` no está siendo detectado correctamente

**Solución:**
- Recarga la página (Ctrl+F5 o Cmd+Shift+R)
- Abre las herramientas de desarrollo (F12) y ve a la pestaña Network
- Desactiva la caché del navegador temporalmente

### La pantalla de carga no desaparece

**Posibles causas:**
- Hay un error al cargar los datos
- La conexión a la base de datos está lenta

**Solución:**
- Abre la consola del navegador (F12)
- Busca mensajes de error en rojo
- Verifica que la base de datos esté conectada correctamente

### Cinnamoroll no se ve

**Posibles causas:**
- La imagen no se cargó correctamente
- Problema de conexión a internet

**Solución:**
- Recarga la página
- Verifica tu conexión a internet
- Abre la consola y busca errores de carga de imagen

---

## Código Completo del Componente

El componente `PageLoadingScreen.tsx` incluye:

1. **Lógica de duración mínima**: Asegura que la pantalla se muestre al menos el tiempo especificado
2. **Cinnamoroll animado**: Rebota suavemente con animación bounce
3. **Partículas flotantes**: Emojis que flotan alrededor de Cinnamoroll
4. **Texto dinámico**: Personalizable
5. **Barra de progreso**: Animación suave de deslizamiento
6. **Puntos de carga**: Animación de pulso
7. **Fondo blur**: Efecto suave de desenfoque

---

## Resumen Rápido

| Elemento | Ubicación | Cómo cambiar |
|----------|-----------|-------------|
| Duración | `Home.tsx` línea 59 | Cambia `minDuration={5000}` |
| Texto | `PageLoadingScreen.tsx` línea 62 | Reemplaza el texto |
| Emojis | `PageLoadingScreen.tsx` línea 48 | Cambia `🌷` y `✨` |
| Colores | `PageLoadingScreen.tsx` línea 65 | Cambia clases de color |
| Imagen | `PageLoadingScreen.tsx` línea 42 | Reemplaza la URL de la imagen |

---

**¡Disfruta de tu pantalla de carga personalizada!** 🎀✨


---

## Mensajes Románticos Aleatorios

### ¿Cómo funciona?

La pantalla de carga ahora muestra **15 mensajes románticos diferentes** que cambian aleatoriamente cada 1.5 segundos mientras se carga la página. Cada mensaje tiene un emoji especial que representa el sentimiento.

### Mensajes Incluidos

1. 💕 Preparando tu sorpresa especial...
2. 🌷 Cargando momentos mágicos...
3. ✨ Tu cumpleaños merece lo mejor...
4. 🌙 Reuniendo toda mi amor para ti...
5. 💫 Creando recuerdos inolvidables...
6. 🎀 Tu día especial está casi aquí...
7. ❤️ Cargando todo mi amor...
8. 🌸 Preparando la mejor sorpresa...
9. 💖 Cada segundo contigo es especial...
10. ⭐ Tu felicidad es mi prioridad...
11. 🎁 Sorpresas románticas en camino...
12. 💝 Cargando momentos de amor...
13. 🌺 Tú eres mi razón de sonreír...
14. ✨ Magia y amor en cada detalle...
15. 💕 Eternamente tuyo, siempre...

### Personalizar los Mensajes

En `client/src/components/PageLoadingScreen.tsx`, línea 14-30:

```tsx
const ROMANTIC_MESSAGES = [
  '💕 Preparando tu sorpresa especial...',
  '🌷 Cargando momentos mágicos...',
  // ... más mensajes
];
```

**Para agregar un nuevo mensaje:**
1. Abre `PageLoadingScreen.tsx`
2. Busca el array `ROMANTIC_MESSAGES`
3. Agrega una nueva línea con tu mensaje: `'[emoji] Tu mensaje aquí...',`

**Ejemplo:**
```tsx
const ROMANTIC_MESSAGES = [
  '💕 Preparando tu sorpresa especial...',
  '🌷 Cargando momentos mágicos...',
  '💌 Mi amor por ti es infinito...', // ← Nuevo mensaje
  // ... más mensajes
];
```

### Cambiar la Velocidad de Cambio

En `PageLoadingScreen.tsx`, línea 43:

```tsx
const messageTimer = setInterval(() => {
  const randomIndex = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
  setCurrentMessage(ROMANTIC_MESSAGES[randomIndex]);
}, 1500); // ← Cambiar este número
```

- `1000` = Cambia cada 1 segundo (más rápido)
- `1500` = Cambia cada 1.5 segundos (default)
- `2000` = Cambia cada 2 segundos (más lento)
- `3000` = Cambia cada 3 segundos (muy lento)

### Ejemplos de Personalización

**Ejemplo 1: Agregar mensajes personalizados**

```tsx
const ROMANTIC_MESSAGES = [
  '💕 Preparando tu sorpresa especial...',
  '🌷 Cargando momentos mágicos...',
  '💌 Te amo más cada día...',
  '🌹 Eres mi razón de vivir...',
  '✨ Contigo todo es posible...',
];
```

**Ejemplo 2: Cambiar emojis**

```tsx
const ROMANTIC_MESSAGES = [
  '🎀 Preparando tu sorpresa especial...',
  '🎁 Cargando momentos mágicos...',
  '🎊 Tu cumpleaños merece lo mejor...',
];
```

**Ejemplo 3: Cambiar velocidad a 2 segundos**

```tsx
const messageTimer = setInterval(() => {
  const randomIndex = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
  setCurrentMessage(ROMANTIC_MESSAGES[randomIndex]);
}, 2000); // Cambio cada 2 segundos
```

---

## Resumen de Características

| Característica | Detalles |
|---|---|
| **Mensajes** | 15 mensajes románticos diferentes |
| **Cambio** | Cada 1.5 segundos (configurable) |
| **Emojis** | Cada mensaje tiene un emoji especial |
| **Animación** | Fade in/out suave |
| **Duración mínima** | 5 segundos (configurable) |
| **Cinnamoroll** | Rebota mientras se carga |
| **Partículas** | Tulipanes y estrellas flotantes |

---

**¡Disfruta de los mensajes románticos!** 💕✨
