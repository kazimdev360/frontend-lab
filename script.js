// ======================
// SKILLS (Dynamic)
// ======================
const skills = ["HTML", "CSS", "JavaScript", "Flexbox", "UI Design"];

const skillsContainer = document.getElementById("skills");

skills.forEach(skill => {
  const span = document.createElement("span");
  span.innerText = skill;
  skillsContainer.appendChild(span);
});

// ======================
// DARK MODE
// ======================
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// Load theme
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

// ======================
// TYPING ANIMATION
// ======================
const typingText = document.getElementById("typing");

const roles = [
  "Frontend Developer",
  "UI Designer",
  "JavaScript Enthusiast",
  "React Learner"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
  current = roles[i];

  if (isDeleting) {
    typingText.textContent = current.substring(0, j--);
  } else {
    typingText.textContent = current.substring(0, j++);
  }

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 80 : 120);
}

type();

// ======================
// CONTACT MODAL
// ======================
const modal = document.getElementById("modal");
const contactBtn = document.getElementById("contactBtn");
const closeBtn = document.getElementById("closeBtn");
const sendBtn = document.getElementById("sendBtn");

contactBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

sendBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (name && message) {
    alert(`Thanks ${name}, message received!`);
    modal.style.display = "none";
  } else {
    alert("Please fill all fields");
  }
});
