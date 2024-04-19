import { NavButton } from "../navigation/NavButton";
import { RoomDetails } from './RoomDetails';
import { AddToCartButton } from "../cart/AddToCartButton";
import { cartManager } from "../cart/cart-manager";
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'bootstrap-daterangepicker';
import moment from 'moment';
// Ustawienie polskich dat w bibliotece moment
import 'moment/locale/pl';

moment.locale('pl');

export function RoomList() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2>Lista pokoi</h2>
    <input class="" type="text" name="daterange" />
    <p class="loading text-danger">Ladowanie pokoi...</p>
  `;


  // Ustawienie dzisiejszej daty i daty maksymalnej
  const today = moment();
  const maxDate = moment().add(1, 'years');
  const endDate = moment().add(1, 'days');

  // Inicjalizacja daterangepicker
  const dateRangeInput = section.querySelector('input[name="daterange"]');
  new DateRangePicker(dateRangeInput, {
    format: 'YYYY-MM-DD',
    startDate: today,
    endDate: endDate,
    minDate: today,
    maxDate: maxDate,
    locale: {
      cancelLabel: 'Anuluj',
      applyLabel: 'Zastosuj'
    },
  });

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
