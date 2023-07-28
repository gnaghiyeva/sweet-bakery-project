import React, { useContext, useState,createContext } from 'react'

const PriceContext = createContext();

export const PriceContextProvider = ({children}) => {
    const [prices,setPrices] = useState([])
  return (
    <PriceContext.Provider value={[prices,setPrices]}>
        {children}
    </PriceContext.Provider>
  )
}

export const usePriceContext = () => useContext(PriceContext)