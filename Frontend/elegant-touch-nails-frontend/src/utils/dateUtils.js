export const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Returns 'YYYY-MM-DDTHH:mm'
};
