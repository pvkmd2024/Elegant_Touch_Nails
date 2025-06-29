import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupIcon from "@mui/icons-material/Group";
import ScheduleIcon from "@mui/icons-material/Schedule";

export default function Navigation() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth(false);
    handleClose();
  };

  const handleLogin = () => {
    setAuth(true);
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Link to="/clients" style={linkStyle}>
            <GroupIcon sx={{ marginRight: 1 }} /> Clients
          </Link>
          <Link to="/services" style={linkStyle}>
            <HomeIcon sx={{ marginRight: 1 }} /> Services
          </Link>
          <Link to="/appointments" style={linkStyle}>
            <ScheduleIcon sx={{ marginRight: 1 }} /> Appointments
          </Link>
          <Link to="/payments" style={linkStyle}>
            <PaymentsIcon sx={{ marginRight: 1 }} /> Payments
          </Link>
          <Link to="/staff" style={linkStyle}>
            <PersonIcon sx={{ marginRight: 1 }} /> Staff
          </Link>
          <Link to="/staff-schedule" style={linkStyle}>
            <ScheduleIcon sx={{ marginRight: 1 }} /> Staff Schedule
          </Link>

          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <MenuItem onClick={handleLogin} sx={{ color: "white", cursor: "pointer", marginLeft: 2 }}>
              Login
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Updated inline styling for links: bigger and bold font
const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: "30px",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.2rem",
};
