import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegisterDeal from '../pages/RegisterDeal';
import ViewRegisteredDeals from '../pages/ViewRegisteredDeals';
import ViewOpportunities from '../pages/ViewOpportunities';

function DashboardLayout() {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
            <Navbar />
            <Box component="main" sx={{ p: 3, mt: 8 }}>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="opps/register" element={<RegisterDeal />} />
                    <Route path="opps/registered" element={<ViewRegisteredDeals />} />
                    <Route path="opps/opportunities" element={<ViewOpportunities />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default DashboardLayout;
