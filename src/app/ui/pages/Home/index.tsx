import React from "react";

import { signInWithGoogle } from "../../../repository/AuthRepository";
import { useNavigateTo } from "../../../react-router-dom";
import { BaseLayoutPage } from "../BaseLayoutPage";
import { useAuth } from "../../../states/useAuth";

export const Home: React.FC = () => {
  const { navigateTo } = useNavigateTo();
  const { user, setUser } = useAuth();

  const handleSignInWithGoogle = () => {
    if (!user) {
      signInWithGoogle().then((result) => {
        const { displayName, photoURL, uid } = result;

        if (!displayName || !uid) {
          throw new Error("Falta informação da conta Google");
        }
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      });
    }
    navigateTo("/rooms/new");
  };
  return <BaseLayoutPage isHome handleSignInWithGoogle={handleSignInWithGoogle}/>;
};
