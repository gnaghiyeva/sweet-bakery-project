import React, { useContext, useState,createContext } from 'react'

const BlogSliderContext = createContext();

export const BlogSliderContextProvider = ({children}) => {
    const [sliders,setSliders] = useState([])
  return (
    <BlogSliderContext.Provider value={[sliders,setSliders]}>
        {children}
    </BlogSliderContext.Provider>
  )
}

export const useBlogSliderContext = () => useContext(BlogSliderContext)