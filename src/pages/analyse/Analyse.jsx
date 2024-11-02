import React, { useState, useEffect } from 'react';
import instance from '../../services/AxiosOder';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Container } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: { primary: '#ffffff', secondary: '#b0bec5' },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default function Analyse() {
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('expensive-id');
        if (userId) {
            getData(userId);
        }
    }, []);

    const getData = (userId) => {
        instance.get(`expens/get/${userId}`)
            .then((res) => {
                const transformedData = transformData(res.data);
                setExpenseData(transformedData);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const transformData = (data) => {
        const categoryTotals = data.reduce((acc, item) => {
            const category = item.category;
            const amount = parseFloat(item.amount);
            acc[category] = (acc[category] || 0) + amount;
            return acc;
        }, {});

        return Object.keys(categoryTotals).map((category) => ({
            category,
            amount: categoryTotals[category],
        }));
    };

    const barChartData = {
        labels: expenseData.map((item) => item.category),
        datasets: [
            {
                label: 'Total Expense by Category',
                data: expenseData.map((item) => item.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieChartData = {
        labels: expenseData.map((item) => item.category),
        datasets: [
            {
                label: 'Expense Distribution',
                data: expenseData.map((item) => item.amount),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    py: 8,
                    background: 'linear-gradient(135deg, #2c3e50, #3b3b98, #2b5876, #1c2833)',
                    minHeight: '100vh',
                    width:'100%'
                }}
            >
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
                            Expense Analysis
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6 }}>
                        <Box sx={{ width: { xs: '100%', sm: '600px' }, margin: '0 auto' }}>
                            <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                        </Box>

                        <Box sx={{ width: { xs: '100%', sm: '400px' }, margin: '20px auto' }}>
                            <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
