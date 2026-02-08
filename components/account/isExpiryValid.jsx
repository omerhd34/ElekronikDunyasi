const isExpiryValid = (month, year) => {
 if (!month || !year) return false;
 const m = parseInt(month, 10);
 const y = parseInt(year, 10);
 if (m < 1 || m > 12) return false;
 const fullYear = 2000 + y;
 const lastDayOfMonth = new Date(fullYear, m, 0);
 return lastDayOfMonth >= new Date();
}

export default isExpiryValid