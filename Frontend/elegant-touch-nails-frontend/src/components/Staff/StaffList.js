import React, { useEffect, useState } from "react";
import { fetchStaff } from "servicesdirectory/api";
import "./StaffList.css";

const StaffList = () => {
  const [staffMembers, setStaffMembers] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await fetchStaff();
        console.log("Fetched staff members:", response); // Log the response to verify the data format
        if (Array.isArray(response)) {
          setStaffMembers(response); // Set staff members if valid
        } else {
          setError("Staff members data is not in the expected format.");
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Failed to load staff members. Please try again later.");
        setLoading(false); // Stop loading in case of error
      }
    };
    getStaff();
  }, []); // Empty dependency array ensures it runs once after mount

  // Check if data is still loading or an error occurred
  if (loading) {
    return <div>Loading staff members...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // Ensure that staffMembers is an array and not undefined
  if (!Array.isArray(staffMembers)) {
    return <div>Error: Staff members data is not in expected format.</div>;
  }

  // Render staff members data
  return (
    <div>
      <h2>Staff Members</h2>
      {staffMembers.length === 0 ? (
        <p>No staff members found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Password Hash</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.ID}>
                <td>{staff.FullName}</td>
                <td>{staff.Role}</td>
                <td>{staff.Email}</td>
                <td>{staff.PasswordHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;

// import React, { useEffect, useState } from "react";
// import { fetchStaff } from "servicesdirectory/api";
// import "./StaffList.css";

// const StaffList = () => {
//   const [staffMembers, setStaffMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchStaff()
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setStaffMembers(response.data); // Set staff members if valid
//         } else {
//           setError("Staff members data is not in the expected format.");
//         }
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error("Failed to fetch staff members:", error);
//         setError("Failed to load staff members. Please try again later.");
//         setLoading(false); // Set loading to false even if there's an error
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading staff members...</div>;
//   }

//   return (
//     <div>
//       <h2>Staff Members</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <table>
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Role</th>
//             <th>Email</th>
//             <th>PasswordHash</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staffMembers.length === 0 ? (
//             <tr>
//               <td colSpan="3">No staff members found.</td>
//             </tr>
//           ) : (
//             staffMembers.map((staff) => (
//               <tr key={staff.id}>
//                 <td>{staff.FullName}</td>
//                 <td>{staff.Role}</td>
//                 <td>{staff.Email}</td>
//                 <td>{staff.PasswordHash}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StaffList;
