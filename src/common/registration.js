export function Registration() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2 class="mt-4 mb-4">Rejestracja</h2>
    <form id="registration-form" class="needs-validation">
      <div class="mb-3">
        <label for="name" class="form-label">Imię i nazwisko</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Wpisz Imię i nazwisko" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="Wpisz E-mail" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Hasło</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Hasło" required />
      </div>
      <div class="mb-3">
        <label for="confirm-password" class="form-label">Potwierdź hasło</label>
        <input type="password" class="form-control" id="confirm-password" name="confirmPassword" placeholder="Potwierdź hasło" required />
      </div>
      <div class="mb-3">
        <label for="password-strength" class="form-label">Siła hasła</label>
        <meter id="password-strength" class="form-control" max="4" min="0"></meter>
      </div>
      <button type="submit" class="btn btn-primary">Zarejestruj się</button>
    </form>
    <div id="registration-message" class="mt-3"></div>
  `;
  
  // Pobranie referencji do formularza i innych elementów
  const form = section.querySelector("#registration-form");
  const passwordInput = section.querySelector("#password");
  const passwordStrengthMeter = section.querySelector("#password-strength");
  const registrationMessage = section.querySelector("#registration-message");

  // Dodanie nasłuchiwania na wprowadzenie hasła
  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    passwordStrengthMeter.value = strength;
  });

  // Dodanie nasłuchiwania na wysłanie formularza
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Pobranie wartości z formularza
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Sprawdzenie, czy hasła są identyczne
    if (password !== confirmPassword) {
      registrationMessage.innerHTML = `<div class="alert alert-danger">Hasła nie są identyczne.</div>`;
      return;
    }

    // Sprawdzenie, czy użytkownik o podanym e-mailu już istnieje
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((users) => {
        if (users.some((user) => user.email === email)) {
          registrationMessage.innerHTML = `<div class="alert alert-danger">Użytkownik o podanym e-mailu już istnieje.</div>`;
          return;
        }

        const avatar = "src/avatar1.jpg";

        // Wysłanie danych do serwera
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, avatar }),
        })
          .then(() => {
            registrationMessage.innerHTML = `<div class="alert alert-success">Rejestracja zakończona sukcesem!</div>`;
            form.reset();
          })
          .catch((error) => {
            registrationMessage.innerHTML = `<div class="alert alert-danger">Wystąpił błąd podczas rejestracji.</div>`;
            console.error("Error:", error);
          });
      })
  });

  return section;
}

// Funkcja obliczająca siłę hasła
function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.match(/[a-z]/)) {
    strength++;
  }
  if (password.match(/[A-Z]/)) {
    strength++;
  }
  if (password.match(/[0-9]/)) {
    strength++;
  }
  if (password.length >= 8) {
    strength++;
  }

  return strength;
}