import { NavButton } from "../navigation/NavButton";
import { RoomDetails } from './RoomDetails';
import { AddToCartButton } from "../cart/AddToCartButton";
import { cartManager } from "../cart/cart-manager";



export function RoomList() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2>Lista pokoi</h2>
    <p class="loading text-danger">Ladowanie pokoi...</p>
  `;


  const ul = document.createElement("ul");

  fetch('http://localhost:3000/rooms')
    .then((response) => response.json())
    .then((rooms) => {
      const lis = rooms.map((room) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <h4>${room.name}</h4>
        <p>
            <strong>${room.price.toFixed(2)} PLN</strong>
        </p>
        <footer></footer>
        `;

        const roomDetailsComponent = () => RoomDetails(room);
        const readMoreButton = NavButton("Zobacz więcej", roomDetailsComponent);

        const addToCartButton = AddToCartButton(() => {
          cartManager.add(room);
          displayReservationMessage(li);
        });

        li.lastElementChild.append(readMoreButton, addToCartButton);

        return li;
      });

      ul.append(...lis);
      section.append(ul);
      section.querySelector(".loading").remove();
    });

  return section;
}

// Informacja/komunkat o dokonanej rezerwacji pokoju
function displayReservationMessage(element) {
  const message = document.createElement('div');
  message.innerHTML = `
    <div class="alert alert-success my-2" role="alert">
      Pokój został zarezerwowany
    </div>
  `;

  element.appendChild(message);

  // Usuwanie komunikatu po 2 sekundach
  setTimeout(() => {
    message.remove();
  }, 2000);
}
