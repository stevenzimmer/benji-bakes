const initialState = {
    cart: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case "INCREMENT_AMOUNT":
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        default:
            return state;
    }
};
