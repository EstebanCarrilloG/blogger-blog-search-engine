/**
 * Validates the search input text
 * @param {string} text - The search text
 * @returns {boolean} - True if the text is valid, false otherwise
 * A valid text is a string that contains only alphanumeric characters and spaces
 */
export default function validateInput(text) {
  let re = new RegExp(/^[A-Za-z0-9\s]+$/g);
  text.trim();

  return text.match(re);
}
