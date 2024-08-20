import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { IconFilter, IconSearch, IconX } from '@tabler/icons-react';
import { Box, ClickAwayListener, Popper, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';

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
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'filter-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
            variant="outlined"
            aria-label="filter"
            onClick={handleOpenFilter}
          >
            <IconFilter stroke={1.4} color={theme.palette.grey[500]} size="1.6rem" />
          </IconButton>

          <Popper
            placement="bottom-end"
            open={open}
            anchorEl={anchorRef.current}
            transition
            disablePortal
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 6]
                  }
                }
              ]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={open} {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MainCard border={true} content={false} shadow={theme.shadows[1]}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          px: 1.2,
                          py: 0.4,
                          borderBottom: 0.6,
                          borderColor: theme.palette.divider
                        }}
                      >
                        <Typography variant="h4" ml={0.6} color={theme.palette.text.primary}>
                          {title}
                        </Typography>
                        <IconButton onClick={handleClose}>
                          <IconX stroke={1.6} size="1.4rem" />
                        </IconButton>
                      </Box>
                      {children}
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
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
