import renderContent from "./renderContent";
import validateInput from "./validateInput";
import { fetchData } from "../services/apiService";
import searchResultsComponent from "../components/searchResultsComponent";
import setPagination from "./setPagination";

/**
 * Function to handle the search form submission.
 * It takes the search text as an argument and validates it.
 * If the search text is empty or contains special characters, it shows an error message.
 * If the search text is valid, it fetches the data from the API and renders the search results component.
 * It also sets up an event listener to each pagination link to render the content of the search results for the selected page.
 * @param {string} searchText - The search text to be used to fetch the data from the API.
 */
async function handleSearch(searchText) {
  // DOM elements for pagination information and container
  const searchResultsContainer = $("#searchResultsContainer");

  let searchInfo = $(".posts-search-info");
  let logo = $("#logo");
  searchInfo.html("Cargando...");

  searchResultsContainer.empty();
  if (searchText === "")
    return searchInfo.html("Error, Ingrese un termino de busqueda.");

  if (!validateInput(searchText))
    return searchInfo.html(
      "Error, No se admiten caracteres especiales como terminos de busqueda."
    );
  const url = new URL(window.location.href);
  url.searchParams.set("search", searchText);
  window.history.pushState({}, "", url.href);

  logo.animate({ height: 0 }, 300);
  setTimeout(() => {
    logo.hide();
  }, 500);

  try {
    const data = await fetchData(searchText);
    const { entry } = data.feed;
    if (entry === undefined)
      return searchInfo.html(
        `No Se encontaron resultados para el termino de busqueda : <b>"${searchText}"</b>`
      );

    searchInfo.html(
      `Se encontraron <b>${entry.length}</b> resultados para el termino de busqueda : <b>"${searchText}"</b>`
    );

    searchResultsContainer.html(searchResultsComponent());
    const totalPages = setPagination(entry.length);

    let PaginationInfoTop = $(".pagination-container-info");

    const pagesInfo = (page) => {
      PaginationInfoTop.html(
        `<p>Pagina <b>${page}</b> de <b>${totalPages}</b></p>`
      );
    };

    let currentPage = 1;

    // Add an event listener to each pagination link
    $(".page-number").each((index, e) => {
      $(e).on("click", function () {
        // Show the number of the page that is being shown
        pagesInfo(index + 1);
        $(".page-number").removeClass("page-li-focus");
        $(e).addClass("page-li-focus");

        // Render the content of the search results for the selected page
        renderContent(entry, index + 1);
      });
    });

    // Show the number of the page that is being shown

    pagesInfo(currentPage);
    renderContent(entry, 1);
  } catch (e) {
    console.log("Ha ocurrido un error al obtener los datos.");
  }
}

export default handleSearch;
