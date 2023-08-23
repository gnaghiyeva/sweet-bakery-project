import { createContext, useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

const BasketContext = createContext();

export const BasketContextProvider = ({children}) =>{
    const[basket,setBasket] =  useLocalStorage('basket',[]);
    const values = {
        basket,setBasket
    };

    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = ()=> useContext(BasketContext);