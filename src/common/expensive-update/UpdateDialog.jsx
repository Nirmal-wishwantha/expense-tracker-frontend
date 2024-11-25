import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, TextField, Typography, Button, Box, MenuItem, Snackbar } from '@mui/material';
import instance from '../../services/AxiosOder';
import MuiAlert from '@mui/material/Alert';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateDialog() {
  const [userId, setUserId] = useState();
  const [formData, setFormData] = useState({
    category: '',
    amount: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('expensive-id');
    setUserId(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpensive();
  };

  const addExpensive = () => {
    const data = {
      userId: userId,
      category: formData.category,
      amount: formData.amount
    };

    instance.post(`expens/update/${id}`, data)
      .then((res) => {
        console.log(res);
        // Reset form data
        setFormData({ category: '', amount: '' });
        setSnackbarMessage('Expense Update successfully!');
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage('Failed to Update expense. Please try again.');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
         Update Details
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: 'background.paper',
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <TextField
            select
            label="Category"
            variant="outlined"
            name="category"
            fullWidth
            value={formData.category}
            onChange={handleChange}
            required
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="transport">Transport</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            label="Amount"
            variant="outlined"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>

        <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          
          <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </Container>
    </ThemeProvider>
  );
}

export default UpdateDialog;
