import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Grid, Box, CircularProgress, DialogTitle, Divider, IconButton, InputBase, Paper, useTheme, Typography } from '@mui/material';
import { IconMoodEmpty, IconX } from '@tabler/icons';
import { IconLabel } from 'ui-component/content/IconLabel';
import { CheckCircle, Person } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Connections from 'api';

export const AssignManager = ({
  open,
  handleDialogClose,
  departmentId,
  coordinators,
  isLoading,
  searchText,
  searching,
  onTextChange,
  onSubmit,
  onRefresh
}) => {
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
    var Api = Connections.api + Connections.assigncoordinator;
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer` + token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      id: selectedCoordinator.id,
      departmentId: departmentId
    };

    fetch(Api, { method: 'POST', headers: headers, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setAssigning(false);

          onRefresh();
        } else {
          setAssigning(false);
        }
      })
      .catch((error) => {
        setAssigning(false);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleDialogClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 2
          }}
        >
          <DialogTitle variant="h4" color="grey">
            Assign Unit Manager
          </DialogTitle>
          <IconButton onClick={handleDialogClose}>
            <IconX size={20} />
          </IconButton>
        </Box>

        <DialogContent sx={{ width: 500, padding: 4 }}>
          <Paper component="form" sx={{ boxShadow: 1, display: 'flex', alignItems: 'center' }}>
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
              {' '}
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
                  {coordinators.length == 0 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4
                      }}
                    >
                      <IconMoodEmpty />
                      <Typography variant="body2">Coordinator not found</Typography>
                    </Box>
                  ) : (
                    coordinators.map((coordinator) => (
                      <Box
                        key={coordinator.id}
                        onClick={() => handleSelection(coordinator)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginY: 1,
                          padding: 1.2,
                          border: 1,
                          borderColor: theme.palette.primary[200],
                          borderRadius: 2,
                          backgroundColor: selectedCoordinator && selectedCoordinator.id === coordinator.id && theme.palette.primary[200],
                          cursor: 'pointer'
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2">
                            Currently |<b> {coordinator.department ? coordinator.department.name : 'Not assigned'}</b>
                          </Typography>
                          <IconLabel content={coordinator.name} label={coordinator.email} sx={{ paddinY: 3 }}>
                            <Person fontSize="small" />
                          </IconLabel>
                        </Box>

                        <Box>
                          {selectedCoordinator && selectedCoordinator.id === coordinator.id && (
                            <CheckCircle color="primary" fontSize="small" />
                          )}
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
            variant="outlined"
            sx={{ paddingX: 6 }}
            disabled={selectedCoordinator ? false : true}
          >
            {assigning ? <CircularProgress size={16} /> : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

AssignManager.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  coordinators: PropTypes.array,
  isLoading: PropTypes.bool,
  searchText: PropTypes.string,
  onTextChange: PropTypes.func,
  onSubmit: PropTypes.func,
  searching: PropTypes.bool
};
