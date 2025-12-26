/**
 * Normalizes a field value (which might be a single string, an array of strings, or undefined)
 * into a consistent array format.
 * @template T - The expected array element type.
 * @param {T | T[] | undefined} field - The raw input field from the request body.
 * @returns {T[]} An array containing the normalized values.
 */
export const normalizeArray = <T>(field: T | T[] | undefined): T[] => {
  if (Array.isArray(field)) {
    return field;
  }
  if (field === undefined || field === null) {
    return [];
  }
  return [field];
};
