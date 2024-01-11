import { Box, Button, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";
import { useNavigate } from "react-router-dom";

const Boosters = (props) => {
    // const isMounted = useMounted();
    const { resources, setResources, booster, setBooster, isAuthenticated } = props
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

    const saveLevelBooster = useCallback(async (level) => {
        try {
            const boosterData = await planetApi.saveLevelBooster(level)
            setBooster(boosterData)
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    const addBooster = () => {
        // on vérifie qu'il y a assez de métal pour le boost suivant

        if (resources['metal'] >= booster.cost)
        {
            const resourcesTemp = {...resources}
            resourcesTemp.metal -= booster.cost

            setResources(resourcesTemp)
            saveResources(resourcesTemp)
            saveLevelBooster(booster.coefficient + 1)
        }
        
    }
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        {/* <Typography>{`Métal : ${numeral(resources.metal).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>    */}
        <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>   
        <Button onClick={() => addBooster()}>Acheter booster</Button>
    </Box>
)}

export default Boosters;