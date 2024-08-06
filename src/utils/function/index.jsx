export const PeriodNaming = (name) => {
  if (name) {
    let f_name;
    switch (name) {
      case 'Monthly':
        f_name = 'Month';
        break;

      case 'Annually':
        f_name = 'Annum';
        break;

      case 'Quarterly':
        f_name = 'Quarter';
        break;

      case 'Weekly':
        f_name = 'Week';
        break;

      case 'Bi-weekly':
        f_name = 'Bi-weekly';
        break;

      case 'Daily':
        f_name = 'Day';
        break;

      default:
        f_name = 'Season';
        break;
    }
    return f_name;
  }
};

export const formatDate = (createdAt) => {
  const date = new Date(createdAt);

  // Get the month name
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const month = monthNames[date.getMonth()];

  // Get the day and pad it with leading zeros if necessary
  const day = String(date.getDate()).padStart(2, '0');

  // Get the year
  const year = date.getFullYear();

  // Format the date as DDMMYYYY
  const formattedDate = `${month.slice(0, 3)}, ${day}/${year}`;

  return {
    monthName: month.slice(0, 3),
    formattedDate: formattedDate
  };
};
