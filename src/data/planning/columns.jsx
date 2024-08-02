import { Box, Typography, useTheme } from '@mui/material';

const PlanColumns = [
  {
    field: 'fiscal_year',
    headerName: 'Fiscal Year',
    width: 180,
    renderCell: (params) => {
      const fiscal = params.value;

      return <Typography variant="body2">{fiscal?.year}</Typography>;
    }
  },

  {
    field: 'kpi',
    headerName: 'KPI names',
    width: 280,
    renderCell: (params) => {
      const KPI = params.value;

      return (
        <Box>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {KPI?.name}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'weight',
    headerName: 'KPI Weights',
    width: 180,
    renderCell: (params) => {
      return <Typography variant="body2">{params.value}%</Typography>;
    }
  },
  {
    field: 'total_target',
    headerName: 'Targets',
    width: 120,
    renderCell: (params) => {
      return <Typography variant="body2">{params.value}</Typography>;
    }
  },

  {
    field: 'kpi',
    headerName: 'Measuring Unit',
    width: 180,
    renderCell: (params) => {
      const MU = params.value;
      return <Typography variant="body2">{MU?.measuring_unit?.name}</Typography>;
    }
  },
  {
    field: 'frequency',
    headerName: 'Frequencies',
    width: 220,
    renderCell: (params) => {
      let frequency = params.value;
      return <Typography variant="body2">{frequency?.name}</Typography>;
    }
  }
];

export default PlanColumns;
