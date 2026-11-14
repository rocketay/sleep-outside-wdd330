import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// the category decides which json file is loaded (tents.json)
const dataSource = new ProductData('tents');

// the element where the product cards will be rendered
const listElement = document.querySelector('.product-list');

const productList = new ProductList('tents', dataSource, listElement);
productList.init();
