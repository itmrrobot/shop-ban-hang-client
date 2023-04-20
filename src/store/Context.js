import { createContext, useContext } from "react";
import { useReducer } from "react";
import {initCartState,cartReducer,initFilterState,productReducer} from "./reducer";

const Context = createContext();

function Provider({children}) {
    const [state,dispatch] = useReducer(cartReducer,initCartState);
    const [productState,productDispatch] = useReducer(productReducer,initFilterState);

    const increment = (id) => {
        return dispatch({
          type: "INCREMENT",
          payload: id,
        });
      };
    
    const decrement =(id) => {
        return dispatch({
            type: "DECREMENT",
            payload: id
        });
    }

    const removeProduct= (id,qty,price) => {
        return dispatch({
            type: "REMOVEPRODUCT",
            payload: {id,qty,price}
        });
    }

    return (
        <Context.Provider value={{state,dispatch,productState,productDispatch,increment,decrement,removeProduct}}>
            {children}
        </Context.Provider>
    )
}

export default Provider;

export const CartState = () => {
    return useContext(Context);
}

// export const ProductState = () => {
//     const [productState,productDispatch] = useContext(Context);
//     return [productState,productDispatch];
// }