import { Box, Button, Card, Typography } from "@mui/material";
import numeral from 'numeral';
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";

const Reinitialization = () => {
    // const isMounted = useMounted();
    // const { resources, setResources, starshipLevels, setStarshipLevels, resourcesSearch, setResourcesSearch } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    // console.log(buildingsResources.metal)

    

    const reinitialization = useCallback(async () => {
        try {
            await planetApi.reinitialization(2)
            // setBooster(boosterData)
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>Attention au user_id !</Typography>   
        
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
        <Card>
            <Button onClick={() => reinitialization()}>Réinitialiser</Button>
        </Card>
    </Box>
)}

export default Reinitialization;