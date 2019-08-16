class UI {
  constructor() {
    this.comment = document.querySelector("#comments");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.commentSubmit = document.querySelector(".comment-submit");
    this.formState = "add";
  }

  showComments(comments) {
    let output = "";

    comments.forEach(comment => {
      output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${comment.title}</h4>
                    <p class="card-text">${comment.body}</p>
                    <a href="#" class="edit card-link" data-id="${comment.id}">
                        <i class="fas fa-pencil-alt"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${
                      comment.id
                    }">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>
        `;
    });

    this.comment.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    // Create alert div
    const div = document.createElement("div");
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".commentsContainer");
    // Get comments
    const comments = document.querySelector("#comments");
    // Insert alert div
    container.insertBefore(div, comments);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear form
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // Clear ID input
  clearIdInput() {
    this.idInput.value = "";
  }

  // Change form state
  changeFormState(type) {
    if (type === "edit") {
      this.commentSubmit.textContent = "Update Comment";
      this.commentSubmit.className = "comment-submit btn btn-info btn-block";

      // Create Cancel button
      const button = document.createElement("button");
      button.className = "comment-cancel btn btn-warning btn-block";
      button.appendChild(document.createTextNode("Cancel"));

      // Get parent
      const cardForm = document.querySelector(".card-form");
      // Get element to insert before
      const formEnd = document.querySelector(".form-end");
      // Insert Cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.commentSubmit.textContent = "Post";
      this.commentSubmit.className = "comment-submit btn btn-primary btn-block";
      // Remove cancel button if it is there
      if (document.querySelector(".comment-cancel")) {
        document.querySelector(".comment-cancel").remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();
