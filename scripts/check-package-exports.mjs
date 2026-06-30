import { createRequire } from "node:module";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const packages = [
  {
    name: "@finn-ui/tokens",
    dir: "packages/tokens",
    esmExports: ["tokens", "colors", "spacing", "radius"],
    cjsExports: ["tokens", "colors", "spacing", "radius"]
  },
  {
    name: "@finn-ui/theme",
    dir: "packages/theme",
    esmExports: ["createTheme", "lightTheme", "darkTheme"],
    cjsExports: ["createTheme", "lightTheme", "darkTheme"]
  },
  {
    name: "@finn-ui/react",
    dir: "packages/react",
    esmExports: ["UIProvider", "useTheme", "Box", "Text", "Stack", "Button", "Badge", "Avatar", "Checkbox", "Switch", "Skeleton", "Input", "FormField", "Card", "Divider"],
    cjsExports: ["UIProvider", "useTheme", "Box", "Text", "Stack", "Button", "Badge", "Avatar", "Checkbox", "Switch", "Skeleton", "Input", "FormField", "Card", "Divider"]
  }
];

async function assertFileExists(packageDir, filePath) {
  await access(path.join(rootDir, packageDir, filePath));
}

function assertExport(moduleValue, exportName, packageName, format) {
  if (!(exportName in moduleValue)) {
    throw new Error(`${packageName} missing ${format} export "${exportName}"`);
  }
}

for (const packageConfig of packages) {
  const manifestPath = path.join(rootDir, packageConfig.dir, "package.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  for (const field of ["main", "module", "types", "exports"]) {
    if (!manifest[field]) {
      throw new Error(`${packageConfig.name} package.json is missing "${field}"`);
    }
  }

  await assertFileExists(packageConfig.dir, manifest.main);
  await assertFileExists(packageConfig.dir, manifest.module);
  await assertFileExists(packageConfig.dir, manifest.types);

  const packageDir = path.join(rootDir, packageConfig.dir);
  const esmModule = await import(pathToFileURL(path.join(packageDir, manifest.module)).href);
  const cjsModule = require(path.join(packageDir, manifest.main));

  for (const exportName of packageConfig.esmExports) {
    assertExport(esmModule, exportName, packageConfig.name, "ESM");
  }

  for (const exportName of packageConfig.cjsExports) {
    assertExport(cjsModule, exportName, packageConfig.name, "CJS");
  }
}

console.log("Package export checks passed.");
