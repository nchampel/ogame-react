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
    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Pseudo</TableCell>
              <TableCell sx={{ color: "white" }}>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking[type].map((user) => {
              return (
                <>
                  <TableRow key={user.pseudo}>
                    <TableCell sx={{ color: "white" }}>{user.pseudo}</TableCell>
                    <TableCell sx={{ color: "white" }}>{user.points}</TableCell>
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
        console.log(rankingData);
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
    <Box sx={{ minHeight: "600px" }}>
      <Typography sx={{ mt: 5, fontSize: 22 }}>Classement total</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Pseudo</TableCell>
            <TableCell sx={{ color: "white" }}>Alignement</TableCell>
            <TableCell sx={{ color: "white" }}>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.ranking_total.map((user) => {
            return (
              <>
                <TableRow key={user.pseudo}>
                  <TableCell sx={{ color: "white" }}>{user.pseudo}</TableCell>
                  <TableCell sx={{ color: "white" }}>{user.nature}</TableCell>
                  <TableCell sx={{ color: "white" }}>{user.points}</TableCell>
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
          sx={{
            ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: "#1976d2",
            },
            ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
              color: "white",
              // opacity: 1
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
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
