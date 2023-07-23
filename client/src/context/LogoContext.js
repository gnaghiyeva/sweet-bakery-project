import React, { createContext, useContext, useState } from 'react'

const LogoContext = createContext();
export const LogoContextProvider = ({children}) => {
    const [logos,setLogos] = useState([])
  return (
    <LogoContext.Provider value={[logos,setLogos]}>
        {children}
    </LogoContext.Provider>
  )
}

export const useLogoContext = ()=> useContext(LogoContext)