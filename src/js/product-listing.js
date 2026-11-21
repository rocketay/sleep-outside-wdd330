import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

// load the shared header and footer partials into the page
loadHeaderFooter();

// the category comes from the URL, for example ?category=backpacks
const category = getParam('category') || 'tents';

// turn "sleeping-bags" into "Sleeping Bags" for the page title
const categoryName = category
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

document.title = `Sleep Outside | ${categoryName}`;
document.querySelector('.title').textContent = `Top Products: ${categoryName}`;

// create the data source, find the element to render in, and build the list
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();