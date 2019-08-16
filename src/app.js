import { http } from "./http";
import { ui } from "./ui";

// Get comment on DOM load
document.addEventListener("DOMContentLoaded", getComments);

// Listen for add comment
document
  .querySelector(".comment-submit")
  .addEventListener("click", submitComment);

// GET comments
function getComments() {
  http
    .get("http://localhost:3000/comments")
    .then(data => ui.showComments(data))
    .catch(err => console.log(err));
}

// POST comment
function submitComment() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  const data = {
    title,
    body
  };

  // Create POST request
  http
    .post("http://localhost:3000/comments", data)
    .then(data => {
      ui.showAlert("Comment Added!", "alert alert-success");
      ui.clearFields();
      getComments();
    })
    .catch(err => console.log(err));
}
