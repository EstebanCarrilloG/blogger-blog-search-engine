Motor de búsqueda para blogs de Blogger
=====================================

Previsualizacion:
-----------------

![](./public/preview.png)

Pueden ver el codigo mejor documentado y estructurado [aqui](https://github.com/EstebanCarrilloG/blogger-blog-search-engine/tree/2024-update)

Descripción:
------------

Este buscador se utiliza para encontrar publicaciones de nuestro blog de Blogger, relacionadas con el término de búsqueda introducido. Podemos utilizarlo dentro del blog de Blogger o en una página web externa.

Tecnologías utilizada:
----------------------

*   HTML
*   CSS
*   JavaScript - jQuery
*   Webpack

Como usarlo:
------------

1.  Crea una nueva página en tu blog de blogger. 
![](./public/crear-nueva-pagina.png)
2.  Pega los siguientes códigos en tu pagina de blogger.
* Codigo CSS:
Código obtenido del archivo [./src/style.min.css](./src/style.min.css).
```html
<style type = "text/css">
.loading,.posts-search-info,.search-logo{text-align:center!important}.posts-results-container,.posts-search-container{display:flex!important;min-height:100vh!important}:root{--negro:#393939;--tipo-principal:Helvetica,Arial,sans-serif;--tipo-secundaria:Verdana;--max-width-container:73.125rem;--width-container:95%;--color-primario:#313234;--color-titulos:#313234;--color-secundario:#ff1a00;--color-terciario:#999999;--color-white:white;--color-de-fondo:white;--color-texto-p:#5e5e5e;--bg-navChildren:#fb4834b0}*{margin:0;padding:0;box-sizing:border-box;word-wrap:break-word}body{font-family:var(--tipo-principal)!important}.page-number,.post-content__ad,.post-content__info,a.post-content__url{text-decoration:none!important}.posts-search-container{padding:5rem 0!important;gap:1rem!important;flex-direction:column!important;align-items:center!important;justify-content:center!important}.container{max-width:90%!important;margin:0 auto!important}.search-logo{margin-bottom:3rem!important;width:100%!important;height:max-content;font-size:4rem!important}.search-logo img{width:40%!important}.search-input-container{display:flex!important;align-items:center!important;gap:.2rem!important;justify-content:center!important;border:.125rem solid var(--color-terciario)!important;border-radius:1.875rem!important;transition:box-shadow 180ms ease-in-out!important;margin-bottom:.5rem!important;min-width:50%!important;max-width:90%!important;padding:1rem 2rem!important}.search-input-container input{font-size:1.5rem!important;font-family:inherit!important;background-color:#fff!important;border:none!important;color:var(--color-primario)!important;width:100%!important}.search-input-container input:focus{outline:0!important}.search-results-container{width:100%!important}.loading{font-size:2rem!important}.pagination-container,.pagination-container-info{display:flex!important;justify-content:center!important}span#postPageSearchBtn{cursor:pointer!important;padding:.5rem!important}.posts-search-info{padding:1.8rem 2rem!important}.posts-results-container{flex-direction:column!important;gap:2rem!important}.post-searched__content{display:grid!important;gap:.5rem!important}.post-content-tags,ul#pagination{display:flex!important;gap:.5rem!important}.post-searched__content a{color:var(--color-titulos)!important}a.post-content__url p{font-weight:700!important;font-size:1.7rem!important;line-height:2rem!important;margin-bottom:initial!important}.post-content-tags,.post-date{color:#a3a3a3!important}.post-content-tags{flex-wrap:wrap!important}.tag-text{border:.06rem solid!important;padding:.2rem .5rem!important}a.post-content__url:hover{color:var(--color-texto-p)!important;text-decoration:underline!important}.post-content__info{padding-left:1rem!important}.pagination-container-info p{border:.125rem solid var(--color-terciario)!important;padding:.5rem 1rem!important;margin-bottom:2rem!important}ul#pagination{list-style:none!important;row-gap:1.5rem!important;flex-wrap:wrap!important;margin-top:3rem!important;justify-content:center!important;align-items:center!important}ul#pagination li:before{content:""!important}.page-number{color:#fff!important;background-color:var(--color-terciario)!important;padding:.5rem 1rem!important}.page-li-focus{background:var(--color-secundario)!important}@media screen and (max-width:768px){.search-logo img{width:70%!important}.search-input-container{width:90%!important}.search-logo{margin-bottom:1rem!important}}@media screen and (min-width:768px) and (max-width:1024px){.search-logo img{width:50%!important}.search-input-container{width:80%!important}.search-logo{margin-bottom:2rem!important}}
</style>
```
* Código HTML:
Código obtenido del archivo [./src/index.html](./src/index.html).
```html
<div class="posts-search-container container">
  <div class="search-logo" id="logo"></div>
  <div class="search-input-container">
    <input
      type="text"
      name=""
      id="postsPageSearch"
      placeholder="Ingrese el termino de busqueda."
    /><span id="postPageSearchBtn" class="fas fa-search"></span>
  </div>
  <p class="posts-search-info"></p>
  <div class="search-results-container"></div>
</div>
```
* Código JavaScript:
Código obtenido del archivo [./dist/index.js](./dist/index.js).
```html
<script type = "text/javascript">
(()=>{"use strict";var t={669:t=>{t.exports=jQuery}},e={};function n(o){var s=e[o];if(void 0!==s)return s.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,n),a.exports}const o={blogUrl:"",textOrImgUrl:"Texto o logo del blog",resultsPerPage:10,monthFormat:["","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"]};var s=n(669);const a=`${o.blogUrl}/feeds/posts/default/?alt=json-in-script&max-results=500`,r=s.ajax({url:a,type:"get",dataType:"jsonp",success:function(t){return t},complete:function(){}});var i=n(669);const l=i(".search-results-container");let c=i("#postsPageSearch"),p=i("#postPageSearchBtn"),u=i(".search-logo"),g=i(".posts-search-info");const d='<div class="loading">Cargando...</div>';function m(t){let e=new RegExp(/^[A-Za-z0-9\s]+$/g),n=c.val().toLowerCase();n=n.replace(/\s\s+/g,"\n"),n.trim(),n.match(e)?(l.html(d),setTimeout((()=>{u.hide(),l.html(' \n        <p class="pagination-container-info"></p>\n        <div class="posts-results-container"></div>\n        <div class="pagination-container"><ul id="pagination"></ul></div>'),function(t,e){let n=i(".pagination-container-info"),s=i("#pagination"),a=[],r=t.filter((t=>{let n=t.title.$t.toLowerCase(),o=t.content.$t.toLowerCase().replace("\n","");return a=void 0!==t.category?t.category.map((t=>t.term.toString())):["No tags found"],a=a.toString().toLowerCase(),-1!==a.indexOf(e)?a:-1!==n.indexOf(e)?n:-1!==o.indexOf(e)?o:void 0}));r.length?(g.html(`Se encontaron <b id = "nResultados">${r.length}</b> resultados para el termino de busqueda : <b>"${e}"</b>`),function(t){const e=i(".pagination-container-info"),n=i("#pagination"),s=t.length,a=Math.ceil(s/o.resultsPerPage);n.html("");for(let t=1;t<=a;t++)n.append('<li ><a href = "#" class = "page-number">'+t+"</a></li>");function r(t){e.html(`<p>Pagina ${t} de ${a}</p>`)}document.querySelectorAll(".page-number").forEach(((e,n)=>{const o=i(".posts-results-container");e.onclick=function(){r(n+1),o.html(d),setTimeout((()=>{o.html(""),f(t,n+1)}),1e3)}})),r(1)}(r),f(r,1)):(g.html(`No Se encontaron resultados para el termino de busqueda : <b>"${e}"</b>`),n.html(""),s.html(""))}(t,n)}),1e3)):(g.text("Error, No se admiten caracteres especiales como terminos de busqueda."),u.show(),l.html(""))}function f(t,e){const n=i(".posts-results-container");let s="",a="";t=t.slice((e-1)*o.resultsPerPage,e*o.resultsPerPage),i(".page-number").removeClass("page-li-focus");let r=i(".page-number")[e-1];i("#pagination li").find(r).addClass("page-li-focus"),t.map((t=>{const e=document.createElement("div");e.classList.add("post-searched__content");let r=i("<div>").html(t.content.$t);if(r.find("p.blog-post-description").text()){let t=r.find("p.blog-post-description").text();a=t}else a="Descripcion del post";for(let e=0;e<t.link.length;e++)if("alternate"==t.link[e].rel){s=t.link[e].href;break}let l=t.published.$t,c=l.substring(0,4),p=l.substring(5,7),u=l.substring(8,10),g=o.monthFormat[parseInt(p,10)]+" "+u+", "+c,d=t.updated.$t,m=d.substring(0,4),f=d.substring(5,7),h=d.substring(8,10),b=o.monthFormat[parseInt(f,10)]+" "+h+", "+m;const $=`\n    <a target ="_blank" class = "post-content__url" href = "${s}"><p>${t.title.$t}</p></a>\n      <p class="post-content__info">\n                <span class ="post-date" >${g}</span> - ${a.slice(0,200)}${a.length>200?"...":""} \n              </p>\n              <p class="post-content-tags">${void 0!==t.category?t.category.map((t=>`<span class= "tag-text">${t.term}</span>`)).join(""):'<span class= "tag-text">No tags found</span>'}</p>\n              <p class="post-content__ad">\n                  <span><b>Autor:</b> ${t.author[0].name.$t}</span> |\n                  <span><b>Ultima actualización:</b> ${b}</span>\n            </p>`;return e.innerHTML=$,n.append(e),0}))}var h=n(669);h((function(){h("#logo").html(o.textOrImgUrl.match("^https?://")?`<img src="${o.textOrImgUrl}" alt="Logo del blog">`:`<p>${o.textOrImgUrl}</p>`),r.done().then((t=>{!function(t){c.on("keydown",(function(e){"Enter"===e.key&&m(t)})),p.on("click",(function(){m(t)}))}(t.feed.entry)}))}))})();
</script>  
```
* Debe quedar así:
![image](./public/orden-del-codigo.png)

Para modificar el texto de la página inicial o cambiarlo por una imagen:
![image](./public/modificar-texto-img.png) 

 buscamos la propiedad: <span style="color:orange; font-weight:bold">textOrImgUrl</span> y modificar su <span style="color:green; font-weight:bold">valor</span> el cual puede ser un texto o una imagen.
![imagen](./public/text-or-img.png)

Ejemplo:
* Usando texto:
```javascript	
textOrImgUrl:"EDEPTEC"
```
![imagen](./public/with-text-example.png)
* Usando imagen:
```javascript
textOrImgUrl:"https://www.example.com/example.png"
```
![imagen](./public/with-image-example.png)

Aclaraciones:
----------------------
Como en estamos usando el buscador en blogger no es necesario modificar el valor de la propiedad blogUrl. 
![imagen](./public/blogUrl-not-modified.png)
Si vamos a utilizar el buscador en una pagina web diferente, si es necesario ingresar la url de nuestro blog en la propiedad blogUrl.


