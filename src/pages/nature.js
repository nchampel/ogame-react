import { Autocomplete, Box, Button, Card, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userApi } from "../api/user-api";
import names from "../modules/names"

const Nature = (props) => {
    // const isMounted = useMounted();
    const { setNature } = props
    const navigate = useNavigate();

    // if (!isAuthenticated) {
    //     navigate(`/login`)
    // }

    // useEffect(() => {
    //   console.log(isAuthenticated)
    // }, [isAuthenticated])

    

    // const reinitialization = useCallback(async () => {
    //     try {
    //         await planetApi.reinitialization(2, localStorage.getItem("jwt").replaceAll('"', ''))
    //         // setBooster(boosterData)
    //         // mettre toutes les données réinitilisées dans les useState
    //         navigate(`/`)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);
    
    const [openQuestions, setOpenQuestions] = useState(true)
    const [openChoiceBGZ, setOpenChoiceBGZ] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [choices, setChoices] = useState([]);
    const steps = ['Question 1', 'Question 2', 'Question 3', 'Question 4'];
    

    const handleCloseQuestions = (() => {
      setOpenQuestions(false)
    })
    const handleCloseChoice = (() => {
      setOpenChoiceBGZ(false)
    })

    const handleOpen = (() => {
        setOpenQuestions(true)
      })

      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };

      const initialValuesQuestions = {
        question1: null,
        question2: null,
        question3: null,
        question4: null,
      };

      const validationSchemaQuestions = Yup
    .object()
    .shape({
      question1: Yup.string().required(),
      question2: Yup.string().required(),
      question3: Yup.string().required(),
      question4: Yup.string().required()
    });
      const initialValuesChoiceBGZ = {
        choice: null,
      };

      const validationSchemaChoiceBGZ = Yup
    .object()
    .shape({
      choice: Yup.string().required(),
    });

    const question1Data = [
        {value: 'rb', label: "Vous le caressez"},
        {value: "eb", label: "Vous ne fixez pas son regard"},
        {value: "ob", label: "Vous lui donnez à manger"},
        {value: "ab", label: "Vous utilisez un amuse-chat"},
        {value: "sb", label: "Vous l'ignorez"},
    ]
    const question2Data = [
        {value: 'rb', label: "Vous lui demandez pourquoi elle pleure"},
        {value: 'rm', label: "Vous vous moquez d'elle"},
        {value: "eb", label: "Vous lui envoyez un sourire compatissant"},
        {value: "em", label: "Vous vous éloignez"},
        {value: "ob", label: "Vous lui donnez un mouchoir"},
        {value: "om", label: "Vous la prenez dans vos bras"},
        {value: "ab", label: "Vous faites une blague"},
        {value: "am", label: "Vous baragouinez quelque chose d'inintéressant"},
        {value: "sb", label: "Vous demandez votre chemin"},
        {value: "sm", label: "Vous l'ignorez"},
    ]
    const question3Data = [
        {value: 'rb', label: "Vous acceptez de l'entendre, et lui confiez un de vos secrets en retour"}, 
        {value: 'rm', label: "Vous lui dites de garder son secret, que vous en avez rien à faire"},
        {value: "eb", label: "Vous l'écoutez sans l'interrompre"},
        {value: "em", label: "Vous l'arrêtez, vous ne savez pas garder un secret"},
        {value: "om", label: "Vous vous mettez en mode psychologue"},
        {value: "ab", label: "Vous lui promettez de l'emporter dans la tombe"},
        {value: "am", label: "Vous dites oui, et écoutez à peine"},
        {value: "sb", label: "Vous l'écoutez en sachant que cela vous laissera de marbre"},
        {value: "sm", label: "Vous l'interrompez et lui parlez d'un de vos secrets à la place"},
    ]
    const question4Data = [
        {value: 'rb', label: "Vous gardez la tête haute, mais vous êtes détruit intérieurement"}, 
        {value: 'rm', label: "Vous l'insultez de tous les noms"},
        {value: "eb", label: "Vous vous serez la main bons amis"},
        {value: "em", label: "Vous n'osez prononcer un mot de peur de tout perdre"},
        {value: "ob", label: "Vous reconnaissez vos torts"},
        {value: "om", label: "Vous proposez de changer totalement pour correspondre à ses envies afin de sauver votre couple"},
        {value: "ab", label: "Vous lui proposez de devenir sex-friends"},
        {value: "am", label: "Vous refusez la situation et vous vous enfermez dans votre bulle"},
        {value: "sb", label: "Vous ne dites rien car être célibataire vous convient autant que d'être en couple"},
        {value: "sm", label: "Vous ne réagissez pas et attendez la suite des événements"},
    ]

    function compareRandom() {
      return Math.random() - 0.5;
  }
  
  question1Data.sort(compareRandom);
  question2Data.sort(compareRandom);
  question3Data.sort(compareRandom);
  question4Data.sort(compareRandom);

    const FormControlLabelQuestion = ({ data }) => {
        return (
            <FormControlLabel
            value={data.value}
            control={<Radio />}
            label={data.label}
            // onClick={() => setDisplayCustom(false)}
            // checked
            />
        );
      };

    
    const descriptions = 
        {'sora': 'Peuple altruiste avec tendance à l\'abnégation',
        'nano': 'Tribu ingénieuse mais autiste',
        'altheron': 'Civilisation non violente à la limite du stoïcisme',
        'sotoc': 'La confrérie des braves au summum de l\'arrogance',
        'flumia': 'La communauté des respectueux craintifs'}

    const [isFocused, setIsFocused] = useState(false);
    return (
    // <Box sx={{ minHeight: '600px' }}>
    //     <Typography>Attention ! La réinitialisation du compte est irréversible !</Typography>   
        
    //     {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
    //     <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
    //     <Card>
    //         <Button onClick={() => reinitialization()}>Réinitialiser</Button>
    //     </Card>
    // </Box>
    <>
    <Box sx={{ minHeight: '600px' }}>
      <Dialog
    open={openQuestions}
    // TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseQuestions}
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
      
    <Formik
            initialValues={initialValuesQuestions}
            // enableReinitialize
            validationSchema={validationSchemaQuestions}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                // console.log(values)
                const nature = await userApi.determineNature(values, localStorage.getItem("jwt").replaceAll('"', ''));
                if (typeof(nature.bgz) === 'object') {
                    setOpenQuestions(false)
                    setOpenChoiceBGZ(true)
                    const choices = nature.bgz.map(obj => Object.keys(obj)[0]);
                    setChoices(choices)
                    // console.log('choix')
                } else {
                    setStatus({ success: true });
                    setSubmitting(false);
                    // console.log(nature.bgz)
                    setNature(nature.bgz)
                    // setIsAuthenticated(true)
                    navigate('/build/')
                    
                }
                

              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <form
                onSubmit={handleSubmit}
                
              >
                
                <Stepper
                  activeStep={activeStep}
                  sx={{ mb: 2 }}
                >
                  {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step
                        key={label}
                        {...stepProps}
                      >
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {activeStep === 0 && (
                        <FormControl>
                            <Typography  sx={{ textAlign: 'center', fontSize: 18}}>Vous voyez un bébé chat.</Typography>
                            <Box sx={{
                display: 'flex',
                flexDirection: 'column',}}>
                        <RadioGroup
                          // row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={{value: 'rb', label: "Vous le caressez"}}
                          name="question1"
                          value={values.question1}
                          onChange={(_, value) => {
                            setFieldValue(
                              'question1', value
                            );
                          }}
                        >
                            {question1Data.map((data) => {
                                return <FormControlLabelQuestion key={data.value} data={data} />
                            })}
                        </RadioGroup>
                            </Box>
                      </FormControl>
                    )}
                    {activeStep === 1 && (
                      <FormControl>
                      <Typography  sx={{ textAlign: 'left', fontSize: 18, width: "400px"}}>Vous êtes en retard pour un rendez-vous. En cherchant quelqu'un à qui demander votre route, vous voyez une fille qui pleure.</Typography>
                      <Box sx={{
          display: 'flex',
          flexDirection: 'column',}}>
                        <RadioGroup
                          // row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="rb"
                          name="question2"
                          value={values.question2}
                          onChange={(_, value) => {
                            setFieldValue(
                              'question2', value
                            );
                          }}
                        >
                          {question2Data.map((data) => {
                                return <FormControlLabelQuestion key={data.value} data={data} />
                            })}
                        </RadioGroup>
                            </Box>
                      </FormControl>
                      
                    )}
                    {activeStep === 2 && (
                    <FormControl>
                            <Typography  sx={{ textAlign: 'center', fontSize: 18}}>Votre ami veut vous confier un lourd secret le concernant.</Typography>
                        <RadioGroup
                          // row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="rb"
                          name="question3"
                          value={values.question3}
                          onChange={(_, value) => {
                            setFieldValue(
                              'question3', value
                            );
                          }}
                        >
                          <Box sx={{
              display: 'flex',
              flexDirection: 'column',}}>
                            {question3Data.map((data) => {
                                return <FormControlLabelQuestion key={data.value} data={data} />
                            })}
                            </Box>
                        </RadioGroup>
                      </FormControl>
                    )}
                    {activeStep === 3 && (
                    <FormControl>
                        <Typography sx={{ textAlign: 'center', fontSize: 18}}>Votre moitié veut rompre avec vous.</Typography>
                            
                        <RadioGroup
                          // row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="rb"
                          name="question4"
                          value={values.question4}
                          onChange={(_, value) => {
                            setFieldValue(
                              'question4', value
                            );
                          }}
                        >
                          <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',}}>
                            {question4Data.map((data) => {
                                return <FormControlLabelQuestion key={data.value} data={data} />
                            })}
                            </Box>
                        </RadioGroup>
                        
                      </FormControl>
                    )}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Précédent
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep !== 3 ? (
                      <Button onClick={handleNext}>
                        {/* {activeStep === steps.length - 2 ? 'Passer au récapitulatif' : 'Suivant'} */}
                        Suivant
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        Enregistrer
                      </Button>
                    )}
                    
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
    </DialogContent>
    {/* <DialogActions>
        <Button onClick={handleCloseQuestions} style={{ color: "white" }}>
            OK
        </Button>
    </DialogActions> */}
    </Dialog>
    <Dialog
    open={openChoiceBGZ}
    // TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseChoice}
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
    <Formik
            initialValues={initialValuesChoiceBGZ}
            // enableReinitialize
            validationSchema={validationSchemaChoiceBGZ}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                // console.log(values)
                await userApi.saveNature(values, localStorage.getItem("jwt").replaceAll('"', ''));
                
                // console.log('build BGZ')
                
                setStatus({ success: true });
                setSubmitting(false);
                // setIsAuthenticated(true)
                console.log(values.choice)
                setNature(values.choice)
                navigate('/build/')

              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <form
                onSubmit={handleSubmit}
              >
                  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Autocomplete
                        // pour réinitialiser le autocomplete on lui change la valeur de sa key, quand on change de formation, cela réinitialise le champ
                        // key={valueIdSession}
                        getOptionLabel={(option) => `${names[option]} : ${descriptions[option]}`}
                        options={choices}
                        onChange={(_, value) => {
                          setFieldValue(
                            'choice',
                            value !== null ? value : null
                          );
                        }}
                        
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // fullWidth
                            
                            label="Choisir un alignement BGZ"
                            name="choice"
                            variant="outlined"
                            // style={{ background: 'white' }}
                            InputLabelProps={{ style: { color: isFocused ? '#1976d2' : 'white',   }, shrink: true }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            sx={{
                                width: "600px",
                                input: { color: 'white'},
                                "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                                  "& > fieldset": {
                                    color: "white", 
                                  }
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                  },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2"
                                  },
                                  "& .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":{
                                    color: isFocused ? '#1976d2' : 'white'
                                  },
                                  "& .css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":{
                                    color: isFocused ? '#1976d2' : 'white'
                                  },
                                  "& .css-113ntv0-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":{
                                    color: isFocused ? '#1976d2' : 'white'
                                  },
                            }}
                          />
                        )}
                      />
                    </Box>
                    {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || values.choice === null}
                      >
                        Enregistrer
                      </Button>
                    </Box>
                    
                
              </form>
            )}
          </Formik>
    </DialogContent>
    {/* <DialogActions>
        <Button onClick={handleCloseChoice} style={{ color: "white" }}>
            OK
        </Button>
    </DialogActions> */}
    </Dialog>
    <Typography>Répondez aux questions pour déterminer votre alignement Benguelzen (BGZ)</Typography>
    <Button onClick={handleOpen} style={{ color: "white" }}>
            Répondre
        </Button>
      </Box>
    </>
    
)}

export default Nature;