import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UnitsTableEmptyRows({ emptyRows, height }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}

UnitsTableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};
