import { http } from "./http";
import { ui } from "./ui";

// Get comment on DOM load
document.addEventListener("DOMContentLoaded", getComments);

// Listen for add comment
document
  .querySelector(".comment-submit")
  .addEventListener("click", submitComment);

// Listen for delete comment
document.querySelector("#comments").addEventListener("click", deleteComment);

// Listen for edit state
document.querySelector("#comments").addEventListener("click", enableEdit);

// Listen for Cancel
document.querySelector(".card-form").addEventListener("click", cancelEdit);

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
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body
  };

  // Validate input
  if (title === "" || body === "") {
    ui.showAlert(
      "All fields are required to submit a comment!",
      "alert alert-warning"
    );
  } else {
    // Check for ID
    if (id === "") {
      // Create POST request
      http
        .post("http://localhost:3000/comments", data)
        .then(data => {
          ui.showAlert("Comment Added!", "alert alert-success");
          ui.clearFields();
          getComments();
        })
        .catch(err => console.log(err));
    } else {
      // Create PUT request
      http
        .put(`http://localhost:3000/comments/${id}`, data)
        .then(data => {
          ui.showAlert("Comment Updated!", "alert alert-success");
          ui.changeFormState("add");
          getComments();
        })
        .catch(err => console.log(err));
    }
  }
}

// DELETE request
function deleteComment(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/comments/${id}`)
        .then(data => {
          ui.showAlert("Comment successfully removed!", "alert alert-success");
          getComments();
        })
        .catch(err => console.log(err));
    }
  }
}

// PUT request
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    // Fill form with current comment
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel PUT state
function cancelEdit(e) {
  if (e.target.classList.contains("comment-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
}
