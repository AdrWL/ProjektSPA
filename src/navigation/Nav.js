import { Cart } from '../views/Cart';
import { Home } from '../views/Home';
import { RoomList } from '../views/RoomList';
import { TreatmentList } from '../views/TreatmentList';
import { Registration } from '../common/Registration';
import { NavButton } from './NavButton';
import { Login } from '../common/Login';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { dom } from '@fortawesome/fontawesome-svg-core';

library.add(faBars);
dom.watch();

const navItems = [
  { text: "Strona Główna", component: Home },
  { text: "Zobacz Pokoje", component: RoomList },
  { text: "Zabiegi", component: TreatmentList },
  { text: "Rezerwacja", component: Cart },
  { text: "Rejestracja", component: Registration },
  { text: "Logowanie", component: Login },
];

export function Nav() {
  const nav = document.createElement("nav");
  nav.classList.add("nav");

  const hamburgerDiv = document.createElement("div");
  hamburgerDiv.classList.add("hamburger");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-bars");

  hamburgerDiv.appendChild(icon);

  const asideElement = document.createElement("aside");
  asideElement.classList.add("asideElement");

  const divElement = document.createElement("div");
  divElement.classList.add("nav_list");

  const navButtonElementsAside = navItems.map((navItem) => {
    const button = NavButton(navItem.text, navItem.component);
    button.classList.add("btn", "btn-primary");

    button.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        asideElement.style.display = 'none';
      } 
    });

    return button;
  });

  divElement.append(...navButtonElementsAside);
  asideElement.appendChild(divElement);
  nav.appendChild(hamburgerDiv);
  nav.appendChild(asideElement);

  hamburgerDiv.addEventListener('click', function () {
    if (asideElement.style.display === 'none') {
      asideElement.style.display = 'flex';
    } else {
      asideElement.style.display = 'none';
    }
  });

  function handleWindowSize() {
    if (window.innerWidth >= 768) {
      asideElement.style.display = 'flex';
    } else {
      asideElement.style.display = 'none';
    }
  }

  window.addEventListener('resize', handleWindowSize);
  handleWindowSize();

  return nav;
}
