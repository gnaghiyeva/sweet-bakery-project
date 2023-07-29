import React, { useContext, useState,createContext } from 'react'

const SkillContext = createContext();

export const SkillContextProvider = ({children}) => {
    const [skills,setSkills] = useState([])
  return (
    <SkillContext.Provider value={[skills,setSkills]}>
        {children}
    </SkillContext.Provider>
  )
}

export const useSkillContext = () => useContext(SkillContext)