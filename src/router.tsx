import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import User from "./components/pages/user";
import Favorite from "./components/pages/favorite";

type RouteItem = {
  path: string;
  element: React.ReactNode;
};

const routes = [
  { path: "/", element: <Login /> },
  { path: "/user", element: <User /> },
  { path: "/favorite", element: <Favorite /> },
];
export const Router = () => {
  const renderRoutes = (routesArray: RouteItem[]) =>
    routesArray.map(({ path, element }) => {
      return <Route key={path} path={path} element={element} />;
    });
  return <Routes>{renderRoutes(routes)}</Routes>;
};
