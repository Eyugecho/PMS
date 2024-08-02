import { Typography } from '@mui/material';
import FiscalYear from 'views/planning/components/Forms/FiscalYear';
import FrequencySelection from 'views/planning/components/Forms/Frequency';
import KPISelection from 'views/planning/components/Forms/KPISelection';
import TargetDistribution from 'views/planning/components/Forms/TargetDistribution';

export const CreatePlanForms = [
  {
    id: 1,
    name: 'Select Fiscal Year',
    component: <FiscalYear />
  },
  {
    id: 2,
    name: 'Select KPI',
    component: <KPISelection />
  },
  {
    id: 3,
    name: 'Select Frequency',
    component: <FrequencySelection />
  },
  {
    id: 4,
    name: 'Target Distribution',
    component: <TargetDistribution />
  }
];
