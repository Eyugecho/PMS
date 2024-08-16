import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const Search = ({ filter, onFilter, search, setSearch, onSubmit, value, onChange }) => {
  const [searchTerm, setSearchTerm] = React.useState(value || '');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onChange(event.target.value);
  };
  const theme = useTheme();

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 300,
        border: 0.4,
        borderColor: theme.palette.grey[400],
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <InputBase
        sx={{
          p: 1,
          ml: 2,
          flex: 1,
          color: theme.palette.text.primary
        }}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        type="button"
        sx={{
          p: '10px',
          animation: `${pulseAnimation} 2s linear infinite`
        }}
        aria-label="search"
      >
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
  onFilter: PropTypes.func,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Search;
