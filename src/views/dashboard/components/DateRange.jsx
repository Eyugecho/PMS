import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate && date >= endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    if (date && startDate && date <= startDate) {
      toast.error('End date must be at least one day after the start date.');
    } else {
      setEndDate(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none'
                  },
                  '&:hover fieldset': {
                    border: 'none'
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none'
                  }
                }
              }}
              style={{ width: 50 }}
            />
          )}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate ? new Date(startDate.getTime() + 86400000) : null} // Minimum date is one day after start date
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
