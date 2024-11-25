import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Container, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Typography, Paper, Button, Box, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import instance from '../../services/AxiosOder';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        background: {
            default: '#121212', // Default dark background
            paper: '#1d1d1d',
        },
        text: { primary: '#ffffff', secondary: '#b0bec5' },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ExpensiveTable() {
    const [expensive, setExpensive] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const userid = localStorage.getItem('expensive-id');
        if (userid) {
            getData(userid);
        }
    }, []);

    const getData = (userId) => {
        instance.get(`expens/get/${userId}`)
            .then((res) => setExpensive(res.data))
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        instance.delete(`/expens/delete/${id}`)
            .then(() => {
                const userid = localStorage.getItem('expensive-id');
                if (userid) getData(userid);
                setSnackbarMessage('Item deleted successfully!');
                setOpenSnackbar(true);
            })
            .catch((err) => {
                console.error(err);
                setSnackbarMessage('Failed to delete item. Please try again.');
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                width: '100%',
                // py: 8,
                margin: 0,
                padding: 0,
                background: 'linear-gradient(135deg, #2c3e50, #3b3b98, #2b5876, #1c2833)',
                backgroundSize: 'cover',
                minHeight: '100vh',
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <Container maxWidth="lg" sx={{ pt: 3, backgroundColor: 'transparent' }}>
                    <Box sx={{ textAlign: 'center', pb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: darkTheme.palette.primary.main,
                                background: 'linear-gradient(45deg, #90caf9, #f48fb1)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 600,
                                letterSpacing: 1.2,

                            }}
                        >
                            Transaction Data
                        </Typography>
                    </Box>

                    <TableContainer component={Paper} sx={{ backgroundColor: darkTheme.palette.background.paper }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>No</TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Category</TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Amount</TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expensive.map((val, index) => (
                                    <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                        <TableCell align="center" sx={{ color: 'text.secondary' }}>{index + 1}</TableCell>
                                        <TableCell align="center" sx={{ color: 'text.secondary' }}>{val.category}</TableCell>
                                        <TableCell align="center" sx={{ color: 'text.secondary' }}>{val.amount}</TableCell>
                                        <TableCell align="center" sx={{ color: 'text.secondary' }}>{val.date}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleDelete(val.id)}
                                                sx={{ color: 'secondary.main', borderColor: 'secondary.main' }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

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
        </Box>
    );
}

export default ExpensiveTable;
