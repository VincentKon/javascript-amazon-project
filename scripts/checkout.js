import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let cartSummaryHTML = "";

cart.forEach(function (cartItem) {
  let productId = cartItem.productId;
  let matchingProduct;
  products.forEach(function (product) {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${
              matchingProduct.id
            }">
            Update
            </span>
            <input type="number" class="quantity-input js-quantity-input-${
              matchingProduct.id
            }">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${
              matchingProduct.id
            }">Save</span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id
            }">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
    `;
});
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach(function (link) {
  link.addEventListener("click", function () {
    let productId = link.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCartQuantity();
  });
});

document.querySelectorAll(".js-update-link").forEach(function (link) {
  link.addEventListener("click", function () {
    let productId = link.dataset.productId;
    console.log(productId);
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});
document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;

    let newQuantity = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000.");
      return;
    }
    updateQuantity(productId, newQuantity);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    updateCartQuantity();
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      newQuantity;
  });
  const quantityInput = link
    .closest(".cart-item-container")
    .querySelector(".js-quantity-input-" + link.dataset.productId);
  quantityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      link.click();
    }
  });
});

// Update cart quantity on checkout page
updateCartQuantity();

function updateCartQuantity() {
  document.querySelector(".js-return-to-home-link").innerHTML =
    calculateCartQuantity() === 1
      ? `${calculateCartQuantity()} item`
      : `${calculateCartQuantity()} items`;
}
