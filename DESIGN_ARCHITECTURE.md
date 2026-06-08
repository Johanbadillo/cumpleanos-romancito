# Arquitectura y Diseño: Aplicación Web Móvil Romántica para Cumpleaños

## Visión General

Esta aplicación web móvil está diseñada para crear una experiencia emotiva y memorable en el cumpleaños de la mujer que amas. La aplicación integra elementos visuales románticos, música ambiental, animaciones delicadas y una narrativa visual que transmite amor y celebración.

## Filosofía de Diseño: "Animación Romancito"

La aplicación adopta la filosofía **"Animación Romancito"**, que se centra en:

- **Estética Visual Romántica**: Paleta de colores suaves (celeste, rosa pastel, blanco cremoso)
- **Elementos Simbólicos**: Tulipanes, luna, estrellas, y referencias a Cinnamoroll
- **Tono Narrativo**: Dulce, poético, divertido y emotivo
- **Animaciones Fluidas**: Transiciones suaves que no abrumen, sino que complementen la experiencia

## Estructura de Navegación

### Página Principal (Home)
La página de inicio es la puerta de entrada a la experiencia. Incluye:

1. **Portada Romántica**: Imagen de fondo con gradiente celeste-rosa, decorada con tulipanes y la luna
2. **Mensaje de Bienvenida**: Texto personalizado con el nombre de la persona
3. **Botones de Navegación**: Acceso a diferentes secciones de la app
4. **Música Ambiental**: Reproducción automática o manual de música romántica de fondo

### Secciones Principales

| Sección | Descripción | Componentes |
|---------|-------------|------------|
| **Galería de Fotos** | Mostrar momentos especiales juntos | Carrusel de imágenes con transiciones suaves |
| **Mensajes Personalizados** | Notas de amor y deseos | Tarjetas con animaciones de entrada |
| **Línea de Tiempo** | Momentos importantes de la relación | Timeline interactivo con eventos |
| **Reproductor de Música** | Playlist romántica | Control de reproducción, visualizador de audio |
| **Sorpresas Interactivas** | Elementos sorpresa (confeti, efectos) | Botones con efectos especiales |

## Paleta de Colores

| Nombre | Código Hex | Uso |
|--------|-----------|-----|
| Celeste Romántico | `#ADD8E6` | Fondos principales, elementos suaves |
| Rosa Pastel | `#FFB6C1` | Acentos, botones, títulos |
| Blanco Cremoso | `#FDF5E6` | Fondos secundarios, tarjetas |
| Amarillo Suave | `#FFFACD` | Detalles, puntos de luz |
| Gris Suave | `#E8E8E8` | Bordes, separadores |

## Tipografía

- **Títulos**: Fuente redondeada y suave (ej. "Quicksand" o "Poppins")
- **Subtítulos**: Fuente script elegante (ej. "Great Vibes" o "Dancing Script")
- **Cuerpo**: Fuente sans-serif legible (ej. "Inter" o "Nunito")

## Componentes Clave

### 1. Botón Romántico
- Bordes redondeados (25px de border-radius)
- Fondo rosa pastel con texto blanco cremoso
- Efecto hover: cambio a celeste con elevación suave
- Sombra delicada

### 2. Tarjeta de Contenido
- Fondo blanco cremoso
- Border-radius de 15px
- Sombra suave con color celeste
- Padding generoso para respiración visual

### 3. Fondo Animado
- Gradiente suave de celeste a blanco cremoso
- Elementos flotantes (tulipanes, estrellas) con animaciones sutiles
- Efecto parallax opcional en scroll

### 4. Reproductor de Música
- Controles intuitivos (play, pause, siguiente, anterior)
- Visualizador de audio animado
- Indicador de progreso elegante

## Animaciones y Transiciones

### Animaciones de Entrada
- **Fade In**: Elementos aparecen gradualmente (300-500ms)
- **Slide In**: Tarjetas se deslizan desde los lados (400ms)
- **Scale Up**: Elementos crecen suavemente desde 0.95 a 1 (300ms)

### Animaciones de Hover
- **Scale**: Botones crecen ligeramente (1.05x, 200ms)
- **Glow**: Efecto de brillo sutil en elementos interactivos
- **Lift**: Sombra aumenta para efecto de elevación

### Animaciones Continuas
- **Float**: Tulipanes y estrellas flotan suavemente
- **Pulse**: Elementos clave pulsean suavemente
- **Twinkle**: Estrellas parpadean como en el cielo

## Estructura de Carpetas

```
cumpleanos-romancito/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Página principal
│   │   │   ├── Gallery.tsx        # Galería de fotos
│   │   │   ├── Messages.tsx       # Mensajes personalizados
│   │   │   ├── Timeline.tsx       # Línea de tiempo
│   │   │   └── Music.tsx          # Reproductor de música
│   │   ├── components/
│   │   │   ├── RomanticButton.tsx
│   │   │   ├── RomanticCard.tsx
│   │   │   ├── FloatingElements.tsx
│   │   │   ├── MusicPlayer.tsx
│   │   │   └── Header.tsx
│   │   ├── contexts/
│   │   │   └── MusicContext.tsx   # Contexto para música global
│   │   └── hooks/
│   │       └── useAudio.ts        # Hook para reproducción de audio
│   └── public/
│       └── music/                 # Archivos de música (si es necesario)
└── assets/
    ├── images/                    # Imágenes generadas
    └── music/                     # Archivos de música
```

## Flujo de Usuario

1. **Entrada**: Usuario accede a la app y ve la portada romántica
2. **Exploración**: Navega por las diferentes secciones
3. **Interacción**: Hace clic en botones, reproduce música, ve galerías
4. **Emoción**: Experimenta animaciones y sorpresas
5. **Compartir**: Opción para compartir la app con otros (futuro)

## Consideraciones Técnicas

- **Responsive Design**: Optimizado para móviles, tablets y desktop
- **Performance**: Animaciones suaves sin afectar la velocidad
- **Accesibilidad**: Contraste adecuado, navegación por teclado
- **Compatibilidad**: Funciona en navegadores modernos (Chrome, Safari, Firefox, Edge)

## Próximos Pasos

1. Generar imagen de portada romántica
2. Implementar componentes base (botones, tarjetas)
3. Crear página principal con navegación
4. Integrar reproductor de música
5. Agregar animaciones y efectos
6. Crear galería de fotos
7. Implementar mensajes personalizados
8. Pruebas y optimizaciones
