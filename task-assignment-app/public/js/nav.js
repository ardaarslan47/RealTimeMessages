const colors = [
  { main: "#fdd85d", darker: "#c9ac4b" },
  { main: "#0096C7", darker: "#006f94" },
  { main: "#ff87ab", darker: "#cc6c89" },
  { main: "#f28f3b", darker: "#bf722e" },
  { main: "#b7e4c7", darker: "#8db099" },
  { main: "#48CAE4", darker: "#389cb0" },
];
function setColor(i) {}

function toggleDisplay(...elements) {
  elements.forEach((element) => {
    element.style.display =
      element.style.display === "block" ? "none" : "block";
  });
}

function createContent(id) {
  const createContentForm = document.getElementById("create" + id);
  toggleDisplay(createContentForm, overlay);

  function overlayClickListener() {
    toggleDisplay(createContentForm, overlay);
    overlay.removeEventListener("click", overlayClickListener);
  }

  overlay.addEventListener("click", overlayClickListener);
}

function editRow(id) {
  const editRowForm = document.getElementById("edit" + id);
  toggleDisplay(editRowForm, overlay);

  function overlayClickListener() {
    toggleDisplay(editRowForm, overlay);
    overlay.removeEventListener("click", overlayClickListener);
  }

  overlay.addEventListener("click", overlayClickListener);
}

function transferContent(id) {
  const transferForm = document.getElementById("transfer" + id);
  toggleDisplay(transferForm, overlay);

  function overlayClickListener() {
    toggleDisplay(transferForm, overlay);
    overlay.removeEventListener("click", overlayClickListener);
  }

  overlay.addEventListener("click", overlayClickListener);
}

function editContent(contentId) {
  const editContentForm = document.getElementById(contentId);
  toggleDisplay(editContentForm, overlay);

  function overlayClickListener() {
    toggleDisplay(editContentForm, overlay);
    overlay.removeEventListener("click", overlayClickListener);
  }

  overlay.addEventListener("click", overlayClickListener);
}

function confirmSubmission(event) {
  const confirmed = window.confirm("Are you sure you want to delete?");
  if (!confirmed) {
    event.preventDefault();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".row");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const colorIndex = i % colors.length;

    row.style.backgroundColor = colors[colorIndex].main;
    row.style.borderColor = colors[colorIndex].darker;
  }

  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      closeAllAccordions(acc, this);

      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  function closeAllAccordions(accordions, currentAccordion) {
    for (let i = 0; i < accordions.length; i++) {
      if (accordions[i] !== currentAccordion) {
        accordions[i].classList.remove("active");
        const panel = accordions[i].nextElementSibling;
        panel.style.display = "none";
      }
    }
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
});
