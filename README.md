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
(()=>{"use strict";var e,t={669:e=>{e.exports=jQuery}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var a=n[e]={id:e,exports:{}};return t[e](a,a.exports,o),a.exports}o.m=t,o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,n)=>(o.f[n](e,t),t)),[])),o.u=e=>e+".index.js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},o.l=(t,n,r,a)=>{if(e[t])e[t].push(n);else{var s,i;if(void 0!==r)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var p=l[c];if(p.getAttribute("src")==t){s=p;break}}s||(i=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.src=t),e[t]=[n];var u=(n,o)=>{s.onerror=s.onload=null,clearTimeout(d);var r=e[t];if(delete e[t],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((e=>e(o))),n)return n(o)},d=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),i&&document.head.appendChild(s)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=n[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={792:0};o.f.j=(t,n)=>{var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=a);var s=o.p+o.u(t),i=new Error;o.l(s,(n=>{if(o.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+a+": "+s+")",i.name="ChunkLoadError",i.type=a,i.request=s,r[1](i)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,a,[s,i,l]=n,c=0;if(s.some((t=>0!==e[t]))){for(r in i)o.o(i,r)&&(o.m[r]=i[r]);l&&l(o)}for(t&&t(n);c<s.length;c++)a=s[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),o.nc=void 0;const r={blogUrl:"",textOrImgUrl:"Texto o logo del blog",resultsPerPage:10,monthFormat:["","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"]};var a=o(669);const s=`${r.blogUrl}/feeds/posts/default/?alt=json-in-script&max-results=500`,i=a.ajax({url:s,type:"get",dataType:"jsonp",success:function(e){return e},complete:function(){}});var l=o(669);const c=l(".search-results-container");let p=l("#postsPageSearch"),u=l("#postPageSearchBtn"),d=l(".search-logo"),g=l(".posts-search-info");const m='<div class="loading">Cargando...</div>';function f(e){let t=new RegExp(/^[A-Za-z0-9\s]+$/g),n=p.val().toLowerCase();n=n.replace(/\s\s+/g,"\n"),n.trim(),n.match(t)?(c.html(m),setTimeout((()=>{d.hide(),c.html(' \n        <p class="pagination-container-info"></p>\n        <div class="posts-results-container"></div>\n        <div class="pagination-container"><ul id="pagination"></ul></div>'),function(e,t){let n=l(".pagination-container-info"),o=l("#pagination"),a=[],s=e.filter((e=>{let n=e.title.$t.toLowerCase(),o=e.content.$t.toLowerCase().replace("\n","");return a=void 0!==e.category?e.category.map((e=>e.term.toString())):["No tags found"],a=a.toString().toLowerCase(),-1!==a.indexOf(t)?a:-1!==n.indexOf(t)?n:-1!==o.indexOf(t)?o:void 0}));s.length?(g.html(`Se encontaron <b id = "nResultados">${s.length}</b> resultados para el termino de busqueda : <b>"${t}"</b>`),function(e){const t=l(".pagination-container-info"),n=l("#pagination"),o=e.length,a=Math.ceil(o/r.resultsPerPage);n.html("");for(let e=1;e<=a;e++)n.append('<li ><a href = "#" class = "page-number">'+e+"</a></li>");function s(e){t.html(`<p>Pagina ${e} de ${a}</p>`)}document.querySelectorAll(".page-number").forEach(((t,n)=>{const o=l(".posts-results-container");t.onclick=function(){s(n+1),o.html(m),setTimeout((()=>{o.html(""),h(e,n+1)}),1e3)}})),s(1)}(s),h(s,1)):(g.html(`No Se encontaron resultados para el termino de busqueda : <b>"${t}"</b>`),n.html(""),o.html(""))}(e,n)}),1e3)):(g.text("Error, No se admiten caracteres especiales como terminos de busqueda."),d.show(),c.html(""))}function h(e,t){const n=l(".posts-results-container");let o="",a="";e=e.slice((t-1)*r.resultsPerPage,t*r.resultsPerPage),l(".page-number").removeClass("page-li-focus");let s=l(".page-number")[t-1];l("#pagination li").find(s).addClass("page-li-focus"),e.map((e=>{const t=document.createElement("div");t.classList.add("post-searched__content");let s=l("<div>").html(e.content.$t);if(s.find("p.blog-post-description").text()){let e=s.find("p.blog-post-description").text();a=e}else a="Descripcion del post";for(let t=0;t<e.link.length;t++)if("alternate"==e.link[t].rel){o=e.link[t].href;break}let i=e.published.$t,c=i.substring(0,4),p=i.substring(5,7),u=i.substring(8,10),d=r.monthFormat[parseInt(p,10)]+" "+u+", "+c,g=e.updated.$t,m=g.substring(0,4),f=g.substring(5,7),h=g.substring(8,10),b=r.monthFormat[parseInt(f,10)]+" "+h+", "+m;const v=`\n    <a target ="_blank" class = "post-content__url" href = "${o}"><p>${e.title.$t}</p></a>\n      <p class="post-content__info">\n                <span class ="post-date" >${d}</span> - ${a.slice(0,200)}${a.length>200?"...":""} \n              </p>\n              <p class="post-content-tags">${void 0!==e.category?e.category.map((e=>`<span class= "tag-text">${e.term}</span>`)).join(""):'<span class= "tag-text">No tags found</span>'}</p>\n              <p class="post-content__ad">\n                  <span><b>Autor:</b> ${e.author[0].name.$t}</span> |\n                  <span><b>Ultima actualización:</b> ${b}</span>\n            </p>`;return t.innerHTML=v,n.append(t),0}))}var b=o(669);o.e(511).then(o.bind(o,511)),b((function(){b("#logo").html(r.textOrImgUrl.match("^https?://")?`<img src="${r.textOrImgUrl}" alt="Logo del blog">`:`<p>${r.textOrImgUrl}</p>`),i.done().then((e=>{!function(e){p.on("keydown",(function(t){"Enter"===t.key&&f(e)})),u.on("click",(function(){f(e)}))}(e.feed.entry)}))}))})();
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


