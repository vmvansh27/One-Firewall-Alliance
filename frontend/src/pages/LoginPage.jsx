import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper, Link } from "@mui/material";
import API from "../api/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // alert("Login successful!");
            navigate("/home");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Login failed.");
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
                    <Typography
                        variant="h6"
                        mb={2}
                        align="center"
                        sx={{ color: '#172744', fontWeight: 'bold' }}
                    >
                        Already a Member?
                    </Typography>
                    <Typography
                        variant="h6"
                        mb={2}
                        align="center"
                        sx={{ color: '#172744', fontWeight: 'bold' }}
                    >
                        Login Now!
                    </Typography>
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </Button>
                    </form>

                    {/* Signup Link */}
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            New here?{" "}
                            <Link component={RouterLink} to="/signup" underline="hover" sx={{ fontWeight: 'bold', color: '#172744' }}>
                                Create an account
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
