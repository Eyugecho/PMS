import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Grid,useTheme } from '@mui/material';
import AddRole from './components/AddRoles';
import RoleTable from './components/RoleTable';
import PermissionsTable from './components/PermissionsTable';
import { Container, Paper } from '@mui/material';
import Search from 'ui-component/search';
import Backend from 'services/backend'; // Assuming you have a backend service file
import { toast } from 'react-toastify';
import PageContainer from 'ui-component/MainPage';


const Page = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [permissionMap, setPermissionMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();


  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${Backend.auth + Backend.roles}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRoles(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch roles');
      }
    } catch (error) {
      toast.error('An error occurred while fetching roles');
    }
  };

const handleAddRole = async (newRole) => {
  try {
    const token = localStorage.getItem('token');
    const allPermissions = Object.values(permissions).flat(); // Flatten permissions if grouped by type
    console.log('All permissions with IDs:', allPermissions);

    // Convert permission names to UUIDs
    const permissionsUUIDs = newRole.permissions.map(permissionName => {
      const permissionObject = allPermissions.find(perm => perm.name === permissionName);
      return permissionObject ? permissionObject.id : null;
    }).filter(uuid => uuid !== null);

    console.log('Sending permissions UUIDs:', permissionsUUIDs);

    const response = await fetch(`${Backend.auth + Backend.roles}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newRole.roleName,
        permissions: permissionsUUIDs
      })
    });

    const data = await response.json();
    console.log('Response Data:', data);

    if (response.ok) {
      toast('Role added successfully');
      setRoles(prevRoles => [...prevRoles, data.data]);
      fetchRoles();

    } else {
      toast.error(data.message || 'Failed to add role');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('An error occurred while adding the role');
  }
};

  const handleDeleteRole = (roleName) => {
    setRoles(roles.filter((role) => role.name !== roleName));
  };

  const handleDeletePermission = (permissionName) => {
    setPermissions(permissions.filter((permission) => permission !== permissionName));
  };

const handlePermissionsFetch = (fetchedPermissions) => {
  if (Array.isArray(fetchedPermissions)) {
    // Group permissions by type and include ID in the object
    const grouped = fetchedPermissions.reduce((acc, perm) => {
      const type = perm.name.split(':')[1]; // Extract permission type from name
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({ name: perm.name, id: perm.uuid }); // Include ID and name
      return acc;
    }, {});


    // Create a map of permission names to UUIDs
    const permissionMap = fetchedPermissions.reduce((map, perm) => {
      map[perm.name] = perm.uuid;
      return map;
    }, {});

    setPermissions(grouped);
    setPermissionMap(permissionMap);
    

  } else {
    console.error('Fetched permissions are not in the expected format:', fetchedPermissions);
  }
};





  return (
    <PageContainer maxWidth="lg" title={'Role and Permission'}>
      <Paper
        elevation={2}
        style={{ marginLeft: '10px', padding: '0px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0.5, 0, 0, 0.1)' }}
      >
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={10} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={() => setOpenRoleModal(true)}>
                      Add
                    </Button>
                  </Box>

                  <RoleTable roles={roles} onDelete={handleDeleteRole} searchQuery={searchQuery} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <PermissionsTable onPermissionsFetch={handlePermissionsFetch} onDelete={handleDeletePermission} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <AddRole open={openRoleModal} handleClose={() => setOpenRoleModal(false)} permissions={permissions} onSave={handleAddRole} />
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default Page;
