#!/bin/bash

echo "🧪 Probando generación de reportes de tests..."
echo "=============================================="

# Limpiar reportes anteriores
rm -rf test-results
mkdir -p test-results

# Probar cada tipo de test
echo ""
echo "1️⃣ Probando tests de mocks..."
npm run test:mock
if [ -f "test-results/junit.xml" ]; then
    echo "✅ Mock tests: Reporte generado correctamente"
    echo "📊 Resumen:"
    grep -o 'tests="[^"]*"' test-results/junit.xml
    grep -o 'failures="[^"]*"' test-results/junit.xml
else
    echo "❌ Mock tests: No se generó el reporte"
fi

echo ""
echo "2️⃣ Probando tests de testcontainers (esperando fallos)..."
npm run test:test-containers || true  # || true para no fallar el script
if [ -f "test-results/junit.xml" ]; then
    echo "✅ Testcontainers: Reporte generado correctamente (con fallos esperados)"
    echo "📊 Resumen:"
    grep -o 'tests="[^"]*"' test-results/junit.xml
    grep -o 'failures="[^"]*"' test-results/junit.xml
else
    echo "❌ Testcontainers: No se generó el reporte"
fi

echo ""
echo "📋 Contenido final del directorio test-results:"
ls -la test-results/

echo ""
echo "📄 Estructura del último reporte XML:"
if [ -f "test-results/junit.xml" ]; then
    head -5 test-results/junit.xml
    echo "..."
else
    echo "❌ No hay archivo de reporte"
fi

echo ""
echo "🎯 ¿Los reportes se están generando? $([ -f "test-results/junit.xml" ] && echo "SÍ" || echo "NO")"