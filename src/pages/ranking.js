import { Box, Button, Card, Divider, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { rankingApi } from "../api/ranking-api";
import { useMounted } from '../hooks/use-mounted';
// import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Ranking = () => {
    const isMounted = useMounted();
    const [ranking, setRanking] = useState({'ranking_total': [], 'ranking_sotoc': [], 'ranking_sora': [],
    'ranking_nano': [], 'ranking_altheron': [], 'ranking_flumia': [],})
    // const [rankingByNature, setRankingByNature] = useState({'sotoc': []},{'altheron': []},{'nano': []},
    // {'sora': []},{'flumia': []},)
    // const { isAuthenticated } = props
    // const navigate = useNavigate();

    // if (!isAuthenticated) {
    //     navigate(`/login`)
    // }

    function CustomTable(props){
      const { type } = props
      return (
        <>
        <Table>
        <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white"}}>
                  Pseudo
                </TableCell>
                <TableCell sx={{ color: "white"}}>
                  Points
                </TableCell>
                </TableRow>
                </TableHead>
        <TableBody>
        {ranking[type].map((user) => {
            return <>
              <TableRow key={user.pseudo}>
            <TableCell sx={{ color: "white"}}>{user.pseudo}</TableCell>
            <TableCell sx={{ color: "white"}}>{user.points}</TableCell>
                </TableRow>
            </>
            
        })}
                
                </TableBody>

        </Table>
        </>
      )
    }
    const tabs = [
      { label: 'Sotoc', value: 'sotoc' },
      { label: 'Althéron', value: 'altheron' },
      { label: 'Nano', value: 'nano' },
      { label: 'Flumia', value: 'flumia' },
      { label: 'Sora', value: 'sora' },
    ];

    const [currentTab, setCurrentTab] = useState('sotoc');

    const handleTabsChange = (_, value) => {
      console.log(value)
      setCurrentTab(value);
    };

    // const classes = useStyles();
    

    const getRanking = useCallback(async () => {
        try {
            const rankingData = await rankingApi.getRanking(localStorage.getItem("jwt").replaceAll('"', ''))
            
            if (isMounted) {
                // console.log(rankingData.ranking)
                setRanking(rankingData)
            }
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    useEffect(() => {
        getRanking()
    }, [getRanking])
    
    return (
    <Box sx={{ minHeight: '600px' }}>
        <Typography sx={{ mt: 5, fontSize: 22}}>Classement total</Typography>   
        <Table>
        <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white"}}>
                  Pseudo
                </TableCell>
                <TableCell sx={{ color: "white"}}>
                  Alignement
                </TableCell>
                <TableCell sx={{ color: "white"}}>
                  Points
                </TableCell>
                </TableRow>
                </TableHead>
        <TableBody>
        {ranking.ranking_total.map((user) => {
            return <>
              <TableRow key={user.pseudo}>
            <TableCell sx={{ color: "white"}}>{user.pseudo}</TableCell>
            <TableCell sx={{ color: "white"}}>{user.nature}</TableCell>
            <TableCell sx={{ color: "white"}}>{user.points}</TableCell>
                </TableRow>
            </>
            
        })}
                
                </TableBody>

        </Table>
        <Typography sx={{ mt: 5, fontSize: 22}}>Classement par alignement</Typography>   
        
              <TabContext value={currentTab}>
              <TabList onChange={handleTabsChange} aria-label="lab API tabs example"
              sx={{
                ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                    color: "#1976d2"
                  },
                ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
                    color: "white",
                    // opacity: 1
                  },
                }}>
              {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </TabList>
              {/* <Divider color="white" /> */}
              <TabPanel value="sotoc">
                    <CustomTable type="ranking_sotoc" />
                  </TabPanel>
              <TabPanel value="nano">
                    <CustomTable type="ranking_nano" />
                  </TabPanel>
              <TabPanel value="flumia">
                    <CustomTable type="ranking_flumia" />
                  </TabPanel>
              <TabPanel value="sora">
                    <CustomTable type="ranking_sora" />
                  </TabPanel>
              <TabPanel value="altheron">
                    <CustomTable type="ranking_altheron" />
                  </TabPanel>
              </TabContext>
        
        
        {/* <Typography>{`Booster : x ${booster.coefficient}`}</Typography>   
        <Typography>{`Coût : ${numeral(booster.cost).format('0,000,000,000,000').replaceAll(',', ' ')} Métal`}</Typography>    */}
        
        {/* <Card>
            <Button onClick={() => reinitialization()}>Réinitialiser</Button>
        </Card> */}
    </Box>
)}

export default Ranking;