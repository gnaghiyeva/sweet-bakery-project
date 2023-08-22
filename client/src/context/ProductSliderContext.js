import React, { useContext, useState,createContext } from 'react'

const ProductSliderContext = createContext();

export const ProductSliderContextProvider = ({children}) => {
    const [sliders,setSliders] = useState([])
  return (
    <ProductSliderContext.Provider value={[sliders,setSliders]}>
        {children}
    </ProductSliderContext.Provider>
  )
}

export const useProductSliderContext = () => useContext(ProductSliderContext)