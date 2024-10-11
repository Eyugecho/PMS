import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import PropTypes from 'prop-types';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import PlanCard from 'views/planning/components/PlanCard';
import Fallbacks from 'utils/components/Fallbacks';
import ErrorPrompt from 'utils/components/ErrorPrompt';

const ApprovalContents = ({ loading, error, data }) => {
  return (
    <React.Fragment>
      {loading ? (
        <Grid container sx={{ minHeight: 400 }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <ActivityIndicator size={20} />
          </Grid>
        </Grid>
      ) : error ? (
        <ErrorPrompt title="Server Error" message={`There is error retriving details tasks`} />
      ) : data.length === 0 ? (
        <Fallbacks severity="task" title={`Detial tasks are not found`} description="" sx={{ paddingTop: 6 }} />
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
