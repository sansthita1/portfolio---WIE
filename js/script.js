/* ========== 1. TYPING EFFECT ========== */
const typingElement = document.getElementById("typing-text");

const roles = [
  "Computer Science Student",
  "Data Science Enthusiast",
  "Web Developer",
  "Silicon Photonics Explorer"
];

let roleIndex = 0;   // which role we're on
let charIndex = 0;   // how many letters are showing
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.textContent = currentRole.substring(0, charIndex);

  let delay = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    delay = 1500;                          // pause when fully typed
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;                           // short pause before next word
  }

  setTimeout(typeEffect, delay);
}

typeEffect();


/* ========== 2. PROJECT FILTER ========== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // 1. Move the "active" highlight to the clicked button
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    // 2. Show or hide each card
    const selected = button.dataset.filter;

    projectCards.forEach(function (card) {
      if (selected === "all" || card.dataset.category === selected) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
/* ========== 3. FORM VALIDATION ========== */
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("form-success");

// Write an error under a field and turn its border red
function showError(input, message) {
  input.parentElement.querySelector(".error-message").textContent = message;
  input.classList.add("invalid");
}

// Remove the error from a field
function clearError(input) {
  input.parentElement.querySelector(".error-message").textContent = "";
  input.classList.remove("invalid");
}

// Each checker returns true (passed) or false (failed)
function validateName() {
  const value = nameInput.value.trim();
  if (value === "") {
    showError(nameInput, "Please enter your name.");
    return false;
  }
  clearError(nameInput);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError(emailInput, "Please enter your email.");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(emailInput, "Please enter a valid email address.");
    return false;
  }
  clearError(emailInput);
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value.length < 10) {
    showError(messageInput, "Message must be at least 10 characters.");
    return false;
  }
  clearError(messageInput);
  return true;
}

// The guard at the door
form.addEventListener("submit", function (event) {
  event.preventDefault();          // stop the page reload
  successMessage.textContent = "";

  // Run ALL three checks, so every error shows at once
  const nameOk = validateName();
  const emailOk = validateEmail();
  const messageOk = validateMessage();

  if (nameOk && emailOk && messageOk) {
    successMessage.textContent = "Thanks! Your message has been sent.";
    form.reset();
  }
});

// Live feedback: re-check a field when the user leaves it
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
messageInput.addEventListener("blur", validateMessage);