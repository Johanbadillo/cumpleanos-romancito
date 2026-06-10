# Guía de Personalización del Pie de Página

## ¿Qué es?

El **pie de página (Footer)** es la sección final de la página que incluye:

- Un mensaje romántico especial
- La fecha del cumpleaños formateada elegantemente
- Decoración con emojis animados
- Un cierre hermoso y memorable

---

## Cómo Personalizar el Mensaje Romántico

### Paso 1: Abre el archivo `client/src/pages/Home.tsx`

### Paso 2: Busca esta línea (alrededor de la línea 212):

```typescript
romanticMessage="Cada día contigo es un regalo que atesoro. Te amo más cada mañana y cada noche. Feliz cumpleaños a la mujer que hace mi vida completa. 💕"
```

### Paso 3: Reemplaza el mensaje con el tuyo

Puedes escribir cualquier mensaje que desees. Algunos ejemplos:

```typescript
// Opción 1: Corto y directo
romanticMessage="Te amo más cada día. Feliz cumpleaños, mi amor. 💕"

// Opción 2: Poético
romanticMessage="Eres mi razón de sonreír cada mañana, mi paz en la tormenta, mi hogar. Feliz cumpleaños a mi amor eterno. 🌷✨"

// Opción 3: Personal y específico
romanticMessage="Desde el primer día que te vi, supe que eras especial. Hoy celebramos tu día, pero cada día es especial contigo. Te amo infinitamente. 💕"

// Opción 4: Romántico y profundo
romanticMessage="En tus ojos veo mi futuro, en tu sonrisa encuentro mi felicidad, en tu amor descubro el sentido de la vida. Feliz cumpleaños, mi princesa. 👑💕"
```

### Paso 4: Guarda el archivo

El mensaje se actualizará automáticamente en la página.

---

## Personalizar la Fecha del Cumpleaños

La fecha se extrae automáticamente de la variable `birthdayDate` que ya configuraste anteriormente.

Si quieres cambiar la fecha, edita la línea 31 del mismo archivo:

```typescript
const birthdayDate = new Date('2026-08-24T00:00:00-05:00'); // Cambia esta fecha
```

---

## Estructura del Footer

El footer incluye:

### 1. **Divisor Decorativo**
- Una línea horizontal con un corazón en el centro
- Crea una separación elegante

### 2. **Mensaje Romántico**
- Texto personalizable
- Formateado en cursiva y tamaño grande
- Con decoración de estrellas

### 3. **Fecha del Cumpleaños**
- Se muestra en formato completo: "miércoles, 24 de agosto de 2026"
- En color rosa pastel
- Tamaño grande y legible

### 4. **Emojis Animados**
- Tres emojis (🌷 💕 ✨) que flotan suavemente
- Cada uno con un delay diferente
- Crean un efecto visual bonito

### 5. **Crédito y Cierre**
- Texto pequeño con el corazón
- Año actual automático
- Cierre elegante

---

## Ejemplos de Mensajes Románticos

### Para parejas nuevas
```
"Contigo descubrí que el amor verdadero existe. Feliz cumpleaños a la persona que cambió mi vida. 💕"
```

### Para parejas de muchos años
```
"Después de tantos años, mi amor por ti sigue creciendo cada día. Feliz cumpleaños a mi compañera de vida. 💕"
```

### Divertido y romántico
```
"Eres la mejor decisión que he tomado en mi vida. Feliz cumpleaños a mi persona favorita del universo. 🌟💕"
```

### Profundo y sincero
```
"Tu amor me ha enseñado el significado de la felicidad verdadera. Gracias por ser mi todo. Feliz cumpleaños, mi amor. 💕"
```

### Poético
```
"Como la luna ilumina la noche, tu amor ilumina mi vida. Feliz cumpleaños a mi estrella más brillante. ✨💕"
```

### Corto y dulce
```
"Te amo hoy, mañana y siempre. Feliz cumpleaños, mi amor. 💕"
```

---

## Cambiar los Emojis del Footer

Si quieres cambiar los emojis que flotan en el footer, abre `client/src/components/Footer.tsx` y busca esta sección (alrededor de la línea 68):

```typescript
<div className="flex justify-center gap-6 mb-12">
  <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🌷</span>
  <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite 0.3s' }}>💕</span>
  <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite 0.6s' }}>✨</span>
</div>
```

Reemplaza los emojis con los que prefieras:

```typescript
// Opción 1: Romántica
<span>🌹</span>  {/* Rosa roja */}
<span>💑</span>  {/* Pareja */}
<span>💐</span>  {/* Ramo de flores */}

// Opción 2: Celestial
<span>🌙</span>  {/* Luna */}
<span>⭐</span>  {/* Estrella */}
<span>✨</span>  {/* Brillo */}

// Opción 3: Naturaleza
<span>🌺</span>  {/* Flor tropical */}
<span>🦋</span>  {/* Mariposa */}
<span>🌸</span>  {/* Flor de cerezo */}
```

---

## Cambiar los Colores del Footer

El footer usa los colores de la paleta romántica. Si quieres cambiar los colores, edita `client/src/components/Footer.tsx`:

### Cambiar el color del texto del mensaje
Busca la línea con `text-gray-700` y cámbialo:

```typescript
// Cambiar a rosa
className="text-lg md:text-xl text-rosa-pastel max-w-2xl mx-auto leading-relaxed font-light italic"

// Cambiar a celeste
className="text-lg md:text-xl text-celeste-romantic max-w-2xl mx-auto leading-relaxed font-light italic"
```

### Cambiar el color de la fecha
Busca `text-rosa-pastel` en la fecha y cámbialo:

```typescript
// Cambiar a celeste
className="text-2xl md:text-3xl font-bold text-celeste-romantic capitalize"
```

---

## Velocidad de la Animación

Si quieres cambiar la velocidad de los emojis flotantes, edita el valor `3s` en la línea 68 de `Footer.tsx`:

```typescript
// Más rápido (2 segundos)
style={{ animation: 'float 2s ease-in-out infinite' }}

// Más lento (4 segundos)
style={{ animation: 'float 4s ease-in-out infinite' }}

// Muy lento (5 segundos)
style={{ animation: 'float 5s ease-in-out infinite' }}
```

---

## Solución de Problemas

### El mensaje no aparece
- Asegúrate de que el texto esté entre comillas
- Verifica que no haya caracteres especiales sin escapar
- Recarga la página después de guardar

### La fecha está incorrecta
- Verifica que la fecha en `birthdayDate` sea correcta
- Asegúrate de usar el formato `YYYY-MM-DD`

### Los emojis no se ven
- Algunos navegadores antiguos no soportan ciertos emojis
- Intenta con emojis más comunes (❤️, ⭐, 🌹)

---

## Próximas Mejoras

Puedes pedir que se agreguen:

- Cambiar el idioma del footer (inglés, portugués, etc.)
- Agregar un contador de años juntos
- Incluir una foto de pareja en el footer
- Agregar un botón para descargar la página como PDF
- Incluir un formulario para enviar un mensaje privado

---

**¡Personaliza el footer para hacerlo único y especial!** 💕
