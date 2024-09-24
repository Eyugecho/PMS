import React, { useEffect, useState } from 'react';
import { Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Backend from 'services/backend';
import DrogaCard from 'ui-component/cards/DrogaCard';
import GetToken from 'utils/auth-token';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import FrequencySelector from './FrequencySelector';
import Fallbacks from 'utils/components/Fallbacks';
import { addDays, differenceInDays, format, subDays } from 'date-fns';
import { gridSpacing } from 'store/constant';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const FrequencyDefinition = () => {
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [loading, setLoading] = useState(true);
  const [frequencies, setFrequencies] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const [loadingDetails, setLoadingDetails] = useState(false);
  const [frequencyDetails, setFrequencyDetails] = useState([]);

  const handleFrequencySelection = (index) => {
    const selected = frequencies[index];
    setSelectedFrequency(selected);
    handleGettingDetails(selected.id, selected.value);
  };

  const handleCheckingPeriodAvailablity = (periods, value) => {
    if (periods.length === 0) {
      const fiscalYearStartDate = new Date(selectedYear?.start_date);
      const fiscalYearEndDate = new Date(selectedYear?.end_date);

      const totalDays = differenceInDays(fiscalYearEndDate, fiscalYearStartDate);

      const daysPerQuarter = Math.floor(totalDays / value);

      const newPeriods = Array.from({ length: value }, (v, i) => {
        const start_date = addDays(fiscalYearStartDate, i * daysPerQuarter);
        const end_date = i === value - 1 ? fiscalYearEndDate : addDays(fiscalYearStartDate, (i + 1) * daysPerQuarter - 1);
        const evaluation_start_date = subDays(end_date, 7);
        const evaluation_end_date = end_date;

        return {
          name: `Quarter ${i + 1}`,
          start_date: format(start_date, 'yyyy-MM-dd'),
          end_date: format(end_date, 'yyyy-MM-dd'),
          evaluation_start_date: format(evaluation_start_date, 'yyyy-MM-dd'),
          evaluation_end_date: format(evaluation_end_date, 'yyyy-MM-dd'),
          status: 'Draft'
        };
      });
      setFrequencyDetails(newPeriods);
    }
  };

  const handleGettingDetails = async (id, value) => {
    try {
      setLoadingDetails(true);
      const token = await GetToken();
      const Api = Backend.api + Backend.get_frequency_definition + `?fiscal_year_id=${selectedYear?.id}&frequency_id=${id}`;
      const response = await fetch(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (response.ok) {
        setFrequencyDetails(result.data?.periods);
        handleCheckingPeriodAvailablity(result.data?.periods, value);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleFetchingFrequncies = async () => {
    try {
      setLoading(true);

      const token = await GetToken();
      const Api = Backend.api + Backend.frequencies + `?fiscal_year_id=${selectedYear?.id}`;
      const response = await fetch(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (response.ok) {
        setFrequencies(result.data?.data);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchingFrequncies();
  }, [selectedYear]);

  return (
    <DrogaCard>
      <Grid container>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">Evaluation Periods</Typography>
          {loading ? (
            <ActivityIndicator size={18} />
          ) : (
            <FrequencySelector options={frequencies} handleSelection={(index) => handleFrequencySelection(index)} />
          )}
        </Grid>

        <Grid item xs={12} sx={{ minHeight: 300 }}>
          {loadingDetails ? (
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
          ) : frequencyDetails.length === 0 ? (
            <Fallbacks
              severity="frequencies"
              title="No evaluation frequency found"
              description="The list of added frequency will be listed here"
              sx={{ paddingTop: 6 }}
            />
          ) : (
            <TableContainer sx={{ marginBottom: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    {['Name', 'Start Date', 'End Date', 'Evaluation start', 'Evaluation end', 'Status'].map((header, index) => (
                      <TableCell key={index}>
                        <Typography variant="subtitle1">{header}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TableBody>
                    {frequencyDetails.map((period, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ width: '100px' }}>
                          <Typography variant="h5">{period.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            label="Start Date"
                            value={period?.start_date ? new Date(period?.start_date) : null}
                            // onChange={(date) => handleDateChange(date, key, 'start_date')}
                            // shouldDisableDate={(date) => shouldDisableDate(date, true, key)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            label="End Date"
                            value={period?.end_date ? new Date(period?.end_date) : null}
                            // onChange={(date) => handleDateChange(date, key, 'end_date')}
                            // shouldDisableDate={(date) => shouldDisableDate(date, false, key)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            label="Evaluation Start"
                            value={period?.evaluation_start_date ? new Date(period?.evaluation_start_date) : null}
                            // onChange={(date) => handleDateChange(date, key, 'end_date')}
                            // shouldDisableDate={(date) => shouldDisableDate(date, false, key)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell>

                        <TableCell>
                          <DatePicker
                            label="Evaluation End"
                            value={period?.evaluation_end_date ? new Date(period?.evaluation_end_date) : null}
                            // onChange={(date) => handleDateChange(date, key, 'end_date')}
                            // shouldDisableDate={(date) => shouldDisableDate(date, false, key)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </TableCell>

                        <TableCell>
                          <Chip label={period?.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </LocalizationProvider>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </DrogaCard>
  );
};

export default FrequencyDefinition;
