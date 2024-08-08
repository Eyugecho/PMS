import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import Backend from 'services/backend';
import Fallbacks from 'utils/components/Fallbacks';
import Search from 'ui-component/search';
import { UnitList } from './components/UnitList';
import { AddUnit } from './components/AddUnit';
import { IconDots } from '@tabler/icons-react';
import AddUnitType from './components/AddUnitType';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageContainer from 'ui-component/MainPage';
import UnitsTable from './components/UnitsTable';

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
      parent_id: value?.parent_id,
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
          toast.success(response.message);
        } else {
          setIsAdding(false);
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
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
    const handleFetchingUnits = () => {
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
    handleFetchingUnits();

    return () => {};
  }, []);
  return (
    <PageContainer title="Units">
      <Grid
        container
        sx={{
          borderRadius: 2,
          marginTop: 2,
          paddingY: 3,
          paddingX: 2
        }}
      >
        <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 2 }}>
          <Search />

          <Button variant="contained" color="primary" onClick={() => handleAddUnitClick()}>
            Add Unit
          </Button>
        </Grid>

        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid xs={12} sm={12} md={8} lg={8} xl={8} sx={{ minHeight: '64dvh', margin: 2 }}>
            {loading ? (
              <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={22} />
              </Box>
            ) : error ? (
              <Fallbacks severity="error" title="Server error" description="There is error fetching units" />
            ) : data.length == !0 ? (
              <Fallbacks
                severity="department"
                title="Unit not found"
                description="The list of added units will be listed here"
                sx={{ paddingTop: 6 }}
              />
            ) : (
              <UnitsTable units={data} />
            )}
          </Grid>

          <Grid xs={12} sm={12} md={3.6} lg={3.6} xl={3.6} sx={{ paddingTop: 1 }}>
            <Box sx={{ border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 1.6, margin: 2 }}>
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

      <AddUnit
        add={add}
        isAdding={isAdding}
        types={unitType}
        units={data}
        managers={[
          { id: 1, name: 'Mekuanint Birara' },
          { id: 2, name: 'Biruk Asmamaw' }
        ]}
        onClose={handleUnitModalClose}
        handleSubmission={(value) => handleUnitAddition(value)}
      />
      <ToastContainer />
    </PageContainer>
  );
};

export default Units;
