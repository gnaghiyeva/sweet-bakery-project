import React, { useContext, useState,createContext } from 'react'

const ProgressContext = createContext();

export const ProgressContextProvider = ({children}) => {
    const [progress,setProgress] = useState([])
  return (
    <ProgressContext.Provider value={[progress,setProgress]}>
        {children}
    </ProgressContext.Provider>
  )
}

export const useProgressContext = () => useContext(ProgressContext)