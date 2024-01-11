import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback, useEffect, useState } from "react";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { planetsApi } from "../api/planets-api";
import { planetApi } from "../api/planet-api";
import { useNavigate } from "react-router-dom";
import DialogFight from "../components/dialogFight";
import DialogRob from "../components/dialogRob";

const Multiverse = (props) => {
    const { resources, setResources, planetsMultiverse, setPlanetsMultiverse, starship, setStarship,
    planetsDiscovered, setPlanetsDiscovered, planetsNotDiscovered, setPlanetsNotDiscovered,
    isAuthenticated } = props
    const [results, setResults] = useState([])
    const [resultsToDisplay, setResultsToDisplay] = useState([])
    const [planetsToDisplay, setPlanetsToDisplay] = useState(planetsDiscovered)
    const [planetsNumber, setPlanetsNumber] = useState(planetsDiscovered.length)
    const [resourcesRobbed, setResourcesRobbed] = useState({metal: 0, crystal: 0, deuterium: 0})

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate(`/login`)
    }

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleResourcesRobbed = (planet, planetsDiscoveredTemp) => {
      const resourcesTemp = {...resources}
      resourcesTemp.deuterium -= 1000000
      resourcesTemp.deuterium += planet.deuterium
      resourcesTemp.metal += planet.metal
      resourcesTemp.crystal += planet.crystal
      setResources(resourcesTemp)
      saveResources(resourcesTemp)
      const planetsTemp = [...planetsMultiverse]
      // const planetAttacked = planetsMultiverse[idx + pagin * rowsPerPage]
      planetsTemp[planetsMultiverse.findIndex(element => element.id === planet.id)].metal = 0
      planetsTemp[planetsMultiverse.findIndex(element => element.id === planet.id)].crystal = 0
      planetsTemp[planetsMultiverse.findIndex(element => element.id === planet.id)].deuterium = 0
      // planetsTemp[idx + pagin * rowsPerPage] = planetAttacked
      setPlanetsMultiverse(planetsTemp)
      // const planetsDiscoveredTemp = [...planetsDiscovered]
      planetsDiscoveredTemp[0].metal = 0
      planetsDiscoveredTemp[0].crystal = 0
      planetsDiscoveredTemp[0].deuterium = 0
      setPlanetsDiscovered(planetsDiscoveredTemp)
      const resourcesRobbedTemp = {...resourcesRobbed}
      resourcesRobbedTemp.metal = planet.metal
      resourcesRobbedTemp.crystal = planet.crystal
      resourcesRobbedTemp.deuterium = planet.deuterium
      setResourcesRobbed(resourcesRobbedTemp)
      setOpenRob(true)

      // const planetsNotDiscoveredTemp = [...planetsNotDiscovered]
      // planetsNotDiscoveredTemp[0].metal = 0
      // planetsNotDiscoveredTemp[0].crystal = 0
      // planetsNotDiscoveredTemp[0].deuterium = 0
      // setPlanetsDiscovered(planetsNotDiscoveredTemp)

  };

    const getResultsAttack = useCallback(async (planet, planetsDiscoveredTemp) => {
      try {
          const dataResults = await planetsApi.getResultsAttack(planet, starship, resources)
          setResults(dataResults)
          if (dataResults[dataResults.length - 1].winner === 'Enemy'){
            const starshipTemp = {...starship}
            starshipTemp.is_built = false
            setStarship(starshipTemp)
          } else {
            handleResourcesRobbed(planet, planetsDiscoveredTemp)
          }
        } catch (err) {
          console.error(err);
      }
  }, []);

//   const getResourcesAttack = useCallback(async (planet) => {
//     try {
//         const dataResults = await planetsApi.getResourcesAttack(planet, resources)
//         setResults(dataResults)
//       } catch (err) {
//         console.error(err);
//     }
// }, []);

  const SaveDiscoveredPlanet = useCallback(async (planetId) => {
    try {
        await planetsApi.SaveDiscoveredPlanet(planetId)
      } catch (err) {
        console.error(err);
    }
}, []);

    const [pagin, setPagin] = useState(0);
    const [paginTextField, setPaginTextField] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openFight, setOpenFight] = useState(false)
    const [openRob, setOpenRob] = useState(false)
    const [type, setType] = useState('discovered')

    const handleCloseFight = () => {
      setOpenFight(false);
      setResultsToDisplay([]);
      setCounter(1);
  };

  const handleCloseRob = () => {
    setOpenRob(false);;
};

  const handleViewResults = () => {
    setOpenFight(true);
};

    const handlePageChange = (_, newPage) => {
        setPagin(newPage);
      };

    const handleLimitChange = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPagin(0);  // Reset to the first page when changing rows per page
    };

    // faire un système où on voit que les découvertes ou que les non découvertes, maj le count dans la pagination

    const fight = (planet, idx) => {
        // console.log(idx)
        // console.log(planets.slice(pagin * rowsPerPage, (pagin + 1) * rowsPerPage)[idx])
        // console.log(planetsMultiverse[idx + pagin * rowsPerPage])
        // console.log(planet)
        const planetsDiscoveredTemp = [...planetsDiscovered]
        if (1000000 <= resources.deuterium && starship.is_built) {
          if (!planet.is_discovered){
            const planetsMultiverseTemp = [...planetsMultiverse]
            // planetsMultiverseTemp[idx + pagin * rowsPerPage].is_discovered = true
            planetsMultiverseTemp[planetsMultiverse.findIndex(element => element.id === planet.id)].is_discovered = true
            setPlanetsMultiverse(planetsMultiverseTemp)
            
            // console.log(planetsDiscovered.findIndex(element => element.id === planet.id))
            // planetsDiscoveredTemp[planetsDiscovered.findIndex(element => element.id === planet.id)].is_discovered = true
            planetsDiscoveredTemp.unshift(planet)
            planetsDiscoveredTemp[0].is_discovered = true
            setPlanetsDiscovered(planetsDiscoveredTemp)
            const planetsNotDiscoveredTemp = [...planetsNotDiscovered]
            // console.log(planetsNotDiscoveredTemp.filter(element => element.id !== planet.id))
            const planetsNotDiscoveredTempUpdated = planetsNotDiscoveredTemp.filter(element => element.id !== planet.id)
            setPlanetsNotDiscovered(planetsNotDiscoveredTempUpdated)
            SaveDiscoveredPlanet(planet.id)
          }
          if (planet.type === 'ennemi' || planet.type === 'boss'){
            getResultsAttack(planet, planetsDiscoveredTemp)
            handleViewResults()
          } else {
            handleResourcesRobbed(planet, planetsDiscoveredTemp)
          }
          
        }
      };

      const [counter, setCounter] = useState(1);

      useEffect(() => {
        // getData(energyInfos);
            const timer = setInterval(() => {
                if (counter <= results.length && openFight) {
                    // setResultsToDisplay([]);
                    const tempResults = [];
                    // tempResults = [...resultsToDisplay];
                    for (let i = 0; i < counter; i++) {
                        tempResults.push(results[i]);
                    }
                    setResultsToDisplay(tempResults);
                    // counter++;
                    setCounter(counter + 1);
                }
            }, 5000);
            return () => {
                // Each time a new useEffect is executed, the previous useEffect will be cleaned up
                // This function will be called to clear the previous setInterval timer
                clearInterval(timer);
            };
        
    }, [resultsToDisplay, results, counter]);

    const handlePlanetsToDisplay = ((type) => {
      if (type === 'all'){
        setPlanetsToDisplay(planetsMultiverse)
        setPlanetsNumber(planetsMultiverse.length)
        setPagin(0)
        setType('all')
      } else if (type === 'discovered'){
        setPlanetsToDisplay(planetsDiscovered)
        setPlanetsNumber(planetsDiscovered.length)
        setPagin(0)
        setType('discovered')
      } else if (type === 'notDiscovered'){
        setPlanetsToDisplay(planetsNotDiscovered)
        setPlanetsNumber(planetsNotDiscovered.length)
        setPagin(0)
        setType('notDiscovered')
      }
    })

    useEffect(() => {
      if (type === 'all'){
        setPlanetsToDisplay(planetsMultiverse)
        setPlanetsNumber(planetsMultiverse.length)
        // setPagin(0)
      } else if (type === 'discovered'){
        setPlanetsToDisplay(planetsDiscovered)
        setPlanetsNumber(planetsDiscovered.length)
        // setPagin(0)
      } else if (type === 'notDiscovered'){
        setPlanetsToDisplay(planetsNotDiscovered)
        setPlanetsNumber(planetsNotDiscovered.length)
        // setPagin(0)
      }
    }, [planetsDiscovered])

    // useEffect(() => {
    //   console.log(resourcesRobbed)
    // }, [resourcesRobbed])

    const tableCellHeadTitles = ['Nom', 'Type', 'Vie', 'Armes', 'Bouclier', 'Métal', 'Cristal', 'Deutérium', 'Attaquer']

    const TableCellHead = ({ title }) => {
      return (
        <TableCell sx={{ p: 1 }}>
          <Typography
          //   sx={{ mx: 3 }}
            fontWeight="Bold"
            fontSize={13}
          >
            {title}
          </Typography>
        </TableCell>
      );
    };

    const tableCellRowLevels = ['life_level', 'fire_level', 'shield_level' ]
    
    const TableCellRowLevels = ({ planet, level }) => {
      return (
      <TableCell sx={{ p: 0 }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box sx={{ ml: 2 }}>
            <Typography
              fontSize={12}
            >
              {!planet.is_discovered || planet.type === 'ressources' ? '-' : planet[level]}
            </Typography>
          </Box>
          </Box>
          </TableCell>
    )}
    
    const tableCellRowResources = ['metal', 'crystal', 'deuterium']

    const TableCellRowResources = ({ planet, type }) => {
      return (
        <TableCell sx={{ p: 0 }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            // p: 1,
          }}
        >
          <Box>
            <Typography
              fontSize={12}
            >
              {!planet.is_discovered ? '-' : numeral(planet[type]).format('1,000,000,000,000').replaceAll(',', ' ')}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      )}
    
    return (
    <>
        <DialogFight 
        openFight={openFight} 
        handleCloseFight={handleCloseFight} 
        resultsToDisplay={resultsToDisplay}
        />
        <DialogRob 
        openRob={openRob} 
        handleCloseRob={handleCloseRob} 
        resourcesRobbed={resourcesRobbed}
        />
    <Box sx={{ minHeight: '600px' }}>
        <Typography sx={{ mb: 1}}>Multivers</Typography>   
        <Typography>{`Vie : ${starship.life_level} Armes : ${starship.fire_level} Bouclier : ${starship.shield_level} Vaisseau ${starship.is_built ? 'opérationnel' : 'détruit'}`}</Typography>           
        <Card>
            <TextField value={paginTextField} onChange={
                (e) => {
                    if (e.target.value !== ''){
                        setPagin(parseInt(e.target.value, 10))
                        
                    }
                    setPaginTextField(e.target.value)
                }
            }/>
            <Button onClick={() => handlePlanetsToDisplay('discovered')}>Découvertes</Button>
            <Button onClick={() => handlePlanetsToDisplay('notDiscovered')}>Non Découvertes</Button>
            <Button onClick={() => handlePlanetsToDisplay('all')}>Toutes</Button>
                <Table sx={{ minWidth: 700, minHeight: 400 }}>
                  <TableHead>
                    <TableRow>
                      {tableCellHeadTitles.map((title) => {
                        return <TableCellHead title={title} />
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planetsToDisplay.slice(pagin * rowsPerPage, (pagin + 1) * rowsPerPage).map((planet, idx) => (
                      <TableRow hover key={planet.id}>
                        <TableCell  sx={{ p: 0 }}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Box sx={{ ml: 1 }}>
                                <Typography
                                //   fontWeight="Bold"
                                  fontSize={14}
                                >
                                  {!planet.is_discovered ? '-' : planet.name}
                                </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell  sx={{ p: 0 }}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Box>
                                <Typography
                                //   fontWeight="Bold"
                                  fontSize={14}
                                >
                                  {!planet.is_discovered ? '-' : planet.type}
                                </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {tableCellRowLevels.map((level) => {
                          return <TableCellRowLevels level={level} planet={planet} />
                        })}

                        {tableCellRowResources.map((resource) => {
                          return <TableCellRowResources planet={planet} type={resource} />
                        })}
                            
                        <TableCell sx={{ p: 0 }}>
                            <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Box>
                              <Button onClick={() => fight(planet, idx)}>
                                <RocketLaunchIcon />
                              </Button>
                              
                            </Box>
                            </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              <TablePagination
                component="div"
                count={planetsNumber}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={pagin}
                labelRowsPerPage="Lignes par page :"
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
              />
        </Card>
    </Box>
    </>
)}

export default Multiverse;