import { describe, it, expect } from "vitest";
import { getDamageComposition } from "./damageComposition";

describe("getDamageComposition", () => {
  it("should return zero percentages for empty champion list", () => {
    const result = getDamageComposition([]);
    expect(result).toEqual({
      "physical-damage": 0,
      "magic-damage": 0,
      "true-damage": 0,
    });
  });

  it("should calculate 100% magic damage for single magic champion", () => {
    const result = getDamageComposition(["Annie"]);
    expect(result["physical-damage"]).toBe(0);
    expect(result["magic-damage"]).toBe(100);
    expect(result["true-damage"]).toBe(0);
  });

  it("should handle champion with physical and true damage", () => {
    // Garen has both physical and true damage
    const result = getDamageComposition(["Garen"]);
    expect(result["physical-damage"]).toBe(50);
    expect(result["magic-damage"]).toBe(0);
    expect(result["true-damage"]).toBe(50);
  });

  it("should handle champion with physical and magic damage", () => {
    // Corki has both physical and magic damage
    const result = getDamageComposition(["Corki"]);
    expect(result["physical-damage"]).toBe(50);
    expect(result["magic-damage"]).toBe(50);
    expect(result["true-damage"]).toBe(0);
  });

  it("should calculate correct split for multiple champions", () => {
    // Garen: physical + true, Annie: magic = 3 total damage sources
    const result = getDamageComposition(["Garen", "Annie"]);
    expect(result["physical-damage"]).toBe(33); // 1/3
    expect(result["magic-damage"]).toBe(33); // 1/3
    expect(result["true-damage"]).toBe(33); // 1/3
  });

  it("should round percentages correctly", () => {
    // Garen x2: 2 physical + 2 true, Annie: 1 magic = 5 total damage sources
    const result = getDamageComposition(["Garen", "Garen", "Annie"]);
    expect(result["physical-damage"]).toBe(40); // 2/5 = 40%
    expect(result["magic-damage"]).toBe(20); // 1/5 = 20%
    expect(result["true-damage"]).toBe(40); // 2/5 = 40%
  });
});
