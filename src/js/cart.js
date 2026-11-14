import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  // if nothing is stored yet, getLocalStorage returns null, so fall back to an empty array
  const cartItems = getLocalStorage('so-cart') || [];
  const productList = document.querySelector('.product-list');

  // show a friendly message instead of an empty page when the cart has no items
  if (cartItems.length === 0) {
    productList.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
