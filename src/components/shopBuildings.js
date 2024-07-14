import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { shopApi } from "../api/shop-api";
import { useCallback, useEffect, useState } from "react";
import { planetApi } from "../api/planet-api";
import { checkLocalStorage } from "../modules/functions";
import { useMounted } from "../hooks/use-mounted";
import { buildingsNames } from "../modules/names";
import toast from "react-hot-toast";

const initShopBuildingsData = () => {
  const array = [];
  const buildings = ['unity-link_generator', 'ticket_generator']
  buildings.forEach((item) => {
    array.push({
      [item]: {
        'rules': [
            {'type': '', 'level': 0, 'order': 0},
            // {'type': 'crystal', 'level': 20, 'order': 2},
            // {'type': 'tritium', 'level': 20, 'order': 3},
            // {'type': 'metal', 'level': 40, 'order': 4},
            // {'type': 'crystal', 'level': 30, 'order': 5},
            // {'type': 'tritium', 'level': 30, 'order': 6},
        ],
        'is_next_level_buildable': false, 
        'next_level_data' : 
            {'type': 'carbon', 'level': 2000, 'level_building': 1}
        }
      })
  })
  return array
}

const ShopBuildings = (props) => {
  const { unityLink, setUnityLink, buildings, setBuildings
   } = props;

   const isMounted = useMounted();
  //  const [shopBuildingsData, setShopBuildingsData] = useState(initShopBuildingsData)
   const [shopBuildingsData, setShopBuildingsData] = useState(
    [
       {'unity-link_generator': {
          'rules': [
              { 'type': '', 'level': 0, 'order': 0 },
          ],
          'is_next_level_buildable': false,
          'next_level_data': {
              'type': 'carbon',
              'level': 2000,
              'level_building': 1
          }
      },
    },
       {'ticket_generator': {
          'rules': [
              { 'type': '', 'level': 0, 'order': 0 },
          ],
          'is_next_level_buildable': false,
          'next_level_data': {
              'type': 'carbon',
              'level': 2000,
              'level_building': 1
          }
      }
    }
    ]
   )

// const saveLevelBooster = useCallback(async (level) => {
//   try {
//     const boosterData = await planetApi.saveLevelBooster(
//       level,
//       // localStorage.getItem("jwt").replaceAll('"', "")
//       checkLocalStorage("jwt").replaceAll('"', "")
//     );
//     setBooster(boosterData);
//   } catch (err) {
//     console.error(err);
//   }
// }, []);



// const addBooster = () => {

//   if (unityLink >= booster.cost) {
//     const resourcesTemp = { ...resources };
//     resourcesTemp.booster = booster.coefficient + 1;
//     setResources(resourcesTemp)

//     setUnityLink(unityLink - booster.cost);
//     saveUnityLink(unityLink - booster.cost);
//     saveLevelBooster(booster.coefficient + 1);
//   }
// };

const saveUnityLink = useCallback(async (unityLink) => {
  try {
    await shopApi.saveUnityLink(
      unityLink,
      checkLocalStorage("jwt").replaceAll('"', "")
    );
  } catch (err) {
    console.error(err);
  }
}, []);

const getDisplayBuildingsShopLevels = useCallback(async () => {
  try {
    const buildingsPlayer = await shopApi.getDisplayBuildingsShopLevels(
      buildings,
      checkLocalStorage("jwt").replaceAll('"', "")
    );
    
    if (isMounted()){
      setShopBuildingsData(buildingsPlayer)
    }
    
  } catch (err) {
    console.error(err);
  }
}, []);

useEffect(() => {
  getDisplayBuildingsShopLevels()
}, [])





const updateShopBuildingsData = useCallback(async (buildings, type, level) => {
  try {
    await planetApi.saveLevel(
      type,
      level,
      localStorage.getItem("jwt").replaceAll('"', "")
    );
    await shopApi.saveUnityLinkInvested(
      500, checkLocalStorage("jwt").replaceAll('"', "")
    )
    const buildingsPlayer = await shopApi.getDisplayBuildingsShopLevels(
      buildings,
      checkLocalStorage("jwt").replaceAll('"', "")
    );
    setShopBuildingsData(buildingsPlayer)
  } catch (err) {
    console.error(err);
  }
}, []);

const handleBuildingBuy = (type) => {
  if (unityLink >= 500) {
    // saveLevel(type, buildings[type] + 1);
    const buildingsTemp = { ...buildings };
    buildingsTemp[type] = buildings[type] + 1;
    setBuildings(buildingsTemp);
    saveUnityLink(unityLink - 500)
    setUnityLink(unityLink - 500)
    // mettre à jour la règle du niveau suivant
    updateShopBuildingsData(buildingsTemp, type, buildings[type] + 1)
    toast.success(buildingsNames[type] + " construit", { duration: 8000})
  } else {
    toast.error("Pas assez de Lien-Unités", { duration: 8000})
  }

}


useEffect(() => {
  // console.log(shopBuildingsData)
}, [shopBuildingsData])

const buildingsShopNames = {
  'unity-link_generator': "Générateur de Lien-Unités",
  'ticket_generator': "Générateur de tickets"
}



const BuildingCard = ({ buildingData, building }) => {
      // console.log(buildingData[building].next_level_data.type)
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
        <Typography>{`${buildingsShopNames[building]} niveau : ${buildings[building]}`}</Typography>
        
        {buildingData[building].is_next_level_buildable ? (
          <Button onClick={() => handleBuildingBuy(building)}>
          Acheter
        </Button>
        ) : (
          <Typography>{`${buildingsNames[buildingData[building].next_level_data.type]} niveau requis : ${buildingData[building].next_level_data.level}`}</Typography>
        )}
        {building === 'unity-link_generator' && (
        <Typography>Chaque niveau donne 100 Lien-Unités supplémentaires par récompense</Typography>
      )}
        {building === 'ticket_generator' && (
        <Typography>Chaque niveau donne 2 tickets supplémentaires par récompense</Typography>
      )}
        {/* {buildingData[building].next_level_data.type} */}
{/*         
        <img
          src={buildingData.img}
          alt={`Saut ${buildingData.alt}`}
          style={{ width: "50px", height: "auto" }}
        /> */}
          <Typography>{`Coût : ${500} Lien-Unités`}</Typography>
          {/* <Button onClick={() => handleBuildingBuy(buildingData.item_type)}>
            Acheter
          </Button> */}
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          // flexDirection: 'column',
          justifyContent: "space-between",
          alignItems: "center",
          // minWidth: '400px'
          // maxWidth: '70vw'
          paddingRight: "20px",
          // width: '100vh'
        }}
      >
        
   {/* <Typography>Les améliorations des bâtiments coûtent 500 Lien-Unités par niveau</Typography> */}
   {shopBuildingsData.map((item) => {
    // console.log(item);
    return (
      <BuildingCard
        key={Object.keys(item)[0]}
        buildingData={item}
        building={Object.keys(item)[0]}
      />
)})}
   

      </Grid>
    </>
  );
};

export default ShopBuildings;
