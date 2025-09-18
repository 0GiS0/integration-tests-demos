# 🧪 Diferentes enfoques para pruebas de integración con Postgres

[![🧪🐳 Test‑Containers](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-test-containers.yml?branch=main&label=Test%E2%80%91Containers&logo=docker)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-test-containers.yml)
[![🐳🐳 docker-compose](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-docker-compose.yml?branch=main&label=docker%E2%80%91compose&logo=docker)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-docker-compose.yml)
[![🖥️ GitHub Actions](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-no-containers.yml?branch=main&label=GitHub%20Actions&logo=postgresql)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-no-containers.yml)
[![🧪🤡 mocks](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-mocks.yml?branch=main&label=mocks&logo=jest)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-mocks.yml)

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
- 🐳 Docker (opcional, pero recomendado para los enfoques con contenedores)

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

| Enfoque              | Comando                              | Fidelidad             | Reproducibilidad             | Complejidad          | Dependencias        | Tiempo típico | Uso recomendado                                                  |
| -------------------- | ------------------------------------ | --------------------- | ---------------------------- | -------------------- | ------------------- | ------------- | ---------------------------------------------------------------- |
| 🧪🤡 Mocks           | `npm run test:mock`                  | ❌ Baja (sin BD real) | ✅ Alta                      | ✅ Baja              | 🚫 Sin Docker/BD    | ⚡ ~2s        | Validar lógica HTTP/validaciones rápidamente                     |
| 🖥️ GitHub Services   | `npm run test:legacy:no-containers`  | ✅ Alta (BD real)     | 🟡 Media (depende de runner) | 🟡 Media             | 🐘 Postgres service | ⚡ ~10s       | CI con PostgreSQL service, acepta variabilidad entre entornos    |
| 🐳🐳 docker-compose  | `npm run test:legacy:docker-compose` | ✅ Alta (BD real)     | 🟡 Media (puertos fijos)     | 🟡 Media-Alta        | 🐳 Docker + Compose | 🐌 ~30s       | Reproducibilidad aceptable y control explícito del ciclo de vida |
| 🧪🐳 Test-Containers | `npm run test:test-containers`       | ✅ Alta (BD real)     | ✅ Alta                      | 🟡 Media (lib. test) | 🐳 Docker           | 🚀 ~15s       | **Recomendado**: aislado, estable, mismo flujo local/CI          |

**Notas sobre tiempo:**

- ⚡ **Mocks**: Más rápidos, sin setup de BD
- 🚀 **Test-Containers**: Balance ideal entre velocidad y fidelidad
- 🐌 **Docker Compose**: Más lento por setup/teardown manual
- 🖥️ **GitHub Services**: Rápido en CI, variable en local

**Todos los enfoques incluyen:**

- ⏱️ Medición automática de tiempo de ejecución
- 📊 Reportes detallados con `dorny/test-reporter`
- 📝 Sumarios visuales en PRs con emojis
- 🎯 Resultados consistentes: "X passed, Y failed, Z skipped"

## 🧱 Estructura

- 🚪 `src/index.js`: Punto de entrada del servidor
- 🧩 `src/app.js`: Configuración de Express y rutas
- 🐘 `src/db.js`: Cliente de Postgres y migración mínima (`initDb`)
- 📍 `src/routes/todos.js`: Rutas de ejemplo `/todos`
- 🧪🐳 `tests-test-containers/todos.test-containers.int.test.js`: Pruebas de integración con Postgres en contenedor (Test‑Containers)
- 📄 `.env.example`: Variables de entorno de ejemplo

### 🏗️ CI (GitHub Actions)

**Workflows reusables para mayor mantenibilidad:**

Este proyecto utiliza un **workflow reusable** (`.github/workflows/reusable-test-workflow.yml`) que centraliza toda la lógica común de testing, eliminando duplicación de código y facilitando el mantenimiento.

**Workflow reusable incluye:**

- 📥 Checkout automático con cache inteligente
- ⚙️ Setup de Node.js configurable (default: v20)
- 📦 Instalación automática de dependencias
- ⏰ Medición automática de tiempo de ejecución
- � PostgreSQL service condicional (para tests que lo requieren)
- 📊 Generación de reportes JUnit XML con `jest-junit`
- 📈 Publicación de resultados con `dorny/test-reporter`
- 📝 Sumario automático en PR con tiempo de ejecución
- 🎨 Emojis visuales para fácil identificación

**Workflows individuales:**

- 🧪🐳 `tests-test-containers.yml`: Test-Containers (recomendado)
- 🐳🐳 `tests-docker-compose.yml`: Docker Compose legacy
- 🖥️ `tests-no-containers.yml`: GitHub Actions Services con PostgreSQL
- 🧪🤡 `tests-mocks.yml`: Tests con mocks

**Características de los reportes:**

- ✅ Resultados detallados: "X passed, Y failed, Z skipped"
- ⏱️ Tiempo de ejecución: formato "MM:SS (Xs)"
- � Tablas con breakdown por test suite
- 🎯 Lista individual de tests con checkmarks verdes
- 📁 Enlaces a archivos de resultados XML
- 🚨 Reportes incluso cuando los tests fallan

**Ejemplo de sumario generado:**

```
## 🧪🐳 Test-Containers Results
⏱️ Tiempo de ejecución: 01:25 (85s)

✅ Tests ejecutados correctamente
📁 Archivo de resultados: test-results/junit.xml
```

### 🤖 Dependabot

Este repositorio está configurado con Dependabot para mantener al día:

- Acciones de GitHub (`.github/workflows/`): fichero `.github/dependabot.yml` → `package-ecosystem: github-actions` (semanal)
- Dependencias npm: `.github/dependabot.yml` → `package-ecosystem: npm` (semanal)

Puedes ajustar frecuencia, etiquetas y límites de PRs en `.github/dependabot.yml`.

## � Agregar nuevos tipos de tests

Gracias al workflow reusable, agregar un nuevo tipo de test es extremadamente sencillo:

### 1. Crear el script de test en `package.json`

```json
{
  "scripts": {
    "test:nuevo": "cross-env NODE_ENV=test jest --config jest.nuevo.config.js --runInBand --reporters=default --reporters=jest-junit"
  }
}
```

### 2. Crear el workflow (solo 10 líneas)

```yaml
# .github/workflows/tests-nuevo.yml
name: "🆕 Tests Nuevo Enfoque"
on: [push, pull_request]
jobs:
  test:
    uses: ./.github/workflows/reusable-test-workflow.yml
    with:
      test-command: "npm run test:nuevo"
      test-name: "Nuevo Enfoque Tests"
      test-emoji: "🆕"
      runner-emoji: "🆕"
      node-version: "20"
      needs-postgres: true # si requiere BD
      database-url: "postgres://postgres:postgres@127.0.0.1:5432/postgres"
```

### 3. Configuración automática incluida

El workflow reusable se encarga automáticamente de:

- ✅ Setup del entorno
- ✅ Medición de tiempo
- ✅ Generación de reportes
- ✅ Sumario visual en PR
- ✅ PostgreSQL si se necesita

## 📊 Configuración de reportes de tests

Este proyecto está configurado para generar reportes detallados de tests:

### 🎯 Jest + JUnit XML

- **Dependencia**: `jest-junit` para generar reportes XML compatibles con GitHub Actions
- **Configuración**: En `package.json` bajo `jest-junit`
- **Archivo de salida**: `test-results/junit.xml`
- **Reporters**: Todos los scripts de test usan `--reporters=default --reporters=jest-junit`

### 📈 GitHub Actions Test Reporter

- **Action**: `dorny/test-reporter@v1` procesa los archivos JUnit XML
- **Características**: Tablas detalladas, contadores, iconos visuales
- **Ejecución**: Siempre se ejecuta (incluso si los tests fallan)
- **Permisos**: `contents: read`, `checks: write`, `pull-requests: write`

### 🎨 Sumarios visuales en PR

Cada workflow genera automáticamente un sumario que incluye:

```
## 🧪🐳 Test-Containers Results
⏱️ Tiempo de ejecución: 01:25 (85s)

✅ Tests ejecutados correctamente
📁 Archivo de resultados: test-results/junit.xml
```

### 🔧 API para testing manual

También incluye un archivo `api.http` con una batería completa de llamadas para testing manual:

- 🏥 Health checks
- 📝 CRUD de TODOs (casos felices)
- ❌ Casos de error y validaciones
- 🧪 Edge cases (caracteres especiales, títulos largos)
- 📊 Verificaciones finales

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
