import { Box, Button, Card, Typography, Link } from "@mui/material";
import { useCallback, useEffect } from "react";
import { planetApi } from "../api/planet-api";
import Buildings from "../components/buildings";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const Dashboard = (props) => {
  const {
    resources,
    setResources,
    buildings,
    setBuildings,
    usedEnergy,
    setUsedEnergy,
    remainingEnergy,
    setRemainingEnergy,
    energy,
    setEnergy,
    buildingsResources,
    setBuildingsResources,
    booster,
    planets,
    setPlanets,
    starship,
    isAuthenticated,
  } = props;

  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //     navigate(`/login`)
  // }

  // useEffect(() => {
  //     console.log(isAuthenticated)
  //     setIsAuthenticated(true)
  //   }, [isAuthenticated])

  const saveResources = useCallback(async (resources) => {
    try {
      await planetApi.saveResources(
        resources,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveLevel = useCallback(async (type, level) => {
    try {
      await planetApi.saveLevel(
        type,
        level,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addLevel = (type, level) => {
    // console.log(buildingsResources)
    // on vérifie que les ressources nécessaires sont là
    // console.log(buildingsResources[type]['energy'])
    // console.log(remainingEnergy)
    if (
      resources["metal"] >= buildingsResources[type]["metal"] &&
      resources["crystal"] >= buildingsResources[type]["crystal"] &&
      ((type !== "energy" &&
        remainingEnergy >=
          buildingsResources[type]["next_energy"] -
            buildingsResources[type]["energy"]) ||
        type === "energy")
    ) {
      const resourcesTemp = { ...resources };
      resourcesTemp.metal = resources.metal - buildingsResources[type]["metal"];
      resourcesTemp.crystal =
        resources.crystal - buildingsResources[type]["crystal"];
      // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
      setResources(resourcesTemp);
      if (type === "energy") {
        setRemainingEnergy(
          buildingsResources[type]["next_production"] - usedEnergy
        );
        setEnergy(buildingsResources[type]["next_production"]);
      } else {
        setRemainingEnergy(
          remainingEnergy - buildingsResources[type]["next_energy"]
        );
      }
      saveResources(resourcesTemp);
      saveLevel(type, level + 1);
      const buildingsTemp = { ...buildings };
      buildingsTemp[type] = level + 1;
      // console.log(buildingsTemp)
      setBuildings(buildingsTemp);
    }
  };

  useEffect(() => {
    const buildingsResourcesTemp = {
      metal: {
        metal: Math.round(60 * Math.pow(1.5, buildings.metal - 1)),
        crystal: Math.round(15 * Math.pow(1.5, buildings.metal - 1)),
        energy: Math.round(
          10 * buildings.metal * Math.pow(1.1, buildings.metal)
        ),
        next_energy: Math.round(
          10 * (buildings.metal + 1) * Math.pow(1.1, buildings.metal + 1)
        ),
        production: roundToTwo(
          8 *
            booster.coefficient *
            30 *
            buildings.metal *
            Math.pow(1.1, buildings.metal) +
            72
        ),
      },
      crystal: {
        metal: Math.round(48 * Math.pow(1.6, buildings.crystal - 1)),
        crystal: Math.round(24 * Math.pow(1.6, buildings.crystal - 1)),
        energy: Math.round(
          10 * buildings.crystal * Math.pow(1.1, buildings.crystal)
        ),
        next_energy: Math.round(
          10 * (buildings.crystal + 1) * Math.pow(1.1, buildings.crystal + 1)
        ),
        production: roundToTwo(
          8 *
            booster.coefficient *
            20 *
            buildings.crystal *
            Math.pow(1.1, buildings.crystal) +
            36
        ),
      },
      tritium: {
        metal: Math.round(225 * Math.pow(1.5, buildings.tritium - 1)),
        crystal: Math.round(75 * Math.pow(1.5, buildings.tritium - 1)),
        energy: Math.round(
          10 * buildings.tritium * Math.pow(1.1, buildings.tritium)
        ),
        next_energy: Math.round(
          10 * (buildings.tritium + 1) * Math.pow(1.1, buildings.tritium + 1)
        ),
        production: roundToTwo(
          8 *
            booster.coefficient *
            10 *
            buildings.tritium *
            Math.pow(1.1, buildings.tritium)
        ),
      },
      energy: {
        metal: Math.round(60 * Math.pow(1.5, buildings.energy - 1)),
        crystal: Math.round(15 * Math.pow(1.5, buildings.energy - 1)),
        production: Math.round(
          20 * buildings.energy * Math.pow(1.1, buildings.energy)
        ),
        next_production: Math.round(
          20 * (buildings.energy + 1) * Math.pow(1.1, buildings.energy + 1)
        ),
      },
    };
    setBuildingsResources(buildingsResourcesTemp);
    const energyMetal = Math.round(
      10 * buildings.metal * Math.pow(1.1, buildings.metal)
    );
    const energyCrystal = Math.round(
      10 * buildings.crystal * Math.pow(1.1, buildings.crystal)
    );
    const energyDeuterium = Math.round(
      10 * buildings.tritium * Math.pow(1.1, buildings.tritium)
    );
    // console.log(8 *
    //   booster.booster *
    //   30 *
    //   buildings.metal *
    //   Math.pow(1.1, buildings.metal)
    //   )
    // console.log(booster)
    // console.log(energyDeuterium)
    setUsedEnergy(energyMetal + energyCrystal + energyDeuterium);
    setRemainingEnergy(
      Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)) -
        energyMetal -
        energyCrystal -
        energyDeuterium +
        resources.satellites * 35
    );
    // console.log(Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)))
  }, [buildings]);

  const addResourcesHours = (hours) => {
    // on calcule les ressources cumulées pendant l'absence sur la planète
    const resourcesToAdd = {
      metal: buildingsResources.metal.production * hours,
      crystal: buildingsResources.crystal.production * hours,
      tritium: buildingsResources.tritium.production * hours,
    };
    const resourcesTemp = { ...resources };
    resourcesTemp.metal += resourcesToAdd.metal;
    resourcesTemp.crystal += resourcesToAdd.crystal;
    resourcesTemp.tritium += resourcesToAdd.tritium;

    saveResources(resourcesTemp);
    setResources(resourcesTemp);

    // on calcule les ressources cumulées pendant l'absence sur les planètes
    const resourcesPlanetsTemp = [...planets];
    resourcesPlanetsTemp.forEach((planet, index) => {
      resourcesPlanetsTemp[index]["metal"] =
        Math.round(
          30 *
            resourcesPlanetsTemp[index]["metal_level"] *
            Math.pow(1.1, resourcesPlanetsTemp[index]["metal_level"])
        ) * hours;
      resourcesPlanetsTemp[index]["crystal"] =
        Math.round(
          30 *
            resourcesPlanetsTemp[index]["crystal_level"] *
            Math.pow(1.1, resourcesPlanetsTemp[index]["crystal_level"])
        ) * hours;
      resourcesPlanetsTemp[index]["tritium"] =
        Math.round(
          30 *
            resourcesPlanetsTemp[index]["deuterium_level"] *
            Math.pow(1.1, resourcesPlanetsTemp[index]["deuterium_level"])
        ) * hours;
      resourcesPlanetsTemp[index]["cost"] = Math.round(
        (resourcesPlanetsTemp[index]["metal"] +
          resourcesPlanetsTemp[index]["crystal"] +
          resourcesPlanetsTemp[index]["tritium"]) /
          10
      );
    });

    // saveResources(resourcesPlanetsTemp) à implémenter
    setPlanets(resourcesPlanetsTemp);
  };

  const buildSatellites = (number) => {
    // on vérifie que les ressources nécessaires sont là
    // console.log(buildingsResources[type]['energy'])
    if (
      starship.shield_level >= 4 &&
      resources["crystal"] >= number * 2000 &&
      resources["tritium"] >= number * 500
    ) {
      const resourcesTemp = { ...resources };
      resourcesTemp.tritium = resources.tritium - number * 500;
      resourcesTemp.crystal = resources.crystal - number * 2000;
      resourcesTemp.satellites = resources.satellites + number;

      // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
      setResources(resourcesTemp);

      setRemainingEnergy(remainingEnergy + 35 * number);
      setEnergy(energy + 35 * number);

      saveResources(resourcesTemp);
    }
  };

  //   useEffect(() => {
  //     console.log(resources);
  //   }, [resources]);

  return (
    <>
      {isAuthenticated ? (
        <Box sx={{ minHeight: "600px", mr: 2 }}>
          <Buildings
            buildingsResources={buildingsResources}
            buildings={buildings}
            addLevel={addLevel}
          />
          <Typography
            sx={{
              mt: 2,
              textAlign: "left",
              mb: 2,
            }}
          >
            La Luni produit naturellement un peu de métal et de cristal.
          </Typography>
          <Typography
            sx={{
              mt: 2,
              textAlign: "left",
              mb: 2,
            }}
          >
            Pour construire la fonderie, la raffinerie et l'extracteur, il faut
            de l'énergie et des ressources. Pour avoir de l'énergie, il faut
            construire puis améliorer la centrale solaire. Pour les ressources,
            plus le niveau de votre bâtiment est élevé, plus il les produira
            vite.
          </Typography>
          <Typography sx={{ textAlign: "left" }}>
            Pour l'instant le jeu se limite à cela, mais des fonctionnalités
            déjà en test seront rapidement ajoutées ! (par exemple des
            ressources additionnelles seront récoltables au bout d'un certain
            temps)
          </Typography>
          {/* <Card sx={{
        marginBottom: '15px'
        }}>
            <Button onClick={() => addResourcesHours(1)}>1 h</Button>
            <Button onClick={() => addResourcesHours(5)}>5 h</Button>
            <Button onClick={() => addResourcesHours(10)}>10 h</Button>
            <Button onClick={() => addResourcesHours(24)}>24 h</Button>
            <Button onClick={() => addResourcesHours(48)}>48 h</Button>
        </Card> */}
          {/* <Card sx={{
        marginTop: '15px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                <Typography>Créer</Typography>
                <Box>
                    <Button onClick={() => buildSatellites(1)}>1 satellite</Button>
                    <Button onClick={() => buildSatellites(10)}>10 satellites</Button>
                    <Button onClick={() => buildSatellites(100)}>100 satellites</Button>
                    <Button onClick={() => buildSatellites(1000)}>1000 satellites</Button>
                </Box>
            </Box>
        </Card> */}
        </Box>
      ) : (
        <>
          <Typography>Il faut être connecté</Typography>
          <Link
            component={RouterLink}
            underline="none"
            sx={{ marginBottom: "20px" }}
            to="/login"
          >
            Se connecter
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
