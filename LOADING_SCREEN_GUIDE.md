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
