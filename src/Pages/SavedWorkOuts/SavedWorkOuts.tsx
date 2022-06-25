import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import BackDrop from "../../Components/BackDrop/BackDrop";
import { bodyPart } from "../../Seeder/BodyPart";
import {  Filter, Res, } from "../../Models/Models";
import { capitalize } from "../../Util/Util";
import {
  deleteOne,
  getWithQuery,
} from "../../firebase/FireBase-services";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SavedWorkOuts = () => {
  const [wrkOut, setWrkOut] = useState(bodyPart[0]);
  const [wrkOutDetails, setWrkOutDetails] = useState(wrkOut.data[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexWrk, setSelectedIndexWrk] = useState(0);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    ctrl: false,
    msg: "",
    colour: "success",
  });

  // const handleClickAlert = () => {
  //   setOpenAlert(true);
  // };

  useEffect(() => {
    openWrkOuts(bodyPart[0]);
  }, []);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({ ctrl: false, msg: "", colour: "success" });
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleListItemClickWrk = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setOpenBackDrop(true);
    setSelectedIndexWrk(index);
    setOpenBackDrop(false);
  };

  const openWrkOuts = async (data: any) => {
    try {
      setOpenBackDrop(true);
      let filter: Filter[] = [
        { field: "bodyPart", operator: "==", value: data.name },
      ];
      const res: Res = await getWithQuery("exercises", filter);

      await setWrkOut({
        id: data.id,
        name: data.name,
        data: res.data,
      });
      await setWrkOutDetails(
        res.data[0] || {
          workOut: "No Data",
          bodyPart: "No Data",
          equipment: "No Data",
          gifUrl: "No Data",
          id: "No Data",
          name: "No Data",
          target: "No Data",
        }
      );
      setSelectedIndexWrk(0);
      setOpenBackDrop(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openDetails = async (item: any) => {
    setOpenBackDrop(true);
    setWrkOutDetails(item);
    setOpenBackDrop(false);
  };

  const RemoveWorkOut = async (param: any) => {
    setOpenBackDrop(true);
    const res: Res = await deleteOne("exercises", param.id);
    setOpenBackDrop(false);
    if (res.error) {
      const err = JSON.parse(JSON.stringify(res.data));
      setOpenBackDrop(false);
      setOpenAlert({
        ctrl: true,
        colour: "error",
        msg: err,
      });
    } else {
      openWrkOuts(wrkOut);
      setOpenBackDrop(false);
      setOpenAlert({ ctrl: true, colour: "success", msg: "WorkOut Removed" });
    }
  };

  return (
    <div style={{ marginTop: 35 }}>
      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BACKDROP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <BackDrop open={openBackDrop}/>
      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BACKDROP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SNACKBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      {openAlert.colour === "success" ? (
        <Snackbar
          open={openAlert.ctrl}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            {openAlert.msg}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={openAlert.ctrl}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {openAlert.msg}
          </Alert>
        </Snackbar>
      )}
      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SNACKBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Card sx={{ minWidth: 300, maxHeight: 900 }}>
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5" align="center" color="#8a8787">
                  BODY PARTS
                </Typography>
                <hr />
                <List component="nav" aria-label="secondary mailbox folder">
                  {bodyPart.map((part, index) => (
                    <ListItemButton
                      key={index}
                      selected={selectedIndex === index}
                      onClick={(event) => {
                        handleListItemClick(event, index);
                        openWrkOuts(part);
                      }}
                    >
                      <ListItemText>
                        {index + 1}
                        <span
                          style={{
                            fontStyle: "oblique",
                            fontWeight: "bold",
                            color: "#4a4948",
                          }}
                        >
                          . {capitalize(part.name)}
                        </span>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" align="center" color="#8a8787">
                  WORK OUTS
                </Typography>
                <hr />
                <List component="nav" aria-label="secondary mailbox folder">
                  <div className="wrk">
                    {wrkOut.data.map((item, index) => (
                      <ListItemButton
                        key={index}
                        selected={selectedIndexWrk === index}
                        onClick={(event) => {
                          handleListItemClickWrk(event, index);
                          openDetails(item);
                        }}
                      >
                        <ListItemText>
                          {index + 1}
                          <span
                            style={{
                              fontStyle: "oblique",
                              fontWeight: "bold",
                              color: "#4a4948",
                            }}
                          >
                            . {capitalize(item.name)}
                          </span>
                        </ListItemText>
                      </ListItemButton>
                    ))}
                  </div>
                </List>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="h5" align="center" color="#8a8787">
                  WORKOUT DETAILS
                </Typography>
                <hr />
                <Grid container spacing={2} paddingLeft={1}>
                  <Grid item xs={6} md={9}>
                    <Typography
                      variant="h6"
                      align="left"
                      color="#8a879"
                      fontWeight=""
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {capitalize(wrkOutDetails.name)}
                      </span>
                    </Typography>
                    {/* <h2 style={{color:"#8a879"}}> {capitalize(wrkOutDetails.name)}</h2> */}
                  </Grid>
                  <Grid item xs={6} md={3} alignItems="start">
                    <Button
                      disabled={wrkOutDetails.name === "No Data"}
                      variant="contained"
                      onClick={() => {
                        RemoveWorkOut(wrkOutDetails);
                      }}
                    >
                      REMOVE
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography align="left" color="#8a8799">
                      Boby-Part
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography align="left">
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {capitalize(wrkOutDetails.bodyPart)}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography align="left" color="#8a8799">
                      Target
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography align="left">
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {capitalize(wrkOutDetails.target)}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography align="left" color="#8a8799">
                      Equipment
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography align="left">
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {capitalize(wrkOutDetails.equipment)}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    marginTop={4}
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "100" }}
                  >
                    <Grid item md={12} alignContent={"center"}>
                      <img width={300} src={wrkOutDetails.gifUrl} alt="img" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedWorkOuts;
