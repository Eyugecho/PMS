import empty from 'assets/images/no-data.svg';
import error from 'assets/images/error.svg';
import department from 'assets/images/department.svg';

const FallbackImages = (severity) => {
  switch (severity) {
    case 'error':
      return error;
      break;
    case 'department':
      return department;
      break;
    default:
      return empty;
  }
};
export default FallbackImages;
