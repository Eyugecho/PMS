import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CircularProgress, Divider, Grid, IconButton, Menu, Paper, Typography, useTheme ,MenuItem,ListItemIcon} from '@mui/material';
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
import { Container } from '@mui/system';
import { MoreHoriz } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



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
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);


  const handleClick = (event, unit) => {
    setAnchorEl(event.currentTarget);
    setSelectedUnit(unit);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUnit(null);
  };

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

  const handleEdit = () => {
    // Implement edit functionality
    handleClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    handleClose();
  }
  return (
    <Container title="Units">
      <Paper elevation={2} style={{ padding: '0px', backgroundColor: '#fff' }}>
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
            
            <Box     
               sx={{ 
                    background: theme.palette.grey[100], 
                    color: '#000', 
                    borderRadius: 2,
                    fontWeight: 'bold', 
                    fontSize: '0.9rem', 
                    marginTop: 1,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    position: 'relative',
                    padding: '12px 16px',
                    '&:not(:last-of-type)': {
                      borderRight: `1px solid ${theme.palette.divider}`,
                    }
                  }}
                >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 1.6 , borderColor: theme.palette.grey[300], }}>
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

                 <IconButton 
                    onClick={(event) => handleClick(event)}
                    size="small"
                  >
                    <MoreHoriz />
                  </IconButton>

                 <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                          sx={{
                              '& .MuiPaper-root': {
                                backdropFilter: 'blur(10px)', 
                                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                                borderRadius: 2,
                                boxShadow: theme.shadows[1],
                              },
                            }}
                  >
                    <MenuItem onClick={handleEdit}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" style={{paddingRight:'4px' ,color:'#11365A'}}/>
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" style={{paddingRight:'4px' ,color:'red'}}/>
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Menu>
                      
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
        managers={[
          { id: 1, name: 'Mekuanint Birara' },
          { id: 2, name: 'Biruk Asmamaw' }
        ]}
        onClose={handleUnitModalClose}
        handleSubmission={(value) => handleUnitAddition(value)}
      />
      <ToastContainer />
      </Paper>
    </Container>
  );
};

export default Units;
