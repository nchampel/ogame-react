import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Tab, Typography } from "@mui/material";
import { planetApi } from "../api/planet-api";
import { shopApi } from "../api/shop-api";
import { useCallback, useEffect, useState } from "react";
import numeral from "numeral";
import { useMounted } from "../hooks/use-mounted";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import oneHour from "../assets/1hour.jpg";
import twoHours from "../assets/2hours.jpg";
import oneDay from "../assets/1day.jpg";
import twoDays from "../assets/2days.jpg";
import oneWeek from "../assets/1week.jpg";
import ShopBuildings from "../components/shopBuildings.js";
import ShopBuy from "../components/shopBuy";

const initShopItemsData = () => {
  // const array = [];
  const items = [
    {type: '1 hour', img: oneHour, alt: "d'une heure", hours: 1}, 
    {type: '2 hours', img: twoHours, alt: "de deux heures", hours: 2}, 
    {type: '1 day', img: oneDay, alt: "d'un jour", hours: 24}, 
    {type: '2 days', img: twoDays, alt: "de deux jours", hours: 48}, 
    {type: '1 week', img: oneWeek, alt: "d'une semaine", hours: 168}, ]
  const array = items.map((item) => {
    return {
      item_quantity: 0,
      item_type: item.type,
      item_used: 0,
      item_bought: 0,
      purchasable: false,
      img: item.img,
      alt: item.alt,
      hours: item.hours
    }
  })
  return array
}

const Shop = (props) => {
  const isMounted = useMounted();
  const { unityLink, setUnityLink, booster, setBooster, resources, setResources, buildingsResources, buildings, setBuildings } = props;
  const [open, setOpen] = useState(false);
  const [dailyReward, setDailyReward] = useState(0);
  const [shopItemsData, setShopItemsData] = useState(initShopItemsData)

  const handleClose = () => {
    setOpen(false);
  }

  const saveDailyClaimed = useCallback(async () => {
    try {
      const isHarvestDaily = await shopApi.saveDailyClaimed(
        buildings['unity-link_generator'],
        localStorage.getItem("jwt").replaceAll('"', "")
      );
      if (isHarvestDaily.msg === 'récompense sauvegardée') {
        setUnityLink(isHarvestDaily.unityLink)
        // setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getShopData = useCallback(async () => {
    try {
      
      const isNotDailyHarversted = await shopApi.determinateDaily(
        localStorage.getItem("jwt").replaceAll('"', "")
      );
      const shopItemsDataInit = await shopApi.getShopItemsData(
        localStorage.getItem("jwt").replaceAll('"', "")
      );

      // console.log(shopItemsDataInit)
      // console.log(shopItemsData)
      
      if (isMounted()) {
        if (isNotDailyHarversted.isDailyHarvestable){
          setOpen(true);
          setDailyReward(isNotDailyHarversted.dailyReward)
          saveDailyClaimed();
        }
        const updatedShopItemsData = shopItemsDataInit.map(item => {
          const foundItem = shopItemsData.find(itemTemp => itemTemp.item_type === item.item_type);
          if (foundItem) {
            // console.log(foundItem)
            return {
              ...foundItem,
              item_quantity: item.item_quantity,
              item_bought: item.item_bought,
              item_used: item.item_used,
              purchasable: item.purchasable,
              item_type: item.item_type,
            };
          }
          return item;
        });
        // console.log(updatedShopItemsData)
        setShopItemsData(updatedShopItemsData)
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getShopData();
  }, []);

  const [currentTab, setCurrentTab] = useState("buildings");
  const tabs = [
    { label: "Bâtiments", value: "buildings" },
    { label: "Acheter", value: "buy" },
    // { label: "Nano", value: "nano" },
    // { label: "Flumia", value: "flumia" },
    // { label: "Sora", value: "sora" },
  ];
  const pages = [
    { label: "Bâtiments", value: "buildings", component: <ShopBuildings /> },
    { label: "Acheter", value: "buy", component: <ShopBuy /> },
    // { label: "Nano", value: "nano" },
    // { label: "Flumia", value: "flumia" },
    // { label: "Sora", value: "sora" },
  ];

  const handleTabsChange = (_, value) => {
    // console.log(value)
    setCurrentTab(value);
  };

  const saveResources = useCallback(async (resources) => {
    try {
      await planetApi.saveResources(
        resources,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveItemUsing = useCallback(async (type) => {
    try {
      await shopApi.saveItemUsing(
        type,
        localStorage.getItem("jwt").replaceAll('"', "")
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  

  useEffect(() => {
    // console.log(shopItemsData)
  }, [shopItemsData])

  const addResourcesHours = (item) => {
    if (item.item_quantity > 0){

      // on calcule les ressources cumulées à ajouter
      const resourcesToAdd = {
        metal: buildingsResources.metal.production * item.hours,
        crystal: buildingsResources.crystal.production * item.hours,
        tritium: buildingsResources.tritium.production * item.hours,
      };
      const resourcesTemp = { ...resources };
      resourcesTemp.metal += resourcesToAdd.metal;
      resourcesTemp.crystal += resourcesToAdd.crystal;
      resourcesTemp.tritium += resourcesToAdd.tritium;
  
      saveResources(resourcesTemp);
      setResources(resourcesTemp);
  
      // on enlève un objet et on sauvegarde
      const updatedShopItemsData = shopItemsData.map(itemShop => {
        if (itemShop.item_type === item.item_type) {
          return {
            ...itemShop,
            item_quantity: item.item_quantity - 1,
            item_used: item.item_used + 1,
          };
        }
        return itemShop;
      });
      setShopItemsData(updatedShopItemsData)
      saveItemUsing(item.item_type)
  
      // on calcule les ressources cumulées pendant l'absence sur les planètes
      // const resourcesPlanetsTemp = [...planets];
      // resourcesPlanetsTemp.forEach((planet, index) => {
      //   resourcesPlanetsTemp[index]["metal"] =
      //     Math.round(
      //       30 *
      //         resourcesPlanetsTemp[index]["metal_level"] *
      //         Math.pow(1.1, resourcesPlanetsTemp[index]["metal_level"])
      //     ) * hours;
      //   resourcesPlanetsTemp[index]["crystal"] =
      //     Math.round(
      //       30 *
      //         resourcesPlanetsTemp[index]["crystal_level"] *
      //         Math.pow(1.1, resourcesPlanetsTemp[index]["crystal_level"])
      //     ) * hours;
      //   resourcesPlanetsTemp[index]["tritium"] =
      //     Math.round(
      //       30 *
      //         resourcesPlanetsTemp[index]["deuterium_level"] *
      //         Math.pow(1.1, resourcesPlanetsTemp[index]["deuterium_level"])
      //     ) * hours;
      //   resourcesPlanetsTemp[index]["cost"] = Math.round(
      //     (resourcesPlanetsTemp[index]["metal"] +
      //       resourcesPlanetsTemp[index]["crystal"] +
      //       resourcesPlanetsTemp[index]["tritium"]) /
      //       10
      //   );
      // });
  
      // saveResources(resourcesPlanetsTemp) à implémenter
      // setPlanets(resourcesPlanetsTemp);
    }
  };

  return (
    
    
         <>   
              <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="sm"
                PaperProps={{
                  style: {
                    backgroundColor: "#434A54",
                    color: "white",
                  },
                }}
              >
                {/* <DialogTitle>Résultats du combat</DialogTitle> */}
                <DialogContent>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{
                      color: "white",
                      mt: 5,
                    }}
                  >
                    <Typography>{`Vous avez obtenu la récompense de connexion journalière : ${numeral(dailyReward + buildings['unity-link_generator'] * 100)
          .format("0,000,000,000,000").replaceAll(",", " ")} Unité-Liens`}</Typography>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{
                      color: "white",
                      mt: 5,
                    }}
                  >
                    <Button
                      onClick={handleClose}
                      style={{ color: "white" }}
                    >
                      Ok
                    </Button>
                  </Grid>
                </DialogActions>
              </Dialog>
    <Box
      sx={{
        minHeight: "590px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
      >
      <Typography>{`Lien-Unités : ${numeral(unityLink)
          .format("0,000,000,000,000")
          .replaceAll(",", " ")}`}
      </Typography>
      <Typography>{`Gain par jour de Lien-Unités : ${numeral(500 + buildings['unity-link_generator'] * 100)
          .format("0,000,000,000,000")
          .replaceAll(",", " ")}`}
      </Typography>
      <Box sx= {{display: "flex", 
          alignItems: 'center',
          justifyContent: 'center',}}>
      {shopItemsData.map((item) => {
        return <Box key={item.item_type} 
        sx= {{display: "flex", alignItems: "center", mr: 2}}
        >
          <Button onClick={() => addResourcesHours(item)}><img
          src={item.img}
          alt={`Saut ${item.alt}`}
          style={{ width: "50px", height: "auto" }}
        /></Button>
        
        <Typography sx= {{ml: 1, fontSize: 18}}>{item.item_quantity}</Typography>
      </Box>
      
      })}
      </Box>
      <Typography>{`Booster : x ${booster.coefficient}`}</Typography>
      
      {/* <Button onClick={() => saveItemBought('1 hour')}>
          test
        </Button> */}
    <TabContext value={currentTab}>
        <TabList
          onChange={handleTabsChange}
          aria-label="lab API tabs example"
          // sx={{
          //   ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
          //     color: "#1976d2",
          //     fontWeight: "700"
          //     // borderBottom: "2px solid black"
          //     // fontWeight: "600px"
          //   },
          //   // pour modifier la couleur de la barre sous le tab sélectionné
          //   // ".css-1aquho2-MuiTabs-indicator": {
          //   //   backgroundColor: "black",
          //   // },
          //   ".css-1l92wdc-MuiButtonBase-root-MuiTab-root": {
          //     // color: "rgba(0, 0, 0, 0.4)",
          //     fontWeight: "400",
          //     color: "white"
          //   },
          // }}
          sx={{ '& .MuiTab-root': { color: 'white' }
        }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} 
            />
          ))}
        </TabList>
        {/* <Divider color="white" /> */}
        {/* {pages.map((page) => ( */}
          <TabPanel value="buy">
            <ShopBuy 
            shopItemsData={shopItemsData}
            setShopItemsData={setShopItemsData}
            unityLink={unityLink}
            setUnityLink={setUnityLink}
            booster={booster}
            setBooster={setBooster}
            resources={resources}
            setResources={setResources}
            />
          </TabPanel>
          <TabPanel value="buildings">
            <ShopBuildings 
            shopItemsData={shopItemsData}
            setShopItemsData={setShopItemsData}
            unityLink={unityLink}
            setUnityLink={setUnityLink}
            booster={booster}
            setBooster={setBooster}
            resources={resources}
            setResources={setResources}
            buildings={buildings}
            setBuildings={setBuildings}
            />
          </TabPanel>
          {/* // <CustomTabPanel
          //   type={table.type}
          //   value={table.value}
          //   key={table.type}
          // />
        // ))} */}
      </TabContext>
    </Box>
    </>
    
  );
};

export default Shop;
