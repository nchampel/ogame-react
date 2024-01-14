import { Button, Grid, TextField, Link } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { userApi } from "../api/user-api";
import { useEffect, useState } from "react";
function Login(props) {
    const { setIsAuthenticated, isAuthenticated } = props
    const navigate = useNavigate();
    // const [waitJWT, setWaitJWT] = useState(true)
    // const history = useHistory();

    // useEffect(() => {
    //   console.log('t')
    //   if(!waitJWT){
    //     navigate(`/build`) 
    //   }
      
    // },[waitJWT])

    // useEffect(() => {
    //   console.log('use')
    //   if (isAuthenticated) {
    //     navigate("/build");
    //   }
    // }, [isAuthenticated]);

    // useEffect(() => {
    //   const redirectAfterAuthentication = async () => {
    //     if (isAuthenticated) {
    //       console.log(isAuthenticated)
    //       // navigate('/build');
    //     }
    //   };
  
    //   redirectAfterAuthentication();
    // }, [isAuthenticated, navigate]);
    useEffect(() => {
      console.log("Le useEffect est déclenché. isAuthenticated :", isAuthenticated);
        if (isAuthenticated) {
          // console.log(isAuthenticated)
          navigate('/build');
        }
    }, [isAuthenticated]);
  return (
    <>
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
        //   const data = await apiRef.login(
        //     process.env.REACT_APP_URL + "App/Calls/login.php",
        //     values
        //   );
        //   console.log(data);
        // on enregistre le jwt

        if (jsonAnswer.authenticated) {
          window.localStorage.setItem('jwt', JSON.stringify(jsonAnswer.jwt));
          setIsAuthenticated(true);
        }
        
        // if (jsonAnswer.authenticated){
        //   window.localStorage.setItem('jwt', JSON.stringify(jsonAnswer.jwt));
        //   // setIsAuthenticated(true)
        //   await new Promise(resolve => {
        //     setIsAuthenticated(true);
        //     navigate('/build');
        //     resolve();
        //   });
          
          // setWaitJWT(false)
        //   let jwt = null
        // if (localStorage.getItem("jwt") !== null) {
        //     jwt = localStorage.getItem("jwt").replaceAll('"', '')
        // }
        //    const verify = await userApi.verifyJWT(jwt)
        //    console.log(verify)
        // setTimeout(() => {
        //     navigate(`/build`);
        //   }, 2000);
          // navigate(`/build`)
        // }
            
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
          >
            <Grid
            // item
            // xs={2}
            >
              {/* <Autocomplete
                    options={qualificationLabel}
                    onChange={(e, value) => {
                      handleChangeQualification(value);
                      setFieldValue(
                        "choiceQualification",
                        value !== null ? value : choiceQualification
                      );
                    }}
                    // onChange={handleChangeQualification}
                    value={values.choiceQualification}
                    renderInput={(params) => (
                      
                    )}
                  /> */}
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
                Se connecter
              </Button>
            </Grid>
            {/* <ErrorMessage name="pseudo"></ErrorMessage> */}
          </Grid>
        </form>
      )}
    </Formik>
    <Link component={RouterLink} underline="none" sx={{ marginBottom: '20px' }} to="/register">S'inscrire</Link>
    </>
  );
}

export default Login;
