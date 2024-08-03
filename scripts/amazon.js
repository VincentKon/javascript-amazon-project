import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
updateCartQuantity();
products.forEach(function (product, index) {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
    `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerHTML = calculateCartQuantity();
}

function getQuantitySelectorValue(productId) {
  let quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  return Number(quantitySelector.value);
}

function addAddedMessage(productId) {
  let addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");

  let previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }
  let timeoutId = setTimeout(function () {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);
  addedMessageTimeouts[productId] = timeoutId;
}
// To store added message timeout for all products
let addedMessageTimeouts = {};

document.querySelectorAll(".js-add-to-cart").forEach(function (button) {
  button.addEventListener("click", function () {
    // Get product id for product button we clicked
    let productId = button.dataset.productId;

    // To enable quantity selector works
    let quantity = getQuantitySelectorValue(productId);

    // Add product id and quantity to cart
    addToCart(productId, quantity);

    // To enable cart quantity works
    updateCartQuantity();

    // To enable added message (with timeout)
    addAddedMessage(productId);
  });
});
