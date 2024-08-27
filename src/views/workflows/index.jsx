import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { IconDetails, IconListDetails, IconListTree, IconLiveView, IconPlus } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { DotMenu } from 'ui-component/menu/DotMenu';
import PageContainer from 'ui-component/MainPage';
import DrogaCard from 'ui-component/cards/DrogaCard';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import CreateWorkflow from './components/Create';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import UpdateWorkflow from './components/Update';
import DeletePrompt from 'ui-component/modal/DeletePrompt';
import axios from 'axios';

const Workflows = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [add, setAdd] = useState();

  const [selected, setSelected] = useState(null);
  const [update, setUpdate] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleOpen = () => {
    setAdd(true);
  };

  const handleOpenUpdate = () => {
    setUpdate(true);
  };
  const handleClose = () => {
    setAdd(false);
  };
  const handleCloseUpdate = () => {
    setUpdate(false);
  };

  const handleOpenDelete = () => {
    setDeleteWorkflow(true);
  };

  const handleCreatingWorkflow = async (value) => {
    setIsSubmitting(true);
    const token = await GetToken();
    const Api = Backend.api + Backend.createWorkflow;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      name: value?.name,
      description: value?.description
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.data.message);
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleUpdatingWorkflow = async (value) => {
    setIsSubmitting(true);
    const token = await GetToken();
    const Api = Backend.api + Backend.updateWorkflow;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      name: value?.name,
      description: value?.description
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.data.message);
          handleCloseUpdate();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDeleteWorkflow = async () => {
    setDeleting(true);
    try {
      const token = await GetToken();
      const Api = Backend.api + Backend.deleteWorkflow + `/${selected?.id}`;
      const response = await axios.delete(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setDeleteWorkflow(false);
        toast.success(response.data.data.message);
        handleFetchingWorkflow();
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleFetchingWorkflow = async () => {
    const token = await GetToken();
    const Api = Backend.api + Backend.workflows;
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
          setError(false);
        } else {
          toast.warning(response.data.message);
          setError(false);
        }
      })
      .catch((error) => {
        toast.warning(error.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetchingWorkflow();
  }, []);

  return (
    <PageContainer
      title="Approval Workflows"
      rightOption={<DrogaButton title={'Add Workflow'} onPress={() => handleOpen()} icon={<IconPlus size="1.4rem" stroke="1.4" />} />}
    >
      <Grid container padding={2.5}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
              <DrogaCard>
                <Box>
                  <Typography variant="h4">Workflows</Typography>
                </Box>

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
                  <ErrorPrompt title="Server Error" message="Unable to retrive workflows" size={120} />
                ) : data.length === 0 ? (
                  <Fallbacks
                    severity="workflow"
                    title="Workflow is not found"
                    description="The list of added workflow will be listed here"
                    sx={{ paddingTop: 6 }}
                    size={40}
                  />
                ) : (
                  <Typography variant="body2">Workflows</Typography>
                )}
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
              <DrogaCard>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2
                  }}
                >
                  <Typography variant="h4">Workflow Details</Typography>
                  {selected && <DotMenu onEdit={() => handleOpenUpdate()} onDelete={() => handleOpenDelete()} />}
                </Box>

                {selected ? (
                  <React.Fragment>
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
                      <ErrorPrompt title="Server Error" message="Unable to retrive workflows details" size={160} />
                    ) : data.length === 0 ? (
                      <Fallbacks
                        severity="workflow"
                        title="Workflow detail is not found"
                        description="The list of added workflow will be listed here"
                        sx={{ paddingTop: 6 }}
                        size={50}
                      />
                    ) : (
                      <>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Description
                        </Typography>
                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ marginTop: 0.6 }}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                          type specimen book.
                        </Typography>
                      </>
                    )}
                  </React.Fragment>
                ) : (
                  <Box
                    sx={{
                      minHeight: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 2
                    }}
                  >
                    <IconDetails size="3.4rem" stroke="1.4" color={theme.palette.warning.dark} />
                    <Typography variant="subtitle1" color={theme.palette.text.disabled}>
                      Worflow Details
                    </Typography>{' '}
                  </Box>
                )}
              </DrogaCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CreateWorkflow open={add} handleClose={handleClose} onSubmit={(value) => handleCreatingWorkflow(value)} submitting={isSubmitting} />

      {selected && (
        <UpdateWorkflow
          open={update}
          selected={selected}
          handleClose={handleCloseUpdate}
          onSubmit={(value) => handleUpdatingWorkflow(value)}
          submitting={isSubmitting}
        />
      )}

      {selected && deleteWorkflow && (
        <DeletePrompt
          type="Delete"
          open={deleteWorkflow}
          title="Deleting Workflow"
          description={`Are you sure you want to delete ` + selected?.name}
          onNo={() => setDeleteWorkflow(false)}
          onYes={() => handleDeleteWorkflow()}
          deleting={deleting}
          handleClose={() => setDeleteWorkflow(false)}
        />
      )}
    </PageContainer>
  );
};

export default Workflows;
