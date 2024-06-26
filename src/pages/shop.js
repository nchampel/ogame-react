import { Box, Button, Card, Typography } from "@mui/material";
import { planetApi } from "../api/planet-api";
import { useCallback } from "react";
import { userApi } from "../api/user-api";
import numeral from "numeral";

const Shop = (props) => {
  // const isMounted = useMounted();
  const { unityLink, setUnityLink, booster, setBooster, resources, setResources } = props;

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

  return (
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
  );
};

export default Shop;
