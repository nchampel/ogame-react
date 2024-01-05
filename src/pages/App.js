import '../css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '../modules/routes';
import Sidebar from '../components/sidebar';
import { useMounted } from '../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { planetApi } from '../api/planet-api';
import { planetsApi } from '../api/planets-api';

function App() {
  const isMounted = useMounted();
  const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
  const [buildings, setBuildings] = useState({})
  const [usedEnergy, setUsedEnergy] = useState(0)
  const [remainingEnergy, setRemainingEnergy] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [buildingsResources, setBuildingsResources] = useState({metal: {}, crystal: {}, deuterium: {}, energy: {}})
  const [booster, setBooster] = useState({coefficient: 1, cost: 10000})
  const [planets, setPlanets] = useState([])
  const [planetsMultiverse, setPlanetsMultiverse] = useState([])
  const [starshipLevels, setStarshipLevels] = useState({life_level: 1, fire_level: 1, shield_level: 1})
  const [resourcesSearch, setResourcesSearch] = useState({life: 100, fire: 50, shield: 20})

  // const tdeuterium = 40

  // console.log(Math.round(10 * tdeuterium * Math.pow(1.1, tdeuterium)))

  const getPlanetDatas = useCallback(async () => {
    try {
        const dataResources = await planetApi.getResources()
        const dataBuildings = await planetApi.getBuildings()
        const boosterCost = await planetApi.getBoosterCost(dataBuildings.booster)
        const dataPlanets = await planetsApi.getPlanetsData()
        const dataPlanetsMultiverse = await planetsApi.getPlanetsMultiverseData()
        console.log(dataPlanetsMultiverse)
        // const dataBuildingsResources = await planetApi.getBuildingsResources()
        if (isMounted()) {
        setResources(dataResources);
        setBuildings(dataBuildings)
        setResourcesSearch({life: 100 * Math.pow(2, dataBuildings.life_level - 1),
          fire: 50 * Math.pow(2, dataBuildings.fire_level - 1),
          shield: 20 * Math.pow(2, dataBuildings.shield_level - 1),
        })
        setStarshipLevels({life_level: dataBuildings.life_level, fire_level: dataBuildings.fire_level,
          shield_level: dataBuildings.shield_level})
        setBooster({coefficient: dataBuildings.booster, cost: boosterCost})
        dataPlanets.forEach((planet, idx) => {
          const metal = dataPlanets[idx]['metal']
          const crystal = dataPlanets[idx]['crystal']
          const deuterium = dataPlanets[idx]['deuterium']
          dataPlanets[idx]['cost'] = Math.round((metal + crystal + deuterium) / 10)
        })
        setPlanets(dataPlanets)
        setPlanetsMultiverse(dataPlanetsMultiverse)
        const buildingsResourcesTemp = {
            metal: {
                metal: Math.round(60 * Math.pow(1.5, dataBuildings.metal - 1)),
                crystal: Math.round(15 * Math.pow(1.5, dataBuildings.metal - 1)),
                energy: Math.round(10 * (dataBuildings.metal) * Math.pow(1.1, dataBuildings.metal)),
                next_energy: Math.round(10 * (dataBuildings.metal + 1) * Math.pow(1.1, (dataBuildings.metal + 1))),
                production: dataBuildings.booster * Math.round(30 * dataBuildings.metal * Math.pow(1.1, dataBuildings.metal))
            },
            crystal: {
                metal: Math.round(48 * Math.pow(1.6, dataBuildings.crystal - 1)),
                crystal: Math.round(24 * Math.pow(1.6, dataBuildings.crystal - 1)),
                energy: Math.round(10 * (dataBuildings.crystal) * Math.pow(1.1, dataBuildings.crystal)),
                next_energy: Math.round(10 * (dataBuildings.crystal + 1) * Math.pow(1.1, (dataBuildings.crystal + 1))),
                production: dataBuildings.booster * Math.round(20 * dataBuildings.crystal * Math.pow(1.1, dataBuildings.crystal))
            },
            deuterium: {
                metal: Math.round(225 * Math.pow(1.5, dataBuildings.deuterium - 1)),
                crystal: Math.round(75 * Math.pow(1.5, dataBuildings.deuterium - 1)),
                energy: Math.round(10 * (dataBuildings.deuterium) * Math.pow(1.1, dataBuildings.deuterium)),
                next_energy: Math.round(20 * (dataBuildings.deuterium + 1) * Math.pow(1.1, (dataBuildings.deuterium + 1))),
                production: dataBuildings.booster * Math.round(10 * dataBuildings.deuterium * Math.pow(1.1, dataBuildings.deuterium))
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
        const energyDeuterium = Math.round(20 * (dataBuildings.deuterium) * Math.pow(1.1, (dataBuildings.deuterium)))
        setUsedEnergy(energyMetal + energyCrystal + energyDeuterium)
        setRemainingEnergy(Math.round(20 * dataBuildings.energy * Math.pow(1.1, dataBuildings.energy)) - energyMetal - energyCrystal - energyDeuterium + 50 * dataResources.satellites)
        setEnergy(buildingsResourcesTemp.energy.production + 50 * dataResources.satellites)    
    }
    } catch (err) {
        console.error(err);
    }
}, [isMounted]);

useEffect(() => {
  getPlanetDatas();
}, []);

const saveResources = useCallback(async (resources) => {
  try {
      await planetApi.saveResources(resources)
  } catch (err) {
      console.error(err);
  }
}, []);

const addResources = () => {
  const resourcesTemp = {...resources}
  // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  resourcesTemp.metal += Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60) === 0 && buildings.metal > 0 ? 1 : booster.coefficient * Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60)
  resourcesTemp.crystal += Math.round(20 * buildings.crystal * Math.pow(1.1, buildings.crystal) / 60) === 0 && buildings.crystal > 0 ? 1 : booster.coefficient * Math.round(30 * buildings.crystal * Math.pow(1.1, buildings.crystal) / 60)
  resourcesTemp.deuterium += Math.round(10 * buildings.deuterium * Math.pow(1.1, buildings.deuterium) / 60) === 0 && buildings.deuterium > 0 ? 1 : booster.coefficient * Math.round(30 * buildings.deuterium * Math.pow(1.1, buildings.deuterium) / 60)
  setResources(resourcesTemp)
  saveResources(resourcesTemp)
}

const saveResourcesPlanets = useCallback(async (planets) => {
  try {
      await planetsApi.saveResourcesPlanets(planets)
  } catch (err) {
      console.error(err);
  }
}, []);

const saveResourcesPlanetsMultiverse = useCallback(async (resources) => {
  try {
      await planetsApi.saveResourcesPlanetsMultiverse(resources)
  } catch (err) {
      console.error(err);
  }
}, []);

const addResourcesPlanets = () => {
  const resourcesTemp = [...planets]
  // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  planets.forEach((planet, index) => {
    resourcesTemp[index]['metal'] += Math.round(30 * resourcesTemp[index]['metal_level'] * Math.pow(1.1, resourcesTemp[index]['metal_level']) / 60)
    resourcesTemp[index]['crystal'] += Math.round(30 * resourcesTemp[index]['crystal_level'] * Math.pow(1.1, resourcesTemp[index]['crystal_level']) / 60)
    resourcesTemp[index]['deuterium'] += Math.round(30 * resourcesTemp[index]['deuterium_level'] * Math.pow(1.1, resourcesTemp[index]['deuterium_level']) / 60)
    resourcesTemp[index]['cost'] = Math.round((resourcesTemp[index]['metal'] + resourcesTemp[index]['crystal'] + resourcesTemp[index]['deuterium']) / 10)
  })
  setPlanets(resourcesTemp)
  saveResourcesPlanets(resourcesTemp)
}

const addResourcesPlanetsMultiverse = () => {
  const resourcesTemp = [...planetsMultiverse]
  // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
  planets.forEach((planet, index) => {
    resourcesTemp[index]['metal'] += Math.round(30 * resourcesTemp[index]['metal_level'] * Math.pow(1.1, resourcesTemp[index]['metal_level']) / 60)
    resourcesTemp[index]['crystal'] += Math.round(30 * resourcesTemp[index]['crystal_level'] * Math.pow(1.1, resourcesTemp[index]['crystal_level']) / 60)
    resourcesTemp[index]['deuterium'] += Math.round(30 * resourcesTemp[index]['deuterium_level'] * Math.pow(1.1, resourcesTemp[index]['deuterium_level']) / 60)
  })
  setPlanetsMultiverse(resourcesTemp)
  // saveResourcesPlanetsMultiverse(resourcesTemp)
}



useEffect(() => {
  const timer = setInterval(() => {
      addResources();
      addResourcesPlanets();
      addResourcesPlanetsMultiverse();
  }, 60000);
  // 60000 en temps normal
  return () => {
      // Each time a new useEffect is executed, the previous useEffect will be cleaned up
      // This function will be called to clear the previous setInterval timer
      clearInterval(timer);
  };
}, [resources]);

  return (
    <div className="App">
      
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Routes>
          {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <route.element
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
                    starshipLevels={starshipLevels}
                    setStarshipLevels={setStarshipLevels}
                    resourcesSearch={resourcesSearch}
                    setResourcesSearch={setResourcesSearch}
                  />
                }
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
