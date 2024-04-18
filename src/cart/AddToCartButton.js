export function AddToCartButton(callback) {
    const addToCartButton = document.createElement('button');

    addToCartButton.classList.add('btn', 'btn-secondary');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', callback);

    return addToCartButton;
}



