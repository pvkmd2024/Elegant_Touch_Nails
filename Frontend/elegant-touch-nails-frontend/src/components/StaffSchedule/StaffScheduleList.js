import React, { useEffect, useState } from "react";
import { fetchStaffSchedules } from "servicesdirectory/api"; 

const StaffScheduleList = () => {
  const [StaffSchedule, setStaffSchedule] = useState([]);
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(""); // Track error state
  
    useEffect(() => {
      const getStaffSchedule = async () => {
        setLoading(true);
        try {
          const response = await fetchStaffSchedules();
          console.log("Fetched StaffSchedule data:", response); // Debugging log
          setStaffSchedule(response);
        } catch (error) {
          console.error("Error fetching StaffSchedules:", error);
          setError("Failed to fetch StaffSchedules.");
        } finally {
          setLoading(false);
        }
      };
      getStaffSchedule();
    }, []);
  if (loading) return <div>Loading StaffSchedules...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(StaffSchedule)) return <div>Invalid data format.</div>;

  return (
    <div>
      <h2>StaffSchedule</h2>
      {StaffSchedule.length === 0 ? (
        <p>No StaffSchedule available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>StaffID</th>
              <th>DayOfWeek</th>
              <th>StartTime</th>
              <th>EndTime</th>
            </tr>
          </thead>
          <tbody>
            {StaffSchedule.map((schedule) => (
              <tr key={schedule.ScheduleID}>
                <td>{schedule.StaffID}</td>
                <td>{schedule.DayOfWeek}</td>
                <td>{schedule.StartTime}</td>
                <td>{schedule.EndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffScheduleList;


// import React, { useEffect, useState } from "react";
// import { fetchStaffSchedules } from "StaffScheduledirectory/api";

// const StaffScheduleList = () => {
//   const [staffSchedules, setStaffSchedules] = useState([]); // Initialize with an empty array
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Track error state

//   useEffect(() => {
//     const getStaffSchedules = async () => {
//       try {
//         const data = await fetchStaffSchedules();
//         console.log("Fetched staff schedules:", data); // Log the response to verify the data format
//         if (Array.isArray(data)) {
//           setStaffSchedules(data); // Update state if data is an array
//         } else {
//           setError("Invalid data format received.");
//         }
//         setLoading(false); // Stop loading after data is fetched
//       } catch (error) {
//         setError("Failed to fetch staff schedules. Please try again later.");
//         setLoading(false); // Stop loading in case of error
//       }
//     };
//     getStaffSchedules();
//   }, []); // Empty dependency array ensures it runs once after mount

//   // Check if data is still loading or an error occurred
//   if (loading) {
//     return <div>Loading staff schedules...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   // Ensure that staffSchedules is an array and not undefined
//   if (!Array.isArray(staffSchedules)) {
//     return <div>Error: Staff schedules data is not in expected format.</div>;
//   }

//   // Render staff schedules data
//   return (
//     <div>
//       <h2>Staff Schedules</h2>
//       {staffSchedules.length === 0 ? (
//         <p>No staff schedules available.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Schedule ID</th>
//               <th>Staff ID</th>
//               <th>Day of Week</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffSchedules.map((schedule) => (
//               <tr key={schedule.ScheduleID}>
//                 <td>{schedule.StaffID}</td>
//                 <td>{schedule.DayOfWeek}</td>
//                 <td>{schedule.StartTime}</td>
//                 <td>{schedule.EndTime}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StaffScheduleList;