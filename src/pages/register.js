import {
  Button,
  Grid,
  TextField,
  Link,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Typography,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { userApi } from "../api/user-api";
import { useCallback, useEffect, useState } from "react";
function Register(props) {
  const { setIsAuthenticated, isAuthenticated } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (isAuthenticated) {
    navigate("build/");
  }
  const verifyJWT = useCallback(async () => {
    try {
      // let verify = null
      let jwt = null;
      if (localStorage.getItem("jwt") !== null) {
        jwt = localStorage.getItem("jwt").replaceAll('"', "");
      }
      const verify = await userApi.verifyJWT(jwt);
      if (verify.msg === "Authentifié") {
        setIsAuthenticated(true);
        navigate("build/");
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    verifyJWT();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
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
            <Typography>
              Pseudo déjà utilisé. Veuillez en choisir un autre.
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Formik
        initialValues={{ pseudo: "", password: "", email: "" }}
        validationSchema={Yup.object().shape({
          pseudo: Yup.string()
            .required("Un pseudo doit être saisi")
            .min(3, "Doit faire plus de 3 caractères"),
          email: Yup.string()
            .required("Un email doit être saisi")
            .email("Doit être un email valide"),
          password: Yup.string().required("Un mot de passe doit être saisi"),
        })}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting, resetForm }
        ) => {
          try {
            // setIsAuthenticated(true)
            const jsonAnswer = await userApi.subscribe(values);
            //   const data = await apiRef.login(
            //     process.env.REACT_APP_URL + "App/Calls/login.php",
            //     values
            //   );
            //   console.log(data);
            if (jsonAnswer.msg === "Enregistré") {
              setStatus({ success: true });
              resetForm({});
              setSubmitting(false);
              navigate(`/login`);

              // toast.success("Commentaire du commercial enregistré !");
            } else if (jsonAnswer.msg === "Pseudo déjà utilisé") {
              // console.log('pseudo')
              setOpen(true);
            }
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Grid
                // item
                // xs={2}
                sx={{ mb: 1 }}
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
                  style={{ background: "white", width: "300px" }}
                />
              </Grid>
              {/* <ErrorMessage name="pseudo"></ErrorMessage> */}
              <Grid
                // item
                // xs={2}
                sx={{ mb: 1 }}
              >
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  fullWidth
                  label="Email"
                  name="email"
                  variant="filled"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  style={{ background: "white", width: "300px" }}
                />
              </Grid>
              {/* <ErrorMessage name="email"></ErrorMessage> */}
              <Grid
                // item
                // xs={2}
                sx={{ mb: 1 }}
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
                  style={{ background: "white", width: "300px" }}
                />
              </Grid>
              {/* <ErrorMessage name="password"></ErrorMessage> */}
              <Grid
                // item
                // xs={1}
                sx={{ mb: 1 }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleSubmit(); /* setDisplayDateRecall(false); setDisplayError(false); setDisplayRejection(false); */
                  }}
                >
                  S'enregistrer
                </Button>
              </Grid>
              <Grid>
                <Link
                  component={RouterLink}
                  underline="none"
                  sx={{ marginBottom: "20px" }}
                  to="/login"
                >
                  Se connecter
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Register;
