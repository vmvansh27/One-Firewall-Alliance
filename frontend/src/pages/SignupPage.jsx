import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper, Link } from "@mui/material";
import API from "../api/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/signup", formData);
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#172744',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
                    {/* <Typography
                        variant="h6"
                        mb={2}
                        align="center"
                        sx={{ color: '#172744', fontWeight: 'bold' }}
                    >
                        New User? Create Your Account
                    </Typography> */}
                    <Typography
                        variant="h4"
                        mb={3}
                        align="center"
                        sx={{ color: '#172744', fontWeight: 'bold' }}
                    >
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: '#172744',
                                '&:hover': {
                                    backgroundColor: '#0f1b30',
                                },
                                py: 1.5,
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}
                        >
                            Signup
                        </Button>
                    </form>

                    {/* Link to Login */}
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Already have an account?{" "}
                            <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 'bold', color: '#172744' }}>
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SignupPage;
