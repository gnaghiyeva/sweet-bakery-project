import React from 'react'

import { Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import Navbar from '../../components/Main/UserNavbar'
import UserLogin from './UserLogin'

const MainRoot = () => {
  const [user] = useUserContext()
  return (
<>
    {/* <Navbarr/>
    <Outlet/> */}
    <>
   {
    !user?.isAdmin ? (
      <>
      <Navbar/>
      <Outlet/>
      </>
    ) : (
      <UserLogin/>
    )
   }
   </>
   </>
  )
}

export default MainRoot