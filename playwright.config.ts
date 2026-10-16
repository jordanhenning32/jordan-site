import { chromium, defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";

// Preserve the runner's environment. An existing job-local browser may be used
// directly when the normal Playwright browser installation is unavailable.
const defaultBrowser = chromium.executablePath();
const browserParts = defaultBrowser.split(sep);
const archiveIndex = browserParts.findIndex((part) => part.startsWith("chromium-"));
const cachedBrowser = archiveIndex < 0 ? "" : resolve(".pipeline/browsers", ...browserParts.slice(archiveIndex));
const executablePath = !existsSync(defaultBrowser) && existsSync(cachedBrowser) ? cachedBrowser : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 30_000 },
  outputDir: ".pipeline/browser-results",
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3210",
    browserName: "chromium",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    launchOptions: { executablePath, args: ["--host-resolver-rules=MAP jordanhenning.com 127.0.0.1", "--no-proxy-server"] },
  },
  webServer: {
    command: "node tests/helpers/serve-chat.mjs",
    url: "http://127.0.0.1:3210",
    timeout: 600_000,
    stdout: "pipe",
    reuseExistingServer: false,
  },
});
