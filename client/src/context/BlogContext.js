import React, { useContext, useState,createContext } from 'react'

const BlogContext = createContext();

export const BlogContextProvider = ({children}) => {
    const [blogs,setBlogs] = useState([])
  return (
    <BlogContext.Provider value={[blogs,setBlogs]}>
        {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => useContext(BlogContext)