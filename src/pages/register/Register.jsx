import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar, Link } from '@mui/material';
import { Email, Password, PersonAdd } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import instance from '../../services/AxiosOder';
import { toast } from 'react-toastify'; 


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00acc1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0f7fa',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function Register() {

  const navigation = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const [name,setName]=useState();


  const userRegister = () => {

    const data = {
      name: name,
      email: email,
      password: password
    }

    instance.post('/user/register', data)
      .then((res) => {
        console.log(res);


        toast.success("Registration Successful! You have registered successfully.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
        });

        setTimeout(() => {
          navigation('/login');
        }, 2000);
      })

      .catch((err) => {
        console.log(err);

        toast.error("Registration Failed! Please try again later.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
        });



      })
  }


  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(135deg, #1e1e1e, #0d47a1)',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            maxWidth: 400,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            color: 'text.primary',
            animation: 'fadeIn 1.5s ease',
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', animation: 'spin 3s linear infinite' }}>
              <PersonAdd />
            </Avatar>
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { color: 'text.primary' } }}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { color: 'text.primary' } }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { color: 'text.primary' } }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { color: 'text.primary' } }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, animation: 'pulse 2s infinite' }}
            onClick={userRegister}
          >
            Register
          </Button>


          <Typography align="center" mt={2}>
            Already registered?{' '}
            <Link component={RouterLink} to="/login" color="primary">
              Go to Login
            </Link>
          </Typography>
        </Paper>
      </Box>

      {/* Add keyframes for animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </ThemeProvider>
  );
}
