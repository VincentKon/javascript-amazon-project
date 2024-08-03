export let cart = [];

export function addToCart(productId, quantity) {
    // Add product to cart
    let matchingItem;
    cart.forEach(function (cartItem) {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += Number(quantity);
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
      });
    }
  }
  