import React, { useState } from "react";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Pagination,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import { bodyPart } from "../../Seeder/BodyPart";
import { Filter, Res, WorkOut } from "../../Models/Models";
import {
  createDoc,
  update,
  getWithQuery,
} from "../../firebase/FireBase-services";
import SavedWorkOuts from "../SavedWorkOuts/SavedWorkOuts";
import AllWorkOuts from "../AllWorkouts/AllWorkOuts";
import "./Home.css";

const Home = () => {
  const [value, setValue] = useState("one");
  const [openLoader, setOpenLoader] = useState(false);
  const [openToast, setOpenToast] = useState({
    open: false,
    msg: "",
  });

  // const handleClose = () => {
  //     setOpen(false);
  // };
  // const handleToggle = () => {
  //     setOpen(!open);
  // };
  const handleClose = () => {
    setOpenToast({ open: false, msg: "" });
  };


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
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
    </Container>
  );
};

export default Home;
