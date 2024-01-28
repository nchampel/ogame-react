import { Button, Grid, TextField, Link, DialogContent, DialogActions, Typography, Dialog } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { userApi } from "../api/user-api";
import { useEffect, useState } from "react";
function Login(props) {
    const { setIsAuthenticated, isAuthenticated, nature, setNature } = props
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    

    const handleClose = (() => {
      setOpen(false)
    })

    useEffect(() => {
      // console.log("Le useEffect est déclenché. isAuthenticated :", isAuthenticated);
      // console.log('nature', nature)  
      // console.log('jwt', localStorage.hasOwnProperty("jwt"))  
      if (isAuthenticated && nature !== null && nature !== undefined) {
          
          navigate('/build');
      } else if (isAuthenticated && (nature === null || nature === undefined)) {
        navigate('/determine-nature')
      }
    }, [isAuthenticated]);
  return (
    <>
    <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
        {/* <DialogTitle>Résultats du combat</DialogTitle> */}
        <DialogContent>
        <Grid
            container
            justifyContent="center"
            sx={{
                color: "white",
                mt: 5,
            }}
        >
            <Typography>Veuillez attendre quelques minutes avant de pouvoir tenter de vous connecter.</Typography>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} style={{ color: "white" }}>
                OK
            </Button>
        </DialogActions>
        </Dialog>
    <Formik
      initialValues={{ pseudo: "", password: "" }}
      validationSchema={Yup.object().shape({
        pseudo: Yup.string().required("Un pseudo doit être saisi"),
        password: Yup.string().required("Un mot de passe doit être saisi"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
            // setIsAuthenticated(true)
          const jsonAnswer = await userApi.login(
            values
          );
        // on enregistre le jwt

        if (jsonAnswer.authenticated) {
          window.localStorage.setItem('jwt', JSON.stringify(jsonAnswer.jwt));
          setIsAuthenticated(true);
          // console.log('auth')
          setNature(jsonAnswer.nature)
          // console.log(jsonAnswer.nature)
        } else if (jsonAnswer.msg === 'Trop de tentatives de connexion') {
          // console.log('Veuillez attendre quelques minutes avant de pouvoir vous connecter')
          setOpen(true)
        }
            
          setStatus({ success: true });
          resetForm({});
          setSubmitting(false);
          // toast.success("Commentaire du commercial enregistré !");
        } catch (err) {
          console.error(err);
          // toast.error("Il y a eu un souci lors de l'enregistrement !");
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid
          // container
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100vh'
          }}
          >
            <Grid
            // item
            // xs={2}
            sx={{ mb: 1}}
            >
              
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pseudo}
                fullWidth
                label="Pseudo"
                name="pseudo"
                variant="filled"
                error={Boolean(touched.pseudo && errors.pseudo)}
                helperText={touched.pseudo && errors.pseudo}
                style={{ background: 'white', width: '300px' }}
              />
            </Grid>
            <Grid
            // item
            // xs={2}
            sx={{ mb: 1}}
            >
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                fullWidth
                label="Mot de passe"
                name="password"
                type="password"
                variant="filled"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                style={{ background: 'white', width: '300px' }}
              />
            </Grid>
            <Grid
            // item
            // xs={1}
            sx={{ mb: 1}}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Se connecter
              </Button>
              
            </Grid>
            <Grid
            // item
            // xs={1}
            sx={{ mb: 1}}
            >
              <Link component={RouterLink} underline="none" to="/register">S'inscrire</Link>
            </Grid>
            {/* <ErrorMessage name="pseudo"></ErrorMessage> */}
          </Grid>
        </form>
      )}
    </Formik>
    </>
  );
}

export default Login;
