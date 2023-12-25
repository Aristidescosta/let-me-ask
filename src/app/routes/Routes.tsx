import { RProvider, cRRouter } from "../react-router-dom";
import { NewRoom } from "../ui/pages/Room/NewRoom";
import { AdminRoom } from "../ui/pages/AdminRoom";
import { Home } from "../ui/pages/Home";
import { Room } from "../ui/pages/Room";
import {
  ROUTE_ADMIN_ROOM,
  ROUTE_HOME,
  ROUTE_NEW_ROOM,
  ROUTE_ROOM,
} from "../utils/constants";

export const MasterMenuRoutes = () => {
  const router = cRRouter([
    {
      path: ROUTE_HOME.route,
      element: <Home />,
      errorElement: <h1>Página erro</h1>,
    },
    {
      path: ROUTE_NEW_ROOM.route,
      element: <NewRoom />,
      errorElement: <h1>Página erro</h1>,
    },
    {
      path: ROUTE_ROOM.route,
      element: <Room />,
      errorElement: <h1>Página erro</h1>,
    },

    {
      path: ROUTE_ADMIN_ROOM.route,
      element: <AdminRoom />,
      errorElement: <h1>Página erro</h1>,
    },
  ]);

  return <RProvider router={router} />;
};
