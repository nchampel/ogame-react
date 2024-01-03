import Boosters from "../pages/boosters";
import Dashboard from "../pages/home";
import Multiverse from "../pages/multiverse";
import Search from "../pages/search";
import Universe from "../pages/universe";

const routes = [
    {
      path: '/',
      element: Dashboard
    },
    {
      path: '/boosters',
      element: Boosters
    },
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
]

export default routes;