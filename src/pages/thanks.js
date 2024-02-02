import { Box, Button, Card, Typography, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const Thanks = () => {
    // const isMounted = useMounted();
    
    
    
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>Merci à Cthyllax pour les dessins <Link component={RouterLink} underline="none" target="_blank" to="https://www.instagram.com/cthyllax/">Son Insta</Link> <Link component={RouterLink} underline="none" target="_blank" to="https://cthyllax.com/">Son site</Link></Typography>   
        <Typography>Merci à Grégory, Laura pour son aide précieuse, Poulpy pour ses idées géniales.</Typography>   
        <Typography>Merci à tous les testeurs.</Typography>   
        
        
    </Box>
)}

export default Thanks;