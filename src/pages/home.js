import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
function Home() {
    // const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '600px', p: 2 }}>
        <Typography>Bienvenue sur Lunicité Sacrée</Typography>
        <Typography style={{ textAlign: 'left'}}>Il y a des centaines d'années, sur une planète harmonieuse, vivait Nissyan, un grand érudit. Son savoir et sa sagacité étaient connus de tous. Les personnes vivant avec lui profitaient des bienfaits de ses découvertes. Les jours paisibles se succédaient les uns après les autres.</Typography>
        <Typography style={{ textAlign: 'left'}}>Un jour, un groupe d'êtres cupides se sont emparés de ses connaissances et les utilisèrent pour asservir la faune et la flore en semant le chaos et la destruction. Aveuglés par leur soif de pouvoir insatiable, ils finirent par se dresser les uns contre les autres et une guerre innommable déchira les liens qui unissaient les créatures du monde. De nouvelles cicatrices se rajoutaient sur les anciennes chaque jour et (l'intégrité du monde fut menacée.) le monde fut à la limite de l'explosion.</Typography>
        <Typography style={{ textAlign: 'left'}}>Pour éviter une annihilation totale, le sage, dans son infinie prévoyance, a séparé celui-ci en 6 parties : les 5 lunite et un petit astre : le royaume de Nissyan. L'intensité des combats diminua, et le danger fut écarté.</Typography>
        <Typography style={{ textAlign: 'left'}}>A présent, un danger encore plus effrayant, apparu du fin fond de la galaxie, approche.</Typography>
        <Typography style={{ textAlign: 'left'}}>Cette fois-ci un immense dôme protecteur englobant le système stellaire entier, imaginé par Nissyan lui-même, est actuellement en construction pour protéger l'humanité contre ce péril. Cependant, pour fonctionner, les luniante, peuple prospérant sur chaque luni, doivent oublier leur lourd passé et agir de concert pour s'immuniser totalement contre tous ces dangers.</Typography>
        <Typography style={{ textAlign: 'left'}}>Il fallait pour cela rétablir l'équilibre, et préserver l'unicité sacrée ...</Typography>
        <Typography>Le but du jeu est de construire le bouclier avant l'arrivée du fléau.</Typography>
        <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/build">Retour au jeu</Link>
    </Box>
  );
}

export default Home;
