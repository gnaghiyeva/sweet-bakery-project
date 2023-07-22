import React from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const UserNavbar = () => {
    const [user, setUser] = useUserContext()
    console.log(user)
    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
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
  </Box>
  )
}

export default UserNavbar