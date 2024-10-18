const blogUrl = ""; // Url del blog ej https://blogDeejemplo.blogger.com
const url = `${blogUrl}/feeds/posts/default/?alt=json-in-script&max-results=500`;

export const data = $.ajax({
  url: url,
  type: "get",
  dataType: "jsonp",
  success: function (data) {
    return data;
  },
  complete: function () {
    console.log("Done");
  },
});
