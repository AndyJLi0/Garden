export function convertMinutesToHoursAndMinutes(totalMinutes: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(totalMinutes / 60); // Get the integer part of the hours
  const minutes = totalMinutes % 60; // Get the remaining minutes
  return { hours, minutes };
}
