import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import PageContainer from 'ui-component/MainPage';
import {
  IconCalendar,
  IconChartDonut,
  IconDotsVertical,
  IconGenderMale,
  IconList,
  IconMail,
  IconPhone,
  IconTargetArrow,
  IconTie,
  IconUser
} from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import { DetailInfo } from './components/DetailInfo';
import { formatDate } from 'utils/function';
import Backend from 'services/backend';
import PlanTable from 'views/evaluation/components/PlanTable';

const IconColor = 'black';

const ViewEmployee = () => {
  const { state } = useLocation();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    rowLength: 15
  });

  useEffect(() => {
    const handleFetchingEmployees = () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.getEmployeeTarget + state?.id;
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
            setLoading(false);
            setError(false);
          } else {
            setLoading(false);
            setError(false);
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
          setError(true);
          setLoading(false);
        });
    };
    handleFetchingEmployees();

    return () => {};
  }, [state?.id]);
  return (
    <PageContainer back={true} title="Employee Details">
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3.8}
          lg={3.2}
          xl={3.2}
          sx={{
            backgroundColor: theme.palette.primary[200],
            border: 0.4,
            borderColor: theme.palette.grey[200],
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1,
              paddingLeft: 2,
              borderBottom: 0.4,
              borderColor: theme.palette.grey[500]
            }}
          >
            <Typography variant="h4">Employee Details</Typography>

            <IconButton>
              <IconDotsVertical size={18} />
            </IconButton>
          </Box>
          <Box sx={{ padding: 2 }}>
            {state?.user && <DetailInfo label={'Full name'} info={state?.user?.name} icon={<IconUser size={24} color={IconColor} />} />}
            {state?.gender && <DetailInfo label={'Gender'} info={state?.gender} icon={<IconGenderMale size={24} color={IconColor} />} />}
            {state?.user?.email && <DetailInfo label={'Email'} info={state?.user?.email} icon={<IconMail size={24} color={IconColor} />} />}
            {state?.user?.phone && (
              <DetailInfo label={'Phone'} info={state?.user?.phone} icon={<IconPhone size={24} color={IconColor} />} />
            )}

            {state?.user?.role && <DetailInfo label={'Role'} info={state?.user?.role} icon={<IconTie size={24} color={IconColor} />} />}
            {state?.position && (
              <DetailInfo label={'Position'} info={state?.position} icon={<IconChartDonut size={24} color={IconColor} />} />
            )}

            {state?.user?.created_at && (
              <DetailInfo
                label={'Start date'}
                info={formatDate(state?.user?.created_at).formattedDate}
                icon={<IconCalendar size={24} color={IconColor} />}
              />
            )}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6.9}
          lg={8.6}
          xl={8.6}
          sx={{
            backgroundColor: theme.palette.background.default,
            border: 0.4,
            borderColor: theme.palette.grey[200],
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1,
              paddingLeft: 2,
              borderBottom: 0.4,
              borderColor: theme.palette.grey[200]
            }}
          >
            <Typography variant="h4">Employee KPI's and Targets</Typography>

            <IconButton>
              <IconDotsVertical size={18} />
            </IconButton>
          </Box>

          <Box>
            {loading ? (
              <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={20} />
              </Box>
            ) : error ? (
              <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2">There is error fetching the Employees</Typography>
              </Box>
            ) : data.length === 0 ? (
              <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <IconTargetArrow size={80} color={theme.palette.grey[400]} />
                <Typography variant="h4" sx={{ marginTop: 1.6 }}>
                  Employee target is not found
                </Typography>
                <Typography variant="caption">The list of assigned target will be listed here</Typography>
              </Box>
            ) : (
              <PlanTable plans={data} />
            )}
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ViewEmployee;
