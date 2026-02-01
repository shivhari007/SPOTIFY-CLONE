document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const u = username.value;
  const p = password.value;

  if (u === "shivhari" && p === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    location.href = "index.html";
  } else {
    errorMsg.innerText = "Invalid credentials";
  }
});
