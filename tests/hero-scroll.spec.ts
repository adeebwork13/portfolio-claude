import { expect, test, type Page } from "@playwright/test";

const waitForPin = (page: Page) => page.waitForSelector(".pin-spacer", { state: "attached" });

test("pins for one viewport", async ({ page }) => {
  await page.goto("/");
  await waitForPin(page);
  const { extra, vh } = await page.evaluate(() => {
    const spacer = document.querySelector<HTMLElement>(".pin-spacer")!;
    const section = document.querySelector<HTMLElement>("section[data-hero]")!;
    return { extra: spacer.offsetHeight - section.offsetHeight, vh: innerHeight };
  });
  expect(Math.abs(extra - vh)).toBeLessThanOrEqual(2);
});

test("see the work lands on projects", async ({ page }) => {
  await page.goto("/");
  await waitForPin(page);
  await page.getByRole("link", { name: "See the work" }).click();
  await page.waitForTimeout(800);
  const top = await page.locator("#projects h2").evaluate((h) => h.getBoundingClientRect().top);
  const vh = await page.evaluate(() => innerHeight);
  expect(top).toBeGreaterThanOrEqual(0);
  expect(top).toBeLessThan(vh / 2);
});

test("deep link mid-page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("/#projects");
  await waitForPin(page);
  await page.waitForTimeout(1000);
  const opacity = await page
    .locator("[data-hero-stage]")
    .evaluate((el) => Number(getComputedStyle(el).opacity));
  expect(opacity).toBeLessThan(0.5);
  expect(errors).toEqual([]);
});

test("pin exists before canvas loads", async ({ page }) => {
  // Hold back the three.js chunk so the canvas can't mount yet.
  await page.route("**/*.js", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (body.includes("WebGLRenderer")) await new Promise((r) => setTimeout(r, 5000));
    await route.fulfill({ response, body });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await waitForPin(page);
  expect(await page.locator(".pin-spacer").count()).toBe(1);
  expect(await page.locator("[data-hero-stage] canvas").count()).toBe(0);
});

test("short landscape viewport", async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  await waitForPin(page);
  const fits = await page.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth,
  );
  expect(fits).toBe(true);
});

test("labels are hidden from assistive tech", async ({ page }) => {
  await page.goto("/");
  await waitForPin(page);
  await page.waitForSelector("[data-hero-stage] canvas");
  const pinEnd = await page.evaluate(() => {
    const spacer = document.querySelector<HTMLElement>(".pin-spacer")!;
    const section = document.querySelector<HTMLElement>("section[data-hero]")!;
    // The pin ends one viewport after it starts: "top top" for short heroes, "bottom bottom" for tall ones.
    return spacer.getBoundingClientRect().top + scrollY + Math.max(innerHeight, section.offsetHeight);
  });
  await page.evaluate((y) => window.scrollTo(0, y), pinEnd);
  await page.waitForTimeout(1500);

  const labels = await page.locator("[data-hero-label]").evaluateAll((els) =>
    els.map((el) => ({
      hidden: el.closest('[aria-hidden="true"]') !== null,
      size: parseFloat(getComputedStyle(el).fontSize),
      opacity: Number((el as HTMLElement).style.opacity),
    })),
  );
  expect(labels).toHaveLength(5);
  for (const label of labels) {
    expect(label.hidden).toBe(true);
    expect(label.size).toBeGreaterThanOrEqual(12);
    expect(label.opacity).toBeGreaterThan(0.99);
  }
});
