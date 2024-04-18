export function Home() {
  const section = document.createElement("section");

  section.innerHTML = `
        <h2 class="welcome-heading">Witaj w IT SPA!</h2>
        <p>Zanurz się w świecie relaksu i komfortu, gdzie każdy programista czuje się jak w domu.</p>
        <p>Oferujemy najwyższej jakości usługi w otoczeniu stworzonym specjalnie dla Ciebie.</p>`;

  const img = document.createElement("img");
  img.src = require("../assets/home.jpg");
  img.alt = "Relaksacyjny pokój w IT SPA";
  img.width = 500;

  section.append(img);

  return section;
}
