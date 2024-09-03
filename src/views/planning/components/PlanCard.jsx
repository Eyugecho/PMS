import React, { useState } from 'react';
import DrogaDataCard from 'ui-component/cards/DrogaDataCard';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { DotMenu } from 'ui-component/menu/DotMenu';
import { MeasuringUnitConverter, PeriodNaming } from 'utils/function';
import DrogaDonutChart from 'ui-component/charts/DrogaDonutChart';
import DrogaCard from 'ui-component/cards/DrogaCard';
import { IconChevronDown, IconChevronRight, IconChevronUp } from '@tabler/icons-react';

const PlanCard = ({ plan, onPress, onEdit, onDelete, sx }) => {
  const theme = useTheme();
  const [expand, setExpand] = useState('');

  const handleExpanding = (event, itemID) => {
    event.stopPropagation();
    if (expand) {
      setExpand('');
    } else {
      setExpand(itemID);
    }
  };

  return (
    <DrogaCard onPress={onPress} sx={{ ...sx }}>
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
              <Typography variant="body2">The plan initiatives</Typography>
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
  sx: PropTypes.object
};
export default PlanCard;
