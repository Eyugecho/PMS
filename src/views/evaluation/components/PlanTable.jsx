import React, { useState } from 'react';
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
  useTheme
} from '@mui/material';
import { PeriodNaming } from 'utils/function';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { EvaluateModal } from './EvaluateModal';
import { toast, ToastContainer } from 'react-toastify';
import Backend from 'services/backend';

const PlanTable = ({ plans, unitName, unitType }) => {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const [add, setAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
      setSelectedTarget(null);
    } else {
      setSelectedRow(index);
      setSelectedTarget(null);
    }
  };

  const handleTargetSelection = (targetId) => {
    selectedTarget === targetId ? setSelectedTarget(null) : setSelectedTarget(targetId);
  };

  const handleEvaluationClick = (targetId) => {
    handleTargetSelection(targetId);
    setTargetId(targetId);
    setAdd(true);
  };

  const handleEvaluation = (value) => {
    setIsAdding(true);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.evaluate;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      target_setting_id: targetId,
      actual_value: value?.actual_value,
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
          handleEvaluateModalClose();
          toast.success(response.data.message);
        } else {
          setIsAdding(false);
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setIsAdding(false);
      });
  };

  const handleEvaluateModalClose = () => {
    setAdd(false);
  };
  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ minHeight: '64dvh', border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="Organization plan table">
          <TableHead>
            <TableRow>
              <TableCell>Fiscal Year</TableCell>
              <TableCell>KPI Name</TableCell>
              <TableCell>KPI Weights(%)</TableCell>
              <TableCell>Total Targets</TableCell>
              <TableCell>Measuring Unit</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans?.map((plan, index) => (
              <>
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: selectedRow == index ? theme.palette.primary[200] : theme.palette.background.default,
                    ':hover': {
                      backgroundColor: theme.palette.primary[200],
                      color: theme.palette.background.default,
                      cursor: 'pointer',
                      borderRadius: 2
                    }
                  }}
                >
                  <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(index)}>
                      {selectedRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                      {plan?.fiscal_year.year}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Typography variant="subtitle1">{plan?.kpi?.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.weight}</TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.total_target}</TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.kpi?.measuring_unit?.name}</TableCell>
                  <TableCell sx={{ border: 0 }}>{plan?.frequency?.name}</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Button variant="outlined" onClick={() => handleRowClick(index)}>
                      Targets
                    </Button>
                  </TableCell>
                </TableRow>

                {selectedRow == index && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Collapse in={selectedRow !== null} timeout="auto" unmountOnExit>
                        <Table sx={{ minWidth: 650 }} aria-label="Organization plan table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Period</TableCell>
                              <TableCell>Target</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {plan?.target?.map((target, index) => (
                              <TableRow
                                key={index}
                                sx={
                                  selectedTarget == target.id
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
                                <TableCell sx={{ border: 0 }}>{PeriodNaming(plan?.frequency?.name) + ' ' + (index + 1)}</TableCell>
                                <TableCell sx={{ border: 0 }}>{target?.target}</TableCell>
                                <TableCell sx={{ border: 0 }}>
                                  <Button variant="contained" sx={{ boxShadow: 0 }} onClick={() => handleEvaluationClick(target.id)}>
                                    Evaluate
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {targetId && (
        <EvaluateModal
          add={add}
          unitName={unitName}
          unitType={unitType}
          isAdding={isAdding}
          onClose={handleEvaluateModalClose}
          handleSubmission={(value) => handleEvaluation(value)}
        />
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default PlanTable;
