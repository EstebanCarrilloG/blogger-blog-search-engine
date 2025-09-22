import { searchSettings } from "../config/searchSettings";

/**
 * Sets up the pagination links based on the number of posts.
 *
 * @param {number} length The number of posts.
 *
 * @returns {number} The number of pages needed.
 */
export default function setPagination(length) {
  const paginationContainer = $("#pagination");

  // Calculate the number of pages needed based on the number of posts
  const totalPostsNumber = length;
  const numberOfPages = Math.ceil(
    totalPostsNumber / searchSettings.resultsPerPage
  );

  // Clear the pagination container and add the pagination links
  paginationContainer.html("");
  for (let i = 1; i <= numberOfPages; i++) {
    paginationContainer.append(
      '<li ><a href = "#" class = "page-number">' + i + "</a></li>"
    );
  }

  $(".page-number").first().addClass("page-li-focus");

  return numberOfPages;
}
