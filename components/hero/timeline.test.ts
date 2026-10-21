import { test } from "node:test";
import assert from "node:assert/strict";
import { clamp01 } from "./timeline.ts";

test("clamp01 clamps to [0,1]", () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(0.4), 0.4);
  assert.equal(clamp01(2), 1);
});
