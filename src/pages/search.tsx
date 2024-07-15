import { Box, Button, Card, Tooltip, Typography, Link } from "@mui/material";
import numeral from "numeral";
import { useCallback, useEffect } from "react";
import { planetApi } from "../api/planet-api";
import { starshipApi } from "../api/starship-api";
import { checkLocalStorage, shortNumber } from "../modules/functions";
import { Resources, ResourcesInvested } from "../types/app-types";
import { ResourcesSearch, SearchData } from "../types/search-types";
import toast from "react-hot-toast";
import { Link as RouterLink } from "react-router-dom"
import { resourcesNameFrench } from "../modules/names";

interface SearchProps {
  resourcesSearch: ResourcesSearch;
  setResourcesSearch: React.Dispatch<React.SetStateAction<ResourcesSearch>>
  resources: Resources
  setResources: React.Dispatch<React.SetStateAction<Resources>>
  saveResourcesInvested: (resources: number) => Promise<void>
  searchBase: ResourcesSearch
  isAuthenticated: boolean
  remainingEnergy: number
  setRemainingEnergy: React.Dispatch<React.SetStateAction<number>>
  energy: number
  setEnergy: React.Dispatch<React.SetStateAction<number>>
}

type SearchType = 'energy' | 'life' | 'shield' | 'fire' | 'electricity' | 'time';
type SearchResourceType = 'carbon' | 'diamond' | 'magic';

interface SearchCardProps {
  searchData: SearchData;
  type: SearchType
}

const Search = (props: SearchProps) => {
  // const isMounted = useMounted();
  const {
    resources,
    setResources,
    // starship,
    // setStarship,
    resourcesSearch,
    setResourcesSearch,
    // resourcesNeeded,
    // setResourcesNeeded,
    isAuthenticated,
    saveResourcesInvested,
    searchBase,
    remainingEnergy,
    setRemainingEnergy,
    energy,
    setEnergy
  } = props;

  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //     navigate(`/login`)
  // }

  // console.log(resourcesSearch);

  type ResourcesSearchName = 'carbon' | 'diamond' | 'magic';

  const resourcesSearchName: ResourcesSearchName[] = ['carbon', 'diamond', 'magic']

  const searchesName = {
    energy: "Energie", life: "Vie", shield: "Bouclier", fire: "Armes", electricity: "Electricité", time: "Accélération de temps"
  }

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

  const saveLevelSearch = useCallback(async (type: string, level: number) => {
    try {
      planetApi.saveLevelSearch(
        type,
        level,
        checkLocalStorage("jwt").replaceAll('"', "")
      );
      // setBooster(boosterData)
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleLevelSearch = (type: SearchType) => {
    // on vérifie qu'il y a assez de ressources pour le niveau suivant
    if ((type === "energy" || type === "electricity" || type === "time" || "shield") && resources["carbon"] >= resourcesSearch[type].carbon
      && resources["diamond"] >= resourcesSearch[type].diamond
      && resources["magic"] >= resourcesSearch[type].magic
    ) {
      // on soustrait les ressources
      const resourcesTemp = { ...resources };
      resourcesTemp.carbon -= resourcesSearch[type].carbon;
      resourcesTemp.diamond -= resourcesSearch[type].diamond;
      resourcesTemp.magic -= resourcesSearch[type].magic;
      const searchesTemp = { ...resourcesSearch, [type]: {...resourcesSearch[type], level: resourcesSearch[type]['level'] + 1 }};
      setResources(resourcesTemp);
      saveResources(resourcesTemp);
      // setResourcesSearch(searchesTemp);
      // // on met à jour les ressources pour la recherche de niveau suivant
      // const searchesName = ['life', 'shield', 'fire', 'energy']
      const nextResourcesSearch: ResourcesSearch = {...searchesTemp}
      resourcesSearchName.forEach((resourceName) => {
          nextResourcesSearch[type] = { ...nextResourcesSearch[type],
          [resourceName] : searchBase[type][resourceName] * Math.pow(2, resourcesSearch[type]['level'] + 1),
          
        }
      })
      // console.log(nextResourcesSearch)
      setResourcesSearch(nextResourcesSearch);
      saveLevelSearch(type, searchesTemp[type]['level']);

      // si on fait la recherche électricité, on met à jour l'énergie utilisée et l'énergie totale pour el suivi
      if (type === 'electricity') {
        setRemainingEnergy(remainingEnergy - 17 * resources.power_generator * resourcesSearch.electricity.level + 17 * resources.power_generator * (nextResourcesSearch.electricity.level));
        setEnergy(energy - 17 * resources.power_generator * resourcesSearch.electricity.level + 17 * resources.power_generator * (nextResourcesSearch.electricity.level));
      }

      const resourcesInvestedToSave = resourcesSearch[type].carbon + resourcesSearch[type].diamond + resourcesSearch[type].magic
      saveResourcesInvested(resourcesInvestedToSave)
      toast.success("Recherche " + searchesName[type] + " efffecuée", { duration: 8000})
    } else {
      toast.error(searchesName[type] + " ne peut pas être construit par manque de ressources", { duration: 8000})
    }
    // if (type === "life_level" && resources["metal"] >= resourcesSearch.life) {
    //   const resourcesTemp = { ...resources };
    //   resourcesTemp.metal -= resourcesSearch.life;
    //   const searchesTemp = { ...searchLevels };
    //   searchesTemp.life_level += 1;
    //   setSearchLevels(searchesTemp);
    //   const resourcesSearchTemp = { ...resourcesSearch };
    //   resourcesSearchTemp.life = 100 * Math.pow(2, searchesTemp.life_level - 1);
    //   setResourcesSearch(resourcesSearchTemp);

    //   setResources(resourcesTemp);
    //   saveResources(resourcesTemp);
    //   saveLevelSearch("life", searchLevels.life_level + 1);

    //   const resourcesNeededTemp = { ...resourcesNeeded };
    //   resourcesNeededTemp.metal = 1000000 * (starship.life_level + 1);
    //   setResourcesNeeded(resourcesNeededTemp);
    // }
    
  };

  const buildStarship = useCallback(async () => {
    try {
      await starshipApi.buildStarship(
        checkLocalStorage("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  // const handleBuildStarship = (resourcesNeeded) => {
  //   if (
  //     !starship.is_built &&
  //     resourcesNeeded["metal"] <= resources.metal &&
  //     resourcesNeeded["crystal"] <= resources.crystal &&
  //     resourcesNeeded["tritium"] <= resources.tritium
  //   ) {
  //     const starshipTemp = { ...starship };
  //     starshipTemp.is_built = true;
  //     setStarship(starshipTemp);
  //     const resourcesTemp = { ...resources };
  //     resourcesTemp.metal -= resourcesNeeded["metal"];
  //     resourcesTemp.crystal -= resourcesNeeded["crystal"];
  //     resourcesTemp.tritium -= resourcesNeeded["tritium"];
  //     setResources(resourcesTemp);
  //     buildStarship();
  //   }
  // };

  // const searchCards = [{ name: "Vie", typeLevel: "life_level" }];

  
  

  const SearchCard = ({ searchData, type }: SearchCardProps) => {
    return (
      <Card
        sx={{
          marginTop: "15px",
          background: "#313742",
          color: "white",
          // boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
          padding: "2px",
          minWidth: "300px",
          // border: "1px solid white",
        }}
      >
        <Box sx={{ margin: "0px 20px" }}>
        
        {/* <img
          src={itemData.img}
          alt={`Saut ${itemData.alt}`}
          style={{ width: "50px", height: "auto" }}
        /> */}
        <Typography>{`${searchesName[type]} niveau : ${searchData.level}`}</Typography>
        {resourcesSearchName.map((resource) => (
          searchData[resource as SearchResourceType] > 0 && 
          <Tooltip title={numeral(searchData[resource as SearchResourceType])
            .format("0,000,000,000,000")
            .replaceAll(",", " ")} placement="top" key={resource}>

        <Typography>{`${resourcesNameFrench[resource as SearchResourceType]} : ${shortNumber(searchData[resource as SearchResourceType])}`}</Typography>
          </Tooltip>
        // <Typography key={resource}>{`${resourcesNameFrench[resource as SearchResourceType]} : ${numeral(searchData[resource as SearchResourceType]).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        ))}
          <Button onClick={() => handleLevelSearch(type)}>
            Rechercher
          </Button>
        </Box>
      </Card>
    );
  };

  useEffect(() => {
    // console.log(resourcesSearch)
  }, [resourcesSearch])

  return (
    <>
    {isAuthenticated ? (
    
    <Box sx={{ minHeight: "590px" }}>
      <Typography>Energie niveau 3 débloque les générateurs d'énergie, manufacturables à l'atelier</Typography>
      <Typography>Energie niveau 5 débloque la recherche énergie, qui augmente la puissance des générateurs d'énergie</Typography>
      <Typography>Accélérateur de temps niveau 3 débloque l'achat de booster à la boutique</Typography>
      <Typography>Bouclier niveau 20 débloque le dôme protecteur, à construire pour finir le jeu (temporairement)</Typography>
      {Object.keys(resourcesSearch).map((search) => (
        (search === 'energy' || search === 'time' || search === 'shield' || (search === "electricity" && resourcesSearch.energy.level >= 5)) && (
        <SearchCard key={search} searchData={resourcesSearch[search as SearchType]} type={search as SearchType} />
)))}
      {/* <Typography>{`Métal : ${numeral(resources.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(resources.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Deutérium : ${numeral(resources.tritium).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>    */}
      {/* <Card
        sx={{
          marginBottom: "15px",
          marginTop: "15px",
        }}
      >
        <Typography>{`Vie : ${searchLevels.life_level}`}</Typography>
        <Typography>{`${numeral(resourcesSearch.life.metal)
          .format("0,000,000,000,000,000,000,000")
          .replaceAll(",", " ")} Métal`}</Typography>
      </Card> */}
      
      {/* <Card
        sx={{
          marginBottom: "15px",
        }}
      >
        <Button onClick={() => handleLevelSearch("life_level")}>Vie</Button>
        <Button onClick={() => handleLevelSearch("fire_level")}>Armes</Button>
        <Button onClick={() => handleLevelSearch("shield_level")}>
          Bouclier
        </Button>
      </Card> */}
      {/* <Card
        sx={{
          marginBottom: "15px",
        }}
      >
        <Typography>
          {starship.is_built ? "Vaisseau en attente" : "Pas de vaisseau"}
        </Typography>
        <Typography>{`Métal : ${numeral(resourcesNeeded.metal)
          .format("1,000,000,000,000")
          .replaceAll(",", " ")} Cristal : ${numeral(resourcesNeeded.crystal)
          .format("1,000,000,000,000")
          .replaceAll(",", " ")} Tritium : ${numeral(
          resourcesNeeded.tritium
        )
          .format("1,000,000,000,000")
          .replaceAll(",", " ")}`}</Typography>
        {starship.life_level >= 1 &&
          starship.fire_level >= 1 &&
          starship.shield_level >= 1 && (
            <Button onClick={() => handleBuildStarship(resourcesNeeded)}>
              Construire vaisseau
            </Button>
          )}
      </Card> */}
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

export default Search;
