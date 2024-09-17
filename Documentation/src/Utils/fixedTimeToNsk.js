function fixedTimeToEndOfDay(date) {
  if (date !== null) {
    const newDate = new Date(date);
    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);
    return newDate.toISOString();
  }
  const newDate = new Date();
  newDate.setHours(23);
  newDate.setMinutes(59);
  newDate.setSeconds(59);
  return newDate.toISOString();
}
export default fixedTimeToEndOfDay;
