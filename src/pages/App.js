import "../css/App.css";
import { Route, Routes, Link } from "react-router-dom";
import routes from "../modules/routes";
import Sidebar from "../components/sidebar.tsx";
import { useMounted } from "../hooks/use-mounted";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { planetApi } from "../api/planet-api";
import { planetsApi } from "../api/planets-api";
import { starshipApi } from "../api/starship-api";
import Login from "./login";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import numeral from "numeral";
import toast, { Toaster } from 'react-hot-toast';
import { searchApi } from "../api/search-api";
import Register from "./register";
import { userApi } from "../api/user-api";
import { playerApi } from "../api/player-api.tsx";
import { shortNumber } from "../modules/functions.tsx";
import { resourcesNameFrench } from "../modules/names.tsx";
// import Nature from './nature';

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const ButtonMailto = ({ mailto, label }) => {
  return (
      <Link
          to='#'
          onClick={(e) => {
              window.location.href = mailto;
              e.preventDefault();
          }}
          style= {{ color: 'white'}}
      >
          {label}
      </Link>
  );
};

function App() {
  const isMounted = useMounted();
  const navigate = useNavigate();
  const [resources, setResources] = useState({
    carbon: 0,
    diamond: 0,
    magic: 0,
    power_generator: 0,
    booster: 1,

  });
  const [buildings, setBuildings] = useState({ energy: 0});
  const [usedEnergy, setUsedEnergy] = useState(0);
  const [remainingEnergy, setRemainingEnergy] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [buildingsResources, setBuildingsResources] = useState({
    carbon: {},
    diamond: {},
    magic: {},
    energy: {},
    protective_dome: {},
  });
  const [booster, setBooster] = useState({ coefficient: 1, cost: 1000 });
  const [planets, setPlanets] = useState([]);
  const [planetsMultiverse, setPlanetsMultiverse] = useState([]);
  const [starship, setStarship] = useState({ is_built: false });
  const [resourcesSearch, setResourcesSearch] = useState({
    life: {},
    fire: {},
    shield: {},
    energy: {level: 0},
    electricity: {level: 0},
    time: {level: 0},
  });
  // const [resourcesNeeded, setResourcesNeeded] = useState({
  //   metal: 0,
  //   crystal: 0,
  //   tritium: 0,
  // });
  const [planetsDiscovered, setPlanetsDiscovered] = useState([]);
  const [planetsNotDiscovered, setPlanetsNotDiscovered] = useState([]);
  // const [searchLevels, setSearchLevels] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emptyJWT, setEmptyJWT] = useState(true);
  const [open, setOpen] = useState(false);
  const [nature, setNature] = useState(null);
  const [unityLink, setUnityLink] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [pseudo, setPseudo] = useState('')
  const [searchBase, setSearchBase] = useState({})
  const [isWebsiteUnderMaintenance, setIsWebsiteUnderMaintenance] = useState(true)
  const [successPlayer, setSuccessPlayer] = useState([]);
  const resourcesName = ['carbon', 'diamond', 'magic']
  
  // Extraire la dernière partie de l'URL
  const pathname = window.location.pathname;
  const partsUrl = pathname.split('/');
  const lastPartUrl = partsUrl[partsUrl.length - 1];


  // const [planetsDiscoveredNumber, setPlanetsDiscoveredNumber] = useState(0)

  // const tdeuterium = 40

  // console.log(Math.round(10 * tdeuterium * Math.pow(1.1, tdeuterium)))

  // let verify = null
  // if (localStorage.getItem("jwt") === null) {
  //   navigate("login/")
  // }

  // useEffect(() => {
  //   // console.log(isAuthenticated)
  //   // setIsAuthenticated(true)
  // }, [isAuthenticated])
  useEffect(() => {
    // console.log(resources)
  }, [resources])

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getPlanetDatas = useCallback(async () => {
    try {
      // let verify = null
      let jwt = null;
      if (localStorage.getItem("jwt") !== null) {
        jwt = localStorage.getItem("jwt").replaceAll('"', "");
        setEmptyJWT(false);
      }
      const verify = await userApi.verifyJWT(jwt);
      if (verify.msg === "Authentifié") {
        setIsAuthenticated(true);
        setNature(verify.nature);
      }
      //  console.log(isAuthenticated)
      // }
      let dataResources = null;
      let dataBuildings = null;
      let boosterCost = null;
      let dataPlanets = null;
      let dataPlanetsMultiverse = null;
      let dataStarship = null;
      let dataSearch = null;
      let dataUser = null;
      let maintenance = null;
      let dataSuccessPlayer = null
      let isAdminPlayer = null

      if (verify.msg === "Pas de token") {
        isAdminPlayer = playerApi.getIsAdminPlayer()
      }

      if (verify.msg !== "Pas de token") {
        dataResources = await planetApi.getResources(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        // console.log(dataResources)
        dataBuildings = await planetApi.getBuildings(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        // retour {'carbon': 0, 'diamond': 0, 'magic': 0, 'energy': 0,
        //   'unity-link_generator': 0, 'ticket_generator': 0,'protective_dome': 0}
        boosterCost = await planetApi.getBoosterCost(
          dataResources.booster,
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        dataPlanets = await planetsApi.getPlanetsData(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        dataPlanetsMultiverse = await planetsApi.getPlanetsMultiverseData(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        dataStarship = await starshipApi.getStarshipData(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        dataSearch = await searchApi.getSearchData(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        // console.log(dataSearch)
        dataUser = await userApi.getUnityLink(
          localStorage.getItem("jwt").replaceAll('"', "")
        );
        maintenance = await playerApi.getIsWebsiteUnderMaintenance(
          localStorage.getItem("jwt").replaceAll('"', "")
        )
        dataSuccessPlayer =  await playerApi.getSuccessPlayer(
          localStorage.getItem("jwt").replaceAll('"', "")
        )
      }
      // const dataBuildingsResources = await planetApi.getBuildingsResources()
      if (isMounted()) {
        // pour site en maintenance, je pense pas que cela sera nécessaire car 
        // setIsAdmin(true) sera fait au retour du formik
        // if (verify.msg === "Pas de token" && isAdminPlayer) {
        //   setIsAdmin(true)
        // }
        if (verify.msg === "Authentifié") {
          // setIsAuthenticated(true)
          setPseudo(verify.pseudo)
          setIsAdmin(verify.isAdmin)
          setIsWebsiteUnderMaintenance(maintenance.isWebsiteUnderMaintenance)
          setResources(dataResources);
          setBuildings(dataBuildings);
          // console.log(dataSearch.energy)
          const resourcesSearchTemp = {}
          const searchesName = ['life', 'shield', 'fire', 'energy', 'electricity', 'time']
          
          searchesName.forEach((searchName) => {
            resourcesName.forEach((resourceName) => {
              // console.log(dataSearch[searchName])
              resourcesSearchTemp[searchName] = { ...resourcesSearchTemp[searchName],
              [resourceName] : dataSearch[searchName][resourceName] * Math.pow(2, dataSearch[searchName]['level']),
              
            }
          })
          // console.log(resourcesSearchTemp)
          resourcesSearchTemp[searchName] = {...resourcesSearchTemp[searchName], level: dataSearch[searchName]['level'] }
            
          })
          
          setResourcesSearch(resourcesSearchTemp)

          setSuccessPlayer(dataSuccessPlayer.successPlayer)

          setSearchBase(dataSearch)
          // console.log(resourcesSearchTemp)
          
          setStarship({ is_built: dataStarship.is_built });
          // setSearchLevels({
          //   life_level: dataSearch.life.level,
          //   fire_level: dataSearch.fire.level,
          //   shield_level: dataSearch.shield.level,
          //   energy_level: dataSearch.energy.level,
          // });
          setBooster({ coefficient: dataResources.booster, cost: boosterCost });
          dataPlanets.forEach((_, idx) => {
            const carbon = dataPlanets[idx]["carbon"];
            const diamond = dataPlanets[idx]["diamond"];
            const magic = dataPlanets[idx]["magic"];
            dataPlanets[idx]["cost"] = Math.round(
              (carbon + diamond + magic) / 10
            );
          });
          setPlanets(dataPlanets);
          setPlanetsMultiverse(dataPlanetsMultiverse.all);
          setPlanetsDiscovered(dataPlanetsMultiverse.discovered);
          setPlanetsNotDiscovered(dataPlanetsMultiverse.not_discovered);
          // setPlanetsDiscoveredNumber(501 - dataPlanetsMultiverse.not_discovered.length)
          // console.log(dataPlanetsMultiverse.discovered)
          const buildingsResourcesTemp = {
            carbon: {
              carbon: Math.round(60 * Math.pow(1.5, dataBuildings.carbon - 1)),
              diamond: Math.round(15 * Math.pow(1.5, dataBuildings.carbon - 1)),
              magic: 0,
              energy: Math.round(
                10 * dataBuildings.carbon * Math.pow(1.1, dataBuildings.carbon)
              ),
              next_energy: Math.round(
                10 *
                  (dataBuildings.carbon + 1) *
                  Math.pow(1.1, dataBuildings.carbon + 1)
              ),
              production: roundToTwo(
                8 *
                  dataResources.booster *
                  30 *
                  dataBuildings.carbon *
                  Math.pow(1.1, dataBuildings.carbon) +
                  72
              ),
            },
            diamond: {
              carbon: Math.round(48 * Math.pow(1.6, dataBuildings.diamond - 1)),
              diamond: Math.round(
                24 * Math.pow(1.6, dataBuildings.diamond - 1)
              ),
              magic: 0,
              energy: Math.round(
                10 *
                  dataBuildings.diamond *
                  Math.pow(1.1, dataBuildings.diamond)
              ),
              next_energy: Math.round(
                10 *
                  (dataBuildings.diamond + 1) *
                  Math.pow(1.1, dataBuildings.diamond + 1)
              ),
              production: roundToTwo(
                8 *
                  dataResources.booster *
                  20 *
                  dataBuildings.diamond *
                  Math.pow(1.1, dataBuildings.diamond) +
                  36
              ),
            },
            magic: {
              carbon: Math.round(225 * Math.pow(1.5, dataBuildings.magic - 1)),
              diamond: Math.round(
                75 * Math.pow(1.5, dataBuildings.magic - 1)
              ),
              magic: 0,
              energy: Math.round(
                10 *
                  dataBuildings.magic *
                  Math.pow(1.1, dataBuildings.magic)
              ),
              next_energy: Math.round(
                10 *
                  (dataBuildings.magic + 1) *
                  Math.pow(1.1, dataBuildings.magic + 1)
              ),
              production: roundToTwo(
                8 *
                  dataResources.booster *
                  10 *
                  dataBuildings.magic *
                  Math.pow(1.1, dataBuildings.magic)
              ),
            },
            energy: {
              carbon: Math.round(60 * Math.pow(1.5, dataBuildings.energy - 1)),
              diamond: Math.round(15 * Math.pow(1.5, dataBuildings.energy - 1)),
              magic: 0,
              production: Math.round(
                20 * dataBuildings.energy * Math.pow(1.1, dataBuildings.energy)
              ),
              next_production: Math.round(
                20 *
                  (dataBuildings.energy + 1) *
                  Math.pow(1.1, dataBuildings.energy + 1)
              ),
            },
            protective_dome: {
              carbon: 1000000000 * Math.pow(2, dataBuildings.protective_dome),
              diamond: 500000000 * Math.pow(2, dataBuildings.protective_dome),
              magic: 100000000 * Math.pow(2, dataBuildings.protective_dome),
              energy: 1000000 * Math.pow(2, dataBuildings.protective_dome),
              next_energy: 1000000 * Math.pow(2, dataBuildings.protective_dome + 1),
              production: 0,
            },
          };

          setBuildingsResources(buildingsResourcesTemp);
          const energyCarbon = Math.round(
            10 * dataBuildings.carbon * Math.pow(1.1, dataBuildings.carbon)
          );
          const energyDiamond = Math.round(
            10 * dataBuildings.diamond * Math.pow(1.1, dataBuildings.diamond)
          );
          const energyMagic = Math.round(
            10 * dataBuildings.magic * Math.pow(1.1, dataBuildings.magic)
          );
          const energyProtectiveDome = 1000000 * dataBuildings.protective_dome * Math.pow(2, dataBuildings.protective_dome);
          setUsedEnergy(energyCarbon + energyDiamond + energyMagic + energyProtectiveDome);
          setRemainingEnergy(
            Math.round(
              20 * dataBuildings.energy * Math.pow(1.1, dataBuildings.energy)
            ) - energyCarbon - energyDiamond - energyMagic - energyProtectiveDome +
              17 * dataResources.power_generator * (resourcesSearchTemp.electricity.level + 1)
          );
          // console.log(35 * resourcesSearchTemp.electricity.level > 0 ? resourcesSearchTemp.electricity.level : 1 * dataResources.power_generator)
          // console.log(resourcesSearchTemp.electricity.level > 0 ? resourcesSearchTemp.electricity.level : 1 * dataResources.power_generator)
          // console.log(dataResources.power_generator)
          // console.log(resourcesSearchTemp.electricity.level > 0 ? resourcesSearchTemp.electricity.level : 1)
          setEnergy(
            buildingsResourcesTemp.energy.production +
              17 * dataResources.power_generator * (resourcesSearchTemp.electricity.level + 1)
          );
          // setResourcesNeeded({
          //   metal: 1000000 * dataSearch.life_level,
          //   crystal: 1000000 * dataSearch.fire_level,
          //   tritium: 1000000 * dataSearch.shield_level,
          // });
          setUnityLink(dataUser.unity_link);
          setTicket(dataUser.ticket);
          // console.log('authentifié')
        } else {
          // console.log('login')
          navigate("/login");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getPlanetDatas();
  }, []);

  useEffect(() => {
    // console.log('maj')
    if (isAuthenticated) {
      // console.log('maj true')
      getPlanetDatas();
    }
  }, [isAuthenticated]);

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

  const saveSuccessPlayer = useCallback(async (success) => {
    try {
      await playerApi.saveSuccessPlayer(
        success,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addResources = () => {
    const resourcesTemp = { ...resources };
    // console.log(resourcesTemp)
    // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
    // resourcesTemp.metal +=
    //   Math.round(
    //     (8 * 30 * buildings.metal * Math.pow(1.1, buildings.metal)) / 360 + 2
    //   ) === 0 && buildings.metal > 0
    //     ? 1
    //     : Math.round(
    //         (8 *
    //           booster.coefficient *
    //           30 *
    //           buildings.metal *
    //           Math.pow(1.1, buildings.metal)) /
    //           360 +
    //           2
    //       );
    resourcesTemp.carbon +=
      (8 *
        booster.coefficient *
        30 *
        buildings.carbon *
        Math.pow(1.1, buildings.carbon)) /
        360 +
      0.2;
    resourcesTemp.diamond +=
      (8 *
        booster.coefficient *
        20 *
        buildings.diamond *
        Math.pow(1.1, buildings.diamond)) /
        360 +
      0.1;
    // resourcesTemp.crystal +=
    //   Math.round(
    //     (8 * 20 * buildings.crystal * Math.pow(1.1, buildings.crystal)) / 360 +
    //       1
    //   ) === 0 && buildings.crystal > 0
    //     ? 1
    //     : Math.round(
    //         (8 *
    //           booster.coefficient *
    //           20 *
    //           buildings.crystal *
    //           Math.pow(1.1, buildings.crystal)) /
    //           360 +
    //           1
    //       );
    resourcesTemp.magic +=
      (8 *
        booster.coefficient *
        10 *
        buildings.magic *
        Math.pow(1.1, buildings.magic)) /
      360;
    // resourcesTemp.tritium +=
    //   Math.round(
    //     (8 * 10 * buildings.tritium * Math.pow(1.1, buildings.tritium)) /
    //       360
    //   ) === 0 && buildings.tritium > 0
    //     ? 1
    //     : Math.round(
    //         (8 *
    //           booster.coefficient *
    //           30 *
    //           buildings.tritium *
    //           Math.pow(1.1, buildings.tritium)) /
    //           360
    //       );
    // console.log(resourcesTemp.metal)
    resourcesTemp.carbon = roundToTwo(resourcesTemp.carbon);
    resourcesTemp.diamond = roundToTwo(resourcesTemp.diamond);
    resourcesTemp.magic = roundToTwo(resourcesTemp.magic);

    // on vérifie s'il y a eu un succès de ressources atteint
    // console.log(successPlayer)
    const successPlayerTemp = [...successPlayer]
    // successPlayer a la structure [{resource: carbon, value: 1000, is_won: false}]
    successPlayer.map((el, idx) => {
      if (!el.is_won && resourcesTemp[el.resource] >= el.value) {

        // console.log(el.resource + el.value + (el.value/10).toString())
        // on ajoute les ressources gagnées par le succès
        resourcesTemp[el.resource] += el.value / 10
        successPlayerTemp[idx].is_won = true
        // on toaste le succès
        toast.success(shortNumber(el.value/10) + ' de ' + resourcesNameFrench[el.resource] + ' gagnés', {duration: 5000})
        // console.log(shortNumber(el.value/10) + ' de ' + resourcesNameFrench[el.resource] + ' gagnés')
      }
    })
    setSuccessPlayer(successPlayerTemp)


    setResources(resourcesTemp);
    saveResources(resourcesTemp);
    saveSuccessPlayer(successPlayerTemp)
  };

  const saveResourcesPlanets = useCallback(async (planets) => {
    try {
      await planetsApi.saveResourcesPlanets(
        planets,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveResourcesPlanetsMultiverse = useCallback(async (resources) => {
    try {
      await planetsApi.saveResourcesPlanetsMultiverse(
        resources,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addResourcesPlanets = () => {
    const resourcesTemp = [...planets];
    // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
    planets.forEach((_, index) => {
      resourcesTemp[index]["carbon"] +=
        8 *
        Math.round(
          (30 *
            resourcesTemp[index]["carbon_level"] *
            Math.pow(1.1, resourcesTemp[index]["carbon_level"])) /
            360
        );
      resourcesTemp[index]["diamond"] +=
        8 *
        Math.round(
          (30 *
            resourcesTemp[index]["diamond_level"] *
            Math.pow(1.1, resourcesTemp[index]["diamond_level"])) /
            360
        );
      resourcesTemp[index]["magic"] +=
        8 *
        Math.round(
          (30 *
            resourcesTemp[index]["magic_level"] *
            Math.pow(1.1, resourcesTemp[index]["magic_level"])) /
            360
        );
      resourcesTemp[index]["cost"] = Math.round(
        (resourcesTemp[index]["carbon"] +
          resourcesTemp[index]["diamond"] +
          resourcesTemp[index]["magic"]) /
          10
      );
    });
    setPlanets(resourcesTemp);
    // saveResourcesPlanets(resourcesTemp)
  };

  const addResourcesPlanetsMultiverse = () => {
    const resourcesTemp = [...planetsMultiverse];
    // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
    planetsMultiverse.forEach((_, index) => {
      resourcesTemp[index]["carbon"] +=
        8 *
        Math.round(
          (30 *
            resourcesTemp[index]["carbon_level"] *
            Math.pow(1.1, resourcesTemp[index]["carbon_level"])) /
            60
        );
      resourcesTemp[index]["diamond"] +=
        8 *
        Math.round(
          (30 *
            resourcesTemp[index]["diamond_level"] *
            Math.pow(1.1, resourcesTemp[index]["diamond_level"])) /
            60
        );
      resourcesTemp[index]["magic"] +=
        8 *
        Math.round(
          (30 *
            resourcesTemp[index]["magic_level"] *
            Math.pow(1.1, resourcesTemp[index]["magic_level"])) /
            60
        );
    });
    setPlanetsMultiverse(resourcesTemp);
    // saveResourcesPlanetsMultiverse(resourcesTemp)
  };

  const handleDeconnection = () => {
    localStorage.removeItem("jwt");
    // setEmptyJWT(true)
    setOpen(false)
    window.location.reload();
    // setIsAuthenticated(false)
    // setOpen(false)
  };

  useEffect(() => {
    if (emptyJWT) {
      navigate("/login");
    }
  }, [emptyJWT]);

  useEffect(() => {
    if (nature !== null && !isWebsiteUnderMaintenance) {
      const timer = setInterval(() => {
        addResources();
        // console.log('ok')
        // addResourcesPlanets();
        // addResourcesPlanetsMultiverse();
      }, 10000);
      // 10000 en temps normal
      return () => {
        clearInterval(timer);
      };
    }
  }, [resources, nature]);

  const saveResourcesInvested = useCallback(async (resources) => {
    try {
      await playerApi.saveResourcesInvested(
        resources,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  // console.log(isAdmin || (isAdmin && isWebsiteUnderMaintenance) || (!isAdmin && !isWebsiteUnderMaintenance))
  // console.log(isAdmin)

  return (
    <div className="App">
      {/* pour site en maintenance */}
      {/* {isAdmin || (!isAdmin && !isWebsiteUnderMaintenance) ? ( */}
        <>
      {/* <BrowserRouter> */}
      {/* <div style={{ display: "flex" }}> */}
      <Toaster position="top-center" />
      <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
        {isAuthenticated && nature !== null && (
          <Grid item md={2}>
            <Sidebar nature={nature} pseudo={pseudo} handleOpen={handleOpen} lastPartUrl={lastPartUrl} />
          </Grid>
        )}
        <Grid item md={10}>
          {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}> */}
          {isAuthenticated && nature !== null && (
            <>
              <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="xl"
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
                    <Typography>Voulez-vous vous déconnecter ?</Typography>
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
                      onClick={handleDeconnection}
                      style={{ color: "white" }}
                    >
                      Oui
                    </Button>
                    <Button onClick={handleClose} style={{ color: "white" }}>
                      Non
                    </Button>
                  </Grid>
                </DialogActions>
              </Dialog>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              ><Tooltip title={numeral(resources.carbon)
                .format("0,000,000,000,000")
                .replaceAll(",", " ")} placement="bottom">
  
            <Typography sx={{ mr: 4 }}>{`Carbone : ${shortNumber(resources.carbon)
              }`}</Typography>
              </Tooltip>
              <Tooltip title={numeral(resources.diamond)
                .format("0,000,000,000,000")
                .replaceAll(",", " ")} placement="bottom">
  
            <Typography sx={{ mr: 4 }}>{`Diamants : ${shortNumber(resources.diamond)
              }`}</Typography>
              </Tooltip>
              <Tooltip title={numeral(resources.magic)
                .format("0,000,000,000,000")
                .replaceAll(",", " ")} placement="bottom">
  
            <Typography sx={{ mr: 4 }}>{`Magie : ${shortNumber(resources.magic)
              }`}</Typography>
              </Tooltip>
                
                
                <Typography>{`Energie : ${numeral(remainingEnergy)
                  .format("0,000,000,000,000")
                  .replaceAll(",", " ")} / ${numeral(energy)
                  .format("0,000,000,000,000")
                  .replaceAll(",", " ")}`}</Typography>
                  
              </Box>
              <Divider sx={{ borderColor: "white"}}/>
              
            </>
          )}
          <Routes>
            <Route
              path={"/login"}
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  nature={nature}
                  setNature={setNature}
                />
              }
            ></Route>
            <Route
              path={"/register"}
              element={
                <Register
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              }
            ></Route>
            {/* <Route path={"/determine-nature"} element={
          <Nature 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
          />}></Route> */}

            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <route.element
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    resources={resources}
                    setResources={setResources}
                    buildings={buildings}
                    setBuildings={setBuildings}
                    buildingsResources={buildingsResources}
                    setBuildingsResources={setBuildingsResources}
                    usedEnergy={usedEnergy}
                    setUsedEnergy={setUsedEnergy}
                    remainingEnergy={remainingEnergy}
                    setRemainingEnergy={setRemainingEnergy}
                    energy={energy}
                    setEnergy={setEnergy}
                    booster={booster}
                    setBooster={setBooster}
                    planets={planets}
                    setPlanets={setPlanets}
                    planetsMultiverse={planetsMultiverse}
                    setPlanetsMultiverse={setPlanetsMultiverse}
                    starship={starship}
                    setStarship={setStarship}
                    resourcesSearch={resourcesSearch}
                    setResourcesSearch={setResourcesSearch}
                    // resourcesNeeded={resourcesNeeded}
                    // setResourcesNeeded={setResourcesNeeded}
                    planetsDiscovered={planetsDiscovered}
                    setPlanetsDiscovered={setPlanetsDiscovered}
                    planetsNotDiscovered={planetsNotDiscovered}
                    setPlanetsNotDiscovered={setPlanetsNotDiscovered}
                    // searchLevels={searchLevels}
                    // setSearchLevels={setSearchLevels}
                    nature={nature}
                    setNature={setNature}
                    unityLink={unityLink}
                    setUnityLink={setUnityLink}
                    ticket={ticket}
                    setTicket={setTicket}
                    saveResourcesInvested={saveResourcesInvested}
                    searchBase={searchBase}
                  />
                }
              />
            ))}
          </Routes>
      <ButtonMailto label="Contactez-moi" mailto="mailto:lucie.magnonneau@gmail.com" />
      <Typography>2024 - Studio Zensaikeunde - Tous droits réservés</Typography>
        </Grid>
        {/* </Box> */}
      </Grid>
      <>
      </>
      {/* </div> */}

      {/* </BrowserRouter> */}
      </>
      {/* pour site en maintenance */}
    {/* ) : (
      <Typography>Site en maintenance</Typography>
    )} */}
    </div>
  );
}

export default App;
