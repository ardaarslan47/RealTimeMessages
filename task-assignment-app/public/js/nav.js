function confirmSubmission(event) {
  const confirmed = window.confirm("Are you sure you want to delete?");
  if (!confirmed) {
    event.preventDefault();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  function toggleDisplay(...elements) {
    elements.forEach((element) => {
      element.style.display =
        element.style.display === "block" ? "none" : "block";
    });
  }

  //   Task Add Form
  const taskAddFormButton = document.getElementById("taskAddFormButton");
  const taskAddForm = document.getElementById("taskAddForm");
  if (taskAddForm) {
    const overlay = document.getElementById("overlay");
    taskAddFormButton.addEventListener("click", () => {
      toggleDisplay(taskAddForm, overlay);

      function overlayClickListener() {
        toggleDisplay(taskAddForm, overlay);
        overlay.removeEventListener("click", overlayClickListener);
      }

      overlay.addEventListener("click", overlayClickListener);
    });
  }

  //   Edit Task Form
  const editTaskFormButton = document.getElementById("editTaskFormButton");
  const editTaskForm = document.getElementById("editTaskForm");
  if (editTaskForm) {
    editTaskFormButton.addEventListener("click", () => {
      toggleDisplay(editTaskForm, overlay);

      function overlayClickListener() {
        toggleDisplay(editTaskForm, overlay);
        overlay.removeEventListener("click", overlayClickListener);
      }

      overlay.addEventListener("click", overlayClickListener);
    });
  }

  //   create Row Form
  const createRowFormButton = document.getElementById("createRowFormButton");
  const createRowForm = document.getElementById("createRowForm");
  if (createRowForm) {
    createRowFormButton.addEventListener("click", () => {
      toggleDisplay(createRowForm, overlay);

      function overlayClickListener() {
        toggleDisplay(createRowForm, overlay);
        overlay.removeEventListener("click", overlayClickListener);
      }

      overlay.addEventListener("click", overlayClickListener);
    });
  }

  //   Edit Row Form
  const editRowFormButton = document.getElementById("editRowFormButton");
  const editRowForm = document.getElementById("editRowForm");
  if (editRowForm) {
    editRowFormButton.addEventListener("click", () => {
      toggleDisplay(editRowForm, overlay);

      function overlayClickListener() {
        toggleDisplay(editRowForm, overlay);
        overlay.removeEventListener("click", overlayClickListener);
      }

      overlay.addEventListener("click", overlayClickListener);
    });
  }

  // create content form
  const createContentFormButton = document.getElementById(
    "createContentFormButton"
  );
  const createContentForm = document.getElementById("createContentForm");
  if (createContentForm) {
    createContentFormButton.addEventListener("click", () => {
      toggleDisplay(createContentForm, overlay);

      function overlayClickListener() {
        toggleDisplay(createContentForm, overlay);
        overlay.removeEventListener("click", overlayClickListener);
      }

      overlay.addEventListener("click", overlayClickListener);
    });
  }

  // edit content form
  const editContentFormButton = document.getElementById(
    "editContentFormButton"
  );
  const editContentForm = document.getElementById("editContentForm");
  if (editContentForm) {
    editContentFormButton.addEventListener("click", () => {
      toggleDisplay(editContentForm, overlay);

      function overlayClickListener() {
        toggleDisplay(editContentForm, overlay);
        overlay.removeEventListener("click", overlayClickListener);
      }

      overlay.addEventListener("click", overlayClickListener);
    });
  }
});
