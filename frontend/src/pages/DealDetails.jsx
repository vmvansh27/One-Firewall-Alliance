import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Divider, Stack, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const DealDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDealDetails();
    }, []);

    const fetchDealDetails = async () => {
        try {
            const res = await API.get(`/deals/${id}`);
            setDeal(res.data);
        } catch (error) {
            console.error("Error fetching deal details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!deal) {
        return (
            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Typography variant="h6">Deal not found</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
                px: 2,
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    backgroundColor: "#f9fafb",
                    maxWidth: 700,
                    width: "100%",
                }}
            >
                {/* Back Button */}
                <Button
                    variant="contained"
                    onClick={() => navigate(-1)}
                    sx={{
                        mb: 3,
                        backgroundColor: "#172744",
                        ":hover": { backgroundColor: "#0f1a2f" },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                    }}
                >
                    Back
                </Button>

                {/* Heading */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                    color="#172744"
                    textAlign="center"
                >
                    Deal Details
                </Typography>

                {/* Deal Info */}
                <Stack spacing={4}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#172744"
                        textAlign="center"
                    >
                        {deal.customerName}
                    </Typography>

                    <Divider sx={{ borderColor: "#172744", mb: 2 }} />

                    {/* Field List */}
                    <Stack spacing={2.8}> {/* <-- increased spacing */}
                        <DetailItem label="Contact" value={`${deal.firstName} ${deal.lastName}`} />
                        <DetailItem label="Email" value={deal.email} />
                        <DetailItem label="Phone" value={deal.phone || "-"} />
                        <DetailItem label="Job Title" value={deal.jobTitle || "-"} />
                        <DetailItem label="Country" value={deal.mailingCountry} />
                        <DetailItem label="City" value={deal.mailingCity} />
                        <DetailItem label="Address" value={deal.address || "-"} />
                        <DetailItem label="Partner Sales Rep" value={deal.partnerSalesRep || "-"} />
                        <DetailItem label="Partner SE" value={deal.partnerSE || "-"} />
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

// Label is bold, value is normal
const DetailItem = ({ label, value }) => (
    <Typography variant="h6" color="text.primary">
        <Box component="span" fontWeight="bold">{label}:</Box> {value}
    </Typography>
);

export default DealDetails;
