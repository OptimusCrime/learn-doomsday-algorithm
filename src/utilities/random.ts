export const selectRandomFromArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const generateRandomNumberInclusive = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);
