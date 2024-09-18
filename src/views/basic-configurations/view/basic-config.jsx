import React from 'react';
import { Grid, Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Measuring from '../Measuring-Units';
import Perceptive from '../Perceptive';
import PerformanceScale from '../PerformanceScale';
// import EmployeePosition from '../EmployeePosition';
import EvalType from '../Evaluation-Type';
import Frequency from '../Frequency';
import Period from '../Period';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageContainer from 'ui-component/MainPage';
import DrogaCard from 'ui-component/cards/DrogaCard';

const steps = ['Frequency', 'Period'];

function App() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tabLabels = ['Frequency', 'Period'];

  return (
    <PageContainer maxWidth="lg" title={'Basic Configurations'}>
      <DrogaCard sx={{ marginLeft: '10px', padding: '50px', marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack sx={{ width: '80%', paddingTop: '0px', marginLeft: '20px' }} spacing={2}>
              <Box sx={{ padding: '10px' }}>
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Frequency</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Frequency />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel2'}
                  onChange={handleChange('panel2')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Period</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Period />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel3'}
                  onChange={handleChange('panel3')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Measuring</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Measuring />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel4'}
                  onChange={handleChange('panel4')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Perspective</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Perceptive />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel5'}
                  onChange={handleChange('panel5')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Evaluation Type</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EvalType />
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === 'panel6'}
                  onChange={handleChange('panel6')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Performance Rate Scale</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PerformanceScale />
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === 'panel7'}
                  onChange={handleChange('panel7')}
                  style={{ padding: '5px', marginBottom: '10px' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Job Position</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Perceptive />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ padding: ' 1px' }}></Box>
          </Grid>
        </Grid>
      </DrogaCard>
    </PageContainer>
  );
}

export default App;
