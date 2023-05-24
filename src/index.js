//import('./style.css');

$(document).ready(function () {

    var frlSP = `https://www.edeptec.com/feeds/posts/default/?alt=json-in-script&max-results=500`
var month_format = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const DOMitems = $('.post-searched__container');
    let postsPageSearch = $("#postsPageSearch");
    let postPageSearchBtn = $("#postPageSearchBtn");
    let textoDeBusqueda = $(".searchText");
    let searchInputTitle = $(".search-input__logo");
    let numeroDePaginaTop = $(".pagination-container.top-1");
    let pagination = $("#pagination");
    let linkAlPost = "";
    let svg_edeptec = $(".header-logo a").html();

    let re = new RegExp(/^[A-Za-z0-9\s]+$/g);
    searchInputTitle.html(svg_edeptec);

    $.ajax({
        url: frlSP,
        type: 'get',
        dataType: "jsonp",
        success: function (e) {
            postsPageSearch.keydown(function (enterKey) {
                if (enterKey.keyCode === 13) {
                    buscarDb();
                }
            });
            postPageSearchBtn.click(function () {
                buscarDb();
            })

            function buscarDb() {
                let text = postsPageSearch.val().toLowerCase();
                text = text.replace(/\s\s+/g, '\n');
                text.trim();
                if (!text.match(re)) {
                    textoDeBusqueda.text("Error, ingrese un termino de busqueda con numeros o letras.");
                    searchInputTitle.show();
                    numeroDePaginaTop.html("");
                    DOMitems.html("");
                    pagination.html("");
                } else {
                    searchInputTitle.hide();
                    renderizarProductos(e, text);
                }
            }

            function renderizarProductos(e, text) {
                DOMitems.html("");
                let tagsArray = [];
                let tagsString;
                let titleSearchEdeptec = e.feed.entry.filter((catTerm) => {
                    let postsTitleS = catTerm.title.$t.toLowerCase();
                    let postsContentS = catTerm.content.$t.toLowerCase();
                    let postsContentSinEspacios = postsContentS.replace("\n", "")
                    tagsArray.push(catTerm.category.map((postsTerms) => {
                        return postsTerms.term;
                    }));
                    for (let kk = 0; kk < tagsArray.length; kk++) {
                        tagsString = tagsArray[kk].toString();
                    }
                    let tagsText = tagsString.toLowerCase();
                    if (tagsText.indexOf(text) !== -1) {
                        return tagsText.indexOf(text) !== -1;
                    }
                    if (postsTitleS.indexOf(text) !== -1) {
                        return postsTitleS;
                    }
                    if (postsContentSinEspacios.indexOf(text) !== -1) {
                        return postsContentSinEspacios;
                    }
                });
                if (titleSearchEdeptec.length) {
                    textoDeBusqueda.html(`Se encontaron <b id = "nResultados"></b> resultados para el termino de busqueda : <b>"${text}"</b>`);
                    let numeroDeResultados = $('#nResultados')
                    numeroDeResultados.text(titleSearchEdeptec.length);
                    nbd(titleSearchEdeptec);
                    showDbContent(titleSearchEdeptec, 1);
                } else {
                    textoDeBusqueda.html(`No Se encontaron resultados para el termino de busqueda : <b>"${text}"</b>`);
                    numeroDePaginaTop.html("");
                    pagination.html("");
                }
            }
            let productosPorPagina = 10;

            function nbd(baseDeDatos) {
                let numeroTotalDeProductos = baseDeDatos.length;
                let pageCont = Math.ceil(numeroTotalDeProductos / productosPorPagina);
                pagination.html("");
                for (let i = 1; i <= pageCont; i++) {
                    pagination.append('<li ><a href = "#" name = "popo" class = "page-number">' + i + '</a></li>');
                }

                let p_number = document.querySelectorAll(".page-number");
                p_number.forEach((p_n, index) => {
                    p_n.onclick = function () {
                        mostrarNumDePaginas(index + 1);
                        DOMitems.html("");
                        showDbContent(baseDeDatos, index + 1)
                    }
                });
                mostrarNumDePaginas(1);

                function mostrarNumDePaginas(p_n) {
                    numeroDePaginaTop.html(`<p id = "numero-pagina">Pagina ${p_n} de ${pageCont}</p>`);
                }
            }

            function showDbContent(e, numero) {
                let r = numero - 1;
                let ct = "";
                e = e.slice((numero - 1) * productosPorPagina, numero * productosPorPagina);
                let pageFocus = $(".page-number");
                pageFocus.addClass("page-li__focus");
                let item1 = $(".page-number")[r];
                $("#pagination li").find(item1).removeClass("page-li__focus");
                e.map((info) => {
                    const miNodo = document.createElement('div');
                    miNodo.classList.add('post-searched__content');
                    let $c = $('<div>').html(info.content.$t);
                    if ($c.find('p#descripcionDelPost').text()) {
                        let content = $c.find('p#descripcionDelPost').text();
                        ct = content;
                    } else {
                        let x = "EDEPTEC: Proyectos electrónicos con micro-controladores, compuertas lógicas. Aplicaciones creadas en App Inventor, simulaciones en Cade Simu, creaciones DIY muchas cosas mas."
                        ct = x;
                    }
                    for (let j = 0; j < info.link.length; j++) {
                        if (info.link[j].rel == "alternate") {
                            linkAlPost = info.link[j].href;
                            break
                        }
                    }
                    let datePublish = info.published.$t,
                        tPublish = datePublish.substring(0, 4),
                        wPublish = datePublish.substring(5, 7),
                        fPublish = datePublish.substring(8, 10),
                        rPublish = month_format[parseInt(wPublish, 10)] + ' ' + fPublish + ', ' + tPublish;
                    let dateUpdate = info.updated.$t,
                        tUpdate = dateUpdate.substring(0, 4),
                        wUpdate = dateUpdate.substring(5, 7),
                        fUpdate = dateUpdate.substring(8, 10),
                        rUpdate = month_format[parseInt(wUpdate, 10)] + ' ' + fUpdate + ', ' + tUpdate;
                    const texto_divs = `
      <a class = "post-content__url" href = "${linkAlPost}"><p>${info.title.$t}</p></a>
        <div class="post-content__info">
                  <p>${ct}</p>
                </div>
                <div class="post-content__ad">
                    <span><b>Autor:</b> ${info.author[0].name.$t}</span>|
                    <span><b>Fecha de publicación:</b> ${rPublish}</span>|
                    <span><b>Ultima actualización:</b> ${rUpdate}</span>
              </div>`
                    miNodo.innerHTML = texto_divs;

                    DOMitems.append(miNodo);

                });
            }
        }
    });

});