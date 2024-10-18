import("./style.css");

$(function () {
  const searchSettings = {
    textOrImgUrl: "Texto o logo del blog", // Texto o logo del blog
    resultsPerPage: 10,
    blogUrl: "",
    monthFormat: [
      // Formato del mes
      "",
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sept",
      "Oct",
      "Nov",
      "Dic",
    ],
  };

  $("#logo").html(
    searchSettings.textOrImgUrl.match("^https?://")
      ? `<img src="${searchSettings.textOrImgUrl}" alt="Logo del blog">` //
      : `<p>${searchSettings.textOrImgUrl}</p>`
  );

  const url = `${searchSettings.blogUrl}/feeds/posts/default/?alt=json-in-script&max-results=500`;

  const DOMitems = $(".search-results-container");
  let searchInput = $("#postsPageSearch");
  let postPageSearchBtn = $("#postPageSearchBtn");
  let searchInputTitle = $(".search-logo");
  let searchInfo = $(".posts-search-info");
  const loadingElement = `<div class="loading">Cargando...</div>`;

  $.ajax({
    url: url,
    type: "get",
    dataType: "jsonp",
    /**
     * This function is the success callback of the AJAX request, it will be called when the data is loaded
     * @param {Object} data The object that contains the blog posts
     */
    success: function (data) {
      // Text validation, if the input text don't match with the regex, it will show an error message
      // and won't search anything
      searchInput.keydown(function (Key) {
        if (Key.keyCode === 13) {
          textValidation(data);
        }
      });
      postPageSearchBtn.click(function () {
        textValidation(data);
      });

      /**
       * Validate the text inputed by the user
       * @param {Object} data The object that contains the blog posts
       */
      function textValidation(data) {
        let re = new RegExp(/^[A-Za-z0-9\s]+$/g);
        let text = searchInput.val().toLowerCase();
        text = text.replace(/\s\s+/g, "\n");
        text.trim();

        const searchResultsContent = ` 
          <p class="pagination-container-info"></p>
          <div class="posts-results-container"></div>
          <div class="pagination-container"><ul id="pagination"></ul></div>
        `;

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
            dataFiltering(data.feed, text);
          }, 1000);
        }
      }

      /**
       * Filter the data posts by the text inputed by the user
       * @param {Object} data The object that contains the blog posts
       * @param {String} text The text inputed by the user
       */
      function dataFiltering(data, text) {
        let PaginationInfoTop = $(".pagination-container-info");
        let paginationContainer = $("#pagination");
        let tagsArray = [];

        let filteredResults = data.entry.filter((posts) => {
          let postsTitle = posts.title.$t.toLowerCase();
          let postsContent = posts.content.$t.toLowerCase().replace(/\n/g, "");

          posts.category !== undefined
            ? (tagsArray = posts.category.map((postsTerms) => {
                return postsTerms.term.toString();
              }))
            : (tagsArray = ["No tags found"]);

          tagsArray = tagsArray.toString().toLowerCase();

          if (tagsArray.indexOf(text) !== -1) {
            return tagsArray;
          } else if (postsTitle.indexOf(text) !== -1) {
            return postsTitle;
          } else if (postsContent.indexOf(text) !== -1) {
            return postsContent;
          }
        });

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
       * Set the pagination, it will show the number of pages and the number of posts per page
       * @param {Array} data The array that contains the filtered posts
       */
      function setPagination(data) {
        let PaginationInfoTop = $(".pagination-container-info");
        let paginationContainer = $("#pagination");

        let totalPostsNumber = data.length;
        let numberOfPages = Math.ceil(
          totalPostsNumber / searchSettings.resultsPerPage
        );
        paginationContainer.html("");
        for (let i = 1; i <= numberOfPages; i++) {
          paginationContainer.append(
            '<li ><a href = "#" class = "page-number">' + i + "</a></li>"
          );
        }

        document.querySelectorAll(".page-number").forEach((e, index) => {
          const postsResultsContainer = $(".posts-results-container");
          e.onclick = function () {
            pagesInfo(index + 1);

            postsResultsContainer.html(loadingElement);
            setTimeout(() => {
              postsResultsContainer.html("");
              renderContent(data, index + 1);
            }, 1000);
          };
        });
        /**
         * Function pagesInfo
         * @description Function that shows the number of the page that is being shown
         *              in the pagination container.
         * @param {Number} pageNumber - Number of the page to render.
         * @returns {void} - Nothing.
         */
        function pagesInfo(pageNumber) {
          PaginationInfoTop.html(
            `<p>Pagina ${pageNumber} de ${numberOfPages}</p>`
          );
        }
        pagesInfo(1);
      }

      /**
       * Render the content of the posts, it will show the title, content, tags, author, and date of the post
       * @param {Array} data The array that contains the filtered posts
       * @param {Number} pageNumber The number of the page
       */
      function renderContent(data, pageNumber) {
        const postsResultsContainer = $(".posts-results-container");

        let postLink = "";
        let postContent = "";

        data = data.slice(
          (pageNumber - 1) * searchSettings.resultsPerPage,
          pageNumber * searchSettings.resultsPerPage
        );
        $(".page-number").removeClass("page-li-focus");

        let pageNumberWithFocus = $(".page-number")[pageNumber - 1];
        $("#pagination li").find(pageNumberWithFocus).addClass("page-li-focus");

        data.map((post) => {
          const miNodo = document.createElement("div");
          miNodo.classList.add("post-searched__content");
          let $c = $("<div>").html(post.content.$t);
          if ($c.find("p.blog-post-description").text()) {
            let content = $c.find("p.blog-post-description").text();
            postContent = content;
          } else {
            let x = "Descripcion del post";
            postContent = x;
          }
          for (let j = 0; j < post.link.length; j++) {
            if (post.link[j].rel == "alternate") {
              postLink = post.link[j].href;
              break;
            }
          }
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
                    <span><b>Ultima actualizacion:</b> ${postDateUpdated}</span>
              </p>
            `;
          miNodo.innerHTML = texto_divs;

          postsResultsContainer.append(miNodo);
          return 0;
        });
      }
    },
    complete: function () {
      console.log("Done");
    },
  });
});
