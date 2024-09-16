import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, keyframes } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Backend from 'services/backend';
import { useEffect } from 'react';
import config from '../../configration/config';
import { Grid, Card, CardContent, Typography,Divider } from '@mui/material';
import { toast } from 'react-toastify';
import Fallbacks from 'utils/components/Fallbacks';
import { CalendarToday, Timeline, Assessment } from '@mui/icons-material'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const blinkAnimation = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const BlinkingStepLabel = styled(StepLabel)(({ theme }) => ({
  animation: `${blinkAnimation} 1s linear infinite`,
  padding: theme.spacing(1)
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4'
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool
};

const steps = ['Fiscal Year', 'Planning Period', 'Frequency Period Value', 'Evaluation Period'];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [stepData, setStepData] = React.useState({});
  const [tableData, setTableData] = React.useState([]);
  const [fiscalYears, setFiscalYears] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [frequencies, setFrequencies] = React.useState([]);
  const [allStepData, setAllStepData] = React.useState([]);
  const [savedFiscalYear, setSavedFiscalYear] = React.useState(null);
  const [selectedFrequency, setSelectedFrequency] = React.useState(null);
  const [savedData, setSavedData] = React.useState([]);
  const [stepCompleted, setStepCompleted] = React.useState([false, false, false]);

  const handleSaveFiscalYear = (data) => {
    setFiscalYears((prev) => [...prev, data]);
  };

  const handleSavePlanningPeriod = (data) => {
    setTableData((prev) => [
      ...prev,
      {
        ...data,
        type: 'Planning Period'
      }
    ]);
  };
  const handleSaveFrequencyPeriodValue = (data) => {
    setTableData((prev) => [
      ...prev,
      {
        ...data,
        type: 'Frequency Period Value'
      }
    ]);
  };

  const handleSaveEvaluationPeriod = (data) => {
    setTableData((prev) => [
      ...prev,
      {
        ...data,
        type: 'Evaluation Period'
      }
    ]);
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (index === 0 || stepCompleted[index - 1]) {
      setActiveStep(index);
    } else {
      toast.error('Please complete all required fields.');
    }
    setOpen(true);
  };

  const handleNext = async () => {
    const isValid = validateCurrentStep();
    if (isValid) {
      // Mark the current step as completed
      const newStepCompleted = [...stepCompleted];
      newStepCompleted[activeStep] = true;
      setStepCompleted(newStepCompleted);

      // Proceed to the next step
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      toast.error('Please complete all required fields.');
    }

    if (steps[activeStep] === 'Fiscal Year') {
      const fiscalYearData = await handleFiscalYearSubmit();
      if (!fiscalYearData) return; // Prevent proceeding if submission failed
      setSavedFiscalYear(fiscalYearData);
    }

    if (steps[activeStep] === 'Planning Period') {
      const planningPeriodData = await handlePlanningPeriodSubmit();
      if (!planningPeriodData) return; // Prevent proceeding if submission failed
    }

    if (steps[activeStep] === 'Frequency Period Value') {
      const frequencyPeriodValueData = await handleFrequencyPeriodValueSubmit();
      if (!frequencyPeriodValueData) return; // Prevent proceeding if submission failed
      setSelectedFrequency(frequencyPeriodValueData);
    }

    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setOpen(true);
    }
  };
  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0:
        return stepData['Fiscal Year']?.year && stepData['Fiscal Year']?.startDate && stepData['Fiscal Year']?.endDate;
      case 1:
        return stepData['Planning Period']?.startDate && stepData['Planning Period']?.endDate;
      case 2:
        return (
          stepData['Frequency Period Value']?.frequency &&
          stepData['Frequency Period Value']?.dates?.every((date) => date.start_date && date.end_date)
        );
      case 3:
        return stepData['Evaluation Period']?.startDate && stepData['Evaluation Period']?.endDate;
      default:
        return false;
    }
  };

  const handleSave = async () => {
    // Filter out the data for the current step
    const filteredData = steps.reduce((acc, step) => {
      if (step !== 'Frequency' && step !== 'Fiscal Year') {
        acc[step] = stepData[step] || '';
      }
      return acc;
    }, {});

    // Handle Fiscal Year separately
    if (steps[activeStep] === 'Fiscal Year') {
      setFiscalYears((prevFiscalYears) => [
        ...prevFiscalYears,
        {
          year: stepData['Fiscal Year'].year
        }
      ]);
    }

    // Map the frequency ID to its name
    if (steps[activeStep] === 'Frequency Period Value' && stepData[steps[activeStep]]) {
      filteredData['Frequency Period Value'] = {
        ...stepData[steps[activeStep]],
        frequency: stepData[steps[activeStep]].frequencyName // Include frequencyName here
      };
    }

    // Get the current step data
    const currentStepData = stepData[steps[activeStep]] || '';

    // Add current step data to allStepData
    setAllStepData((prevData) => [
      ...prevData,
      {
        step: steps[activeStep],
        data: currentStepData
      }
    ]);

    // Add Fiscal Year data if it exists
    if (stepData['Fiscal Year']) {
      filteredData['Fiscal Year'] = stepData['Fiscal Year'];
    }

    // Save the Evaluation Period to the backend
    if (steps[activeStep] === 'Evaluation Period') {
      await handleEvaluaionPeriodSubmit();
    }

    // Add the filtered data to savedData and save to localStorage
    setSavedData((prevSavedData) => {
      const updatedSavedData = [...prevSavedData, filteredData];
      localStorage.setItem('savedData', JSON.stringify(updatedSavedData)); // Save to localStorage
      return updatedSavedData;
    });

    // Reset the stepData only after saving
    setStepData({});

    // Reset activeStep and close the modal
    setActiveStep(0);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setStepData((prevData) => ({
        ...prevData,
        [steps[activeStep]]: {
          ...prevData[steps[activeStep]],
          [name]: Number(value)
        }
      }));
    } else {
      setStepData((prevData) => ({
        ...prevData,
        [steps[activeStep]]: {
          ...prevData[steps[activeStep]],
          [name]: value
        }
      }));
    }
  };

  const handleEvaluaionPeriodSubmit = async () => {
    const token = localStorage.getItem('token');
    const Api = `${Backend.api}${Backend.evaluation_periods}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const parentId = stepData['Evaluation Period']?.frequency_period_value_id || stepData['Frequency Period Value']?.frequency || '';

    // Validation: Ensure parentId, startDate, and endDate are not empty
    if (!parentId) {
      setError((prev) => ({ ...prev, parent_id: 'Parent ID is invalid or missing' }));
      toast.error('Parent ID is invalid or missing.');
      return;
    }

    const startDate = stepData['Evaluation Period']?.startDate;
    const endDate = stepData['Evaluation Period']?.endDate;

    if (!startDate || !endDate) {
      setError((prev) => ({
        ...prev,
        start_date: 'Start date is required',
        end_date: 'End date is required'
      }));
      toast.error('Start date and End date are required.');
      return;
    }

    const evaluationPeriodData = {
      fiscal_year_id: savedFiscalYear.id || '',
      dates: [
        {
          parent_id: parentId,
          start_date: startDate,
          end_date: endDate
        }
      ]
    };

    try {
      setLoading(true);
      setError({}); // Clear previous errors

      const response = await fetch(Api, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(evaluationPeriodData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Evaluation period created successfully');
        handleSaveEvaluationPeriod(data.data);

        return data.data;
      } else {
        console.error('Backend errors:', data.data.errors);
        toast.error(`Evaluation period submission failed: ${data.message}`);
        setError(data.data.errors || {});
      }
    } catch (error) {
      toast.error('An error occurred while submitting evaluation period');
      console.error('An error occurred while submitting evaluation period:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFrequencyPeriodValueSubmit = async () => {
    const token = localStorage.getItem('token');
    const Api = `${Backend.api}${Backend.frequency_period_values}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const frequencyPeriodValueData = {
      frequency_id: stepData['Frequency Period Value']?.frequency || '',
      fiscal_year_id: stepData['Frequency Period Value']?.fiscal_year_id || savedFiscalYear?.id || '',
      dates: stepData['Frequency Period Value']?.dates || []
    };

    // Check if dates are properly populated before submission
    if (frequencyPeriodValueData.dates.length === 0 || frequencyPeriodValueData.dates.some((date) => !date.start_date || !date.end_date)) {
      toast.error('Please fill in all start and end dates.');
      return;
    }

    try {
      setLoading(true);
      setError({}); // Clear previous errors

      const response = await fetch(Api, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(frequencyPeriodValueData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Frequency period value created successfully');
        handleSaveFrequencyPeriodValue(data.data);
        return data.data;
      } else {
        // Handle specific errors
        if (data.status === 422) {
          const { message, errors } = data.data;

          // Handle the specific "frequency_id" error
          if (errors && errors.frequency_id) {
            toast.error(errors.frequency_id[0] || 'Frequency ID error');
          } else {
            toast.error(message || 'Frequency period value submission failed');
          }

          setError(errors || {});
        } else {
          toast.error(`Frequency period value submission failed: ${data.message}`);
        }
      }
    } catch (error) {
      toast.error('An error occurred while submitting the frequency period value');
      console.error('An error occurred while submitting the frequency period value:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiscalYearSubmit = async () => {
    const token = localStorage.getItem('token');
    const Api = `${Backend.api}${Backend.fiscal_years}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const fiscalYearData = {
      year: stepData['Fiscal Year']?.year || '',
      start_date: stepData['Fiscal Year']?.startDate || '',
      end_date: stepData['Fiscal Year']?.endDate || ''
    };

    try {
      setLoading(true);
      setError({}); // Clear previous errors

      const response = await fetch(Api, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(fiscalYearData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Fiscal year created successfully');
        handleSaveFiscalYear(data.data);
        return data.data;
      } else {
        toast.error(`Fiscal year submission failed: ${data.message}`);
        // Handle specific validation errors
        if (data.data.message.includes('The end date must be at least 360 days after the start date')) {
          toast.error('The end date must be at least 360 days after the start date.');

          setError({
            end_date: [data.data.message]
          });
        } else {
          setError(data.data.errors || {});
        }
      }
    } catch (error) {
      toast.error('An error occurred while submitting fiscal year');
      console.error('An error occurred while submitting fiscal year:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanningPeriodSubmit = async () => {
    const token = localStorage.getItem('token');
    const Api = `${Backend.api}${Backend.planning_periods}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const planningPeriodData = {
      fiscal_year_id: savedFiscalYear.id,
      start_date: stepData['Planning Period']?.startDate || '',
      end_date: stepData['Planning Period']?.endDate || ''
    };

    try {
      setLoading(true);
      setError({}); // Clear previous errors

      const response = await fetch(Api, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(planningPeriodData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Planning period created successfully');
        handleSavePlanningPeriod(data.data);
        return data.data;
      } else {
        toast.error(`Planning period submission failed: ${data.message}`);

        // Handle the specific fiscal year date range error
        if (data.status === 422 && data.data?.message === 'Start and End dates must be within the fiscal year range.') {
          setError({
            start_date: ['Start date must be within the fiscal year range.'],
            end_date: ['End date must be within the fiscal year range.']
          });
          toast.error('Start and End dates must be within the fiscal year range.');
        } else {
          // Handle other errors
          setError(data.data.errors || {});
        }
      }
    } catch (error) {
      toast.error('An error occurred while submitting the planning period.');
      console.error('An error occurred while submitting the planning period:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFrequencies = async () => {
    const token = localStorage.getItem('token');
    const Api = `${config.API_URL_Units}/frequencies`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    try {
      setLoading(true);
      setError({});

      const response = await fetch(Api, {
        method: 'GET',
        headers: headers
      });

      const result = await response.json();

      if (result.success) {
        setFrequencies(result.data.data);
      } else {
        toast.error(`Failed to fetch frequencies: ${result.message}`);
        // Handle specific errors if needed
        setError(result.errors || {});
      }
    } catch (error) {
      toast.error('An error occurred while fetching frequencies');
      console.error('An error occurred while fetching frequencies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFrequencies();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
      setSavedData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (steps[activeStep] === 'Fiscal Year') {
      await handleFiscalYearSubmit();
    } else if (steps[activeStep] === 'Planning Period') {
      await handlePlanningPeriodSubmit();
    } else if (steps[activeStep] === 'Frequency Period Value') {
      await handleFrequencyPeriodValueSubmit();
    } else if (steps[activeStep] === 'Evaluation Period') {
      await handleEvaluaionPeriodSubmit();
    }
  };

  const handleFrequencyChange = (event) => {
    const selectedId = event.target.value;

    // Find the frequency object by ID
    const selectedFrequency = frequencies.find((f) => f.id === selectedId);

    // Extract frequency name and value
    const frequency = selectedFrequency?.name || '';
    const frequencyValue = selectedFrequency?.value || 1;

    // Generate the appropriate number of date fields
    const periods = Array.from({ length: frequencyValue }, () => ({
      start_date: '',
      end_date: ''
    }));

    // Update stepData with the new dates and frequency name
    setStepData((prevData) => ({
      ...prevData,
      [steps[activeStep]]: {
        ...(prevData[steps[activeStep]] || {}),
        frequency: selectedId,
        frequencyName: frequency,
        dates: periods
      }
    }));
  };

  const handleDateChange = (event, index, dateType) => {
    const { value } = event.target;

    console.log(`Updating ${dateType} for period ${index} with value: ${value}`);

    setStepData((prevData) => {
      const currentStepData = prevData[steps[activeStep]] || { dates: [] };

      const updatedDates = [...currentStepData.dates];
      if (!updatedDates[index]) {
        updatedDates[index] = { start_date: '', end_date: '' };
      }

      if (dateType === 'start_date') {
        updatedDates[index].start_date = value;
      } else if (dateType === 'end_date') {
        updatedDates[index].end_date = value;
      }

      return {
        ...prevData,
        [steps[activeStep]]: {
          ...currentStepData,
          dates: updatedDates
        }
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} spacing={4}>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            {index === 0 && tableData.length === 0 ? (
              <BlinkingStepLabel StepIconComponent={QontoStepIcon}>{label}</BlinkingStepLabel>
            ) : (
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            )}
          </Step>
        ))}
      </Stepper>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {steps[activeStep]}
              </Typography>
              {steps[activeStep] === 'Fiscal Year' ? (
                <>
                  <form onSubmit={handleSubmit}>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Grid container spacing={2}>
                   
                        <Grid item xs={6}>
                          <DatePicker
                            label="Start Year"
                            views={['year']}
                            value={stepData[steps[activeStep]]?.startYear || null}
                            onChange={(newValue) => handleInputChange({ target: { name: 'startYear', value: newValue } })}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                margin="normal"
                                error={Boolean(error.startYear)}
                                helperText={error.startYear?.join(', ')}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <DatePicker
                            label="End Year"
                            views={['year']}
                            value={stepData[steps[activeStep]]?.endYear || null}
                            onChange={(newValue) => handleInputChange({ target: { name: 'endYear', value: newValue } })}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                margin="normal"
                                error={Boolean(error.endYear)}
                                helperText={error.endYear?.join(', ')}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </LocalizationProvider> */}

                    {/* <TextField
                      name="year"
                      label="Year"
                      value={`${stepData[steps[activeStep]]?.startYear?.getFullYear() || ''} - ${stepData[steps[activeStep]]?.endYear?.getFullYear() || ''}`}
                      InputProps={{
                        readOnly: true
                      }}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(error.year)}
                      helperText={error.year?.join(', ')}
                    /> */}
                    <TextField
                      name="year"
                      label="Year"
                      value={stepData[steps[activeStep]]?.year || ''}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(error.year)}
                      helperText={error.year?.join(', ')}
                    />
                    <TextField
                      name="startDate"
                      label="Start Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={stepData[steps[activeStep]]?.startDate || ''}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(error.start_date)}
                      helperText={error.start_date?.join(', ')}
                    />
                    <TextField
                      name="endDate"
                      label="End Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={stepData[steps[activeStep]]?.endDate || ''}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(error.end_date)}
                      helperText={error.end_date?.join(', ')}
                    />
                  </form>
                </>
              ) : steps[activeStep] === 'Planning Period' ? (
                <>
                  <>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="fiscal_year_id"
                        label="Fiscal Year"
                        value={stepData['Fiscal Year']?.year || ''}
                        InputProps={{
                          readOnly: true
                        }}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={stepData[steps[activeStep]]?.startDate || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(error.start_date)}
                        helperText={error.start_date?.join(', ')}
                      />
                      <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={stepData[steps[activeStep]]?.endDate || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(error.end_date)}
                        helperText={error.end_date?.join(', ')}
                      />
                    </form>
                  </>
                </>
              ) : steps[activeStep] === 'Frequency Period Value' ? (
                <>
                  <>
                    <Box sx={{ mb: 0, maxHeight: '50vh', overflowY: 'auto' }}>
                      <form onSubmit={handleSubmit}>
                        {/* Fiscal Year  */}

                        <TextField
                          name="fiscal_year_id"
                          label="Fiscal Year"
                          value={stepData['Fiscal Year']?.year || ''}
                          InputProps={{
                            readOnly: true
                          }}
                          fullWidth
                          margin="normal"
                        />
                        {/* Frequency  */}
                        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                          <InputLabel id="frequency-label">Select Frequency</InputLabel>
                          <Select
                            name="frequency"
                            value={stepData[steps[activeStep]]?.frequency || ''}
                            onChange={handleFrequencyChange}
                            fullWidth
                            margin="normal"
                            label="Select Frequency"
                            sx={{ mb: 2 }}
                          >
                            {frequencies.map((frequency) => (
                              <MenuItem key={frequency.id} value={frequency.id}>
                                {frequency.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <>
                          {/* Dynamic Date Fields */}
                          {stepData[steps[activeStep]]?.dates?.map((date, index) => (
                            <Grid container key={index} spacing={2} sx={{ mb: 2, maxHeight: '80vh', overflowY: 'auto' }}>
                              <Grid item xs={6}>
                                <TextField
                                  name={`start_date_${index}`}
                                  label={`Start Date ${index + 1}`}
                                  type="date"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  value={date.start_date || ''}
                                  onChange={(e) => handleDateChange(e, index, 'start_date')}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  name={`end_date_${index}`}
                                  label={`End Date ${index + 1}`}
                                  type="date"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  value={date.end_date || ''}
                                  onChange={(e) => handleDateChange(e, index, 'end_date')}
                                  error={Boolean(error.end_date)}
                                  helperText={error.end_date?.join(', ')}
                                />
                              </Grid>
                            </Grid>
                          ))}
                        </>
                      </form>
                    </Box>
                  </>
                </>
              ) : steps[activeStep] === 'Evaluation Period' ? (
                <>
                  <>
                    <>
                      <form onSubmit={handleSubmit}>
                        <TextField
                          name="fiscal_year_id"
                          label="Fiscal Year"
                          value={stepData['Fiscal Year']?.year || ''}
                          InputProps={{
                            readOnly: true
                          }}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          name="frequency_name"
                          value={
                            frequencies.find(
                              (frequency) =>
                                frequency.id ===
                                (stepData[steps[activeStep]]?.frequency_period_value_id || stepData['Frequency Period Value']?.frequency)
                            )?.name || ''
                          }
                          InputProps={{
                            readOnly: true
                          }}
                          fullWidth
                          margin="normal"
                          error={Boolean(error.frequency_period_value_id)}
                          helperText={error.frequency_period_value_id?.join(', ')}
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          name="startDate"
                          label="Start Date"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={stepData[steps[activeStep]]?.startDate || ''}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          name="endDate"
                          label="End Date"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={stepData[steps[activeStep]]?.endDate || ''}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      </form>
                    </>
                  </>
                </>
              ) : null}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {activeStep < steps.length - 1 && (
                  <Button variant="contained" color="primary" type="submit" onClick={handleNext}>
                    Next
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <Card>
        <CardContent>
          {savedData.length === 0 ? (
            <Fallbacks
              severity="info"
              title="No Data Available"
              description="There is no data available to display."
              sx={{ paddingTop: 6 }}
            />
          ) : (
            savedData.map((data, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  margin: 5,
                  borderRadius: 4,
                  boxShadow: '0 10px 15px rgba(0,0,0,0.10)',
                  padding: 3
                }}
              >
                <CardContent>
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    {/* Fiscal Year Section */}
                    {data['Fiscal Year'] && (
                      <React.Fragment key="Fiscal Year">
                        <Box display="flex" flexDirection="column" alignItems="flex-start" flexGrow={1}>
                          <Box display="flex" alignItems="center">
                            <CalendarToday sx={{ marginRight: 1, color: '#3f51b5' }} />
                            <Typography variant="h4" marginBottom={1} marginTop={1} color="primary">
                              Fiscal Year
                            </Typography>
                          </Box>
                          {Object.entries(data['Fiscal Year']).map(([key, value]) => (
                            <Typography key={key} variant="body1" color="textSecondary" sx={{ padding: '2px 0' }}>
                              <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
                            </Typography>
                          ))}
                        </Box>
                      </React.Fragment>
                    )}

                    {/* Other Steps Section */}
                    {Object.entries(data).map(([step, stepData]) =>
                      step !== 'Fiscal Year' ? (
                        <React.Fragment key={step}>
                          <Box display="flex" flexDirection="column" alignItems="flex-start" flexGrow={1}>
                            <Box display="flex" alignItems="center">
                              <Timeline sx={{ marginRight: 1, color: '#ff5722' }} />
                              <Typography variant="h4" marginBottom={1} marginTop={1} color="secondary">
                                {step.replace(/([A-Z])/g, ' $1').trim()}
                              </Typography>
                            </Box>
                            {Object.entries(stepData).map(
                              ([key, value]) =>
                                key !== 'frequency' && (
                                  <Typography key={key} variant="body1" color="textSecondary" sx={{ padding: '2px 0' }}>
                                    <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>{' '}
                                    {Array.isArray(value)
                                      ? value.map((date, idx) => (
                                          <Box key={idx} sx={{ paddingLeft: 2 }}>
                                            <Typography>
                                              <strong>Start Date:</strong> {date.start_date}
                                            </Typography>
                                            <Typography>
                                              <strong>End Date:</strong> {date.end_date}
                                            </Typography>
                                          </Box>
                                        ))
                                      : value}
                                  </Typography>
                                )
                            )}
                          </Box>
                        </React.Fragment>
                      ) : null
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
