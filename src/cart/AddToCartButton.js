export function AddToCartButton(callback) {
    const addToCartButton = document.createElement('button');

    addToCartButton.classList.add('btn', 'btn-secondary');
    addToCartButton.textContent = 'Zarezerwuj';
    addToCartButton.addEventListener('click', callback);

    return addToCartButton;
}



