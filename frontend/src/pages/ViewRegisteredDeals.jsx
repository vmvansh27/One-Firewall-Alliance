import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const ViewRegisteredDeals = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("pending"); // default view
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const isAdmin = user.role === "admin";

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            const res = await API.get("/deals");
            setDeals(res.data);
        } catch (error) {
            console.error("Error fetching deals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (dealId) => {
        try {
            await API.put(`/deals/${dealId}/approve`);
            setDeals((prev) =>
                prev.map((deal) =>
                    deal._id === dealId ? { ...deal, status: "approved" } : deal
                )
            );
        } catch (error) {
            console.error("Error approving deal:", error);
        }
    };

    const handleDisapprove = async (dealId) => {
        try {
            await API.put(`/deals/${dealId}/deny`);
            setDeals((prev) =>
                prev.map((deal) =>
                    deal._id === dealId ? { ...deal, status: "denied" } : deal
                )
            );
        } catch (error) {
            console.error("Error denying deal:", error);
        }
    };

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) setFilter(newFilter);
    };

    const filteredDeals = deals.filter((deal) => deal.status === filter);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={4} color="#172744">
                Registered Deals
            </Typography>

            {/* Filter Tabs */}
            <Stack direction="row" spacing={2} mb={4}>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    color="primary"
                >
                    <ToggleButton value="pending" sx={{ textTransform: "none" }}>
                        Pending Leads
                    </ToggleButton>
                    <ToggleButton value="approved" sx={{ textTransform: "none" }}>
                        Approved Leads
                    </ToggleButton>
                    <ToggleButton value="denied" sx={{ textTransform: "none" }}>
                        Denied Leads
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            {filteredDeals.length > 0 ? (
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell><strong>Customer Name</strong></TableCell>
                                <TableCell><strong>Contact Person</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Phone</strong></TableCell>
                                <TableCell><strong>Country</strong></TableCell>
                                <TableCell><strong>City</strong></TableCell>
                                {filter === "pending" && isAdmin && (
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredDeals.map((deal) => (
                                <TableRow
                                    key={deal._id}
                                    hover
                                    onClick={() => navigate(`/deals/${deal._id}`)}
                                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f9f9f9" } }}
                                >
                                    <TableCell>{deal.customerName}</TableCell>
                                    <TableCell>{deal.firstName} {deal.lastName}</TableCell>
                                    <TableCell>{deal.email}</TableCell>
                                    <TableCell>{deal.phone || "-"}</TableCell>
                                    <TableCell>{deal.mailingCountry}</TableCell>
                                    <TableCell>{deal.mailingCity}</TableCell>

                                    {filter === "pending" && isAdmin && (
                                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                sx={{ mr: 1 }}
                                                onClick={() => handleApprove(deal._id)}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDisapprove(deal._id)}
                                            >
                                                Disapprove
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" sx={{ mt: 4 }}>
                    No {filter} deals found.
                </Typography>
            )}
        </Box>
    );
};

export default ViewRegisteredDeals;
