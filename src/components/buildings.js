import { Box, Button, Card, Grid, Typography } from "@mui/material";
import numeral from "numeral";

const Buildings = (props) => {
  // const isMounted = useMounted();
  const { buildingsResources, buildings, addLevel } = props;

  // console.log(buildings)

  const buildingCardData = [
    { title: "Fonderie de métal", type: "metal" },
    { title: "Raffinerie de cristal", type: "crystal" },
    { title: "Extracteur de tritium", type: "tritium" },
  ];

  const BuildingCard = ({ title, type }) => {
    return (
      <Card
        sx={{
          marginTop: "15px",
          background: "#313742",
          color: "white",
          boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
          padding: "2px",
          minWidth: "300px",
          border: "1px solid white",
        }}
      >
        <Box sx={{ margin: "0px 20px" }}>
          <Typography>{`${title} : ${buildings[type]}`}</Typography>
          <Typography>{`${numeral(buildingsResources[type]["production"])
            .format("0,000,000,000,000")
            .replaceAll(",", " ")} /h`}</Typography>
          <Typography>{`Métal : ${numeral(buildingsResources[type]["metal"])
            .format("0,000,000,000,000")
            .replaceAll(",", " ")} Cristal : ${numeral(
            buildingsResources[type]["crystal"]
          )
            .format("0,000,000,000,000")
            .replaceAll(",", " ")} Energie : ${numeral(
            buildingsResources[type]["next_energy"] -
              buildingsResources[type]["energy"]
          )
            .format("0,000,000,000,000")
            .replaceAll(",", " ")}`}</Typography>
          <Button onClick={() => addLevel(type, buildings[type])}>
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
          item
          sx={{
            marginTop: "15px",
            background: "#313742",
            color: "white",
            boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
            padding: "2px",
            minWidth: "300px",
            border: "1px solid white",
          }}
        >
          <Box sx={{ margin: "0px 20px" }}>
            <Typography>{`Centrale solaire : ${buildings.energy}`}</Typography>
            <Typography>{` + ${numeral(
              buildingsResources.energy.next_production -
                buildingsResources.energy.production
            )
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} énergie`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources.energy.metal)
              .format("0,000,000,000,000")
              .replaceAll(",", " ")} Cristal : ${numeral(
              buildingsResources.energy.crystal
            )
              .format("0,000,000,000,000")
              .replaceAll(",", " ")}`}</Typography>
            <Button onClick={() => addLevel("energy", buildings.energy)}>
              Construire
            </Button>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default Buildings;
