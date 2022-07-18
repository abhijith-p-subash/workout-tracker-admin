import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import BackDrop from "../../Components/BackDrop/BackDrop";
import { bodyPart } from "../../Seeder/BodyPart";
import { Filter, Res,  } from "../../Models/Models";
import { capitalize } from "../../Util/Util";
import { createDoc, getWithQuery, fileUpload} from "../../firebase/FireBase-services";
// import {saveAs} from "file-saver"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AllWorkOuts = () => {
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
  const [imgUpload, setImgUpload] = useState<any>(null)
  const [searchText, setSearchText] = useState("");


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
    setOpenBackDrop(true);
    setWrkOut(data);
    setWrkOutDetails(data.data[0]);
    setSelectedIndexWrk(0);
    setOpenBackDrop(false);
  };

  const openDetails = async (item: any) => {
    setOpenBackDrop(true);
    setWrkOutDetails(item);
    setOpenBackDrop(false);
  };

  const AddWorkOut = async (param: any) => {
    setOpenBackDrop(true);

    if(imgUpload === null){
      setOpenBackDrop(false);
      setOpenAlert({
        ctrl: true,
        colour: "info",
        msg: "select gif file",
      });
      return
    };

    const upload = await fileUpload('wrkoutImg', imgUpload[0].name, imgUpload[0]);
    setImgUpload(null);
    if(upload.error){
      setOpenBackDrop(false);
      setOpenAlert({
        ctrl: true,
        colour: "error",
        msg: "upload failed",
      });
      return;
    }
      
    
    let filter: Filter[] = [{ field: "id", operator: "==", value: param.id }];
    const getData: Res = await getWithQuery("exercises", filter);
    if (getData.data.length > 0) {
      setOpenBackDrop(false);
      setOpenAlert({
        ctrl: true,
        colour: "error",
        msg: "Already Work Out Added",
      });
    } else {
      param.url = upload.data;
      const res: Res = await createDoc("exercises", param);
      if (res.error) {
        const err = JSON.parse(JSON.stringify(res.data));
        setOpenBackDrop(false);
        setOpenAlert({ ctrl: true, colour: "error", msg: err });
      } else {
        setOpenBackDrop(false);
        setOpenAlert({ ctrl: true, colour: "success", msg: "WorkOut Added" });
      }
    }
  };

  // const saveFile = async (param:any) => {
  //   await saveAs(
  //     `${param.gifUrl}`,
  //     `${param.id}.gif`
  //   );
  // };

  return (
    <div style={{ marginTop: 35 }}>
      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BACKDROP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
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
      <Card sx={{ minWidth: 300 }}>
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
                <div style={{margin:10}}>
                <TextField value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} id="outlined-basic" label="Search" variant="outlined" size="small" fullWidth/>
                </div>
                <List component="nav" aria-label="secondary mailbox folder">
                  <div className="wrk">
                    {wrkOut.data.
                    filter((val) => {
                      if (searchText === "") {
                        return val;
                      } else if (
                        val.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val.equipment
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      ) {
                        return val;
                      }
                    }).map((item, index) => (
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
                  <Grid item xs={6} md={10}>
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
                  <Grid item xs={6} md={2}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        AddWorkOut(wrkOutDetails);
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography align="left" color="#8a8799">
                      ID
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography align="left">
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {capitalize(wrkOutDetails.id)}
                      </span>
                    </Typography>
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
                  <Grid item xs={6} md={4}>
                    <Typography align="left" color="#8a8799">
                      upload
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                   <input type="file" onChange={(event)=> setImgUpload(event.target.files)}/>
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

export default AllWorkOuts;
