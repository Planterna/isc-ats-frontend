# 04. Sistema de Diseño (Design System) y Estilos

## 1. Enfoque Arquitectónico: Tailwind CSS v4 CSS-First

El proyecto adopta **Tailwind CSS v4**, la versión más moderna del framework que elimina el tradicional archivo `tailwind.config.ts` en favor de un enfoque **CSS-first** completamente nativo.

Todo el sistema de diseño se define en `globals.css`:
- Los **Design Tokens** se declaran como variables CSS en `:root`.
- Se exponen a las utilidades de Tailwind mediante la directiva `@theme inline`.
- **Ventaja de Negocio**: Permite modificar la identidad visual de la aplicación (por ejemplo, ante un refresco de marca corporativa de Integrity Solutions) editando únicamente variables CSS en tiempo de ejecución, sin requerir compilaciones adicionales de configuración.

```css
/* Fragmento de globals.css */
@import "tailwindcss";
@import "tw-animate-css";

:root {
  /* Marca / Primary (Azul Zafiro corporativo) */
  --primary-50:  #F0F4FB;
  --primary-100: #E2EAF8;
  --primary-200: #C2D3F2;
  --primary-300: #8AAAE6;
  --primary-400: #4B7AD0;
  --primary-500: #2856B0;
  --primary-600: #1F4898; /* Acción primaria / Botones principales */
  --primary-700: #163572; /* Sapphire corporativo */
  --primary-800: #162C56; /* Darkslate / Fondo de Sidebar */
  --primary-900: #0F2342;

  /* Acento (Cian degradado) */
  --accent-400:  #4DB8E6;
  --accent-500:  #24A4DB;
  --accent-600:  #1B85B8;

  /* Fondos y Superficies */
  --bg:          #F5F5F5; /* White Smoke (Fondo de trabajo Staff) */
  --surface:     #FFFFFF; /* Superficie de tarjetas y tablas */
  --public-bg:   #060B24; /* Dark Navy profundo (Portal Público y Candidatos) */
  --border:      #E2E5EB;
  --ink:         #1A2332; /* Color principal de texto */
  --ink-muted:   #5B6573;
  --ink-subtle:  #8A92A0;

  /* Semánticos */
  --success:     #16A34A;
  --warning:     #D97706;
  --danger:      #DC2626;
  --info:        #24A4DB;
}
```

---

## 2. Organización Atomic Design

Los componentes de interfaz están organizados en `src/design-system` siguiendo la metodología **Atomic Design**, garantizando reutilización, consistencia visual y facilidad de pruebas:

```
src/design-system/
├── atoms/        # Elementos básicos indivisibles
├── molecules/    # Combinaciones funcionales de átomos
├── organisms/    # Componentes de alto nivel con contexto de negocio
├── templates/    # Estructuras de página y esqueletos de layout
└── ui/           # Primitivas accesibles desacopladas (estilo shadcn)
```

### 2.1 Átomos (`atoms/`)
- `Avatar`: Genera avatares con iniciales y color dinámico determinista para candidatos y reclutadores.
- `Brand`: Renderiza el logotipo oficial de Integrity Solutions en versiones clara, oscura o solo icono.
- `FieldError`: Mensajes accesibles de validación bajo campos de formulario.
- `Select` / `Combobox`: Selectores accesibles estilizados con soporte de teclado.
- `Spinner`: Indicador visual de estado de carga.

### 2.2 Moléculas (`molecules/`)
- `FormField`: Contenedor integral que agrupa etiqueta (`Label`), control de entrada, descripción de ayuda y mensaje de error (`FieldError`).
- `FilterBar`: Barra de búsqueda y filtrado reactivo con chips de criterios activos.
- `MatchBadge`: Indicador del porcentaje de afinidad de IA (con colorimetría semántica: verde > 80%, ámbar 60-79%, gris < 60%).
- `Modal` / `ConfirmDialog`: Ventanas modales accesibles montadas en portales de React, con gestión de foco y cierre al presionar `Escape`.
- `Pagination`: Paginador numérico accesible para tablas y listas de datos.
- `ProgressIndicator`: Barra o pasos progresivos para el onboarding del candidato.
- `Tabs`: Selector de pestañas accesible para navegación contextual.
- `TagInput`: Selector interactivo de etiquetas (skills, herramientas y tecnologías).
- `Turnstile`: Integración modular con el widget anti-bot de Cloudflare.

### 2.3 Organismos (`organisms/`)
- `Header`: Cabecera global del portal staff con perfil de usuario y campana de notificaciones.
- `Sidebar`: Barra lateral de navegación con soporte para colapso, agrupadores de módulos y filtrado dinámico de permisos RBAC.
- `DataTable`: Tabla avanzada reutilizable con ordenamiento de columnas, paginación y estados vacíos.
- `VacancyCard`: Tarjeta de resumen de vacante utilizada tanto en la bolsa pública como en el portal del candidato.
- `VacancyDetail`: Bloque integral de presentación de una vacante para su previsualización o postulación.

### 2.4 Plantillas (`templates/`)
- `AuthLayout`: Layout centrado para formularios de autenticación (Login, Registro, Recuperación de contraseña).
- `PortalLayout`: Disposición estructural con Sidebar lateral fija y Header superior para el entorno de trabajo interno.

### 2.5 Primitivas Base (`ui/`)
Componentes construidos sobre `@radix-ui` y `class-variance-authority (cva)`:
- `Button`: Variantes semánticas (`default`, `outline`, `ghost`, `danger`, `secondary`) con soporte para estado `loading`.
- `Input`, `Textarea`, `Label`, `Card`, `Badge`, `Dialog`.

---

## 3. Accesibilidad y Estándares WCAG 2.2 AA

El sistema implementa activamente buenas prácticas de accesibilidad:
- **Contraste de Color**: Cumplimiento del ratio mínimo 4.5:1 para textos normales sobre fondos blancos y oscuros.
- **Navegación por Teclado**: Trampas de foco accesibles en modales, navegación fluida con tabuladores y teclas de flecha en selectores.
- **Roles ARIA**: Uso de atributos `aria-invalid`, `aria-describedby`, `aria-expanded` y `role="alert"` en mensajes de error dinámicos.
- **Elementos Interactivos Amigables**: Tamaños mínimos de toque de 44x44px en botones móviles para evitar errores de pulsación táctil.

---

## 4. Diseño Responsivo y Adaptabilidad

El sistema atiende dos realidades de uso:
1. **Portal Staff en Pantallas Grandes**: Diseñado para estaciones de trabajo de reclutadores, con tableros Kanban horizontales, navegación lateral eficiente y paneles de doble columna.
2. **Portal Candidato Móvil**: Diseñado para postulantes en smartphones, con navegación flotante inferior (`BottomNav`), formularios táctiles por pasos (`Stepper`) y carga sencilla de documentos mediante drag-and-drop o selección nativa de archivos.
