import { Box, Button, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback, useState } from "react";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { planetsApi } from "../api/planets-api";
import { planetApi } from "../api/planet-api";

const Multiverse = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, planetsMultiverse, setPlanetsMultiverse } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    // console.log(buildingsResources.metal)

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources)
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

    const [pagin, setPagin] = useState(0);
    const [paginTextField, setPaginTextField] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (event, newPage) => {
        setPagin(newPage);
      };

    const handleLimitChange = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPagin(0);  // Reset to the first page when changing rows per page
    };

    // faire un système où on voit que les découvertes ou que les non découvertes, maj le count dans la pagination

    const attack = (planet, idx) => {
        // console.log(idx)
        // console.log(planets.slice(pagin * rowsPerPage, (pagin + 1) * rowsPerPage)[idx])
        // console.log(planets[idx + pagin * rowsPerPage])
        if (1000000 <= resources.deuterium) {
            // mettre is_discovered à true et le sauvegarder et mettre à jour dans la liste des planètes
            // faire le cas spécial du combat avec le boss
            // vérifier si vaisseau construit
          const resourcesTemp = {...resources}
          resourcesTemp.deuterium -= 1000000
          resourcesTemp.deuterium += planet.deuterium
          resourcesTemp.metal += planet.metal
          resourcesTemp.crystal += planet.crystal
          setResources(resourcesTemp)
          saveResources(resourcesTemp)
          const planetsTemp = [...planetsMultiverse]
          const planetAttacked = planetsMultiverse[idx + pagin * rowsPerPage]
          planetAttacked.metal = 0
          planetAttacked.crystal = 0
          planetAttacked.deuterium = 0
          planetAttacked.cost = 0
          planetsTemp[idx + pagin * rowsPerPage] = planetAttacked
          setPlanetsMultiverse(planetsTemp)
          saveResourcesPlanetsMultiverse(planetsTemp)
        }
      };
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>Multivers</Typography>   
        <Typography>{`Deutérium : ${numeral(resources.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>   
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
                                  {planet.is_discovered ? '-' : planet.name}
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
                                  {planet.is_discovered ? '-' : planet.type}
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
                                {planet.is_discovered && planet.type === 'ressources' ? '-' : planet.life_level}
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
                                {planet.is_discovered && planet.type === 'ressources' ? '-' : planet.fire_level}
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
                                {planet.is_discovered && planet.type === 'ressources' ? '-' : planet.shield_level}
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
                                {planet.is_discovered ? '-' : numeral(planet.metal).format('1,000,000,000,000').replaceAll(',', ' ')}
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
                                {planet.is_discovered ? '-' : numeral(planet.crystal).format('1,000,000,000,000').replaceAll(',', ' ')}
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
                                {planet.is_discovered ? '-' : numeral(planet.deuterium).format('1,000,000,000,000').replaceAll(',', ' ')}
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
                              <Button onClick={() => attack(planet, idx)}>
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
)}

export default Multiverse;