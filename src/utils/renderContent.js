import postComponent from "../components/postComponent";
import { searchSettings } from "../config/searchSettings";

/**
 * Renders the posts content for the selected page.
 * @param {Array} data - The posts data array.
 * @param {Number} pageNumber - The page number to render.
 */
function renderContent(data, pageNumber) {
  const postsResultsContainer = $(".posts-results-container");

  postsResultsContainer.html("");

  // Slice the data array to get the posts for the selected page
  data = data.slice(
    (pageNumber - 1) * searchSettings.resultsPerPage,
    pageNumber * searchSettings.resultsPerPage
  );

  // Loop through each post and render its content
  postsResultsContainer.append(data.map((post) => postComponent(post))); // Append the post's content to the posts results container));
}

export default renderContent;
