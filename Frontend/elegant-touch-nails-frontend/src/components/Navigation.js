import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
  const { role, accessLevel, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "blue" }} elevation={4}>

        <Toolbar>
          {/* Manager Links */}
          {accessLevel === "Manager" && (
            <>
              <Link to="/clients-list" style={{ color: "black", fontSize: "20px" }}>
                Clients
              </Link>

              <Link to="/clients-list" style={{ linkStyle, border: "1px solid red" }}><GroupIcon sx={{ marginRight: 1 }} /> Clients</Link>
              <Link to="/staff-list" style={linkStyle}><PersonIcon sx={{ marginRight: 1 }} /> Staff</Link>
              <Link to="/staff-schedule-list" style={linkStyle}><ScheduleIcon sx={{ marginRight: 1 }} /> Staff Schedule</Link>
              <Link to="/appointments-list" style={linkStyle}><ScheduleIcon sx={{ marginRight: 1 }} /> Appointments</Link>
              <Link to="/services-list" style={linkStyle}><HomeIcon sx={{ color: "white", fontSize: 40, marginRight: 1 }} /> Services</Link>
              <Link to="/payments-list" style={linkStyle}><PaymentsIcon sx={{ marginRight: 1 }} /> Payments</Link>
            </>
          )}

          {/* Staff Links */}
          {accessLevel === "Staff" && (
            <>
              <Link to="/services-list" style={linkStyle}><HomeIcon sx={{ marginRight: 1 }} /> Services</Link>
              <Link to="/appointments-list" style={linkStyle}><ScheduleIcon sx={{ marginRight: 1 }} /> Appointments</Link>
              <Link to="/staff-schedule-list" style={linkStyle}><ScheduleIcon sx={{ marginRight: 1 }} /> Staff Schedule</Link>
              <Link to="/payments-form" style={linkStyle}><PaymentsIcon sx={{ marginRight: 1 }} /> Payments</Link>
            </>
          )}

          {/* Client Links */}
          {accessLevel === "Client" && (
            <>
              <Link to="/services-list" style={linkStyle}><HomeIcon sx={{ marginRight: 1 }} /> Services</Link>
              <Link to="/appointments-form" style={linkStyle}><ScheduleIcon sx={{ marginRight: 1 }} /> Appointments</Link>
              <Link to="/payments-form" style={linkStyle}><PaymentsIcon sx={{ marginRight: 1 }} /> Payments</Link>
              <Link to="/clients-form" style={linkStyle}><GroupIcon sx={{ marginRight: 1 }} /> Clients</Link>
            </>
          )}

          {/* Login / Profile Dropdown */}
          {role ? (
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
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <MenuItem
              onClick={() => navigate("/login")}
              sx={{ color: "white", cursor: "pointer", marginLeft: 2 }}
            >
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Link styles
const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: "30px",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.2rem",
};
