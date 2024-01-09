import { Box, Button, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback, useEffect, useState } from "react";
import { planetApi } from "../api/planet-api";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { planetsApi } from "../api/planets-api";
import { useNavigate } from "react-router-dom";
// import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, frFR } from "@mui/x-data-grid";

const Universe = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, planets, setPlanets, isAuthenticated } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    // console.log(buildingsResources.metal)

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

  const saveResourcesPlanets = useCallback(async (planets) => {
    try {
        await planetsApi.saveResourcesPlanets(planets)
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

    const attack = (planet, idx) => {
      // console.log(idx)
      // console.log(planets.slice(pagin * rowsPerPage, (pagin + 1) * rowsPerPage)[idx])
      // console.log(planets[idx + pagin * rowsPerPage])
      if (planet.cost <= resources.deuterium) {
        const resourcesTemp = {...resources}
        resourcesTemp.deuterium -= planet.cost
        resourcesTemp.deuterium += planet.deuterium
        resourcesTemp.metal += planet.metal
        resourcesTemp.crystal += planet.crystal
        setResources(resourcesTemp)
        saveResources(resourcesTemp)
        const planetsTemp = [...planets]
        const planetAttacked = planets[idx + pagin * rowsPerPage]
        planetAttacked.metal = 0
        planetAttacked.crystal = 0
        planetAttacked.deuterium = 0
        planetAttacked.cost = 0
        planetsTemp[idx + pagin * rowsPerPage] = planetAttacked
        setPlanets(planetsTemp)
        saveResourcesPlanets(planetsTemp)
      }
    };
  
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography sx={{ mb: 1}}>Planètes</Typography>
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
                          Coût
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
                    {planets.slice(pagin * rowsPerPage, (pagin + 1) * rowsPerPage).map((planet, idx) => (
                      <TableRow hover key={planet.id}>
                        <TableCell  sx={{ p: 0 }}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Box sx={{ ml: 2 }}>
                                <Typography
                                //   fontWeight="Bold"
                                  fontSize={14}
                                >
                                  {planet.name}
                                </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell sx={{ p: 0 }}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              // p: 0,
                            }}
                          >
                            <Box sx={{ ml: 1 }}>
                              <Typography
                                fontSize={12}
                              >
                                {numeral(planet.metal).format('0,000,000,000,000').replaceAll(',', ' ')}
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
                            <Box sx={{ ml: 1 }}>
                              <Typography
                                fontSize={12}
                              >
                                {numeral(planet.crystal).format('0,000,000,000,000').replaceAll(',', ' ')}
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
                            <Box sx={{ ml: 1 }}>
                              <Typography
                                fontSize={12}
                              >
                                {numeral(planet.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')}
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
                            <Box sx={{ ml: 1 }}>
                              <Typography
                                fontSize={12}
                              >
                                {numeral(planet.cost).format('0,000,000,000,000').replaceAll(',', ' ')}
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
                            <Box sx={{ ml: 1 }}>
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
                count={100}
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

export default Universe;