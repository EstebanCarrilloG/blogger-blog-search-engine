//import("./style.css"); //uncomment this line on development mode
import { data } from "./modules/apiConnection.js";
import { searchSettings } from "./modules/searchSettings.js";
import mainFunction from "./modules/mainFunction.js";

$(function () {
  //Add logo or text to the page
  $("#logo").html(
    searchSettings.textOrImgUrl.match("^https?://")
      ? `<img src="${searchSettings.textOrImgUrl}" alt="Logo del blog">` //
      : `<p>${searchSettings.textOrImgUrl}</p>`
  );

  data.done().then((data) => {
    mainFunction(data.feed.entry);
  });
});
