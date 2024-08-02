import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import PlanColumns from 'data/planning/columns';

export const PlanList = ({ plans }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: 3 }}>
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={plans}
          columns={PlanColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          sx={{ cursor: 'pointer', borderRadius: 2 }}
        />
      </div>
    </Box>
  );
};
PlanList.propTypes = {
  plans: PropTypes.oneOf([PropTypes.object, PropTypes.array])
};
