import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FRONT_ANGLE,
  IDLE_SPEED,
  MAX_TILT,
  assembledY,
  clamp01,
  coreProgress,
  damp01,
  labelOpacity,
  plateProgress,
  plateY,
  shouldLoad3D,
  explodedY,
  idleWeight,
  parallaxAngles,
  stepSpin,
  yawFor,
} from "./timeline.ts";
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

test("parallaxAngles maps pointer to at most 6 degrees of tilt", () => {
  assert.ok(close(parallaxAngles(1, 0).y, MAX_TILT));
  assert.deepEqual(parallaxAngles(5, -5), parallaxAngles(1, -1));
  assert.ok(Math.abs(parallaxAngles(-1, 1).x) <= MAX_TILT);
});

test("idleWeight fades free spin out over the first 0.3 of progress", () => {
  assert.equal(idleWeight(0), 1);
  assert.equal(idleWeight(0.15), 0.5);
  assert.equal(idleWeight(1), 0);
});

test("yawFor locks to the three-quarter angle when idle weight is 0", () => {
  assert.equal(yawFor(2.5, 0), FRONT_ANGLE);
  assert.ok(close(yawFor(0.4, 1), FRONT_ANGLE + 0.4));
});

test("stepSpin advances one turn per 90s at full weight", () => {
  assert.ok(close(stepSpin(0, 1, 1), IDLE_SPEED));
  assert.ok(close(stepSpin(0, 1, 0.5), IDLE_SPEED / 2));
  assert.equal(stepSpin(0.3, 1, 0), 0.3);
});

test("stepSpin wraps only while spinning freely, so blended yaw never jumps", () => {
  // Free spin: wrapped into (-PI, PI].
  assert.ok(stepSpin(Math.PI - 0.001, 1, 1) < 0);
  // Mid-blend: not wrapped, so yawFor stays continuous.
  const before = yawFor(Math.PI - 0.001, 0.5);
  const after = yawFor(stepSpin(Math.PI - 0.001, 0.1, 0.5), 0.5);
  assert.ok(Math.abs(after - before) < 0.01);
});

test("plateProgress staggers plates 01 to 05 between 0.05 and 0.70", () => {
  assert.equal(plateProgress(0.05, 0), 0);
  assert.equal(plateProgress(0.25, 0), 1);
  assert.ok(close(plateProgress(0.7, 4), 1)); // float: (0.7 - 0.5) / 0.2 = 0.9999999999999998
  assert.equal(plateProgress(0.49, 4), 0);
  assert.ok(plateProgress(0.1, 0) > plateProgress(0.1, 1));
});

test("plateY runs from assembled to exploded", () => {
  for (let i = 0; i < 5; i++) {
    assert.equal(plateY(0, i), assembledY(i));
    assert.equal(plateY(1, i), explodedY(i));
  }
});

test("labelOpacity fades in over the last 40% of a plate's travel", () => {
  assert.equal(labelOpacity(0.6), 0);
  assert.equal(labelOpacity(1), 1);
});

test("coreProgress reveals the core between 0.70 and 0.92", () => {
  assert.equal(coreProgress(0.7), 0);
  assert.ok(close(coreProgress(0.92), 1));
  assert.equal(coreProgress(1), 1);
});

test("damp01 smooths toward target independent of frame rate", () => {
  assert.equal(damp01(0, 1, 0), 0);
  assert.ok(damp01(0, 1, 10) > 0.999);
});

const capable = { reducedMotion: false, saveData: false, effectiveType: "4g", webgl: true };

test("shouldLoad3D loads 3D on a capable connection and device", () => {
  assert.equal(shouldLoad3D(capable), true);
  assert.equal(shouldLoad3D({ ...capable, effectiveType: undefined }), true);
});

test("shouldLoad3D skips 3D under reduced motion", () => {
  assert.equal(shouldLoad3D({ ...capable, reducedMotion: true }), false);
});

test("shouldLoad3D skips 3D with Save-Data", () => {
  assert.equal(shouldLoad3D({ ...capable, saveData: true }), false);
});

test("shouldLoad3D skips 3D on 2g and slow-2g", () => {
  assert.equal(shouldLoad3D({ ...capable, effectiveType: "2g" }), false);
  assert.equal(shouldLoad3D({ ...capable, effectiveType: "slow-2g" }), false);
});

test("shouldLoad3D skips 3D without WebGL", () => {
  assert.equal(shouldLoad3D({ ...capable, webgl: false }), false);
});
