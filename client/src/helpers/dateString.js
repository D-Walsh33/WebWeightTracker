const todayDateString = () => {
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let year = today.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  return year.toString() + "-" + month + "-" + day;
};
const dateString = (date) => {
  return date.split("T")[0];
};
export default {
  todayDateString,
  dateString,
};
