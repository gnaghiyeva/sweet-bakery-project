import React, { useContext, useState,createContext } from 'react'

const ContactContext = createContext();

export const ContactContextProvider = ({children}) => {
    const [datas,setDatas] = useState([])
  return (
    <ContactContext.Provider value={[datas,setDatas]}>
        {children}
    </ContactContext.Provider>
  )
}

export const useContactContext = () => useContext(ContactContext)