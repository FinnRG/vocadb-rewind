export const maxByKey = <T = number>(arr: T[], fn: (a: T) => number): number | undefined => {
  if (arr.length === 0) return undefined;
  return arr.map(a => fn(a)).reduce((a, b) => a > b ? a : b);
}