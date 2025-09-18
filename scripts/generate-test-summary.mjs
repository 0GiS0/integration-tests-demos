#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

// Resolve repo root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const junitPath = path.join(root, "test-results", "junit.xml");

if (!fs.existsSync(junitPath)) {
  console.log("❌ No se encontró test-results/junit.xml");
  process.exit(0);
}

const xml = fs.readFileSync(junitPath, "utf-8");
const parser = new XMLParser({ ignoreAttributes: false });
const data = parser.parse(xml);

// Normalise structure (jest-junit can wrap in <testsuites>)
let suites = [];
if (data.testsuites?.testsuite) {
  suites = Array.isArray(data.testsuites.testsuite)
    ? data.testsuites.testsuite
    : [data.testsuites.testsuite];
} else if (data.testsuite) {
  suites = Array.isArray(data.testsuite) ? data.testsuite : [data.testsuite];
}

let totalTests = 0;
let totalFailures = 0;
let rows = [];

const emojiFor = (name) => {
  if (/test-containers/i.test(name)) return "🧪🐳";
  if (/docker-compose/i.test(name)) return "🐳";
  if (/no[-]?containers|services/i.test(name)) return "🖥️";
  if (/mock/i.test(name)) return "🧪🤡";
  return "🧪";
};

for (const suite of suites) {
  const tests = Number(suite["@_tests"] ?? suite.tests ?? 0);
  const failures = Number(suite["@_failures"] ?? suite.failures ?? 0);
  const time = suite["@_time"] ?? suite.time ?? "";
  let rawName = suite["@_name"] || suite.name || "sin-nombre";
  // If rawName looks like a file path, extract base name
  if (rawName.includes("/") || rawName.includes("\\")) {
    rawName = rawName.split(/[\\/]/).pop();
  }
  rawName = rawName
    .replace(/\.test\.(js|mjs|cjs|ts)$/i, "")
    .replace(/\.int$/, "")
    .replace(/\.spec$/, "");
  const name = `${emojiFor(rawName)} ${rawName}`;
  totalTests += tests;
  totalFailures += failures;
  rows.push({ name, tests, failures, time });
}

const passed = totalTests - totalFailures;

// Build markdown table
let md = "";
md += `Resumen de tests (Jest)\n\n`;
md += `| Suite | Pasados | Fallados | Tiempo (s) |\n`;
md += `|-------|---------|----------|------------|\n`;
for (const r of rows) {
  md += `| ${r.name} | ${r.tests - r.failures} | ${r.failures} | ${r.time} |\n`;
}
md += `| **TOTAL** | **${passed}** | **${totalFailures}** | |\n`;

// Output to stdout so the workflow step can append it
console.log(md);
