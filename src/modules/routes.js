import Boosters from "../pages/boosters";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Multiverse from "../pages/multiverse";
import Nature from "../pages/nature";
import Ranking from "../pages/ranking";
import Register from "../pages/register";
import Reinitialization from "../pages/reinitialization";
import Search from "../pages/search";
import Thanks from "../pages/thanks";
import Universe from "../pages/universe";

const routes = [
  {
    path: "/",
    element: Register,
  },
  {
    path: "/build",
    element: Dashboard,
  },
  {
    path: "/help",
    element: Home,
  },
  // {
  //   path: '/boosters',
  //   element: Boosters
  // },
  {
    path: "/universe",
    element: Universe,
  },
  // {
  //   path: '/multiverse',
  //   element: Multiverse
  // },
  {
    path: "/search",
    element: Search,
  },
  // {
  //   path: '/reinitialization',
  //   element: Reinitialization
  // },
  {
    path: "/determine-nature",
    element: Nature,
  },
  {
    path: "/ranking",
    element: Ranking,
  },
  {
    path: "/thanks",
    element: Thanks,
  },
];

export default routes;
