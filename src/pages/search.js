import { Box, Button, Card, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";
import { starshipApi } from "../api/starship-api";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, starship, setStarship, resourcesSearch, setResourcesSearch, resourcesNeeded,
    setResourcesNeeded, isAuthenticated } = props

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

    const saveLevelSearch = useCallback(async (type, level) => {
        try {
            planetApi.saveLevelSearch(type, level)
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
            const starshipTemp = {...starship}
            starshipTemp.life_level += 1
            setStarship(starshipTemp)
            const resourcesSearchTemp = {...resourcesSearch}
            resourcesSearchTemp.life = 100 * Math.pow(2, starshipTemp.life_level - 1)
            setResourcesSearch(resourcesSearchTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('life_level', starship.life_level + 1)

            const resourcesNeededTemp = {...resourcesNeeded}
            resourcesNeededTemp.metal = 1000000 * (starship.life_level + 1)
            setResourcesNeeded(resourcesNeededTemp)
        }
        if (type === 'fire_level' && resources['crystal'] >= resourcesSearch.fire) {
            const resourcesTemp = {...resources}
            resourcesTemp.crystal -= resourcesSearch.fire
            const starshipTemp = {...starship}
            starshipTemp.fire_level += 1
            setStarship(starshipTemp)
            const resourcesSearchTemp = {...resourcesSearch}
            resourcesSearchTemp.fire = 50 * Math.pow(2, starshipTemp.fire_level - 1)
            setResourcesSearch(resourcesSearchTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('fire_level', starship.fire_level + 1)

            const resourcesNeededTemp = {...resourcesNeeded}
            resourcesNeededTemp.crystal = 1000000 * (starship.fire_level + 1)
            setResourcesNeeded(resourcesNeededTemp)
        }
        if (type === 'shield_level' && resources['deuterium'] >= resourcesSearch.shield) {
            const resourcesTemp = {...resources}
            resourcesTemp.deuterium -= resourcesSearch.shield
            const starshipTemp = {...starship}
            starshipTemp.shield_level += 1
            setStarship(starshipTemp)
            const resourcesSearchTemp = {...resourcesSearch}
            resourcesSearchTemp.shield = 20 * Math.pow(2, starshipTemp.shield_level - 1)
            setResourcesSearch(resourcesSearchTemp)

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelSearch('shield_level', starship.shield_level + 1)

            const resourcesNeededTemp = {...resourcesNeeded}
            resourcesNeededTemp.deuterium = 1000000 * (starship.shield_level + 1)
            setResourcesNeeded(resourcesNeededTemp)
        }
    })

    const buildStarship = useCallback(async () => {
        try {
            await starshipApi.buildStarship()
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

      const SearchCard = ({ title, type }) => {
        return (
          <Card sx={{ marginTop: '15px' }}>
            {/* <Typography>{`${title} : ${buildings[type]}`}</Typography>
            <Typography>{`${numeral(buildingsResources[type]['production']).format('0,000,000,000,000').replaceAll(',', ' ')} /h`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources[type]['metal']).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources[type]['crystal']).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(buildingsResources[type]['next_energy'] - buildingsResources[type]['energy']).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
            <Button onClick={() => addLevel(type, buildings[type])}>
              Construire
            </Button> */}
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
            <Typography>{`Vie : ${starship.life_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.life).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Armes : ${starship.fire_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.fire).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Cristal`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Bouclier : ${starship.shield_level}`}</Typography>
            <Typography>{`${numeral(resourcesSearch.shield).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')} Deutérium`}</Typography>
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