export const showNotification = (message, type = 'info') => {
  alert(`${type.toUpperCase()}: ${message}`);
};

