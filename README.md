# 🧪 Diferentes enfoques para pruebas de integración con Postgres

[![🧪🐳 Test‑Containers](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-test-containers.yml?branch=main&label=Test%E2%80%91Containers&logo=docker)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-test-containers.yml)
[![🐳 docker-compose](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-docker-compose.yml?branch=main&label=docker%E2%80%91compose&logo=docker)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-docker-compose.yml)
[![🖥️ no-containers](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-no-containers.yml?branch=main&label=no%E2%80%91containers&logo=postgresql)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-no-containers.yml)
[![🧪 mocks](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-mocks.yml?branch=main&label=mocks&logo=jest)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-mocks.yml)

¡Hola developer 👋🏻! Este proyecto es un ejemplo mínimo de una API en Node.js (Express) que se integra con Postgres. El objetivo es mostrar diferentes enfoques para pruebas de integración con Postgres.

## 🤔 ¿Por qué son importantes las pruebas de integración?

Las pruebas de integración son cruciales para asegurar que los distintos componentes de una aplicación funcionen correctamente juntos. En aplicaciones que interactúan con bases de datos, como Postgres, es vital validar que las consultas SQL, migraciones y conexiones se comporten como se espera en un entorno real. Para ello, es necesario contar con un entorno de pruebas que simule fielmente el entorno de producción. Esto ayuda a detectar problemas de integración, garantizar la integridad de los datos y mejorar la confiabilidad general de la aplicación.

El reto es encontrar un equilibrio entre:

- **Fidelidad**: Usar una base de datos real (Postgres) en lugar de mocks.
- **Reproducibilidad**: Asegurar que las pruebas se comporten igual en cualquier entorno (local, CI, etc.).
- **Simplicidad**: Minimizar la complejidad de configuración y mantenimiento.

Este repo presenta 4 enfoques diferentes, ordenados de peor a mejor según estos criterios.

## 📦 Requisitos

- 🔧 Node.js 18+
- Base de datos Postgres (opcional, solo para algunos enfoques)
- 🐳 Docker (opcional, pero recomendado para los enfoques con contenedores

O si no quieres tener que instalar nada en tu máquina local puedes abrir este repo dentro de un contenedor.

### 🧰 Dev Container (opcional)

Este repo incluye una configuración de Dev Container para tener un entorno reproducible con Node 20 y acceso al daemon de Docker (necesario para Test‑Containers):

- Configuración: `.devcontainer/devcontainer.json`
- Imagen base: `mcr.microsoft.com/devcontainers/javascript-node:20`
- Características: `docker-outside-of-docker` (monta `/var/run/docker.sock`)
- Extensiones recomendadas: ESLint y Prettier

Cómo usarlo (VS Code):

1. Instala la extensión “Dev Containers”.
2. Abre el repo y pulsa “Reopen in Container”.
3. Se instalarán dependencias con `npm ci` automáticamente.

## 🏁 Scripts

- ▶️ `npm run dev`: Arranca la API con nodemon en `http://localhost:3000`
- ▶️ `npm start`: Arranca la API sin nodemon
- ✅ `npm test` o `npm run test:test-containers`: Ejecuta el ejemplo con Test‑Containers (recomendado)
- 🐳 `npm run test:legacy:docker-compose`: Ejecuta el ejemplo legacy con docker-compose (flujo ordenado)
- 🖥️ `npm run test:legacy:no-containers`: Ejecuta el ejemplo legacy SIN contenedores (requiere Postgres local)
- 🧪 `npm run test:mock`: Ejecuta el ejemplo con mocks (sin BD)

## ⚡ Resumen rápido (con emojis)

| Enfoque              | Comando                              | Fidelidad             | Reproducibilidad             | Complejidad          | Dependencias        | Uso recomendado                                                  |
| -------------------- | ------------------------------------ | --------------------- | ---------------------------- | -------------------- | ------------------- | ---------------------------------------------------------------- |
| 🧪 Mocks             | `npm run test:mock`                  | ❌ Baja (sin BD real) | ✅ Alta                      | ✅ Baja              | 🚫 Sin Docker/BD    | Validar lógica HTTP/validaciones rápidamente                     |
| 🖥️ Sin contenedores  | `npm run test:legacy:no-containers`  | ✅ Alta (BD real)     | ❌ Baja (depende de máquina) | 🟡 Media             | 🐘 Postgres local   | Entornos donde ya existe Postgres local y aceptas variabilidad   |
| 🐳 docker-compose    | `npm run test:legacy:docker-compose` | ✅ Alta (BD real)     | 🟡 Media (puertos fijos)     | 🟡 Media-Alta        | 🐳 Docker + Compose | Reproducibilidad aceptable y control explícito del ciclo de vida |
| 🧪🐳 Test-Containers | `npm run test:test-containers`       | ✅ Alta (BD real)     | ✅ Alta                      | 🟡 Media (lib. test) | 🐳 Docker           | Recomendado: aislado, estable, mismo flujo local/CI              |

## 🧱 Estructura

- 🚪 `src/index.js`: Punto de entrada del servidor
- 🧩 `src/app.js`: Configuración de Express y rutas
- 🐘 `src/db.js`: Cliente de Postgres y migración mínima (`initDb`)
- 📍 `src/routes/todos.js`: Rutas de ejemplo `/todos`
- 🧪🐳 `tests-test-containers/todos.test-containers.int.test.js`: Pruebas de integración con Postgres en contenedor (Test‑Containers)
- 📄 `.env.example`: Variables de entorno de ejemplo

### 🏗️ CI (GitHub Actions)

Workflows definidos en `.github/workflows/` para ejecutar cada enfoque por separado:

- 🧪🐳 `tests-test-containers.yml`: corre `npm run test:test-containers` (sección: "🧪🐳 Test‑Containers")
- 🐳 `tests-docker-compose.yml`: corre `npm run test:legacy:docker-compose` (sección: "🐳 docker-compose")
- 🖥️ `tests-no-containers.yml`: corre `npm run test:legacy:no-containers` con servicio Postgres del runner (sección: "🖥️ Sin contenedores")
- 🧪 `tests-mocks.yml`: corre `npm run test:mock` (sección: "🧪 Mocks")

### 🤖 Dependabot

Este repositorio está configurado con Dependabot para mantener al día:

- Acciones de GitHub (`.github/workflows/`): fichero `.github/dependabot.yml` → `package-ecosystem: github-actions` (semanal)
- Dependencias npm: `.github/dependabot.yml` → `package-ecosystem: npm` (semanal)

Puedes ajustar frecuencia, etiquetas y límites de PRs en `.github/dependabot.yml`.

## 🔐 Variables de entorno

Puedes crear un archivo `.env` copiando `.env.example`:

```bash
cp .env.example .env
```

La app soporta `DATABASE_URL` o las variables `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`.

## 🚀 Ejecutar

1. Instala dependencias:

```bash
npm install
```

2. Para desarrollo local (si tienes un Postgres disponible) arranca el server:

```bash
npm run dev
```

3. Para ejecutar pruebas (requiere Docker en ejecución):

```bash
npm test
```

Las pruebas levantan automáticamente un contenedor de Postgres, ejecutan una migración mínima para crear la tabla `todos`, y llaman a los endpoints `POST /todos` y `GET /todos` para verificar el flujo end-to-end.

## 🧭 Estrategias de pruebas (de peor a mejor)

### 1) 🧪 Mocks (peor fidelidad)

- Comando: `npm run test:mock`
- Código: `tests-mock/` + `jest.mocks.config.js`
- Pros:
  - Ultra rápidos, no dependen de servicios externos.
  - Ideales para validar lógica HTTP/validaciones y flujos felices/errores controlados.
- Contras:
  - No validan SQL real ni el esquema de la BD.
  - No detectan problemas de integración (conexión, migraciones, permisos, etc.).

### 2) 🖥️ Sin contenedores (peor reproducibilidad)

- Comando: `npm run test:legacy:no-containers`
- Código: `tests-legacy-no-containers/` + `jest.no-containers.config.js`
- Requisitos: Postgres local en `127.0.0.1:5432` (ajustable en `01_setEnv.js`).
- Pros:
  - Sencillo si ya tienes Postgres local.
  - Arranque rápido si el servicio ya está activo.
- Contras:
  - Reproducibilidad baja entre máquinas.
  - Flaky por estado residual y diferencias locales.
  - No aísla puertos ni limpia automáticamente.

### 3) 🐳 docker-compose (mejor, pero con orquestación manual)

- Comando: `npm run test:legacy:docker-compose`
- Código: `tests-legacy-docker-compose/` + `jest.docker-compose.config.js`
- Flujo ordenado: `01_setEnv.js` → `02_globalSetup.js` (up + readiness) → `03_*.test.js` → `04_globalTeardown.js` (down -v)
- Pros:
  - Reproducible y cercano a producción.
  - Control explícito del ciclo de vida.
- Contras:
  - Necesitas scripts para up/ready/down y esperar readiness SQL.
  - Puertos fijos (colisiones posibles).
  - Más mantenimiento en CI/local.

### 4) 🧪🐳 Test‑Containers (recomendado)

- Comando: `npm run test:test-containers`
- Código: `tests-test-containers/` (archivo `todos.test-containers.int.test.js`)
- Pros:
  - Contenedores efímeros por test suite, puertos aleatorios.
  - Readiness integrado; menos flakiness y limpieza automática.
  - Misma experiencia local y CI.
- Contras:
  - Requiere Docker en ejecución.
  - Arranque algo más lento que mocks (pero mucho más fiable que legacy).
