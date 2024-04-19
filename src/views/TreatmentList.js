import { NavButton } from '../navigation/NavButton';
import { TreatmentDetails } from "./TreatmentDetails";
import { AddToCartButton } from '../cart/AddToCartButton';
import { cartManager } from '../cart/cart-manager';

export function TreatmentList() {
    const section = document.createElement('section');

    section.innerHTML = `
        <h2>Treatment List</h2>
        <p class="loading text-danger">Ladowanie zabiegow...</p>
    `;

    const ul = document.createElement('ul');

    // Pobieramy zabiegi (surowe dane)
    fetch('http://localhost:3000/treatments')
        .then(response => response.json())
        .then(treatments => {
            // Wytwarzamy elementy listy
            const lis = treatments.map(treatment => {
                const li = document.createElement('li');

                li.innerHTML = `
                    <h4>${treatment.name}</h4>
                    <p>
                        <strong>${treatment.price.toFixed(2)} PLN</strong>
                    </p>
                    <footer></footer>
                `;

                const readMoreButton = NavButton('Czytaj więcej', () => TreatmentDetails(treatment.id));
                
                const addToCartButton = AddToCartButton(() => {
                    cartManager.add(treatment);
                    displayReservationMessage(li);
                });

                li.lastElementChild.append(readMoreButton, addToCartButton);
                
                return li;
            });

            ul.append(...lis);
            section.append(ul);
            section.querySelector('.loading').remove();
        });

    return section;
}

function displayReservationMessage(element) {
    const message = document.createElement('div');
    message.innerHTML = `
        <div class="alert alert-success my-2" role="alert">
            Zabieg został dodany do koszyka
        </div>
    `;

    element.appendChild(message);

    // Usuwanie komunikatu po 2 sekundach
    setTimeout(() => {
        message.remove();
    }, 2000);
}
