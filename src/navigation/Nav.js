
import { Home } from '../views/Home';
import { RoomList } from '../views/RoomList';
import { NavButton } from './NavButton';

const navItems = [
  { text: "Home", component: Home },
  { text: "Rooms", component: RoomList },
];

export function Nav() {
  const nav = document.createElement("nav");

  const navButton = navItems.map((navItem) => {
    return NavButton(navItem.text, navItem.component);
  });

  nav.append(...navButton);

  return nav;
}
