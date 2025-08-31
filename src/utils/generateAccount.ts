/**
 * Generates a random account number.
 * The account number is a numeric value up to 7 digits.
 *
 * @returns {number} A random account number between 0 and 9999999.
 */
export const generateAccountNo = (): number => {
  return Math.floor(Math.random() * 10000000);
};
