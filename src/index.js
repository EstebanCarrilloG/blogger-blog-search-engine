import("./style.css");

$(document).ready(function () {
  const searchSettings = {
    resultsPerPage: 10,
    blogUrl: "https://www.edeptec.com",
    monthFormat: [
      ,
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

  const blogUrl = `${searchSettings.blogUrl}/feeds/posts/default/?alt=json-in-script&max-results=500`;

  const DOMitems = $(".search-results-container");
  let postsPageSearch = $("#postsPageSearch");
  let postPageSearchBtn = $("#postPageSearchBtn");
  let searchInputTitle = $(".search-logo");
  let searchInfo = $(".posts-search-info");

  $.ajax({
    url: blogUrl,
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
        if (!text.match(re)) {
          searchInfo.text(
            "Error, No se admiten caracteres especiales como terminos de busqueda."
          );
          searchInputTitle.show();
          DOMitems.html("");
        } else {
          DOMitems.text("Cargando...");
          setTimeout(() => {
            searchInputTitle.hide();
            DOMitems.html(`
            
      <p class="pagination-container-info"></p>
      <div class="posts-results-container"></div>
      <div class="pagination-container"><ul id="pagination"></ul></div>
            `);
            dbFiltering(dataBase, text);
          }, 1000);
        }
      }

      function dbFiltering(dataBase, text) {
        let PaginationInfoTop = $(".pagination-container-info");
        let paginationContainer = $("#pagination");
        let tagsArray = [];
        let tagsString = "";

        let filteredResults = dataBase.feed.entry.filter((posts) => {
          let postsTitle = posts.title.$t.toLowerCase();
          let postsContent = posts.content.$t.toLowerCase();
          let postContentWithoutSpaces = postsContent.replace("\n", "");
          tagsArray.push(
            posts.category.map((postsTerms) => {
              return postsTerms.term;
            })
          );

          for (let i = 0; i < tagsArray.length; i++) {
            tagsString = tagsArray[i].toString();
          }
          let tagsText = tagsString.toLowerCase();

          if (tagsText.indexOf(text) !== -1) {
            return tagsText.indexOf(text) !== -1;
          }
          if (postsTitle.indexOf(text) !== -1) {
            return postsTitle;
          }
          if (postContentWithoutSpaces.indexOf(text) !== -1) {
            return postContentWithoutSpaces;
          }
        });

        if (filteredResults.length) {
          searchInfo.html(
            `Se encontaron <b id = "nResultados">${filteredResults.length}</b> resultados para el termino de busqueda : <b>"${text}"</b>`
          );

          setPagination(filteredResults);
          showDbContent(filteredResults, 1);
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

            postsResultsContainer.text("Cargando...");
            setTimeout(() => {
              postsResultsContainer.html("");
              showDbContent(dataBase, index + 1);
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

      function showDbContent(dataBase, pageNumber) {
        const postsResultsContainer = $(".posts-results-container");

        let linkAlPost = "";
        let postContent = "";
        let r = pageNumber - 1;
        dataBase = dataBase.slice(
          (pageNumber - 1) * searchSettings.resultsPerPage,
          pageNumber * searchSettings.resultsPerPage
        );
        $(".page-number").removeClass("page-li-focus");

        let pageNumberWithFocus = $(".page-number")[r];
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
              linkAlPost = post.link[j].href;
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
      <a targer ="_blank" class = "post-content__url" href = "${linkAlPost}"><p>${
            post.title.$t
          }</p></a>
        <p class="post-content__info">
                  <span class ="post-date" >${postDatePublished}</span> - ${postContent}
                </p>
                <p class="post-content-tags">${post.category
                  .map((e) => `<span class= "tag-text">${e.term}</span>`)
                  .join("")}</p>
                
                <p class="post-content__ad">
                    <span><b>Autor:</b> ${post.author[0].name.$t}</span> |
                    <span><b>Ultima actualización:</b> ${postDateUpdated}</span>
              </p>`;
          miNodo.innerHTML = texto_divs;

          postsResultsContainer.append(miNodo);
        });
      }
    },
    complete: function () {
      console.log("Done");
    },
  });
});
