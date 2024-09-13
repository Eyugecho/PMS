import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { endOfDay, format, startOfWeek } from 'date-fns';
import { toast } from 'react-toastify';
import SelectorMenu from 'ui-component/menu/SelectorMenu';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import DateRangePicker from './DateRange';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ActivityGraph from 'ui-component/charts/ActivityGraph';
import DrogaCard from 'ui-component/cards/DrogaCard';
import DailyTasks from './DailyTasks';
import Todo from 'views/todo';

const ChartTypes = [
  {
    label: 'Line Graph',
    value: 'line'
  },
  {
    label: 'Area Graph',
    value: 'area'
  },
  {
    label: 'Bar Chart',
    value: 'bar'
  }
];

const TasksContainer = () => {
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const getMostRecentMonday = () => {
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 });
  };

  const [startDate, setStartDate] = useState(getMostRecentMonday());
  const [endDate, setEndDate] = useState(endOfDay(new Date()));

  const [chartType, setChartType] = useState('line');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [statLoading, setStatLoading] = useState(true);
  const [stats, setStats] = useState([]);

  const handleChartSelection = (event) => {
    const value = event.target.value;
    setChartType(value);
  };

  const handleFetchingActvities = async () => {
    if (selectedYear) {
      setLoading(true);
      const token = await GetToken();

      const Api =
        Backend.api +
        Backend.employeesTaskGraph +
        `?fiscal_year_id=${selectedYear?.id}&start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`;
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
            setData(response.data);
          } else {
            toast.warning(response.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return <GetFiscalYear />;
    }
  };

  const handleFetchingStats = async () => {
    if (selectedYear) {
      setStatLoading(true);
      const token = await GetToken();
      const Api = Backend.api + Backend.getStats;

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
            setStats(response.data);
          } else {
            toast.warning(response.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
        })
        .finally(() => {
          setStatLoading(false);
        });
    } else {
      return <GetFiscalYear />;
    }
  };

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(endOfDay(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    handleFetchingStats();
  }, [selectedYear]);

  useEffect(() => {
    handleFetchingActvities();
  }, [selectedYear, startDate, endDate]);

  return (
    <Grid item xs={12}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DrogaCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4">Daily Activities</Typography>
                <SelectorMenu name="chart" options={ChartTypes} selected={chartType} handleSelection={handleChartSelection} />
              </Box>
              <DateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            </Box>

            {loading ? (
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                  <ActivityIndicator size={20} />
                </Grid>
              </Grid>
            ) : (
              chartType && <ActivityGraph data={data} type={chartType} />
            )}
          </DrogaCard>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DrogaCard sx={{ p: 0 }}>
            <Todo hideChart={true} hideCreate={false} hideFilter={true} />
          </DrogaCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TasksContainer;
