import { Box, Typography, Link, Button } from "@mui/material";
import { useCallback } from "react";
import { planetApi } from "../api/planet-api";
import { Link as RouterLink } from "react-router-dom";
import { checkLocalStorage } from "../modules/functions";
import { Resources } from "../types/app-types";
import { ResourcesSearch } from "../types/search-types";
import { workShopApi } from "../api/workshop-api";
import numeral from "numeral";
import toast from "react-hot-toast";

interface WorkShopProps {
    isAuthenticated: boolean
    remainingEnergy: number
    setRemainingEnergy: React.Dispatch<React.SetStateAction<number>>
    energy: number
    setEnergy: React.Dispatch<React.SetStateAction<number>>
    resourcesSearch: ResourcesSearch;
    setResourcesSearch: React.Dispatch<React.SetStateAction<ResourcesSearch>>
    resources: Resources
    setResources: React.Dispatch<React.SetStateAction<Resources>>
    saveResourcesInvested: (resources: number) => Promise<void>
  }

const WorkShop = (props: WorkShopProps) => {
  const {
    resources,
    setResources,
    isAuthenticated,
    resourcesSearch,
    remainingEnergy,
    setRemainingEnergy,
    energy,
    setEnergy,
    saveResourcesInvested
  } = props;

  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //     navigate(`/login`)
  // }

  // useEffect(() => {
  //     console.log(isAuthenticated)
  //     setIsAuthenticated(true)
  //   }, [isAuthenticated])

  const saveResources = useCallback(async (resources: Resources) => {
    try {
      await planetApi.saveResources(
        resources,
        checkLocalStorage("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);
  const saveLogPowerGeneratorBuilt = useCallback(async (number: number) => {
    try {
      await workShopApi.saveLogPowerGeneratorBuilt(
        number,
        checkLocalStorage("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);


  

  const buildPowerGenerators = (number: number) => {
    // on vérifie que les ressources nécessaires sont là
    // console.log(buildingsResources[type]['energy'])
    if (
      // starship.shield_level >= 4 &&
      resources["diamond"] >= number * 2000 &&
      resources["magic"] >= number * 500
    ) {
      const resourcesTemp = { ...resources };
      resourcesTemp.magic = resources.magic - number * 500;
      resourcesTemp.diamond = resources.diamond - number * 2000;
      resourcesTemp.power_generator = resources.power_generator + number;

      // console.log(Math.round(30 * buildings.metal * Math.pow(1.1, buildings.metal) / 60))
      setResources(resourcesTemp);

      setRemainingEnergy(remainingEnergy + 17 * number * (resourcesSearch.electricity.level + 1));
      setEnergy(energy + 17 * number * (resourcesSearch.electricity.level + 1));

      saveResources(resourcesTemp);
      saveLogPowerGeneratorBuilt(number)
      const resourcesInvestedToSave = number * 2500
      saveResourcesInvested(resourcesInvestedToSave)
      toast.success(number.toString() + " groupe(s) électrogène a(ont) été construit(s)", { duration: 8000})
    } else {
      toast.error("Pas assez de ressources pour construire " + number.toString() + " groupe(s) électrogène", { duration: 8000})
    }
  };

  //   useEffect(() => {
  //     console.log(resources);
  //   }, [resources]);

  return (
    <>
      {isAuthenticated ? (
        <Box sx={{ minHeight: "590px", mr: 2 }}>
          
          <Typography>A l'atelier vous pourrez construire des groupes électrogènes dès le niveau 3 de la recherche énergie atteint</Typography>
          
          
          {resourcesSearch.energy.level >= 3 ? (
            <>
            <Typography>{`${numeral(resources.power_generator).format("0,000,000,000,000")
            .replaceAll(",", " ")} groupes électrogènes construits`}</Typography>
            <Typography sx={{ 
                // margin: "auto"
                }}>{`Créer des groupes électrogènes (coût 2 000 diamants 500 magie par unité pour un apport de ${17 * (resourcesSearch.electricity.level + 1)} énergie)`}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', mt: 2}}>
                
                <Box>
                <Button sx={{ border: "white 1px solid" }} onClick={() => buildPowerGenerators(1)}>1</Button>
                <Button  sx={{ border: "white 1px solid", ml: 2 }} onClick={() => buildPowerGenerators(2)}>2</Button>
                <Button  sx={{ border: "white 1px solid", ml: 2 }} onClick={() => buildPowerGenerators(5)}>5</Button>
                <Button  sx={{ border: "white 1px solid", ml: 2 }} onClick={() => buildPowerGenerators(10)}>10</Button>
                    <Button  sx={{ border: "white 1px solid", ml: 2 }} onClick={() => buildPowerGenerators(25)}>25</Button>
                    <Button  sx={{ border: "white 1px solid", ml: 2 }} onClick={() => buildPowerGenerators(100)}>100</Button>
                </Box>
            </Box>
            </>
          ) : (
            <Typography>Vous n'avez pas les prérequis pour créer des objets</Typography>
          )}
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

export default WorkShop;
