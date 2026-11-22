import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // get the details of the current product (findProductById returns a promise)
    this.product = await this.dataSource.findProductById(this.productId);

    // stop here if the id in the URL does not match any product
    if (!this.product) {
      document.querySelector('.product-detail').innerHTML =
        '<h2>Product not found</h2>';
      return;
    }

    // the product details are needed before rendering the HTML
    this.renderProductDetails();

    // once the HTML is rendered, listen for clicks on the Add to Cart button
    // bind(this) keeps "this" pointing to the ProductDetails instance
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // get the current cart, or start with an empty array if there is none
    const cart = getLocalStorage('so-cart') || [];
    // add the current product and save the whole array back
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    const product = this.product;

    // the API can return products without colors, so use a safe fallback
    const colorName = product.Colors?.[0]?.ColorName || '';

    // update the page title with the product name
    document.title = `Sleep Outside | ${product.Name}`;

    document.querySelector('.product-detail').innerHTML = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />

      <p class="product-card__price">$${product.FinalPrice}</p>

      <p class="product__color">${colorName}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    `;
  }
}