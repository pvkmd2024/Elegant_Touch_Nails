import React, { useEffect, useState } from "react";
import { fetchStaff } from "../servicesdirectory/api";
import StaffList from "../components/Staff/StaffList";
import AddStaffForm from "../components/Staff/AddStaffForm";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);

   const loadStaff = async () => {
    try {
      const data = await fetchStaff();
      setStaff(data);
    } catch (err) {
      console.error("Failed to load staff:", err.message);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div>
      <AddStaffForm />
      <StaffList staff={staff} />
    </div>
  );
};

export default StaffPage;