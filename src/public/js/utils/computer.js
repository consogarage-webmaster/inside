const computer = {
  dateFr: dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with 0
    const year = date.getFullYear(); // Get the year
    return `${day}/${month}/${year}`; // Return formatted date as DD/MM/YYYY
  },
  formatMoneyNumber: number => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  },
};
export default computer;
