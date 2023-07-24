import React, { useContext, useState,createContext } from 'react'

const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [categories,setCategories] = useState([])
  return (
    <CategoryContext.Provider value={[categories,setCategories]}>
        {children}
    </CategoryContext.Provider>
  )
}

export const useCategoryContext = () => useContext(CategoryContext)