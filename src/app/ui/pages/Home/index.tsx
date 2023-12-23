import React from "react";

import { signInWithGoogle } from "../../../repository/AuthRepository";
import { useNavigateTo } from "../../../react-router-dom";
import { BaseLayoutPage } from "../BaseLayoutPage";
import { useAuth } from "../../../states/useAuth";
import { joinRoomDAO } from "../../../databases/RoomDAO";
import { ROOM_REF } from "../../../utils/constants";

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

  const handleJoinRoom = (roomCode: string) => {
    return new Promise((resolve, reject) => {
      joinRoomDAO(ROOM_REF, roomCode)
        .then((response) => {
          if (typeof response === "string") {
            resolve(response);
          } else {
            resolve(response.val());
          }
        })
        .catch((error) => {
          reject({ message: error.message });
        });
    });
  };

  return (
    <BaseLayoutPage
      isHome
      handleSignInWithGoogle={handleSignInWithGoogle}
      handleJoinRoom={handleJoinRoom}
    />
  );
};
