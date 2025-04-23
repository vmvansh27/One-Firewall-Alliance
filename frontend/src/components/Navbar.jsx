import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

const Dropdown = ({ title, items }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {title}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {items.map(({ label, to }) => (
                    <MenuItem
                        key={label}
                        component={Link}
                        to={to}
                        onClick={() => setAnchorEl(null)}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#172744", color: "#e8e8e8", padding: "2% 0 2% 0" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* <Typography variant="h6" component="div">
                    🛡️ Backup Portal
                </Typography> */}
                <img src={Logo} alt="logo"></img>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Dropdown
                        title="Program"
                        items={[
                            { label: "Overview", to: "/program/overview" },
                            { label: "Benefits", to: "/program/benefits" },
                        ]}
                    />
                    <Dropdown
                        title="Sales"
                        items={[
                            { label: "Sales Toolkit", to: "/sales/toolkit" },
                            { label: "Pipeline", to: "/sales/pipeline" },
                        ]}
                    />
                    <Dropdown
                        title="Marketing"
                        items={[
                            { label: "Campaigns", to: "/marketing/campaigns" },
                            { label: "Resources", to: "/marketing/resources" },
                        ]}
                    />
                    <Dropdown
                        title="Technical"
                        items={[
                            { label: "Docs", to: "/technical/docs" },
                            { label: "Support", to: "/technical/support" },
                        ]}
                    />
                    <Dropdown
                        title="Opps and Leads"
                        items={[
                            { label: "Register Deal", to: "/home/opps/register" },
                            { label: "View Registered Deals", to: "/home/opps/registered" },
                            { label: "View Opportunities", to: "/home/opps/opportunities" },

                        ]}
                    />
                    <Button component={Link} to="/university" color="inherit">
                        Partner University
                    </Button>
                    <Button component={Link} to="/assets" color="inherit">
                        Assets
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;