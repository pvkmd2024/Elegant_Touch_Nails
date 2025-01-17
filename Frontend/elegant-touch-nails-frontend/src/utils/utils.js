export const formatDateTime = (dateString) => {
  console.log("Formatting date:", dateString); // Add this line to debug
  const date = new Date(dateString);
  if (isNaN(date)) {
    console.error("Invalid date:", dateString);
    return dateString;
  }
  const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // hh:mm AM/PM
  return `${formattedDate} ${formattedTime}`; // Returns: yyyy-mm-dd hh:mm
};
