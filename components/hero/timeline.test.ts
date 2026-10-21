import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FRONT_ANGLE,
  IDLE_SPEED,
  MAX_TILT,
  assembledY,
  clamp01,
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
