import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { DotMenu } from 'ui-component/menu/DotMenu';
import { getStatusColor, MeasuringUnitConverter, PeriodNaming } from 'utils/function';
import { IconChevronDown, IconChevronUp, IconPencil, IconTextWrap } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import DrogaDonutChart from 'ui-component/charts/DrogaDonutChart';
import DrogaCard from 'ui-component/cards/DrogaCard';
import ReactQuill from 'react-quill';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';

const toolbarOptions = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  ['clean'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }]
];

const PlanCard = ({ plan, onPress, onEdit, onDelete, sx, editInitiative, is_employee }) => {
  const theme = useTheme();

  const [expand, setExpand] = useState('');
  const [initiatives, setInitiatives] = useState(plan.initiative ? plan.initiative : '');
  const [submitting, setSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleExpanding = (event, itemID) => {
    event.stopPropagation();
    if (expand) {
      setExpand('');
    } else {
      setExpand(itemID);
    }
  };

  const handleInitiativeSubmission = async () => {
    setSubmitting(true);
    const token = await GetToken('token');
    const Api = Backend.api + Backend.planInitiative + plan.id;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      initiative: initiatives
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.data.message);
          setInitiatives(initiatives);
          setEdit(false);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handlePlanStatus = () => {
    let p_status = '';

    switch (plan?.status) {
      case '0':
        return (p_status = 'Pending');

      case '1':
        return (p_status = 'Active');

      default:
        return (p_status = 'Pending');
    }
  };
  return (
    <DrogaCard sx={{ ...sx }}>
      <div onClick={onPress} style={{ cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body1">KPI Name</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body2" color={getStatusColor(handlePlanStatus())}>
                {handlePlanStatus()}
              </Typography>
            </Box>
            {plan?.is_distributed || (!is_employee && <DotMenu orientation="vertical" onEdit={onEdit} onDelete={onDelete}></DotMenu>)}
          </Box>
        </Box>
        <Typography variant="h3" color={theme.palette.text.primary} sx={{ marginTop: 0.6, cursor: 'pointer' }}>
          {plan?.kpi?.name}
        </Typography>

        <Grid container sx={{ paddingTop: 2 }}>
          <Grid item xs={6} sx={{ paddingY: 2.4 }}>
            <Box>
              <Typography variant="body1">Perspective Type</Typography>
              <Typography variant="h4">{plan?.kpi?.perspective_type?.name}</Typography>
            </Box>

            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="body1">Measuring Unit</Typography>
              <Typography variant="h4">{plan?.kpi?.measuring_unit?.name}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
            <DrogaDonutChart value={plan?.weight} />
            <Typography variant="subtitle1" color={theme.palette.text.primary} sx={{ marginTop: 2 }}>
              Weight
            </Typography>
          </Grid>
        </Grid>

        <Grid container marginTop={1}>
          <Grid item xs={6}>
            <Box>
              <Typography variant="body1" color={theme.palette.text.primary}>
                Frequency
              </Typography>
              <Typography variant="h4">{plan?.frequency?.name}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1.6,
                backgroundColor: theme.palette.grey[50]
              }}
            >
              <Typography variant="subtitle1" color={theme.palette.text.primary}>
                Target
              </Typography>
              <Typography variant="h4">
                {plan?.total_target}
                {MeasuringUnitConverter(plan?.kpi?.measuring_unit?.name)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 3,
          borderTop: 0.8,
          borderColor: theme.palette.divider,
          padding: 0.8,
          paddingTop: 2
        }}
      >
        {plan?.target.map((target, index) => (
          <Grid
            item
            xs={6}
            key={index}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1, marginTop: 2 }}
          >
            <Typography variant="body2">
              {PeriodNaming(plan?.frequency?.name)} {index + 1}
            </Typography>
            <Box
              sx={{
                paddingY: 0.8,
                paddingX: 1.2,
                backgroundColor: theme.palette.grey[50],
                borderRadius: theme.shape.borderRadius
              }}
            >
              <Typography variant="h4">
                {target?.target}
                {MeasuringUnitConverter(plan?.kpi?.measuring_unit?.name)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: 0.8,
              borderColor: theme.palette.divider,
              padding: 0.8
            }}
          >
            <Typography variant="h4">Initiatives</Typography>

            <IconButton onClick={(event) => handleExpanding(event, plan.id)}>
              {expand === plan.id ? <IconChevronUp size="1.2rem" stroke="1.8" /> : <IconChevronDown size="1.2rem" stroke="1.8" />}
            </IconButton>
          </Box>

          {expand === plan.id && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.6 }}>
                <Typography variant="body1" color={theme.palette.text.primary}>
                  The initiatives to get the job done
                </Typography>

                {editInitiative && (
                  <IconButton onClick={() => setEdit((prev) => !prev)}>
                    {edit ? <IconTextWrap size="1.2rem" stroke="1.6" /> : <IconPencil size="1.2rem" stroke="1.6" />}
                  </IconButton>
                )}
              </Box>

              {edit ? (
                <React.Fragment>
                  <ReactQuill
                    theme="snow"
                    value={initiatives}
                    onChange={setInitiatives}
                    style={{ border: 'none' }}
                    modules={{
                      toolbar: toolbarOptions
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {submitting ? (
                      <ActivityIndicator size={18} sx={{ mt: 1.6, px: 4 }} />
                    ) : (
                      <DrogaButton title={'Save'} variant="text" sx={{ mt: 1.6, px: 4 }} onPress={() => handleInitiativeSubmission()} />
                    )}
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {plan?.initiative ? (
                    <div dangerouslySetInnerHTML={{ __html: initiatives }} />
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        py: 4
                      }}
                    >
                      <Typography variant="h4" mb={1}>
                        {' '}
                        The initiative is not added{' '}
                      </Typography>
                      <Typography variant="body2"> After the initiative it will shown here </Typography>
                    </Box>
                  )}
                </React.Fragment>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </DrogaCard>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.object,
  onPress: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  sx: PropTypes.object,
  is_employee: PropTypes.bool
};
export default PlanCard;
