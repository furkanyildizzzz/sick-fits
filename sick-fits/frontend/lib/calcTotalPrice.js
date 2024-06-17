const calcTotalPrice = (cart) => {
  console.log({ cart });
  return cart?.reduce((accumulator, cartItem) => {
    if (!cartItem.product) return accumulator;
    return accumulator + cartItem.product.price * cartItem.quantity;
  }, 0);
};
export default calcTotalPrice;
