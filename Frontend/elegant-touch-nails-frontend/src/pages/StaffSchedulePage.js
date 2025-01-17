import React, { useEffect, useState } from "react";
import { fetchStaffSchedules } from "../servicesdirectory/api";
import StaffScheduleList from "../components/StaffSchedule/StaffScheduleList";
import AddStaffScheduleForm from "../components/StaffSchedule/AddStaffScheduleForm";

const StaffSchedulePage = () => {
  const [staffSchedules, setStaffSchedules] = useState([]);

  useEffect(() => {
    fetchStaffSchedules().then((data) => setStaffSchedules(data));
  }, []);

  return (
    <div>
      <h2>Staff Schedule</h2>
      <AddStaffScheduleForm />
      <StaffScheduleList staffSchedules={staffSchedules} />
    </div>
  );
};

export default StaffSchedulePage;
