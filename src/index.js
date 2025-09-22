//import("./style.css"); //uncomment this line on development mode
import { searchSettings } from "./config/searchSettings.js";
import handleSearch from "./utils/handleSearch.js";

jQuery(function () {
  $("#searchEngineRoot").html(`<div class="search-logo" id="logo"></div>
      <div class="search-input-container">
        <input
          type="text"
          name=""
          id="searchInput"
          placeholder="Ingrese el termino de busqueda."
        /><span id="postPageSearchBtn" class="fas fa-search"></span>
      </div>
      <p class="posts-search-info"></p>
      <div class="search-results-container" id="searchResultsContainer"></div>`);

  let searchInfo = $(".posts-search-info");

  $("#logo").append(
    searchSettings.textOrImgUrl.match("^https?://")
      ? `<img src="${searchSettings.textOrImgUrl}" alt="Logo del blog">` //
      : `<p>${searchSettings.textOrImgUrl}</p>`
  );

  let searchInput = $("#searchInput");

  const url = new URL(window.location.href);

  const params = url.searchParams;

  let searchText = "";

  searchInfo.html(`Bienvenido! Para comenzar ingrese el termino de busqueda.`);

  if (params.get("search")) {
    handleSearch(params.get("search"));
  }

  searchInput.on("input", function () {
    searchText = searchInput.val().toLocaleLowerCase();
  });

  searchInput.on("keydown", function (Key) {
    if (Key.key !== "Enter") return;

    handleSearch(searchText);
  });
});
