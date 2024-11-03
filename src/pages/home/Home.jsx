import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import routes from '../../common/navigation/routes'; // Ensure this path is correct
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import FirstPageIcon from '@mui/icons-material/FirstPage';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: '#121212', // Dark background for AppBar
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const logout = () => {
    localStorage.removeItem('expensive-token');
    window.location.reload();
  };

  const getRoutes = () =>
    routes.map((val, index) => (
      <Route key={index} path={val.path} element={val.Element} icon={val.icon} />
    ));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />

          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Persistent Drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e1e1e', // Dark background for Drawer
            color: '#ffffff',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h6">Menu</Typography>
          </Box>

          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <FirstPageIcon />
          </IconButton>

        </DrawerHeader>

        <Divider sx={{ backgroundColor: '#424242' }} />

        <List>
          {routes.map((val, index) => (
            <Link key={index} to={val.path} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#ffffff' }}>{val.icon}</ListItemIcon>
                  <ListItemText primary={val.text} sx={{ color: '#ffffff' }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}


          <Box sx={{justifyContent:'center',display:'flex',margin:1}}> 

            <Button 
            variant="contained" 
            endIcon={<LogoutIcon />} 
            sx={{backgroundColor:'#b30000'}}
            onClick={logout}
            >
              Log out
            </Button>
          </Box>


        </List>

      </Drawer>



      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="*" element={<Navigate to={'/ExpensiveTable'} />} />
          {getRoutes()}
        </Routes>
      </Main>

    </Box>
  );
}