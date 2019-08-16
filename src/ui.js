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

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
}

export const ui = new UI();
