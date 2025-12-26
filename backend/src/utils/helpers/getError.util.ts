/**
 * Utility function to safely get an error message from an unknown error object.
 * @param {unknown} error - The caught value.
 * @returns {string} The error message.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  // Fallback for non-Error objects (e.g., plain strings, primitives)
  return String(error);
};
