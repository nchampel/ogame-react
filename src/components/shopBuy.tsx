import { Box, Button, Card, Grid, Typography } from "@mui/material";
import numeral from "numeral";
import { shopApi } from "../api/shop-api";
import { useCallback, useEffect } from "react";
import { userApi } from "../api/user-api";
import { planetApi } from "../api/planet-api";
import { ShopItemsData } from "../types/shopBuy-types";
import { ShopItemData } from "../types/shop-types";
import { Booster, Resources } from "../types/app-types";
import { checkLocalStorage } from "../modules/functions";

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

interface ItemCardProps {
  itemData: ShopItemData;
}

const ShopBuy = (props: ShopBuyProps) => {
  const { shopItemsData, setShopItemsData, unityLink, setUnityLink, booster, setBooster,
    resources, setResources
   } = props;

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

const saveUnityLink = useCallback(async (unityLink: number) => {
  try {
    await shopApi.saveUnityLink(
      unityLink,
      checkLocalStorage("jwt").replaceAll('"', "")
    );
  } catch (err) {
    console.error(err);
  }
}, []);

const addBooster = () => {

  if (unityLink >= booster.cost) {
    const resourcesTemp = { ...resources };
    resourcesTemp.booster = booster.coefficient + 1;
    setResources(resourcesTemp)

    setUnityLink(unityLink - booster.cost);
    saveUnityLink(unityLink - booster.cost);
    saveLevelBooster(booster.coefficient + 1);
  }
};

const saveItemBought = useCallback(async (type: string) => {
  try {
    let updatedShopItemsDataTemp = []
    let updatedShopItemsData = []
    const itemBought = await shopApi.saveItemBought(
      type,
      checkLocalStorage("jwt").replaceAll('"', "")
    );
    updatedShopItemsDataTemp = shopItemsData.map(itemShop => {
      
      // on met à jour la quantité d'objet
      if (itemShop.item_type === itemBought.type) {
        return {
          ...itemShop,
          item_quantity: itemBought.quantity
        };
      } 
        return itemShop;
      
    });
    if (itemBought.purchasable){
      
      // passer le purchasable de l'objet à true
      updatedShopItemsData = updatedShopItemsDataTemp.map(itemShopTemp => {
        if (itemShopTemp.item_type === itemBought.purchasable) {
           return{
            ...itemShopTemp,
            purchasable: true
          };
        }
        // if (itemShop.item_type !== itemBought.purchasable && itemShop.item_type !== itemBought.type) {
          return itemShopTemp;
        // }
        
      });

      
    } else {
      updatedShopItemsData = updatedShopItemsDataTemp
    }
    
    setShopItemsData(updatedShopItemsData)
    // on met à jour les Unité-Liens restantes
    setUnityLink(itemBought.unityLink)
  } catch (err) {
    console.error(err);
  }
}, [shopItemsData]);

const handleItemBuy = (type: string) => {
  if (unityLink >= 500) {
    saveItemBought(type)
  }

}

useEffect(() => {
  // console.log(shopItemsData)
}, [shopItemsData])

    const ItemCard = ({ itemData }: ItemCardProps) => {
    return (
      <>
      {itemData.purchasable &&
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
        
        <img
          src={itemData.img}
          alt={`Saut ${itemData.alt}`}
          style={{ width: "50px", height: "auto" }}
        />
          <Typography>{`Coût : ${500} Lien-Unités`}</Typography>
          <Button onClick={() => handleItemBuy(itemData.item_type)}>
            Acheter
          </Button>
        </Box>
      </Card>
      }
      </>
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
        {shopItemsData.map((itemShop: ShopItemData) => {
          return (
            <ItemCard
              // item={true}
              key={itemShop.item_type}
              itemData={itemShop}
            />
          );
        })}

        <Card
          // item n'existe pas dans react
          sx={{
            marginTop: "15px",
            background: "#313742",
            color: "white",
            // boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.2)",
            padding: "2px",
            minWidth: "300px",
            // border: "1px solid black",
          }}
        >
          <Typography>{`Booster : x ${booster.coefficient + 1}`}</Typography>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center"
          }}
          > */}
        <Typography>{`Coût : ${numeral(booster.cost)
          .format("0,000,000,000,000")
          .replaceAll(",", " ")} Lien-Unités`}</Typography>
        <Button onClick={() => addBooster()}>
          Acheter
        </Button>
        </Card>
      </Grid>
    </>
  );
};

export default ShopBuy;
