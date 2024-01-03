import {
    Box,
    Button,
    Card,
    Typography
  } from '@mui/material';
import { useCallback, useEffect } from 'react';
import numeral from 'numeral';
import { planetApi } from '../api/planet-api';
import Buildings from '../components/buildings';

const Dashboard = (props) => {
    const { resources, setResources, buildings, setBuildings, usedEnergy, setUsedEnergy,
        remainingEnergy, setRemainingEnergy, energy, setEnergy, buildingsResources, setBuildingsResources,
    booster, planets, setPlanets} = props

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const saveLevel = useCallback(async (type, level) => {
        try {
            await planetApi.saveLevel(type, level)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const addLevel = (type, level) => {
        // on vérifie que les ressources nécessaires sont là
        // console.log(buildingsResources[type]['energy'])
        if (resources['metal'] >= buildingsResources[type]['metal'] &&
            resources['crystal'] >= buildingsResources[type]['crystal'] &&
            ((type !== 'energy' && remainingEnergy >= buildingsResources[type]['next_energy'] - buildingsResources[type]['energy']) ||
            type === 'energy'))
        {
            const resourcesTemp = {...resources}
            resourcesTemp.metal = resources.metal - buildingsResources[type]['metal']
            resourcesTemp.crystal = resources.crystal - buildingsResources[type]['crystal']
            // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
            setResources(resourcesTemp)
            if (type === 'energy') {
                setRemainingEnergy(buildingsResources[type]['next_production'] - usedEnergy)
                setEnergy(buildingsResources[type]['next_production'])
            } else {
                setRemainingEnergy(remainingEnergy - buildingsResources[type]['next_energy'])
            }
            saveResources(resourcesTemp)
            saveLevel(type, level + 1)
            const buildingsTemp = {...buildings}
            buildingsTemp[type] = level + 1
            setBuildings(buildingsTemp)
        }
        
    }

    useEffect(() => {
        const buildingsResourcesTemp = {
            metal: {
                metal: Math.round(60 * Math.pow(1.5, buildings.metal - 1)),
                crystal: Math.round(15 * Math.pow(1.5, buildings.metal - 1)),
                energy: Math.round(10 * (buildings.metal) * Math.pow(1.1, buildings.metal)),
                next_energy: Math.round(10 * (buildings.metal + 1) * Math.pow(1.1, (buildings.metal + 1))),
                production: booster.coefficient * Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal))
            },
            crystal: {
                metal: Math.round(48 * Math.pow(1.6, buildings.crystal - 1)),
                crystal: Math.round(24 * Math.pow(1.6, buildings.crystal - 1)),
                energy: Math.round(10 * (buildings.crystal) * Math.pow(1.1, buildings.crystal)),
                next_energy: Math.round(10 * (buildings.crystal + 1) * Math.pow(1.1, (buildings.crystal + 1))),
                production: booster.coefficient * Math.round(20 * buildings.crystal * Math.pow(1.1, buildings.crystal))
            },
            deuterium: {
                metal: Math.round(225 * Math.pow(1.5, buildings.deuterium - 1)),
                crystal: Math.round(75 * Math.pow(1.5, buildings.deuterium - 1)),
                energy: Math.round(10 * (buildings.deuterium) * Math.pow(1.1, buildings.deuterium)),
                next_energy: Math.round(20 * (buildings.deuterium + 1) * Math.pow(1.1, (buildings.deuterium + 1))),
                production: booster.coefficient * Math.round(10 * buildings.deuterium * Math.pow(1.1, buildings.deuterium))
            },
            energy: {
                metal: Math.round(60 * Math.pow(1.5, buildings.energy - 1)),
                crystal: Math.round(15 * Math.pow(1.5, buildings.energy - 1)),
                production: Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)),
                next_production: Math.round(20 * (buildings.energy + 1) * Math.pow(1.1, (buildings.energy + 1)))
            },
            
        }
        setBuildingsResources(buildingsResourcesTemp)
        const energyMetal = Math.round(10 * (buildings.metal) * Math.pow(1.1, (buildings.metal)))
        const energyCrystal = Math.round(10 * (buildings.crystal) * Math.pow(1.1, (buildings.crystal)))
        const energyDeuterium = Math.round(20 * (buildings.deuterium) * Math.pow(1.1, (buildings.deuterium)))
        // console.log(energyMetal)
        // console.log(energyCrystal)
        // console.log(energyDeuterium)
        setUsedEnergy(energyMetal + energyCrystal + energyDeuterium)
        setRemainingEnergy(Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)) - energyMetal - energyCrystal - energyDeuterium + resources.satellites * 50)
        // console.log(Math.round(20 * buildings.energy * Math.pow(1.1, buildings.energy)))
    }, [buildings]);

    const addResourcesHours = (hours) => {
        // on calcule les ressources cumulées pendant l'absence sur la planète
        const resourcesToAdd = {
            metal: buildingsResources.metal.production * hours,
            crystal: buildingsResources.crystal.production * hours,
            deuterium: buildingsResources.deuterium.production * hours,
        }
        const resourcesTemp = {...resources}
        resourcesTemp.metal += resourcesToAdd.metal
        resourcesTemp.crystal += resourcesToAdd.crystal
        resourcesTemp.deuterium += resourcesToAdd.deuterium
        
        saveResources(resourcesTemp)
        setResources(resourcesTemp)

        // on calcule les ressources cumulées pendant l'absence sur les planètes
        const resourcesPlanetsTemp = [...planets]
        resourcesPlanetsTemp.forEach((planet, index) => {
            resourcesPlanetsTemp[index]['metal'] = Math.round(30 * resourcesPlanetsTemp[index]['metal_level'] * Math.pow(1.1, resourcesPlanetsTemp[index]['metal_level'])) * hours
            resourcesPlanetsTemp[index]['crystal'] = Math.round(30 * resourcesPlanetsTemp[index]['crystal_level'] * Math.pow(1.1, resourcesPlanetsTemp[index]['crystal_level'])) * hours
            resourcesPlanetsTemp[index]['deuterium'] = Math.round(30 * resourcesPlanetsTemp[index]['deuterium_level'] * Math.pow(1.1, resourcesPlanetsTemp[index]['deuterium_level'])) * hours
            resourcesPlanetsTemp[index]['cost'] = Math.round((resourcesPlanetsTemp[index]['metal'] + resourcesPlanetsTemp[index]['crystal'] + resourcesPlanetsTemp[index]['deuterium']) / 10)
        })
        
        
        // saveResources(resourcesPlanetsTemp) à implémenter
        setPlanets(resourcesPlanetsTemp)
    }

    const buildSatellites = (number) => {
        // on vérifie que les ressources nécessaires sont là
        // console.log(buildingsResources[type]['energy'])
        if (buildings.shield_level >= 4 &&
            resources['crystal'] >= number * 2000 &&
            resources['deuterium'] >= number * 500)
        {
            const resourcesTemp = {...resources}
            resourcesTemp.deuterium = resources.deuterium - number * 500
            resourcesTemp.crystal = resources.crystal - number * 2000
            resourcesTemp.satellites = resources.satellites + number

            // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
            setResources(resourcesTemp)
            
            setRemainingEnergy(remainingEnergy + 50 * number)
            setEnergy(energy + 50 * number)

            saveResources(resourcesTemp)
        }
        
    }

    //   useEffect(() => {
    //     console.log(resources);
    //   }, [resources]);
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>Bienvenue</Typography>
        <Typography>{`Métal : ${numeral(resources.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(resources.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Deutérium : ${numeral(resources.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(remainingEnergy).format('0,000,000,000,000').replaceAll(',', ' ')} / ${numeral(energy).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        <Buildings buildingsResources={buildingsResources} buildings={buildings} />
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Button onClick={() => addLevel('metal', buildings.metal)}>
                Métal
            </Button>
            <Button onClick={() => addLevel('crystal', buildings.crystal)}>
                Cristal
            </Button>
            <Button onClick={() => addLevel('deuterium', buildings.deuterium)}>
                Deutérium
            </Button>
            <Button onClick={() => addLevel('energy', buildings.energy)}>
                Centrale solaire
            </Button>
        </Card>
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Button onClick={() => addResourcesHours(1)}>1 h</Button>
            <Button onClick={() => addResourcesHours(5)}>5 h</Button>
            <Button onClick={() => addResourcesHours(10)}>10 h</Button>
            <Button onClick={() => addResourcesHours(24)}>24 h</Button>
            <Button onClick={() => addResourcesHours(48)}>48 h</Button>
        </Card>
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                <Typography>Créer</Typography>
                <Box>
                    <Button onClick={() => buildSatellites(10)}>10 satellites</Button>
                    <Button onClick={() => buildSatellites(100)}>100 satellites</Button>
                    <Button onClick={() => buildSatellites(1000)}>1000 satellites</Button>
                </Box>
            </Box>
        </Card>
    </Box>
)}

export default Dashboard;