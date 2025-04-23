import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

function HomePage() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.name) {
            setUserName(user.name);
        }
    }, []);

    return (
        <Box>
            <Navbar />
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Welcome {userName}
                </Typography>
                <Typography variant="h6">
                    Welcome to partner portal.
                </Typography>
                {/* Add any dashboard widgets, stats, etc. here later */}
            </Box>
        </Box>
    );
}

export default HomePage;
