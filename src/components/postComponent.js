import { searchSettings } from "../config/searchSettings";

/**
 * Function to create a post component.
 * @param {Object} post - The post object to use to create the component.
 * @returns {HTMLElement} The post component element.
 * @example
 * const post = {
 *   title: "Post title",
 *   content: "Post content",
 *   link: [
 *     {href: "https://example.com", rel: "alternate"},
 *     {href: "https://example.com", rel: "canonical"}
 *   ],
 *   author: [
 *     {name: "Author name"}
 *   ],
 *   category: [
 *     {term: "Category term"}
 *   ],
 *   published: "2022-01-01T12:00:00Z",
 *   updated: "2022-01-01T12:00:00Z"
 * };
 * const postComponent = postComponent(post);
 * document.body.append(postComponent);
 */
const postComponent = (post) => {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-searched__content");

  let postLink = "";
  let postContent = "";

  // Get the post's content and extract the description text
  let $c = $("<div>").html(post.content.$t);
  if ($c.find("p.blog-post-description").text()) {
    let content = $c.find("p.blog-post-description").text();
    postContent = content;
  } else {
    // If no description text is found, use a default text
    let x = "Descripcion del post";
    postContent = x;
  }

  // Loop through each link in the post and find the link with the "alternate"
  // rel value
  for (let j = 0; j < post.link.length; j++) {
    if (post.link[j].rel == "alternate") {
      postLink = post.link[j].href;
      break;
    }
  }

  // Format the post's date and update date
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

  // Create a string of HTML content for the post
  const texto_divs = `
    <a target ="_blank" class = "post-content__url" href = "${postLink}"><p>${
    post.title.$t
  }</p></a>
      <p class="post-content__info">
                <span class ="post-date" >${postDatePublished}</span> - ${postContent.slice(
    0,
    200
  )}${postContent.length > 200 ? "..." : ""} 
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
  postContainer.innerHTML = texto_divs;

  return postContainer;
};

export default postComponent;
