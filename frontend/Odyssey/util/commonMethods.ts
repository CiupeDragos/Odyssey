export function getYearsFromTimestamp(timestamp: string | number): number {
  const intTimestamp =
    typeof timestamp === "string" ? parseInt(timestamp) : timestamp;

  const currentTimestamp = new Date().getTime();
  const differenceMs = currentTimestamp - intTimestamp;

  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const age = differenceMs / millisecondsPerYear;

  return Math.floor(age);
}
