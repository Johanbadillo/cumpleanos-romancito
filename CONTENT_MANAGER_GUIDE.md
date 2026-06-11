# Guía del Gestor de Contenido

## ¿Dónde subo el contenido?

**Accede aquí:** `https://cumple-roman-guasuug4.manus.space/content`

Esta es la página donde puedes subir **fotos, mensajes y canciones** sin necesidad de autenticación. ¡Es muy fácil de usar!

---

## Paso 1: Cómo Subir Fotos

### 1.1 Prepara tu foto

Tienes dos opciones:

**Opción A: Usar una URL de internet**
- Sube la foto a Google Drive, Dropbox o Imgur
- Copia el link directo a la imagen
- Pégalo en el formulario

**Opción B: Usar manus-upload-file (Recomendado)**
```bash
manus-upload-file --webdev /ruta/a/tu/foto.jpg
```
- Esto te dará una URL especial
- Copia esa URL en el formulario

### 1.2 Completa el formulario

1. Ve a la página `/content`
2. Haz clic en la pestaña **"Fotos"**
3. Completa los campos:
   - **Título de la foto**: Nombre de la foto (ej: "Nuestro viaje a la playa")
   - **Descripción** (opcional): Detalles adicionales (ej: "Verano 2024")
   - **URL de la imagen**: Link a la foto
4. Haz clic en **"Agregar Foto"**
5. ¡Listo! La foto aparecerá en la galería de la página principal

### 1.3 Ver tus fotos

Debajo del formulario verás una lista de todas las fotos que has agregado. Puedes:
- Ver una miniatura de cada foto
- Eliminar fotos haciendo clic en el botón 🗑️

---

## Paso 2: Cómo Agregar Mensajes

### 2.1 Completa el formulario

1. Ve a la página `/content`
2. Haz clic en la pestaña **"Mensajes"**
3. Completa los campos:
   - **Título del mensaje**: Encabezado (ej: "Mi razón favorita para amarte")
   - **Contenido del mensaje**: Tu mensaje de amor (puede ser largo)
   - **Emoji decorativo**: Elige un emoji (💕, 🌷, ✨, 🌙, etc.)
4. Haz clic en **"Agregar Mensaje"**
5. ¡Listo! El mensaje aparecerá en la sección de mensajes especiales

### 2.2 Ejemplos de mensajes

```
Título: "Te amo porque..."
Contenido: "...tu sonrisa ilumina mis días, tu risa es mi canción favorita, 
y cada momento contigo es un regalo que atesoro. Eres mi persona favorita 
en el mundo y no puedo esperar a pasar el resto de mi vida contigo."
Emoji: 💕
```

```
Título: "Nuestro primer beso"
Contenido: "Ese momento cuando nuestros labios se tocaron fue el más mágico 
de mi vida. Desde entonces, cada día contigo es una bendición."
Emoji: 💋
```

---

## Paso 3: Cómo Agregar Canciones

### 3.1 Encuentra la canción

Puedes usar URLs de:
- **Spotify**: Copia el link de la canción
- **YouTube Music**: Copia el link del video
- **Apple Music**: Copia el link
- **SoundCloud**: Copia el link
- Cualquier plataforma que tenga URL pública

### 3.2 Completa el formulario

1. Ve a la página `/content`
2. Haz clic en la pestaña **"Canciones"**
3. Completa los campos:
   - **Nombre de la canción**: Título exacto (ej: "Perfect")
   - **Artista**: Nombre del artista (ej: "Ed Sheeran")
   - **URL de la música**: Link directo a la canción
   - **URL de la portada** (opcional): Link a la imagen del álbum
4. Haz clic en **"Agregar Canción"**
5. ¡Listo! La canción aparecerá en el reproductor de música

### 3.3 Ejemplo

```
Nombre: "Perfect"
Artista: "Ed Sheeran"
URL: https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMwbk
Portada: https://i.scdn.co/image/ab67616d0000b273...
```

---

## ¿Cómo aparece el contenido en la página principal?

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

## Consejos Útiles

### Para las Fotos
- Usa fotos de buena calidad (mínimo 800x600px)
- Fotos en formato JPG o PNG funcionan mejor
- Puedes subir hasta 20-30 fotos sin problemas
- El orden es el que las agregaste

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

## Cómo Usar manus-upload-file

Si quieres subir fotos o archivos locales:

```bash
# Subir una foto
manus-upload-file --webdev /home/usuario/Descargas/foto.jpg

# Subir múltiples fotos
manus-upload-file --webdev /home/usuario/Descargas/foto1.jpg /home/usuario/Descargas/foto2.jpg

# Subir un archivo de audio
manus-upload-file --webdev /home/usuario/Música/cancion.mp3
```

El comando te dará URLs como:
```
/manus-storage/photo_a1b2c3d4.jpg
```

Copia esa URL y pégala en el formulario.

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
- Prueba con otro formato (JPG en lugar de PNG)

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

### La foto no se ve

- Espera unos segundos después de agregarla
- Recarga la página
- Verifica que la URL sea correcta

---

## Eliminar Contenido

Cada foto, mensaje y canción tiene un botón **🗑️ Eliminar** a la derecha.

Haz clic para eliminar ese elemento de la app.

---

## Resumen Rápido

| Qué quiero | Dónde voy | Qué hago |
|-----------|----------|---------|
| Subir fotos | `/content` → Pestaña "Fotos" | Completo el formulario y hago clic en "Agregar Foto" |
| Agregar mensajes | `/content` → Pestaña "Mensajes" | Completo el formulario y hago clic en "Agregar Mensaje" |
| Agregar canciones | `/content` → Pestaña "Canciones" | Completo el formulario y hago clic en "Agregar Canción" |
| Eliminar contenido | `/content` → En la lista | Hago clic en el botón 🗑️ |

---

**¡Diviértete personalizando la página para el cumpleaños especial!** 🎉💕

Para más ayuda, consulta los otros archivos de documentación en el proyecto.
