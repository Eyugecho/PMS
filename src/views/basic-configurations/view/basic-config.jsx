import React from 'react';
import { Grid, Box, Typography, Stack, AccordionDetails, useTheme, IconButton } from '@mui/material';
import Measuring from '../Measuring-Units';
import Perceptive from '../Perceptive';
import PerformanceScale from '../PerformanceScale';
import JobPosition from '../JobPosition';
import EvalType from '../Evaluation-Type';
import Frequency from '../Frequency';
import Period from '../Period';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageContainer from 'ui-component/MainPage';

function PreSetup() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(0);

  const handleExpandAccordion = (itemID) => {
    if (itemID === expanded) {
      setExpanded(0);
    } else {
      setExpanded(itemID);
    }
  };

  const setups = [
    {
      id: 1,
      name: 'Frequencies',
      component: <Frequency />
    },
    {
      id: 2,
      name: 'Periods',
      component: <Period />
    },
    {
      id: 3,
      name: 'Measuring Units',
      component: <Measuring />
    },
    {
      id: 4,
      name: 'Perspectives',
      component: <Perceptive />
    },
    {
      id: 5,
      name: 'Evaluation Types',
      component: <EvalType />
    }
  ];

  return (
    <PageContainer maxWidth="lg" title={'Pre-setups'}>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12}>
          <Stack sx={{ width: '80%', marginLeft: '20px' }} spacing={1}>
            {setups.map((item, index) => (
              <Box key={index} expanded={expanded === item.id} sx={{ backgroundColor: theme.palette.grey[50] }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: expanded === item.id ? theme.palette.grey[100] : theme.palette.grey[50],
                    padding: 1.4
                  }}
                  onClick={() => handleExpandAccordion(item.id)}
                >
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <IconButton onClick={() => handleExpandAccordion(item.id)}>
                    {expanded === item.id ? <ExpandMoreIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                {expanded === item.id && <AccordionDetails>{item.component}</AccordionDetails>}
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ padding: ' 1px' }}></Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default PreSetup;
