document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const emptyCartButton = document.getElementById('emptyCart');

    // Cargar productos desde LocalStorage al cargar la página
    loadCart();

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = productNameInput.value;
        const productPrice = parseFloat(productPriceInput.value).toFixed(2);

        addProductToCart(productName, productPrice);
        productNameInput.value = '';
        productPriceInput.value = '';
    });

    emptyCartButton.addEventListener('click', () => {
        emptyCart();
    });

    function addProductToCart(name, price) {
        const cart = getCart();
        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    function renderCart() {
        cartItems.innerHTML = '';
        const cart = getCart();
        let total = 0;

        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `
                ${product.name} - $${product.price}
                <button class="btn btn-danger btn-sm" onclick="removeProduct(${index})">Eliminar</button>
            `;
            cartItems.appendChild(li);
            total += parseFloat(product.price);
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    function loadCart() {
        renderCart();
    }

    function emptyCart() {
        localStorage.removeItem('cart');
        renderCart();
    }
});

function removeProduct(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.dispatchEvent(new Event('DOMContentLoaded'));
}
