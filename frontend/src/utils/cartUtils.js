export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
	//Calculate items price
	state.itemsPrice = addDecimals(state.cartItems.reduce((accumulator, item) => accumulator + item.price * item.qty, 0));

	//Calculate shipping price (If order is over Rs.500 then free shipping else it will be Rs.45)
	state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 45);

	//Calculate tax price(15%)
	state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

	//Calculate total price
	state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

	localStorage.setItem("cart", JSON.stringify(state));

	return state;
};
