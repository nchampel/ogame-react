import { Box, Button, Card, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";
import { starshipApi } from "../api/starship-api";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, starship, setStarship, resourcesSearch, setResourcesSearch, resourcesNeeded,
    setResourcesNeeded, isAuthenticated, searchLevels, setSearchLevels } = props

    // const navigate = useNavigate();

    // if (!isAuthenticated) {
    //     navigate(`/login`)
    // }

    console.log(searchLevels)

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources, localStorage.getItem("jwt").replaceAll('"', ''))
        } catch (err) {
            console.error(err);
        }
    }, []);

    const saveLevelSearch = useCallback(async (type, level) => {
        try {
            planetApi.saveLevelSearch(type, level, localStorage.getItem("jwt").replaceAll('"', ''))
            // setBooster(boosterData)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleLevelSearch = ((type) => {
        // on vérifie qu'il y a assez de ressources pour le niveau suivant
        if (type === 'life_level' && resources['metal'] >= resourcesSearch.life) {
            const resourcesTemp = {...resources}
            resourcesTemp.metal -= resourcesSearch.life
            const searchesTemp = {...searchLevels}
            searchesTemp.life_level += 1
            setSearchLevels(searchesTemp)
            const resourcesSearchTemp = {...resourcesSearch}
            resourcesSearchTemp.life = 100 * Math.pow(2, searchesTemp.life_level - 1)
            setResourcesSearch(resourcesSearchTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('life', searchLevels.life_level + 1)

            const resourcesNeededTemp = {...resourcesNeeded}
            resourcesNeededTemp.metal = 1000000 * (starship.life_level + 1)
            setResourcesNeeded(resourcesNeededTemp)
        }
        if (type === 'fire_level' && resources['crystal'] >= resourcesSearch.fire) {
            const resourcesTemp = {...resources}
            resourcesTemp.crystal -= resourcesSearch.fire
            const searchesTemp = {...searchLevels}
            searchesTemp.fire_level += 1
            setSearchLevels(searchesTemp)
            const resourcesSearchTemp = {...resourcesSearch}
            resourcesSearchTemp.fire = 50 * Math.pow(2, searchesTemp.fire_level - 1)
            setResourcesSearch(resourcesSearchTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('fire', searchLevels.fire_level + 1)

            const resourcesNeededTemp = {...resourcesNeeded}
            resourcesNeededTemp.crystal = 1000000 * (starship.fire_level + 1)
            setResourcesNeeded(resourcesNeededTemp)
        }
        if (type === 'shield_level' && resources['deuterium'] >= resourcesSearch.shield) {
            const resourcesTemp = {...resources}
            resourcesTemp.deuterium -= resourcesSearch.shield
            const searchesTemp = {...starship}
            searchesTemp.shield_level += 1
            setSearchLevels(searchesTemp)
            const resourcesSearchTemp = {...resourcesSearch}
            resourcesSearchTemp.shield = 20 * Math.pow(2, searchesTemp.shield_level - 1)
            setResourcesSearch(resourcesSearchTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('shield', starship.shield_level + 1)

            const resourcesNeededTemp = {...resourcesNeeded}
            resourcesNeededTemp.deuterium = 1000000 * (searchLevels.shield_level + 1)
            setResourcesNeeded(resourcesNeededTemp)
        }
    })

    const buildStarship = useCallback(async () => {
        try {
            await starshipApi.buildStarship(localStorage.getItem("jwt").replaceAll('"', ''))
        } catch (err) {
            console.error(err);
        }
      }, []);

      const handleBuildStarship = (resourcesNeeded) => {

            if (!starship.is_built && resourcesNeeded['metal'] <= resources.metal && resourcesNeeded['crystal'] <= resources.crystal && resourcesNeeded['deuterium'] <= resources.deuterium) {
                const starshipTemp = {...starship}
                starshipTemp.is_built = true;
                setStarship(starshipTemp)
                const resourcesTemp = {...resources}
                resourcesTemp.metal -= resourcesNeeded['metal']
                resourcesTemp.crystal -= resourcesNeeded['crystal']
                resourcesTemp.deuterium -= resourcesNeeded['deuterium']
                setResources(resourcesTemp)
                buildStarship()
            }
      }

      const searchCards = [{name: 'Vie', typeLevel: 'life_level', }]

      const SearchCard = ({ search, type }) => {
        return (
            <Card sx={{
                marginBottom: '15px',
                marginTop: '15px'
                }}>
                    <Typography>{`${search.name} : ${searchLevels[search.typeLevel]}`}</Typography>
                    <Typography>{`${numeral(resourcesSearch[type]['metal']).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>
                </Card>
        );
      };

    return (
    <Box sx={{ minHeight: '600px' }}>
        {/* <Typography>{`Métal : ${numeral(resources.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(resources.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Deutérium : ${numeral(resources.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>    */}
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Vie : ${searchLevels.life_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.life.metal).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Armes : ${searchLevels.fire_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.fire.crystal).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Cristal`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Bouclier : ${searchLevels.shield_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.shield.deuterium).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Deutérium`}</Typography>
        </Card>
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Button onClick={() => handleLevelSearch('life_level')}>Vie</Button>
            <Button onClick={() => handleLevelSearch('fire_level')}>Armes</Button>
            <Button onClick={() => handleLevelSearch('shield_level')}>Bouclier</Button>
        </Card>
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Typography>
                {starship.is_built ? 'Vaisseau en attente' : 'Pas de vaisseau'}
            </Typography>
            <Typography>{`Métal : ${numeral(resourcesNeeded.metal).format('1,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(resourcesNeeded.crystal).format('1,000,000,000,000').replaceAll(',', ' ')} Deutérium : ${numeral(resourcesNeeded.deuterium).format('1,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
            {starship.life_level >= 1 && starship.fire_level >= 1 && starship.shield_level >= 1 && (<Button onClick={() => handleBuildStarship(resourcesNeeded)}>Construire vaisseau</Button>)}
        </Card>
    </Box>
)}

export default Search;