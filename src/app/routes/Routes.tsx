import { RProvider, cRRouter } from "../react-router-dom";
import { Home } from "../ui/pages/Home";

export const MasterMenuRoutes = () => {
  const router = cRRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <h1>Página erro</h1>,
    },
  ]);

  return <RProvider router={router} />;
};
