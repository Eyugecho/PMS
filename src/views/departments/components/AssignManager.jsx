import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Grid, Box, CircularProgress, DialogTitle, Divider, IconButton, InputBase, Paper, useTheme, Typography } from '@mui/material';
import { IconLabel } from 'ui-component/content/IconLabel';
import { CheckCircle, Person } from '@mui/icons-material';
import { IconUser, IconX } from '@tabler/icons-react';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Backend from 'services/backend';
import { toast } from 'react-toastify';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';

export const AssignManager = ({ open, handleDialogClose, unit_id, managers, isLoading, searchText, searching, onTextChange, onSubmit }) => {
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const theme = useTheme();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  };

  const handleSelection = (coordinator) => {
    if (selectedCoordinator && selectedCoordinator.id == coordinator.id) {
      setSelectedCoordinator(null);
    } else {
      setSelectedCoordinator(coordinator);
    }
  };

  const handleManagerAssignment = () => {
    setAssigning(true);
    var Api = Backend.api + Backend.units + `/` + unit_id;
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer` + token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      manager_id: selectedCoordinator.id,
      unit_id: unit_id
    };

    fetch(Api, { method: 'PATCH', headers: headers, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setAssigning(false);
          handleDialogClose();
          toast.success(response.data.message);
        } else {
          setAssigning(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setAssigning(false);
        toast.error(error.message);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleDialogClose}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 2,
            paddingY: 0.6
          }}
        >
          <DialogTitle variant="h4" color={theme.palette.background.default}>
            Assign Manager
          </DialogTitle>
          <IconButton onClick={handleDialogClose}>
            <IconX size={20} color={theme.palette.background.default} />
          </IconButton>
        </Box>

        <DialogContent sx={{ width: 500, padding: 4 }}>
          <Paper component="form" sx={{ border: 0.6, display: 'flex', alignItems: 'center' }}>
            <InputBase
              sx={{ ml: 1, px: 1.5, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={onTextChange}
              onKeyDown={handleKeyPress}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '8px' }} aria-label="search" onClick={onSubmit}>
              {searching ? <CircularProgress size={20} /> : <SearchIcon />}
            </IconButton>
          </Paper>

          <Grid container>
            <Grid item xs={12}>
              {isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4
                  }}
                >
                  <CircularProgress size={20} />
                </Box>
              ) : (
                <Box sx={{ paddingTop: 2 }}>
                  {managers.length == 0 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4
                      }}
                    >
                      <IconUser />
                      <Typography variant="body2">Manager is not found</Typography>
                    </Box>
                  ) : (
                    managers.map((manager) => (
                      <Box
                        key={manager.id}
                        onClick={() => handleSelection(manager)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginY: 1,
                          padding: 1.2,
                          border: 1,
                          borderColor: theme.palette.divider,
                          borderRadius: 2,
                          backgroundColor: selectedCoordinator && selectedCoordinator.id === manager.id && theme.palette.grey[50],
                          cursor: 'pointer'
                        }}
                      >
                        <Box>
                          {/* <Typography variant="subtitle2">
                            Currently |<b> {manager.department ? manager.department.name : 'Not assigned'}</b>
                          </Typography> */}
                          <IconLabel content={manager?.user?.name} label={manager?.user?.email} sx={{ paddinY: 3 }}>
                            <Person fontSize="small" />
                          </IconLabel>
                        </Box>

                        <Box>
                          {selectedCoordinator && selectedCoordinator.id === manager.id && <CheckCircle color="primary" fontSize="small" />}
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() => handleManagerAssignment()}
            variant="contained"
            sx={{ paddingX: 6 }}
            disabled={selectedCoordinator ? false : true}
          >
            {assigning ? <ActivityIndicator size={16} /> : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

AssignManager.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  managers: PropTypes.array,
  isLoading: PropTypes.bool,
  searchText: PropTypes.string,
  onTextChange: PropTypes.func,
  onSubmit: PropTypes.func,
  searching: PropTypes.bool
};
