import React from "react";

import { signInWithGoogle } from "../../../repository/AuthRepository";
import { joinRoom } from "../../../repository/RoomRepository";
import { useNavigateTo } from "../../../react-router-dom";
import { ROOM_REF } from "../../../utils/constants";
import { BaseLayoutPage } from "../BaseLayoutPage";
import { useAuth } from "../../../states/useAuth";
import { IRoomType } from "../../../types/RoomType";

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
        navigateTo("/rooms/new");
      });
    } else {
      navigateTo("/rooms/new");
    }
  };

  const handleJoinRoom = (roomCode: string): Promise<string | IRoomType> => {
    return new Promise((resolve, reject) => {
      joinRoom(ROOM_REF, roomCode)
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
