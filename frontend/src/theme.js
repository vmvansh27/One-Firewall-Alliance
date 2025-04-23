// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // SentinelOne uses both modes, we can switch later if needed
        primary: {
            main: '#0d47a1', // a strong blue (adjust if needed)
        },
        secondary: {
            main: '#00bcd4', // cyan type secondary color
        },
        background: {
            default: '#f4f6f8', // very light gray background
            paper: '#ffffff',  // cards and navbar background
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                },
            },
        },
    },
});

export default theme;
