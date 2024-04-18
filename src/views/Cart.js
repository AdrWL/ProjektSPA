import { RemoveFromCartButton } from "../cart/RemoveFromCartButton";
import { cartManager } from "../cart/cart-manager";

export function Cart() {
  const section = document.createElement('section');

  section.innerHTML = `
    <h2>Cart</h2>
    <p>Przegląd zawartosci swojego koszyka.</p>
    <table class="table">
        <tr>
         <th>Name</th>
         <th>Quality</th>
         <th>Price</th>
         <th>Remove</th>
        </tr>
    </table>
    `;
  const tableRows = cartManager.getAll().map((item) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quality}</td>
        <td>${(item.quality * item.price).toFixed(2)}</td>
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

  return section;
}
