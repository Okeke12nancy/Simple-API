const addMinutes = function (date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports = addMinutes;
