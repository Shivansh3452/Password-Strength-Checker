document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const progressBar = document.getElementById("strength-bar");
  const strengthLabel = document.getElementById("strength-label");
  const tipsList = document.getElementById("password-tips");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const toggleThemeBtn = document.getElementById("toggle-theme");

  let showTimer = null;

  const criteria = [
    { test: (pwd) => pwd.length >= 8, message: "At least 8 characters" },
    { test: (pwd) => /[A-Z]/.test(pwd), message: "At least one uppercase letter" },
    { test: (pwd) => /[a-z]/.test(pwd), message: "At least one lowercase letter" },
    { test: (pwd) => /[0-9]/.test(pwd), message: "At least one number" },
    { test: (pwd) => /[^\w\s]/.test(pwd), message: "At least one special character (!@#$%)" },
  ];

  function checkPasswordStrength(password) {
    let score = 0;
    let passedTips = [];

    criteria.forEach((rule) => {
      if (rule.test(password)) {
        score++;
        passedTips.push({ message: rule.message, valid: true });
      } else {
        passedTips.push({ message: rule.message, valid: false });
      }
    });

    const percentage = (score / criteria.length) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", percentage);
    progressBar.classList.remove("bg-danger", "bg-warning", "bg-success");
    strengthLabel.classList.remove("text-danger", "text-warning", "text-success", "animated");

    if (score <= 2) {
      progressBar.classList.add("bg-danger");
      strengthLabel.textContent = "Weak password 😟";
      strengthLabel.classList.add("text-danger", "animated");
    } else if (score <= 4) {
      progressBar.classList.add("bg-warning");
      strengthLabel.textContent = "Moderate password 😐";
      strengthLabel.classList.add("text-warning", "animated");
    } else {
      progressBar.classList.add("bg-success");
      strengthLabel.textContent = "Strong password 💪";
      strengthLabel.classList.add("text-success", "animated");
    }

    // Show tips
    tipsList.innerHTML = "";
    passedTips.forEach((tip) => {
      const li = document.createElement("li");
      li.textContent = tip.message;
      li.className = "list-group-item " + (tip.valid ? "valid" : "invalid");
      tipsList.appendChild(li);
    });
  }

  // Live update on input
  passwordInput.addEventListener("input", () => {
    checkPasswordStrength(passwordInput.value);
  });

  // Toggle Show/Hide Password with 3-second auto-hide
  togglePasswordBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    if (isPassword) {
      passwordInput.type = "text";
      togglePasswordBtn.textContent = "Hide";
      showTimer = setTimeout(() => {
        passwordInput.type = "password";
        togglePasswordBtn.textContent = "Show";
      }, 300);
    } else {
      passwordInput.type = "password";
      togglePasswordBtn.textContent = "Show";
      clearTimeout(showTimer);
    }
  });

  // 🌗 Toggle Dark/Light Mode
  toggleThemeBtn.addEventListener("click", () => {
    const body = document.body;
    const isDark = body.classList.toggle("dark-mode");
    toggleThemeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
});
