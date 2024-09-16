import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { gridSpacing } from 'store/constant';
import Backend from 'services/backend';
import DrogaCard from 'ui-component/cards/DrogaCard';
import PerformanceCard from 'ui-component/cards/PerformanceCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import GetToken from 'utils/auth-token';
import Fallbacks from 'utils/components/Fallbacks';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import PerKPIPerformance from './PerKPIPerformance';

const OverallPerformance = () => {
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState([]);

  const handlePeriodSelection = (index) => {
    setSelectedPeriod([performance[index]]);
  };

  useEffect(() => {
    const handleFetchingPerformance = async () => {
      if (selectedYear) {
        setIsLoading(true);
        const token = await GetToken();
        const Api = Backend.api + Backend.myPerformance + `?fiscal_year_id=${selectedYear?.id}`;

        const header = {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Content-Type': 'application/json'
        };

        fetch(Api, {
          method: 'GET',
          headers: header
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              setPerformance(response.data.performance);
            } else {
              // toast.warning(response.data.message);
            }
          })
          .catch((error) => {
            toast.warning(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        return <GetFiscalYear />;
      }
    };

    handleFetchingPerformance();
  }, [selectedYear]);
  return (
    <Grid item xs={11.9}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <DrogaCard sx={{ mt: 2 }}>
            <Typography variant="h4">Performance</Typography>

            <Grid container>
              <Grid item xs={12}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : performance.length > 0 ? (
                  <Grid container sx={{ marginTop: 2, borderTop: 0.8, borderColor: theme.palette.divider, padding: 1 }}>
                    <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      {performance?.map((period, index) => {
                        const periodName = Object.keys(period)[0];
                        const [text, number] = periodName.match(/[a-zA-Z]+|[0-9]+/g);
                        const formattedQuarterName = `${text} ${number}`;

                        return (
                          <PerformanceCard
                            key={index}
                            isEvaluated={period[periodName].is_evaluated}
                            performance={period[periodName]?.overall}
                            frequency={formattedQuarterName}
                            onPress={() => handlePeriodSelection(index)}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                ) : (
                  <Fallbacks
                    severity="performance"
                    title={`No performance report`}
                    description={`The performance will be listed here`}
                    sx={{ paddingTop: 2 }}
                  />
                )}
              </Grid>
            </Grid>
          </DrogaCard>
          {selectedPeriod.length > 0 && <PerKPIPerformance isLoading={isLoading} performance={selectedPeriod} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverallPerformance;
