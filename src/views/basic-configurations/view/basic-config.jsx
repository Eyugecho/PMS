import React from "react";
import { Container, Grid, Tabs, Tab, Box, Typography, AppBar, Paper } from "@mui/material";
import Measuring from "../Measuring-Units";
import Perceptive from "../Perceptive";
import Catagory from "../Catagory";
import EvalType from "../Evaluation-Type";
import Frequency from "../Frequency";
import Period from "../Period";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: '10px' }}>
      <Paper elevation={3} style={{ padding: '0px', backgroundColor: '#fff' }}>
        <AppBar position="static" style={{ backgroundColor: '#C1C2CD', boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            variant="fullWidth" 
            textColor="primary" 
            indicatorColor="secondary"
          >
            <Tab label="Perspective Type" />
            <Tab label="Measuring Units" />
            <Tab label="Evaluation Type" />
            <Tab label="Frequency" />
            <Tab label="Period" />
          </Tabs>
        </AppBar>
        <Grid container spacing={3} style={{ marginTop: '10px' }}>
          <Grid item xs={12}>
            <TabPanel value={value} index={0}>
              <Perceptive />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Measuring />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <EvalType />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Frequency />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Period />
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}><Typography>{children}</Typography></Box>}
    </div>
  );
}

export default App;
