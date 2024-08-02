import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const Search = ({ filter, onFilter }) => {
  const theme = useTheme();
  return (
    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 400, border: 0.4, borderColor: theme.palette.grey[400] }}>
      <InputBase sx={{ p: 1, ml: 2, flex: 1 }} placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {filter && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="filter" onClick={onFilter}>
            <IconAdjustmentsHorizontal />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

Search.propTypes = {
  filter: PropTypes.bool,
  onFilter: PropTypes.func
};
export default Search;
