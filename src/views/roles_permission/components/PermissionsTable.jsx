import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, IconButton, TableContainer, Paper, useTheme, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Backend from 'services/backend';
import Fallbacks from 'utils/components/Fallbacks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PermissionsTable = ({ onPermissionsFetch, onDelete }) => {
  const theme = useTheme();
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [error, setError] = useState(false);
  const [permissionMap, setPermissionMap] = useState({}); 

const handleFetchingPermissions = () => {
  setPermissionLoading(true);
  const token = localStorage.getItem('token');
  const Api = Backend.auth + Backend.permissi;
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
      setPermissionLoading(false);
      
      if (response.success) {
        const permissionsData = response.data;

        const grouped = permissionsData.reduce((acc, perm) => {
          const type = perm.name.split(':')[1]; // e.g., 'users', 'roles', 'permissions'
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push({ name: perm.name, id: perm.uuid }); 
          return acc;
        }, {});

     
        const permissionMap = permissionsData.reduce((map, perm) => {
          map[perm.name] = perm.uuid;
          return map;
        }, {});


       
        setGroupedPermissions(grouped);
        setPermissionMap(permissionMap);
        onPermissionsFetch(permissionsData); 
   
        
      } else {
        setError(true);
      }
    })
    .catch((error) => {
      setPermissionLoading(false);
      setError(true);
    });
};


  useEffect(() => {
    handleFetchingPermissions();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: '5dvh', border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 1.6, margin: 0, marginTop: 7.5 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              variant="contained"
              color="primary"
              sx={{
                background: theme.palette.grey[100],
                color: '#000',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                borderBottom: `2px solid ${theme.palette.divider}`,
                position: 'relative',
                padding: '12px 16px',
                '&:not(:last-of-type)': {
                  borderRight: `1px solid ${theme.palette.divider}`
                }
              }}
            >
              List of Menus
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissionLoading ? (
            <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={20} />
            </Box>
          ) : error ? (
            <Fallbacks severity="error" title="Server error" description="There is an error fetching Permissions" />
          ) : Object.keys(groupedPermissions).length === 0 ? (
            <Fallbacks
              severity="info"
              title="Permission not found"
              description="The list of added Permissions will be listed here"
              sx={{ paddingTop: 6 }}
            />
          ) : (
            Object.keys(groupedPermissions).map((type) => (
              <React.Fragment key={type}>
                <Accordion>
                  <AccordionSummary>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                      <Typography variant="h5">{type.charAt(0).toUpperCase() + type.slice(1)}</Typography>
                      <IconButton>
                        <ExpandMoreIcon size={10} />
                      </IconButton>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="h5" sx={{ padding: 1 }}>
                      Assigned Permissions
                    </Typography>

                    <Table>
                      <TableBody>
                        {groupedPermissions[type].map((perm) => (
                          <TableRow
                            key={perm.id}
                            sx={{
                              ':hover': {
                                backgroundColor: theme.palette.grey[100],
                                color: theme.palette.background.default,
                                cursor: 'pointer',
                                borderRadius: 2
                              }
                            }}
                          >
                            <TableCell>{perm.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PermissionsTable;
