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
