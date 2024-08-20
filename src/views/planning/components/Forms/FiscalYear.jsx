import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import Backend from 'services/backend';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import noresult from '../../../../assets/images/no_result.png';
import { Storage } from 'configration/storage';
import GetToken from 'utils/auth-token';

const FiscalYear = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [selectedYearId, setSelectedYearId] = useState(null);

  const handleYearSelection = (year) => {
    if (selectedYearId === year.id) {
      setSelectedYearId(null);
      Storage.removeItem('selectFiscal');
    } else {
      setSelectedYearId(year.id);
      Storage.setItem('selectFiscal', JSON.stringify({ id: year.id, year: year.year }));
    }
  };

  const handleFetchFiscalYear = async () => {
    const token = await GetToken();
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
          setError(false);
          Storage.setItem('fiscalYear', JSON.stringify(response.data));
        } else {
          setError(false);
        }
      })
      .catch((error) => {
        toast(error.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const getFiscalYear = Storage.getItem('fiscalYear');
    const getSelectedFiscal = Storage.getItem('selectFiscal');

    let fiscalYear = null;
    let selectedFiscalYear = null;

    try {
      if (getFiscalYear) {
        fiscalYear = JSON.parse(getFiscalYear);
        setData(fiscalYear);
      }

      if (getSelectedFiscal) {
        selectedFiscalYear = JSON.parse(getSelectedFiscal);
        if (selectedFiscalYear?.id) {
          setSelectedYearId(selectedFiscalYear.id);
        }
      }
    } catch (error) {
      handleFetchFiscalYear();
    }
    if (!fiscalYear) {
      handleFetchFiscalYear();
    }
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8
            }}
          >
            <ActivityIndicator size={20} />
          </Grid>
        </Grid>
      ) : error ? (
        <ErrorPrompt image={noresult} title="Server Error" message="Unable to retrive fiscal years" />
      ) : (
        data?.map((year, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingY: 2.2,
              paddingX: 2,
              border: 0.6,
              borderRadius: 2,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.grey[50],
              cursor: 'pointer',
              marginY: 1.6
            }}
            onClick={() => handleYearSelection(year)}
          >
            <Typography variant="h4">{year.year}</Typography>

            {selectedYearId === year.id && <IconCircleCheckFilled size={24} style={{ color: theme.palette.primary.main }} />}
          </Box>
        ))
      )}

      <ToastContainer />
    </React.Fragment>
  );
};

export default FiscalYear;
