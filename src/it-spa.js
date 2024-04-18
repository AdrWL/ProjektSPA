import "bootstrap/dist/css/bootstrap.css";
import "./it-spa.css";
import { Home } from "./views/Home";


const main = document.querySelector("main");

main.append(Home());


document.body.addEventListener("navigate", (event) => {
  const Component = event.detail;

  main.innerHTML = "";
  main.append(Component());
});
