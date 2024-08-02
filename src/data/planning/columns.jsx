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

  // {
  //   field: `${kpi?.measuring_unit?.name}`,
  //   headerName: 'Measuring Unit',
  //   width: 180,
  //   renderCell: (params) => {
  //     const MU = params.value;
  //     return <Typography variant="body2">{MU?.measuring_unit?.name}</Typography>;
  //   }
  // },
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

export const DistributedKPIColumns = [
  {
    field: 'fiscal_year',
    headerName: 'Fiscal Year',
    width: 120,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}
        </Typography>
      );
    }
  },
  {
    field: 'period',
    headerName: 'Period',
    width: 120,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}
        </Typography>
      );
    }
  },

  {
    field: 'parent_weight',
    headerName: 'Parent KPI Weight ',
    width: 80,
    renderCell: (params) => {
      return <Typography variant="body2">{params.value}%</Typography>;
    }
  },

  {
    field: 'unit',
    headerName: 'Assigned to(Unit)',
    width: 180,
    renderCell: (params) => {
      return <Typography variant="body2">{params.value}</Typography>;
    }
  },

  {
    field: 'manager',
    headerName: 'Unit Manager',
    width: 180,
    renderCell: (params) => {
      return <Typography variant="body2">{params.value}</Typography>;
    }
  },

  {
    field: 'your_weight',
    headerName: 'Unit KPI Weight',
    width: 160,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}%
        </Typography>
      );
    }
  },
  {
    field: 'target',
    headerName: 'Target',
    width: 120,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}
        </Typography>
      );
    }
  },

  {
    field: 'actual',
    headerName: 'Actual',
    width: 120,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}
        </Typography>
      );
    }
  },
  {
    field: 'achivement',
    headerName: 'Target Achievement(%)',
    width: 140,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}
        </Typography>
      );
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => {
      return (
        <Typography
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: useTheme().palette.primary.light,
            padding: 0.4,
            marginY: 1,
            border: 0.4,
            borderRadius: 4,
            borderColor: useTheme().palette.grey[100],
            textTransform: 'capitalize'
          }}
        >
          {params.value}
        </Typography>
      );
    }
  }
];

export default PlanColumns;
