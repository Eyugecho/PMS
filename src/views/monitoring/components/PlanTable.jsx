import React, { useState, useEffect } from 'react';
import {
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  FormControl
} from '@mui/material';
import { PeriodNaming } from 'utils/function';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { MonitorModal } from './MonitorModal';
import { toast, ToastContainer } from 'react-toastify';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import FrequencySelector from 'views/settings/periods/components/FrequencySelector';

const PlanTable = ({ hideActions, plans, unitName, unitType, onRefresh }) => {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const [add, setAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentValue, setCurrentValue] = useState('0');

  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);

  const handleRowClick = (index, planID) => {
    if (selectedRow === index) {
      setSelectedRow(null);
      setSelectedTarget(null);
    } else {
      setSelectedRow(index);
      setSelectedTarget(planID);
    }
  };

  const handleMonitoringClick = (targetId, value, action) => {
    setTargetId(targetId);
    if (action === 'update') {
      setCurrentValue(value);
    } else {
      setCurrentValue('0');
    }
    setAdd(true);
  };

  const getCurrentMonth = () => {
    if (selectedRow >= 0 && plans[selectedRow]?.target) {
      const targets = plans[selectedRow]?.target || [];
      const singleTarget = targets.find((target) => target.id === targetId);

      const activeMonth = singleTarget?.months?.find((month) => month.status === 'true');

      return activeMonth?.month || '';
    } else {
      return '';
    }
  };

  const handleMonitoring = async (value, activeMonth) => {
    setIsAdding(true);
    const token = await GetToken();
    const Api = Backend.api + Backend.monitor;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      target_setting_id: targetId,
      actual_value: value?.actual_value,
      month: activeMonth,
      description: value?.description
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
          handleMonitorModalClose();
          toast.success(response.data.message);
          onRefresh();
        } else {
          setIsAdding(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setIsAdding(false);
      });
  };
  const handleSelection = (index) => {
    setSelectedPeriodIndex(index);
  };
  const periodOptions = plans[selectedRow]?.target?.map((target, index) => ({
    name: `${PeriodNaming(target)} ${index + 1}`,
    value: index
  }));

  const handleMonitorModalClose = () => {
    setAdd(false);
  };

  useEffect(() => {
    const currentPeriodIndex = plans[selectedRow]?.target?.findIndex((target) => target.is_current_period) ?? 0;

    setSelectedPeriodIndex(currentPeriodIndex);
  }, [plans, selectedRow]);

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ minHeight: '22dvh' }}>
        <Table sx={{ minWidth: 450 }} aria-label="unit plan table">
          <TableHead>
            <TableRow>
              <TableCell>KPI Name</TableCell>
              <TableCell>Inherited Weights(%)</TableCell>
              <TableCell>KPI Weights(%)</TableCell>
              <TableCell>Total Targets</TableCell>
              <TableCell>Measuring Unit</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans?.map((plan, index) => (
              <React.Fragment key={plan?.id}>
                <TableRow
                  sx={{
                    backgroundColor: selectedRow == index ? theme.palette.grey[50] : theme.palette.background.default,
                    ':hover': {
                      backgroundColor: theme.palette.grey[50],
                      color: theme.palette.background.default,
                      cursor: 'pointer',
                      borderRadius: 2
                    }
                  }}
                >
                  <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(index, plan?.id)}>
                      {selectedRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>

                    <Typography variant="subtitle1" color={theme.palette.text.primary}>
                      {plan?.kpi?.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {plan?.inherit_weight ? parseFloat(plan?.inherit_weight).toFixed(1) + '%' : 'N/A'}{' '}
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>{parseFloat(plan?.weight).toFixed(1)}%</TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.total_target}</TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.kpi?.measuring_unit?.name}</TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.frequency?.name}</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Button variant="outlined" onClick={() => handleRowClick(index, plan?.id)}>
                      Targets
                    </Button>
                  </TableCell>
                </TableRow>

                {selectedRow === index && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Collapse in={selectedRow !== null} timeout="auto" unmountOnExit>
                        <Table sx={{ minWidth: 650 }} aria-label="Organization plan table">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <FormControl>
                                  <FrequencySelector
                                    options={periodOptions}
                                    handleSelection={handleSelection}
                                    index={selectedPeriodIndex}
                                    selectedName={periodOptions[selectedPeriodIndex]?.name}
                                  />
                                </FormControl>
                              </TableCell>
                              <TableCell>Targets</TableCell>

                              {plan?.target[selectedPeriodIndex]?.months?.map((monthObj, monthIndex) => (
                                <TableCell key={monthIndex}>{monthObj.month}</TableCell>
                              ))}
                              <TableCell>Actuals</TableCell>

                              {plan?.target[selectedPeriodIndex]?.months?.some((month) => month.status === 'true') && !hideActions && (
                                <TableCell>Action</TableCell>
                              )}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            <TableRow
                              sx={
                                selectedTarget === plan?.target[selectedRow]?.id
                                  ? {
                                      backgroundColor: theme.palette.grey[100],
                                      ':hover': {
                                        backgroundColor: theme.palette.grey[100],
                                        color: theme.palette.background.default,
                                        cursor: 'pointer',
                                        borderRadius: 2
                                      }
                                    }
                                  : {
                                      backgroundColor: theme.palette.primary.light,
                                      ':hover': {
                                        backgroundColor: theme.palette.grey[100],
                                        color: theme.palette.background.default,
                                        cursor: 'pointer',
                                        borderRadius: 2
                                      }
                                    }
                              }
                            >
                              <TableCell sx={{ border: 0 }}>
                                {PeriodNaming(plan?.frequency?.name) + ' ' + (selectedPeriodIndex + 1)}
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>{plan?.target[selectedPeriodIndex]?.target}</TableCell>

                              {plan?.target[selectedPeriodIndex]?.months?.map((monthObj, monthIndex) => {
                                const foundMonth = plan?.target[selectedPeriodIndex]?.months?.find(
                                  (month) => month.month === monthObj.month
                                );

                                return (
                                  <TableCell
                                    key={monthIndex}
                                    sx={{
                                      border: 0,
                                      backgroundColor: foundMonth?.status === 'true' ? theme.palette.success.light : theme.palette,
                                      color:
                                        foundMonth?.status === 'true' ? theme.palette.success.contrastText : theme.palette.text.disabled
                                    }}
                                  >
                                    {foundMonth ? foundMonth.value : '-'}
                                  </TableCell>
                                );
                              })}

                              <TableCell sx={{ border: 0 }}>{plan?.target[selectedPeriodIndex]?.actual_value}</TableCell>

                              {plan?.target[selectedPeriodIndex]?.is_current_period &&
                                plan?.target[selectedPeriodIndex]?.months?.some((month) => month.status === 'true') &&
                                !hideActions && (
                                  <TableCell sx={{ border: 0 }}>
                                    {(() => {
                                      const hasStatusTrue = plan?.target[selectedPeriodIndex]?.months?.some(
                                        (month) => month.status === 'true'
                                      );

                                      if (!hasStatusTrue) {
                                        return (
                                          <Button
                                            variant="contained"
                                            disabled
                                            sx={{ boxShadow: 0, backgroundColor: 'red', color: 'white' }}
                                          >
                                            Time Limit Expired
                                          </Button>
                                        );
                                      } else if (plan?.target[selectedPeriodIndex]?.actual_value === 0) {
                                        return (
                                          <Button
                                            variant="contained"
                                            sx={{ boxShadow: 0 }}
                                            onClick={() => handleMonitoringClick(plan?.target[selectedPeriodIndex]?.id, 0, 'evaluate')}
                                          >
                                            Monitor
                                          </Button>
                                        );
                                      } else {
                                        return (
                                          <Button
                                            variant="text"
                                            sx={{ boxShadow: 0 }}
                                            onClick={() =>
                                              handleMonitoringClick(
                                                plan?.target[selectedPeriodIndex]?.id,
                                                plan?.target[selectedPeriodIndex]?.actual_value,
                                                'update'
                                              )
                                            }
                                          >
                                            Update Monitor
                                          </Button>
                                        );
                                      }
                                    })()}
                                  </TableCell>
                                )}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {targetId && (
        <MonitorModal
          add={add}
          activeMonth={getCurrentMonth()}
          unitName={unitName}
          unitType={unitType}
          isAdding={isAdding}
          currentValue={currentValue}
          onClose={handleMonitorModalClose}
          handleSubmission={(value, month) => handleMonitoring(value, month)}
        />
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default PlanTable;
