# Guía: Libro Interactivo Romántico

## ¿Qué es el Libro Interactivo?

Es un componente especial que abre un modal elegante con una portada hermosa y páginas interactivas que cuentan una historia romántica inspirada en "El Principito y la Rosa".

## Características

- **Portada con Stitch**: Una portada hermosa con un personaje azul adorable sosteniendo una rosa
- **6 Páginas de Historia**: Una narrativa romántica completa
- **Navegación Suave**: Botones para pasar páginas con animaciones
- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Modal Elegante**: Fondo oscuro con efecto blur
- **Botón Cerrar**: Para salir del libro en cualquier momento

## Páginas del Libro

1. **Portada**: "El Principito y la Rosa" - Portada visual hermosa
2. **Capítulo I**: El Encuentro - Cómo se conocen
3. **Capítulo II**: El Cuidado - El amor y la dedicación
4. **Capítulo III**: El Viaje - Aventuras juntos
5. **Capítulo IV**: La Promesa Eterna - El compromiso de amor
6. **Epílogo**: Para Siempre - El final y el mensaje

## Cómo Usar

1. En la página principal, busca la sección "Ven a explorar esta maravilla juntos"
2. Haz clic en el botón "Abrir el Libro"
3. Se abrirá un modal con la portada del libro
4. Usa las flechas para navegar:
   - **Flecha Izquierda**: Página anterior
   - **Flecha Derecha**: Página siguiente
5. Haz clic en la **X** para cerrar el libro

## Personalización

### Cambiar la Historia

En `client/src/components/InteractiveBook.tsx`, línea 18-48:

```tsx
const BOOK_PAGES = [
  {
    id: 'cover',
    title: 'El Principito y la Rosa',
    subtitle: 'Una Historia de Amor Eterno',
    isCover: true,
    content: '',
  },
  {
    id: 'page1',
    title: 'Capítulo I: El Encuentro',
    content: `Tu contenido aquí...`,
  },
  // ... más páginas
];
```

**Para editar una página:**
1. Abre `InteractiveBook.tsx`
2. Busca la página que quieres editar (por `id`)
3. Cambia el `title` y `content`

**Ejemplo:**
```tsx
{
  id: 'page1',
  title: 'Capítulo I: Nuestro Primer Encuentro',
  content: `Fue en un atardecer de primavera cuando nuestros ojos se encontraron...`,
},
```

### Agregar Nuevas Páginas

1. En `InteractiveBook.tsx`, agrega un nuevo objeto al array `BOOK_PAGES`:

```tsx
{
  id: 'page6',
  title: 'Capítulo V: Mi Nuevo Título',
  content: `Aquí va tu contenido...`,
},
```

2. El libro se actualizará automáticamente con la nueva página

### Cambiar la Portada

En `InteractiveBook.tsx`, línea 96:

```tsx
<img
  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692923675/guASUUg4cJC9WiZ2QEx5gQ/romantic-book-cover-LvMeXK2UMYt2GATzNhYBZF.webp"
  alt="Portada del Libro"
  className="w-64 h-80 object-cover rounded-lg shadow-lg"
/>
```

Reemplaza la URL con tu propia imagen.

### Cambiar Colores

En `InteractiveBook.tsx`:

**Botón Anterior (línea 155):**
```tsx
className="p-2 rounded-full bg-rosa-pastel/80 hover:bg-rosa-pastel..."
```

Cambia `bg-rosa-pastel` por:
- `bg-celeste-romantic` (azul pastel)
- `bg-amarillo-suave` (amarillo)

**Botón Siguiente (línea 167):**
```tsx
className="p-2 rounded-full bg-celeste-romantic/80 hover:bg-celeste-romantic..."
```

### Cambiar el Título del Botón

En `Home.tsx`, línea 159:

```tsx
<RomanticButton
  onClick={() => setShowBook(true)}
  variant="primary"
  size="md"
>
  Abrir el Libro  {/* ← Cambia este texto */}
</RomanticButton>
```

## Ejemplos de Personalización

### Ejemplo 1: Agregar una Página Especial

```tsx
const BOOK_PAGES = [
  // ... páginas existentes
  {
    id: 'page6',
    title: 'Especial: Nuestras Canciones',
    content: `Las canciones que nos acompañan en cada momento...`,
  },
];
```

### Ejemplo 2: Cambiar el Título del Libro

En `InteractiveBook.tsx`, línea 22:

```tsx
{
  id: 'cover',
  title: 'Nuestro Cuento de Amor',  // ← Nuevo título
  subtitle: 'Una Historia Escrita por el Destino',  // ← Nuevo subtítulo
  isCover: true,
  content: '',
},
```

### Ejemplo 3: Cambiar Colores del Modal

En `InteractiveBook.tsx`, línea 82:

```tsx
<div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blanco-cremoso to-rosa-pastel/10 overflow-y-auto">
```

Cambia los colores del gradiente:
- `from-blanco-cremoso` → `from-celeste-romantic/5`
- `to-rosa-pastel/10` → `to-amarillo-suave/10`

## Solución de Problemas

### El libro no se abre

**Posibles causas:**
- El botón no está conectado correctamente
- El estado `showBook` no está siendo actualizado

**Solución:**
- Verifica que `setShowBook(true)` esté en el botón
- Abre la consola (F12) y busca errores

### La portada no se ve

**Posibles causas:**
- La URL de la imagen está rota
- Problema de conexión

**Solución:**
- Recarga la página
- Verifica la URL de la imagen
- Abre la consola para ver errores

### Las páginas no se pasan

**Posibles causas:**
- Los botones están deshabilitados
- Hay un error en el código

**Solución:**
- Verifica que no estés en la primera o última página
- Abre la consola para ver errores

## Resumen Rápido

| Elemento | Ubicación | Cómo cambiar |
|----------|-----------|-------------|
| Historia | `InteractiveBook.tsx` línea 18-48 | Edita `content` de cada página |
| Portada | `InteractiveBook.tsx` línea 96 | Reemplaza la URL |
| Título | `Home.tsx` línea 159 | Cambia el texto del botón |
| Colores | `InteractiveBook.tsx` línea 155, 167 | Cambia las clases de color |
| Agregar página | `InteractiveBook.tsx` línea 48 | Agrega un nuevo objeto |

## Características Técnicas

- **Componente React**: Totalmente funcional con hooks
- **Animaciones**: Fade in/scale en la portada
- **Responsivo**: Se adapta a móviles y desktops
- **Accesible**: Botones con estados deshabilitados claros
- **Optimizado**: Carga rápida y sin lag

---

**¡Disfruta de tu libro interactivo romántico!** 📖✨
