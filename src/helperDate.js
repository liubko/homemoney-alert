const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}.${month}.${day}`;
};

const getMonthLimits = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 2);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return [
    formatDate(start),
    formatDate(end),
  ];
};

module.exports = {
  formatDate,
  getMonthLimits,
};