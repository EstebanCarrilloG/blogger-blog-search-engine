import("./style.css");

$(document).ready(function () {
  const blogUrl = `https://www.edeptec.com/feeds/posts/default/?alt=json-in-script&max-results=500`;
  let month_format = [
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
  ];

  const DOMitems = $(".post-searched__container");
  let postsPageSearch = $("#postsPageSearch");
  let postPageSearchBtn = $("#postPageSearchBtn");
  let textoDeBusqueda = $(".searchText");
  let searchInputTitle = $(".search-input__logo");
  let PaginationInfoTop = $(".pagination-container.top-1");
  let paginationContainer = $("#pagination");
  let svg_edeptec = $(".header-logo a").html();

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
          textoDeBusqueda.text(
            "Error, ingrese un termino de busqueda con numeros o letras."
          );
          searchInputTitle.show();
          PaginationInfoTop.html("");
          DOMitems.html("");
          paginationContainer.html("");
        } else {
          searchInputTitle.hide();
          DOMitems.text("Cargando...");
          setTimeout(() => {
            dbFiltering(dataBase, text);
          }, 1000);
        }
      }

      function dbFiltering(dataBase, text) {
        DOMitems.html("");
        let tagsArray = [];
        let tagsString = "";

        let filteredResults = dataBase.feed.entry.filter((posts) => {
          let postsTitle = posts.title.$t.toLowerCase();
          let postsContent = posts.content.$t.toLowerCase();
          let postContentWithoutSpaces = postsContent.replace("\n", "");
          tagsArray.push(
            ...posts.category.map((postsTerms) => {
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
          textoDeBusqueda.html(
            `Se encontaron <b id = "nResultados">${filteredResults.length}</b> resultados para el termino de busqueda : <b>"${text}"</b>`
          );

          setPagination(filteredResults);
          showDbContent(filteredResults, 1);
        } else {
          textoDeBusqueda.html(
            `No Se encontaron resultados para el termino de busqueda : <b>"${text}"</b>`
          );
          PaginationInfoTop.html("");
          paginationContainer.html("");
        }
      }
      let postsPerPage = 10;

      function setPagination(dataBase) {
        let totalPostsNumber = dataBase.length;
        let numberOfPages = Math.ceil(totalPostsNumber / postsPerPage);
        paginationContainer.html("");
        for (let i = 1; i <= numberOfPages; i++) {
          paginationContainer.append(
            '<li ><a href = "#" class = "page-number">' + i + "</a></li>"
          );
        }

        document.querySelectorAll(".page-number").forEach((e, index) => {
          e.onclick = function () {
            mostrarNumDePaginas(index + 1);

            DOMitems.text("Cargando...");
            setTimeout(() => {
              DOMitems.html("");
              showDbContent(dataBase, index + 1);
            }, 1000);
          };
        });
        mostrarNumDePaginas(1);

        function mostrarNumDePaginas(pageNumber) {
          PaginationInfoTop.html(
            `<p id = "numero-pagina">Pagina ${pageNumber} de ${numberOfPages}</p>`
          );
        }
      }

      function showDbContent(dataBase, pageNumber) {
        let linkAlPost = "";
        let postContent = "";
        let r = pageNumber - 1;
        dataBase = dataBase.slice(
          (pageNumber - 1) * postsPerPage,
          pageNumber * postsPerPage
        );
        $(".page-number").removeClass("page-li__focus");

        let pageNumberWithFocus = $(".page-number")[r];
        $("#pagination li")
          .find(pageNumberWithFocus)
          .addClass("page-li__focus");
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
              month_format[parseInt(wPublish, 10)] +
              " " +
              fPublish +
              ", " +
              tPublish;
          let dateUpdate = post.updated.$t,
            tUpdate = dateUpdate.substring(0, 4),
            wUpdate = dateUpdate.substring(5, 7),
            fUpdate = dateUpdate.substring(8, 10),
            postDateUpdated =
              month_format[parseInt(wUpdate, 10)] +
              " " +
              fUpdate +
              ", " +
              tUpdate;
          const texto_divs = `
      <a class = "post-content__url" href = "${linkAlPost}"><p>${post.title.$t}</p></a>
        <div class="post-content__info">
                  <p>${postContent}</p>
                </div>
                <div class="post-content__ad">
                    <span><b>Autor:</b> ${post.author[0].name.$t}</span>|
                    <span><b>Fecha de publicación:</b> ${postDatePublished}</span>|
                    <span><b>Ultima actualización:</b> ${postDateUpdated}</span>
              </div>`;
          miNodo.innerHTML = texto_divs;

          DOMitems.append(miNodo);
        });
      }
    },
    complete: function () {
      console.log("Done");
    },
  });
});
