import { RProvider, cRRouter } from "../react-router-dom";
import { Home } from "../ui/pages/Home";
import { NewRoom } from "../ui/pages/NewRoom";

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
  ]);

  return <RProvider router={router} />;
};
