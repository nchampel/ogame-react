import { Button, Grid, TextField, Typography } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
function Login(props) {
    const { setIsAuthenticated } = props
    const navigate = useNavigate();
  return (
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
            setIsAuthenticated(true)
          // const jsonAnswer = await customerApi.addCommentCommercial(
          //   customerId,
          //   user.id,
          //   values,
          //   localStorage.getItem("accessToken")
          // );
        //   const data = await apiRef.login(
        //     process.env.REACT_APP_URL + "App/Calls/login.php",
        //     values
        //   );
        //   console.log(data);
            navigate(`/`)
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
  );
}

export default Login;
