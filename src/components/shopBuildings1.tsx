import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { shopApi } from "../api/shop-api";
import { useCallback, useEffect, useState } from "react";
import { userApi } from "../api/user-api";
import { planetApi } from "../api/planet-api";
import { ShopBuildingData, ShopBuildingKey, ShopItemData } from "../types/shop-types";
import { Booster, Resources } from "../types/app-types";
import { checkLocalStorage } from "../modules/functions";
import { useMounted } from "../hooks/use-mounted";

interface ShopBuyProps {
  shopItemsData: [ShopItemData];
  setShopItemsData: React.Dispatch<React.SetStateAction<ShopItemData[]>>
  unityLink: number
  setUnityLink: React.Dispatch<React.SetStateAction<number>>
  booster: Booster
  setBooster: React.Dispatch<React.SetStateAction<Booster>>
  resources: Resources
  setResources: React.Dispatch<React.SetStateAction<Resources>>
}

interface BuildingCardProps {
  buildingData: ShopBuildingData;
  building: ShopBuildingKey;
}

// const buildings = ['unity-link_generator', 'ticket_generator']



const initShopBuildingsData = () => {
  const array: { [key: string]: { rules: {'type': string, 'level': number, 'order': number}[]; is_next_level_buildable: boolean; next_level_data: { type: string; level: number; level_building: number; }; }; }[] = [];
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

const ShopBuildings1 = (props: ShopBuyProps) => {
  const { shopItemsData, setShopItemsData, unityLink, setUnityLink, booster, setBooster,
    resources, setResources
   } = props;

   const isMounted = useMounted();
  //  const [shopBuildingsData, setShopBuildingsData] = useState(initShopBuildingsData)
   const [shopBuildingsData, setShopBuildingsData] = useState<ShopBuildingData>(
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

  //  shopBuildingsData.map((item) => {
  //   Object.keys(item).map((building) =>{

  //     console.log(building)
  //   })
  //  })

  // Object.keys(shopBuildingsData).map((buildingKey) => {
  //   const building = buildingKey as ShopBuildingKey;
    // Object.keys(item).map((building) =>{
    //   const building1 = building as ShopBuildingKey;
      // console.log(building)
    // })

//   const itemCardData = [
//     { img: "Fonderie de métal", type: "metal" },
//     { title: "Raffinerie de cristal", type: "crystal" },
//     { title: "Extracteur de tritium", type: "tritium" },
//   ];

const saveLevelBooster = useCallback(async (level: number) => {
  try {
    const boosterData: Booster = await planetApi.saveLevelBooster(
      level,
      // localStorage.getItem("jwt").replaceAll('"', "")
      checkLocalStorage("jwt").replaceAll('"', "")
    );
    setBooster(boosterData);
  } catch (err) {
    console.error(err);
  }
}, []);

// const saveUnityLink = useCallback(async (unityLink: number) => {
//   try {
//     await userApi.saveUnityLink(
//       unityLink,
//       checkLocalStorage("jwt").replaceAll('"', "")
//     );
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

const getDisplayBuildingsShopLevels = useCallback(async () => {
  try {
    // let updatedShopBuildingsDataTemp = []
    // let updatedShopBuildingsData = []
    // const buildingsPlayer = await shopApi.getDisplayBuildingsShopLevels(
    //   checkLocalStorage("jwt").replaceAll('"', "")
    // );
    // console.log(buildingsPlayer)
    // updatedShopBuildingsDataTemp = shopBuildingsData.map(buildingShop => {
      
    //   // on met à jour les infos de chaque bâtiment
    //   if (buildingShop.item_type === buildingsPlayer.type) {
    //     return {
    //       ...buildingShop,
    //       item_quantity: buildingsPlayer.quantity
    //     };
    //   } 
    //     return buildingShop;
      
    // });
    // if (buildingsPlayer.purchasable){
      
    //   // passer le purchasable de l'objet à true
    //   updatedShopBuildingsData = updatedShopBuildingsDataTemp.map(buildingShopTemp => {
    //     if (buildingShopTemp.item_type === buildingsPlayer.purchasable) {
    //        return{
    //         ...buildingShopTemp,
    //         purchasable: true
    //       };
    //     }
    //       return buildingShopTemp;
        
    //   });

      
    // } else {
    //   updatedShopBuildingsData = updatedShopBuildingsDataTemp
    // }
    if (isMounted()){
      // setShopBuildingsData(buildingsPlayer)
    }
    
  } catch (err) {
    console.error(err);
  }
}, []);

useEffect(() => {
  getDisplayBuildingsShopLevels()
}, [])

const handleBuildingBuy = (type: string) => {
  if (unityLink >= 500) {
    // saveItemBought(type)
  }

}

const t = [
  {'a': 0},
  {'b': 1}
]

console.log(Object.keys(t['0']))

useEffect(() => {
  // console.log(shopBuildingsData)
}, [shopBuildingsData])


    const BuildingCard = ({ buildingData, building }: BuildingCardProps) => {
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
        {building}
{/*         
        <img
          src={buildingData.img}
          alt={`Saut ${buildingData.alt}`}
          style={{ width: "50px", height: "auto" }}
        /> */}
          <Typography>{`Coût : ${500} Lien-Unités`}</Typography>
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
        {/* {shopBuildingsData.map((buildingShop: ShopBuildingData, building: ShopBuildingKey) => {
        //  {buildings.map((buildingShop: ShopItemData) => { 
          return (
            <BuildingCard
              key={building}
              buildingData={buildingShop}
              building={building}
            />
          );
        })} */}
        {/* {shopBuildingsData.map((item) => {
    Object.keys(item).map((building) =>{

    })
   })} */}
   {/* {shopBuildingsData.forEach((item) => {
    // For each object in the array, get its keys
    // Object.keys(item).forEach((buildingKey) => {
    //     console.log(buildingKey);
    // });
    const buildingKey = Object.keys(item)[0];
    return (
      <BuildingCard
        key={buildingKey}
        buildingData={shopBuildingsData}
        building={buildingKey}
      />
)})} */}
   {/* retourne 0 1 */}
        {/* {Object.keys(shopBuildingsData).map((buildingKey) => {
        const building = buildingKey as ShopBuildingKey;
        // Object.keys(item).map((building) =>{
        //   const building1 = building as ShopBuildingKey;
        const building1 = Object.keys(shopBuildingsData['0'][0])
          return (
             <BuildingCard
               key={building}
               buildingData={shopBuildingsData}
               building={building1}
             />
           );
        })}     */}

      </Grid>
    </>
  );
};

export default ShopBuildings1;
