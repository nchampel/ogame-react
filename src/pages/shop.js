import { Box, Button, Card, Dialog, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import { planetApi } from "../api/planet-api";
import { useCallback, useEffect, useState } from "react";
import { userApi } from "../api/user-api";
import numeral from "numeral";
import { useMounted } from "../hooks/use-mounted";

const Shop = (props) => {
  const isMounted = useMounted();
  const { unityLink, setUnityLink, booster, setBooster, resources, setResources } = props;
  const [open, setOpen] = useState(false);
  // const [isHarvestDaily, setIsHarvestDaily] = useState(true)

  const handleClose = () => {
    setOpen(false);
  }
  const handleDaily = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (false) setOpen(true)
  }, [])

  const saveLevelBooster = useCallback(async (level) => {
    try {
      const boosterData = await planetApi.saveLevelBooster(
        level,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
      setBooster(boosterData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveUnityLink = useCallback(async (unityLink) => {
    try {
      const boosterData = await userApi.saveUnityLink(
        unityLink,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
      setBooster(boosterData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addBooster = () => {
    // on vérifie qu'il y a assez de métal pour le boost suivant

    if (unityLink >= booster.cost) {
      const resourcesTemp = { ...resources };
      resourcesTemp.booster = booster.coefficient + 1;
      setResources(resourcesTemp)

      setUnityLink(unityLink - booster.cost);
      saveUnityLink(unityLink - booster.cost);
      saveLevelBooster(booster.coefficient + 1);
    }
  };

  const saveDailyClaimed = useCallback(async () => {
    try {
      const isHarvestDaily = await planetApi.saveDailyClaimed(
        localStorage.getItem("jwt").replaceAll('"', "")
      );
      if (isHarvestDaily.msg === 'récompense sauvegardée') {
        setUnityLink(isHarvestDaily.unityLink)
        // setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const determinateDaily = useCallback(async () => {
    try {
      
      const isNotDailyHaversted = await planetApi.determinateDaily(
        localStorage.getItem("jwt").replaceAll('"', "")
      );
      
      if (isMounted()) {
        if (isNotDailyHaversted.is_daily_harvestable){
          setOpen(true);
          saveDailyClaimed();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    determinateDaily();
  }, []);

  return (
    
    
         <>   
              <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="sm"
                PaperProps={{
                  style: {
                    backgroundColor: "#434A54",
                    color: "white",
                  },
                }}
              >
                {/* <DialogTitle>Résultats du combat</DialogTitle> */}
                <DialogContent>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{
                      color: "white",
                      mt: 5,
                    }}
                  >
                    <Typography>Vous avez obtenu la récompense de connexion journalière</Typography>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{
                      color: "white",
                      mt: 5,
                    }}
                  >
                    <Button
                      onClick={handleClose}
                      style={{ color: "white" }}
                    >
                      Ok
                    </Button>
                  </Grid>
                </DialogActions>
              </Dialog>
    <Box
      sx={{
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
      >
      <Typography>{`Lien-Unités : ${numeral(unityLink)
          .format("0,000,000,000,000.00.00")
          .replaceAll(",", " ")}`}</Typography>
      <Card sx= {{
        marginTop: "15px",
        background: "#313742",
        color: "white",
        // boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
        // padding: "2px",
        // minWidth: "300px",
        // maxWidth: "600px",
        margin: "10px auto",
        padding: 2
        // width: "auto"
        // border: "1px solid white",
      }}>
      <Typography>{`Booster : x ${booster.coefficient}`}</Typography>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center"
          }}
          > */}
        <Typography>{`Coût : ${numeral(booster.cost)
          .format("0,000,000,000,000.00.00")
          .replaceAll(",", " ")} Lien-Unités`}</Typography>
        <Button onClick={() => addBooster()}>
          Acheter booster
        </Button>
      {/* </Box> */}
      </Card>
    </Box>
    </>
    
  );
};

export default Shop;
