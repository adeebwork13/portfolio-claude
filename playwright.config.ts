import { defineConfig } from "@playwright/test";

// Runs against a production build. NEXT_PUBLIC_HERO_DEBUG=1 exposes the hero's
// frame counter for the performance checks; it is never set for real builds.
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  use: { baseURL: "http://localhost:3100" },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 3 },
    },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: "npm run build && npx next start -p 3100",
    url: "http://localhost:3100",
    env: { NEXT_PUBLIC_HERO_DEBUG: "1" },
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
