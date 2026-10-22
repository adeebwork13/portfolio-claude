import { expect, test, type Page } from "@playwright/test";

const ALT =
  "An exploded server stack: Network, Firewall, Operating System, Application and Data layers separated around a glowing AI core.";

const canvas = (page: Page) => page.locator("[data-hero-stage] canvas");
const posterOpacity = (page: Page) =>
  page.locator("[data-hero-poster]").evaluate((el) => Number(getComputedStyle(el).opacity));

/** The poster image is shown and has actually loaded (not a broken or empty box). */
async function expectPosterShown(page: Page) {
  const img = page.getByRole("img", { name: ALT });
  await expect(img).toBeVisible();
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  await expect.poll(() => posterOpacity(page)).toBe(1);
}

test("reduced motion shows poster only", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expectPosterShown(page);
  await expect(canvas(page)).toHaveCount(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("save-data shows poster", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true, effectiveType: "4g" },
      configurable: true,
    });
  });
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expectPosterShown(page);
  await expect(canvas(page)).toHaveCount(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("no webgl shows poster", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error -- narrowing the overloads is not the point of this stub
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
      if (type === "webgl" || type === "webgl2") return null;
      return original.call(this, type, ...rest);
    };
  });
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expectPosterShown(page);
  await expect(canvas(page)).toHaveCount(0);
});

test("context loss restores poster", async ({ page }) => {
  await page.goto("/");
  await expect(canvas(page)).toHaveCount(1);
  await expect.poll(() => posterOpacity(page)).toBe(0);
  await canvas(page).evaluate((el: HTMLCanvasElement) => {
    const gl = el.getContext("webgl2") ?? el.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  });
  await expect(canvas(page)).toHaveCount(0);
  await expectPosterShown(page);
});

test("reduced motion mid-visit", async ({ page }) => {
  await page.goto("/");
  await expect(canvas(page)).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(canvas(page)).toHaveCount(0);
  await expectPosterShown(page);
  // The pin stays: removing it would make the page jump under the visitor.
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
});

test("hero never empty before 3D", async ({ page }) => {
  // Hold back the three.js chunk so only the poster can show.
  await page.route("**/*.js", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (body.includes("WebGLRenderer")) await new Promise((r) => setTimeout(r, 5000));
    await route.fulfill({ response, body });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(canvas(page)).toHaveCount(0);
  await expectPosterShown(page);
  // The held-back chunk is still in flight; release it so it can't leak into the next test.
  await page.unrouteAll({ behavior: "ignoreErrors" });
});
