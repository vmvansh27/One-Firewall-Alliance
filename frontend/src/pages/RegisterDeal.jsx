import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
    Container,
    Paper,
} from "@mui/material";
import API from "../api/axios";

const RegisterDeal = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        phone: "",
        customerName: "",
        mailingCountry: "",
        address: "",
        mailingCity: "",
        partnerSalesRep: "Jasmeet Bajaj",
        partnerSE: "Jasmeet Bajaj",
    });

    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        let tempErrors = {};
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "jobTitle",
            "customerName",
            "mailingCountry",
            "address",
            "mailingCity",
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                tempErrors[field] = "This field is required";
            }
        });

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await API.post("/deals", formData);
                console.log("Deal submitted successfully:", res.data);
                setSnackbarOpen(true);

                // Reset form after successful submission
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    jobTitle: "",
                    phone: "",
                    customerName: "",
                    mailingCountry: "",
                    address: "",
                    mailingCity: "",
                    partnerSalesRep: "Jasmeet Bajaj",
                    partnerSE: "Jasmeet Bajaj",
                });
            } catch (error) {
                console.error("Error submitting deal:", error);
                alert(error.response?.data?.message || "Submission failed");
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#172744",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 5,
            }}
        >
            <Container maxWidth="md">
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={4}
                        align="center"
                        sx={{ color: "#172744" }}
                    >
                        Register New Deal
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {/* End Customer Contact Information */}
                        <Box mb={4}>
                            <Typography variant="h6" mb={2} sx={{ color: "#172744" }}>
                                End Customer Contact Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="firstName"
                                        label="First Name *"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="lastName"
                                        label="Last Name *"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="email"
                                        label="Email *"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="jobTitle"
                                        label="Job Title *"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        error={!!errors.jobTitle}
                                        helperText={errors.jobTitle}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="phone"
                                        label="Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* End Customer Company Information */}
                        <Box mb={4}>
                            <Typography variant="h6" mb={2} sx={{ color: "#172744" }}>
                                End Customer Company Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="customerName"
                                        label="Customer Name *"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        error={!!errors.customerName}
                                        helperText={errors.customerName}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="mailingCountry"
                                        label="Mailing Country *"
                                        value={formData.mailingCountry}
                                        onChange={handleChange}
                                        error={!!errors.mailingCountry}
                                        helperText={errors.mailingCountry}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="address"
                                        label="Address *"
                                        value={formData.address}
                                        onChange={handleChange}
                                        error={!!errors.address}
                                        helperText={errors.address}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="mailingCity"
                                        label="Mailing City *"
                                        value={formData.mailingCity}
                                        onChange={handleChange}
                                        error={!!errors.mailingCity}
                                        helperText={errors.mailingCity}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Partner Info */}
                        <Box mb={4}>
                            <Typography variant="h6" mb={2} sx={{ color: "#172744" }}>
                                Partner Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Partner Sales Rep</InputLabel>
                                        <Select
                                            name="partnerSalesRep"
                                            value={formData.partnerSalesRep}
                                            onChange={handleChange}
                                            label="Partner Sales Rep"
                                        >
                                            <MenuItem value="Jasmeet Bajaj">Jasmeet Bajaj</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Partner SE</InputLabel>
                                        <Select
                                            name="partnerSE"
                                            value={formData.partnerSE}
                                            onChange={handleChange}
                                            label="Partner SE"
                                        >
                                            <MenuItem value="Jasmeet Bajaj">Jasmeet Bajaj</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: "#172744",
                                "&:hover": {
                                    backgroundColor: "#0f1b30",
                                },
                                py: 1.5,
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Submit Deal
                        </Button>
                    </form>

                    {/* Snackbar for success */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
                            Deal submitted successfully!
                        </Alert>
                    </Snackbar>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterDeal;
