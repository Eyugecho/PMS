import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { MeasuringUnitConverter, PeriodNaming } from 'utils/function';
import DrogaDataCard from 'ui-component/cards/DrogaDataCard';
import PropTypes from 'prop-types';
import DrogaDonutChart from 'ui-component/charts/DrogaDonutChart';

const EvaluationCard = ({ evaluation, onPress }) => {
  const theme = useTheme();
  return (
    <DrogaDataCard onPress={onPress}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Typography variant="body1">KPI Name</Typography>
      </Box>
      <Typography variant="h3" color={theme.palette.text.primary} sx={{ marginTop: 0.6 }}>
        {evaluation?.kpi?.name}
      </Typography>

      <Grid container sx={{ paddingTop: 2 }}>
        <Grid item xs={6} sx={{ paddingY: 2.4 }}>
          <Box>
            <Typography variant="body1">Perspective Type</Typography>
            <Typography variant="h4">{evaluation?.kpi?.perspective_type?.name}</Typography>
          </Box>

          <Box sx={{ paddingTop: 2 }}>
            <Typography variant="body1">Measuring Unit</Typography>
            <Typography variant="h4">{evaluation?.kpi?.measuring_unit?.name}</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
          <DrogaDonutChart value={evaluation?.weight} />
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
            <Typography variant="h4">{evaluation?.frequency?.name}</Typography>
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
              {evaluation?.total_target}
              {MeasuringUnitConverter(evaluation?.kpi?.measuring_unit?.name)}
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
        <Typography variant="body2">Target</Typography>

        <Typography variant="body2">Evaluation</Typography>
      </Grid>
    </DrogaDataCard>
  );
};

EvaluationCard.propTypes = {
  evaluation: PropTypes.object
};
export default EvaluationCard;
