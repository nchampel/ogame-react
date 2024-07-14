import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CustomLink from "../UI/CustomLink";

interface ThanksProps {
  isAuthenticated: boolean
}

const Thanks = (props: ThanksProps) => {
  // const isMounted = useMounted();
  const { isAuthenticated } = props

  return (
    <>
    {isAuthenticated ? (
    
    <Box sx={{ minHeight: "590px" }}>
      {/* <Typography sx={{ marginBottom: "10px" }}>
        Merci à Cthyllax pour les dessins{" "}
        <CustomLink
          component={RouterLink}
          underline="none"
          target="_blank"
          to="https://www.instagram.com/cthyllax/"
        >
          Son Insta
        </CustomLink>{" "}
        <CustomLink
          component={RouterLink}
          underline="none"
          target="_blank"
          to="https://cthyllax.com/"
        >
          Son site
        </CustomLink>
      </Typography> */}
      <Typography>
        Merci à Grégory, Laura pour son aide précieuse, Poulpy pour ses idées
        géniales, Antonella pour son soutien moral.
      </Typography>
      <Typography>Merci à tous les testeurs.</Typography>
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
};

export default Thanks;
