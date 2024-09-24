import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { toast } from 'react-toastify';
import Backend from 'services/backend';

const EditUnit = ({ open, onClose, unit, onUpdate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');
  const [unitType, setUnitType] = useState('');
  const [unitTypes, setUnitTypes] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (unit) {
      setName(unit.name);
      setManager(unit.manager_id || '');
      setDescription(unit.description);
      setUnitType(unit.unit_type_id || '');
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const unitTypesApi = Backend.api + Backend.types;
      const managersApi = Backend.api + Backend.getManagers;
      const headers = {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      };

      try {
        const [unitTypesResponse, managersResponse] = await Promise.all([
          fetch(unitTypesApi, { method: 'GET', headers }),
          fetch(managersApi, { method: 'GET', headers })
        ]);

        const unitTypesData = await unitTypesResponse.json();
        const managersData = await managersResponse.json();

        if (unitTypesData.success && Array.isArray(unitTypesData.data)) {
          setUnitTypes(unitTypesData.data);
        } else {
          toast.error('Failed to fetch unit types');
        }

        if (managersData.success && Array.isArray(managersData.data)) {
          setManagers(managersData.data);
        } else {
          toast.error('Failed to fetch managers');
        }
      } catch (error) {
        toast.error('Error fetching data');
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [unit]);

  const handleUpdate = () => {
    setIsUpdating(true);
    const token = localStorage.getItem('token');
    const Api = `${Backend.api}${Backend.units}/${unit.id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      name,
      manager_id: manager,
      unit_type_id: unitType,
      description
    };

    fetch(Api, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response?.data?.message);
          onUpdate();
          onClose();
        } else {
          toast.error(response?.data?.message);
        }
        setIsUpdating(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      <DialogTitle>Edit Unit</DialogTitle>
      <DialogContent>
        {loadingData ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Manager</InputLabel>
              <Select value={manager} onChange={(e) => setManager(e.target.value)} label="Manager">
                {Array.isArray(managers) && managers.length > 0 ? (
                  managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.id}>
                      {manager.user.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No managers available</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>Unit Type</InputLabel>
              <Select value={unitType} onChange={(e) => setUnitType(e.target.value)} label="Unit Type">
                {Array.isArray(unitTypes) && unitTypes.length > 0 ? (
                  unitTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No unit types available</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              label="Description"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isUpdating}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} disabled={isUpdating} color="primary">
          {isUpdating ? <CircularProgress size={24} /> : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUnit;
