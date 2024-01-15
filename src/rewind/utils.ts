export const maxByKey = <T = number>(arr: T[], fn: (a: T) => number): number | undefined => {
  if (arr.length === 0) return undefined;
  return arr.map(a => fn(a)).reduce((a, b) => a > b ? a : b);
}

export const dayInYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}