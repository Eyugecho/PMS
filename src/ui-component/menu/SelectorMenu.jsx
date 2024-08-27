import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectorMenu({ name, options, selected, handleSelection }) {
  return (
    <div>
      <FormControl sx={{ minWidth: 120, border: 'none', boxShadow: 'none', p: 0 }}>
        <Select
          displayEmpty
          name={name}
          value={selected}
          onChange={handleSelection}
          inputProps={{ 'aria-label': 'task types' }}
          sx={{
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0, borderRadius: 8 },
            p: 0
          }}
        >
          {options.map((type, index) => (
            <MenuItem key={index} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectorMenu;
