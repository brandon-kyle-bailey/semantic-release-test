export function isEven(value: number): boolean {
  console.log("value is", value);

  console.log("this is a bug fix", value);
  console.log("this is a feat", value);
  return value % 2 === 0;
}
