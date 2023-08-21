import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import mainNavbarStyle from '../../style/mainNavbar.module.css'
import { getAllLogo } from '../../api/requests';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
const UserNavbar = () => {
    const [user, setUser] = useUserContext()

    console.log(user)
    const [logos, setLogos] = useState([])
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
          {['Home', 'Shop', 'News', 'Contact'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
      </Box>
    );
  
  return (

    <>
    {/* <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {user === null ? <>
            <Button color="inherit"><Link style={{color:'white', textDecoration:'none'}} to={'/login'}>Login</Link></Button>
          </> : <>
            <Navbar.Text>
              Signed in as: <p>{user.username}</p>
            </Navbar.Text>
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
          </>}


      
      </Toolbar>
    </AppBar>
  </Box> */}

  <nav className={mainNavbarStyle.main_nav}>

    
      <ul className={mainNavbarStyle.main_nav_left} >
        <Link  className={mainNavbarStyle.main_nav_item} to='/'>Home</Link>
        <Link className={mainNavbarStyle.main_nav_item} to='/'>Our Services</Link>
        <Link className={mainNavbarStyle.main_nav_item} to='/'>Works</Link>
       </ul> 
       
       {logos && logos.map((logo)=>(
          <div  style={{width:'15%'}}><img className={mainNavbarStyle.main_nav_logo} src={logo.image}/></div>
         
        ))} 
        <div className={mainNavbarStyle.logo_title}>Sweet Bakery</div>
        <ul className={mainNavbarStyle.main_nav_left} >
        <Link className={mainNavbarStyle.main_nav_item} to='/blog'>Blog</Link>
        <Link className={mainNavbarStyle.main_nav_item} to='/shop'>Shop</Link>
        <li className={mainNavbarStyle.main_nav_item}>Contact</li>
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
            <Button color="inherit"><Link style={{color:'black', textDecoration:'none'}} to={'/login'}>Login</Link></Button>
          </> : <>
            <Navbar.Text>
              Signed in as: <p>{user.username}</p>
            </Navbar.Text>
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
          </>}
          </div>
    
  </nav>
    </>
  )
}

export default UserNavbar