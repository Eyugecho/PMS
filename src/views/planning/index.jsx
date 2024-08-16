import { Box, Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PlanList } from './components/PlanList';
import { useNavigate } from 'react-router-dom';
import { CreatePlan } from './components/CreatePlan';
import { toast } from 'react-toastify';
import Backend from 'services/backend';
import { IconTargetArrow } from '@tabler/icons-react';
import PageContainer from 'ui-component/MainPage';

const Planning = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const [create, setCreate] = useState(false);

  const handleCreatePlan = () => {
    setCreate(true);
  };
  const handleCreateModalClose = () => {
    setCreate(false);
  };

  const handleFetchingPlan = () => {
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.getOrgPlans;
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

  useEffect(() => {
    handleFetchingPlan();

    return () => {};
  }, []);
  return (
    <PageContainer
      title={'Organization Plans'}
      rightOption={
        <Button variant="contained" color="primary" onClick={() => handleCreatePlan()}>
          Create new plan
        </Button>
      }
    >
      <Grid
        container
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          marginTop: 2,
          paddingY: 3,
          paddingX: 2
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <PlanList plans={data} isLoading={loading} />
          </Grid>
        </Grid>
      </Grid>

      <CreatePlan add={create} onClose={handleCreateModalClose} onSucceed={() => handleFetchingPlan()} />
    </PageContainer>
  );
};

export default Planning;
