import { Box, Button, Card, Grid, Tooltip, Typography } from "@mui/material";
import numeral from "numeral";
import { shortNumber } from "../modules/functions";

const Buildings = (props) => {
  // const isMounted = useMounted();
  const { buildingsResources, buildings, addLevel, resourcesSearch } = props;

  // console.log(buildings)
  // console.log(shortNumber(1255252772500))

  const buildingCardData = [
    { title: "Synthétiseur de carbone", type: "carbon" },
    { title: "Raffinerie de diamants", type: "diamond" },
    { title: "Extracteur de magie", type: "magic" },
  ];

  const BuildingCard = ({ title, type }) => {
    return (
      <Card
        sx={{
          marginTop: "15px",
          background: "#313742",
          color: "white",
          // boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
          padding: "2px",
          minWidth: "300px",
          // border: "1px solid white",
        }}
      >
        <Box sx={{ margin: "0px 20px" }}>
          <Typography>{`${title} : ${buildings[type]}`}</Typography>
          <Typography>{`${numeral(buildingsResources[type]["production"])
            .format("0,000,000,000,000.00")
            .replaceAll(",", " ")} /h`}</Typography>
            <Tooltip title={numeral(buildingsResources[type]["carbon"])
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">

          <Typography>{`Carbone : ${shortNumber(buildingsResources[type]["carbon"])
            }`}</Typography>
            </Tooltip>
            <Tooltip title={numeral(buildingsResources[type]["diamond"])
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">

             <Typography>{`Diamants : ${shortNumber(
            buildingsResources[type]["diamond"]
          )
            }`}</Typography>
            </Tooltip>
            <Typography>{`Energie : ${numeral(
            buildingsResources[type]["next_energy"] -
              buildingsResources[type]["energy"]
          )
            .format("0,000,000,000,000")
            .replaceAll(",", " ")}`}</Typography>
          <Button onClick={() => addLevel(type, buildings[type], buildingsResources[type])}>
            Construire
          </Button>
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          // flexDirection: 'column',
          justifyContent: "space-between",
          alignItems: "center",
          // minWidth: '400px'
          // maxWidth: '70vw'
          paddingRight: "20px",
          // width: '100vh'
        }}
      >
        {buildingCardData.map((building) => {
          return (
            <BuildingCard
              item
              key={building.type}
              title={building.title}
              type={building.type}
            />
          );
        })}

        <Card
          item="true"
          sx={{
            marginTop: "15px",
            background: "#313742",
            color: "white",
            // boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
            padding: "2px",
            minWidth: "300px",
            // border: "1px solid black",
          }}
        >
          <Box sx={{ margin: "0px 20px" }}>
            <Typography>{`Génératrice d'énergie : ${buildings.energy}`}</Typography>
            <Typography>{` + ${numeral(
              buildingsResources.energy.next_production -
                buildingsResources.energy.production
            )
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} énergie`}</Typography>

              <Tooltip title={numeral(buildingsResources.energy.carbon)
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">
              
            <Typography>{`Carbone : ${shortNumber(buildingsResources.energy.carbon)}`}</Typography>
              </Tooltip>
              <Tooltip title={numeral(buildingsResources.energy.diamond)
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">

              <Typography>{`Diamants : ${shortNumber(
              buildingsResources.energy.diamond
            )}`}</Typography>
              </Tooltip>
            <Button onClick={() => addLevel("energy", buildings.energy, buildingsResources.energy)}>
              Construire
            </Button>
          </Box>
        </Card>
        {resourcesSearch.shield.level >= 20 && (
        <Card
          item="true"
          sx={{
            marginTop: "15px",
            background: "#313742",
            color: "white",
            // boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
            padding: "2px",
            minWidth: "300px",
            // border: "1px solid black",
          }}
        >
          
          <Box sx={{ margin: "0px 20px" }}>
            <Typography>{`Dôme protecteur : ${buildings.protective_dome}`}</Typography>
            

              <Tooltip title={numeral(buildingsResources.protective_dome.carbon)
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">
              
            <Typography>{`Carbone : ${shortNumber(buildingsResources.protective_dome.carbon)}`}</Typography>
              </Tooltip>
              <Tooltip title={numeral(buildingsResources.protective_dome.diamond)
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">

              <Typography>{`Diamants : ${shortNumber(
              buildingsResources.protective_dome.diamond
            )}`}</Typography>
              </Tooltip>
              <Tooltip title={numeral(buildingsResources.protective_dome.magic)
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} placement="top">

              <Typography>{`Magie : ${shortNumber(
              buildingsResources.protective_dome.magic
            )}`}</Typography>
              </Tooltip>
              <Typography>{`Energie :  ${numeral(
              buildingsResources.protective_dome.next_energy -
              buildingsResources.protective_dome.energy
            )
              .format("0,000,000,000,000")
              .replaceAll(",", " ")}`}</Typography>
            <Button onClick={() => addLevel("protective_dome", buildings.protective_dome, buildingsResources.protective_dome)}>
              Construire
            </Button>
          </Box>
        </Card>
        )}
      </Grid>
    </>
  );
};

export default Buildings;
