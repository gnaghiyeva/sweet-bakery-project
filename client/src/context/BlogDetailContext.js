import React, { useContext, useState,createContext } from 'react'

const BlogDetailContext = createContext();

export const BlogDetailContextProvider = ({children}) => {
    const [blogdetails,setBlogdetails] = useState([])
  return (
    <BlogDetailContext.Provider value={[blogdetails,setBlogdetails]}>
        {children}
    </BlogDetailContext.Provider>
  )
}

export const useBlogDetailContext = () => useContext(BlogDetailContext)