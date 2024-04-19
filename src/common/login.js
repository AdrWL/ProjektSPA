export function Login() {
    const section = document.createElement('section');

    section.innerHTML = `
        <h2>Logowanie</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" placeholder="Wpisz email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Hasło:</label>
                <input type="password" placeholder="Wpisz hasło" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Zaloguj się</button>
            <p class="error-message text-danger" style="display: none;">Nieprawidłowy e-mail lub hasło</p>
        </form>
    `;

    const loginForm = section.querySelector('#login-form');
    const errorMessage = section.querySelector('.error-message');

    // Sprawdzenie, czy użytkownik jest zalogowany
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        displayUserInfo(loggedInUser);
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    // Zapisanie informacji o zalogowanym użytkowniku w localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify(user));

                    displayUserInfo(user);
                } else {
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Błąd podczas ładowania danych', error);
            });
    });

    function displayUserInfo(user) {
        section.innerHTML = `
            <h2>Witaj, ${user.name}!</h2>
            <p>Email: ${user.email}</p>
            <img src="${user.avatar}" alt="Avatar użytkownika" class="avatar" />
        `;

        // Przycisk wylogowania
        const logoutButton = document.createElement('button');
        logoutButton.innerText = 'Wyloguj';
        logoutButton.classList.add('btn', 'btn-danger', 'mt-3');
        logoutButton.addEventListener('click', () => {
            // Usunięcie danych z localStorage
            localStorage.removeItem('loggedInUser');
            location.reload(); // Przeładowanie strony
        });

        section.appendChild(logoutButton);
    }

    return section;
}
