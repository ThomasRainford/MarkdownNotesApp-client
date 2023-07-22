// Contains small utility functions.

/**
 * Returns whether arr1 contains an element in arr2.
 *
 * @param arr1
 * @param arr2
 * @returns
 */
export const includesAny = <T>(arr1: T[], arr2: T[]) => {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      return true;
    }
  }
  return false;
};
