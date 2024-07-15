import { Box, Typography, Link } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import CustomLink from "../UI/CustomLink";

interface HomeProps {
  isAuthenticated: boolean
}

function Home(props: HomeProps) {
  const { isAuthenticated } = props
  // const navigate = useNavigate();
  return (
    <>
    {isAuthenticated ? (
    <Box sx={{ minHeight: "590px", pl: 2, pr: 2 }}>
      <Typography sx={{ marginBottom: "20px" }}>Bienvenue sur Lunicité Sacrée</Typography>
      {/* <Typography style={{ textAlign: "left" }}>
        Il y a des centaines d'années, sur une planète harmonieuse, vivait
        Nissyan, un grand érudit. Son savoir et sa sagacité étaient connus de
        tous. Les personnes vivant avec lui profitaient des bienfaits de ses
        découvertes. Les jours paisibles se succédaient les uns après les
        autres.
      </Typography>
      <Typography style={{ textAlign: "left" }}>
        Un jour, un groupe d'êtres cupides se sont emparés de ses connaissances
        et les utilisèrent pour asservir la faune et la flore en semant le chaos
        et la destruction. Aveuglés par leur soif de pouvoir insatiable, ils
        finirent par se dresser les uns contre les autres et une guerre
        innommable déchira les liens qui unissaient les créatures du monde. De
        nouvelles cicatrices se rajoutaient sur les anciennes chaque jour et
        (l'intégrité du monde fut menacée.) le monde fut à la limite de
        l'explosion.
      </Typography>
      <Typography style={{ textAlign: "left" }}>
        Pour éviter une annihilation totale, le sage, dans son infinie
        prévoyance, a séparé celui-ci en 6 parties : les 5 lunite et un petit
        astre : le royaume de Nissyan. L'intensité des combats diminua, et le
        danger fut écarté.
      </Typography>
      <Typography style={{ textAlign: "left" }}>
        A présent, un danger encore plus effrayant, apparu du fin fond de la
        galaxie, approche.
      </Typography>
      <Typography style={{ textAlign: "left" }}>
        Cette fois-ci un immense dôme protecteur englobant le système stellaire
        entier, imaginé par Nissyan lui-même, est actuellement en construction
        pour protéger l'humanité contre ce péril. Cependant, pour fonctionner,
        les luniante, peuple prospérant sur chaque luni, doivent oublier leur
        lourd passé et agir de concert pour s'immuniser totalement contre tous
        ces dangers.
      </Typography>
      <Typography style={{ textAlign: "left" }}>
        Il fallait pour cela rétablir l'équilibre, et préserver l'unicité sacrée
        ...
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Le but du jeu est de construire le bouclier avant l'arrivée du fléau.
      </Typography> */}
      
      <Typography sx={{ marginBottom: "20px" }}>
        Vos ressources augmentent avec le temps, que vous soyiez connecté ou non. Lors de paliers (1 000, 10 000, 100 000 etc.) vous obtenez un succès qui vous donne 10% de la quantité atteinte (100, 1 000, 10 000 etc.).
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        1 k ={'>'} 1 000, 1 M ={'>'} 1 000 000, 1 Md ={'>'} 1 000 000 000 .
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Pour augmenter votre productivité, vous pouvez augmenter le niveau du synthétiseur, de la raffinerie et de l'extracteur dans l'onglet Constructions.
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Le but du jeu provisoire est de construire le dôme protecteur. Pour cela la recherche Bouclier niveau 20 est requise.
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Chaque jour de connexion vous obtenez des Lien-Unités pour faire des achats à la boutique. Il faut visiter la boutique pour réclamer cette récompense, onglet Boutique.
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Pour un certain nombre d'achats de recette de production vous débloquez le niveau suivant. 1H donne une heure de production, 2H 2 heures, 1J 1 jour, 2J 2 jours et enfin 1S 1 semaine.
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        L'onglet académie est utilisé pour effectuer les recherches.
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Un récapitulatif des succès remportés est à venir. Le calcul des points sera revu également.
      </Typography>
      <CustomLink
        component={RouterLink}
        underline="none"
        sx={{ marginBottom: "20px" }}
        to="/build"
      >
        Retour au jeu
      </CustomLink>
    </Box>
  ) : (
    <>
      <Typography>Il faut être connecté</Typography>
      <Link
        component={RouterLink}
        underline="none"
        sx={{ marginBottom: "20px" }}
        to="/login"
      >
        Se connecter
      </Link>
    </>
  )}
  </>
  );
}

export default Home;
