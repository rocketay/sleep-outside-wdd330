import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// load the shared header and footer partials into the page
loadHeaderFooter();

// the product id comes from the URL, for example ?product=880RR
const productId = getParam('product');

// the category is no longer needed: the API finds the product by its id
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
