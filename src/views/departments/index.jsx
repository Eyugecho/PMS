import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import Fallbacks from 'utils/components/Fallbacks';
import Search from 'ui-component/search';
import { UnitList } from './components/UnitList';
import UnitData from 'data/units/units';
import { AddUnit } from './components/AddUnit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContainerCard from './components/ContainerCard';
import { IconDots, IconPlus } from '@tabler/icons-react';
import AddUnitType from './components/AddUnitType';

//================================ UNITS MANAGEMENT PAGE=====================
const Units = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const [unitLoading, setUnitLoading] = useState(true);
  const [unitType, setUnitType] = useState([]);
  const [managers, setManagers] = useState([]);
  const [add, setAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleFetchingTypes = () => {
    setUnitLoading(true);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.types;
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
          setUnitLoading(false);
          setUnitType(response.data);
        } else {
          setUnitLoading(false);
        }
      })
      .catch((error) => {
        setUnitLoading(false);
        toast(error.message);
      });
  };

  // A function that fetch the list of managers from employee table
  // This function is called when user clicked add department button
  const handleFetchingManagers = () => {
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.employees + `?role=manager`;
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
          setManagers(response.data);
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const handleAddUnitClick = () => {
    setAdd(true);
    handleFetchingTypes();
    handleFetchingManagers();
  };

  const handleUnitModalClose = () => {
    setAdd(false);
  };

  const handleUnitAddition = (value) => {
    setIsAdding(true);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.units;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      unit_type_id: value?.type,
      name: value?.name,
      manager: value?.manager,
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
          setIsAdding(false);
          handleUnitModalClose();
          toast(response.message);
        } else {
          setIsAdding(false);
          toast(response.message);
        }
      })
      .catch((error) => {
        toast(error.message);
        setIsAdding(false);
      });
  };

  const handleTypeAddition = (value) => {
    setIsAdding(true);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.types;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      name: value?.name
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setIsAdding(false);
          handleFetchingTypes();
          toast(response.message);
        } else {
          setIsAdding(false);
          toast(response.message);
        }
      })
      .catch((error) => {
        toast(error.message);
        setIsAdding(false);
      });
  };

  useEffect(() => {
    const handleFetchingDepartment = () => {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.units;
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
            setData(response.data.data);
            setLoading(false);
            setError(false);
          } else {
            setLoading(false);
            setError(false);
          }
        })
        .catch((error) => {
          toast(error.message);
          setError(true);
          setLoading(false);
        });
    };

    handleFetchingTypes();
    handleFetchingDepartment();

    return () => {};
  }, []);
  return (
    <div>
      <PageContainer back={false} title="Units">
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
          <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Search />

            <Button variant="contained" color="primary" onClick={() => handleAddUnitClick()}>
              Add Unit
            </Button>
          </Grid>

          <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid xs={8.2} sx={{ minHeight: '64dvh' }}>
              {loading ? (
                <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress size={22} />
                </Box>
              ) : (
                // ) : error ? (
                //   <Fallbacks severity="error" title="Server error" description="There is error fetching units" />
                // ) : data.length == !0 ? (
                //   <Fallbacks
                //     severity="department"
                //     title="Unit not found"
                //     description="The list of added units will be listed here"
                //     sx={{ paddingTop: 6 }}
                //   />
                // )
                <UnitList units={UnitData} />
              )}
            </Grid>

            <Grid xs={3.6} sx={{ paddingTop: 1 }}>
              <Box sx={{ border: 0.4, borderColor: theme.palette.grey[400], borderRadius: 1.6, paddingY: 1, margin: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 1.6 }}>
                  <Typography variant="subtitle1">Unit Types</Typography>
                  <AddUnitType isAdding={isAdding} handleSubmission={(value) => handleTypeAddition(value)} />
                </Box>
                <Divider sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[400], marginY: 1 }} />

                <Box>
                  {unitLoading ? (
                    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress size={20} />
                    </Box>
                  ) : error ? (
                    <Fallbacks severity="error" title="Server error" description="There is error fetching unit type" />
                  ) : unitType.length === 0 ? (
                    <Fallbacks
                      severity="department"
                      title="Unit type not found"
                      description="The list of added unit types will be listed here"
                      sx={{ paddingTop: 6 }}
                    />
                  ) : (
                    unitType.map((type, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingY: 0.8,
                          paddingX: 2,
                          ':hover': {
                            backgroundColor: theme.palette.grey[50]
                          }
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                          {type.name}
                        </Typography>

                        <IconButton>
                          <IconDots size={18} style={{ color: theme.palette.grey[500] }} />
                        </IconButton>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>

      <AddUnit
        add={add}
        isAdding={isAdding}
        types={unitType}
        managers={[
          { id: 1, name: 'Mekuanint Birara' },
          { id: 2, name: 'Biruk Asmamaw' }
        ]}
        onClose={handleUnitModalClose}
        handleSubmission={(value) => handleUnitAddition(value)}
      />
      <ToastContainer />
    </div>
  );
};

export default Units;
