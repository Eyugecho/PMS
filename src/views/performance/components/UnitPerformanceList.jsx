import React from 'react';
import { Grid, useTheme } from '@mui/material';
import UnitPerformance from 'ui-component/cards/UnitPerformance';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import PropTypes from 'prop-types';
import PerformanceCard from 'ui-component/cards/PerformanceCard';
import Fallbacks from 'utils/components/Fallbacks';

const UnitPerformanceList = ({ units, onView, selected, isLoading, performance }) => {
  const theme = useTheme();
  const handleView = (unit) => {
    onView(unit);
  };

  return (
    <React.Fragment>
      {units?.map((unit) => (
        <UnitPerformance
          key={unit.id}
          name={unit?.name}
          unitType={unit?.unit_type?.name}
          manager={unit?.manager?.user?.name}
          onView={() => handleView(unit)}
          sx={{ backgroundColor: selected === unit.id && theme.palette.grey[50] }}
        >
          {selected === unit.id &&
            (isLoading ? (
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                  <ActivityIndicator size={20} />
                </Grid>
              </Grid>
            ) : performance.length > 0 ? (
              <Grid container sx={{ marginTop: 2, borderTop: 0.8, borderColor: theme.palette.divider, padding: 1 }}>
                <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  {performance?.map((period, index) => {
                    const periodName = Object.keys(period)[0];
                    const [text, number] = periodName.match(/[a-zA-Z]+|[0-9]+/g);
                    const formattedQuarterName = `${text} ${number}`;

                    return <PerformanceCard key={index} performance={period[periodName]?.overall} frequency={formattedQuarterName} />;
                  })}
                </Grid>
              </Grid>
            ) : (
              <Fallbacks
                severity="performance"
                title={`No performance report`}
                description={`The list of performances will be listed here`}
                sx={{ paddingTop: 2 }}
              />
            ))}
        </UnitPerformance>
      ))}
    </React.Fragment>
  );
};

UnitPerformanceList.propTypes = {
  units: PropTypes.array,
  isLoading: PropTypes.bool,
  performance: PropTypes.array
};

export default UnitPerformanceList;
