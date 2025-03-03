import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";

import { MasterMenuRoutes } from "./app/routes/Routes";
import { auth, authApp, requestNotificationPermission } from "./app/firebase";
import { useAuth } from "./app/states/useAuth";
export const App = () => {
  const { setUser } = useAuth();

  

  useEffect(() => {
    requestNotificationPermission()
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authApp, (user) => {
      //console.log(user);
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !uid) {
          throw new Error("Falta informação da conta Google");
        }
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <ChakraProvider>
      <MasterMenuRoutes />
    </ChakraProvider>
  );
};
