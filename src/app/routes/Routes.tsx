import { RProvider, cRRouter } from "../react-router-dom";
import { Home } from "../ui/pages/Home";
import { Room } from "../ui/pages/Room";
import { NewRoom } from "../ui/pages/Room/NewRoom";

export const MasterMenuRoutes = () => {
  const router = cRRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <h1>Página erro</h1>,
    },
    {
      path: "/rooms/new",
      element: <NewRoom />,
      errorElement: <h1>Página erro</h1>,
    },
    {
      path: "/rooms/:id",
      element: <Room />,
      errorElement: <h1>Página erro</h1>,
    },
  ]);

  return <RProvider router={router} />;
};
