import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  // Get the current cart, or start with an empty array if there is none
  const cart = getLocalStorage('so-cart') || [];
  // Add the new product to the cart
  cart.push(product);
  // Save the whole array back to localStorage
  setLocalStorage('so-cart', cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
