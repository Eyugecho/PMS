import React from "react";
import { Container, Grid, Tabs, Tab, Box, Typography, AppBar } from "@mui/material";
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
    <Container>
      <Grid container>
        <Grid item xs={12} >
          <AppBar position="static" style={{background:'#fff'}}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
             
              <Tab label="KPI Catagory" />
              <Tab label="Perspective Type" />
              <Tab label="Measuring Units" />
              <Tab label="Evaluation Type" />
              <Tab label="Frequency" />
              <Tab label="Period" />
              
           
            </Tabs>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <Catagory />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Perceptive />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Measuring />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <EvalType />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Frequency />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Period />
          </TabPanel>
        </Grid>
      </Grid>
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
