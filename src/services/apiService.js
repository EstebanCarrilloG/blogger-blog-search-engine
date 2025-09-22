import { searchSettings } from "../config/searchSettings";

/**
 * Makes a GET request to the specified URL and returns the data
 * @param {string} text - The search text
 * @returns {Promise} - A promise that resolves with the data or rejects with an error
 */
export function fetchData(text) {
  const url = `${searchSettings.blogUrl}/feeds/posts/default/?alt=json-in-script&q=${text}&max-results=500`;
  return $.ajax({
    url: url,
    type: "get",
    dataType: "jsonp",
    success: function (data) {
      return data;
    },
    error: function (xhr, status, error) {
      return error;
    },
  });
}
