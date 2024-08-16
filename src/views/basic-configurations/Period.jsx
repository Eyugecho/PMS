// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Card,
//   CardContent,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Configuration URL (Ensure you have config setup properly)
// import config from '../../configration/config';

// function Period() {
//   const [periods, setPeriods] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       // Fetch frequencies
//       const responseFrequencies = await fetch(`${config.API_URL_Units}/frequencies`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const dataFrequencies = await responseFrequencies.json();
//       if (dataFrequencies.success) {
//         setFrequencies(dataFrequencies.data.data);
//       } else {
//         toast.error('Failed to fetch frequencies');
//       }

//       // Fetch activities
//       const responseActivities = await fetch(`${config.API_URL_Units}/get-period-activities`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const dataActivities = await responseActivities.json();
//       if (dataActivities.success) {
//         setActivities(dataActivities.data);
//       } else {
//         toast.error('Failed to fetch activities');
//       }

//       // Fetch periods
//       const responsePeriods = await fetch(`${config.API_URL_Units}/periods`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const dataPeriods = await responsePeriods.json();
//       if (dataPeriods.success) {
//         setPeriods(dataPeriods.data.periods);
//       } else {
//         toast.error('Failed to fetch periods');
//       }
//     } catch (error) {
//       toast.error('Error occurred while fetching data');
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       fiscalYear: '',
//       frequency: '',
//       activity: '',
//       dates: [],
//     },
//     onSubmit: async (values, { resetForm }) => {
//       const frequency = frequencies.find((freq) => freq.id === values.frequency);
//       if (values.fiscalYear && frequency && values.activity) {
//         const newPeriod = {
//           fiscal_year: values.fiscalYear,
//           frequency_id: frequency.id,
//           type: values.activity,
//           dates: values.dates,
//         };

//         try {
//           const token = localStorage.getItem('token');
//           const method = editIndex !== null ? 'PATCH' : 'POST';
//           const url = editIndex !== null
//             ? `${config.API_URL_Units}/periods/${periods[editIndex].id}`
//             : `${config.API_URL_Units}/periods`;

//           const response = await fetch(url, {
//             method: method,
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newPeriod),
//           });
//           console.log(response);
          
//           const result = await response.json();
//           if (result.success) {
//             toast.success(editIndex !== null ? 'Period updated' : 'Period created');
//             fetchData(); // Refresh the list
//             handleClose();
//           } else {
//             toast.error(result.message || 'Failed to save period');
//           }
//         } catch (error) {
//           // toast.error('Error occurred while saving period');
//         }

//         resetForm();
//       }
//     },
//   });

//   const handleEdit = (index) => {
//     const period = periods[index];
//     formik.setFieldValue('fiscalYear', period.fiscal_year_id);
//     formik.setFieldValue('frequency', period.frequency_id);
//     formik.setFieldValue('activity', period.type);
//     formik.setFieldValue('dates', [{ startDate: period.start_date, endDate: period.end_date }]);
//     setEditIndex(index);
//     handleOpen();
//   };

//   const handleDelete = async (index) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${config.API_URL_Units}/periods/${periods[index].id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const result = await response.json();
//       if (result.success) {
//         toast.success('Period deleted');
//         fetchData(); // Refresh the list
//       } else {
//         toast.error(result.message || 'Failed to delete period');
//       }
//     } catch (error) {
//       toast.error('Error occurred while deleting period');
//     }
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     formik.resetForm();
//   };

//   const renderDateFields = () => {
//     const frequency = frequencies.find((freq) => freq.id === formik.values.frequency);
//     if (!frequency) return null;

//     const numOfFields = frequency.value; // Number of date fields

//     return Array.from({ length: numOfFields }, (_, i) => (
//       <Grid container spacing={2} key={i}>
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             id={`startDate-${i}`}
//             name={`dates[${i}].start_date`}
//             label={`Start Date ${i + 1}`}
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formik.values.dates[i]?.startDate || ''}
//             onChange={formik.handleChange}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             id={`endDate-${i}`}
//             name={`dates[${i}].end_date`}
//             label={`End Date ${i + 1}`}
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formik.values.dates[i]?.endDate || ''}
//             onChange={formik.handleChange}
//           />
//         </Grid>
//       </Grid>
//     ));
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card variant="outlined">
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Create New Period
//               </Typography>
//               <Box component="form" onSubmit={formik.handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       id="fiscalYear"
//                       name="fiscalYear"
//                       label="Fiscal Year"
//                       value={formik.values.fiscalYear}
//                       onChange={formik.handleChange}
//                       error={formik.touched.fiscalYear && Boolean(formik.errors.fiscalYear)}
//                       helperText={formik.touched.fiscalYear && formik.errors.fiscalYear}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel id="frequency-label">Frequency</InputLabel>
//                       <Select
//                         labelId="frequency-label"
//                         id="frequency"
//                         name="frequency"
//                         value={formik.values.frequency}
//                         onChange={formik.handleChange}
//                         error={formik.touched.frequency && Boolean(formik.errors.frequency)}
//                       >
//                         <MenuItem value="">None</MenuItem>
//                         {frequencies.map((frequency) => (
//                           <MenuItem key={frequency.id} value={frequency.id}>
//                             {frequency.name} ({frequency.value})
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel id="activity-label">Activity</InputLabel>
//                       <Select
//                         labelId="activity-label"
//                         id="activity"
//                         name="activity"
//                         value={formik.values.activity}
//                         onChange={formik.handleChange}
//                         error={formik.touched.activity && Boolean(formik.errors.activity)}
//                       >
//                         <MenuItem value="">None</MenuItem>
//                         {activities.map((activity, index) => (
//                           <MenuItem key={index} value={activity}>
//                             {activity}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//                 <Box mt={2}>
//                   {renderDateFields()}
//                 </Box>
//                 <Box mt={2}>
//                   <Button color="primary" variant="contained"  type="submit">
//                     {editIndex !== null ? 'Update Period' : 'Create Period'}
//                   </Button>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12}>
//           <Card variant="outlined">
//             <CardContent>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Fiscal Year</TableCell>
//                       <TableCell>Activity</TableCell>
//                       <TableCell>Start Date</TableCell>
//                       <TableCell>End Date</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {periods.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={7} align="center">
//                           <SentimentDissatisfiedIcon />
//                           No Periods Found
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       periods.map((period, index) => (
//                         <TableRow key={index}>
//                           <TableCell>{period.fiscal_year.year}</TableCell>
//                           <TableCell>{period.fiscal_year.type}</TableCell>
//                           <TableCell>{period.start_date}</TableCell>
//                           <TableCell>{period.end_date}</TableCell>
//                           <TableCell>
//                             <IconButton onClick={() => handleEdit(index)}>
//                               <EditIcon />
//                             </IconButton>
//                             <IconButton onClick={() => handleDelete(index)}>
//                               <DeleteIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <ToastContainer />
//     </Box>
//   );
// }

// export default Period;


import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, keyframes } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const blinkAnimation = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const BlinkingStepLabel = styled(StepLabel)(({ theme }) => ({
  animation: `${blinkAnimation} 1s linear infinite`,
  padding: theme.spacing(1)
}));

const FallbackMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center'
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

const steps = [ 'Fiscal Year', 'Planning Period', 'Frequency Period Value', 'Evaluation Period'];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [stepData, setStepData] = React.useState({});
  const [tableData, setTableData] = React.useState([]);
  const [fiscalYears, setFiscalYears] = React.useState([]);
  const [frequencies, setFrequencies] = React.useState([]);
  const [savedFiscalYear, setSavedFiscalYear] = React.useState(null);

  const handleSaveFrequency = (data) => {
    setFrequencies((prev) => [...prev, data]);
  };

  const handleSaveFiscalYear = (data) => {
    setFiscalYears((prev) => [...prev, data]);
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
    setOpen(true);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setOpen(true);
    }
  };

  const handleSave = () => {
    const filteredData = steps.reduce((acc, step) => {
      if (step !== 'Frequency' && step !== 'Fiscal Year') {
        acc[step] = stepData[step] || '';
      }
      return acc;
    }, {});

    if (steps[activeStep] === 'Fiscal Year') {
      setFiscalYears((prevFiscalYears) => [
        ...prevFiscalYears,
        {
          year: stepData['Fiscal Year'].year
        }
      ]);
    }

    setTableData((prevTableData) => [...prevTableData, filteredData]);
    setStepData({});
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

  const handleFiscalYearSubmit = async () => {
    const token = localStorage.getItem('token');
    const Api = `${Backend.api}${Backend.fiscal-years}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const fiscalYearData = {
      year: stepData['Fiscal Year'].year,
      start_date: stepData['Fiscal Year'].startDate,
      end_date: stepData['Fiscal Year'].endDate
    };

    try {
      setLoading(true);
      setError(false);

      const response = await fetch(Api, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(fiscalYearData)
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful submission, e.g., show a success message or update UI
        console.log('Fiscal year created successfully:', data.data);
        // Optionally, clear form or update state
        setStepData((prevData) => ({
          ...prevData,
          'Fiscal Year': {
            year: '',
            startDate: '',
            endDate: ''
          }
        }));
      } else {
        // Handle errors returned from the API
        setError(true);
        console.error('Fiscal year submission failed:', data.message);
      }
    } catch (error) {
      // Handle any unexpected errors
      setError(true);
      console.error('An error occurred while submitting fiscal year:', error);
    } finally {
      setLoading(false);
    }
  };
const handleSubmit = (event) => {
  event.preventDefault();
  handleFiscalYearSubmit();
};


  const handleFrequencyChange = (e) => {
    const value = Number(e.target.value);
    const dates = Array.from({ length: value }, (_, index) => ({
      [`startDate_${index + 1}`]: '',
      [`endDate_${index + 1}`]: ''
    }));

    setStepData((prevData) => ({
      ...prevData,
      [steps[activeStep]]: {
        ...prevData[steps[activeStep]],
        frequency: value,
        dates
      }
    }));
  };

  const handleDateChange = (e, index, type) => {
    const value = e.target.value;

    setStepData((prevData) => {
      const newDates = prevData[steps[activeStep]].dates.map((date, i) => (i === index ? { ...date, [type]: value } : date));

      return {
        ...prevData,
        [steps[activeStep]]: {
          ...prevData[steps[activeStep]],
          dates: newDates
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
            top: '64%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
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
                  <TextField
                    name="year"
                    label="Year"
                    value={stepData[steps[activeStep]]?.year || ''}
                    onChange={handleInputChange}
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
              ) : steps[activeStep] === 'Planning Period' ? (
                <>
                  <Typography variant="body1">
                    Fiscal Year: {fiscalYears.find((fy) => fy.year === stepData['Fiscal Year']?.year)?.year || 'N/A'}
                  </Typography>
                  <>
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
                  </>
                </>
              ) : steps[activeStep] === 'Frequency Period Value' ? (
                <>
                  <Typography variant="body1">
                    Fiscal Year: {fiscalYears.find((fy) => fy.year === stepData['Fiscal Year']?.year)?.year || 'N/A'}
                  </Typography>
                  <>
                    <Select
                      name="frequency"
                      value={stepData[steps[activeStep]]?.frequency || ''}
                      onChange={handleFrequencyChange}
                      fullWidth
                      margin="normal"
                    >
                      <MenuItem value={12}>Monthly</MenuItem>
                      <MenuItem value={4}>Quarterly</MenuItem>
                      <MenuItem value={2}>Semi-Annually</MenuItem>
                      <MenuItem value={1}>Annually</MenuItem>
                    </Select>
                    {stepData[steps[activeStep]]?.dates?.map((date, index) => (
                      <Stack key={index} spacing={1}>
                        <TextField
                          name={`startDate_${index + 1}`}
                          label={`Start Date ${index + 1}`}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={date[`startDate_${index + 1}`] || ''}
                          onChange={(e) => handleDateChange(e, index, `startDate_${index + 1}`)}
                          fullWidth
                        />
                        <TextField
                          name={`endDate_${index + 1}`}
                          label={`End Date ${index + 1}`}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={date[`endDate_${index + 1}`] || ''}
                          onChange={(e) => handleDateChange(e, index, `endDate_${index + 1}`)}
                          fullWidth
                        />
                      </Stack>
                    ))}
                  </>
                </>
              ) : steps[activeStep] === 'Evaluation Period' ? (
                <>
                  <Typography variant="body1">
                    Fiscal Year: {fiscalYears.find((fy) => fy.year === stepData['Fiscal Year']?.year)?.year || 'N/A'}
                  </Typography>
                  <>
                    <TextField
                      name="evaluation"
                      label="Evaluation"
                      value={stepData[steps[activeStep]]?.evaluation || ''}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                  </>
                </>
              ) : null}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {activeStep < steps.length - 1 && (
                  <Button variant="contained" color="primary" type='submit' onClick={handleNext}>
                    Next
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button variant="contained" color="secondary" onClick={handleSave}>
                    Save
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <Stack spacing={2}>
        {tableData.length === 0 ? (
          <FallbackMessage variant="h6">No data available. Please save data from each step.</FallbackMessage>
        ) : (
          tableData.map((data, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                mb: 2,
                // width: '1050px',
                boxShadow: 1, // Add shadow for more depth
                borderRadius: 2, // Rounded corners
                padding: 2, // Padding inside the card
                '&:hover': {
                  boxShadow: 2, // Increase shadow on hover
                  transform: 'scale(1.02)', // Slight scale effect on hover
                  transition: '0.3s ease-in-out' // Smooth transition
                }
              }}
            >
              <CardContent>
                {Object.entries(data).map(([key, value]) => (
                  <Typography key={key} variant="body2">
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Stack>
  );
}
