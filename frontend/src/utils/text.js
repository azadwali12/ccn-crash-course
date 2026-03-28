/**
 * Truncates text to a maximum length, appending an ellipsis if truncated.
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - Maximum number of characters before truncating.
 * @returns {string}
 */
export function truncateText(text, maxLength = 80) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
}
