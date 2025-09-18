# 🧪 Diferentes enfoques para pruebas de integración con Postgres

[![🧪🐳 Test‑Containers](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-test-containers.yml?branch=main&label=Test%E2%80%91Containers&logo=docker)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-test-containers.yml)
[![🐳 docker-compose](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-docker-compose.yml?branch=main&label=docker%E2%80%91compose&logo=docker)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-docker-compose.yml)
[![🖥️ No Containers](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-no-containers.yml?branch=main&label=No%20Containers&logo=postgresql)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-no-containers.yml)
[![🧪🤡 Mocks](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-mocks.yml?branch=main&label=mocks&logo=jest)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-mocks.yml)
[![🧪🚀 GitHub Services](https://img.shields.io/github/actions/workflow/status/0GiS0/integration-tests-demos/tests-github-actions-services.yml?branch=main&label=GitHub%20Services&logo=github)](https://github.com/0GiS0/integration-tests-demos/actions/workflows/tests-github-actions-services.yml)

¡Hola developer 👋🏻! Este proyecto es un ejemplo mínimo de una API en Node.js (Express) que se integra con Postgres. El objetivo es mostrar diferentes enfoques para pruebas de integración con Postgres.

## 🤔 ¿Por qué son importantes las pruebas de integración?

Las pruebas de integración son cruciales para asegurar que los distintos componentes de una aplicación funcionen correctamente juntos. En aplicaciones que interactúan con bases de datos, como Postgres, es vital validar que las consultas SQL, migraciones y conexiones se comporten como se espera en un entorno real.

El reto es encontrar un equilibrio entre:

- **Fidelidad**: Usar una base de datos real (Postgres) en lugar de mocks.
- **Reproducibilidad**: Asegurar que las pruebas se comporten igual en cualquier entorno (local, CI, etc.).
- **Simplicidad**: Minimizar la complejidad de configuración y mantenimiento.

Este repo presenta **5 enfoques diferentes**, ordenados de peor a mejor según estos criterios.

## 📦 Requisitos

- 🔧 Node.js 18+
- 🐳 Docker (recomendado para la mayoría de enfoques)
- Base de datos Postgres (opcional, solo para algunos enfoques)

### 🧰 Dev Container

Este repo incluye una configuración completa de Dev Container con:

- **Aplicación + Postgres**: Usando Docker Compose (`.devcontainer/compose.yml`)
- **Environment**: Node 20, Docker-in-Docker habilitado, permisos configurados
- **Extensiones**: ESLint, Prettier, tema Monokai Pro
- **Variables**: `TESTCONTAINERS_RYUK_DISABLED=true` para mejor compatibilidad

**Servicios incluidos:**

- `app`: Node.js con código mounted y acceso al socket Docker
- `postgres`: PostgreSQL 16 disponible en `postgres:5432` dentro del container

**Uso (VS Code):**

1. Instala la extensión "Dev Containers"
2. Abre el repo y pulsa "Reopen in Container"
3. Todo se configura automáticamente

## 🏁 Scripts disponibles

- ▶️ `npm run dev`: Arranca la API con nodemon en `http://localhost:3000`
- ▶️ `npm start`: Arranca la API sin nodemon
- ✅ `npm test` o `npm run test:test-containers`: Test-Containers (recomendado)
- 🐳 `npm run test:docker-compose`: Docker Compose
- 🖥️ `npm run test:no-containers`: Sin contenedores (Postgres local/service)
- 🧪 `npm run test:mock`: Tests con mocks (sin BD)
- 🚀 `npm run test:github-services`: Simula GitHub Actions Services

Todos los scripts incluyen reportes JUnit XML y sumarios automáticos.

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

## ⚡ Resumen rápido de enfoques

| Enfoque                  | Comando                        | Fidelidad             | Reproducibilidad            | Complejidad          | Dependencias        | Tiempo típico | Uso recomendado                                                 |
| ------------------------ | ------------------------------ | --------------------- | --------------------------- | -------------------- | ------------------- | ------------- | --------------------------------------------------------------- |
| 🧪🤡 **Mocks**           | `npm run test:mock`            | ❌ Baja (sin BD real) | ✅ Alta                     | ✅ Baja              | 🚫 Sin Docker/BD    | ⚡ ~2s        | Validar lógica HTTP/validaciones rápidamente                    |
| 🖥️ **No Containers**     | `npm run test:no-containers`   | ✅ Alta (BD real)     | 🟡 Media (depende de setup) | 🟡 Media             | 🐘 Postgres local   | ⚡ ~10s       | Desarrollo con Postgres local disponible                        |
| 🚀 **GitHub Services**   | `npm run test:github-services` | ✅ Alta (BD real)     | 🟡 Media (CI específico)    | 🟡 Media             | 🐘 Postgres service | ⚡ ~8s        | CI con PostgreSQL service, simula GitHub Actions                |
| 🐳 **Docker Compose**    | `npm run test:docker-compose`  | ✅ Alta (BD real)     | 🟡 Media (puertos fijos)    | 🟡 Media-Alta        | 🐳 Docker + Compose | 🐌 ~30s       | Control explícito del ciclo de vida, reproducibilidad aceptable |
| 🧪🐳 **Test-Containers** | `npm run test:test-containers` | ✅ Alta (BD real)     | ✅ Alta                     | 🟡 Media (lib. test) | 🐳 Docker           | 🚀 ~15s       | **Recomendado**: aislado, estable, mismo flujo local/CI         |

**Notas:**

- ⚡ **Mocks**: Más rápidos, sin setup de BD
- 🚀 **Test-Containers**: Balance ideal entre velocidad y fidelidad
- 🐌 **Docker Compose**: Más lento por setup/teardown manual
- 🖥️ **Servicios**: Rápido en CI, depende de configuración local

**Todos los enfoques incluyen:**

- 📊 Reportes JUnit XML automáticos con `jest-junit`
- � Resultados detallados con `dorny/test-reporter`
- 📝 Sumarios visuales con emojis y tablas en PRs/Actions
- 🎯 Casos de test unificados: GET /health, POST+GET /todos, GET /todos

## 🧱 Estructura del proyecto

```
├── � src/
│   ├── 🚪 index.js              # Punto de entrada del servidor
│   ├── 🧩 app.js                # Configuración de Express y rutas
│   ├── 🐘 db.js                 # Cliente de Postgres y migraciones
│   └── � routes/
│       └── 📍 todos.js          # Rutas CRUD de /todos
├── 📁 tests/                    # Tests organizados por estrategia
│   ├── 📁 mock/                 # Tests con mocks (sin BD)
│   ├── 📁 no-containers/        # Tests con Postgres local
│   ├── � docker-compose/       # Tests con docker-compose
│   └── 📁 test-containers/      # Tests con Test-Containers
├── 📁 scripts/
│   └── 🧾 generate-test-summary.mjs  # Script para generar sumarios
├── 📁 .devcontainer/
│   ├── ⚙️ devcontainer.json     # Configuración del dev container
│   └── 🐳 compose.yml           # Docker Compose para dev (app + postgres)
├── 📁 .github/workflows/
│   ├── 🔄 reusable-test-workflow.yml  # Workflow reusable central
│   ├── 🧪🐳 tests-test-containers.yml
│   ├── 🐳 tests-docker-compose.yml
│   ├── 🖥️ tests-no-containers.yml
│   ├── 🧪🤡 tests-mocks.yml
│   └── 🚀 tests-github-actions-services.yml
├── 📄 api.http                  # Batería de llamadas HTTP para testing manual
├── 📄 .env.example              # Variables de entorno de ejemplo
└── 📄 package.json              # Dependencias y scripts
```

## 🎯 Casos de test unificados

Todos los enfoques de testing cubren exactamente los mismos 3 casos:

1. **🏥 GET /health** - Verificar que la API responde correctamente
2. **📝 POST /todos + GET /todos** - Crear una tarea y verificar persistencia
3. **📋 GET /todos** - Verificar que devuelve un array (cobertura básica)

Esto garantiza comparabilidad entre enfoques y cobertura consistente.

## 🏗️ CI/CD con GitHub Actions

### 🔄 Workflow Reusable

Este proyecto utiliza un **workflow reusable** centralizado (`.github/workflows/reusable-test-workflow.yml`) que elimina duplicación y facilita el mantenimiento:

**Características:**

- 📥 Setup automático: checkout, cache, Node.js, dependencias
- 🐘 PostgreSQL service condicional (cuando se necesita)
- 📊 Generación automática de reportes JUnit XML
- 📈 Publicación con `dorny/test-reporter`
- 📝 Sumario visual con tablas y emojis generado por `scripts/generate-test-summary.mjs`
- ⚙️ Configuración por parámetros: comando, nombre, emojis, versión Node

**Workflows individuales (solo ~10 líneas cada uno):**

- 🧪🐳 `tests-test-containers.yml`: Test-Containers (recomendado)
- 🐳 `tests-docker-compose.yml`: Docker Compose
- 🖥️ `tests-no-containers.yml`: Sin contenedores (Postgres local)
- 🧪🤡 `tests-mocks.yml`: Tests con mocks
- 🚀 `tests-github-actions-services.yml`: Simula GitHub Actions Services

### 📊 Reportes automáticos

**JUnit XML + Test Reporter:**

- Todos los tests generan `test-results/junit.xml` con `jest-junit`
- `dorny/test-reporter@v1` procesa y muestra resultados detallados
- Funciona incluso cuando los tests fallan

**Sumarios visuales en PR:**

```markdown
## 🧪🐳 Test-Containers Results

| Suite                          | Pasados | Fallados | Tiempo (s) |
| ------------------------------ | ------- | -------- | ---------- |
| 🧪🐳 todos.test-containers.int | 3       | 0        | 0.245      |
| **TOTAL**                      | **3**   | **0**    |            |
```

### ➕ Agregar nuevos tipos de tests

Gracias al workflow reusable, es extremadamente sencillo:

**1. Script en `package.json`:**

```json
{
  "scripts": {
    "test:nuevo": "cross-env NODE_ENV=test jest --config jest.nuevo.config.js --runInBand --reporters=default --reporters=jest-junit"
  }
}
```

**2. Workflow (solo 10 líneas):**

```yaml
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
      needs-postgres: true # si requiere BD
```

**3. Auto-configuración incluida:** setup, reportes, sumario visual

### 🤖 Dependabot

Configurado para mantener actualizadas:

- **GitHub Actions** (`.github/workflows/`): semanalmente
- **Dependencias npm**: semanalmente
- Configuración en `.github/dependabot.yml`

## 🔧 API para testing manual

Incluye `api.http` con batería completa de llamadas:

- 🏥 **Health checks**: GET /health
- 📝 **CRUD básico**: POST /todos, GET /todos
- ❌ **Casos de error**: validaciones, 404s, 500s
- 🧪 **Edge cases**: caracteres especiales, títulos largos
- 📊 **Verificaciones**: conteos, limpieza

Compatible con VS Code REST Client extension.

## 🔐 Variables de entorno

**Soporte flexible:**

- `DATABASE_URL`: URL completa (preferida)
- Variables individuales: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
- Detección automática de entorno: `postgres` (devcontainer) vs `localhost` (local)

**Setup:**

```bash
cp .env.example .env
# Editar .env según tu configuración
```

## 🚀 Ejecución

### Desarrollo local

**Con dev container (recomendado):**

1. Abrir en VS Code → "Reopen in Container"
2. Todo configurado automáticamente (app + postgres)

**Sin dev container:**

```bash
npm install
npm run dev  # Requiere Postgres local
```

### Tests

**Recomendado (Test-Containers):**

```bash
npm test  # o npm run test:test-containers
# Requiere Docker ejecutándose
```

**Otros enfoques:**

```bash
npm run test:mock           # Sin dependencias
npm run test:no-containers  # Requiere Postgres local
npm run test:docker-compose # Requiere Docker + Compose
npm run test:github-services # Simula GitHub Actions
```

## 🧭 Estrategias de pruebas (ordenadas por recomendación)

### 1. 🧪🐳 Test-Containers (⭐ **RECOMENDADO**)

- **Comando**: `npm run test:test-containers` o `npm test`
- **Ubicación**: `tests/test-containers/`
- **Configuración**: Usa `@testcontainers/postgresql`

**✅ Pros:**

- Contenedores efímeros por test suite con puertos aleatorios
- Readiness integrado, limpieza automática, menos flakiness
- Misma experiencia en desarrollo local y CI
- Aislamiento perfecto entre ejecuciones

**❌ Contras:**

- Requiere Docker ejecutándose
- Arranque algo más lento que mocks (~15s vs ~2s)

**🎯 Cuándo usar:** Tu enfoque por defecto para tests de integración

---

### 2. 🐳 Docker Compose

- **Comando**: `npm run test:docker-compose`
- **Ubicación**: `tests/docker-compose/`
- **Configuración**: Orchestración manual con setup/teardown

**✅ Pros:**

- Control explícito del ciclo de vida de contenedores
- Reproducible y cercano a producción
- Útil para debugging de problemas de integración

**❌ Contras:**

- Setup/teardown manual más lento (~30s)
- Puertos fijos (posibles colisiones)
- Más mantenimiento y complejidad

**🎯 Cuándo usar:** Cuando necesitas control granular del entorno o debugging específico

---

### 3. 🚀 GitHub Actions Services

- **Comando**: `npm run test:github-services`
- **Ubicación**: `tests/no-containers/` (reutiliza casos)
- **Configuración**: Simula el comportamiento de GitHub Actions Services

**✅ Pros:**

- Rápido arranque (~8s)
- Simula exactamente el comportamiento en CI
- Útil para verificar configuración antes de push

**❌ Contras:**

- Específico para entorno GitHub Actions
- Reproducibilidad limitada fuera de ese contexto

**🎯 Cuándo usar:** Verificar localmente cambios que van a ejecutarse en GitHub Actions

---

### 4. 🖥️ Sin contenedores (No Containers)

- **Comando**: `npm run test:no-containers`
- **Ubicación**: `tests/no-containers/`
- **Configuración**: Requiere Postgres local o remoto

**✅ Pros:**

- Arranque muy rápido si Postgres ya está activo (~10s)
- Sencillo si ya tienes Postgres disponible localmente
- Útil en desarrollo con BD persistente

**❌ Contras:**

- Reproducibilidad baja entre entornos
- Possible state residual entre ejecuciones
- Dependiente de configuración externa

**🎯 Cuándo usar:** Desarrollo rápido con Postgres local disponible

---

### 5. 🧪🤡 Mocks (Desarrollo/Unit Tests)

- **Comando**: `npm run test:mock`
- **Ubicación**: `tests/mock/`
- **Configuración**: Mockea completamente `src/db.js`

**✅ Pros:**

- Ultra rápidos (~2s), sin dependencias externas
- Perfectos para validar lógica HTTP y validaciones
- Ideales para TDD y feedback rápido

**❌ Contras:**

- No validan SQL real ni esquema de BD
- No detectan problemas de integración
- Limitados a lógica de aplicación

**🎯 Cuándo usar:** Unit tests, validación de lógica de negocio, TDD, CI rápido

---

## 🎯 Guía de decisión rápida

```
¿Necesitas validar integración con BD real?
├─ NO  → 🧪🤡 Mocks (ultra rápido, lógica de app)
└─ SÍ  → ¿Tienes Docker disponible?
   ├─ NO  → 🖥️ Sin contenedores (requiere Postgres local)
   └─ SÍ  → ¿Necesitas control granular del entorno?
      ├─ SÍ → 🐳 Docker Compose (debugging, casos especiales)
      └─ NO → ¿Ejecutando en GitHub Actions?
         ├─ SÍ → 🚀 GitHub Services (simula CI exacto)
         └─ NO → 🧪🐳 Test-Containers ⭐ **RECOMENDADO**
```

**Resumen:** Usa **Test-Containers** para la mayoría de casos, **Mocks** para feedback rápido, y los otros enfoques para casos específicos.
