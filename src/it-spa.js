import "bootstrap/dist/css/bootstrap.css";
import "./it-spa.css";

import { Nav } from './navigation/Nav';
import { Home } from './views/Home';
import { Date } from './views/Date';


const main = document.querySelector("main");


main.before(Nav());

main.before(Date());

main.append(Home());


document.body.addEventListener("navigate", (event) => {
  const Component = event.detail;

  main.innerHTML = "";
  main.append(Component());
});
