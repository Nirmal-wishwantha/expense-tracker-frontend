import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const Test = () => {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: '#3f51b5', // Primary color
        color: 'white',
        height: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ color: '#ffeb3b' }}>My App</h2> {/* Title color */}
      <Divider sx={{ bgcolor: 'white' }} />
      <List>
        <ListItem 
          button 
          component={NavLink} 
          to="/" 
          exact 
          activeStyle={{ backgroundColor: '#ff5722', color: 'white' }} // Active link styles
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem 
          button 
          component={NavLink} 
          to="/about" 
          activeStyle={{ backgroundColor: '#ff5722', color: 'white' }} // Active link styles
        >
          <ListItemText primary="About" />
        </ListItem>
        <ListItem 
          button 
          component={NavLink} 
          to="/services" 
          activeStyle={{ backgroundColor: '#ff5722', color: 'white' }} // Active link styles
        >
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem 
          button 
          component={NavLink} 
          to="/contact" 
          activeStyle={{ backgroundColor: '#ff5722', color: 'white' }} // Active link styles
        >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Test;