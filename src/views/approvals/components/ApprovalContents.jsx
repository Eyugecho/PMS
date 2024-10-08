import React from 'react';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import PlanCard from 'views/planning/components/PlanCard';
import { gridSpacing } from 'store/constant';

const ApprovalContents = ({ loading, data }) => {
  return (
    <React.Fragment>
      {loading ? (
        <Grid container sx={{ minHeight: 400 }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <ActivityIndicator size={20} />
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ minHeight: 400 }} spacing={gridSpacing}>
          {data?.map((task, index) => (
            <Grid key={index} item xs={12} sm={12} md={6} lg={6} xl={6}>
              <PlanCard plan={task} hideOptions={true} />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

ApprovalContents.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default ApprovalContents;
