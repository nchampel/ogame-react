import { Box, Button, Card, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";

const Search = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, starshipLevels, setStarshipLevels } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    // console.log(buildingsResources.metal)

    const saveResources = useCallback(async (resources) => {
        try {
            await planetApi.saveResources(resources)
        } catch (err) {
            console.error(err);
        }
    }, []);

    const saveLevelSearch = useCallback(async (type, level) => {
        try {
            const boosterData = await planetApi.saveLevelSearch(type, level)
            // setBooster(boosterData)
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    const addBooster = () => {
        // on vérifie qu'il y a assez de cristal pour le niveau suivant

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
        <Typography>{`Cristal : ${numeral(resources.crystal).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>   
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Vie : ${starshipLevels.life_level}`}</Typography>
            <Typography>{`${numeral(100).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Armes : ${starshipLevels.fire_level}`}</Typography>
            <Typography>{`${numeral(100).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Bouclier : ${starshipLevels.shield_level}`}</Typography>
            <Typography>{`${numeral(100).format('0,000,000,000,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
        <Card>
            <Button onClick={() => addBooster()}>Vie</Button>
            <Button onClick={() => addBooster()}>Armes</Button>
            <Button onClick={() => addBooster()}>Bouclier</Button>
        </Card>
    </Box>
)}

export default Search;