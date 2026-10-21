import { test } from "node:test";
import assert from "node:assert/strict";
import { assembledY, clamp01, explodedY } from "./timeline.ts";
import { LAYERS } from "./layers.ts";

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;

test("clamp01 clamps to [0,1]", () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(0.4), 0.4);
  assert.equal(clamp01(2), 1);
});

test("LAYERS run 01 Network to 05 Data, top to bottom", () => {
  assert.deepEqual(
    LAYERS.map((l) => l.number + " " + l.label),
    ["01 Network", "02 Firewall", "03 Operating System", "04 Application", "05 Data"],
  );
});

test("assembledY stacks plates top to bottom at 0.24 pitch", () => {
  assert.ok(assembledY(0) > assembledY(4));
  assert.ok(close(assembledY(0) - assembledY(1), 0.24));
});

test("explodedY centres the middle plate and spreads at 0.75 pitch", () => {
  assert.equal(explodedY(2), 0);
  assert.ok(close(explodedY(0), 1.5));
});
