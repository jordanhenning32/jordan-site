import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const projectRequire = createRequire(resolve(root, "package.json"));

// Execute the actual TypeScript sources, replacing only external services/environment.
// Each harness gets its own module cache, just like an isolated server instance.
export function sourceLoader({ env = {}, mocks = {}, logger = console } = {}) {
  const cache = new Map();
  function load(relative) {
    const filename = resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename).exports;
    const compiledModule = { exports: {} };
    cache.set(filename, compiledModule);
    const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
      fileName: filename,
    });
    const requireSource = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`);
      return projectRequire(name);
    };
    const execute = new Function("require", "module", "exports", "process", "console", outputText);
    execute(requireSource, compiledModule, compiledModule.exports, { env }, logger);
    return compiledModule.exports;
  }
  return load;
}
