
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import {auth} from '../../firebase/FireBase-config'

const NavBar = () => {
  let navigate = useNavigate();

  const LogOut = async () => {
    try {
      const res = await signOut(auth);
      localStorage.removeItem("uid");
      localStorage.removeItem("accessToken");
      localStorage.setItem("auth", "false");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
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
            WORKOUT TRACKER
          </Typography>
          <Button color="inherit"  onClick={()=>LogOut()}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar