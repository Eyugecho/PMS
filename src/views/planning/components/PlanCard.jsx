import React from 'react';
import DrogaDataCard from 'ui-component/cards/DrogaDataCard';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { DotMenu } from 'ui-component/menu/DotMenu';
import { MeasuringUnitConverter, PeriodNaming } from 'utils/function';
import DrogaDonutChart from 'ui-component/charts/DrogaDonutChart';

const PlanCard = ({ plan, onPress, onEdit, onDelete }) => {
  const theme = useTheme();
  return (
    <DrogaDataCard onPress={onPress}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1">KPI Name</Typography>
        {!plan?.is_distributed && <DotMenu orientation="horizontal" onEdit={onEdit} onDelete={onDelete}></DotMenu>}
      </Box>
      <Typography variant="h3" color={theme.palette.text.primary} sx={{ marginTop: 0.6 }}>
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
    </DrogaDataCard>
  );
};

PlanCard.propTypes = {
  plans: PropTypes.object
};
export default PlanCard;
