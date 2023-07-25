import React, { useContext, useState,createContext } from 'react'

const WorkContext = createContext();

export const ServiceContextProvider = ({children}) => {
    const [works,setWorks] = useState([])
  return (
    <WorkContext.Provider value={[works,setWorks]}>
        {children}
    </WorkContext.Provider>
  )
}

export const useWorksContext = () => useContext(WorkContext)