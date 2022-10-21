import { highlightTerm } from "../highlightUtils";

describe("highlight utils", () => {
  fit("should highlight one match", () => {
    expect(highlightTerm("some random string", "some")).toBe(
      "<ais-highlight-0000000000>some</ais-highlight-0000000000> random string"
    );
  });
});
