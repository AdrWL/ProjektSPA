import { RemoveFromCartButton } from "../cart/RemoveFromCartButton";
import { cartManager } from "../cart/cart-manager";

export function Cart() {
  const section = document.createElement('section');

  let cartItems = cartManager.getAll();

  if (cartItems.length === 0) {
    section.innerHTML = `
      <p class="empty-cart-message">Brak dokonanych rezerwacji</p>
    `;
  } else {
    section.innerHTML = `
      <h2>Zamówienie</h2>
      <p>Przegląd zawartości swoich rezerwacji.</p>
      <table class="table">
          <tr>
           <th>Nazwa</th>
           <th>Liczba</th>
           <th>Cena</th>
           <th></th>
          </tr>
      </table>
    `;

    const tableRows = cartManager.getAll().map((item) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quality}</td>
          <td>${(item.quality * item.price).toFixed(2)} PLN</td>
          <td></td>
      `;

      const removeFromCartButton = RemoveFromCartButton(() =>
        cartManager.remove(item)
      );

      tr.lastElementChild.append(removeFromCartButton);

      return tr;
    });

    const tableFooter = document.createElement('tr');

    tableFooter.innerHTML = `
        <td></td>
        <td></td>
        <td>
            <strong>${cartManager.getTotalPrice()} PLN</strong>
        </td>
        <td></td>
    `;

    section.querySelector('table').append(...tableRows, tableFooter);
  }

  return section;
}
