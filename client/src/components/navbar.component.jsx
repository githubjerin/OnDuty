import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faBell } from '@fortawesome/free-solid-svg-icons';
import "./res/styles.css";
import axios from "axios";
import { Primary } from './res/themes.js';

export default function Navbar() {
  const [name, setName] = React.useState(' ');

  async function getName() {
    await axios.get('http://localhost:2003/' + sessionStorage.getItem('user') + '/get-details', { withCredentials: true })
              .then((res) => {
                setName(res.data.name);
              });
  }

  async function logout() {
    await axios.get('http://localhost:2003/logout', {}, { withCredentials: true })
              .then((res) => {
                window.location = '/';
              });
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.setItem('user', 'none');
  }

  React.useState(() => {
    getName();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, width: 1.0 }}>
      <AppBar position="static" sx={{ bgcolor: Primary['navbar-bg'] }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {name}
          </Typography>
          <div className='navbar-icon'>
            <i><FontAwesomeIcon icon={faFilter} size='xl' onClick={() => {alert('soon')}}/></i>
            <i><FontAwesomeIcon icon={faBell} size='xl' onClick={() => {alert('soon')}}/></i>
          </div>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}