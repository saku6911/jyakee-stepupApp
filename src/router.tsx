import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import User from "./components/pages/user";
import Favorite from "./components/pages/favorite";
import PokemonDetail from "./components/pages/pokemonDetail";
import Signup from "./components/pages/Signup";

type RouteItem = {
  path: string;
  element: React.ReactNode;
};

const routes = [
  { path: "/", element: <Login /> },
  { path: "/user", element: <User /> },
  { path: "/favorite", element: <Favorite /> },
  { path: "/pokemon/:name", element: <PokemonDetail /> },
  { path: "/signup", element: <Signup /> },
];
export const Router = () => {
  const renderRoutes = (routesArray: RouteItem[]) =>
    routesArray.map(({ path, element }) => {
      return <Route key={path} path={path} element={element} />;
    });
  return <Routes>{renderRoutes(routes)}</Routes>;
};
