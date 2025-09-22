/**
 * Function to render the search results component.
 * This component contains a pagination info paragraph, a posts results container div, and a pagination container div.
 * The pagination container div contains an unordered list with id "pagination".
 * @returns {string} The HTML string of the search results component.
 */
export default function searchResultsComponent() {
  return ` 
        <p class="pagination-container-info"></p>
        <div class="posts-results-container"></div>
        <div class="pagination-container"><ul id="pagination"></ul></div>`;
}
