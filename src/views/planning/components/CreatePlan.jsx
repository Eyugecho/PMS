import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress, IconButton, Typography, useTheme } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { CreatePlanForms } from 'data/planning/forms';
import { toast } from 'react-toastify';
import { PlanningValidation } from 'utils/validation/Validation';
import Backend from 'services/backend';

export const CreatePlan = ({ add, onClose, onSucceed }) => {
  const theme = useTheme();
  const [isAdding, setIsAdding] = React.useState(false);
  const [activeIndex, setActiveInde] = React.useState(0);

  const handleNext = () => {
    if (activeIndex < CreatePlanForms.length - 1) {
      setActiveInde(activeIndex + 1);
    }
  };

  const handlePlanValidation = () => {
    const savedPlan = localStorage.getItem('selectedKPI');
    const ThePlan = savedPlan ? JSON.parse(savedPlan) : [];

    if (ThePlan) {
      const Validation = PlanningValidation(ThePlan);
      if (Validation.length > 0) {
        toast.error(Validation[0]);
        return;
      } else {
        handlePlanSubmission(ThePlan);
      }
    } else {
      toast.warn('The plan is not filled properly');
    }
  };

  const handlePlanSubmission = (plan) => {
    setIsAdding(true);

    const token = localStorage.getItem('token');
    const getFiscalYear = localStorage.getItem('selectFiscal');
    const fiscalYear = JSON.parse(getFiscalYear);

    const Api = Backend.api + Backend.orgPlan;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      fiscal_year_id: fiscalYear?.id,
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
          setIsAdding(false);
          toast.success(response.message);
          onSucceed();
          onClose();
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

  return (
    <React.Fragment>
      <Dialog
        open={add}
        onClose={onClose}
        sx={{
          backdropFilter: 'blur(10px)', // Frosted glass effect
          backgroundColor: 'rgba(255, 255, 255, 0.1)' // Optional: Lightens the backdrop
        }}
      >
        <Box sx={{ minWidth: '600px', minHeight: '50dvh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 1 }}>
              <DialogTitle variant="h4">{CreatePlanForms[activeIndex].name}</DialogTitle>
              <IconButton onClick={onClose}>
                <IconX size={22} />
              </IconButton>
            </Box>

            <Box sx={{ padding: 3 }}>{CreatePlanForms[activeIndex].component}</Box>
          </div>
          <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
            {activeIndex > 0 && (
              <Button onClick={() => setActiveInde(activeIndex - 1)} sx={{ paddingX: 4, paddingY: 1, marginRight: 2 }}>
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
              <Button type="button" variant="contained" sx={{ paddingX: 6, paddingY: 1, boxShadow: 0 }} onClick={() => handleNext()}>
                Next
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};
