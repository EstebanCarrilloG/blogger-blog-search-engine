import("./style.css");

$(function() {
  const searchSettings = {
    textOrImgUrl:"https://blogger.googleusercontent.com/img/a/AVvXsEhN2fKgWugf8DjSYlKOil5B3_VvaVdSVAYDcxQwUKth65PYPYYaum9P06ecaJzkR8RmBtVdLFGZHDCO2qzGOv8V9FAj0qNk6fsI3-nlic6UI_v_dQOgrgKohoTUqIl7gnzNCTX1i0cBB9Ii_Pq9-eUs5YQY_1Tpwbk9_-zuVC4chjBqkQPj6fX_BvLfb9Q=s1103",
    resultsPerPage: 10,
    blogUrl: "",
    monthFormat: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const logo = $("#logo")

  logo.html(searchSettings.textOrImgUrl.match("https://")? `<img src="${searchSettings.textOrImgUrl}" alt="Logo del blog">`: `<p>${searchSettings.textOrImgUrl}</p>`)

  const url = `${searchSettings.blogUrl}/feeds/posts/default/?alt=json-in-script&max-results=500`;

  const DOMitems = $(".search-results-container");
  let postsPageSearch = $("#postsPageSearch");
  let postPageSearchBtn = $("#postPageSearchBtn");
  let searchInputTitle = $(".search-logo");
  let searchInfo = $(".posts-search-info");
  const loadingElement = `<div class="loading">Cargando...</div>`;

  $.ajax({
    url: url,
    type: "get",
    dataType: "jsonp",
    success: function (dataBase) {
      postsPageSearch.keydown(function (Key) {
        if (Key.keyCode === 13) {
          textValidation(dataBase);
        }
      });
      postPageSearchBtn.click(function () {
        textValidation(dataBase);
      });

      function textValidation(dataBase) {
        let re = new RegExp(/^[A-Za-z0-9\s]+$/g);
        let text = postsPageSearch.val().toLowerCase();
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
            dataBaseFiltering(dataBase, text);
          }, 1000);
        }
      }

      function dataBaseFiltering(dataBase, text) {
        let PaginationInfoTop = $(".pagination-container-info");
        let paginationContainer = $("#pagination");
        let tagsArray = [];

        let filteredResults = dataBase.feed.entry.filter((posts) => {
          let postsTitle = posts.title.$t.toLowerCase();
          let postsContent = posts.content.$t.toLowerCase().replace("\n", "");

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

      function setPagination(dataBase) {
        let PaginationInfoTop = $(".pagination-container-info");
        let paginationContainer = $("#pagination");

        let totalPostsNumber = dataBase.length;
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
            mostrarNumDePaginas(index + 1);

            postsResultsContainer.html(loadingElement);
            setTimeout(() => {
              postsResultsContainer.html("");
              renderContent(dataBase, index + 1);
            }, 1000);
          };
        });
        mostrarNumDePaginas(1);

        function mostrarNumDePaginas(pageNumber) {
          PaginationInfoTop.html(
            `<p>Pagina ${pageNumber} de ${numberOfPages}</p>`
          );
        }
      }

      function renderContent(dataBase, pageNumber) {
        const postsResultsContainer = $(".posts-results-container");

        let postLink = "";
        let postContent = "";

        dataBase = dataBase.slice(
          (pageNumber - 1) * searchSettings.resultsPerPage,
          pageNumber * searchSettings.resultsPerPage
        );
        $(".page-number").removeClass("page-li-focus");

        let pageNumberWithFocus = $(".page-number")[pageNumber - 1];
        $("#pagination li").find(pageNumberWithFocus).addClass("page-li-focus");

        dataBase.map((post) => {
          const miNodo = document.createElement("div");
          miNodo.classList.add("post-searched__content");
          let $c = $("<div>").html(post.content.$t);
          if ($c.find("p#descripcionDelPost").text()) {
            let content = $c.find("p#descripcionDelPost").text();
            postContent = content;
          } else {
            let x =
              "EDEPTEC: Proyectos electrónicos con micro-controladores, compuertas lógicas. Aplicaciones creadas en App Inventor, simulaciones en Cade Simu, creaciones DIY muchas cosas mas.";
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
                    <span><b>Ultima actualización:</b> ${postDateUpdated}</span>
              </p>`;
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
