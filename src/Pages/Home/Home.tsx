import React, { useState } from "react";
import {
  Container,
  Grid,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SavedWorkOuts from "../SavedWorkOuts/SavedWorkOuts";
import AllWorkOuts from "../AllWorkouts/AllWorkOuts";
import NavBar from "../../Components/AppBar/NavBar";
import "./Home.css";

const Home = () => {
  const [value, setValue] = useState("one");
 


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
    <NavBar /> 
    <Container>
         <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          marginTop={3}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="ALL WORKOUTS" />
            <Tab value="two" label="SAVED WORKOUTS" />
          </Tabs>
        </Grid>
     {value === "one" ?  <AllWorkOuts/> : <SavedWorkOuts/>}
    </Container></>
  );
};

export default Home;
