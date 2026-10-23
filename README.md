# Integrity Solutions Consulting — ATS & Bolsa de Empleo (Frontend)

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4_CSS--first-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)

Interfaz de usuario moderna y de alto rendimiento para el **Applicant Tracking System (ATS)** y el **Portal de Empleo** de **Integrity Solutions Consulting**. 

El sistema centraliza todo el ciclo de selección de talento: desde la publicación de vacantes y la postulación pública con autocompletado por IA, hasta la evaluación técnica, tableros Kanban interactivos, agendamiento de entrevistas con Microsoft Teams y emisión de hojas de vida ejecutivas en formato institucional.

---

## 📑 Tabla de Contenidos

1. [Características Principales](#-características-principales)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Arquitectura del Sistema](#-arquitectura-del-sistema)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Guía de Inicio Rápido](#-guía-de-inicio-rápido)
6. [Variables de Entorno](#-variables-de-entorno)
7. [Scripts Disponibles](#-scripts-disponibles)
8. [Despliegue y CI/CD](#-despliegue-y-cicd)
9. [Documentación Técnica Detallada](#-documentación-técnica-detallada)

---

## 🚀 Características Principales

### 🌐 1. Portal Público y Bolsa de Empleo
- **Explorador de Vacantes**: Búsqueda reactiva por palabras clave, modalidad de trabajo (presencial, híbrido, remoto) y departamento.
- **Detalle de Cargo y Postulación**: Vista detallada con requisitos y responsabilidades; flujo de postulación asistido que redirige a login preservando la vacante de interés (`returnTo`).
- **Autenticación Protegida**: Registro y login con desafío anti-bot integrado mediante **Cloudflare Turnstile**, verificación de correo electrónico y auto-recuperación de contraseña.

### 👤 2. Portal Privado del Candidato
- **Onboarding Guiado en 4 Pasos**:
  - **Extracción de CV por IA**: Carga tu currículum en PDF y la IA prellena automáticamente tus datos, estudios y trayectoria.
  - **Validaciones Oficiales para Ecuador**: Algoritmo de validación de cédula del Registro Civil, pasaportes y números celulares locales / internacionales.
- **Mis Postulaciones**: Monitoreo en tiempo real del estado de cada proceso de selección.
- **Confirmación de Horario de Entrevistas**: Selección directa del horario de preferencia entre opciones propuestas por RRHH.
- **Mi Perfil & GDPR**: Actualización de información, gestión de consentimientos de contacto y **eliminación definitiva de cuenta (derecho al olvido)**.

### 💼 3. Portal Staff / Reclutamiento (ATS)
- **Dashboard Ejecutivo**: Resumen de vacantes activas, postulantes de la semana y agenda de entrevistas de **Hoy** y **Mañana** (horario Ecuador `UTC-5`).
- **Tablero Kanban de Selección (Pipeline)**:
  - Drag-and-drop de postulantes entre etapas del proceso utilizando `@dnd-kit`.
  - Cálculo de compatibilidad / afinidad asistido por Inteligencia Artificial.
  - Motivos categorizados obligatorios al descartar candidatos (`RejectReasonDialog`).
  - Filtros avanzados persistentes en URL (búsqueda por nombre, universidad, última actividad y experiencia).
- **Ficha Integral del Candidato**:
  - Evaluación y justificación cualitativa de IA (puntos fuertes y brechas técnicas/blandas).
  - Historial de notas compartidas del equipo de selección.
  - **Generación en 1-Clic de Hoja de Vida Integrity**: Exportación automática a documento Microsoft Word (`.docx`) con plantilla corporativa lista para presentar al cliente.
  - Navegador secuencial de candidatos (anterior/siguiente) manteniendo los filtros de la terna.
- **Agenda y Agendamiento de Entrevistas**:
  - Definición de disponibilidad semanal recurrente por reclutador (días, franjas horarias y colchón de tiempo).
  - **Modo A (Directo por RRHH)** y **Modo B (Candidato elige)**.
  - Enlaces automáticos a salas virtuales de Microsoft Teams.
- **Banco de Talento**: Búsqueda transversal de profesionales registrados y reasignación directa a nuevos procesos.
- **Conversor Directo de CV**: Módulo para transformar cualquier PDF externo en un Word institucional Integrity mediante IA.

### ⚙️ 4. Configuración y Seguridad Corporativa
- **Plantillas de Cargo y Procesos de Selección**: Estandarización de descriptivos de puesto y flujos de fases.
- **Clientes y Contactos**: Directorio de empresas contratantes y sus responsables de talento.
- **Control de Acceso Basado en Roles (RBAC)**: Matriz de permisos granulares (`recruitment.*`, `org.*`, `auth.*`, `ai.*`) con sincronización segura libre de desconfiguraciones accidentales.

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| **Framework Web** | [Next.js 16](https://nextjs.org/) (App Router, Standalone) | BFF, enrutamiento, Server Components y optimización |
| **Librería UI** | [React 19](https://react.dev/) | Renderizado reactivo y concurrente de interfaces |
| **Lenguaje** | [TypeScript 5](https://www.typescriptlang.org/) | Tipado estricto en toda la aplicación |
| **Estilos & Diseño** | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first) | Tokens centralizados en `globals.css` vía `@theme inline` |
| **Componentes Base** | [Radix UI](https://www.radix-ui.com/) + [Lucide React](https://lucide.dev/) | Primitivas accesibles y conjunto de iconos visuales |
| **Estado Remoto** | [TanStack React Query v5](https://tanstack.com/query) | Caché de peticiones, revalidación y sincronización |
| **Estado Local** | [Zustand](https://zustand.docs.pmnd.rs/) | Stores ligeros de estado global (breadcrumbs, navegación) |
| **Formularios** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Gestión de estados de formularios y validación de esquemas |
| **Tableros / Arrastre** | [@dnd-kit](https://dndkit.com/) | Drag-and-drop accesible para el Kanban de selección |
| **Seguridad Anti-Bot** | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | Validación humana invisible/interactiva en autenticación |
| **Pruebas** | [Vitest](https://vitest.dev/) + Testing Library | Pruebas unitarias y de integración de componentes |
| **Contenedores** | [Docker](https://www.docker.com/) (Node 20 Alpine) | Contenedorización liviana con salida `standalone` |

---

## 🏛 Arquitectura del Sistema

La solución opera bajo el patrón **Backend-For-Frontend (BFF)** con aislamiento estricto de credenciales:

```
+-------------------------------------------------------------------------+
|                              NAVEGADOR                                  |
|   Portal Público           Portal Candidato           Portal Staff      |
|   (Tema Navy #060B24)      (Mobile First)             (Kanban & ATS)    |
+------------------------------------+------------------------------------+
                                     |  HTTPS (Cookies HttpOnly)
                                     v
+-------------------------------------------------------------------------+
|                           NEXT.JS 16 (BFF)                              |
|  - Middleware Proxy (src/proxy.ts): Routing, Sesión y Auto-Refresh      |
|  - Seguridad: Content-Security-Policy (CSP), HSTS, Turnstile            |
|  - API Route Handlers (/api/*): Inyección de Auth Bearer y Client IP    |
|  - React Server Components: Precarga de datos y control RBAC            |
+------------------------------------+------------------------------------+
                                     |  Red Interna Docker (Bearer JWT)
                                     v
+-------------------------------------------------------------------------+
|                         FASTAPI BACKEND & BD                            |
|       API REST  ·  PostgreSQL  ·  Almacenamiento S3  ·  Motor IA        |
+-------------------------------------------------------------------------+
```

### Gestión de Tokens Segura y Refresco Transparente
- Los tokens `access-token` y `refresh-token` se resguardan en cookies de tipo `HttpOnly`, inaccesibles desde código JavaScript del navegador.
- Ante la expiración del `access-token`, el servidor Next.js ejecuta la rotación mediante una **cola de coalescencia en memoria** (`refreshInFlight`). Esto elimina las colisiones de rotación cuando múltiples llamadas simultáneas canjean el mismo token de refresco.

---

## 📂 Estructura del Proyecto

```
isc-ats-frontend/
├── .github/workflows/deploy.yml # Pipeline CI/CD automatizado
├── docs/                        # Documentación técnica completa
│   ├── 01_arquitectura_y_estructura.md
│   ├── 02_autenticacion_seguridad_y_rbac.md
│   ├── 03_modulos_funcionales.md
│   ├── 04_design_system_y_estilos.md
│   └── 05_despliegue_y_operaciones.md
├── public/                      # Recursos de imagen y logotipos institucionales
├── src/
│   ├── app/                     # App Router de Next.js
│   │   ├── (candidate)/         # Rutas de candidatos (/candidato/*)
│   │   ├── (public)/            # Rutas públicas (/empleos, /login, /registro...)
│   │   ├── (staff)/             # Rutas internas staff (/vacantes, /entrevistas...)
│   │   ├── api/                 # Endpoints BFF que hacen proxy al backend
│   │   └── layout.tsx           # Layout base con providers globales
│   ├── design-system/           # Atomic Design (Atoms, Molecules, Organisms, UI)
│   ├── features/                # Módulos de negocio desacoplados
│   ├── lib/                     # Utilidades de servidor (cookies, proxy, fetch, IP)
│   ├── providers/               # Providers de contexto (React Query)
│   ├── shared/                  # Constantes (ROUTES), stores Zustand y utilidades
│   ├── proxy.ts                 # Middleware principal de autorización y routing
│   └── globals.css              # Design tokens y configuración Tailwind CSS v4
├── Dockerfile                   # Construcción multi-stage de producción (standalone)
├── Dockerfile.dev               # Entorno Docker de desarrollo
├── next.config.ts               # Cabeceras de seguridad CSP y modo standalone
└── package.json                 # Dependencias y scripts
```

---

## ⚡ Guía de Inicio Rápido

### Requisitos Previos
- **Node.js**: v20.x o superior
- **npm**: v10.x o superior
- Instancia activa del **Backend FastAPI**

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Integrity-Solutions-Consulting/isc-ats-frontend.git
cd isc-ats-frontend
```

### 2. Configurar Variables de Entorno
Copia el archivo de plantilla a tu entorno local:
```bash
cp .env.example .env.local
```

### 3. Instalar Dependencias
```bash
npm ci
```

### 4. Iniciar Servidor de Desarrollo

#### Opción A: Local con Node.js
```bash
npm run dev
```

#### Opción B: Con Docker (Recomendado)
```bash
docker compose up -d
```
La aplicación estará disponible de inmediato en [http://localhost:3000](http://localhost:3000).

---

## 🔐 Variables de Entorno

Definidas en `.env.example`:

```ini
# URL interna de la API FastAPI alcanzable por Next.js
BACKEND_INTERNAL_URL=http://localhost:8000/api/v1

# URL interna de Next.js para peticiones absolutas del servidor
NEXTJS_INTERNAL_URL=http://localhost:3000

# Clave pública de sitio de Cloudflare Turnstile (opcional para desarrollo local)
# Clave de pruebas oficial de Cloudflare que siempre aprueba:
TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

---

## 📜 Scripts Disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el entorno de desarrollo local con recarga rápida (`--webpack`) |
| `npm run build` | Compila y empaqueta la aplicación en modo `standalone` |
| `npm run start` | Arranca el servidor de producción compilado localmente |
| `npm run lint` | Ejecuta la verificación estática de código con **ESLint 9** |
| `npm test` | Ejecuta la suite de pruebas unitarias con **Vitest** |
| `npm run test:watch` | Ejecuta las pruebas en modo observador interactivo |

---

## 🚢 Despliegue y CI/CD

El repositorio cuenta con integración continua y despliegue continuo mediante **GitHub Actions** y **Dokploy**:

1. Al realizar `push` en las ramas `main` o `develop`, se dispara el workflow `.github/workflows/deploy.yml`.
2. Se compila la imagen Docker de producción multi-stage (`node:20-alpine`) y se publica en **GitHub Container Registry (GHCR)**: `ghcr.io/integrity-solutions-consulting/isc-ats-frontend`.
3. GitHub Actions invoca el webhook seguro de **Dokploy**, el cual realiza un redespacho automático con tiempo de inactividad cero (**Zero-Downtime Redeploy**).

---

## 📚 Documentación Técnica Detallada

Para consultar la documentación exhaustiva de cada área técnica del proyecto, revisa los manuales dedicados en la carpeta [`docs/`](./docs):

- 📐 [**01. Arquitectura y Estructura**](./docs/01_arquitectura_y_estructura.md): Arquitectura BFF, ciclo de vida de peticiones, convenciones de rutas y responsabilidades.
- 🛡️ [**02. Autenticación, Seguridad y RBAC**](./docs/02_autenticacion_seguridad_y_rbac.md): Cookies HttpOnly, refresco atómico de tokens, CSP, Turnstile, algoritmos de validación ecuatorianos y matriz RBAC.
- 🧩 [**03. Módulos y Funcionalidades**](./docs/03_modulos_funcionales.md): Portal público, onboarding guiado con IA, tablero Kanban, ficha de candidato, agendamiento de entrevistas y conversor de CV.
- 🎨 [**04. Sistema de Diseño y Estilos**](./docs/04_design_system_y_estilos.md): Tokens de diseño en Tailwind v4 CSS-first, Atomic Design, componentes UI y accesibilidad WCAG.
- 🚀 [**05. Despliegue y Operaciones**](./docs/05_despliegue_y_operaciones.md): Docker standalone, pipeline GitHub Actions, configuración de Dokploy y resolución de problemas comunes.

---

© 2026 Integrity Solutions Consulting. Todos los derechos reservados.
