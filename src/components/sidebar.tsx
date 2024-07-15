import { Box, Button, Link, Typography } from "@mui/material";
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
  pseudo: string
  handleOpen: () => Promise<void>
  lastPartUrl: string
}

const naturePlayerData: Record<NatureKey, { image: string, color: string }> = {
  'sotoc': {image: ruby, color: "#FF6961"},
  'flumia': {image: emerald, color: "#6FD984"},
  'sora': {image: gold, color: "#FFE808"},
  'nano': {image: amethyst, color: "#AA81D5"},
  'altheron': {image: sapphire, color: "#0CA4FF"},
}

const Sidebar = (props: SidebarProps) => {
  const { nature, pseudo, handleOpen, lastPartUrl } = props;

  // pour sélectionner visuellement la page où on est

  const linkStyles = (path: string) => ({
    marginBottom: "20px",
    color: "black",
    border: lastPartUrl === path ? "1px solid black" : "none",
    padding: "10px"
  });

  // console.log(lastPartUrl)

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh"  }}
    sx={{
      backgroundColor: naturePlayerData[nature].color
    }}>
      <Typography style={{ color: "black" }}>{`Joueur : ${pseudo}`}</Typography>
      <Typography style={{ color: "black" }}>{`Alignement ${names[nature]}`}</Typography>
      <Box>
        <Button sx={{ width: "200px", border: "1px black solid",
    color: "black",
    borderRadius: "10px"}} onClick={handleOpen}>Déconnexion</Button>
        </Box>
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
          // sx={{ marginBottom: "20px", color: "black" }}
          sx={linkStyles('help')}
          to="/help"
        >
          Explications
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black"  }}
          sx={linkStyles('build')}
          to="/build"
        >
          Constructions
        </Link>
        <Link component={RouterLink} underline="none" sx={linkStyles('search')} to="/search">Académie</Link>
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/boosters">Boosters</Link> */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/universe">Univers</Link> */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/multiverse">Multivers</Link> */}
        {/* !!!!!!!!!!!!!!!!!!!! attention !!!!!!!!!!!! réinitialisation n'a pas user_id dynamique */}
        {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/reinitialization">Réinitialisation</Link> */}
        <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black", border: "1px solid black", p: 2 }}
          sx={linkStyles('workshop')}
          to="/workshop"
        >
          Atelier
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black"  }}
          sx={linkStyles('shop')}
          to="/shop"
        >
          Boutique
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black"  }}
          sx={linkStyles('ranking')}
          to="/ranking"
        >
          Classement
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black"  }}
          sx={linkStyles('thanks')}
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
