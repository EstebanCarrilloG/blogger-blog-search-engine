import { searchSettings } from "./searchSettings";
const DOMitems = $(".search-results-container");
let searchInput = $("#postsPageSearch");
let postPageSearchBtn = $("#postPageSearchBtn");
let searchInputTitle = $(".search-logo");
let searchInfo = $(".posts-search-info");
const loadingElement = `<div class="loading">Cargando...</div>`;

/**
 * Function mainFunction
 * @description Function that handles the search functionality by taking the
 *              data from the blogger's blog and the search input, and it
 *              validates the input and filters the data when the user presses
 *              enter or clicks the search button.
 * @param {array} data - Array of objects containing the data from the blogger's
 *                       blog.
 * @returns {void} - Nothing.
 */
export default function mainFunction(data) {
  searchInput.keydown(function (Key) {
    if (Key.keyCode === 13) {
      textValidation(data);
    }
  });
  postPageSearchBtn.click(function () {
    textValidation(data);
  });
}

/**
 * Function textValidation
 * @description Function that validates the text input and filters the data
 *              from the blogger's blog when the user presses enter or clicks
 *              the search button. It uses a regular expression to check if
 *              the input contains any special characters. If it does, it
 *              displays an error message and doesn't filter the data.
 * @param {array} data - Array of objects containing the data from the blogger's
 *                       blog.
 * @returns {void} - Nothing.
 */
function textValidation(data) {
  let re = new RegExp(/^[A-Za-z0-9\s]+$/g);
  let text = searchInput.val().toLowerCase();
  text = text.replace(/\s\s+/g, "\n");
  text.trim();
  const searchResultsContent = ` 
        <p class="pagination-container-info"></p>
        <div class="posts-results-container"></div>
        <div class="pagination-container"><ul id="pagination"></ul></div>`;

  if (!text.match(re)) {
    searchInfo.text(
      "Error, No se admiten caracteres especiales como terminos de busqueda."
    );
    searchInputTitle.show();
    DOMitems.html("");
  } else {
    DOMitems.html(loadingElement);
    setTimeout(() => {
      searchInputTitle.hide();
      DOMitems.html(searchResultsContent);
      dataFiltering(data, text);
    }, 1000);
  }
}

/**
 * Function dataFiltering
 * @description Filters the blog data using the user's text input. The function
 *              searches for the input text in the title, content, or tags of
 *              each post. It then renders the filtered results or displays a 
 *              message if no results are found.
 * @param {array} data - Array of objects containing the data from the blogger's
 *                       blog.
 * @param {string} text - String containing the text input by the user.
 * @returns {void} - Nothing.
 */
function dataFiltering(data, text) {
  // DOM elements for pagination information and container
  let PaginationInfoTop = $(".pagination-container-info");
  let paginationContainer = $("#pagination");
  let tagsArray = [];

  // Filter the data based on the text input
  let filteredResults = data.filter((post) => {
    let postsTitle = post.title.$t.toLowerCase();
    let postsContent = post.content.$t.toLowerCase().replace("\n", "");

    // Check if post has categories, if not, default to "No tags found"
    post.category !== undefined
      ? (tagsArray = post.category.map((postsTerms) => {
          return postsTerms.term.toString();
        }))
      : (tagsArray = ["No tags found"]);

    tagsArray = tagsArray.toString().toLowerCase();

    // Return the post if the text is found in tags, title, or content
    if (tagsArray.indexOf(text) !== -1) {
      return tagsArray;
    } else if (postsTitle.indexOf(text) !== -1) {
      return postsTitle;
    } else if (postsContent.indexOf(text) !== -1) {
      return postsContent;
    }
  });

  // Update the UI based on whether filtered results are found
  if (filteredResults.length) {
    searchInfo.html(
      `Se encontaron <b id = "nResultados">${filteredResults.length}</b> resultados para el termino de busqueda : <b>"${text}"</b>`
    );
    setPagination(filteredResults);
    renderContent(filteredResults, 1);
  } else {
    searchInfo.html(
      `No Se encontaron resultados para el termino de busqueda : <b>"${text}"</b>`
    );
    PaginationInfoTop.html("");
    paginationContainer.html("");
  }
}

/**
 * Function setPagination
 * @description Function that sets the pagination for the search results.
 *              It creates the pagination links and add an event listener to
 *              each link. When a link is clicked, it renders the content of
 *              the search results for the selected page.
 * @param {array} data - Array of objects containing the data from the blogger's
 *                       blog.
 * @returns {void} - Nothing.
 */
function setPagination(data) {
  const PaginationInfoTop = $(".pagination-container-info");
  const paginationContainer = $("#pagination");

  // Calculate the number of pages needed based on the number of posts
  const totalPostsNumber = data.length;
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

  // Add an event listener to each pagination link
  document.querySelectorAll(".page-number").forEach((e, index) => {
    const postsResultsContainer = $(".posts-results-container");
    e.onclick = function () {
      // Show the number of the page that is being shown
      pagesInfo(index + 1);

      // Add a loading element to the posts results container
      postsResultsContainer.html(loadingElement);

      // Render the content of the search results for the selected page
      setTimeout(() => {
        postsResultsContainer.html("");
        renderContent(data, index + 1);
      }, 1000);
    };
  });

  // Show the number of the page that is being shown
  function pagesInfo(pageNumber) {
    PaginationInfoTop.html(`<p>Pagina ${pageNumber} de ${numberOfPages}</p>`);
  }

  // Show the first page by default
  pagesInfo(1);
}


/**
 * Function renderContent
 * @description Function that renders the content of the search results.
 *              It takes an array of objects containing the data from the
 *              blogger's blog and a page number as arguments.
 *              It renders the content of the search results for the selected
 *              page and adds an event listener to each post's link to go to
 *              the post's url when clicked.
 * @param {array} data - Array of objects containing the data from the blogger's
 *                       blog.
 * @param {number} pageNumber - Number of the page to render.
 * @returns {void} - Nothing.
 */
function renderContent(data, pageNumber) {
  const postsResultsContainer = $(".posts-results-container");

  let postLink = "";
  let postContent = "";

  // Slice the data array to get the posts for the selected page
  data = data.slice(
    (pageNumber - 1) * searchSettings.resultsPerPage,
    pageNumber * searchSettings.resultsPerPage
  );

  // Remove the focus class from all page numbers and add it to the selected
  // page number
  $(".page-number").removeClass("page-li-focus");

  let pageNumberWithFocus = $(".page-number")[pageNumber - 1];
  $("#pagination li").find(pageNumberWithFocus).addClass("page-li-focus");

  // Loop through each post and render its content
  data.map((post) => {
    const miNodo = document.createElement("div");
    miNodo.classList.add("post-searched__content");

    // Get the post's content and extract the description text
    let $c = $("<div>").html(post.content.$t);
    if ($c.find("p.blog-post-description").text()) {
      let content = $c.find("p.blog-post-description").text();
      postContent = content;
    } else {
      // If no description text is found, use a default text
      let x =
        "Descripcion del post";
      postContent = x;
    }

    // Loop through each link in the post and find the link with the "alternate"
    // rel value
    for (let j = 0; j < post.link.length; j++) {
      if (post.link[j].rel == "alternate") {
        postLink = post.link[j].href;
        break;
      }
    }

    // Format the post's date and update date
    let datePublish = post.published.$t,
      tPublish = datePublish.substring(0, 4),
      wPublish = datePublish.substring(5, 7),
      fPublish = datePublish.substring(8, 10),
      postDatePublished =
        searchSettings.monthFormat[parseInt(wPublish, 10)] +
        " " +
        fPublish +
        ", " +
        tPublish;
    let dateUpdate = post.updated.$t,
      tUpdate = dateUpdate.substring(0, 4),
      wUpdate = dateUpdate.substring(5, 7),
      fUpdate = dateUpdate.substring(8, 10),
      postDateUpdated =
        searchSettings.monthFormat[parseInt(wUpdate, 10)] +
        " " +
        fUpdate +
        ", " +
        tUpdate;

    // Create a string of HTML content for the post
    const texto_divs = `
    <a target ="_blank" class = "post-content__url" href = "${postLink}"><p>${
      post.title.$t
    }</p></a>
      <p class="post-content__info">
                <span class ="post-date" >${postDatePublished}</span> - ${postContent}
              </p>
              <p class="post-content-tags">${
                post.category !== undefined
                  ? post.category
                      .map((e) => `<span class= "tag-text">${e.term}</span>`)
                      .join("")
                  : `<span class= "tag-text">No tags found</span>`
              }</p>
              <p class="post-content__ad">
                  <span><b>Autor:</b> ${post.author[0].name.$t}</span> |
                  <span><b>Ultima actualización:</b> ${postDateUpdated}</span>
            </p>`;
    miNodo.innerHTML = texto_divs;

    // Append the post's content to the posts results container
    postsResultsContainer.append(miNodo);
    return 0;
  });
}
