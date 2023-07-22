import React, { createContext, useContext, useEffect, useState } from 'react'

const AdminContext = createContext()
export const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
        useEffect(() => {
            if (localStorage.getItem('admin')) {
                setAdmin(JSON.parse(localStorage.getItem('admin')));
            }
        }, [])
        const values = [
            admin, setAdmin
        ]
  return (
    <AdminContext.Provider value={values}>
        {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = ()=>useContext(AdminContext)
