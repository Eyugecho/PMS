import * as React from 'react';
import { Dialog, DialogTitle, DialogActions, Alert, Box, Button, CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { CreatePlanForms } from 'data/planning/forms';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { DistributionValidation, FiscalYearValidation, FrequencyValidation, SelectedKPIValidation } from 'utils/validation/planning';
import { useKPI } from 'context/KPIProvider';
import { Storage } from 'configration/storage';
import Backend from 'services/backend';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import GetToken from 'utils/auth-token';
import { useSelector } from 'react-redux';

export const CreatePlan = ({ add, onClose, onSucceed }) => {
  const theme = useTheme();
  const SelectFiscalYear = useSelector((state) => state.customization.selectedFiscalYear);
  const { selectedKpi } = useKPI();
  const [isAdding, setIsAdding] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [error, setError] = React.useState({
    state: false,
    message: ''
  });

  const handleNext = () => {
    if (activeIndex === 0) {
      const validation = SelectedKPIValidation(selectedKpi);
      if (validation.valid) {
        setError({ ...error, state: false, message: '' });
        setActiveIndex(activeIndex + 1);
      } else {
        setError({ ...error, state: true, message: validation.errors[0] });
      }
    } else if (activeIndex === 1) {
      const validation = FrequencyValidation(selectedKpi);
      if (validation.valid) {
        setError({ ...error, state: false, message: '' });
        setActiveIndex(activeIndex + 1);
      } else {
        setError({ ...error, state: true, message: validation.errors[0] });
      }
    }
  };

  const handleBack = () => {
    setError({ ...error, state: false, message: '' });
    setActiveIndex(activeIndex - 1);
  };

  const handlePlanValidation = () => {
    const validation = DistributionValidation(selectedKpi);
    if (validation.valid) {
      setError({ ...error, state: false, message: '' });
      handlePlanSubmission(selectedKpi);
    } else {
      setError({ ...error, state: true, message: validation.errors[0] });
    }
  };

  const handlePlanSubmission = async (plan) => {
    setIsAdding(true);

    const token = await GetToken();

    const Api = Backend.api + Backend.orgPlan;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      fiscal_year_id: SelectFiscalYear?.id,
      data: plan
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          onSucceed();
          onClose();
        } else {
          toast.error(response.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={add} onClose={onClose}>
        <Paper sx={{ minWidth: '600px', minHeight: '50dvh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 1 }}>
              <DialogTitle variant="h3" color={theme.palette.text.primary}>
                {CreatePlanForms[activeIndex].name}
              </DialogTitle>

              <motion.div
                whileHover={{
                  rotate: 90
                }}
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer', marginRight: 10 }}
                onClick={onClose}
              >
                <IconX size="1.4rem" stroke={2} />
              </motion.div>
            </Box>

            <Box sx={{ padding: 3 }}>{CreatePlanForms[activeIndex].component}</Box>
          </div>

          <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
            {error.state && <Alert severity="error"> {error.message}</Alert>}
            {activeIndex > 0 && (
              <Button onClick={() => handleBack()} sx={{ paddingX: 4, paddingY: 1, marginRight: 2 }}>
                Back
              </Button>
            )}

            {activeIndex === CreatePlanForms.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                sx={{ paddingX: 6, paddingY: 1, boxShadow: 0 }}
                onClick={() => handlePlanValidation()}
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
                type="button"
                title="Next"
                variant="contained"
                sx={{ paddingX: 6, paddingY: 1, boxShadow: 0 }}
                onPress={() => handleNext()}
              />
            )}
          </DialogActions>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
};
