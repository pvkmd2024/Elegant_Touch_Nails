import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      if (authState.role === "Manager") navigate("/manager");
      else if (authState.role === "Staff") navigate("/staff");
      else if (authState.role === "Client") navigate("/client");
    }
  }, [authState, navigate]);
console.log("Home rendering");
  return (
    <div>
      <h2>Welcome to Elegant Touch Nails</h2>
      <p>Please log in to continue.</p>
    </div>
  );
};

export default Home;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: "center", marginTop: "5rem" }}>
//       {/* <h1>Elegant Touch Nails</h1> */}
//       <p>Welcome to Elegant Touch Nails</p>
//       <p>Please click login to access the system.</p>
//       <button
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//         onClick={() => navigate("/login")}
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default Home;