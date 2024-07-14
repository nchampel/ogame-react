import { Box, Button, Card, Grid, Typography } from "@mui/material";
import numeral from "numeral";
import { shopApi } from "../api/shop-api";
import { useCallback, useEffect, useState } from "react";
import { planetApi } from "../api/planet-api";
import { ShopItemData } from "../types/shop-types";
import { Booster, Resources } from "../types/app-types";
import { checkLocalStorage } from "../modules/functions";
import { ResourcesSearch } from "../types/search-types";

interface ShopTicketProps {
  shopItemsData: [ShopItemData];
  setShopItemsData: React.Dispatch<React.SetStateAction<ShopItemData[]>>
  ticket: number
  setTicket: React.Dispatch<React.SetStateAction<number>>
  unityLink: number
  setUnityLink: React.Dispatch<React.SetStateAction<number>>
  resources: Resources
  setResources: React.Dispatch<React.SetStateAction<Resources>>
  resourcesSearch: ResourcesSearch
}

interface ItemCardProps {
  itemData: ShopItemData;
}

type PriceWon = {
    msg: 'OK' | 'erreur'
    price_won: '1 hour' | '2 hours' | '1 day' | '2 days' | '1 week' | 'unity-link_won'
}

type Prices = '1 hour' | '2 hours' | '1 day' | '2 days' | '1 week' | 'unity-link_won' | 'empty'

type ItemWon = {
    quantity: number
}

const ShopTickets = (props: ShopTicketProps) => {
  const { shopItemsData, setShopItemsData, ticket, setTicket, unityLink, setUnityLink,
    resources, setResources, resourcesSearch
   } = props;

//   const itemCardData = [
//     { img: "Fonderie de métal", type: "metal" },
//     { title: "Raffinerie de cristal", type: "crystal" },
//     { title: "Extracteur de tritium", type: "tritium" },
//   ];
const [gain, setGain] = useState<Prices>('empty')

const prices = {'1 hour': "1 heure", '2 hours': '2 heures', '1 day': '1 jour', '2 days': '2 jours',
     '1 week': '1 semaine', empty: 'en attente de tirage', 'unity-link_won': '500 Lien-Unités'}

const [isWaitingGain, setIsWaitingGain] = useState(false)

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

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

const handleWon = useCallback(async () => {
  try {
    setIsWaitingGain(true)
    const priceWon: PriceWon = await shopApi.getPriceWon(
        ticket,
      checkLocalStorage("jwt").replaceAll('"', "")
    );
    // console.log(priceWon)
    if (priceWon.msg === 'OK') {
        await timeout(2000)
        setIsWaitingGain(false)
        if (priceWon.price_won === 'unity-link_won'){
            await shopApi.saveUnityLink(
                unityLink + 500,
                checkLocalStorage("jwt").replaceAll('"', "")
            )
            setUnityLink(unityLink + 500)
        } else {
    
            let updatedShopItemsDataTemp = []
            const itemWon: ItemWon = await shopApi.saveItemWon(
                priceWon.price_won,
              checkLocalStorage("jwt").replaceAll('"', "")
            );
            updatedShopItemsDataTemp = shopItemsData.map(itemShop => {
              
              // on met à jour la quantité d'objet
              if (itemShop.item_type === priceWon.price_won) {
                return {
                  ...itemShop,
                  item_quantity: itemWon.quantity
                };
              } 
                return itemShop;
              
            });
            setShopItemsData(updatedShopItemsDataTemp)
            setTicket(ticket - 1)
        }
        
        setGain(priceWon.price_won)
    }
  } catch (err) {
    console.error(err);
  }
}, [shopItemsData, ticket]);



const saveWon = useCallback(async (type: string) => {
  try {
    if (type === 'unity-link_won'){
        await shopApi.saveUnityLink(
            unityLink + 500,
            checkLocalStorage("jwt").replaceAll('"', "")
        )
        setUnityLink(unityLink + 500)
    } else {

        let updatedShopItemsDataTemp = []
        const itemWon = await shopApi.saveItemWon(
          type,
          checkLocalStorage("jwt").replaceAll('"', "")
        );
        updatedShopItemsDataTemp = shopItemsData.map(itemShop => {
          
          // on met à jour la quantité d'objet
          if (itemShop.item_type === type) {
            return {
              ...itemShop,
              item_quantity: itemWon.quantity
            };
          } 
            return itemShop;
          
        });
        setShopItemsData(updatedShopItemsDataTemp)
    }
    
    
  } catch (err) {
    console.error(err);
  }
}, []);

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
          {/* <Button onClick={() => handleItemBuy(itemData.item_type)}>
            Acheter
          </Button> */}
        </Box>
      </Card>
      }
      </>
    );
  };

  return (
    <>
      {/* <Grid
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
      > */}
        {/* {shopItemsData.map((itemShop: ShopItemData) => {
          return (
            <ItemCard
              // item={true}
              key={itemShop.item_type}
              itemData={itemShop}
            />
          );
        })} */}
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
        <Typography>{`Tickets : ${numeral(ticket)
          .format("0,000,000,000,000")
          .replaceAll(",", " ")}`}
      </Typography>
      {!isWaitingGain ? (

        <Typography>{`Gain : ${prices[gain]}`}</Typography>
      ) : (
        <Typography>Attente du tirage</Typography>
      )}
        <Button onClick={() => handleWon()}>
            Jouer
          </Button>
        </Card>
      {/* </Grid> */}
    </>
  );
};

export default ShopTickets;
