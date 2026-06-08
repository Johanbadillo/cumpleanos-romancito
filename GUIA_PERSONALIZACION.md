# Guía de Personalización - Cumpleaños Romántico

## Bienvenida

¡Felicidades! Has creado una hermosa aplicación web móvil para celebrar el cumpleaños de la mujer que amas. Esta guía te ayudará a personalizar la app con tu contenido especial.

---

## 1. Personalizar Textos Principales

### Cambiar el título y mensaje de bienvenida

Edita el archivo `client/src/pages/Home.tsx`:

```typescript
// Línea ~44
<h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg fade-in-up">
  Feliz Cumpleanos, [Nombre de ella]  {/* Cambia aquí */}
</h1>
<p className="text-xl md:text-2xl mb-8 drop-shadow-md fade-in-up">
  Para la mujer mas especial de mi vida  {/* Cambia aquí */}
</p>
```

### Personalizar mensajes de amor

En la sección de "Mensajes Especiales" (línea ~185), reemplaza los textos de ejemplo:

```typescript
<div className="border-l-4 border-rosa-pastel pl-6 py-3">
  <p className="font-semibold text-rosa-pastel mb-2 text-lg">
    Mi Primer Recuerdo Especial
  </p>
  <p className="text-gray-600">
    Escribe aquí tu primer mensaje de amor...
  </p>
</div>
```

---

## 2. Agregar Fotos a la Galería

### Opción A: Usar URLs de imágenes externas

Edita `client/src/pages/Home.tsx` en la sección de galería (línea ~170):

```typescript
const galleryImages = [
  {
    id: 1,
    url: 'https://ejemplo.com/foto1.jpg',
    caption: 'Nuestro primer viaje'
  },
  {
    id: 2,
    url: 'https://ejemplo.com/foto2.jpg',
    caption: 'En la playa'
  },
  // Agrega más fotos aquí
];
```

Luego actualiza el grid para mostrar las imágenes:

```typescript
{galleryImages.map((img) => (
  <div key={img.id} className="rounded-2xl overflow-hidden">
    <img 
      src={img.url} 
      alt={img.caption}
      className="w-full h-48 object-cover hover:scale-110 transition-transform"
    />
  </div>
))}
```

### Opción B: Cargar imágenes locales

1. Sube tus imágenes usando `manus-upload-file --webdev`
2. Copia las URLs devueltas
3. Úsalas en tu galería como en la Opción A

---

## 3. Agregar Canciones Románticas

### Actualizar la playlist

Edita `client/src/pages/Home.tsx` (línea ~20):

```typescript
const songs = [
  {
    id: '1',
    title: 'Cancion Romantica 1',
    artist: 'Tu Artista Favorito',
    url: 'https://ejemplo.com/cancion1.mp3',
  },
  {
    id: '2',
    title: 'Cancion Romantica 2',
    artist: 'Tu Artista Favorito',
    url: 'https://ejemplo.com/cancion2.mp3',
  },
  // Agrega mas canciones aqui
];
```

**Fuentes de música recomendadas:**
- Spotify (con permisos)
- YouTube Music
- SoundCloud
- Archivos MP3 propios

---

## 4. Personalizar Colores

### Cambiar la paleta de colores

Edita `client/src/index.css` (línea ~48):

```css
:root {
  /* Paleta Romántica - Personaliza aquí */
  --celeste-romantic: #ADD8E6;    /* Azul celeste */
  --rosa-pastel: #FFB6C1;         /* Rosa pastel */
  --blanco-cremoso: #FDF5E6;      /* Blanco cremoso */
  --amarillo-suave: #FFFACD;      /* Amarillo suave */
  --gris-suave: #E8E8E8;          /* Gris suave */
}
```

**Paletas alternativas sugeridas:**

| Tema | Celeste | Rosa | Blanco |
|------|---------|------|--------|
| Romántico Clásico | #ADD8E6 | #FFB6C1 | #FDF5E6 |
| Romántico Oscuro | #6B9BD1 | #E75480 | #F5F0E8 |
| Romántico Pastel | #B4D7E8 | #F8B4D6 | #FEF9F3 |
| Romántico Vibrante | #87CEEB | #FF69B4 | #FFFAF0 |

---

## 5. Cambiar la Imagen de Portada

### Generar una nueva imagen personalizada

1. Accede a la sección de generación de imágenes
2. Describe tu imagen ideal (incluye detalles sobre ella, el lugar, etc.)
3. Copia la URL de la imagen generada
4. Reemplaza en `client/src/pages/Home.tsx` (línea ~40):

```typescript
<img
  src="https://tu-nueva-imagen.com/portada.webp"
  alt="Portada Romantica"
  className="absolute inset-0 w-full h-full object-cover"
/>
```

---

## 6. Agregar Más Secciones

### Crear una nueva sección (Ejemplo: Timeline)

1. Crea un nuevo archivo `client/src/pages/Timeline.tsx`:

```typescript
import RomanticCard from '@/components/RomanticCard';

export default function Timeline() {
  const events = [
    { date: '2023-01-15', title: 'Nuestro primer encuentro', description: '...' },
    { date: '2023-06-20', title: 'Primer viaje juntos', description: '...' },
    { date: '2024-02-14', title: 'San Valentín especial', description: '...' },
  ];

  return (
    <RomanticCard title="Nuestra Historia">
      {events.map((event) => (
        <div key={event.date} className="mb-6 border-l-4 border-rosa-pastel pl-4">
          <p className="font-bold text-rosa-pastel">{event.date}</p>
          <p className="font-semibold">{event.title}</p>
          <p className="text-gray-600">{event.description}</p>
        </div>
      ))}
    </RomanticCard>
  );
}
```

2. Agrega la ruta en `client/src/App.tsx`:

```typescript
import Timeline from './pages/Timeline';

// En el Router:
<Route path="/timeline" component={Timeline} />
```

3. Agrega un botón en Home.tsx para acceder a la nueva sección

---

## 7. Personalizar Animaciones

### Cambiar velocidad de animaciones

Edita `client/src/index.css`:

```css
@keyframes floatTulip {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-30px) rotate(5deg); opacity: 1; }
}

/* Cambia "4s" por la duración deseada */
.float-tulip {
  animation: floatTulip 4s ease-in-out infinite;
}
```

**Duraciones recomendadas:**
- Rápido: 2s (más dinámico)
- Normal: 3-4s (recomendado)
- Lento: 5-6s (más relajado)

---

## 8. Agregar Efectos Especiales

### Confeti al hacer clic

Instala una librería de confeti:

```bash
cd /home/ubuntu/cumpleanos-romancito
pnpm add canvas-confetti
```

Luego, en Home.tsx:

```typescript
import confetti from 'canvas-confetti';

const handleCelebrate = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Agrega un botón:
<RomanticButton onClick={handleCelebrate}>
  ¡Celebrar!
</RomanticButton>
```

---

## 9. Cambiar Tipografía

### Agregar nuevas fuentes

Edita `client/index.html` (línea ~11):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lora:wght@400;600&display=swap" rel="stylesheet" />
```

Luego actualiza `client/src/index.css`:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}

body {
  font-family: 'Lora', serif;
}
```

---

## 10. Publicar tu App

### Pasos para publicar:

1. **Crea un checkpoint** de tu trabajo personalizado
2. **Haz clic en "Publish"** en la interfaz de Manus
3. **Obtén tu URL pública** para compartir con ella
4. **Personaliza el dominio** (opcional) en Settings → Domains

---

## Próximas Mejoras Sugeridas

- Agregar un formulario para escribir mensajes en vivo
- Integrar un contador regresivo para el próximo cumpleaños
- Agregar un libro de visitas donde otros puedan dejar mensajes
- Crear una galería con efecto de carrusel mejorado
- Agregar integración con redes sociales para compartir

---

## Soporte y Recursos

- **Documentación de Componentes**: Ver `DESIGN_ARCHITECTURE.md`
- **Paleta de Colores**: Definida en `client/src/index.css`
- **Componentes Disponibles**: En `client/src/components/`

---

**¡Que disfrutes creando esta experiencia especial para ella!** 💕
