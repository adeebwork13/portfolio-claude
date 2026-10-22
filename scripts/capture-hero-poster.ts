// Captures the hero's static poster: the fully exploded stack with the core lit,
// at each layout's canvas size, 2x, on a transparent background.
// Needs a production server on port 3100: `npm run build && npx next start -p 3100`.
// Re-run whenever the scene changes.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3100/";

const targets = [
  // lg layout (the 1240px container caps the column, so 518 x 520 from 1280 up).
  { file: "public/hero/defense-stack.png", viewport: { width: 1440, height: 900 }, stage: [518, 520] },
  // Phone layout at 390 wide: the stage is 350 x 320. Emulated as a phone (touch,
  // overlay scrollbars), or a desktop scrollbar narrows the stage and crops labels.
  { file: "public/hero/defense-stack-mobile.png", viewport: { width: 390, height: 844 }, stage: [350, 320], phone: true },
] as const;

const browser = await chromium.launch();
try {
  for (const target of targets) {
    const phone = "phone" in target;
    const page = await browser.newPage({
      viewport: target.viewport,
      deviceScaleFactor: 2,
      isMobile: phone,
      hasTouch: phone,
    });
    await page.goto(BASE);
    await page.waitForSelector("[data-hero-stage] canvas");
    await page.waitForSelector(".pin-spacer", { state: "attached" });

    // Scroll to 96% of the pin: inside the fully exploded hold (0.92-1), before the
    // stage starts receding as Chapter 01 arrives.
    await page.evaluate(() => {
      const spacer = document.querySelector<HTMLElement>(".pin-spacer")!;
      const section = document.querySelector<HTMLElement>("section[data-hero]")!;
      const top = spacer.getBoundingClientRect().top + scrollY;
      const start = top + Math.max(0, section.offsetHeight - innerHeight);
      window.scrollTo(0, start + 0.96 * innerHeight);
    });
    await page.waitForTimeout(2000); // let the frame loop's smoothing settle

    // Only the stage, on a transparent background, so the poster sits on the page's own
    // glows. Hiding everything else also drops the buttons' glow from the capture.
    await page.addStyleTag({
      content: `html, body, main { background: transparent !important; }
        body * { visibility: hidden !important; }
        [data-hero-stage], [data-hero-stage] * { visibility: visible !important; }
        [data-hero-poster] { display: none !important; }`,
    });
    await page.waitForTimeout(100);

    const stage = page.locator("[data-hero-stage]");
    const box = (await stage.boundingBox())!;
    if (Math.round(box.width) !== target.stage[0] || Math.round(box.height) !== target.stage[1]) {
      throw new Error(`${target.file}: stage is ${box.width}x${box.height}, expected ${target.stage.join("x")} (unscaled)`);
    }
    await stage.screenshot({ path: target.file, omitBackground: true });
    console.log(`wrote ${target.file} (${target.stage[0] * 2}x${target.stage[1] * 2})`);
    await page.close();
  }
} finally {
  await browser.close();
}
