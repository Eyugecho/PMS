import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreatePlan } from './components/CreatePlan';
import { toast, ToastContainer } from 'react-toastify';
import { gridSpacing } from 'store/constant';
import { UpdatePlan } from './components/UpdatePlan';
import { useKPI } from 'context/KPIProvider';
import { Storage } from 'configration/storage';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import AddButton from 'ui-component/buttons/AddButton';
import PlanCard from './components/PlanCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import DeletePrompt from 'ui-component/modal/DeletePrompt';
import GetToken from 'utils/auth-token';
import axios from 'axios';

const Planning = () => {
  const navigate = useNavigate();
  const { handleUpdatePlan } = useKPI();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [create, setCreate] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [update, setUpdate] = useState(false);
  const [deletePlan, setDeletePlan] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCreatePlan = () => {
    setCreate(true);
  };

  const handleCreateModalClose = () => {
    setCreate(false);
  };

  const handleSettingUP = (selected) => {
    const newKPI = {
      id: selected?.kpi_id,
      f_name: selected?.frequency?.name,
      f_value: selected?.frequency?.value,
      frequency_id: selected?.frequency_id,
      mu: selected?.kpi?.measuring_unit?.name,
      name: selected?.kpi?.name,
      total_target: selected?.total_target,
      weight: selected?.weight
    };

    const targets = selected?.target?.map((prevTarget) => ({ period_id: prevTarget?.period_id, target: prevTarget?.target }));
    handleUpdatePlan([{ ...newKPI, targets: targets }]);
    Storage.setItem('selectFiscal', JSON.stringify({ id: selected?.fiscal_year_id, year: '' }));

    setUpdate(true);
  };

  const handleUpdatingPlan = (plan) => {
    handleSettingUP(plan);
  };

  const handleUpdateModalClose = () => {
    handleUpdatePlan([]);
    setUpdate(false);
  };

  const handleDeletePlan = (data) => {
    setSelectedPlan(data);
    setDeletePlan(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = await GetToken();
      const Api = Backend.api + Backend.deletePlan + `/${selectedPlan?.id}`;
      const response = await axios.delete(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setDeletePlan(false);
        toast.success(response.data.data.message);
        handleFetchingPlan();
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleFetchingPlan = async () => {
    const token = await GetToken();
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
          toast.warning(response.data.message);
          setError(false);
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
      title={'Planning'}
      rightOption={<AddButton props={{ varaint: 'contained' }} title={'Create new plan'} onPress={() => handleCreatePlan()} />}
    >
      {loading ? (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8
            }}
          >
            <ActivityIndicator size={20} />
          </Grid>
        </Grid>
      ) : error ? (
        <ErrorPrompt title="Server Error" message="Unable to retrive fiscal years" />
      ) : data.length === 0 ? (
        <Fallbacks
          severity="planning"
          title="Plan is not found"
          description="The list of added plan will be listed here"
          sx={{ paddingTop: 6 }}
        />
      ) : (
        <Grid container sx={{ paddingY: 1, paddingX: 2, marginTop: 4 }} spacing={gridSpacing}>
          {data.map((plan, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <PlanCard
                plan={plan}
                onPress={() => navigate('/planning/view', { state: plan })}
                onEdit={() => handleUpdatingPlan(plan)}
                onDelete={() => handleDeletePlan(plan)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <CreatePlan add={create} onClose={handleCreateModalClose} onSucceed={() => handleFetchingPlan()} />
      <UpdatePlan add={update} onClose={handleUpdateModalClose} onSucceed={() => handleFetchingPlan()} />
      {deletePlan && (
        <DeletePrompt
          type="Delete"
          open={deletePlan}
          title="Deleting Plan"
          description={`Are you sure you want to delete ` + selectedPlan?.kpi?.name}
          onNo={() => setDeletePlan(false)}
          onYes={() => handleDelete()}
          deleting={deleting}
          handleClose={() => setDeletePlan(false)}
        />
      )}
      <ToastContainer />
    </PageContainer>
  );
};

export default Planning;
