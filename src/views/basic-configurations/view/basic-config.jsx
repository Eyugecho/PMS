import React from 'react';
import { Container, Grid, Box, Typography, Paper, Stepper, Step, StepLabel, Stack, Accordion, Divider,Tabs,Tab ,AccordionSummary,AccordionDetails} from '@mui/material';
import Measuring from '../Measuring-Units';
import Perceptive from '../Perceptive';
import EvalType from '../Evaluation-Type';
import Frequency from '../Frequency';
import Period from '../Period';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StraightenIcon from '@mui/icons-material/Straighten';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Page } from 'views/roles_permission';
import PageContainer from 'ui-component/MainPage';



const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;


  const icons = {
    // 1: <ChromeReaderModeIcon />,
    // 2: <StraightenIcon />,
    // 3: <CreditScoreIcon />,
    1: <StraightenIcon />,
    2: <AccessTimeFilledIcon />,
    

  };

  

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const steps = [ 'Frequency', 'Period'];

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  
  const [tabIndex, setTabIndex] = React.useState(0); // state for managing tabs

  const steps = ['Frequency', 'Step 2']; // Example steps



  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleStepChange = (step) => () => {
    setActiveStep(step);
    setActiveStep(index);
  };
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  const tabLabels = ['Frequency', 'Period'];
  return (
    <PageContainer maxWidth="lg" title={'Basic Configurations'}>
      <Box style={{ padding: '50px', boxShadow: '0 4px 6px rgba(0.5, 0, 0, 0.1)', marginLeft: '10px' }}>
        <Grid container spacing={3}>
          {/* Left Grid containing Stepper and content */}
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
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ padding: ' 1px' }}></Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default App;
