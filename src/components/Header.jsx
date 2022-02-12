import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../styles/styles.css';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar className='navbar-header'>
            <Link to='/'>
              <RestaurantIcon className='header-icon' />
            </Link>

            <Typography
              variant='h6'
              fontFamily="'Comfortaa', cursive;"
              color='#000000'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              <Link className='logo-link' to='/'>
                Cravin' It
              </Link>
            </Typography>

            <a
              href='https://github.com/Zrama19/food-app'
              target='_blank'
              rel='noreferrer'
            >
              <GitHubIcon className='socials-icon' />
            </a>
            <a
              href='https://www.linkedin.com/in/zarif-ramazanov-217a46156/'
              target='_blank'
              rel='noreferrer'
            >
              <LinkedInIcon className='socials-icon' />
            </a>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
