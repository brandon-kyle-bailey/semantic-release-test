import { isEven } from "../../index";
describe("Given isEven function", () => {
  it("Should return true if number divisible by two", () => {
    const result = isEven(2);
    expect(result).toBe(true);
  });
  it("Should return false if number not divisible by two", () => {
    const result = isEven(3);
    expect(result).toBe(false);
  });
});
