import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import names from "../modules/names"

const Sidebar = (props) => {
    // const isMounted = useMounted();
    const { nature } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    // console.log(buildingsResources.metal)
    
    
    return (
      
      <Box style={{ display: 'flex', flexDirection: 'column', height: '95vh' }}>
        <Typography >{`Alignement ${names[nature]}`}</Typography>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/help">Explications</Link>
            <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/build">Constructions</Link>
            {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/search">Recherche</Link> */}
            {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/boosters">Boosters</Link> */}
            {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/universe">Univers</Link> */}
            {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/multiverse">Multivers</Link> */}
            {/* !!!!!!!!!!!!!!!!!!!! attention !!!!!!!!!!!! réinitialisation n'a pas user_id dynamique */}
            {/* <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/reinitialization">Réinitialisation</Link> */}
        </Box>
      </Box>
)}

export default Sidebar;