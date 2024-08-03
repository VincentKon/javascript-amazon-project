import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
let productsHTML = "";
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

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
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
let addedMessagetimeout;
let addedMessageTimeoutId;
document.querySelectorAll(".js-add-to-cart").forEach(function (button) {
  button.addEventListener("click", function () {
    let productId = button.dataset.productId;
    let matchingItem;
    cart.forEach(function (item) {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    let quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    let quantity = Number(quantitySelector.value);
    if (matchingItem) {
      matchingItem.quantity += Number(quantity);
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
      });
    }
    let cartQuantity = 0;
    cart.forEach(function (item) {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    let addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add("added-to-cart-visible");
    console.log(addedMessagetimeout);
    if (!addedMessagetimeout) {
      addedMessageTimeoutId = setTimeout(function () {
        addedMessage.classList.remove("added-to-cart-visible");
        addedMessagetimeout = false;
      }, 2000);
      console.log("start");
      addedMessagetimeout = true;
    } else {
      clearTimeout(addedMessageTimeoutId);
      addedMessageTimeoutId = setTimeout(function () {
        addedMessage.classList.remove("added-to-cart-visible");
        addedMessagetimeout = false;
      }, 2000);
      console.log("restart");
      addedMessagetimeout = true;
    }
    setTimeout(function () {}, 2000);
  });
});
