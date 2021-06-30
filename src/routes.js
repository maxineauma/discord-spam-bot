import HomePage from "./pages/home"
import ScrapePage from "./pages/scrape";
import SpamPage from "./pages/spam";

const routes = [

  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/scrape",
    component: ScrapePage
  },
  {
    path: "/spam",
    component: SpamPage
  }

];

export default routes;

