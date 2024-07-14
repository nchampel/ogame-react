import { Box, Typography, Link } from "@mui/material";
import { useCallback, useEffect } from "react";
import { planetApi } from "../api/planet-api";
import Buildings from "../components/buildings";
import { Link as RouterLink } from "react-router-dom";
import toast from "react-hot-toast";
import { buildingsNames } from "../modules/names";

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
    // planets,
    // setPlanets,
    starship,
    isAuthenticated,
    resourcesSearch,
    saveResourcesInvested
  } = props;

  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //     navigate(`/login`)
  // }

  useEffect(() => {
      // console.log(resourcesSearch)
      // setIsAuthenticated(true)
    }, [resourcesSearch])

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

  const addLevel = (type, level, resourcesNeeded) => {
    // console.log(resourcesNeeded)
    // on vérifie que les ressources nécessaires sont là
    // console.log(buildingsResources[type]['energy'])
    // console.log(remainingEnergy)
    if (
      resources["carbon"] >= buildingsResources[type]["carbon"] &&
      resources["diamond"] >= buildingsResources[type]["diamond"] &&
      resources["magic"] >= buildingsResources[type]["magic"] &&
      ((type !== "energy" &&
        remainingEnergy >=
          buildingsResources[type]["next_energy"] -
            buildingsResources[type]["energy"]) ||
        type === "energy")
    ) {
      const resourcesTemp = { ...resources };
      resourcesTemp.carbon = resources.carbon - buildingsResources[type]["carbon"];
      resourcesTemp.diamond =
        resources.diamond - buildingsResources[type]["diamond"];
      resourcesTemp.magic =
        resources.magic - buildingsResources[type]["magic"];
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
      const resourcesInvestedToSave = resourcesNeeded.carbon + resourcesNeeded.diamond + resourcesNeeded.magic
      saveResourcesInvested(resourcesInvestedToSave)
      toast.success(buildingsNames[type] + " construit", { duration: 8000})
    } else {
      toast.error(buildingsNames[type] + " ne peut pas être construit par manque de ressources ou d'énergie", { duration: 8000})
    }
  };

  useEffect(() => {
    // console.log(buildings)
    const buildingsResourcesTemp = {
      carbon: {
        carbon: Math.round(60 * Math.pow(1.5, buildings.carbon - 1)),
        diamond: Math.round(15 * Math.pow(1.5, buildings.carbon - 1)),
        magic: 0,
        energy: Math.round(
          10 * buildings.carbon * Math.pow(1.1, buildings.carbon)
        ),
        next_energy: Math.round(
          10 * (buildings.carbon + 1) * Math.pow(1.1, buildings.carbon + 1)
        ),
        production: roundToTwo(
          8 *
            booster.coefficient *
            30 *
            buildings.carbon *
            Math.pow(1.1, buildings.carbon) +
            72
        ),
      },
      diamond: {
        carbon: Math.round(48 * Math.pow(1.6, buildings.diamond - 1)),
        diamond: Math.round(24 * Math.pow(1.6, buildings.diamond - 1)),
        magic: 0,
        energy: Math.round(
          10 * buildings.diamond * Math.pow(1.1, buildings.diamond)
        ),
        next_energy: Math.round(
          10 * (buildings.diamond + 1) * Math.pow(1.1, buildings.diamond + 1)
        ),
        production: roundToTwo(
          8 *
            booster.coefficient *
            20 *
            buildings.diamond *
            Math.pow(1.1, buildings.diamond) +
            36
        ),
      },
      magic: {
        carbon: Math.round(225 * Math.pow(1.5, buildings.magic - 1)),
        diamond: Math.round(75 * Math.pow(1.5, buildings.magic - 1)),
        magic: 0,
        energy: Math.round(
          10 * buildings.magic * Math.pow(1.1, buildings.magic)
        ),
        next_energy: Math.round(
          10 * (buildings.magic + 1) * Math.pow(1.1, buildings.magic + 1)
        ),
        production: roundToTwo(
          8 *
            booster.coefficient *
            10 *
            buildings.magic *
            Math.pow(1.1, buildings.magic)
        ),
      },
      energy: {
        carbon: Math.round(60 * Math.pow(1.5, buildings.energy - 1)),
        diamond: Math.round(15 * Math.pow(1.5, buildings.energy - 1)),
        magic: 0,
        production: Math.round(
          20 * buildings.energy * Math.pow(1.1, buildings.energy)
        ),
        next_production: Math.round(
          20 * (buildings.energy + 1) * Math.pow(1.1, buildings.energy + 1)
        ),
      },
      protective_dome: {
        carbon: 1000000000 * Math.pow(2, buildings.protective_dome),
        diamond: 500000000 * Math.pow(2, buildings.protective_dome),
        magic: 10000000* Math.pow(2, buildings.protective_dome),
        energy: 1000000 * Math.pow(2, buildings.protective_dome),
        next_energy: 1000000 * Math.pow(2, buildings.protective_dome + 1),
        production: 0,
      },
    };
    setBuildingsResources(buildingsResourcesTemp);
    const energyCarbon = Math.round(
      10 * buildings.carbon * Math.pow(1.1, buildings.carbon)
    );
    const energyDiamond = Math.round(
      10 * buildings.diamond * Math.pow(1.1, buildings.diamond)
    );
    const energyMagic = Math.round(
      10 * buildings.magic * Math.pow(1.1, buildings.magic)
    );
    const energyProtectiveDome = 1000000 * buildings.protective_dome;
    // console.log(8 *
    //   booster.booster *
    //   30 *
    //   buildings.metal *
    //   Math.pow(1.1, buildings.metal)
    //   )
    // console.log(booster)
    // console.log(energyDeuterium)
    setUsedEnergy(energyCarbon + energyDiamond + energyMagic + energyProtectiveDome);
    setRemainingEnergy(
      Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)) -
        energyCarbon - energyDiamond - energyMagic - energyProtectiveDome +
        resources.power_generator * 17 * (resourcesSearch.electricity.level + 1)
    );
    // console.log(Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)))
    // console.log(resources.power_generator * 35 * 2)
    // console.log(resources.power_generator * 35 * (resourcesSearch.electricity.level > 0 ? resourcesSearch.electricity.level : 1))
  }, [buildings]);

  // const buildPowerGenerators = (number) => {
  //   // on vérifie que les ressources nécessaires sont là
  //   // console.log(buildingsResources[type]['energy'])
  //   if (
  //     // starship.shield_level >= 4 &&
  //     resources["crystal"] >= number * 2000 &&
  //     resources["tritium"] >= number * 500
  //   ) {
  //     const resourcesTemp = { ...resources };
  //     resourcesTemp.tritium = resources.tritium - number * 500;
  //     resourcesTemp.crystal = resources.crystal - number * 2000;
  //     resourcesTemp.power_generator = resources.power_generator + number;

  //     // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  //     setResources(resourcesTemp);

  //     setRemainingEnergy(remainingEnergy + 35 * number);
  //     setEnergy(energy + 35 * number);

  //     saveResources(resourcesTemp);
  //   }
  // };

  //   useEffect(() => {
  //     console.log(resources);
  //   }, [resources]);

  return (
    <>
      {isAuthenticated ? (
        <Box sx={{ minHeight: "590px", mr: 2 }}>
          <Buildings
            buildingsResources={buildingsResources}
            buildings={buildings}
            addLevel={addLevel}
            resourcesSearch={resourcesSearch}
          />
          <Typography
            sx={{
              mt: 2,
              textAlign: "left",
              mb: 2,
              ml: 2
            }}
          >
            La Luni produit naturellement un peu de métal et de cristal.
          </Typography>
          <Typography
            sx={{
              mt: 2,
              textAlign: "left",
              mb: 2,
              ml: 2
            }}
          >
            Pour construire la fonderie, la raffinerie et l'extracteur, il faut
            de l'énergie et des ressources. Pour avoir de l'énergie, il faut
            construire puis améliorer la génératrice. Pour les ressources,
            plus le niveau de votre bâtiment est élevé, plus il les produira
            vite.
          </Typography>
          <Typography sx={{ textAlign: "left", ml: 2 }}>
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
                <Button onClick={() => buildPowerGenerators(1)}>1 groupe électrogène</Button>
                <Button onClick={() => buildPowerGenerators(2)}>2 groupes électrogènes</Button>
                <Button onClick={() => buildPowerGenerators(5)}>5 groupes électrogènes</Button>
                <Button onClick={() => buildPowerGenerators(10)}>10 groupes électrogènes</Button>
                    <Button onClick={() => buildPowerGenerators(25)}>25 groupes électrogènes</Button>
                    <Button onClick={() => buildPowerGenerators(100)}>100 groupes électrogènes</Button>
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
