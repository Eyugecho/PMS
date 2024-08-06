import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Autocomplete,
  Box,
  Chip,
  Divider,
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
import { toast } from 'react-toastify';

export const DistributeTarget = ({ add, onClose, plan_id, targets, naming, handleSubmission }) => {
  //   console.log(targets[0]);
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [assignTo, setAssignTo] = React.useState('units');

  const [unitLoading, setUnitLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [unitError, setUnitError] = useState(false);
  const [search, setSearch] = useState('');

  const [selectedUnits, setSelectedUnits] = useState([]);
  const [unitPayload, setUnitPayload] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeePayload, setEmployeePayload] = useState([]);

  const handleUnitsChange = (event, value) => {
    setSelectedUnits(value);
    const addedUnit = value.find((unit) => !selectedUnits.some((selectedUnit) => selectedUnit.id === unit.id));
    const removedUnit = selectedUnits.find((unit) => !value.some((selectedUnit) => selectedUnit.id === unit.id));

    if (addedUnit) {
      const newPayload = {
        unit_id: addedUnit.id,
        unit_name: addedUnit.name,
        parent_id: targets[currentIndex].id,
        total_target: targets[currentIndex].target,
        unit_target: 0
      };
      setUnitPayload((prevPayload) => [...prevPayload, newPayload]);
    }

    if (removedUnit) {
      const updatedPayload = unitPayload.filter((payload) => payload.unit_id !== removedUnit.id);
      setUnitPayload(updatedPayload);
    }
  };

  const handleEmployeesChange = (event, value) => {
    setSelectedEmployees(value);
    let newEmployee = value[value.length - 1];

    const updatedPayload = {
      unit_id: newEmployee.id,
      unit_name: newEmployee.name,
      parent_id: targets[currentIndex].id,
      total_target: targets[currentIndex].target,
      unit_target: 0
    };

    setEmployeePayload((prevPayload) => [...prevPayload, updatedPayload]);
  };

  const handleAssignTo = (value) => {
    setAssignTo(value);
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

  const handleSelection = (event, value) => {};

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
                      <TableCell sx={{ minWidth: 80 }}>Target Assigned</TableCell>
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
                      employeePayload?.map((unit, index) => (
                        <TableRow key={index}>
                          <TableCell>{unit.unit_name}</TableCell>
                          <TableCell>
                            <InputBase
                              sx={{ p: 0.5, border: 0.4, borderRadius: 2, borderColor: theme.palette.primary.main }}
                              value={unit.target}
                              inputProps={{ 'aria-label': 'target' }}
                              type="number"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 120 }}>Unit name</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Target Assigned</TableCell>
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
                      unitPayload?.map((unit, index) => (
                        <TableRow key={index}>
                          <TableCell>{unit.unit_name}</TableCell>
                          <TableCell>
                            <InputBase
                              sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                              value={unit.target}
                              inputProps={{ 'aria-label': 'target' }}
                              type="number"
                            />
                          </TableCell>
                        </TableRow>
                      ))
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
                <Button type="submit" variant="contained" sx={{ paddingX: 6, boxShadow: 0 }} onClick={() => handleNext()}>
                  Submit
                </Button>
              ) : (
                <Button type="submit" variant="contained" sx={{ paddingX: 6, boxShadow: 0 }} onClick={() => handleNext()}>
                  Next
                </Button>
              )}
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};
