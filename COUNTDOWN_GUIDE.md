# Guía del Contador Regresivo (Countdown)

## ¿Qué es?

El **Countdown** es un componente animado que muestra cuánto tiempo falta para el cumpleaños. Incluye:

- **Contador en tiempo real** que se actualiza cada segundo
- **Animaciones románticas** con pulseo suave
- **Diseño responsive** que se adapta a móviles y desktop
- **Mensaje especial** cuando llega el día del cumpleaños

---

## Cómo Configurar la Fecha del Cumpleaños

### Paso 1: Abre el archivo `client/src/pages/Home.tsx`

### Paso 2: Busca esta línea (alrededor de la línea 21):

```typescript
const birthdayDate = new Date('2026-12-25'); // Cambia esta fecha
```

### Paso 3: Reemplaza la fecha con el cumpleaños real

**Formato:** `YYYY-MM-DD` (Año-Mes-Día)

**Ejemplos:**

```typescript
// Cumpleaños el 15 de marzo de 2025
const birthdayDate = new Date('2025-03-15');

// Cumpleaños el 8 de junio de 2026
const birthdayDate = new Date('2026-06-08');

// Cumpleaños el 25 de diciembre de 2024
const birthdayDate = new Date('2024-12-25');
```

### Paso 4: Guarda el archivo

El contador se actualizará automáticamente en la página.

---

## Personalizar el Título del Contador

En la misma página (línea ~82), puedes cambiar el título:

```typescript
<Countdown 
  targetDate={birthdayDate} 
  title="Falta para tu cumpleaños"  {/* Cambia este texto */}
/>
```

**Ejemplos de títulos personalizados:**

```typescript
title="Falta para el gran día"
title="Cuenta regresiva para mi princesa"
title="Días hasta tu cumpleaños especial"
title="Tiempo para celebrarte"
```

---

## Características del Contador

### Visualización Normal

Cuando falta tiempo para el cumpleaños, muestra:

- **Días** (0-365)
- **Horas** (0-23)
- **Minutos** (0-59)
- **Segundos** (0-59)

Cada unidad está en una caja redondeada con:
- Fondo blanco con borde rosa pastel
- Número en grande y legible
- Etiqueta descriptiva en celeste
- Sombra romántica suave
- Animación de pulseo en el fondo

### Cuando Llega el Cumpleaños

Cuando la fecha del cumpleaños llega, el contador cambia a:

```
¡Feliz Cumpleaños!
Hoy es tu día especial. ¡Que sea maravilloso!
🎉 💕 🎂
```

---

## Animaciones Incluidas

El contador tiene varias animaciones románticas:

1. **Fade-in**: El contador aparece suavemente al cargar la página
2. **Pulse**: El fondo de cada caja pulsea suavemente
3. **Bounce**: Los emojis de decoración (tulipán, estrella, luna) rebotan
4. **Parpadeo**: Los emojis parpadean como si brillaran

---

## Personalizar Animaciones

Si quieres cambiar la velocidad o el estilo de las animaciones, edita `client/src/index.css`:

### Cambiar velocidad del pulseo

Busca esta sección:

```css
@keyframes pulseSoft {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

.pulse-soft {
  animation: pulseSoft 2s ease-in-out infinite;  /* Cambia "2s" */
}
```

**Opciones de velocidad:**
- `1s` - Muy rápido (dinámico)
- `2s` - Normal (recomendado)
- `3s` - Lento (relajado)

---

## Ejemplo Completo de Configuración

```typescript
// client/src/pages/Home.tsx

export default function Home() {
  // ... otros estados ...

  // Configura el cumpleaños de tu pareja
  const birthdayDate = new Date('2025-07-14'); // 14 de julio de 2025

  // ... resto del código ...

  return (
    <div className="min-h-screen bg-blanco-cremoso">
      {/* ... otras secciones ... */}

      {/* Countdown */}
      <div className="mb-16">
        <Countdown 
          targetDate={birthdayDate} 
          title="Falta para el cumpleaños de mi amor"
        />
      </div>

      {/* ... más contenido ... */}
    </div>
  );
}
```

---

## Solución de Problemas

### El contador no se actualiza

**Solución:** Asegúrate de que la fecha esté en formato correcto: `YYYY-MM-DD`

```typescript
// ❌ Incorrecto
const birthdayDate = new Date('25-12-2025');

// ✅ Correcto
const birthdayDate = new Date('2025-12-25');
```

### El contador muestra números negativos

**Solución:** La fecha del cumpleaños ya pasó. Cambia a un año futuro:

```typescript
// ❌ Pasado
const birthdayDate = new Date('2024-12-25');

// ✅ Futuro
const birthdayDate = new Date('2025-12-25');
```

### El contador no aparece en la página

**Solución:** Verifica que:
1. El import esté correcto: `import Countdown from '@/components/Countdown';`
2. El componente esté siendo usado: `<Countdown targetDate={birthdayDate} />`
3. No haya errores en la consola del navegador

---

## Próximas Mejoras

Puedes mejorar el contador agregando:

- **Sonido**: Reproducir una canción cuando llega el cumpleaños
- **Confeti**: Mostrar confeti cuando faltan 24 horas
- **Notificaciones**: Enviar una notificación cuando falte 1 hora
- **Múltiples fechas**: Mostrar contadores para varios eventos especiales
- **Zona horaria**: Considerar la zona horaria de ella

---

**¡Disfruta del contador regresivo romántico!** 💕
