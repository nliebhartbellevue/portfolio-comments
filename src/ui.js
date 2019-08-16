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
}

export const ui = new UI();
