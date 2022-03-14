import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const { rootReducer } = require("./rootReducer");

// const initialStore = {
//     cartReducer: {
//         cart: JSON.parse(localStorage.getItem("cart")) ?? [],
//     },
// };

export const store = createStore(
    rootReducer,
    // initialStore,
    composeWithDevTools()
);
