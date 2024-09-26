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
      case 'Period':
        f_name = 'Period';
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

export const formattedDate = (dateString) => {
  if (dateString) {
    const [datePart] = dateString.split(' ');

    const [year, month, day] = datePart.split('-');

    return `${day}/${month}/${year}`;
  } else {
    return dateString;
  }
};

export const MeasuringUnitConverter = (mu) => {
  let MeasuredBy = '';

  switch (mu) {
    case 'Percentage':
      MeasuredBy = '%';
      break;

    case 'Money':
      MeasuredBy = 'ETB';
      break;

    case 'Time':
      MeasuredBy = 'Hour';
      break;

    default:
      MeasuredBy = '';
  }
  return MeasuredBy;
};

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'green';
    case 'active':
      return 'green';
    case 'pending':
      return '#FFA500';
    case 'rejected':
      return 'red';
    case 'in-progress':
      return 'blue';
    case 'completed':
      return 'purple';
    default:
      return 'gray';
  }
};

export const taskStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'done':
      return 'green';
    case 'pending':
      return '#FFA500';
    case 'cancelled':
      return 'red';
    case 'inprogress':
      return 'blue';
    case 'blocked':
      return 'purple';
    default:
      return 'gray';
  }
};
