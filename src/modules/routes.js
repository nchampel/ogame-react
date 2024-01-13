import Boosters from "../pages/boosters";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Multiverse from "../pages/multiverse";
import Reinitialization from "../pages/reinitialization";
import Search from "../pages/search";
import Universe from "../pages/universe";

const routes = [
  {
    path: '/',
    element: Home
  },
    {
      path: '/build',
      element: Dashboard
    },
    // {
    //   path: '/boosters',
    //   element: Boosters
    // },
    {
      path: '/universe',
      element: Universe
    },
    {
      path: '/multiverse',
      element: Multiverse
    },
    {
      path: '/search',
      element: Search
    },
    // {
    //   path: '/reinitialization',
    //   element: Reinitialization
    // },
]

export default routes;