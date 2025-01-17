import React, { useEffect, useState } from "react";
import { fetchStaff } from "../servicesdirectory/api";
import StaffList from "../components/Staff/StaffList";
import AddStaffForm from "../components/Staff/AddStaffForm";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff().then((data) => setStaff(data));
  }, []);

  return (
    <div>
      <h2>Staff</h2>
      <AddStaffForm />
      <StaffList staff={staff} />
    </div>
  );
};

export default StaffPage;
