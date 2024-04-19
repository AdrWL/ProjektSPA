import { Cart } from '../views/Cart';
import { Home } from '../views/Home';
import { RoomList } from '../views/RoomList';
import { TreatmentList } from '../views/TreatmentList';
import { Registration } from '../common/registration';
import { NavButton } from './NavButton';
import { Login } from '../common/login';

const navItems = [
  { text: "Stronga Główna", component: Home },
  { text: "Zobacz Pokoje", component: RoomList },
  { text: 'Zabiegi', component: TreatmentList },
  { text: "Rezerwacja", component: Cart },
  { text: "Rejestracja", component: Registration },
  { text: "Logowanie", component: Login },
];

export function Nav() {
  const nav = document.createElement("nav");

  const navButton = navItems.map((navItem) => {
    return NavButton(navItem.text, navItem.component);
  });

  nav.append(...navButton);

  return nav;
}
