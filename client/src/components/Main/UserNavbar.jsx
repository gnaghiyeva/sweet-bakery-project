import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import mainNavbarStyle from '../../style/mainNavbar.module.css'
import { getAllLogo } from '../../api/requests';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';


const UserNavbar = () => {
  const [user, setUser] = useUserContext()

  const [logos, setLogos] = useState([])
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLogo().then((res) => {
      setLogos(res.data)
      console.log(res.data)
    })
  }, [])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
        <ListItem button onClick={() => handleNavigation('/')}>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            <span style={{fontFamily:'Lobster'}}>HOME</span>
          </Link>
        </ListItem>

        <ListItem onClick={() => handleNavigation('/shop')}>
          <span style={{fontFamily:'Lobster'}}>SHOP</span>
        </ListItem>

        <ListItem onClick={() => handleNavigation('/blog')}>
          <span style={{fontFamily:'Lobster'}}>BLOG</span>
        </ListItem>

        <ListItem onClick={() => handleNavigation('/contact')}>
          <span style={{fontFamily:'Lobster'}}>CONTACT</span>
        </ListItem>
      </List>
      <Divider />

    </Box>
  );

  return (

    <>
      <nav className={mainNavbarStyle.main_nav}>


        <ul className={mainNavbarStyle.main_nav_left} >
          <Link className={mainNavbarStyle.main_nav_item} to='/'>Home</Link>
          <Link className={mainNavbarStyle.main_nav_item} to='/'>Our Services</Link>
          <Link className={mainNavbarStyle.main_nav_item} to='/'>Works</Link>
        </ul>

        {logos && logos.map((logo) => (
          <div style={{ width: '15%' }}><img className={mainNavbarStyle.main_nav_logo} src={logo.image} alt='logoImage' /></div>

        ))}
        <div className={mainNavbarStyle.logo_title}>Sweet Bakery</div>
        <ul className={mainNavbarStyle.main_nav_left} >
          <Link className={mainNavbarStyle.main_nav_item} to='/blog'>Blog</Link>
          <Link className={mainNavbarStyle.main_nav_item} to='/shop'>Shop</Link>
          <Link className={mainNavbarStyle.main_nav_item} to='/contact'>Contact</Link>
        </ul>

        <div className={mainNavbarStyle.hamburger_menu} >
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <MenuIcon onClick={toggleDrawer(anchor, true)} />
              <Button ></Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>
        <div>
          {user === null ? <>
            <Button color="inherit"><Link style={{ color: 'black', textDecoration: 'none' }} to={'/login'}>Login</Link></Button>
          </> : <>
            <div style={{ display: 'flex', alignItems: 'center' }}>



              <Navbar.Text>
                <Avatar alt="Remy Sharp" src={user.image} />
                <p>{user.username}</p>
              </Navbar.Text>
              <div style={{ marginTop: '-12px' }}>
                {user && <>
                  <Button onClick={async () => {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('user');
                    await setUser(null);
                    // await setUser("");

                    navigate('/login')
                    // navigate("http://localhost:3000/admin")
                  }} color="inherit">
                    Logout
                  </Button>

                </>}
              </div>


            </div>



          </>}

        </div>

      </nav>
    </>
  )
}

export default UserNavbar