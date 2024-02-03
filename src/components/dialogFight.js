import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import numeral from "numeral";

const DialogFight = (props) => {
  // const isMounted = useMounted();
  const { openFight, handleCloseFight, resultsToDisplay } = props;
  // const [resources, setResources] = useState({metal: 0, crystal: 0, tritium: 0, energy: 0})
  // console.log(buildingsResources.metal)

  return (
    <Dialog
      open={openFight}
      // TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseFight}
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
      <DialogTitle>Résultats du combat</DialogTitle>
      <DialogContent>
        <Grid
          container
          justifyContent="center"
          sx={{
            color: "white",
            mt: 5,
          }}
        >
          {resultsToDisplay.map((round) => (
            <>
              <Grid
                item
                xs={12}
                align="center"
                key={round.round}
                sx={{ mb: 1 }}
              >
                {!round.exploded
                  ? `Tour n° ${round.round} Pdv du vaisseau ${numeral(
                      round.life_points_starship
                    )
                      .format("0,000,000,000,000")
                      .replaceAll(",", " ")} et feu de ${numeral(
                      round.fire_starship
                    )
                      .format("0,000,000,000,000")
                      .replaceAll(",", " ")}. Le bouclier bloque ${numeral(
                      round.shield_starship
                    )
                      .format("0,000,000,000,000")
                      .replaceAll(
                        ",",
                        " "
                      )} points de dégâts. Pdv de l'ennemi ${numeral(
                      round.life_points_enemy
                    )
                      .format("0,000,000,000,000")
                      .replaceAll(",", " ")} et feu de ${numeral(
                      round.fire_enemy
                    )
                      .format("0,000,000,000,000")
                      .replaceAll(",", " ")}. Le bouclier bloque ${numeral(
                      round.shield_enemy
                    )
                      .format("0,000,000,000,000")
                      .replaceAll(",", " ")} points de dégâts.`
                  : `Le boss a explosé`}
              </Grid>
              {round.winner === "Player" && (
                <Grid
                  item
                  key="win"
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                    marginBottom: 50,
                  }}
                >
                  Combat gagné !
                  {`Vous avez gagné ${numeral(round.metal)
                    .format("0,000,000,000,000")
                    .replaceAll(",", " ")} métal, ${numeral(round.crystal)
                    .format("0,000,000,000,000")
                    .replaceAll(",", " ")} cristal, ${numeral(round.tritium)
                    .format("0,000,000,000,000")
                    .replaceAll(",", " ")} tritium`}
                </Grid>
              )}
              {round.winner === "Enemy" && (
                <Grid
                  item
                  key="lost"
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                    marginBottom: 50,
                  }}
                >
                  Combat perdu !
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFight} style={{ color: "white" }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFight;
