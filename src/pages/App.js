import '../css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '../modules/routes';
import Sidebar from '../components/sidebar';
import { useMounted } from '../hooks/use-mounted';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';
import { planetApi } from '../api/planet-api';
import { planetsApi } from '../api/planets-api';
import { starshipApi } from '../api/starship-api';
import Login from './login';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import numeral from 'numeral';
import { searchApi } from '../api/search-api';
import Register from './register';
import { userApi } from '../api/user-api';
// import Nature from './nature';

function App() {
  const isMounted = useMounted();
  const navigate = useNavigate();
  const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
  const [buildings, setBuildings] = useState({})
  const [usedEnergy, setUsedEnergy] = useState(0)
  const [remainingEnergy, setRemainingEnergy] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [buildingsResources, setBuildingsResources] = useState({metal: {}, crystal: {}, deuterium: {}, energy: {}})
  const [booster, setBooster] = useState({coefficient: 1, cost: 10000})
  const [planets, setPlanets] = useState([])
  const [planetsMultiverse, setPlanetsMultiverse] = useState([])
  const [starship, setStarship] = useState({is_built: false})
  const [resourcesSearch, setResourcesSearch] = useState({life: 100, fire: 50, shield: 20})
  const [resourcesNeeded, setResourcesNeeded] = useState({metal: 0, crystal: 0, deuterium: 0})
  const [planetsDiscovered, setPlanetsDiscovered] = useState([])
  const [planetsNotDiscovered, setPlanetsNotDiscovered] = useState([])
  const [searchLevels, setSearchLevels] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [emptyJWT, setEmptyJWT] = useState(true)
  const [open, setOpen] = useState(false)
  const [nature, setNature] = useState(null)
  // const [planetsDiscoveredNumber, setPlanetsDiscoveredNumber] = useState(0)

  // const tdeuterium = 40

  // console.log(Math.round(10 * tdeuterium * Math.pow(1.1, tdeuterium)))

  // let verify = null
  // if (localStorage.getItem("jwt") === null) {
  //   navigate("login/")
  // } 

  useEffect(() => {
    console.log(isAuthenticated)
    // setIsAuthenticated(true)
  }, [isAuthenticated])

  const handleClose = (() => {
    setOpen(false)
  })

  const handleOpen = (() => {
    setOpen(true)
  })

  const getPlanetDatas = useCallback(async () => {
    try {
      // let verify = null
      let jwt = null
        if (localStorage.getItem("jwt") !== null) {
            jwt = localStorage.getItem("jwt").replaceAll('"', '')
            setEmptyJWT(false)
        }
           const verify = await userApi.verifyJWT(jwt)
           if (verify.msg === 'Authentifié') {
            setIsAuthenticated(true)
            setNature(verify.nature)
           }
          //  console.log(verify)
          //  console.log(isAuthenticated)
        // } 
        let dataResources = null
          let dataBuildings = null
          let boosterCost = null
          let dataPlanets = null
          let dataPlanetsMultiverse = null
          let dataStarship = null
          let dataSearch = null
        if (verify.msg !== 'Pas de token') {

          dataResources = await planetApi.getResources(localStorage.getItem("jwt").replaceAll('"', ''))
          dataBuildings = await planetApi.getBuildings(localStorage.getItem("jwt").replaceAll('"', ''))
          boosterCost = await planetApi.getBoosterCost(dataResources.booster, localStorage.getItem("jwt").replaceAll('"', ''))
          dataPlanets = await planetsApi.getPlanetsData(localStorage.getItem("jwt").replaceAll('"', ''))
          dataPlanetsMultiverse = await planetsApi.getPlanetsMultiverseData(localStorage.getItem("jwt").replaceAll('"', ''))
          dataStarship = await starshipApi.getStarshipData(localStorage.getItem("jwt").replaceAll('"', ''))
          dataSearch = await searchApi.getSearchData(localStorage.getItem("jwt").replaceAll('"', ''))

        }
        // const dataBuildingsResources = await planetApi.getBuildingsResources()
        if (isMounted()) {
        if (verify.msg === 'Authentifié'){
          // setIsAuthenticated(true)
          setResources(dataResources);
          setBuildings(dataBuildings)
          setResourcesSearch({
            life: {'metal': dataSearch.life.metal * Math.pow(2, dataSearch.life.level - 1),
            'crystal': dataSearch.life.crystal * Math.pow(2, dataSearch.life.level - 1),
            'deuterium': dataSearch.life.deuterium * Math.pow(2, dataSearch.life.level - 1)},
            fire: {'metal': dataSearch.life.metal * Math.pow(2, dataSearch.fire.level - 1),
            'crystal': dataSearch.fire.crystal * Math.pow(2, dataSearch.fire.level - 1),
            'deuterium': dataSearch.fire.deuterium * Math.pow(2, dataSearch.fire.level - 1)},
            shield: {'metal': dataSearch.shield.metal * Math.pow(2, dataSearch.shield.level - 1),
            'crystal': dataSearch.shield.crystal * Math.pow(2, dataSearch.shield.level - 1),
            'deuterium': dataSearch.shield.deuterium * Math.pow(2, dataSearch.shield.level - 1)},
          })
          setStarship({is_built: dataStarship.is_built})
            setSearchLevels({life_level: dataSearch.life.level, fire_level: dataSearch.fire.level,
              shield_level: dataSearch.shield.level, })
          setBooster({coefficient: dataResources.booster, cost: boosterCost})
          dataPlanets.forEach((_, idx) => {
            const metal = dataPlanets[idx]['metal']
            const crystal = dataPlanets[idx]['crystal']
            const deuterium = dataPlanets[idx]['deuterium']
            dataPlanets[idx]['cost'] = Math.round((metal + crystal + deuterium) / 10)
          })
          setPlanets(dataPlanets)
          setPlanetsMultiverse(dataPlanetsMultiverse.all)
          setPlanetsDiscovered(dataPlanetsMultiverse.discovered)
          setPlanetsNotDiscovered(dataPlanetsMultiverse.not_discovered)
          // setPlanetsDiscoveredNumber(501 - dataPlanetsMultiverse.not_discovered.length)
          // console.log(dataPlanetsMultiverse.discovered)
          const buildingsResourcesTemp = {
              metal: {
                  metal: Math.round(60 * Math.pow(1.5, dataBuildings.metal - 1)),
                  crystal: Math.round(15 * Math.pow(1.5, dataBuildings.metal - 1)),
                  energy: Math.round(10 * (dataBuildings.metal) * Math.pow(1.1, dataBuildings.metal)),
                  next_energy: Math.round(10 * (dataBuildings.metal + 1) * Math.pow(1.1, (dataBuildings.metal + 1))),
                  production: 8 * dataResources.booster * Math.round(30 * dataBuildings.metal * Math.pow(1.1, dataBuildings.metal)) + 720
              },
              crystal: {
                  metal: Math.round(48 * Math.pow(1.6, dataBuildings.crystal - 1)),
                  crystal: Math.round(24 * Math.pow(1.6, dataBuildings.crystal - 1)),
                  energy: Math.round(10 * (dataBuildings.crystal) * Math.pow(1.1, dataBuildings.crystal)),
                  next_energy: Math.round(10 * (dataBuildings.crystal + 1) * Math.pow(1.1, (dataBuildings.crystal + 1))),
                  production: 8 * dataResources.booster * Math.round(20 * dataBuildings.crystal * Math.pow(1.1, dataBuildings.crystal)) + 360
              },
              deuterium: {
                  metal: Math.round(225 * Math.pow(1.5, dataBuildings.deuterium - 1)),
                  crystal: Math.round(75 * Math.pow(1.5, dataBuildings.deuterium - 1)),
                  energy: Math.round(10 * (dataBuildings.deuterium) * Math.pow(1.1, dataBuildings.deuterium)),
                  next_energy: Math.round(10 * (dataBuildings.deuterium + 1) * Math.pow(1.1, (dataBuildings.deuterium + 1))),
                  production: 8 * dataResources.booster * Math.round(10 * dataBuildings.deuterium * Math.pow(1.1, dataBuildings.deuterium))
              },
              energy: {
                  metal: Math.round(60 * Math.pow(1.5, dataBuildings.energy - 1)),
                  crystal: Math.round(15 * Math.pow(1.5, dataBuildings.energy - 1)),
                  production: Math.round(20 * dataBuildings.energy * Math.pow(1.1, dataBuildings.energy)),
                  next_production: Math.round(20 * (dataBuildings.energy + 1) * Math.pow(1.1, (dataBuildings.energy + 1)))
              },
              
          }
          
          setBuildingsResources(buildingsResourcesTemp)
          const energyMetal = Math.round(10 * (dataBuildings.metal) * Math.pow(1.1, (dataBuildings.metal)))
          const energyCrystal = Math.round(10 * (dataBuildings.crystal) * Math.pow(1.1, (dataBuildings.crystal)))
          const energyDeuterium = Math.round(10 * (dataBuildings.deuterium) * Math.pow(1.1, (dataBuildings.deuterium)))
          setUsedEnergy(energyMetal + energyCrystal + energyDeuterium)
          setRemainingEnergy(Math.round(20 * dataBuildings.energy * Math.pow(1.1, dataBuildings.energy)) - energyMetal - energyCrystal - energyDeuterium + 35 * dataResources.satellites)
          setEnergy(buildingsResourcesTemp.energy.production + 35 * dataResources.satellites)   
          setResourcesNeeded({'metal': 1000000 * dataSearch.life_level, 'crystal': 1000000 * dataSearch.fire_level,
                                'deuterium': 1000000 * dataSearch.shield_level})
                                // console.log('authentifié')
        } 
        else {
          // console.log('login')
          navigate("/login")
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
  if (isAuthenticated){
    // console.log('maj true')
    getPlanetDatas();
  }
  
}, [isAuthenticated]);

const saveResources = useCallback(async (resources) => {
  try {
      await planetApi.saveResources(resources, localStorage.getItem('jwt').replaceAll('"', ''))
  } catch (err) {
      console.error(err);
  }
}, []);

const addResources = () => {
  const resourcesTemp = {...resources}
  // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  resourcesTemp.metal += Math.round((8 * 30 * buildings.metal * Math.pow(1.1, buildings.metal) / 360) + 2) === 0 && buildings.metal > 0 ? 1 : Math.round((8 * booster.coefficient * 30 * buildings.metal * Math.pow(1.1, buildings.metal) / 360) + 2)
  resourcesTemp.crystal += Math.round((8 * 20 * buildings.crystal * Math.pow(1.1, buildings.crystal) / 360) + 1) === 0 && buildings.crystal > 0 ? 1 : Math.round((8 * booster.coefficient * 20 * buildings.crystal * Math.pow(1.1, buildings.crystal) / 360) + 1)
  resourcesTemp.deuterium += Math.round(8 * 10 * buildings.deuterium * Math.pow(1.1, buildings.deuterium) / 360) === 0 && buildings.deuterium > 0 ? 1 : Math.round(8 * booster.coefficient * 30 * buildings.deuterium * Math.pow(1.1, buildings.deuterium) / 360)
  setResources(resourcesTemp)
  saveResources(resourcesTemp)
}

const saveResourcesPlanets = useCallback(async (planets) => {
  try {
      await planetsApi.saveResourcesPlanets(planets, localStorage.getItem("jwt").replaceAll('"', ''))
  } catch (err) {
      console.error(err);
  }
}, []);

const saveResourcesPlanetsMultiverse = useCallback(async (resources) => {
  try {
      await planetsApi.saveResourcesPlanetsMultiverse(resources, localStorage.getItem("jwt").replaceAll('"', ''))
  } catch (err) {
      console.error(err);
  }
}, []);

const addResourcesPlanets = () => {
  const resourcesTemp = [...planets]
  // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  planets.forEach((_, index) => {
    resourcesTemp[index]['metal'] += 8 * Math.round(30 * resourcesTemp[index]['metal_level'] * Math.pow(1.1, resourcesTemp[index]['metal_level']) / 360)
    resourcesTemp[index]['crystal'] += 8 * Math.round(30 * resourcesTemp[index]['crystal_level'] * Math.pow(1.1, resourcesTemp[index]['crystal_level']) / 360)
    resourcesTemp[index]['deuterium'] += 8 * Math.round(30 * resourcesTemp[index]['deuterium_level'] * Math.pow(1.1, resourcesTemp[index]['deuterium_level']) / 360)
    resourcesTemp[index]['cost'] = Math.round((resourcesTemp[index]['metal'] + resourcesTemp[index]['crystal'] + resourcesTemp[index]['deuterium']) / 10)
  })
  setPlanets(resourcesTemp)
  // saveResourcesPlanets(resourcesTemp)
}

const addResourcesPlanetsMultiverse = () => {
  const resourcesTemp = [...planetsMultiverse]
  // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  planetsMultiverse.forEach((_, index) => {
    resourcesTemp[index]['metal'] += 8 * Math.round(30 * resourcesTemp[index]['metal_level'] * Math.pow(1.1, resourcesTemp[index]['metal_level']) / 60)
    resourcesTemp[index]['crystal'] += 8 * Math.round(30 * resourcesTemp[index]['crystal_level'] * Math.pow(1.1, resourcesTemp[index]['crystal_level']) / 60)
    resourcesTemp[index]['deuterium'] += 8 * Math.round(30 * resourcesTemp[index]['deuterium_level'] * Math.pow(1.1, resourcesTemp[index]['deuterium_level']) / 60)
  })
  setPlanetsMultiverse(resourcesTemp)
  // saveResourcesPlanetsMultiverse(resourcesTemp)
}

const handleDeconnection = (() => {
  localStorage.removeItem('jwt');
  // setEmptyJWT(true)
  window.location.reload()
  // setIsAuthenticated(false)
  // setOpen(false)
});

useEffect(() => {
  if (emptyJWT) {
    navigate("/login")
  }
}, [emptyJWT]);

useEffect(() => {
  // console.log(nature)
  if (nature !== null) {

    const timer = setInterval(() => {
        addResources();
        // addResourcesPlanets();
        // addResourcesPlanetsMultiverse();
    }, 10000);
    // 60000 en temps normal
    return () => {
        // Each time a new useEffect is executed, the previous useEffect will be cleaned up
        // This function will be called to clear the previous setInterval timer
        clearInterval(timer);
    };
  }
}, [resources, nature]);

  return (
    <div className="App">
      
      {/* <BrowserRouter> */}
        {/* <div style={{ display: "flex" }}> */}
          <Grid container sx={{ alignItems: "center", justifyContent: "center"}}>
          
            {isAuthenticated && nature !== null && <Grid item md={2}><Sidebar nature={nature} /></Grid>}
          <Grid item md={10}>
          {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}> */}
          {isAuthenticated && nature !== null &&  (
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
                    <Button onClick={handleDeconnection} style={{ color: "white" }}>
                        Oui
                    </Button>
                    <Button onClick={handleClose} style={{ color: "white" }}>
                        Non
                    </Button>
                  </Grid>
                </DialogActions>
                </Dialog>
              <Typography>{`Métal : ${numeral(resources.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(resources.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Deutérium : ${numeral(resources.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(remainingEnergy).format('0,000,000,000,000').replaceAll(',', ' ')} / ${numeral(energy).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
              <Button onClick={handleOpen}>Déconnexion</Button>
            </>
          )}
          <Routes>
            <Route path={"/login"} element={
            <Login 
            setIsAuthenticated={setIsAuthenticated} 
            isAuthenticated={isAuthenticated} 
            nature={nature}
            setNature={setNature}
            />}>
            </Route>
          <Route path={"/register"} element={
          <Register 
          setIsAuthenticated={setIsAuthenticated} 
          isAuthenticated={isAuthenticated} 
          />}></Route>
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
                    resourcesNeeded={resourcesNeeded}
                    setResourcesNeeded={setResourcesNeeded}
                    planetsDiscovered={planetsDiscovered}
                    setPlanetsDiscovered={setPlanetsDiscovered}
                    planetsNotDiscovered={planetsNotDiscovered}
                    setPlanetsNotDiscovered={setPlanetsNotDiscovered}
                    searchLevels={searchLevels}
                    setSearchLevels={setSearchLevels}
                    nature={nature}
                    setNature={setNature}
                  />
                }
              />
            ))}
          </Routes>
          </Grid>
          {/* </Box> */}
          </Grid>
          <Typography>2024 - Studio Zensaikeunde - Tous droits réservés</Typography>
        {/* </div> */}

      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
