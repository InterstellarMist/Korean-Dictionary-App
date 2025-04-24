export const sanitizeInput = (input: string): string => {
  return input.replace(/[\x20-\x40]|[\x5B-\x60]|[\x7B-\x7E]/g, '');
};