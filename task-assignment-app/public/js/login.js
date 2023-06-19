// function setActive(e) {
//   document.querySelector(".active").classList.remove("active");
//   e.classList.add("active");
//   console.log(e);
// }

function setActive(formId, e) {
  const signInForm = document.getElementById("signInForm");
  const registerForm = document.getElementById("registerForm");
  const buttonContainer = document.querySelector(".button-container");
  const buttons = buttonContainer.querySelectorAll("button");

  // Reset active class for buttons
  buttons.forEach((button) => button.classList.remove("active"));

  // Translate the form based on the selected formId
  if (formId === "signInForm") {
    signInForm.style.transform = "translateX(0)";
    registerForm.style.transform = "translateX(100%)";
    e.classList.add("active");
  } else if (formId === "registerForm") {
    signInForm.style.transform = "translateX(-100%)";
    registerForm.style.transform = "translateX(0)";
    e.classList.add("active");
  }
}
