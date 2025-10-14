# Guía para Cambiar el Proveedor del Chatbot

## Resumen
El sistema actual soporta dos proveedores de chatbots:
1. **JotForm** (iframe nativo)
2. **Go High Level** (con 2 métodos diferentes)

## Configuración en `src/lib/botpage-data-hotel.ts`

### Para Go High Level (GTM Method - RECOMENDADO):
```typescript
botProvider: "ghl",
ghlMethod: "gtm", // Usa el contenedor data-chat-widget
ghlWidgetId: "68d9b1eb150fa8c4d7b4312f",
ghlLocationId: "t8gRxt7gwc25cXQi8kYp"
```

### Para Go High Level (Iframe Method - ALTERNATIVO):
```typescript
botProvider: "ghl",
ghlMethod: "iframe", // Intenta crear un iframe directo
ghlWidgetId: "68d9b1eb150fa8c4d7b4312f",
ghlLocationId: "t8gRxt7gwc25cXQi8kYp"
```

### Para volver a JotForm:
```typescript
botProvider: "jotform",
// ghlMethod se ignora cuando es jotform
```

## Métodos de Go High Level Disponibles

### 1. GTM Method (Recomendado)
- **Componente:** `HotelSidebarGHL`
- **Cómo funciona:** Usa el código GTM que proporcionaste con `data-chat-widget`
- **Ventajas:** 
  - Método oficial recomendado por GHL
  - Mejor integración con su sistema
  - Más estable a largo plazo

### 2. Iframe Method (Alternativo)
- **Componente:** `HotelSidebarGHLIframe`
- **Cómo funciona:** Intenta crear un iframe directo al widget
- **Ventajas:**
  - Comportamiento más similar a JotForm
  - Más control sobre el contenedor
  - Fallback si el método GTM no funciona

## Solución de Problemas

### Si el widget GTM no aparece:
1. Verifica que los IDs sean correctos en la configuración
2. Usa el botón "↻" para recargar el widget
3. Cambia temporalmente a `ghlMethod: "iframe"`

### Si el widget iframe no funciona:
1. La URL del iframe puede necesitar ajustes
2. GHL puede bloquear iframe embedding
3. Vuelve al método GTM: `ghlMethod: "gtm"`

### Si nada funciona:
1. Vuelve a JotForm temporalmente: `botProvider: "jotform"`
2. Contacta soporte de Go High Level para URLs de iframe específicas

## Códigos de Go High Level que tienes:

### Código Original:
```html
<script 
  src="https://widgets.leadconnectorhq.com/loader.js"  
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
 data-widget-id="68d9b1eb150fa8c4d7b4312f"   > 
 </script>
```

### Código GTM (Implementado):
```html
<div 
  data-chat-widget 
  data-widget-id="68d9b1eb150fa8c4d7b4312f" 
  data-location-id="t8gRxt7gwc25cXQi8kYp"  > 
 </div> 
<script 
  src="https://widgets.leadconnectorhq.com/loader.js"  
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
 data-widget-id="68d9b1eb150fa8c4d7b4312f"   > 
 </script>
```

## Configuración Actual Recomendada

Para probar Go High Level, usa esta configuración:

```typescript
// En src/lib/botpage-data-hotel.ts
export const hotelBotpageData = {
  appearance: {
    // ... otros campos ...
    botProvider: "ghl",
    ghlMethod: "gtm", // Comienza con GTM
    ghlWidgetId: "68d9b1eb150fa8c4d7b4312f",
    ghlLocationId: "t8gRxt7gwc25cXQi8kYp"
  }
  // ... resto de la configuración
}
```

## Debugging

Los componentes incluyen información de debugging:
- **GTM Method:** Muestra "Cargando widget GTM..."
- **Iframe Method:** Muestra "Iframe" en el header
- **Botón ↻:** Recarga el widget manualmente

## Fallback Seguro

Si tienes problemas, siempre puedes volver rápidamente a JotForm:
```typescript
botProvider: "jotform"
```

---

**Nota:** El método GTM es el más compatible con Go High Level. Si no funciona inmediatamente, dale unos segundos para cargar y usa el botón de recarga.