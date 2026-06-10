# Guía del Panel de Administración

## ¿Qué es?

El **Panel de Administración** es donde puedes subir y gestionar todo el contenido especial para el cumpleaños:

- **Fotos**: Galería de tus momentos juntos
- **Mensajes**: Mensajes de amor personalizados
- **Canciones**: Playlist romántica

---

## Cómo Acceder

1. Ve a: `https://cumple-roman-guasuug4.manus.space/admin`
2. Inicia sesión con tu cuenta (debes ser el propietario/admin)
3. ¡Listo! Ya estás en el panel

---

## Agregar Fotos

### Paso 1: Preparar la imagen

Tienes dos opciones:

**Opción A: Usar URL de internet**
- Sube la imagen a un servicio como Google Drive, Dropbox, Imgur
- Copia el link directo a la imagen
- Pégalo en el campo "URL de la imagen"

**Opción B: Usar manus-upload-file (Recomendado)**
```bash
manus-upload-file --webdev /ruta/a/tu/foto.jpg
```
- Esto te dará una URL especial que funciona perfectamente
- Copia esa URL en el campo "URL de la imagen"

### Paso 2: Llenar el formulario

- **Título**: Nombre de la foto (ej: "Nuestro viaje a la playa")
- **Descripción**: Detalles opcionales (ej: "Verano 2024")
- **URL de la imagen**: Link a la foto
- **Clave de almacenamiento**: Identificador único (ej: `photo_beach_2024`)

### Paso 3: Guardar

Haz clic en "Agregar Foto" y ¡listo! La foto aparecerá en la galería de la página principal.

---

## Agregar Mensajes

### Paso 1: Escribir tu mensaje

- **Título**: Encabezado del mensaje (ej: "Mi razón favorita para amarte")
- **Contenido**: Tu mensaje de amor (puede ser largo)
- **Emoji**: Elige un emoji decorativo (💕, 🌷, ✨, 🌙, etc.)

### Paso 2: Guardar

Haz clic en "Agregar Mensaje" y aparecerá en la sección de mensajes especiales.

### Ejemplos de Mensajes

```
Título: "Te amo porque..."
Contenido: "...tu sonrisa ilumina mis días, tu risa es mi canción favorita, 
y cada momento contigo es un regalo que atesoro. Eres mi persona favorita 
en el mundo y no puedo esperar a pasar el resto de mi vida contigo."
Emoji: 💕
```

---

## Agregar Canciones

### Paso 1: Encontrar la canción

Puedes usar URLs de:
- **Spotify**: Copia el link de la canción
- **YouTube Music**: Copia el link del video
- **Apple Music**: Copia el link
- **Cualquier plataforma**: Si tiene URL pública

### Paso 2: Llenar el formulario

- **Nombre de la canción**: Título exacto
- **Artista**: Nombre del artista
- **URL de la música**: Link directo a la canción
- **URL de la portada**: Link a la imagen del álbum (opcional)

### Paso 3: Guardar

Haz clic en "Agregar Canción" y se agregará a la playlist.

### Ejemplo

```
Nombre: "Perfect"
Artista: "Ed Sheeran"
URL: https://open.spotify.com/track/...
Portada: https://i.scdn.co/image/...
```

---

## Eliminar Contenido

Cada foto, mensaje y canción tiene un botón **🗑️ Eliminar** a la derecha.

Haz clic para eliminar ese elemento de la app.

---

## Consejos Útiles

### Para las Fotos

- Usa fotos de buena calidad (mínimo 800x600px)
- Fotos en formato JPG o PNG funcionan mejor
- Puedes subir hasta 20-30 fotos sin problemas
- El orden se puede personalizar editando el número de orden

### Para los Mensajes

- Escribe desde el corazón 💕
- Puedes agregar saltos de línea para que sea más legible
- Usa emojis que reflejen tus sentimientos
- Puedes tener hasta 10-15 mensajes

### Para las Canciones

- Elige canciones que tengan significado para ustedes
- La playlist se reproducirá en orden
- Asegúrate de que el link funcione (pruébalo antes)
- Mezcla géneros: románticas, alegres, nuestras favoritas

---

## Solución de Problemas

### "Error al agregar la foto"

**Posibles causas:**
- La URL de la imagen no es válida
- La imagen está en un servidor que no permite acceso directo
- El formato no es soportado

**Solución:**
- Usa `manus-upload-file --webdev` para subir la imagen
- Verifica que el link sea accesible desde el navegador

### "Error al agregar el mensaje"

**Posibles causas:**
- El título o contenido está vacío
- El contenido es muy largo (máximo 5000 caracteres)

**Solución:**
- Asegúrate de llenar todos los campos obligatorios
- Si el mensaje es muy largo, divídelo en dos mensajes

### "Error al agregar la canción"

**Posibles causas:**
- La URL no es válida
- El link no es directo a la canción
- El servidor está bloqueando el acceso

**Solución:**
- Verifica que el link sea correcto
- Prueba con otra plataforma (Spotify en lugar de YouTube)
- Usa `manus-upload-file --webdev` para subir un archivo de audio local

---

## Cómo Aparece en la Página Principal

### Fotos
- Aparecen en la sección **"Galería de Fotos"**
- Se muestran en una cuadrícula bonita
- Al hacer clic, se amplían

### Mensajes
- Aparecen en la sección **"Mensajes Especiales"**
- Cada uno con su emoji decorativo
- Se pueden desplazar horizontalmente

### Canciones
- Aparecen en el **"Reproductor de Música"**
- Se reproducen en orden
- Controles para play/pause/siguiente

---

## Seguridad

- Solo tú (como admin) puedes agregar/eliminar contenido
- Los visitantes solo pueden ver, no modificar
- Todo está guardado en la base de datos de forma segura

---

## Próximas Mejoras

Puedes pedir que se agreguen:

- Editar contenido existente (no solo eliminar)
- Reordenar fotos, mensajes y canciones
- Agregar videos
- Crear múltiples galerías temáticas
- Agregar contador de visitas

---

**¡Diviértete personalizando la página para el cumpleaños especial!** 🎉💕
