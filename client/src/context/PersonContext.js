import React, { useContext, useState,createContext } from 'react'

const PersonContext = createContext();

export const PersonContextProvider = ({children}) => {
    const [teams,setTeams] = useState([])
  return (
    <PersonContext.Provider value={[teams,setTeams]}>
        {children}
    </PersonContext.Provider>
  )
}

export const usePersonContext = () => useContext(PersonContext)