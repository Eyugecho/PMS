import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { UnitKpiColumns } from 'data/units/column';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export const UnitKpi = ({ kpi }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: 3 }}>
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={kpi}
          columns={UnitKpiColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          sx={{ borderRadius: 2 }}
        />
      </div>
    </Box>
  );
};
UnitKpi.propTypes = {
  units: PropTypes.oneOf([PropTypes.object, PropTypes.array])
};
