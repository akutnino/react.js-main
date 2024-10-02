const INITIAL_STATE_CART = {
	cartArray: [
		// {
		// 	pizzaId: 12,
		// 	name: 'Mediterranean',
		// 	quantity: 2,
		// 	unitPrice: 16,
		// 	totalPrice: 32,
		// },
	],
};

function cartReducer(currentState = INITIAL_STATE_CART, action) {
	switch (action.type) {
		case 'cart/addItem':
			return {
				...currentState,
				cartArray: [...currentState.cartArray, action.payload],
			};

		case 'cart/deleteItem': {
			const filteredArray = currentState.cartArray.filter(
				(orderObject) => orderObject.pizzaId !== action.payload,
			);

			return {
				...currentState,
				cartArray: filteredArray,
			};
		}

		case 'cart/increaseItemQuantity': {
			const updatedArray = currentState.cartArray.map((orderObject) => {
				if (orderObject.pizzaId === action.payload) {
					orderObject.quantity = orderObject.quantity + 1;
					orderObject.totalPrice = orderObject.quantity * orderObject.unitPrice;
				}
				return orderObject;
			});

			return {
				...currentState,
				cartArray: updatedArray,
			};
		}

		case 'cart/decreaseItemQuantity': {
			const updatedArray = currentState.cartArray.map((orderObject) => {
				if (orderObject.pizzaId === action.payload) {
					orderObject.quantity = orderObject.quantity - 1;
					orderObject.totalPrice = orderObject.quantity * orderObject.unitPrice;
				}
				return orderObject;
			});

			return {
				...currentState,
				cartArray: updatedArray,
			};
		}

		case 'cart/clearCart':
			return {
				...currentState,
				cartArray: [],
			};

		default:
			return currentState;
	}
}

export default cartReducer;
