import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import { useAdminContext } from '../../context/AdminContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import WebStoriesIcon from '@mui/icons-material/WebStories';
const Navbarr = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' ? '' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Logo', 'Sliders', 'pricingStrategy','Films', 'Contact', 'Services', 'Streamings', 'blogs','contactUsers'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>

               
                {text === 'Logo' ? <Link to='logo'><CameraAltIcon/></Link> : ''}
                {text === 'Sliders' ? <Link to='sliders'><WebStoriesIcon/></Link> : ''}
                {text === 'pricingStrategy' ? <Link to='pricingStrategy'></Link> : ''}
                {text === 'Films' ? <Link to='films'></Link> : ''}
                {text === 'Contact' ? <Link to='contact'></Link> : ''}
                {text === 'Services' ? <Link to='services'></Link> : ''}
                {text === 'Streamings' ? <Link to='streamings'></Link> : ''}
                {text === 'blogs' ? <Link to='blogs'></Link> : ''}
                {text === 'contactUsers' ? <Link to='contactUsers'></Link> : ''}

              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </Box>
  )
  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const [admin, setAdmin] = useAdminContext()
  console.log(admin)
  const navigate = useNavigate();


  return (
    <Navbar style={{ backgroundColor: 'rgb(248,154,174)' }}>
       <div>
        {['|||'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {admin === null ? <>
            <Link to="/admin/login">Login Admin</Link>
          </> : <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={admin.image} />
              </IconButton>
            </Tooltip>
            {admin && <>
              <Button onClick={async () => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('admin');
                await setAdmin(null);
                // await setUser("");

                navigate('/admin/login')
                // navigate("http://localhost:3000/admin")
              }} color="inherit">
                Logout
              </Button>
            </>}
          </>}

        </Navbar.Collapse>

        {/* <Nav.Link href="#link"><Link>Add Slider</Link></Nav.Link> */}
      </Container>
    </Navbar>
  )
}

export default Navbarr


{/* <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={user.image} />
                            </IconButton>
                        </Tooltip> */}