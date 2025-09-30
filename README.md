# 🧪 Diferentes enfoques para pruebas de integración con Postgres

<div align="center">

[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
[![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
[![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)

</div>

¡Hola developer 👋🏻! Este proyecto es un ejemplo mínimo de una API en Node.js (Express) que se integra con Postgres. El objetivo es mostrar diferentes enfoques para pruebas de integración con Postgres, mostradas en mi vídeo [La mejor forma de testear tu aplicación ➡️ Testcontainers 🧪📦 | Cap.16](https://youtu.be/FxzMdSfhitE)

<a href="https://youtu.be/FxzMdSfhitE">
 <img src="https://img.youtube.com/vi/FxzMdSfhitE/maxresdefault.jpg" alt="La mejor forma de testear tu aplicación ➡️ Testcontainers 🧪📦 | Cap.16" width="100%" />
</a>


## 🤔 ¿Por qué son importantes las pruebas de integración?

Las pruebas de integración son cruciales para asegurar que los distintos componentes de una aplicación funcionen correctamente juntos. En aplicaciones que interactúan con bases de datos, como Postgres, es vital validar que las consultas SQL, migraciones y conexiones se comporten como se espera en un entorno real.

El reto es encontrar un equilibrio entre:

- **Fidelidad**: Usar una base de datos real (Postgres), en este ejemplo, en lugar de mocks. Pero podría ser cualquier otro servicio, como por ejemplo caché, cola de mensajería, etc.
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
- 🖥️ `npm run test:no-containers`: Ejemplo sin contenedores, en el que necesitarías una base de datos local para que funcione.
- 🧪 `npm run test:mock`: Tests con mocks (sin BD)
- 🐳 `npm run test:docker-compose`: Tests que se apoyan en Docker Compose
- ✅ `npm test` o `npm run test:test-containers`: Test-Containers (recomendado)

## ⚡ Resumen rápido de enfoques

- ⚡ **Mocks**: Más rápidos, sin setup de BD
- 🚀 **Test-Containers**: Balance ideal entre velocidad y fidelidad
- 🐌 **Docker Compose**: Más lento por setup/teardown manual
- 🖥️ **Servicios**: Rápido en CI, depende de configuración local

**Todos los enfoques incluyen:**

- 📊 Reportes JUnit XML automáticos con `jest-junit`
- � Resultados detallados con `dorny/test-reporter`
- 📝 Sumarios visuales con emojis y tablas en PRs/Actions
- 🎯 Casos de test unificados: GET /health, POST+GET /todos, GET /todos

## 🏗️ CI/CD con GitHub Actions

### 🔄 Workflow Reusable

Este proyecto utiliza un **workflow reusable** centralizado (`.github/workflows/reusable-test-workflow.yml`) que elimina duplicación y facilita el mantenimiento:

**Características:**

- 📥 Setup automático: checkout, cache, Node.js, dependencias
- 📊 Generación automática de reportes JUnit XML
- 📈 Publicación con `dorny/test-reporter`
- 📝 Sumario visual con tablas y emojis generado por `scripts/generate-test-summary.mjs`
- ⚙️ Configuración por parámetros: comando, nombre, emojis, versión Node

**Workflows individuales:**

- 🖥️ `tests-github-actions-services.yml`: Este sería el que usaríamos si tenemos una fuerte dependecia de un servicio local/remoto en unos test, digamos, tradicionales. Podemos aprovecharnos de que en GitHub Actions podemos usar una sección llamada *services*, que nos permite ejecutar los servicios en contenedores antes de que se ejecute el flujo.
- 🧪🤡 `tests-mocks.yml`: Tests con mocks
- 🐳 `tests-docker-compose.yml`: Docker Compose
- 🧪🐳 `tests-test-containers.yml`: Usando Test containers


**Resumen:** Usa **Test-Containers** para la mayoría de casos, **Mocks** para feedback rápido, y los otros enfoques para casos específicos.

<div align="center">

### 🎯 ¿Te ha resultado útil este contenido?

**¡La mejor forma de agradecerlo es con una suscripción!** 

Cada nuevo suscriptor me motiva a seguir creando contenido de calidad y mantener estos repositorios actualizados. 

[![Suscríbete Ahora](https://img.shields.io/badge/🔔%20SUSCRÍBETE%20AHORA-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)

¡Nos vemos 👋🏻!

</div>
