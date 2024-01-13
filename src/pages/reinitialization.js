import { Box, Button, Card, Typography } from "@mui/material";
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";
import { useNavigate } from "react-router-dom";

const Reinitialization = (props) => {
    // const isMounted = useMounted();
    const { isAuthenticated } = props
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate(`/login`)
    }

    

    const reinitialization = useCallback(async () => {
        try {
            await planetApi.reinitialization(2)
            // setBooster(boosterData)
            // mettre toutes les données réinitilisées dans les useState
            navigate(`/`)
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>Attention ! La réinitialisation du compte est irréversible !</Typography>   
        
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
        <Card>
            <Button onClick={() => reinitialization()}>Réinitialiser</Button>
        </Card>
    </Box>
)}

export default Reinitialization;