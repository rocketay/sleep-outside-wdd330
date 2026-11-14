import { renderListWithTemplate } from './utils.mjs';

// only these products have detail pages, so only these are listed
const LISTED_PRODUCT_IDS = ['880RR', '985RF', '985PR', '344YJ'];

// returns the HTML string for one product card
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // get the list of products from the data source
    const list = await this.dataSource.getData();
    // keep only the products that have detail pages
    const listedProducts = list.filter((product) =>
      LISTED_PRODUCT_IDS.includes(product.Id),
    );
    this.renderList(listedProducts);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}