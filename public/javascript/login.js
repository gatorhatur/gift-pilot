async function loginFormHandler(event) {
  event.preventDefault();
  console.log("clicked login button");

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();
  console.log("clicked signup button");

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const originalBirthdate = document
    .querySelector("#birthdate-signup")
    .value.trim();
  const birthdate = originalBirthdate.slice(5);
  console.log(birthdate);

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
        birthdate,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      document.getElementById("error-modal-text").textContent =
        response.statusText;
      let myModal = new bootstrap.Modal(
        document.getElementById("error-modal"),
        {}
      );
      myModal.show();
    }
  }
}

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);

document
  .querySelector("#signup-btn")
  .addEventListener("click", signupFormHandler);
