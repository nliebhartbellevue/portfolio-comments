import { http } from "./http";
import { ui } from "./ui";

// Get comment on DOM load
document.addEventListener("DOMContentLoaded", getComments);

function getComments() {
  http
    .get("http://localhost:3000/comments")
    .then(data => ui.showComments(data))
    .catch(err => console.log(err));
}
