import { Box, Button, Card, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";

const Search = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, starshipLevels, setStarshipLevels, resourcesSearch, setResourcesSearch } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    console.log(resourcesSearch)

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const saveLevelSearch = useCallback(async (type, level) => {
        try {
            planetApi.saveLevelSearch(type, level)
            // setBooster(boosterData)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleLevelSearch = ((type, level) => {
        // on vérifie qu'il y a assez de ressources pour le niveau suivant
        if (type === 'life_level' && resources['metal'] >= resourcesSearch.life) {
            const resourcesTemp = {...resources}
            resourcesTemp.metal -= resourcesSearch.life
            const starshipLevelsTemp = {...starshipLevels}
            starshipLevelsTemp.life_level += 1
            setStarshipLevels(starshipLevelsTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('life_level', starshipLevels.life_level + 1)
        }
        if (type === 'fire_level' && resources['crystal'] >= resourcesSearch.fire) {
            const resourcesTemp = {...resources}
            resourcesTemp.crystal -= resourcesSearch.fire
            const starshipLevelsTemp = {...starshipLevels}
            starshipLevelsTemp.fire_level += 1
            setStarshipLevels(starshipLevelsTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('fire_level', starshipLevels.fire_level + 1)
        }
        if (type === 'shield_level' && resources['deuterium'] >= resourcesSearch.shield) {
            const resourcesTemp = {...resources}
            resourcesTemp.deuterium -= resourcesSearch.shield
            const starshipLevelsTemp = {...starshipLevels}
            starshipLevelsTemp.shield_level += 1
            setStarshipLevels(starshipLevelsTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('shield_level', starshipLevels.shield_level + 1)
        }
    })
    
    const addBooster = () => {
        

        // if (resources['crystal'] >= booster.cost)
        // {
        //     const resourcesTemp = {...resources}
        //     resourcesTemp.metal -= booster.cost

        //     setResources(resourcesTemp)
        //     saveResources(resourcesTemp)
        //     saveLevelBooster(booster.coefficient + 1)
        // }
        
    }
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>{`Métal : ${numeral(resources.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(resources.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Deutérium : ${numeral(resources.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>   
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Vie : ${starshipLevels.life_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.life).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Armes : ${starshipLevels.fire_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.fire).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Cristal`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Bouclier : ${starshipLevels.shield_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.shield).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Deutérium`}</Typography>
        </Card>
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
        <Card>
            <Button onClick={() => handleLevelSearch('life_level', starshipLevels.life_level)}>Vie</Button>
            <Button onClick={() => handleLevelSearch('fire_level', starshipLevels.fire_level)}>Armes</Button>
            <Button onClick={() => handleLevelSearch('shield_level', starshipLevels.shield_level)}>Bouclier</Button>
        </Card>
    </Box>
)}

export default Search;