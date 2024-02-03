import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import names from "../modules/names";
import amethyst from "../assets/amethyst.webp";
import ruby from "../assets/Ruby_gem.jpg";
import gold from "../assets/gold-background-montage.webp";
import sapphire from "../assets/blue-jewellery-jewel-gem-gemstone-sapphire-fashion-accessory-1088100.jpg";
import emerald from "../assets/Emerald-Stone-PNG-Image.webp";

const images = {
  'sotoc': ruby,
  'flumia': emerald,
  'sora': gold,
  'nano': amethyst,
  'altheron': sapphire,
}

const Sidebar = (props) => {
  const { nature } = props;

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "95vh" }}>
      <Typography>{`Alignement ${names[nature]}`}</Typography>
      <Box>
        <img
          src={images[nature]}
          alt="Logo alignement"
          style={{ width: "200px", height: "auto" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px" }}
          to="/help"
        >
          Explications
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px" }}
          to="/build"
        >
          Constructions
        </Link>
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/search">Recherche</Link> */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/boosters">Boosters</Link> */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/universe">Univers</Link> */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/multiverse">Multivers</Link> */}
        {/* !!!!!!!!!!!!!!!!!!!! attention !!!!!!!!!!!! réinitialisation n'a pas user_id dynamique */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/reinitialization">Réinitialisation</Link> */}
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px" }}
          to="/ranking"
        >
          Classement
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px" }}
          to="/thanks"
        >
          Remerciements
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
