import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
function Home() {
    // const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography>Bienvenue sur Lunicité Sacrée</Typography>
        <Typography>Le but du jeu est de détruire le boss.</Typography>
        <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/build">Retour au jeu</Link>
    </Box>
  );
}

export default Home;
