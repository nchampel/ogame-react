import {
  Box,
  Button,
  Card,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { rankingApi } from "../api/ranking-api";
import { useMounted } from "../hooks/use-mounted";
// import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CustomTableCell from "../UI/CustomTableCell";
// import Label1 from "../components/t"

const Ranking = () => {
  const isMounted = useMounted();
  const [ranking, setRanking] = useState({
    ranking_total: [{ user: "", points: "" }],
    ranking_sotoc: [{ user: "", points: "" }],
    ranking_sora: [{ user: "", points: "" }],
    ranking_nano: [{ user: "", points: "" }],
    ranking_altheron: [{ user: "", points: "" }],
    ranking_flumia: [{ user: "", points: "" }],
  });
  // const t = Preview();
  // const [rankingByNature, setRankingByNature] = useState({'sotoc': []},{'altheron': []},{'nano': []},
  // {'sora': []},{'flumia': []},)
  // const { isAuthenticated } = props
  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //     navigate(`/login`)
  // }

  // useEffect(() => {
  //   console.log(ranking.ra)
  // }, [ranking])
  // console.log('ok')

  function CustomTable(props) {
    const { type } = props;

    let hRemains = 0;
  let qRemains = 0;
  let nRemains = 0;
  let dRemains = 0;
  let result = {};
  let amount = 43
  let h = amount / 50;
  if (Math.floor(h) > 0){
//     result.push({'H': Math.floor(h)});
    result.H = Math.floor(h);
    hRemains = amount % 50;
  } else {
    hRemains = amount;
  }
  
  let q = hRemains / 25;
  if (Math.floor(q) > 0){
//     result.push({'Q': Math.floor(q)});
     result.Q = Math.floor(q);
    qRemains = hRemains % 25;
  } else {
    qRemains = hRemains;
  }
  
  let d = qRemains / 10;
  if (Math.floor(d) > 0){
//     result.push({'D': Math.floor(d)});
     result.D = Math.floor(d);
    dRemains = d % 10;
  } else {
    dRemains = d;
  }
  
  let n = dRemains / 5;
  if (Math.floor(n) > 0){
//     result.push({'N': Math.floor(n)});
     result.N = Math.floor(n);
    nRemains = n % 5;
  } else {
    nRemains = n;
  }
  
  if (nRemains > 0){
//     result.push({'P': nRemains});
     result.P = Math.floor(nRemains);
  }
//   let p = nRemains / 1;
//   let pRemains = amount % 1;
//   change = {"H": Math.floor(h) === 0 ? 0 : Math.floor(h), "Q": Math.floor(q), "D": Math.floor(d), "N": Math.floor(n), "p": nRemains};
  let change = {};
  const keys = Object.keys(result)
  for(let i = 0; i < keys.length; i++){
   if(result[keys[i]] > 0){
     change[keys[i]] = result[keys[i]];
   }
}
    return (
      <>
      {/* <Label1 value={'Solution'} color={'blue'} /> */}
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Pseudo</CustomTableCell>
              <CustomTableCell>Points</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking[type].map((user) => {
              return (
                <>
                  <TableRow key={user.pseudo}>
                    <CustomTableCell>{user.pseudo}</CustomTableCell>
                    <CustomTableCell>{user.points}</CustomTableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  }
  function CustomTabPanel(props) {
    const { type, value } = props;
    return (
      <TabPanel value={value}>
        <CustomTable type={type} />
      </TabPanel>
    );
  }
  const tabs = [
    { label: "Sotoc", value: "sotoc" },
    { label: "Althéron", value: "altheron" },
    { label: "Nano", value: "nano" },
    { label: "Flumia", value: "flumia" },
    { label: "Sora", value: "sora" },
  ];
  const tables = [
    { value: "sotoc", type: "ranking_sotoc" },
    { value: "altheron", type: "ranking_altheron" },
    { value: "nano", type: "ranking_nano" },
    { value: "flumia", type: "ranking_flumia" },
    { value: "sora", type: "ranking_sora" },
  ];

  const [currentTab, setCurrentTab] = useState("sotoc");

  const handleTabsChange = (_, value) => {
    // console.log(value)
    setCurrentTab(value);
  };

  // const classes = useStyles();

  const getRanking = useCallback(async () => {
    try {
      const rankingData = await rankingApi.getRanking(
        localStorage.getItem("jwt").replaceAll('"', "")
      );

      if (isMounted) {
        // console.log(rankingData);
        setRanking(rankingData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  return (
    <Box sx={{ minHeight: "550px" }}>
      <Typography sx={{ mt: 5, fontSize: 22 }}>Classement total</Typography>
      <Table>
        <TableHead>
          <TableRow 
          sx={{
            ".css-1ds061a-MuiTableCell-root": {
              color: "white",
              // borderBottomColor: 'white'
              // borderBottom: "10px solid white"
              // fontWeight: "600px"
            },
            ".css-7jxdzz-MuiButtonBase-root-MuiTab-root": {
              color: "white",
            }
            // ".css-1t7pkgn-MuiTableCell-root": {
            //   color: "white",
            //   borderBottom: "1px solid white"
            //   // fontWeight: "600px"
            // }
          }}>
            <CustomTableCell sx={{
              ".css-1ds061a-MuiTableCell-root": {
                color: "white",
                // borderBottomColor: 'white'
                // borderBottom: "10px solid white"
                // fontWeight: "600px"
              },
              ".css-7jxdzz-MuiButtonBase-root-MuiTab-root": {
                color: "white",
              }
              // ".css-1t7pkgn-MuiTableCell-root": {
              //   color: "white",
              //   borderBottom: "1px solid white"
              //   // fontWeight: "600px"
              // }
            }}>Pseudo</CustomTableCell>
            <CustomTableCell>Alignement</CustomTableCell>
            <CustomTableCell>Points</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.ranking_total.map((user) => {
            return (
              <>
                <TableRow key={user.pseudo}>
                  <CustomTableCell>{user.pseudo}</CustomTableCell>
                  <CustomTableCell>{user.nature}</CustomTableCell>
                  <CustomTableCell>{user.points}</CustomTableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <Typography sx={{ mt: 5, fontSize: 22 }}>
        Classement par alignement
      </Typography>

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
        {tables.map((table) => (
          <CustomTabPanel
            type={table.type}
            value={table.value}
            key={table.type}
          />
        ))}
      </TabContext>
    </Box>
  );
};

export default Ranking;
