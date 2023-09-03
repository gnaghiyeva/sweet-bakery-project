import React from 'react'

import { Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import Navbar from '../../components/Main/UserNavbar'
import UserLogin from './UserLogin'
import Footer from '../../components/Main/Footer'

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
              <Navbar />
              <Outlet />
              <Footer />
            </>
          ) : (
            <UserLogin />
          )
        }
      </>
    </>
  )
}

export default MainRoot