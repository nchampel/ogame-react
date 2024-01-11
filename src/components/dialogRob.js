import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import numeral from 'numeral';

const DialogRob = (props) => {
    // const isMounted = useMounted();
    const { openRob, handleCloseRob, resourcesRobbed } = props
    // const [resources, setResources] = useState({metal: 0, crystal: 0, deuterium: 0, energy: 0})
    // console.log(buildingsResources.metal)
    
    
    return (
        <Dialog
        open={openRob}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseRob}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="xl"
        PaperProps={{
            style: {
                backgroundColor: "#434A54",
                color: "white",
            },
        }}
        >
        <DialogTitle>Résultats</DialogTitle>
        <DialogContent>
        
          <Typography>
              {`Vous avez gagné ${numeral(resourcesRobbed.metal).format('0,000,000,000,000').replaceAll(',', ' ')} métal, ${numeral(resourcesRobbed.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} cristal, ${numeral(resourcesRobbed.deuterium).format('0,000,000,000,000').replaceAll(',', ' ')} deutérium`}
          </Typography>
                    
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseRob} style={{ color: "white" }}>
                OK
            </Button>
        </DialogActions>
        </Dialog>
)}

export default DialogRob;