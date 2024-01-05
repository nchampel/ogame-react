import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback, useEffect, useState } from "react";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { planetsApi } from "../api/planets-api";
import { planetApi } from "../api/planet-api";

const Multiverse = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, planetsMultiverse, setPlanetsMultiverse, starship } = props
    const [results, setResults] = useState([])
    const [resultsToDisplay, setResultsToDisplay] = useState([])

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getResultsAttack = useCallback(async (planet) => {
      try {
          const dataResults = await planetsApi.getResultsAttack(planet, starship, resources)
          setResults(dataResults)
        } catch (err) {
          console.error(err);
      }
  }, []);

  const getResourcesAttack = useCallback(async (planet) => {
    try {
        const dataResults = await planetsApi.getResourcesAttack(planet, resources)
        setResults(dataResults)
      } catch (err) {
        console.error(err);
    }
}, []);

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
    const [open, setOpen] = useState(false)

    const handleClose = () => {
      setOpen(false);
      setResultsToDisplay([]);
      setCounter(1);
  };

  const handleViewResults = () => {
    setOpen(true);
};

    const handlePageChange = (event, newPage) => {
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
        console.log(planetsMultiverse[idx + pagin * rowsPerPage])
        // console.log(planet)
        if (1000000 <= resources.deuterium && starship.is_built) {
          if (planet.type === 'ennemi' || planet.type === 'boss'){
            getResultsAttack(planet)
            handleViewResults()
          } else {
            getResourcesAttack(planet)
          }
          const planetsMultiverseTemp = [...planetsMultiverse]
          planetsMultiverseTemp[idx + pagin * rowsPerPage].is_discovered = true
          setPlanetsMultiverse(planetsMultiverseTemp)
          SaveDiscoveredPlanet(planet.id)
         
            // faire le cas spécial du combat avec le boss => si - 50% 20 % de chance qu'il explose etc.
          const resourcesTemp = {...resources}
          resourcesTemp.deuterium -= 1000000
          resourcesTemp.deuterium += planet.deuterium
          resourcesTemp.metal += planet.metal
          resourcesTemp.crystal += planet.crystal
          setResources(resourcesTemp)
          saveResources(resourcesTemp)
          const planetsTemp = [...planetsMultiverse]
          // const planetAttacked = planetsMultiverse[idx + pagin * rowsPerPage]
          planetsTemp[idx + pagin * rowsPerPage].metal = 0
          planetsTemp[idx + pagin * rowsPerPage].crystal = 0
          planetsTemp[idx + pagin * rowsPerPage].deuterium = 0
          // planetsTemp[idx + pagin * rowsPerPage] = planetAttacked
          setPlanetsMultiverse(planetsTemp)
        }
      };

      const [counter, setCounter] = useState(1);

      useEffect(() => {
        // getData(energyInfos);
            const timer = setInterval(() => {
                if (counter <= results.length && open) {
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
    
    return (
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
        <DialogTitle>Résultats du combat</DialogTitle>
        <DialogContent>
        <Grid
                        container
                        justifyContent="center"
                        sx={{
                            color: "white",
                            mt: 5,
                        }}
                    >
                {resultsToDisplay.map((round) => (
                    <>
                    <Grid
                        item
                        xs={12}
                        align="center"
                        key={round.round}
                        sx={{ mb: 1 }}
                    >{!round.exploded ? `Tour n° ${round.round} Pdv du vaisseau ${round.life_points_starship} et feu de ${round.fire_starship}. Le bouclier bloque ${round.shield_starship} points de dégâts. Pdv de l'ennemi ${round.life_points_enemy} et feu de ${round.fire_enemy}. Le bouclier bloque ${round.shield_enemy} points de dégâts.` : `Le boss a explosé`}</Grid>
                    {round.winner === "Player" && (
                        <Grid
                            item
                            key="win"
                            style={{
                                fontSize: 20,
                                marginTop: 50,
                                marginBottom: 50,
                            }}
                        >
                            Combat gagné !
                        </Grid>
                    )}
                    {round.winner === "Enemy" && (
                        <Grid
                            item
                            key="lost"
                            style={{
                                fontSize: 20,
                                marginTop: 50,
                                marginBottom: 50,
                            }}
                        >
                            Combat perdu !
                        </Grid>
                    )}
                </>
                ))}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} style={{ color: "white" }}>
                OK
            </Button>
        </DialogActions>
        </Dialog>
    <Box sx={{ minHeight: '600px' }}>
        <Typography sx={{ mb: 1}}>Multivers</Typography>   
        <Typography>{`Deutérium : ${numeral(resources.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')} Vie : ${starship.life_level} Armes : ${starship.fire_level} Bouclier : ${starship.shield_level}`}</Typography>   
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>   
        <Button onClick={() => addBooster(1)}>Acheter booster</Button> */}
        
        <Card>
            <TextField value={paginTextField} onChange={
                (e) => {
                    if (e.target.value !== ''){
                        setPagin(parseInt(e.target.value, 10))
                        
                    }
                    setPaginTextField(e.target.value)
                }
            }/>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Nom
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Type
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Vie
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Armes
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Bouclier
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Métal
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Cristal
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Deutérium
                        </Typography>
                      </TableCell>
                      
                      <TableCell sx={{ p: 1 }}>
                        <Typography
                        //   sx={{ mx: 3 }}
                          fontWeight="Bold"
                          fontSize={13}
                        >
                          Attaquer
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planetsMultiverse.slice(pagin * rowsPerPage, (pagin + 1) * rowsPerPage).map((planet, idx) => (
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

                        <TableCell sx={{ p: 0 }}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              // p: 1,
                            }}
                          >
                            <Box sx={{ ml: 2 }}>
                              <Typography
                                fontSize={12}
                              >
                                {!planet.is_discovered || planet.type === 'ressources' ? '-' : planet.life_level}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
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
                                {!planet.is_discovered || planet.type === 'ressources' ? '-' : planet.fire_level}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
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
                                {!planet.is_discovered || planet.type === 'ressources' ? '-' : planet.shield_level}
                              </Typography>
                            </Box>
                            </Box>
                            </TableCell>

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
                                {!planet.is_discovered ? '-' : numeral(planet.metal).format('1,000,000,000,000').replaceAll(',', ' ')}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ p: 0 }}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Box>
                              <Typography
                                fontSize={12}
                              >
                                {!planet.is_discovered ? '-' : numeral(planet.crystal).format('1,000,000,000,000').replaceAll(',', ' ')}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
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
                                {!planet.is_discovered ? '-' : numeral(planet.deuterium).format('1,000,000,000,000').replaceAll(',', ' ')}
                              </Typography>
                            </Box>
                            </Box>
                            </TableCell>
                            
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
                count={501}
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