import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import { useAdminContext } from '../../context/AdminContext';
const Navbarr = () => {
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