import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Snackbar from '@mui/material/Snackbar';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupIcon from "@mui/icons-material/Group";
import ScheduleIcon from "@mui/icons-material/Schedule";

export default function Navigation() {
  const { authState, logout } = useContext(AuthContext);
  console.log("AuthState in Navigation:", authState); // ✅ Add this line here
  const { role } = authState;
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // Define nav items based on role
  const navItems = {
    Manager: [
      { to: "/clients-list", label: "Clients", icon: <GroupIcon /> },
      { to: "/staff-list", label: "Staff", icon: <PersonIcon /> },
      { to: "/staff-schedule-list", label: "Staff Schedule", icon: <ScheduleIcon /> },
      { to: "/appointments-list", label: "Appointments", icon: <ScheduleIcon /> },
      { to: "/services-list", label: "Services", icon: <HomeIcon /> },
      { to: "/payments-list", label: "Payments", icon: <PaymentsIcon /> },
    ],
    Staff: [
      { to: "/services-list", label: "Services", icon: <HomeIcon /> },
      { to: "/appointments-list", label: "Appointments", icon: <ScheduleIcon /> },
      { to: "/staff-schedule-list", label: "Staff Schedule", icon: <ScheduleIcon /> },
    ],
    Client: [
      { to: "/services-list", label: "Services", icon: <HomeIcon /> },
    ],
  };

  const itemsToRender = navItems[role] || [];
  if (!itemsToRender.length && role) {
    console.warn("⚠️ No nav items for role:", role);
  }

 const handleGoToDashboard = () => {
  console.log("Redirecting to dashboard for role:", role);
  if (role === "Manager") {
    navigate("/managers-dashboard");
  } else if (role === "Client") {
    navigate("/clients-dashboard");
  } else if (role === "Staff") {
    navigate("/staff-dashboard");
  } else {
    navigate("/login");
  }
  setSnackbarOpen(true);
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#5c067d" }} elevation={4}>
        <Toolbar>
          {/* Mobile Menu */}
          {isMobile && role && (
            <>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 250, backgroundColor: "#fafafa", height: "100%" }} role="presentation" onClick={toggleDrawer}>
                  <List>
                    {itemsToRender.map((item) => (
                      <ListItem
                        button
                        key={item.to}
                        component={Link}
                        to={item.to}
                        selected={location.pathname === item.to}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}

          {/* Desktop Links */}
          {!isMobile && role && itemsToRender.map((item) => (
            <Tooltip title={item.label} key={item.to} arrow>
              <Link
                to={item.to}
                style={{
                  ...linkStyle,
                  ...(location.pathname === item.to ? activeLinkStyle : {}),
                }}
              >
                {item.icon}
                <span style={{ marginLeft: 6 }}>{item.label}</span>
              </Link>
            </Tooltip>
          ))}

          {/* Spacer */}
          <Tooltip title="Go to Dashboard">
  <IconButton color="inherit" onClick={handleGoToDashboard}>
    <DashboardIcon />
  </IconButton>
</Tooltip>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message="Go To Dashboard"
          />


          <Box sx={{ flexGrow: 1 }} />

          {/* Profile Menu or Login */}
          {role ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <MenuItem
              onClick={() => navigate("/login")}
              sx={{ color: "white", cursor: "pointer", marginLeft: 2 }}
            >
              Login
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: "20px",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: "6px 10px",
  transition: "0.3s",
};

const activeLinkStyle = {
  borderBottom: "2px solid white",
};
