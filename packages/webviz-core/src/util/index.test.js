// @flow
//
//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import { encodeURLQueryParamValue, positiveModulo } from "./index";

describe("util", () => {
  describe("encodeURLQueryParamValue()", () => {
    const test = (input, expected) => {
      const output = encodeURLQueryParamValue(input);
      expect(output).toBe(expected);

      // encoded output should be decoded by URLSearchParams as the original value
      const params = new URLSearchParams(`x=${output}`);
      expect(params.get("x")).toBe(input);
    };
    it("escapes disallowed characters", () => {
      test("&#[]%+\\", "%26%23%5B%5D%25%2B%5C");
    });
    it("doesn't escape allowed characters", () => {
      test(":/?@", ":/?@");
      test("-._~!$'()*,;=", "-._~!$'()*,;="); // sub-delims minus & and +
    });
    it("handles giant unicode code points", () => {
      test(String.fromCodePoint(0x10000), "%F0%90%80%80");
    });
  });
  describe("positiveModulo", () => {
    it("returns a positive value between 0 (inclusive) and modulus (exclusive)", () => {
      expect(positiveModulo(0, 10)).toEqual(0);
      expect(positiveModulo(10, 10)).toEqual(0);
      expect(positiveModulo(11, 10)).toEqual(1);
      expect(positiveModulo(21, 10)).toEqual(1);
      expect(positiveModulo(-1, 10)).toEqual(9);
      expect(positiveModulo(-11, 10)).toEqual(9);
    });
  });
});
