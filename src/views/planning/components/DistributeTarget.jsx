import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Alert,
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { firstSlideEmployee, firstSlideUnit, unitTargetValidation } from 'utils/validation/distribution';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import PropTypes from 'prop-types';
import DrogaButton from 'ui-component/buttons/DrogaButton';

const DistributeTarget = ({ add, onClose, plan_id, targets, naming }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const prevIndex = useRef(currentIndex);
  const [direction, setDirection] = useState('next');
  const [assignTo, setAssignTo] = React.useState('units');
  const [isAdding, setIsAdding] = React.useState(false);

  const [units, setUnits] = useState([]);
  const [error, setError] = React.useState({
    state: false,
    message: ''
  });

  const [selectedUnits, setSelectedUnits] = useState([]);
  const [unitPayload, setUnitPayload] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeePayload, setEmployeePayload] = useState([]);

  const handleAssignTo = (value) => {
    setAssignTo(value);
  };

  const handleUnitsChange = (event, value) => {
    setSelectedUnits(value);
    const addedUnit = value.find((unit) => !selectedUnits.some((selectedUnit) => selectedUnit.id === unit.id));
    const removedUnit = selectedUnits.find((unit) => !value.some((selectedUnit) => selectedUnit.id === unit.id));

    if (addedUnit) {
      const newPayload = {
        unit_id: addedUnit.id,
        unit_name: addedUnit.name,
        total_target: targets[currentIndex].target,
        child_weight: 0,
        unit_targets: []
      };
      setUnitPayload((prevPayload) => [...prevPayload, newPayload]);
    }

    if (removedUnit) {
      const updatedPayload = unitPayload.filter((payload) => payload.unit_id !== removedUnit.id);
      setUnitPayload(updatedPayload);
    }
  };

  const handleUnitTargetChange = (event, parent_id, unit_id) => {
    const value = event.target.value;

    setUnitPayload((prevUnit) =>
      prevUnit.map((unit) => {
        if (unit.unit_id === unit_id) {
          // Check if target with parent_id already exists inside unit target
          const targetIndex = unit.unit_targets.findIndex((target) => target.parent_id === parent_id);

          // If target exists, update it; otherwise, add a new target
          const updatedUnitTargets =
            targetIndex !== -1
              ? unit.unit_targets.map((target, index) => (index === targetIndex ? { ...target, target: value } : target))
              : [...unit.unit_targets, { parent_id: parent_id, target: value, weight: '' }];

          return { ...unit, unit_targets: updatedUnitTargets };
        }
        return unit; // Ensure to return the unit if it doesn't match the unit_id
      })
    );
  };

  const handleUnitWeightChange = (event, unit_id) => {
    const value = event.target.value;

    setUnitPayload((prevUnit) =>
      prevUnit.map((unit) => {
        if (unit.unit_id === unit_id) {
          return { ...unit, child_weight: value };
        }
        return unit;
      })
    );
  };

  const handleEmployeesChange = (event, value) => {
    setSelectedEmployees(value);

    const addedEmployee = value.find((unit) => !selectedEmployees.some((selectedUnit) => selectedUnit.id === unit.id));
    const removeEmployee = selectedEmployees.find((unit) => !value.some((selectedUnit) => selectedUnit.id === unit.id));

    if (addedEmployee) {
      const newPayload = {
        unit_id: addedEmployee.id,
        unit_name: addedEmployee.user?.name,
        total_target: targets[currentIndex].target,
        child_weight: 0,
        unit_targets: []
      };
      setEmployeePayload((prevPayload) => [...prevPayload, newPayload]);
    }

    if (removeEmployee) {
      const updatedPayload = employeePayload.filter((payload) => payload.unit_id !== removeEmployee.id);
      setEmployeePayload(updatedPayload);
    }
  };

  const handleEmployeeTargetChange = (event, parent_id, unit_id) => {
    const value = event.target.value;

    setEmployeePayload((prevUnit) =>
      prevUnit.map((unit) => {
        if (unit.unit_id === unit_id) {
          // Check if target with parent_id already exists inside unit target
          const targetIndex = unit.unit_targets.findIndex((target) => target.parent_id === parent_id);

          // If target exists, update it; otherwise, add a new target
          const updatedUnitTargets =
            targetIndex !== -1
              ? unit.unit_targets.map((target, index) => (index === targetIndex ? { ...target, target: value } : target))
              : [...unit.unit_targets, { parent_id: parent_id, target: value }];

          return { ...unit, unit_targets: updatedUnitTargets };
        }
        return unit; // Ensure to return the unit if it doesn't match the unit_id
      })
    );
  };

  const handleEmployeeWeightChange = (event, unit_id) => {
    const value = event.target.value;

    setEmployeePayload((prevUnit) =>
      prevUnit.map((unit) => {
        if (unit.unit_id === unit_id) {
          return { ...unit, child_weight: value };
        }
        return unit;
      })
    );
  };

  const handleFetchingUnits = async () => {
    setUnits([]);
    const token = await GetToken();
    const Api = Backend.api + Backend.childUnits;
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
          setUnits(response.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleNext = () => {
    if (currentIndex === 0 && assignTo === 'units') {
      const validation = firstSlideUnit(unitPayload, targets[currentIndex].id);
      if (validation.valid) {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % targets.length);
        setError({ ...error, state: false, message: '' });
      } else {
        setError({ ...error, state: true, message: validation.errors[0] });
      }
    }

    if (currentIndex > 0 && assignTo === 'units') {
      const validation = unitTargetValidation(unitPayload, targets[currentIndex].id);

      if (validation.valid) {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % targets.length);
        setError({ ...error, state: false, message: '' });
      } else {
        setError({ ...error, state: true, message: validation.errors[0] });
      }
    }

    if (currentIndex === 0 && assignTo === 'employees') {
      const validation = firstSlideEmployee(employeePayload, targets[currentIndex].id);
      if (validation.valid) {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % targets.length);
        setError({ ...error, state: false, message: '' });
      } else {
        setError({ ...error, state: true, message: validation.errors[0] });
      }
    }

    if (currentIndex > 0 && assignTo === 'employees') {
      const validation = unitTargetValidation(employeePayload, targets[currentIndex].id);
      if (validation.valid) {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % targets.length);
        setError({ ...error, state: false, message: '' });
      } else {
        setError({ ...error, state: true, message: validation.errors[0] });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + targets.length) % targets.length);
    }
  };

  const handleSubmissionValidation = () => {
    const unitValidation = unitTargetValidation(unitPayload, targets[currentIndex].id);
    const employeeValidation = unitTargetValidation(employeePayload, targets[currentIndex].id);

    if (!unitValidation.valid) {
      setError({ ...error, state: true, message: unitValidation.errors[0] });
      return false;
    }

    if (!employeeValidation.valid) {
      setError({ ...error, state: true, message: employeeValidation.errors[0] });
      return false;
    }

    if (unitValidation.valid && employeeValidation.valid) {
      return true;
    }
  };

  const handleSubmission = async () => {
    if (handleSubmissionValidation()) {
      setError({ ...error, state: false, message: '' });
      setIsAdding(true);
      const token = await GetToken();
      const Api = Backend.api + Backend.distributeTarget;
      const header = {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      };

      const data = {
        plan_id: plan_id,
        unit_target: unitPayload,
        employee_target: employeePayload
      };

      fetch(Api, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setIsAdding(false);
            toast.success(response.data?.message);
            onClose();
            setSelectedUnits([]);
            setUnitPayload([]);
            setSelectedEmployees([]);
            setEmployeePayload([]);
          } else {
            setIsAdding(false);
            toast.error(response.data?.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          setIsAdding(false);
        });
    }
  };

  useEffect(() => {
    handleFetchingUnits();

    return () => {};
  }, []);

  useEffect(() => {
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  return (
    <React.Fragment>
      <Dialog open={add} onClose={onClose}>
        <Box sx={{ position: 'absolute', right: 6, top: 14 }}>
          <motion.div
            whileHover={{
              rotate: 90
            }}
            transition={{ duration: 0.3 }}
            style={{ cursor: 'pointer', marginRight: 12 }}
            onClick={onClose}
          >
            <IconX size="1.2rem" stroke={2} />
          </motion.div>
        </Box>
        {targets.length > 0 && (
          <Grid container sx={{ display: 'flex', flexDirection: 'column', minWidth: '600px', padding: 1.2 }}>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <DialogTitle variant="h4">
                        {naming} {currentIndex + 1}
                      </DialogTitle>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingX: 2,
                          borderLeft: 1
                        }}
                      >
                        <Typography variant="body2"> Total target is</Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            backgroundColor: theme.palette.grey[100],
                            paddingX: 2,
                            borderRadius: 10,
                            marginLeft: 1
                          }}
                        >
                          {targets[currentIndex].target}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ paddingX: 2, marginTop: 1.4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
                      {['units', 'employees'].map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          sx={{ marginLeft: 1, cursor: 'pointer', textTransform: 'capitalize' }}
                          color="primary"
                          variant={assignTo === item ? 'filled' : 'outlined'}
                          onClick={() => handleAssignTo(item)}
                        />
                      ))}
                    </Box>
                    {currentIndex === 0 && (
                      <>
                        {assignTo === 'employees' ? (
                          <Autocomplete
                            id="employee_list"
                            multiple
                            options={units?.employees || []}
                            getOptionLabel={(option) => option.user?.name || ''}
                            value={selectedEmployees}
                            onChange={handleEmployeesChange}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip className="employee-chips" label={option.user?.name || ''} {...getTagProps({ index })} />
                              ))
                            }
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Select an employee" variant="outlined" />}
                            sx={{ marginTop: 4 }}
                            disableClearable
                          />
                        ) : (
                          <Autocomplete
                            id="unit_list"
                            multiple
                            options={units?.child_unit || []}
                            getOptionLabel={(option) => option.name || ''}
                            value={selectedUnits}
                            onChange={handleUnitsChange}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip className="unit-chips" label={option.name || ''} {...getTagProps({ index })} />
                              ))
                            }
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Select a unit" variant="outlined" />}
                            sx={{ marginTop: 4 }}
                            disableClearable
                          />
                        )}
                      </>
                    )}
                    {assignTo === 'employees' ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ minWidth: 120 }}>Employee name</TableCell>
                            {currentIndex === 0 && <TableCell sx={{ minWidth: 80 }}>Annum weight(%)</TableCell>}
                            <TableCell sx={{ minWidth: 80 }}>Employee target</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employeePayload.length === 0 ? (
                            <TableRow>
                              <TableCell sx={{ display: 'flex', alignItems: 'center', padding: 2, border: 0 }} colSpan={3}>
                                Please select employee
                              </TableCell>
                            </TableRow>
                          ) : (
                            employeePayload?.map((unit, index) => {
                              const targetIndex = unit.unit_targets?.findIndex((target) => target.parent_id === targets[currentIndex].id);
                              const targetValue =
                                targetIndex !== -1 && targetIndex !== undefined ? unit.unit_targets[targetIndex].target : '';

                              return (
                                <TableRow key={index}>
                                  <TableCell>{unit.unit_name}</TableCell>
                                  {currentIndex === 0 && (
                                    <TableCell>
                                      <InputBase
                                        sx={{ p: 0.5, border: 0.4, borderRadius: 2, borderColor: 'primary.main' }}
                                        value={unit.child_weight}
                                        onChange={(event) => handleEmployeeWeightChange(event, unit.unit_id)}
                                        inputProps={{ 'aria-label': 'target' }}
                                        type="number"
                                      />
                                    </TableCell>
                                  )}
                                  <TableCell>
                                    <InputBase
                                      sx={{ p: 0.5, border: 0.4, borderRadius: 2, borderColor: 'primary.main' }}
                                      value={targetValue}
                                      onChange={(event) => handleEmployeeTargetChange(event, targets[currentIndex].id, unit.unit_id)}
                                      inputProps={{ 'aria-label': 'target' }}
                                      type="number"
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ minWidth: 120 }}>Unit name</TableCell>
                            {currentIndex === 0 && <TableCell sx={{ minWidth: 80 }}>Annum Weight(%)</TableCell>}
                            <TableCell sx={{ minWidth: 80 }}>Unit target</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {unitPayload.length === 0 ? (
                            <TableRow>
                              <TableCell sx={{ display: 'flex', alignItems: 'center', padding: 2, border: 0 }} colSpan={3}>
                                Please select unit
                              </TableCell>
                            </TableRow>
                          ) : (
                            unitPayload?.map((unit, index) => {
                              const targetIndex = unit.unit_targets?.findIndex((target) => target.parent_id === targets[currentIndex].id);
                              const targetValue =
                                targetIndex !== -1 && targetIndex !== undefined ? unit.unit_targets[targetIndex].target : '';

                              return (
                                <TableRow key={index}>
                                  <TableCell>{unit.unit_name}</TableCell>

                                  {currentIndex === 0 && (
                                    <TableCell>
                                      <InputBase
                                        sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: 'primary.main' }}
                                        value={unit.child_weight}
                                        onChange={(event) => handleUnitWeightChange(event, unit.unit_id)}
                                        inputProps={{ 'aria-label': 'target' }}
                                      />
                                    </TableCell>
                                  )}

                                  <TableCell>
                                    <InputBase
                                      sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: 'primary.main' }}
                                      value={targetValue}
                                      onChange={(event) => handleUnitTargetChange(event, targets[currentIndex].id, unit.unit_id)}
                                      inputProps={{ 'aria-label': 'target' }}
                                      type="number"
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Grid>

            <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box> {error.state && <Alert severity="error"> {error.message}</Alert>}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 2 }}>
                <Button sx={{ marginRight: 3 }} onClick={() => handlePrev()}>
                  Back
                </Button>

                {currentIndex === targets.length - 1 ? (
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ py: 1, paddingX: 6, boxShadow: 0, borderRadius: 2 }}
                    onClick={() => handleSubmission()}
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <CircularProgress size={18} sx={{ color: 'white' }} />
                    ) : (
                      <Typography variant="subtitle1" color={theme.palette.background.default}>
                        Submit
                      </Typography>
                    )}
                  </Button>
                ) : (
                  <DrogaButton
                    title="Next"
                    type="button"
                    variant="contained"
                    sx={{ paddingX: 6, boxShadow: 0 }}
                    onPress={() => handleNext()}
                  />
                )}
              </Box>
            </DialogActions>
          </Grid>
        )}
      </Dialog>
    </React.Fragment>
  );
};

DistributeTarget.propTypes = {
  add: PropTypes.bool,
  onClose: PropTypes.func,
  plan: PropTypes.array,
  plan_id: PropTypes.number,
  targets: PropTypes.array,
  naming: PropTypes.string
};

export default DistributeTarget;
