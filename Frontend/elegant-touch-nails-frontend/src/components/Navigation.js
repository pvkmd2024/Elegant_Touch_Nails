import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
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

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
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

          {auth && (
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
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Inline styling for links
const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: "20px",
  display: "flex",
  alignItems: "center",
};

// import React from "react";
// import { Link } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

// export default function Navigation() {
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={auth}
//               onChange={handleChange}
//               aria-label="login switch"
//             />
//           }
//           label={auth ? "Logout" : "Login"}
//         />
//       </FormGroup>
//       <AppBar position="static">
//         <Toolbar>
//           <Link to="/clients">Clients</Link>
//           <Link to="/services">Services</Link>
//           <Link to="/appointments">Appointments</Link>
//           <Link to="/payments">Payments</Link>
//           <Link to="/staff">Staff</Link>
//           <Link to="/staff-schedule">staff Schedule</Link>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             {/* <MenuIcon /> */}
//           </IconButton>
//           {/* {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> */}
//           {/* Photos */}
//           {/* </Typography> */}

//           {auth && (
//             <div>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 {/* <AccountCircle /> */}
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// // const Navigation = () => (
// //   <nav>
// //     <ul>
// //       <li>
// //         <Link to="/clients">Clients</Link>
// //       </li>
// //       <li>
// //         <Link to="/services">Services</Link>
// //       </li>
// //       <li>
// //         <Link to="/appointments">Appointments</Link>
// //       </li>
// //       <li>
// //         <Link to="/payments">Payments</Link>
// //       </li>
// //       <li>
// //         <Link to="/staff">Staff</Link>
// //       </li>
// //       <li>
// //         <Link to="/staff-schedule">Staff Schedule</Link>
// //       </li>
// //     </ul>
// //   </nav>
// // );

// // export default Navigation;
