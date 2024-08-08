import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
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
import { IconX } from '@tabler/icons-react';
import Backend from 'services/backend';
import { toast, ToastContainer } from 'react-toastify';

export const DistributeTarget = ({ add, onClose, plan_id, targets, naming }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [assignTo, setAssignTo] = React.useState('units');
  const [isAdding, setIsAdding] = React.useState(false);

  const [unitLoading, setUnitLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [unitError, setUnitError] = useState(false);
  const [search, setSearch] = useState('');

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

  const handleUnitWeightChange = (event, parent_id, unit_id) => {
    const value = event.target.value;

    setUnitPayload((prevUnit) =>
      prevUnit.map((unit) => {
        if (unit.unit_id === unit_id) {
          // Check if target with parent_id already exists inside unit target
          const targetIndex = unit.unit_targets.findIndex((target) => target.parent_id === parent_id);

          // If target exists, update it, otherwise, add a new target
          const updatedUnitTargets =
            targetIndex !== -1
              ? unit.unit_targets.map((target, index) => (index === targetIndex ? { ...target, weight: value } : target))
              : [...unit.unit_targets, { parent_id: parent_id, target: '', weight: value }];

          return { ...unit, unit_targets: updatedUnitTargets };
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

  const handleEmployeeWeightChange = (event, parent_id, unit_id) => {
    const value = event.target.value;

    setEmployeePayload((prevUnit) =>
      prevUnit.map((unit) => {
        if (unit.unit_id === unit_id) {
          // Check if target with parent_id already exists inside unit target
          const targetIndex = unit.unit_targets.findIndex((target) => target.parent_id === parent_id);

          // If target exists, update it, otherwise, add a new target
          const updatedUnitTargets =
            targetIndex !== -1
              ? unit.unit_targets.map((target, index) => (index === targetIndex ? { ...target, weight: value } : target))
              : [...unit.unit_targets, { parent_id: parent_id, target: '', weight: value }];

          return { ...unit, unit_targets: updatedUnitTargets };
        }
        return unit;
      })
    );
  };

  const handleFetchingUnits = () => {
    setUnitLoading(true);
    setUnits([]);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.childUnits + `?search=${search}`;
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
          setUnitLoading(false);
          setUnitError(false);
        } else {
          setUnitLoading(false);
          setUnitError(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setUnitLoading(false);
        setUnitError(false);
      });
  };

  const handleNext = () => {
    if (currentIndex < targets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmission = () => {
    setIsAdding(true);
    const token = localStorage.getItem('token');
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
  };

  useEffect(() => {
    handleFetchingUnits();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Dialog open={add} onClose={onClose}>
        <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={12} sx={{ minWidth: '600px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <Box>
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
                    <Typography variant="body2"> Target is</Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ backgroundColor: theme.palette.primary.light, paddingX: 1, borderRadius: 2, marginLeft: 1 }}
                    >
                      {targets[currentIndex].target}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={onClose}>
                  <IconX size={20} />
                </IconButton>
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
                  >
                    {item}
                  </Chip>
                ))}
              </Box>

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
                    value.map((option, index) => <Chip className="unit-chips" label={option.name || ''} {...getTagProps({ index })} />)
                  }
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Select a unit" variant="outlined" />}
                  sx={{ marginTop: 4 }}
                />
              )}

              {assignTo === 'employees' ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 120 }}>Employee name</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Employee target</TableCell>
                      {currentIndex === 0 && <TableCell sx={{ minWidth: 80 }}>Annum weight(%)</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeePayload.length === 0 ? (
                      <TableRow>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }} colSpan={2}>
                          Please select employee
                        </TableCell>
                      </TableRow>
                    ) : (
                      employeePayload?.map((unit, index) => {
                        const targetIndex = unit.unit_targets?.findIndex((target) => target.parent_id === targets[currentIndex].id);
                        const targetValue = targetIndex !== -1 && targetIndex !== undefined ? unit.unit_targets[targetIndex].target : '';
                        const targetWeight = targetIndex !== -1 && targetIndex !== undefined ? unit.unit_targets[targetIndex].weight : '';
                        return (
                          <TableRow key={index}>
                            <TableCell>{unit.unit_name}</TableCell>
                            <TableCell>
                              <InputBase
                                sx={{ p: 0.5, border: 0.4, borderRadius: 2, borderColor: theme.palette.primary.main }}
                                value={targetValue}
                                onChange={(event) => handleEmployeeTargetChange(event, targets[currentIndex].id, unit.unit_id)}
                                inputProps={{ 'aria-label': 'target' }}
                                type="number"
                              />
                            </TableCell>

                            {currentIndex === 0 && (
                              <TableCell>
                                <InputBase
                                  sx={{ p: 0.5, border: 0.4, borderRadius: 2, borderColor: theme.palette.primary.main }}
                                  value={targetWeight}
                                  onChange={(event) => handleEmployeeWeightChange(event, targets[currentIndex].id, unit.unit_id)}
                                  inputProps={{ 'aria-label': 'target' }}
                                  type="number"
                                />
                              </TableCell>
                            )}
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
                      <TableCell sx={{ minWidth: 80 }}>Unit target</TableCell>
                      {currentIndex === 0 && <TableCell sx={{ minWidth: 80 }}>Annum Weight(%)</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {unitPayload.length === 0 ? (
                      <TableRow>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }} colSpan={2}>
                          Please select unit
                        </TableCell>
                      </TableRow>
                    ) : (
                      unitPayload?.map((unit, index) => {
                        const targetIndex = unit.unit_targets?.findIndex((target) => target.parent_id === targets[currentIndex].id);
                        const targetValue = targetIndex !== -1 && targetIndex !== undefined ? unit.unit_targets[targetIndex].target : '';
                        const targetWeight = targetIndex !== -1 && targetIndex !== undefined ? unit.unit_targets[targetIndex].weight : '';
                        return (
                          <TableRow key={index}>
                            <TableCell>{unit.unit_name}</TableCell>
                            <TableCell>
                              <InputBase
                                sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                                value={targetValue}
                                onChange={(event) => handleUnitTargetChange(event, targets[currentIndex].id, unit.unit_id)}
                                inputProps={{ 'aria-label': 'target' }}
                                type="number"
                              />
                            </TableCell>
                            {currentIndex === 0 && (
                              <TableCell>
                                <InputBase
                                  sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                                  value={targetWeight}
                                  onChange={(event) => handleUnitWeightChange(event, targets[currentIndex].id, unit.unit_id)}
                                  inputProps={{ 'aria-label': 'target' }}
                                  type="number"
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </Box>

            <DialogActions sx={{ paddingX: 2 }}>
              <Button sx={{ marginLeft: 10 }} onClick={() => handlePrev()}>
                Back
              </Button>

              {currentIndex === targets.length - 1 ? (
                <Button
                  type="button"
                  variant="contained"
                  sx={{ paddingX: 6, boxShadow: 0 }}
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
                <Button type="button" variant="contained" sx={{ paddingX: 6, boxShadow: 0 }} onClick={() => handleNext()}>
                  Next
                </Button>
              )}
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
};
