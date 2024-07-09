import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import names from "../modules/names";
import amethyst from "../assets/amethyst.webp";
import ruby from "../assets/Ruby_gem.jpg";
import gold from "../assets/gold-background-montage.webp";
import sapphire from "../assets/blue-jewellery-jewel-gem-gemstone-sapphire-fashion-accessory-1088100.jpg";
import emerald from "../assets/Emerald-Stone-PNG-Image.webp";
import { NatureKey } from "../types/general-types";

interface SidebarProps {
  nature: NatureKey;
}

const naturePlayerData: Record<NatureKey, { image: string, color: string }> = {
  'sotoc': {image: ruby, color: "#FF6961"},
  'flumia': {image: emerald, color: "#6FD984"},
  'sora': {image: gold, color: "#FFE808"},
  'nano': {image: amethyst, color: "#AA81D5"},
  'altheron': {image: sapphire, color: "#0CA4FF"},
}

const Sidebar = (props: SidebarProps) => {
  const { nature } = props;

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh"  }}
    sx={{
      backgroundColor: naturePlayerData[nature].color
    }}>
      
      <Typography style={{ color: "black" }}>{`Alignement ${names[nature]}`}</Typography>
      <Box>
        <img
          src={naturePlayerData[nature].image}
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
          sx={{ marginBottom: "20px", color: "black" }}
          to="/help"
        >
          Explications
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px", color: "black"  }}
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
          sx={{ marginBottom: "20px", color: "black"  }}
          to="/shop"
        >
          Boutique
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px", color: "black"  }}
          to="/ranking"
        >
          Classement
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px", color: "black"  }}
          to="/thanks"
        >
          Remerciements
        </Link>
        {/* <Link
          component={RouterLink}
          underline="none"
          sx={{ marginBottom: "20px", color: "black"  }}
          to="/thanks"
        >
          Contact
        </Link> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
