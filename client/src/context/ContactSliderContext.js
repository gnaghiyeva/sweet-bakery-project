import React, { useContext, useState,createContext } from 'react'

const ContactSliderContext = createContext();

export const ContactSliderContextProvider = ({children}) => {
    const [sliders,setSliders] = useState([])
  return (
    <ContactSliderContext.Provider value={[sliders,setSliders]}>
        {children}
    </ContactSliderContext.Provider>
  )
}

export const useContactSliderContext = () => useContext(ContactSliderContext)