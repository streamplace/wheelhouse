import leftPad from "left-pad";

export const timeConverter = a => {
  a = new Date(a);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = leftPad(a.getHours(), 2, "0");
  const min = leftPad(a.getMinutes(), 2, "0");
  const sec = leftPad(a.getSeconds(), 2, "0");
  return `${month} ${date} ${hour}:${min}:${sec}`;
};
