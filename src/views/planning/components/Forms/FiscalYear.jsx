import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backend from 'services/backend';
import { IconCheck } from '@tabler/icons-react';

const FiscalYear = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleYearSelection = (year, index) => {
    setSelectedIndex(index);

    localStorage.setItem('selectFiscal', JSON.stringify({ id: year.id, year: year.year }));
  };

  const handleFetchFiscalYear = () => {
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.fiscalYear;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'GET',
      headers: header
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response.data);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(false);
        }
      })
      .catch((error) => {
        toast(error.message);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetchFiscalYear();
    return () => {};
  }, []);
  return (
    <React.Fragment>
      {data?.map((year, index) => (
        <Box
          key={index}
          sx={
            selectedIndex === index
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingY: 1,
                  paddingX: 2,
                  border: 0.6,
                  borderRadius: 2,
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.grey[50],
                  cursor: 'pointer',
                  marginY: 0.4
                }
              : {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  paddingY: 1,
                  paddingX: 2,
                  cursor: 'pointer',
                  backgroundColor: theme.palette.grey[50],
                  marginY: 0.4
                }
          }
          onClick={() => handleYearSelection(year, index)}
        >
          <Typography variant="subtitle1">{year.year}</Typography>

          {selectedIndex === index && <IconCheck size={18} />}
        </Box>
      ))}

      <ToastContainer />
    </React.Fragment>
  );
};

export default FiscalYear;
