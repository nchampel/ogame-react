import { Button, Grid, TextField, Link } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { userApi } from "../api/user-api";
import { useCallback, useEffect } from "react";
function Register(props) {
    const { setIsAuthenticated, isAuthenticated } = props
    const navigate = useNavigate();
    if (isAuthenticated) {
      navigate("build/")
    }
    const verifyJWT = useCallback(async () => {
      try {
        // let verify = null
        let jwt = null
          if (localStorage.getItem("jwt") !== null) {
              jwt = localStorage.getItem("jwt").replaceAll('"', '')
          }
             const verify = await userApi.verifyJWT(jwt)
             if (verify === 'Authentifié') {
              setIsAuthenticated(true)
              navigate("build/")
             }
            
          } catch (err) {
              console.error(err);
          }
      }, []);

      useEffect(() => {
        verifyJWT();
      }, []);
  return (
    <>
    <Formik
      initialValues={{ pseudo: "", password: "", email: "" }}
      validationSchema={Yup.object().shape({
        pseudo: Yup.string().required("Un pseudo doit être saisi"),
        email: Yup.string().required("Un email doit être saisi"),
        password: Yup.string().required("Un mot de passe doit être saisi"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
            // setIsAuthenticated(true)
          const jsonAnswer = await userApi.subscribe(
            values
          );
        //   const data = await apiRef.login(
        //     process.env.REACT_APP_URL + "App/Calls/login.php",
        //     values
        //   );
        //   console.log(data);
        if (jsonAnswer === 'Enregistré'){
            setStatus({ success: true });
            resetForm({});
            setSubmitting(false);
            navigate(`/login`)
          
          // toast.success("Commentaire du commercial enregistré !");
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
          >
            <Grid
            // item
            // xs={2}
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
              />
            </Grid>
            {/* <ErrorMessage name="pseudo"></ErrorMessage> */}
            <Grid
            // item
            // xs={2}
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
              />
            </Grid>
            {/* <ErrorMessage name="email"></ErrorMessage> */}
            <Grid
            // item
            // xs={2}
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
              />
            </Grid>
            {/* <ErrorMessage name="password"></ErrorMessage> */}
            <Grid
            // item
            // xs={1}
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
            
          </Grid>
        </form>
      )}
    </Formik>
    <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/login">Se connecter</Link>
    </>
  );
}

export default Register;
